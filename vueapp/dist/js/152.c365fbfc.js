"use strict";(self["webpackChunkvueapp"]=self["webpackChunkvueapp"]||[]).push([[152],{9548:function(a,n,e){e.d(n,{H8:function(){return u},UP:function(){return l},d7:function(){return i},k2:function(){return c}});const t=["John","Jane","Michael","Emily","William","Sophia","James","Olivia","Benjamin","Isabella","Matthew","Ava","Jacob","Mia","Ethan","Charlotte","Daniel","Amelia","Alexander","Harper","Henry","Ella","Joseph","Abigail","Samuel"],u=async a=>{const n=5,e=a*n||0,u=e+n;return t.slice(e,u)},c=async a=>t.find((n=>n===a)),l=async()=>{},i=async()=>{}},2101:function(a,n,e){e.d(n,{hl:function(){return s},oq:function(){return c},wj:function(){return i},yE:function(){return l}});e(4114);var t=e(5852);const u=["Theta-3","Kappa-9","Omega-5","Alpha-8","Sigma-5","Beta-6","Gamma-10","Zeta-5","Omega-2","Beta-9","Sigma-9","Delta-5","Zeta-1","Kappa-7","Zeta-4","Kappa-9","Beta-4","Delta-9","Theta-4","Kappa-4","Gamma-8","Delta-6","Kappa-1","Alpha-10","Alpha-1"],c=async a=>{const n=5,e=a*n||0,t=e+n;return u.slice(e,t)},l=async a=>u.find((n=>n===a)),i=async a=>(t.M5.value.push({name:a}),!0),s=async(a,n)=>({friend:a,group:n})},8152:function(a,n,e){e.r(n),e.d(n,{default:function(){return _}});e(4114);var t=e(641),u=e(3751),c=e(33),l=e(953),i=e(5220),s=e(2101),r=e(6011),o=e(1239);const v=a=>((0,t.Qi)("data-v-d07c170e"),a=a(),(0,t.jt)(),a),p={class:"addfriend-container"},d={class:"search-container"},f=v((()=>(0,t.Lk)("i",{class:"fa fa-search"},null,-1))),y=[f],m={class:"friend-display-container"},k={key:1,class:"error"},h={key:2},b={key:3},g=v((()=>(0,t.Lk)("p",null,"Such group don't exist",-1))),C=[g];var A={__name:"AddGroup",setup(a){const n=(0,i.lq)(),e=(0,i.rd)(),v=(0,l.KR)(0),f=(0,l.KR)(!1),g=(0,l.KR)([]),A=(0,l.KR)(null),E=(0,l.KR)("");async function L(){f.value=!0;try{g.value=await(0,s.oq)(v.value),f.value=!1}catch(a){A.value=a,f.value=!1}}async function _(){g.value=[],f.value=!0;try{let a=await(0,s.yE)(E.value);a&&g.value.push(),f.value=!1}catch(a){A.value=a,f.value=!1}}function K(){v.value++,e.push({query:{page:v.value}})}function X(){v.value<1||(v.value--,e.push({query:{page:v.value}}))}function S(){_()}return(0,t.sV)((()=>{v.value=parseInt(n.query.page)||0,L()})),(0,t.wB)((()=>n.query.page),(a=>{v.value=a,L()})),(a,n)=>((0,t.uX)(),(0,t.CE)("div",p,[(0,t.Lk)("div",d,[(0,t.Lk)("form",null,[(0,t.bo)((0,t.Lk)("input",{"onUpdate:modelValue":n[0]||(n[0]=n=>a.username=n),type:"text",placeholder:"Search..",name:"search"},null,512),[[u.Jo,a.username]]),(0,t.Lk)("button",{class:"search-friend-button custom-button",type:"submit",onClick:(0,u.D$)(S,["prevent"])},y)])]),(0,t.Lk)("div",m,[f.value?((0,t.uX)(),(0,t.Wv)(o.A,{key:0})):A.value?((0,t.uX)(),(0,t.CE)("div",k,(0,c.v_)(A.value.message),1)):(0,t.Q3)("",!0),g.value.length>0?((0,t.uX)(),(0,t.CE)("div",h,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.value,((a,n)=>((0,t.uX)(),(0,t.Wv)(r.A,{name:a,type:"group",key:n},null,8,["name"])))),128))])):((0,t.uX)(),(0,t.CE)("div",b,C))]),(0,t.Lk)("div",{class:"page-nav-button-container"},[(0,t.Lk)("button",{class:"page-nav-button page-nav-button-prev",onClick:X}),(0,t.Lk)("button",{class:"page-nav-button page-nav-button-next",onClick:K})])]))}},E=e(6262);const L=(0,E.A)(A,[["__scopeId","data-v-d07c170e"]]);var _=L},1239:function(a,n,e){e.d(n,{A:function(){return p}});var t=e(641);const u=a=>((0,t.Qi)("data-v-a23fd0c2"),a=a(),(0,t.jt)(),a),c={class:"loading-animation"},l=u((()=>(0,t.Lk)("div",{class:"circles-to-rhombuses-spinner"},[(0,t.Lk)("div",{class:"circle"}),(0,t.Lk)("div",{class:"circle"}),(0,t.Lk)("div",{class:"circle"})],-1))),i=[l];function s(a,n){return(0,t.uX)(),(0,t.CE)("div",c,i)}var r=e(6262);const o={},v=(0,r.A)(o,[["render",s],["__scopeId","data-v-a23fd0c2"]]);var p=v},6011:function(a,n,e){e.d(n,{A:function(){return v}});var t=e(641),u=e(33),c=e(9548);const l={class:"social-entity-container"},i={class:"name-display"};var s={__name:"SocialEntity",props:{name:String,type:String},setup(a){const n=a;function e(){(0,c.UP)(n.name)}function s(){(0,c.d7)(n.name)}return(n,c)=>((0,t.uX)(),(0,t.CE)("div",l,[(0,t.Lk)("p",i,(0,u.v_)(a.name),1),"friend"===a.type?((0,t.uX)(),(0,t.CE)("button",{key:0,onClick:e,class:"invite-friend-button custom-button"})):"group"===a.type?((0,t.uX)(),(0,t.CE)("button",{key:1,onClick:s,class:"invite-group-button custom-button"})):(0,t.Q3)("",!0)]))}},r=e(6262);const o=(0,r.A)(s,[["__scopeId","data-v-b374b3da"]]);var v=o}}]);
//# sourceMappingURL=152.c365fbfc.js.map