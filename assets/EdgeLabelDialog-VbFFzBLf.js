import{p as _,u as g,q as r,t as x,x as h,o as C,g as V,w as l,y as o,z as s,i as e,A as k,C as w,D as y}from"./index-dKCbrhgC.js";import{s as u,a as E}from"./dialog.esm-Vrkx4lUg.js";const L=e("div",{class:"flex items-center gap-2"},[e("div",{class:"text-lg font-bold"},"Edit edge label"),e("div",{class:"i-lucide-message-square-text"})],-1),A={class:"flex flex-col"},B=e("div",{class:"mb-1 text-base"},"Label",-1),N=_({__name:"EdgeLabelDialog",emits:["close"],setup(S,{emit:m}){const f=m,{getSelectedEdges:i}=g({id:"main"}),b=r(()=>x(i.value)),p=r(()=>b.value.label??""),t=h(p.value);function c(){for(const d of i.value)d.label=t.value;a()}function a(){f("close")}return(d,n)=>(C(),V(s(E),{modal:"","dismissable-mask":"",style:{width:"30rem"},visible:"","onUpdate:visible":a},{header:l(()=>[L]),footer:l(()=>[o(s(u),{label:"Cancel",severity:"danger",outlined:"",onClick:a}),o(s(u),{label:"Add Label",severity:"success",onClick:c})]),default:l(()=>[e("form",{onSubmit:k(c,["prevent"])},[e("label",A,[B,o(s(w),{modelValue:s(t),"onUpdate:modelValue":n[0]||(n[0]=v=>y(t)?t.value=v:null),type:"text",autofocus:""},null,8,["modelValue"])])],32)]),_:1}))}});export{N as default};
