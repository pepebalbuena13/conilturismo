import type { Locale } from "../data/categories";

const isEn = (locale: Locale) => locale === "en";

export function homePath(locale: Locale): string {
  return isEn(locale) ? "/en/" : "/";
}

export function searchPath(locale: Locale): string {
  return isEn(locale) ? "/en/search/" : "/buscar/";
}

export function townPath(locale: Locale, townSlug: string, categorySlug?: string): string {
  const base = isEn(locale) ? `/en/${townSlug}/` : `/${townSlug}/`;
  return categorySlug ? `${base}${categorySlug}/` : base;
}

export function businessPath(locale: Locale, slug: string): string {
  return isEn(locale) ? `/en/business/${slug}/` : `/negocio/${slug}/`;
}

export function towsIndexPath(locale: Locale): string {
  return isEn(locale) ? "/en/#towns" : "/#pueblos";
}
