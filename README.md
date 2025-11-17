# Eleanor Strite Art Portfolio

A single-page website for painter and mixed media artist Eleanor Strite. The site lives in the `site/` directory and is deployed to GitHub Pages through a lightweight GitHub Actions workflow.

## Project structure

```
site/
├── index.html          # Main page layout and content sections
├── styles/main.css     # Global styling, layout, and responsive rules
├── scripts/main.js     # Artwork data, gallery filtering, dialog interactions
└── assets/artworks     # Lightweight SVG placeholders for portfolio pieces
```

## Local preview

Because the project is pure HTML/CSS/JS, you can open `site/index.html` directly in a browser. For a better experience (smooth scrolling, dialog support, etc.), run a tiny static server from the repository root:

```bash
npx serve site
```

Then visit the provided local URL.

## Deployment (GitHub Pages)

1. Ensure your default branch is named `main` and GitHub Pages is set to build from "GitHub Actions" inside the repository settings.
2. Push to `main` (or trigger the workflow manually). The workflow at `.github/workflows/deploy.yml` uploads the contents of `site/` as the pages artifact and publishes it to GitHub Pages.
3. Once the `deploy` job finishes, GitHub Pages automatically serves the latest artifact at the configured URL.

No separate build step is required—updating the files in `site/` is all it takes.

## Customizing the gallery

- Add or replace artwork SVG/JPG files in `site/assets/artworks/`.
- Update the `artworks` array in `site/scripts/main.js` with new metadata (title, medium, availability, etc.).
- Adjust section copy or add new sections directly inside `site/index.html` and style them in `site/styles/main.css`.

## Accessibility & enhancements

- Skip link, semantic headings, and reduced motion respect are included out of the box.
- Gallery cards and featured work open an accessible dialog with more detail.
- Filter controls let visitors browse by medium categories (painting, mixed media, studies).

Feel free to extend the layout with blog posts, press mentions, or embedded video studio tours as future enhancements.
