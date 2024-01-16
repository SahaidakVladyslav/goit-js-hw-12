
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
let newCount = 1;
let searchValue;
let first40Array = [];
let second40Array = [];

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
        per_page: 80,
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
        BtnMoreEl.classList.add('switcher');
        return iziToast.info({
            title: 'Hey!',
            message: 'We re sorry, but you ve reached the end of search results.',
        });
    }
};


async function response(number, value) {
    try {
        const pixabayInformation = await fetchImagesFromApi(number, value)
        // ділимо наш масив 80 ти елементів на два
        const first40 = pixabayInformation.data.hits.slice(0, 40);

        // Залишаємо всі інші елементи
        const remaining = pixabayInformation.data.hits.slice(40);

        // Виводимо результати
        first40Array = [...first40]
        second40Array = [...remaining]

        loaderSwitch()
        izitoast(first40)

        console.log(count)
        if (count === 1) {
            console.log("count % 2 === 0", count % 2 === 0)
            // парсим самі перші 40 елементів
            galleryEl.innerHTML = markup(first40)
            gallery.refresh();
        } else {
            // парсим перші послідовні 40 елементів
            galleryEl.insertAdjacentHTML('beforeend', markup(first40));
            gallery.refresh();
            scrollToNextGroup();
        }

    } catch (error) {
        console.error(error.message);
    }

};


function markup(hits) {

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


        if (value.length < 40 & value.length !== 0) {
            BtnMoreEl.classList.add('switcher');
            return iziToast.info({
                title: 'Hey!',
                message: 'We re sorry, but you ve reached the end of search results.',
            });
        }
        if (value.length === 0) {
            BtnMoreEl.classList.add('switcher');
            return iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
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
    newCount = 1;
    count = 1;
    loaderSwitch()
    response(1, inputEl.value)
    saveInputValue(inputEl.value);
    formEl.reset()
});
BtnMoreEl.addEventListener('click', (event) => {
    loaderMoreSwitch()
    count += 1;
    searchValue = nonExistSpan.textContent;
    loaderSwitch()
    loaderMoreSwitch()

    if (count % 2 === 0) {
        //  зараз парсим другі 40 елементів

        galleryEl.insertAdjacentHTML('beforeend', markup(second40Array));
        izitoast(second40Array);
        gallery.refresh();
        loaderSwitch();
        newCount += 1;
        //   'я побіг перевіряти чи буде доступ до наступного хттп запиту'
        fetchImagesFromApi(newCount, searchValue)
    } else {

        response(newCount, searchValue)
    }
    scrollToNextGroup()
});

