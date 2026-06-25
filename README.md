# Portfolio — Thiago Torres · Eterial Company

Portfolio personal hecho con **HTML + CSS + JavaScript puro** (sin dependencias
ni build). Publicado con GitHub Pages.

🔗 **Sitio en vivo:** https://tete2311.github.io/

## Estructura

```
index.html              Portfolio (hero, sobre mí, skills, proyectos, contacto)
assets/
  css/portfolio.css     Estilos, temas claro/oscuro y animaciones
  js/portfolio.js       Skills, tema, menú móvil y reveal on scroll
calculator/             Proyecto: Calculadora Pro (app independiente)
  index.html, styles.css, app.js
Calculadora_Semi_Compleja.py   Versión original en Python (referencia)
```

La calculadora queda online en https://tete2311.github.io/calculator/

## Ver en local

- Doble clic en `index.html`, o con VS Code usá *Live Server* → *"Go Live"*.

## Publicar (GitHub Pages)

Settings → Pages → Source: **Deploy from a branch** → rama **main** → carpeta
**/ (root)** → Save. Al ser un repo `usuario.github.io`, queda en la raíz:
`https://tete2311.github.io/`.

## Personalizar

- Textos: editá `index.html` (nombre, rol, "sobre mí", contacto).
- Skills: editá la lista `SKILLS` al inicio de `assets/js/portfolio.js`.
- Proyectos: duplicá una tarjeta `<article class="project-card">` en `index.html`.
