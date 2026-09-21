import es from "../i18n/es.json";
import en from "../i18n/en.json";
import de from "../i18n/de.json";
import fr from "../i18n/fr.json";
import type { Locale } from "../data/categories";
import { LOCALES } from "../data/categories";

const DICTS: Record<Locale, Record<string, unknown>> = { es, en, de, fr };

export { LOCALES };
export const DEFAULT_LOCALE: Locale = "es";

function getByPath(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const dict = DICTS[locale] ?? DICTS[DEFAULT_LOCALE];
  let value = getByPath(dict, key);
  if (typeof value !== "string") {
    value = getByPath(DICTS[DEFAULT_LOCALE], key);
  }
  if (typeof value !== "string") {
    return key;
  }
  if (!vars) return value;
  return Object.entries(vars).reduce(
    (str, [k, v]) => str.replaceAll(`{${k}}`, String(v)),
    value
  );
}

export function localeFromUrl(pathname: string): Locale {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) continue;
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return locale;
    }
  }
  return DEFAULT_LOCALE;
}
