"use strict";(self.webpackChunkwebflow_dev_template=self.webpackChunkwebflow_dev_template||[]).push([[223],{223:(e,t,n)=>{function o(e,t){e.value=t?e.getAttribute("data-wait"):e.getAttribute("data-initial-state")}function r(e){const t=e+"=",n=decodeURIComponent(document.cookie).split(";");for(let e=0;e<n.length;e++){let o=n[e];for(;" "===o.charAt(0);)o=o.substring(1);if(0===o.indexOf(t))return o.substring(t.length,o.length)}return""}function s(e,t){const n=document.querySelector(e);n?(Array.from(n.children).forEach((e=>{e.textContent=t})),n.style.display="flex",n.style.display="flex",setTimeout((function(){n.style.display="none"}),45e3)):console.error("Element not found with the given query selector.")}function a(){!function(e,t,n,r=null,s=!0){const a=document.getElementById(e);a.parentElement.classList.remove("w-form"),a.onsubmit=async e=>{e.preventDefault();const s=a.querySelector('[w-el="SubmitButton"]');o(s,!0);try{const o=t(new FormData(a),e),s=await n(o);r(s)}catch(e){console.error(e)}finally{o(s,!1)}}}("wf-form-Generate-Product-Form",c,i,l)}function c(e){return{form:e.get("product_shape"),sole:e.get("product_sole"),bodyMaterial:e.get("product_material"),bodyPattern:e.get("product_pattern"),laces:e.get("product_laces"),generalstyle:e.get("product_gender")}}async function i(e){console.log(e);const t=document.querySelector(".starter-description"),n=document.querySelector(".results_components");!function(){const e="generateSneaker";let t=parseInt(r(e),10);if(!isNaN(t)&&t<3)t++;else{if(!isNaN(t))return;t=1}!function(e,t){const n=encodeURIComponent(t),o=new Date;o.setTime(o.getTime()+864e5);const r="expires="+o.toUTCString();document.cookie=e+"="+n+";"+r+";path=/;"}(e,String(t))}();const o=function(){let e=parseInt(r("generateSneaker"),10);return isNaN(e)?3:e<3?3-e:0}();return o>0?(n.classList.contains("hide")&&(t.classList.add("hide"),n.classList.remove("hide")),function(e,t){const n=document.querySelector(".success-message");n?(Array.from(n.children).forEach((e=>{e.textContent=t})),n.style.display="flex",setTimeout((function(){n.style.display="none"}),45e3)):console.error("Element not found with the given query selector.")}(0,`Please wait around 30 seconds for your sneaker image to be generated. You have ${o} generation attempt(s) left.`),{success:!0,data:"test"}):{success:!1,data:"no remaining calls"}}function l(e){e.success?(console.log("success!"),console.log(e)):e.success||"no remaining calls"!==e.data?s(".error-message","Something went wrong."):s(".error-message","You have reached the maximum number of sneaker image generations allowed (3). Please try again in 12h.")}n.r(t),n.d(t,{render:()=>a})}}]);
//# sourceMappingURL=223.bundle.1.0.3.js.map