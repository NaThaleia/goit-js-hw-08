import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

console.log(galleryItems);
const galleryContainer = document.querySelector('.gallery');
const cardsMarkup = createGalleryCards(galleryItems);

galleryContainer.innerHTML = cardsMarkup;

// settings
const lightboxSettings = {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
};

function createGalleryCards(gallery) {
  return gallery
    .map(({ preview, description, original }) => {
      return `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
  </a>`;
    })
    .join('');
}

const createGallery = new SimpleLightbox('.gallery a', lightboxSettings);
