if(!self.define){let e,s={};const i=(i,n)=>(i=new URL(i+".js",n).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,o)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(s[l])return;let r={};const t=e=>i(e,l),u={module:{uri:l},exports:r,require:t};s[l]=Promise.all(n.map((e=>u[e]||t(e)))).then((e=>(o(...e),r)))}}define(["./workbox-f3e6b16a"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/dialog.esm-LAQ66_Ea.js",revision:null},{url:"assets/EdgeLabelDialog-kw-E3XCo.js",revision:null},{url:"assets/GroupLabelDialog-7NMwmhyZ.js",revision:null},{url:"assets/index-LAxKutz3.css",revision:null},{url:"assets/index-ywFwbDIo.js",revision:null},{url:"assets/message.esm-PrpnTcBo.js",revision:null},{url:"assets/NoteNode-d04O6wMV.css",revision:null},{url:"assets/NoteNode-qCXNKaTW.js",revision:null},{url:"assets/workbox-window.prod.es5-prqDwDSL.js",revision:null},{url:"index.html",revision:"015440fea85f380e437b6b33434cb51e"},{url:"data.json",revision:"c857ee528ab68e20de919a1925a16634"},{url:"manifest.webmanifest",revision:"9cd7c8db2b017b95d7c56960d5624c00"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
