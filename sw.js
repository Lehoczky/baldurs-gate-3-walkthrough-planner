if(!self.define){let s,e={};const i=(i,n)=>(i=new URL(i+".js",n).href,e[i]||new Promise((e=>{if("document"in self){const s=document.createElement("script");s.src=i,s.onload=e,document.head.appendChild(s)}else s=i,importScripts(i),e()})).then((()=>{let s=e[i];if(!s)throw new Error(`Module ${i} didn’t register its module`);return s})));self.define=(n,r)=>{const l=s||("document"in self?document.currentScript.src:"")||location.href;if(e[l])return;let o={};const t=s=>i(s,l),u={module:{uri:l},exports:o,require:t};e[l]=Promise.all(n.map((s=>u[s]||t(s)))).then((s=>(r(...s),o)))}}define(["./workbox-f3e6b16a"],(function(s){"use strict";self.skipWaiting(),s.clientsClaim(),s.precacheAndRoute([{url:"assets/DataLoadingErrorMessage-BEwviu6n.js",revision:null},{url:"assets/dialog.esm-CnWdNQVB.js",revision:null},{url:"assets/EdgeLabelDialog-DCwQgV6f.js",revision:null},{url:"assets/GroupLabelDialog-ByRKjEpt.js",revision:null},{url:"assets/index-BlQBXsoh.js",revision:null},{url:"assets/index-D9ZWIk9b.css",revision:null},{url:"assets/NoteNode-B3Tg7rAx.css",revision:null},{url:"assets/NoteNode-CHQ_KRi_.js",revision:null},{url:"assets/workbox-window.prod.es5-DFjpnwFp.js",revision:null},{url:"index.html",revision:"9173f6ad960dfd06a29c131fac69d10b"},{url:"data.json",revision:"d5006d7d316335cc8e6e2354a3b5b5cd"},{url:"manifest.webmanifest",revision:"9cd7c8db2b017b95d7c56960d5624c00"}],{}),s.cleanupOutdatedCaches(),s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))}));
