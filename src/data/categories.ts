export type Locale = "es" | "en";

export interface CategoryDef {
  id: "alojamiento" | "restaurantes" | "bares" | "discotecas" | "actividades";
  icon: "bed" | "fork" | "glass" | "music" | "compass";
  slug: Record<Locale, string>;
  label: Record<Locale, string>;
  labelSingular: Record<Locale, string>;
}

export const CATEGORIES: CategoryDef[] = [
  {
    id: "alojamiento",
    icon: "bed",
    slug: { es: "alojamiento", en: "accommodation" },
    label: { es: "Alojamiento", en: "Accommodation" },
    labelSingular: { es: "Alojamiento", en: "Stay" },
  },
  {
    id: "restaurantes",
    icon: "fork",
    slug: { es: "restaurantes", en: "restaurants" },
    label: { es: "Restaurantes", en: "Restaurants" },
    labelSingular: { es: "Restaurante", en: "Restaurant" },
  },
  {
    id: "bares",
    icon: "glass",
    slug: { es: "bares", en: "bars" },
    label: { es: "Bares", en: "Bars" },
    labelSingular: { es: "Bar", en: "Bar" },
  },
  {
    id: "discotecas",
    icon: "music",
    slug: { es: "discotecas", en: "nightclubs" },
    label: { es: "Discotecas", en: "Nightclubs" },
    labelSingular: { es: "Discoteca", en: "Nightclub" },
  },
  {
    id: "actividades",
    icon: "compass",
    slug: { es: "actividades", en: "activities" },
    label: { es: "Actividades", en: "Activities" },
    labelSingular: { es: "Actividad", en: "Activity" },
  },
];

export const ACTIVITY_TAGS: Record<string, Record<Locale, string>> = {
  "motos-agua": { es: "Motos de agua", en: "Jet skis" },
  quads: { es: "Quads", en: "Quad bikes" },
  "rutas-guiadas": { es: "Rutas guiadas", en: "Guided tours" },
  surf: { es: "Clases de surf", en: "Surf lessons" },
  buceo: { es: "Buceo", en: "Diving" },
  kitesurf: { es: "Kitesurf", en: "Kitesurfing" },
  barco: { es: "Excursiones en barco", en: "Boat trips" },
  kayak: { es: "Kayak", en: "Kayaking" },
  senderismo: { es: "Senderismo", en: "Hiking" },
  caballos: { es: "Rutas a caballo", en: "Horseback riding" },
};

export function getCategoryById(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string, locale: Locale): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug[locale] === slug);
}
