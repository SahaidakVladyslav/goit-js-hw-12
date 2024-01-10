import{S as i,i as c}from"./assets/vendor-46aac873.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const s=document.querySelector(".js-search-form"),u=document.querySelector("input"),d=document.querySelector(".gallery");let y=new i(".gallery a",{captions:!0,captionDelay:250,fadeSpeed:250,captionSelector:"img",captionsData:"alt",captionPosition:"bottom"});function m(){const l=new URLSearchParams({key:"41648594-e525389370aefc2e125a1a54e",q:`${u.value}`,image_type:"photo",orientation:"horizontal",safesearch:!0});return fetch(`https://pixabay.com/api/?${l}`).then(e=>{if(!e.ok)throw new Error(e.statusText);return e.json()}).catch(e=>new Error(e))}function f({hits:l}){const e=l.map(o=>`
    <li class="gallery__item">
    <a href="${o.largeImageURL}">
    <img class="gallery--img" src="${o.webformatURL}" alt="${o.tags}" title="${o.tags}"/>
    </a>
<ul class="gallery__list--characters">
  <p>likes: ${o.likes}</p>
  <p>views: ${o.views}</p>
  <p>comments: ${o.comments}</p>
  <p>downloads: ${o.downloads}</p>
</ul>
    </li>`).join("");d.innerHTML=e}document.querySelector(".gallery__item")||(document.querySelector(".loader").style.display="none");s.addEventListener("submit",l=>{l.preventDefault(),document.querySelector(".loader").style.display="block",m().then(e=>{f(e),y.refresh(),document.querySelector(".gallery__item")&&(document.querySelector(".loader").style.display="none"),e.hits.length===0&&(c.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),document.querySelector(".loader").style.display="none")}).catch(e=>new Error(e)),s.reset()});
//# sourceMappingURL=commonHelpers.js.map
