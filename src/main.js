
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
        if (response.data.hits.length < 40) {
            // it is lower then 40
            BtnSwitcherOn()

        }
        return response;

    } catch (error) {
        BtnSwitcherOn()
        iziToast.info({
            title: 'Greetings!',
            message: "We're sorry, but you've reached the end of search results.",
        });
    }
};

async function response(number, value) {
    try {

        const pixabayInformation = await fetchImagesFromApi(number, value)

        loaderSwitch()
        if (count !== 1) {
            galleryEl.insertAdjacentHTML('beforeend', markup(pixabayInformation.data));
            gallery.refresh();
        } else {
            galleryEl.innerHTML = markup(pixabayInformation.data)
            gallery.refresh();
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
        });
    }

};

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
    </li>
    `).join('')


    return typset

};

const loaderSwitch = () => {

    loaderEl.classList.toggle('switcher')

};

const loaderMoreSwitch = () => {
    loaderMoreEl.classList.toggle('non-existent')

}



const izitoast = async () => {

    try {

        const respons = await fetchImagesFromApi(1, inputEl.value)

        if (respons.data.hits.length === 0) {
            BtnSwitcherOn()
            galleryEl.innerHTML = ''
            return iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });

        }
        BtnSwitcherOf()

    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
        });
    }

};


loaderSwitch();

const BtnSwitcherOn = () => {
    return BtnMoreEl.classList.add('switcher');
};

const BtnSwitcherOf = () => {
    return BtnMoreEl.classList.remove('switcher');
};

const saveInputValue = (e) => {
    nonExistSpan.textContent = e;
    return nonExistSpan.textContent;
};





formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    count = 1;
    loaderSwitch()
    response(1, inputEl.value)
    izitoast()
    saveInputValue(inputEl.value);
    formEl.reset()
});

BtnMoreEl.addEventListener('click', (event) => {

    loaderMoreSwitch()
    count += 1
    searchValue = nonExistSpan.textContent;
    response(count, searchValue)
    loaderSwitch()
    loaderMoreSwitch()
    fetchImagesFromApi((count + 1), searchValue)
});

