export type Locale = "es" | "en" | "de" | "fr";

export const LOCALES: Locale[] = ["es", "en", "de", "fr"];

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
    slug: { es: "alojamiento", en: "accommodation", de: "unterkunft", fr: "hebergement" },
    label: { es: "Alojamiento", en: "Accommodation", de: "Unterkunft", fr: "Hébergement" },
    labelSingular: { es: "Alojamiento", en: "Stay", de: "Unterkunft", fr: "Hébergement" },
  },
  {
    id: "restaurantes",
    icon: "fork",
    slug: { es: "restaurantes", en: "restaurants", de: "restaurants", fr: "restaurants" },
    label: { es: "Restaurantes", en: "Restaurants", de: "Restaurants", fr: "Restaurants" },
    labelSingular: { es: "Restaurante", en: "Restaurant", de: "Restaurant", fr: "Restaurant" },
  },
  {
    id: "bares",
    icon: "glass",
    slug: { es: "bares", en: "bars", de: "bars", fr: "bars" },
    label: { es: "Bares", en: "Bars", de: "Bars", fr: "Bars" },
    labelSingular: { es: "Bar", en: "Bar", de: "Bar", fr: "Bar" },
  },
  {
    id: "discotecas",
    icon: "music",
    slug: { es: "discotecas", en: "nightclubs", de: "clubs", fr: "discotheques" },
    label: { es: "Discotecas", en: "Nightclubs", de: "Clubs", fr: "Discothèques" },
    labelSingular: { es: "Discoteca", en: "Nightclub", de: "Club", fr: "Discothèque" },
  },
  {
    id: "actividades",
    icon: "compass",
    slug: { es: "actividades", en: "activities", de: "aktivitaeten", fr: "activites" },
    label: { es: "Actividades", en: "Activities", de: "Aktivitäten", fr: "Activités" },
    labelSingular: { es: "Actividad", en: "Activity", de: "Aktivität", fr: "Activité" },
  },
];

export const ACTIVITY_TAGS: Record<string, Record<Locale, string>> = {
  "motos-agua": { es: "Motos de agua", en: "Jet skis", de: "Jetski", fr: "Jet-ski" },
  quads: { es: "Quads", en: "Quad bikes", de: "Quad-Touren", fr: "Quads" },
  "rutas-guiadas": { es: "Rutas guiadas", en: "Guided tours", de: "Geführte Touren", fr: "Visites guidées" },
  surf: { es: "Clases de surf", en: "Surf lessons", de: "Surfkurse", fr: "Cours de surf" },
  buceo: { es: "Buceo", en: "Diving", de: "Tauchen", fr: "Plongée" },
  kitesurf: { es: "Kitesurf", en: "Kitesurfing", de: "Kitesurfen", fr: "Kitesurf" },
  barco: { es: "Excursiones en barco", en: "Boat trips", de: "Bootsausflüge", fr: "Excursions en bateau" },
  kayak: { es: "Kayak", en: "Kayaking", de: "Kajak", fr: "Kayak" },
  senderismo: { es: "Senderismo", en: "Hiking", de: "Wandern", fr: "Randonnée" },
  caballos: { es: "Rutas a caballo", en: "Horseback riding", de: "Ausritte", fr: "Balades à cheval" },
};

export function getCategoryById(id: string): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string, locale: Locale): CategoryDef | undefined {
  return CATEGORIES.find((c) => c.slug[locale] === slug);
}
