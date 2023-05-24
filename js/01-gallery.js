import { galleryItems } from './gallery-items.js';
// Change code below this line

document.addEventListener('DOMContentLoaded', () => {
  console.log(galleryItems);
  const gallery = document.querySelector('.gallery');
  let instance;

  function generateGalleryItems() {
    return galleryItems
      .map(
        item =>
          `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
              <img
                class="gallery__image"
                src="${item.preview}"
                data-source="${item.original}"
                alt="${item.description}"
              />
            </a>
          </div>`
      )
      .join('');
  }

  function imageSelect(event) {
    event.preventDefault();
    const clickedElement = event.target;
    if (clickedElement.nodeName !== 'IMG') {
      return;
    }
    const selectedImage = clickedElement.dataset.source;

    instance = basicLightbox.create(
      `
      <img src="${selectedImage}" width="800" height="600">
    `,
      {
        onShow: instance => {
          document.addEventListener('keydown', escapeCloseKey);
        },
        onClose: instance => {
          document.removeEventListener('keydown', escapeCloseKey);
        },
      }
    );

    instance.show();
  }

  function escapeCloseKey(event) {
    if (event.key === 'Escape') {
      instance.close();
    }
  }

  gallery.insertAdjacentHTML('beforeend', generateGalleryItems());

  gallery.addEventListener('click', imageSelect);
});