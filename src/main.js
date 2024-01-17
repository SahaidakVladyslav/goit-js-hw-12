
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import axios from "axios";
const formEl = document.querySelector('.js-search-form');
const inputEl = document.querySelector('input');
const galleryEl = document.querySelector('.gallery');
const loaderEl = document.querySelector('.loader');

const loaderMoreEl = document.querySelector('.js-loader')
const BtnMoreEl = document.querySelector('.more--btn');

const nonExistSpan = document.querySelector('.non-existent');
let count = 1;
let searchValue;
let totalHits;

const gallery = new SimpleLightbox('.gallery a', {
    captions: true,
    captionDelay: 250,
    fadeSpeed: 250,
    captionSelector: "img",
    captionsData: 'alt',
    captionPosition: 'bottom',
});


async function fetchImagesFromApi(number, value) {
    const urlFromPixaby = new URLSearchParams({
        key: '41648594-e525389370aefc2e125a1a54e',
        q: value,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        per_page: 40,
        page: number
    })
    try {

        const response = await axios({
            method: 'get',
            url: `https://pixabay.com/api/?${urlFromPixaby}`
        });



        return response;

    } catch (error) {
        console.error(error.message);

    }
};


async function response(number, value) {
    try {
        const pixabayInformation = await fetchImagesFromApi(number, value)


        console.log(pixabayInformation.headers['x-ratelimit-remaining']);

        console.log(pixabayInformation);
        const remainingRequests = pixabayInformation.headers['x-ratelimit-remaining'];
        console.log(`Remaining requests: ${remainingRequests}`);

        loaderSwitch()
        izitoast(pixabayInformation)

        if (count !== 1) {
            galleryEl.insertAdjacentHTML('beforeend', renderMarkup(pixabayInformation.data));
            gallery.refresh();
            scrollToNextGroup();
        } else {
            galleryEl.innerHTML = renderMarkup(pixabayInformation.data)
            gallery.refresh();
        }

    } catch (error) {
        console.error(error.message);
    }

};


function renderMarkup({ hits }) {

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
    </li>
    `).join('')

    return typset

};


const izitoast = (value) => {

    try {

        totalHits = Math.round(value.data.totalHits / 40)

        if (value.data.hits.length < 40 & value.data.hits.length !== 0) {
            BtnMoreEl.classList.add('switcher');
            return iziToast.info({
                title: 'Hey!',
                message: 'We re sorry, but you ve reached the end of search results.',
            });
        }
        if (value.data.hits.length === 0) {
            BtnMoreEl.classList.add('switcher');
            return iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        }
        if (totalHits === count & totalHits !== 1) {
            BtnMoreEl.classList.add('switcher');
            return iziToast.info({
                title: 'Hey!',
                message: 'We re sorry, but you ve reached the end of search results.',
            });
        }

        BtnMoreEl.classList.remove('switcher');


    } catch (error) {
        console.error(error.message);
    }

};



const saveInputValue = (e) => {
    nonExistSpan.textContent = e;
    return nonExistSpan.textContent;
};

const loaderSwitch = () => {
    loaderEl.classList.toggle('switcher')
};

const loaderMoreSwitch = () => {
    loaderMoreEl.classList.toggle('non-existent')

}

function getGalleryItemHeight() {
    const firstGalleryItem = document.querySelector('.gallery__item');
    if (firstGalleryItem) {
        const rect = firstGalleryItem.getBoundingClientRect();
        return Math.round(rect.height);
    }
    return 0;
}

function scrollToNextGroup() {
    const galleryItemHeight = getGalleryItemHeight()

    if (galleryItemHeight > 0) {
        window.scrollBy({
            top: galleryItemHeight * 2,
            left: 0,
            behavior: 'smooth',
        });
    }
}




loaderSwitch();


formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    count = 1;
    loaderSwitch()
    response(count, inputEl.value)
    saveInputValue(inputEl.value);
    formEl.reset()
});

BtnMoreEl.addEventListener('click', (event) => {
    // значить дивись, тут як ми зробимо!
    // спойлер : неяк
    loaderMoreSwitch()
    count += 1
    searchValue = nonExistSpan.textContent;
    response(count, searchValue)
    loaderSwitch()
    loaderMoreSwitch()
});

