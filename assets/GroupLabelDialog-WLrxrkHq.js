import{p as m,x as p,o as u,g as f,w as i,y as r,z as s,i as t,A as b,C as v,D as c}from"./index-WRTdCBIX.js";import{s as n,a as $}from"./dialog.esm-ZkHifP4y.js";const g=t("div",{class:"flex items-center gap-2"},[t("div",{class:"text-lg font-bold"},"Edit group label"),t("div",{class:"i-lucide-message-square-text"})],-1),x={class:"flex flex-col"},y=t("div",{class:"mb-1 text-base"},"Label",-1),w=m({__name:"GroupLabelDialog",props:{label:{type:String,required:!0}},emits:["close"],setup(d){const l=p(d.label);return(a,e)=>(u(),f(s($),{modal:"","dismissable-mask":"",style:{width:"30rem"},visible:"","onUpdate:visible":e[4]||(e[4]=o=>a.$emit("close"))},{header:i(()=>[g]),footer:i(()=>[r(s(n),{label:"Cancel",severity:"danger",outlined:"",onClick:e[2]||(e[2]=o=>a.$emit("close"))}),r(s(n),{label:"Save",severity:"success",onClick:e[3]||(e[3]=o=>a.$emit("close",s(l)))})]),default:i(()=>[t("form",{onSubmit:e[1]||(e[1]=b(o=>a.$emit("close",s(l)),["prevent"]))},[t("label",x,[y,r(s(v),{modelValue:s(l),"onUpdate:modelValue":e[0]||(e[0]=o=>c(l)?l.value=o:null),type:"text",autofocus:""},null,8,["modelValue"])])],32)]),_:1}))}});export{w as default};