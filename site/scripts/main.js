const artworks = [
  {
    id: 'luminous-07',
    title: 'Luminous Memory · No. 07',
    medium: 'Oil, cold wax, archival ink transfer',
    category: 'mixed-media',
    year: 2024,
    size: '36" × 48"',
    availability: 'Reserved',
    description:
      'Layers of wax and transparent pigment trace a shoreline remembered from childhood, mapping the space between land and sky.',
    image: 'assets/artworks/luminous-memory-07.svg',
    featured: true,
  },
  {
    id: 'lacustrine-echo',
    title: 'Lacustrine Echo',
    medium: 'Oil on wood panel',
    category: 'painting',
    year: 2023,
    size: '24" × 30"',
    availability: 'Available',
    description:
      'Fractured brushwork follows the rhythm of waves recorded during dawn walks on Lake Superior.',
    image: 'assets/artworks/lacustrine-echo.svg',
  },
  {
    id: 'midnight-cartography',
    title: 'Midnight Cartography',
    medium: 'Mixed media on paper',
    category: 'mixed-media',
    year: 2024,
    size: '22" × 30"',
    availability: 'On hold',
    description:
      'Collaged survey maps anchor luminous washes of indigo, tracing how memory stores distance.',
    image: 'assets/artworks/midnight-cartography.svg',
  },
  {
    id: 'tidal-study',
    title: 'Tidal Study I',
    medium: 'Ink, graphite, beeswax',
    category: 'study',
    year: 2024,
    size: '12" × 16"',
    availability: 'Available',
    description:
      'Quick field notes that capture the negative space of tide pools before they disappear.',
    image: 'assets/artworks/tidal-study.svg',
  },
  {
    id: 'estuary-roots',
    title: 'Estuary Roots',
    medium: 'Oil on canvas',
    category: 'painting',
    year: 2023,
    size: '30" × 40"',
    availability: 'Collected',
    description:
      'A warm palette and delicate linework interpret underwater root systems as constellations.',
    image: 'assets/artworks/estuary-roots.svg',
  },
  {
    id: 'resonant-shelf',
    title: 'Resonant Shelf',
    medium: 'Encaustic on birch panel',
    category: 'mixed-media',
    year: 2022,
    size: '18" × 24"',
    availability: 'Available',
    description:
      'Translucent beeswax layers hold color within the surface, shifting as daylight moves.',
    image: 'assets/artworks/resonant-shelf.svg',
  },
  {
    id: 'littoral-mapping',
    title: 'Littoral Mapping',
    medium: 'Oil on canvas',
    category: 'painting',
    year: 2024,
    size: '40" × 40"',
    availability: 'Commissioned',
    description:
      'Commissioned piece interpreting a family shoreline through color gradients and aerial diagrams.',
    image: 'assets/artworks/littoral-mapping.svg',
  },
  {
    id: 'moon-drift-study',
    title: 'Moon Drift Study',
    medium: 'Gouache on cotton paper',
    category: 'study',
    year: 2022,
    size: '11" × 14"',
    availability: 'Available',
    description:
      'Loose gesture study from a full-moon sketching session during the residency season.',
    image: 'assets/artworks/moon-drift-study.svg',
  },
  {
    id: 'how-to-draw-cover',
    title: 'How to Draw · Luminous Cartography',
    medium: 'Digital guide · layered steps',
    category: 'how-to-draw',
    year: 2024,
    size: 'Guide',
    availability: 'Downloadable',
    description:
      'Step-by-step prompts to build your own glowing map-inspired studies using gradients, linework, and texture.',
    image: 'assets/artworks/assets:Gemini_Generated_Image_1li4dh1li4dh1li4.png',
  },
];

