import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const formEl = document.querySelector('.js-search-form')
const inputEl = document.querySelector('input')
const galleryEl = document.querySelector('.gallery')

let gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    fadeSpeed: 250,
    captionSelector: "img",
    captionsData: 'alt',
    captionPosition: 'bottom',
});

function promesUrl() {
    const urlFromPixaby = new URLSearchParams({
        key: '41648594-e525389370aefc2e125a1a54e',
        q: `${inputEl.value}`,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true
    })

    return fetch(`https://pixabay.com/api/?${urlFromPixaby}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }

            return response.json()
        })
        .catch(error => new Error(error))
}


function markup({ hits }) {
    const typset = hits.map(item => `
    <li class="gallery__item">
    <a href="${item.largeImageURL}">
    <img class="gallery--img" src="${item.webformatURL}" alt="${item.tags}" title="${item.tags}"/>
    </a>
<ul class="gallery__list--characters">
  <p>likes: ${item.likes}</p>
  <p>views: ${item.views}</p>
  <p>comments: ${item.comments}</p>
  <p>downloads: ${item.downloads}</p>
</ul>
    </li>`).join('')

    galleryEl.innerHTML = typset
}



if (!document.querySelector('.gallery__item')) {
    document.querySelector('.loader').style.display = "none"
}



formEl.addEventListener('submit', (event) => {
    event.preventDefault()

    document.querySelector('.loader').style.display = "block"
    promesUrl()
        .then(response => {
            markup(response)
            gallery.refresh();
            if (document.querySelector('.gallery__item')) {
                document.querySelector('.loader').style.display = "none"
            }
            if (response.hits.length === 0) {
                iziToast.error({
                    title: 'Error',
                    message: 'Sorry, there are no images matching your search query. Please try again!',
                });
                document.querySelector('.loader').style.display = "none"
            }
        })
        .catch(error => new Error(error));
    formEl.reset()
})