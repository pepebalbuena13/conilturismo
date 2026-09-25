import businessesData from "../data/businesses.json";
import townsData from "../data/towns.json";
import { getCategoryById, type Locale } from "../data/categories";

export type LocalizedText = Record<Locale, string>;

export interface Review {
  author: string;
  rating: number;
  date: string;
  text: LocalizedText;
}

export interface Business {
  id: string;
  townSlug: string;
  category: "alojamiento" | "restaurantes" | "bares" | "discotecas" | "actividades" | "otros";
  tags: string[];
  zone: LocalizedText;
  name: string;
  description: LocalizedText;
  priceRange: 1 | 2 | 3;
  /** Optional explicit price text (e.g. "10–20 €") shown instead of the priceRange €/€€/€€€ badge. */
  priceText?: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  hours: LocalizedText;
  phone: string;
  /** Phone number in international format with no "+" or spaces (e.g. "34665092020"), used to link the phone number to WhatsApp instead of a phone dialer. */
  whatsapp?: string;
  website: string;
  instagram: string;
  address: LocalizedText;
  /** Full Google Maps URL, used for the "open in maps" link instead of one built from lat/lng. */
  mapsUrl?: string;
  lat: number;
  lng: number;
  photos: number;
  reviews: Review[];
}

export interface Town {
  slug: string;
  name: string;
  lat: number;
  lng: number;
  tagline: LocalizedText;
  welcome: LocalizedText;
  zones: string[];
  gallerySeed: string;
  gallery: LocalizedText[];
}

export const BUSINESSES = businessesData as Business[];
export const TOWNS = townsData as Town[];

export function getTown(townSlug: string): Town | undefined {
  return TOWNS.find((town) => town.slug === townSlug);
}

export function getBusinessesByTown(townSlug: string): Business[] {
  return BUSINESSES.filter((b) => b.townSlug === townSlug);
}

export function getBusiness(id: string): Business | undefined {
  return BUSINESSES.find((b) => b.id === id);
}

export function getFeaturedBusinesses(limit?: number): Business[] {
  const featured = BUSINESSES.filter((b) => b.featured);
  return limit ? featured.slice(0, limit) : featured;
}

/** Featured businesses always sort first, then by rating descending. */
export function sortBusinesses(businesses: Business[]): Business[] {
  return [...businesses].sort((a, b) => {
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return b.rating - a.rating;
  });
}

/** Strips accents so "atun" matches "atún" and vice versa. */
export function normalizeSearchText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function filterBusinesses(options: {
  townSlug?: string;
  category?: string;
  query?: string;
  locale?: Locale;
}): Business[] {
  const { townSlug, category, query, locale = "es" } = options;
  const q = query?.trim() ? normalizeSearchText(query.trim()) : undefined;

  const filtered = BUSINESSES.filter((b) => {
    if (townSlug && b.townSlug !== townSlug) return false;
    if (category && b.category !== category) return false;
    if (q) {
      const town = getTown(b.townSlug);
      const cat = getCategoryById(b.category);
      const haystack = normalizeSearchText(
        [b.name, b.description[locale], b.zone[locale], town?.name ?? "", cat?.label[locale] ?? ""].join(" ")
      );
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return sortBusinesses(filtered);
}

export function formatPrice(priceRange: number): string {
  return "€".repeat(priceRange);
}

export function ratingStars(rating: number): { full: number; half: boolean; empty: number } {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
}
