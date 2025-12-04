const artworks = [
  {
    id: 'how-to-draw-cover',
    title: 'How to Draw · Dragon',
    medium: 'Digital guide · layered steps',
    category: 'how-to-draw',
    year: 2024,
    size: 'Guide',
    availability: 'Downloadable',
    description:
      'Step-by-step prompts to build your own glowing map-inspired studies using gradients, linework, and texture.',
    image: 'assets/artworks/assets:Gemini_Generated_Image_1li4dh1li4dh1li4.png',
    featured: true,
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
