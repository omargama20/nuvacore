# Nuvacore — Nutrición Moderna

Landing page estática preparada para GitHub Pages y el dominio principal:

- `https://nutricionmoderna.com/`
- Atención presencial en Mérida, Yucatán
- Sesiones por Zoom en todo México

## Publicar en GitHub Pages

1. Crea un repositorio público en GitHub.
2. Sube **el contenido de esta carpeta directamente a la raíz** del repositorio.
3. En GitHub abre `Settings → Pages`.
4. Selecciona `Deploy from a branch`, rama `main`, carpeta `/ (root)`.
5. En `Custom domain`, escribe `nutricionmoderna.com`.
6. Cuando GitHub termine de emitir el certificado, activa `Enforce HTTPS`.

El archivo `CNAME` ya está incluido.

## DNS del dominio .com en GoDaddy

Crea o conserva estos cuatro registros A para el host `@`:

- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

Para `www`, crea un registro CNAME que apunte directamente a:

- `TU-USUARIO.github.io`

Sustituye `TU-USUARIO` por el usuario u organización real de GitHub.

## Dominio .mx

Usa `nutricionmoderna.com` como dominio principal. En GoDaddy configura `nutricionmoderna.mx` con **redireccionamiento permanente 301**, sin enmascaramiento, hacia:

- `https://nutricionmoderna.com/`

Esto evita tener dos sitios duplicados compitiendo en Google.

## SEO incluido

- Título y descripción enfocados en Mérida + atención nacional por Zoom
- URL canónica
- Open Graph y Twitter Cards
- Datos estructurados `WebSite`, `Organization`, `Person`, `Service` y `FAQPage`
- `robots.txt`
- `sitemap.xml`
- HTML semántico y versión móvil

## Después de publicar

1. Agrega el dominio como propiedad en Google Search Console.
2. Envía `https://nutricionmoderna.com/sitemap.xml`.
3. Solicita indexación de la página principal.
4. Crea o actualiza el Perfil de Empresa de Google para Mérida.
5. Mantén nombre, teléfono, ciudad y enlaces sociales iguales en web, Google, Instagram y Facebook.

## Seguridad y repositorio público

El sitio no necesita llaves privadas ni contraseñas. No subas credenciales de GoDaddy, tokens de GitHub ni accesos de Google. El teléfono, precios y redes sociales son datos públicos del sitio. Los datos bancarios no están incluidos.

## Importante antes del lanzamiento público

Sustituye fotografías de transformación y testimonios de presentación por material real, autorizado y verificable antes de promover la página como sitio definitivo. No se incluyeron reseñas en los datos estructurados.

## Licencia

El código se distribuye bajo licencia MIT. El nombre, logotipo y materiales de marca de Nuvacore no se conceden como marca comercial por esta licencia.
