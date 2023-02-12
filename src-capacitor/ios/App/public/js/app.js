(()=>{"use strict";var e={4647:(e,r,t)=>{var n=t(1957),o=t(8522),a=t(499),i=t(9835);function l(e,r,t,n,o,a){const l=(0,i.up)("router-view");return(0,i.wg)(),(0,i.j4)(l)}const c=(0,i.aZ)({name:"App"});var p=t(1639);const s=(0,p.Z)(c,[["render",l]]),u=s;var d=t(3340),h=t(8339);const f=[{path:"/",component:()=>Promise.all([t.e(736),t.e(482)]).then(t.bind(t,7482)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(625)]).then(t.bind(t,6625))}]},{path:"/bldg2eng",component:()=>Promise.all([t.e(736),t.e(482)]).then(t.bind(t,7482)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(723)]).then(t.bind(t,8723))}]},{path:"/bldg1kor",component:()=>Promise.all([t.e(736),t.e(482)]).then(t.bind(t,7482)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(20)]).then(t.bind(t,4020))}]},{path:"/bldg1eng",component:()=>Promise.all([t.e(736),t.e(482)]).then(t.bind(t,7482)),children:[{path:"",component:()=>Promise.all([t.e(736),t.e(936)]).then(t.bind(t,4936))}]},{path:"/:catchAll(.*)*",component:()=>Promise.all([t.e(736),t.e(862)]).then(t.bind(t,1862))}],b=f,m=(0,d.BC)((function(){const e=h.r5,r=(0,h.p7)({scrollBehavior:()=>({left:0,top:0}),routes:b,history:e("")});return r}));var v=t(7925);const{SplashScreen:g}=v.Vn,y=(0,i.aZ)({name:"AppWrapper",setup(e){return(0,i.bv)((()=>{g.hide()})),()=>(0,i.h)(u,e)}});async function w(e,r){const t=e(y);t.use(o.Z,r),t.config.globalProperties.$q.capacitor=window.Capacitor;const n=(0,a.Xl)("function"===typeof m?await m({}):m);return{app:t,router:n}}const P={config:{}};async function O({app:e,router:r}){e.use(r),e.mount("#q-app")}w(n.ri,P).then(O)}},r={};function t(n){var o=r[n];if(void 0!==o)return o.exports;var a=r[n]={exports:{}};return e[n](a,a.exports,t),a.exports}t.m=e,(()=>{var e=[];t.O=(r,n,o,a)=>{if(!n){var i=1/0;for(s=0;s<e.length;s++){for(var[n,o,a]=e[s],l=!0,c=0;c<n.length;c++)(!1&a||i>=a)&&Object.keys(t.O).every((e=>t.O[e](n[c])))?n.splice(c--,1):(l=!1,a<i&&(i=a));if(l){e.splice(s--,1);var p=o();void 0!==p&&(r=p)}}return r}a=a||0;for(var s=e.length;s>0&&e[s-1][2]>a;s--)e[s]=e[s-1];e[s]=[n,o,a]}})(),(()=>{t.n=e=>{var r=e&&e.__esModule?()=>e["default"]:()=>e;return t.d(r,{a:r}),r}})(),(()=>{t.d=(e,r)=>{for(var n in r)t.o(r,n)&&!t.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:r[n]})}})(),(()=>{t.f={},t.e=e=>Promise.all(Object.keys(t.f).reduce(((r,n)=>(t.f[n](e,r),r)),[]))})(),(()=>{t.u=e=>"js/"+e+".js"})(),(()=>{t.miniCssF=e=>{}})(),(()=>{t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()})(),(()=>{t.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r)})(),(()=>{var e={},r="helper-android:";t.l=(n,o,a,i)=>{if(e[n])e[n].push(o);else{var l,c;if(void 0!==a)for(var p=document.getElementsByTagName("script"),s=0;s<p.length;s++){var u=p[s];if(u.getAttribute("src")==n||u.getAttribute("data-webpack")==r+a){l=u;break}}l||(c=!0,l=document.createElement("script"),l.charset="utf-8",l.timeout=120,t.nc&&l.setAttribute("nonce",t.nc),l.setAttribute("data-webpack",r+a),l.src=n),e[n]=[o];var d=(r,t)=>{l.onerror=l.onload=null,clearTimeout(h);var o=e[n];if(delete e[n],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(t))),r)return r(t)},h=setTimeout(d.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=d.bind(null,l.onerror),l.onload=d.bind(null,l.onload),c&&document.head.appendChild(l)}}})(),(()=>{t.r=e=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}})(),(()=>{t.p=""})(),(()=>{var e={143:0};t.f.j=(r,n)=>{var o=t.o(e,r)?e[r]:void 0;if(0!==o)if(o)n.push(o[2]);else{var a=new Promise(((t,n)=>o=e[r]=[t,n]));n.push(o[2]=a);var i=t.p+t.u(r),l=new Error,c=n=>{if(t.o(e,r)&&(o=e[r],0!==o&&(e[r]=void 0),o)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+r+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,o[1](l)}};t.l(i,c,"chunk-"+r,r)}},t.O.j=r=>0===e[r];var r=(r,n)=>{var o,a,[i,l,c]=n,p=0;if(i.some((r=>0!==e[r]))){for(o in l)t.o(l,o)&&(t.m[o]=l[o]);if(c)var s=c(t)}for(r&&r(n);p<i.length;p++)a=i[p],t.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return t.O(s)},n=globalThis["webpackChunkhelper_android"]=globalThis["webpackChunkhelper_android"]||[];n.forEach(r.bind(null,0)),n.push=r.bind(null,n.push.bind(n))})();var n=t.O(void 0,[736],(()=>t(4647)));n=t.O(n)})();