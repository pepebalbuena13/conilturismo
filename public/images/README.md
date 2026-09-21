# Convención de imágenes

Coloca aquí las fotos reales de cada pueblo y negocio. Mientras no exista un
archivo, el sitio muestra automáticamente una ilustración de respaldo
(degradado + iniciales del negocio), así que puedes ir añadiendo fotos poco a
poco sin tocar código.

## Estructura de carpetas

```
public/images/
  <slug-del-pueblo>/
    hero/
      1.jpg   2.jpg   3.jpg   4.jpg      ← carrusel de la página del pueblo
    <slug-del-negocio>/
      1.jpg   2.jpg   3.jpg …            ← galería de la ficha del negocio
```

- `<slug-del-pueblo>` es el `slug` definido en `src/data/towns.json`
  (p. ej. `conil-de-la-frontera`).
- `<slug-del-negocio>` es el `id` definido en `src/data/businesses.json`
  (p. ej. `chiringuito-la-fontanilla`).
- Los formatos admitidos son `.jpg`, `.jpeg`, `.png` y `.webp`.
- El número de fotos que se intentan cargar en la ficha de un negocio viene
  del campo `photos` de ese negocio en `businesses.json`.
- El carrusel de cada pueblo intenta cargar tantas fotos como captions tenga
  definidos en `gallery` dentro de `towns.json`.

## Ejemplo

Para añadir la foto de portada del Hotel Boutique Fontanilla (Conil):

```
public/images/conil-de-la-frontera/hotel-boutique-fontanilla/1.jpg
```
