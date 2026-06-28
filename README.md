# Eterial Company — Agencia de Desarrollo de Software

Landing page comercial de **Eterial Company**, agencia de desarrollo de software especializada en soluciones digitales para PyMEs y empresas locales. Sitio construido con **HTML + CSS + JavaScript puro** (sin dependencias ni build). Publicado con GitHub Pages.

🔗 **Sitio en vivo:** https://tete2311.github.io/

## Características

- **Diseño premium** inspirado en Vercel, Linear y Stripe
- **Cursor personalizado** interactivo con efectos de hover
- **Glassmorphism** en tarjetas con backdrop-filter blur
- **Mesh gradients** animados en el fondo
- **Responsive** mobile-first
- **Animaciones** suaves con IntersectionObserver
- **Sin dependencias** - HTML5, CSS3 y Vanilla JS modernos

## Estructura

```
index.html              Landing page (hero, soluciones, proyectos, proceso, FAQ, contacto)
styles.css              Sistema de diseño premium, animaciones y glassmorphism
script.js               Cursor dinámico, animaciones canvas y funcionalidades
calculator/             Proyecto: Herramienta de Estimación Financiera
  index.html, styles.css, app.js
```

La calculadora queda online en https://tete2311.github.io/calculator/

## Secciones

1. **Hero** - Propuesta de valor con CTA
2. **Soluciones** - Servicios: Web Corporativas, Apps a Medida, Automatizaciones
3. **Proyectos** - Galería de proyectos destacados
4. **Nuestro Proceso** - Línea de tiempo de 3 pasos
5. **FAQ** - Preguntas frecuentes con acordeón interactivo
6. **Contacto** - Formulario y WhatsApp

## Ver en local

- Doble clic en `index.html`, o con VS Code usá *Live Server* → *"Go Live"*.

## Publicar (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → rama **main** → carpeta
**/ (root)** → Save. Al ser un repo `usuario.github.io`, queda en la raíz:
`https://tete2311.github.io/`.

## Personalizar

- Textos: editá `index.html` (títulos, descripciones, FAQ).
- Colores: modificá las variables CSS en `styles.css` (`--accent-blue`, `--accent-violet`, etc.).
- Proyectos: duplicá una tarjeta `<div class="project-card">` en `index.html`.
- FAQ: agregá o modificá las preguntas en la sección `faq`.

## Stack Tecnológico

- **HTML5** - Semántico y accesible
- **CSS3** - Variables CSS, Grid, Flexbox, backdrop-filter, animaciones
- **JavaScript ES6+** - Canvas API, IntersectionObserver, event listeners
- **Lucide Icons** - Iconos modernos y ligeros
- **Google Fonts** - Tipografía Inter

## Contacto

- Email: thiagotorresortiz2311@gmail.com
- GitHub: [@Tete2311](https://github.com/Tete2311)
