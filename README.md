# Astro Virtual Image Gallery (React + Svelte + @tanstack/virtual)

Repositorio de ejemplo que muestra 3 botones:
- Botón 1: React + implementación propia de virtualización (pool/recycle).
- Botón 2: Svelte + implementación propia de virtualización.
- Botón 3: React + @tanstack/react-virtual.

Incluye archivos mínimos para ejecutar con Astro y Tailwind. También contiene tests de ejemplo con Vitest.

## Contenido relevante
- `src/pages/index.astro` — página principal con 3 islands.
- `src/components/react/` — componentes React (Modal, Virtual list).
- `src/components/svelte/` — componentes Svelte (Modal, Virtual list).
- `src/components/tanstack/` — componente React usando @tanstack/react-virtual.
- `src/utils/` — utilidades: imageChecker, cache, errorLogger.
- `test/` — pruebas ejemplo con Vitest.

## Cómo usar (local)
1. Instala dependencias:
   ```
   npm install
   ```
2. Coloca tus imágenes en:
   - `public/imagesart1` (nombres como `1Thumbnail1.jpg`, `1Thumbnail2.jpg`, ...)
   - `public/imagesart2`
   - `public/imagesart3`
   y añade `public/placeholder.png`.

3. Ejecuta en modo desarrollo:
   ```
   npm run dev
   ```
4. Corre tests (localmente, requiere npm install):
   ```
   npm run test
   ```

## Nota importante sobre ejecución de tests y ZIP
He generado este ZIP con todos los archivos listos para descargar. No he ejecutado `npm install` ni corrido los tests en este entorno (no es un entorno Node). Para ejecutar los tests y el proyecto, sigue los pasos anteriores en tu máquina local.

