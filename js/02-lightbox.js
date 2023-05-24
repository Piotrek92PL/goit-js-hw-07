import { galleryItems } from './gallery-items.js';
// Change code below this line

document.addEventListener('DOMContentLoaded', () => {
  console.log(galleryItems);
  const gallery = document.querySelector('.gallery');
  let instance;

  function generateGalleryItems() {
    const galleryHTML = galleryItems
      .map(
        item =>
          `<a class="gallery__item" href="${item.original}">
            <img class="gallery__image" src="${item.preview}" alt="${item.description}" />
          </a>`
      )
      .join('');

    gallery.innerHTML = galleryHTML;

    instance = new SimpleLightbox(gallery.querySelectorAll('a'), {
      showCounter: false,
      captionDelay: 250,
      captionsData: 'alt',
    });

    gallery.addEventListener('click', imageSelect);
  }

  function imageSelect(event) {
    event.preventDefault();
    const clickedElement = event.target;
    if (clickedElement.nodeName !== 'IMG') {
      return;
    }
    const selectedImage = clickedElement.parentNode.href;

    instance.open();

    instance.slideToIndex(
      Array.from(gallery.querySelectorAll('a')).indexOf(clickedElement.parentNode)
    );
  }

  generateGalleryItems();
});