const galleryGrid = document.querySelector('[data-gallery-grid]');
const featuredContainer = document.querySelector('[data-featured]');
const filterButtons = document.querySelectorAll('[data-filter]');
const dialog = document.querySelector('[data-artwork-dialog]');
const dialogElements = {
  image: document.querySelector('[data-dialog-image]'),
  title: document.querySelector('[data-dialog-title]'),
  description: document.querySelector('[data-dialog-description]'),
  medium: document.querySelector('[data-dialog-medium]'),
  dimensions: document.querySelector('[data-dialog-dimensions]'),
  status: document.querySelector('[data-dialog-status]'),
};

const featuredArtwork = artworks.find((art) => art.featured) ?? artworks[0];

function renderFeatured() {
  if (!featuredContainer || !featuredArtwork) return;
  featuredContainer.innerHTML = `
    <img src="${featuredArtwork.image}" alt="${featuredArtwork.title}" loading="lazy" />
    <div class="featured-details">
      <p class="eyebrow">${featuredArtwork.medium}</p>
      <h3>${featuredArtwork.title}</h3>
      <p>${featuredArtwork.description}</p>
      <div class="featured-meta">
        <div>
          <strong>Year</strong>
          <p>${featuredArtwork.year}</p>
        </div>
        <div>
          <strong>Dimensions</strong>
          <p>${featuredArtwork.size}</p>
        </div>
        <div>
          <strong>Availability</strong>
          <p>${featuredArtwork.availability}</p>
        </div>
      </div>
      <button class="primary" type="button" data-open-artwork="${featuredArtwork.id}">Learn more</button>
    </div>
  `;
}

function createCard(artwork) {
  const button = document.createElement('button');
  button.className = 'art-card';
  button.type = 'button';
  button.dataset.artworkId = artwork.id;
  button.innerHTML = `
    <figure>
      <img src="${artwork.image}" alt="${artwork.title}" loading="lazy" />
    </figure>
    <div class="art-card__body">
      <p class="eyebrow">${artwork.medium}</p>
      <p class="art-card__title">${artwork.title}</p>
      <p class="art-card__meta">${artwork.year} · ${artwork.size}</p>
    </div>
  `;
  button.addEventListener('click', () => openDialog(artwork));
  return button;
}

function renderGallery(filter = 'all') {
  if (!galleryGrid) return;
  galleryGrid.innerHTML = '';
  const filtered = artworks.filter((art) => filter === 'all' || art.category === filter);
  filtered.forEach((art) => galleryGrid.appendChild(createCard(art)));
}

function openDialog(artwork) {
  if (!dialog || !dialog.showModal) {
    alert(`${artwork.title} — ${artwork.description}`);
    return;
  }

  dialogElements.image.src = artwork.image;
  dialogElements.image.alt = artwork.title;
  dialogElements.title.textContent = artwork.title;
  dialogElements.description.textContent = artwork.description;
  dialogElements.medium.textContent = `${artwork.medium} · ${artwork.year}`;
  dialogElements.dimensions.textContent = artwork.size;
  dialogElements.status.textContent = artwork.availability;
  dialog.showModal();
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('is-active'));
      button.classList.add('is-active');
      renderGallery(button.dataset.filter);
    });
  });
}

function initFeaturedButton() {
  featuredContainer?.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-open-artwork]');
    if (!trigger) return;
    const artwork = artworks.find((art) => art.id === trigger.dataset.openArtwork);
    if (artwork) {
      openDialog(artwork);
    }
  });
}

function initScrollButtons() {
  document.querySelectorAll('[data-scroll-target]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.scrollTarget);
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function initDialog() {
  if (!dialog) return;
  const closeButton = dialog.querySelector('.dialog-close');
  closeButton?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const dialogRect = dialog.getBoundingClientRect();
    const isInDialog =
      event.clientX >= dialogRect.left &&
      event.clientX <= dialogRect.right &&
      event.clientY >= dialogRect.top &&
      event.clientY <= dialogRect.bottom;
    if (!isInDialog) {
      dialog.close();
    }
  });
}

function updateYear() {
  const yearElement = document.querySelector('[data-year]');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
}

renderFeatured();
renderGallery();
initFilters();
initFeaturedButton();
initScrollButtons();
initDialog();
updateYear();
