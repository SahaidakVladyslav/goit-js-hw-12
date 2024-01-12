import{S as w,i as L,a as S}from"./assets/vendor-89feecc5.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const f=document.querySelector(".js-search-form"),i=document.querySelector("input"),u=document.querySelector(".gallery"),v=document.querySelector(".loader"),d=document.querySelector(".more--btn"),p=document.querySelector(".non-existent");let a=1,m;const b=new w(".gallery a",{captions:!0,captionDelay:250,fadeSpeed:250,captionSelector:"img",captionsData:"alt",captionPosition:"bottom"});async function g(r,n){const e=new URLSearchParams({key:"41648594-e525389370aefc2e125a1a54e",q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:r});try{return await S({method:"get",url:`https://pixabay.com/api/?${e}`})}catch(s){console.log(s)}}async function h(r,n){const e=await g(r,n);try{b.refresh(),c(),a!==1?u.insertAdjacentHTML("beforeend",y(e.data)):u.innerHTML=y(e.data)}catch(s){console.log(s)}}function y({hits:r}){return r.map(e=>`
    <li class="gallery__item">
    <a href="${e.largeImageURL}">
    <img class="gallery--img" src="${e.webformatURL}" alt="${e.tags}" title="${e.tags}"/>
    </a>
<ul class="gallery__list--characters">
  <p>likes: ${e.likes}</p>
  <p>views: ${e.views}</p>
  <p>comments: ${e.comments}</p>
  <p>downloads: ${e.downloads}</p>
</ul>
    </li>
    `).join("")}const c=()=>{v.classList.toggle("switcher")},x=async()=>{try{if((await g(1,i.value)).data.hits.length===0)return E(),u.innerHTML="",L.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});q()}catch(r){console.log(r)}};c();const E=()=>d.classList.add("switcher"),q=()=>d.classList.remove("switcher"),$=r=>(p.textContent=r,p.textContent);f.addEventListener("submit",r=>{r.preventDefault(),a=1,c(),h(1,i.value),x(),$(i.value),f.reset()});d.addEventListener("click",r=>{a+=1,m=p.textContent,h(a,m),c()});
//# sourceMappingURL=commonHelpers.js.map
