"use strict";(self["webpackChunkvueapp"]=self["webpackChunkvueapp"]||[]).push([[31],{9548:function(a,n,e){e.d(n,{H8:function(){return u},UP:function(){return c},d7:function(){return s},k2:function(){return l}});const t=["John","Jane","Michael","Emily","William","Sophia","James","Olivia","Benjamin","Isabella","Matthew","Ava","Jacob","Mia","Ethan","Charlotte","Daniel","Amelia","Alexander","Harper","Henry","Ella","Joseph","Abigail","Samuel"],u=async a=>{const n=5,e=a*n||0,u=e+n;return t.slice(e,u)},l=async a=>t.find((n=>n===a)),c=async()=>{},s=async()=>{}},2031:function(a,n,e){e.r(n),e.d(n,{default:function(){return _}});e(4114);var t=e(641),u=e(3751),l=e(33),c=e(953),s=e(5220),i=e(9548),r=e(6011),o=e(1239);const v=a=>((0,t.Qi)("data-v-57623b58"),a=a(),(0,t.jt)(),a),d={class:"addfriend-container"},p={class:"search-container"},f=v((()=>(0,t.Lk)("i",{class:"fa fa-search"},null,-1))),k=[f],y={class:"friend-display-container"},b={key:1,class:"error"},h={key:2},m={key:3},g=v((()=>(0,t.Lk)("p",null,"Such user don't exist",-1))),C=[g];var L={__name:"AddFriend",setup(a){const n=(0,s.lq)(),e=(0,s.rd)(),v=(0,c.KR)(0),f=(0,c.KR)(!1),g=(0,c.KR)([]),L=(0,c.KR)(null),E=(0,c.KR)("");async function A(){f.value=!0;try{g.value=await(0,i.H8)(parseInt(v.value)),f.value=!1}catch(a){L.value=a,f.value=!1}}async function _(){g.value=[],f.value=!0;try{let a=await(0,i.k2)(E.value);a&&g.value.push(),f.value=!1}catch(a){L.value=a,f.value=!1}}function X(){v.value++,e.push({query:{page:v.value}})}function I(){v.value<1||(v.value--,e.push({query:{page:v.value}}))}function S(){""==E.value?A():_()}return(0,t.sV)((()=>{v.value=parseInt(n.query.page)||0,A()})),(0,t.wB)((()=>n.query.page),(a=>{v.value=a,A()})),(a,n)=>((0,t.uX)(),(0,t.CE)("div",d,[(0,t.Lk)("div",p,[(0,t.Lk)("form",null,[(0,t.bo)((0,t.Lk)("input",{class:"search-input-box","onUpdate:modelValue":n[0]||(n[0]=a=>E.value=a),type:"text",placeholder:"Search..",name:"search"},null,512),[[u.Jo,E.value]]),(0,t.Lk)("button",{class:"search-friend-button custom-button",type:"submit",onClick:(0,u.D$)(S,["prevent"])},k)])]),(0,t.Lk)("div",y,[f.value?((0,t.uX)(),(0,t.Wv)(o.A,{key:0})):L.value?((0,t.uX)(),(0,t.CE)("div",b,(0,l.v_)(L.value.message),1)):(0,t.Q3)("",!0),g.value.length>0?((0,t.uX)(),(0,t.CE)("div",h,[((0,t.uX)(!0),(0,t.CE)(t.FK,null,(0,t.pI)(g.value,((a,n)=>((0,t.uX)(),(0,t.Wv)(r.A,{name:a,type:"friend",key:n},null,8,["name"])))),128))])):((0,t.uX)(),(0,t.CE)("div",m,C))]),(0,t.Lk)("div",{class:"page-nav-button-container"},[(0,t.Lk)("button",{class:"page-nav-button page-nav-button-prev",onClick:I}),(0,t.Lk)("button",{class:"page-nav-button page-nav-button-next",onClick:X})])]))}},E=e(6262);const A=(0,E.A)(L,[["__scopeId","data-v-57623b58"]]);var _=A},1239:function(a,n,e){e.d(n,{A:function(){return d}});var t=e(641);const u=a=>((0,t.Qi)("data-v-a23fd0c2"),a=a(),(0,t.jt)(),a),l={class:"loading-animation"},c=u((()=>(0,t.Lk)("div",{class:"circles-to-rhombuses-spinner"},[(0,t.Lk)("div",{class:"circle"}),(0,t.Lk)("div",{class:"circle"}),(0,t.Lk)("div",{class:"circle"})],-1))),s=[c];function i(a,n){return(0,t.uX)(),(0,t.CE)("div",l,s)}var r=e(6262);const o={},v=(0,r.A)(o,[["render",i],["__scopeId","data-v-a23fd0c2"]]);var d=v},6011:function(a,n,e){e.d(n,{A:function(){return v}});var t=e(641),u=e(33),l=e(9548);const c={class:"social-entity-container"},s={class:"name-display"};var i={__name:"SocialEntity",props:{name:String,type:String},setup(a){const n=a;function e(){(0,l.UP)(n.name)}function i(){(0,l.d7)(n.name)}return(n,l)=>((0,t.uX)(),(0,t.CE)("div",c,[(0,t.Lk)("p",s,(0,u.v_)(a.name),1),"friend"===a.type?((0,t.uX)(),(0,t.CE)("button",{key:0,onClick:e,class:"invite-friend-button custom-button"})):"group"===a.type?((0,t.uX)(),(0,t.CE)("button",{key:1,onClick:i,class:"invite-group-button custom-button"})):(0,t.Q3)("",!0)]))}},r=e(6262);const o=(0,r.A)(i,[["__scopeId","data-v-b374b3da"]]);var v=o}}]);
//# sourceMappingURL=31.4196e9df.js.map