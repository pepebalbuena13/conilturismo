import { LOCALES, getCategoryById, type Locale } from "../data/categories";

/** Empty for the default locale (no URL prefix), otherwise the locale code. */
export const LOCALE_PREFIX: Record<Locale, string> = { es: "", en: "en", de: "de", fr: "fr" };

export const SEARCH_SEGMENT: Record<Locale, string> = {
  es: "buscar",
  en: "search",
  de: "suche",
  fr: "recherche",
};

export const BUSINESS_SEGMENT: Record<Locale, string> = {
  es: "negocio",
  en: "business",
  de: "betrieb",
  fr: "commerce",
};

function buildPath(locale: Locale, ...segments: Array<string | undefined>): string {
  const parts = [LOCALE_PREFIX[locale], ...segments].filter((s): s is string => Boolean(s));
  return parts.length ? `/${parts.join("/")}/` : "/";
}

export function homePath(locale: Locale): string {
  return buildPath(locale);
}

export function searchPath(locale: Locale): string {
  return buildPath(locale, SEARCH_SEGMENT[locale]);
}

export function townPath(locale: Locale, townSlug: string, categorySlug?: string): string {
  return buildPath(locale, townSlug, categorySlug);
}

export function businessPath(locale: Locale, slug: string): string {
  return buildPath(locale, BUSINESS_SEGMENT[locale], slug);
}

function allLocales<T>(build: (locale: Locale) => T): Record<Locale, T> {
  return Object.fromEntries(LOCALES.map((l) => [l, build(l)])) as Record<Locale, T>;
}

export function localizedHomeHrefs(): Record<Locale, string> {
  return allLocales((l) => homePath(l));
}

export function localizedSearchHrefs(): Record<Locale, string> {
  return allLocales((l) => searchPath(l));
}

export function localizedBusinessHrefs(slug: string): Record<Locale, string> {
  return allLocales((l) => businessPath(l, slug));
}

/** categoryId is the canonical category id (e.g. "restaurantes"), not a locale-specific slug. */
export function localizedTownHrefs(townSlug: string, categoryId?: string): Record<Locale, string> {
  const category = categoryId ? getCategoryById(categoryId) : undefined;
  return allLocales((l) => townPath(l, townSlug, category?.slug[l]));
}
