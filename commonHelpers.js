import{S as v,i as w,a as b}from"./assets/vendor-89feecc5.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerpolicy&&(o.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?o.credentials="include":t.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const m=document.querySelector(".js-search-form"),i=document.querySelector("input"),u=document.querySelector(".gallery"),q=document.querySelector(".loader"),x=document.querySelector(".js-loader"),f=document.querySelector(".more--btn"),d=document.querySelector(".non-existent");let a=1,y;const E=new v(".gallery a",{captions:!0,captionDelay:250,fadeSpeed:250,captionSelector:"img",captionsData:"alt",captionPosition:"bottom"});async function S(r,s){const e=new URLSearchParams({key:"41648594-e525389370aefc2e125a1a54e",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:150,page:r});try{const n=await b({method:"get",url:`https://pixabay.com/api/?${e}`});return n.data.hits.length<40&&p(),n}catch(n){n.message==="Request failed with status code 400"&&(p(),w.info({title:"Greetings!",message:"We're sorry, but you've reached the end of search results."})),console.log(n)}}async function L(r,s){try{const e=await S(r,s);E.refresh(),c(),a!==1?u.insertAdjacentHTML("beforeend",g(e.data)):u.innerHTML=g(e.data)}catch(e){console.log(e)}}function g({hits:r}){return r.map(e=>`
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
    `).join("")}const c=()=>{q.classList.toggle("switcher")},h=()=>{x.classList.toggle("non-existent")},$=async()=>{try{if((await S(1,i.value)).data.hits.length===0)return p(),u.innerHTML="",w.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});M()}catch(r){console.log(r)}};c();const p=()=>f.classList.add("switcher"),M=()=>f.classList.remove("switcher"),O=r=>(d.textContent=r,d.textContent);m.addEventListener("submit",r=>{r.preventDefault(),a=1,c(),L(1,i.value),$(),O(i.value),m.reset()});f.addEventListener("click",r=>{h(),a+=1,y=d.textContent,L(a,y),c(),h()});
//# sourceMappingURL=commonHelpers.js.map
