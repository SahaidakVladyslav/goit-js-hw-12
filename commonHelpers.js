import{S as E,a as $,i as f}from"./assets/vendor-89feecc5.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const u of s.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&n(u)}).observe(document,{childList:!0,subtree:!0});function t(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=t(r);fetch(r.href,s)}})();const w=document.querySelector(".js-search-form"),L=document.querySelector("input"),m=document.querySelector(".gallery"),I=document.querySelector(".loader"),M=document.querySelector(".js-loader"),l=document.querySelector(".more--btn"),y=document.querySelector(".non-existent");let a=1,i=1,d,_=[],g=[];const h=new E(".gallery a",{captions:!0,captionDelay:250,fadeSpeed:250,captionSelector:"img",captionsData:"alt",captionPosition:"bottom"});async function b(e,o){const t=new URLSearchParams({key:"41648594-e525389370aefc2e125a1a54e",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:80,page:e});try{return await $({method:"get",url:`https://pixabay.com/api/?${t}`})}catch(n){return console.error(n.message),l.classList.add("switcher"),f.info({title:"Hey!",message:"We re sorry, but you ve reached the end of search results."})}}async function v(e,o){try{const t=await b(e,o),n=t.data.hits.slice(0,40),r=t.data.hits.slice(40);_=[...n],g=[...r],c(),x(n),console.log(a),a===1?(console.log("count % 2 === 0",a%2===0),m.innerHTML=p(n),h.refresh()):(m.insertAdjacentHTML("beforeend",p(n)),h.refresh(),q())}catch(t){console.error(t.message)}}function p(e){return e.map(t=>`
    <li class="gallery__item">
    <a href="${t.largeImageURL}">
    <img class="gallery--img" src="${t.webformatURL}" alt="${t.tags}" title="${t.tags}"/>
    </a>
<ul class="gallery__list--characters">
  <p>likes: ${t.likes}</p>
  <p>views: ${t.views}</p>
  <p>comments: ${t.comments}</p>
  <p>downloads: ${t.downloads}</p>
</ul>
    </li>
    `).join("")}const x=e=>{try{if(e.length<40&e.length!==0)return l.classList.add("switcher"),f.info({title:"Hey!",message:"We re sorry, but you ve reached the end of search results."});if(e.length===0)return l.classList.add("switcher"),f.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});l.classList.remove("switcher")}catch(o){console.error(o.message)}},H=e=>(y.textContent=e,y.textContent),c=()=>{I.classList.toggle("switcher")},S=()=>{M.classList.toggle("non-existent")};function A(){const e=document.querySelector(".gallery__item");if(e){const o=e.getBoundingClientRect();return Math.round(o.height)}return 0}function q(){const e=A();e>0&&window.scrollBy({top:e*2,left:0,behavior:"smooth"})}c();w.addEventListener("submit",e=>{e.preventDefault(),i=1,a=1,c(),v(1,L.value),H(L.value),w.reset()});l.addEventListener("click",e=>{S(),a+=1,d=y.textContent,c(),S(),a%2===0?(m.insertAdjacentHTML("beforeend",p(g)),x(g),h.refresh(),c(),i+=1,b(i,d)):v(i,d),q()});
//# sourceMappingURL=commonHelpers.js.map
