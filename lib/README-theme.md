# Cómo cambiar el diseño de NormaUrb

## Cambios rápidos
Abre `lib/theme.js` y edita los valores:

- Cambiar color de fondo → edita `colores.fondoPrincipal`
- Cambiar color de botones → edita `colores.botonFondo` y `colores.botonTexto`
- Cambiar color de normas obligatorias → edita `colores.obligatoria`
- Cambiar fuente → edita `tipografia.fuentes.titulos` o `tipografia.fuentes.cuerpo`

## Después de cada cambio
En la terminal escribe:
  git add . && git commit -m "diseño: descripción del cambio" && git push

Vercel publica el cambio automáticamente en 2 minutos.

## Fuentes disponibles de Google Fonts
Para cambiar fuentes usa cualquiera de estas (ya configuradas):
- Space Grotesk — actual para títulos
- Inter — actual para cuerpo
- Para cambiar a otra: avísale a Claude Code cuál quieres
