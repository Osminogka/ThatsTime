"use strict";(self["webpackChunkvueapp"]=self["webpackChunkvueapp"]||[]).push([[8],{2101:function(e,t,n){n.d(t,{hl:function(){return s},oq:function(){return u},wj:function(){return c},yE:function(){return o}});n(4114);var r=n(5852);const a=["Theta-3","Kappa-9","Omega-5","Alpha-8","Sigma-5","Beta-6","Gamma-10","Zeta-5","Omega-2","Beta-9","Sigma-9","Delta-5","Zeta-1","Kappa-7","Zeta-4","Kappa-9","Beta-4","Delta-9","Theta-4","Kappa-4","Gamma-8","Delta-6","Kappa-1","Alpha-10","Alpha-1"],u=async e=>{const t=5,n=e*t||0,r=n+t;return a.slice(n,r)},o=async e=>a.find((t=>t===e)),c=async e=>(r.M5.value.push({name:e}),!0),s=async(e,t)=>({friend:e,group:t})},5008:function(e,t,n){n.r(t),n.d(t,{default:function(){return b}});var r=n(641),a=n(3751),u=n(33),o=n(2101),c=n(953),s=n(5852);const i={class:"creation-group-container"},l={class:"create-group-container"},p={class:"creation-result-container"},f={key:0,class:"group-creation-status group-creation-failed"},v={key:1},d={class:"group-creation-status group-creation-success"},h={class:"friends-to-invite-container"},g=["onClick"];var m={__name:"CreateGroup",setup(e){const t=(0,c.KR)(""),n=(0,c.Kh)({error:!1,success:!1,message:""});async function m(){const e=await(0,o.wj)(t.value);e?(n.error=!1,n.success=!0,n.message="Group created successfully"):(n.error=!0,n.success=!1,n.message="Group name already exists")}const y=(0,c.KR)([...s.PR.value]);function k(e){(0,o.hl)(e,t.value),y.value=y.value.filter((t=>t.name!==e))}return(e,o)=>((0,r.uX)(),(0,r.CE)("div",i,[(0,r.Lk)("form",l,[(0,r.bo)((0,r.Lk)("input",{class:"create-group-input-box","onUpdate:modelValue":o[0]||(o[0]=e=>t.value=e),type:"text",placeholder:"Group Name",name:"groupname"},null,512),[[a.Jo,t.value]]),(0,r.Lk)("button",{class:"create-group-button",onClick:o[1]||(o[1]=(0,a.D$)((e=>m()),["prevent"])),type:"submit"},"Create Group")]),(0,r.Lk)("div",p,[(0,r.bF)(a.eB,{name:"bounce"},{default:(0,r.k6)((()=>[n.error?((0,r.uX)(),(0,r.CE)("div",f,(0,u.v_)(n.message),1)):n.success?((0,r.uX)(),(0,r.CE)("div",v,[(0,r.Lk)("div",d,(0,u.v_)(n.message),1),(0,r.Lk)("div",h,[((0,r.uX)(!0),(0,r.CE)(r.FK,null,(0,r.pI)(y.value,((e,t)=>((0,r.uX)(),(0,r.CE)("div",{class:"friend-invite-container",key:t},[(0,r.Lk)("p",null,(0,u.v_)(e.name),1),(0,r.Lk)("button",{onClick:t=>k(e.name),class:"send-invitation-button"},null,8,g)])))),128))])])):(0,r.Q3)("",!0)])),_:1})])]))}},y=n(6262);const k=(0,y.A)(m,[["__scopeId","data-v-6de78e26"]]);var b=k},4527:function(e,t,n){var r=n(3724),a=n(4376),u=TypeError,o=Object.getOwnPropertyDescriptor,c=r&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=c?function(e,t){if(a(e)&&!o(e,"length").writable)throw new u("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},6837:function(e){var t=TypeError,n=9007199254740991;e.exports=function(e){if(e>n)throw t("Maximum allowed index exceeded");return e}},4376:function(e,t,n){var r=n(4576);e.exports=Array.isArray||function(e){return"Array"===r(e)}},4114:function(e,t,n){var r=n(6518),a=n(8981),u=n(6198),o=n(4527),c=n(6837),s=n(9039),i=s((function(){return 4294967297!==[].push.call({length:4294967296},1)})),l=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},p=i||!l();r({target:"Array",proto:!0,arity:1,forced:p},{push:function(e){var t=a(this),n=u(t),r=arguments.length;c(n+r);for(var s=0;s<r;s++)t[n]=arguments[s],n++;return o(t,n),n}})}}]);
//# sourceMappingURL=8.ed41104e.js.map