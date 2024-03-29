(function(){"use strict";var e={2523:function(e,n,t){t.d(n,{HW:function(){return u},Hh:function(){return i},Jv:function(){return o},wR:function(){return s}});t(4979);var r=t(5852),a=t(641);async function o(e,n){const t=await fetch("/api/auth/signin",{method:"POST",body:JSON.stringify({username:e,password:n}),headers:{"Content-Type":"application/json"}});if(t.ok){let e=await t.json();if(e.success){let n=e.token;const t=n.split(".");if(3!==t.length)return null;const a=atob(t[1]),o=JSON.parse(a);r.kQ.value.name=o.unique_name,r.kQ.value.email=o.email,localStorage.setItem("user",JSON.stringify(e.token))}return{...e}}return{sucess:!1,message:"Server error"}}async function i(e,n,t){const a=await fetch("/api/auth/signup",{method:"POST",body:JSON.stringify({username:e,email:n,password:t}),headers:{"Content-Type":"application/json"}});if(a.ok){let e=await a.json();if(e.success){let n=e.token;const t=n.split(".");if(3!==t.length)return null;const a=atob(t[1]),o=JSON.parse(a);r.kQ.value.name=o.unique_name,r.kQ.value.email=o.email,localStorage.setItem("user",JSON.stringify(e.token))}return{...e}}return{sucess:!1,message:"Server error"}}function u(){const e=JSON.parse(localStorage.getItem("user"));if(!e)return null;const n=e.split(".");if(3!==n.length)return null;const t=atob(n[1]),a=JSON.parse(t);return console.log(a),r.kQ.value.name=a.unique_name,r.kQ.value.email=a.email,a}const s=(0,a.EW)((()=>""!==r.kQ.value.name))},2241:function(e,n,t){t.d(n,{dF:function(){return a},hb:function(){return o},kg:function(){return r}});let r=new Date,a=["January","February","March","April","May","June","July","August","September","October","November","December"],o=a.map((e=>e.substring(0,3)))},5852:function(e,n,t){t.d(n,{A6:function(){return v},Gk:function(){return p},HF:function(){return f},M5:function(){return l},MW:function(){return m},PR:function(){return c},XG:function(){return d},kQ:function(){return a},vs:function(){return h}});var r=t(953);const a=(0,r.KR)({name:"",email:""}),o=(0,r.KR)([{name:"Friend1"},{name:"Friend2"},{name:"Friend3"},{name:"Friend4"},{name:"Friend5"},{name:"Friend6"},{name:"Friend7"},{name:"Friend8"},{name:"Friend9"},{name:"Friend10"}]),i=(0,r.KR)([{name:"Group1",creator:"Osminogka"},{name:"Group2",creator:"Osminogka"},{name:"Group3",creator:"Osminogka"},{name:"Group4",creator:"Osminogka"},{name:"Group5",creator:"Osminogka"},{name:"Group6",creator:"Osminogka"},{name:"Group7",creator:"Osminogka"},{name:"Group8",creator:"Osminogka"},{name:"Group9",creator:"Osminogka"},{name:"Group10",creator:"Osminogka"},{name:"Group11",creator:"Osminogka"},{name:"Group12",creator:"Osminogka"},{name:"Group13",creator:"Osminogka"},{name:"Group14",creator:"Osminogka"},{name:"Group15",creator:"Osminogka"},{name:"Group16",creator:"Osminogka"},{name:"Group17",creator:"Osminogka"},{name:"Group18",creator:"Osminogka"},{name:"Group19",creator:"Osminogka"},{name:"Group20",creator:"Osminogka"}]),u=(0,r.KR)([{name:"Friend Request 1"},{name:"Friend Request 2"},{name:"Friend Request 3"},{name:"Friend Request 4"},{name:"Friend Request 5"}]),s=(0,r.KR)([{name:"Group Invite 1"},{name:"Group Invite 2"},{name:"Group Invite 3"},{name:"Group Invite 4"},{name:"Group Invite 5"}]),c=(0,r.KR)([]),l=(0,r.KR)([]),d=(0,r.KR)([]),m=(0,r.KR)([]),f=async()=>(0===c.value.length&&(c.value=o.value),c.value),p=async()=>(0===l.value.length&&(l.value=i.value),l.value),h=async()=>(0===d.value.length&&(d.value=u.value),d.value),v=async()=>(0===m.value.length&&(m.value=s.value),m.value)},3799:function(e,n,t){var r=t(3751),a=t(641),o=t(953),i=t(33),u=t(8833),s=t(5806),c=t(5852);const l={id:"main-header",class:"main-header"},d={class:"main-header"},m=(0,a.Lk)("h1",{class:"header-text"},"That's Time!",-1),f={id:"usernavmenu",class:"user-nav"},p={ref:"scrollable",id:"sidebar",class:"sidenav"},h={key:0,class:"main-nav-div"},v={style:{display:"inline"}},b={key:0,class:"main-nav-div"},g={style:{display:"inline"}};var k={__name:"MainHeader",setup(e){function n(){F.showSideBar&&"showSideBar"!=event.target.id&&(F.showSideBar=!1,y(!0))}function k(){O.value&&"user-icon-button"!=event.target.id&&(O.value=!1)}function y(e=!1){let n=F.showSideBar;e||(n=!n),F.showSideBar=n;let t=n?"rotate(90deg)":"rotate(0deg)";document.getElementById("showSideBar").style.transform=t}function w(e){F[e]=!F[e]}t.e(450).then(t.bind(t,9450)),t.e(815).then(t.bind(t,9815)),t.e(770).then(t.bind(t,7770)),t.e(288).then(t.bind(t,9288)),(0,a.sV)((()=>{window.addEventListener("scroll",n),window.addEventListener("scroll",k);let e=document.getElementById("user-icon-button");e.addEventListener("click",(()=>{e.classList.add("animate"),setTimeout((()=>{e.classList.remove("animate")}),300)}));const t=document.getElementById("main-header"),r=document.getElementById("sidebar");let a=t.parentElement,o=t.offsetHeight/a.offsetHeight*100-13;r.style.height="calc(100% - "+o+"px)"}));const F=(0,o.Kh)({showSideBar:!1,showFriendList:!1,showGroupList:!1}),O=(0,o.KR)(!1);return(e,t)=>{const G=(0,a.g2)("router-link");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,a.Lk)("div",l,[(0,a.Lk)("div",d,[(0,a.Lk)("button",{id:"showSideBar",class:"show-nav-button",onClick:t[0]||(t[0]=e=>y())}),m,(0,a.bo)((0,a.Lk)("button",{id:"user-icon-button",onClick:t[1]||(t[1]=e=>O.value=!O.value),class:"user-icon"},null,512),[[(0,o.R1)(s.z0),k]])])]),(0,a.bF)(r.eB,{name:"usernav"},{default:(0,a.k6)((()=>[(0,a.bo)((0,a.Lk)("div",f,[(0,a.bF)(G,{to:"/profile",class:"button-nav-user button-nav-profile"}),(0,a.bF)(G,{to:"/logout",class:"button-nav-user button-nav-logout"})],512),[[r.aG,O.value]])])),_:1}),(0,a.bF)(r.eB,{name:"sidebar"},{default:(0,a.k6)((()=>[(0,a.bo)(((0,a.uX)(),(0,a.CE)("div",p,[(0,a.bF)(G,{to:{name:"AddFriend",query:{page:0}},class:"add-button add-friend-button custom-button",onClick:n}),(0,a.bF)(u.A,{showInterface:F.showFriendList,onShowList:w,showType:"showFriendList"},{default:(0,a.k6)((()=>[(0,a.eW)(" Friends ")])),_:1},8,["showInterface"]),(0,a.bF)(r.eB,{name:"navlists"},{default:(0,a.k6)((()=>[F.showFriendList?((0,a.uX)(),(0,a.CE)("div",h,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,o.R1)(c.PR),((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:"sidebar-entity-box"},[(0,a.Lk)("p",v,(0,i.v_)(e.name),1),(0,a.bF)(G,{to:{name:"Friend",params:{nickname:e.name}},class:"button-nav custom-button",onClick:n},null,8,["to"])])))),128))])):(0,a.Q3)("",!0)])),_:1}),(0,a.bF)(u.A,{showInterface:F.showGroupList,onShowList:w,showType:"showGroupList"},{default:(0,a.k6)((()=>[(0,a.eW)(" Groups ")])),_:1},8,["showInterface"]),(0,a.bF)(r.eB,{name:"navlists"},{default:(0,a.k6)((()=>[F.showGroupList?((0,a.uX)(),(0,a.CE)("div",b,[((0,a.uX)(!0),(0,a.CE)(a.FK,null,(0,a.pI)((0,o.R1)(c.M5),((e,t)=>((0,a.uX)(),(0,a.CE)("div",{key:t,class:"sidebar-entity-box"},[(0,a.Lk)("p",g,(0,i.v_)(e.name),1),(0,a.bF)(G,{to:{name:"Group",params:{groupname:e.name}},class:"button-nav custom-button",onClick:n},null,8,["to"])])))),128))])):(0,a.Q3)("",!0)])),_:1})])),[[r.aG,F.showSideBar],[(0,o.R1)(s.z0),n]])])),_:1})],64)}}};const y=k;var w=y,F=t(2241),O=t(2523);const G={key:0},L={key:0},S={class:"link-container"},A={class:"h1-date"};var C={__name:"App",setup(e){return t.e(906).then(t.bind(t,2906)),(0,a.KC)((async()=>{await(0,c.HF)(),await(0,c.Gk)()})),(e,n)=>{const t=(0,a.g2)("router-link"),r=(0,a.g2)("router-view");return(0,a.uX)(),(0,a.CE)(a.FK,null,[(0,o.R1)(O.wR)?((0,a.uX)(),(0,a.CE)("header",G,[(0,a.bF)(w)])):(0,a.Q3)("",!0),(0,a.Lk)("main",null,[(0,o.R1)(O.wR)?((0,a.uX)(),(0,a.CE)("div",L,[(0,a.Lk)("div",S,[(0,a.bF)(t,{to:"/",class:"custom-link"},{default:(0,a.k6)((()=>[(0,a.eW)("Main Page")])),_:1}),(0,a.bF)(t,{to:"/records",class:"custom-link"},{default:(0,a.k6)((()=>[(0,a.eW)("Records")])),_:1})]),(0,a.Lk)("h1",A,(0,i.v_)((0,o.R1)(F.kg).getDate())+" "+(0,i.v_)((0,o.R1)(F.dF)[(0,o.R1)(F.kg).getMonth()])+" "+(0,i.v_)((0,o.R1)(F.kg).getFullYear()),1)])):(0,a.Q3)("",!0),(0,a.bF)(r)])],64)}}},E=t(6262);const R=(0,E.A)(C,[["__scopeId","data-v-e57834da"]]);var _=R,q=t(5220);const I=[{path:"/login",name:"Login",component:()=>t.e(840).then(t.bind(t,9840)),meta:{title:"Login",requireAuth:!1}},{path:"/register",name:"Register",component:()=>t.e(973).then(t.bind(t,7973)),meta:{title:"Register",requireAuth:!1}},{path:"/profile",name:"Profile",component:()=>t.e(211).then(t.bind(t,8211)),meta:{title:"Profile",requireAuth:!0}},{path:"/social",name:"AddSocial",component:()=>t.e(529).then(t.bind(t,9529)),children:[{path:"addfriend",name:"AddFriend",component:()=>t.e(31).then(t.bind(t,2031)),meta:{title:"Add Friend",requireAuth:!0}},{path:"addgroup",name:"AddGroup",component:()=>t.e(152).then(t.bind(t,8152)),meta:{title:"Add Group",requireAuth:!0}},{path:"creategroup",name:"CreateGroup",component:()=>t.e(8).then(t.bind(t,5008)),meta:{title:"Create Group",requireAuth:!0}}],meta:{title:"Add Social",requireAuth:!0}},{path:"/",name:"Mainpage",component:()=>t.e(107).then(t.bind(t,5107)),meta:{title:"Mainpage",requireAuth:!0}},{path:"/records",name:"Records",component:()=>Promise.all([t.e(751),t.e(932)]).then(t.bind(t,1091)),meta:{title:"Records",requireAuth:!0}},{path:"/friend/:nickname",name:"Friend",component:()=>Promise.all([t.e(751),t.e(328)]).then(t.bind(t,359)),meta:{title:"Friend",requireAuth:!0}},{path:"/group/:groupname",name:"Group",component:()=>Promise.all([t.e(751),t.e(251)]).then(t.bind(t,7938)),meta:{title:"Group",requireAuth:!0}},{path:"/:pathMatch(.*)*",name:"NotFound",component:()=>t.e(679).then(t.bind(t,3679)),meta:{title:"Not Found",requireAuth:!1}}],B=(0,q.aE)({history:(0,q.LA)(),routes:I});B.beforeEach((e=>{const n=(0,O.HW)();if(e.meta.requireAuth&&!n)return{name:"Login",query:{redirect:e.fullPath}}})),B.beforeEach(((e,n,t)=>{document.title=e.meta.title||"Default Title",t()}));var T=B;(0,r.Ef)(_).use(T).mount("#app")},8833:function(e,n,t){t.d(n,{A:function(){return d}});var r=t(641),a=t(33);const o=e=>((0,r.Qi)("data-v-7dfaa8e5"),e=e(),(0,r.jt)(),e),i={class:"single-line"},u=o((()=>(0,r.Lk)("hr",{class:"nav-hr"},null,-1)));var s={__name:"CustomHideShow",props:{showInterface:Object,showType:String},emits:["showList"],setup(e,{emit:n}){const t=n;function o(e){t("showList",e)}return(n,t)=>((0,r.uX)(),(0,r.CE)("div",{onClick:t[0]||(t[0]=n=>o(e.showType)),class:"nav-header"},[(0,r.Lk)("p",i,[(0,r.RG)(n.$slots,"default")]),u,(0,r.Lk)("div",{class:(0,a.C4)(["arrow-select-user",{"expanded-user":e.showInterface}])},null,2)]))}},c=t(6262);const l=(0,c.A)(s,[["__scopeId","data-v-7dfaa8e5"]]);var d=l}},n={};function t(r){var a=n[r];if(void 0!==a)return a.exports;var o=n[r]={exports:{}};return e[r].call(o.exports,o,o.exports,t),o.exports}t.m=e,function(){var e=[];t.O=function(n,r,a,o){if(!r){var i=1/0;for(l=0;l<e.length;l++){r=e[l][0],a=e[l][1],o=e[l][2];for(var u=!0,s=0;s<r.length;s++)(!1&o||i>=o)&&Object.keys(t.O).every((function(e){return t.O[e](r[s])}))?r.splice(s--,1):(u=!1,o<i&&(i=o));if(u){e.splice(l--,1);var c=a();void 0!==c&&(n=c)}}return n}o=o||0;for(var l=e.length;l>0&&e[l-1][2]>o;l--)e[l]=e[l-1];e[l]=[r,a,o]}}(),function(){t.n=function(e){var n=e&&e.__esModule?function(){return e["default"]}:function(){return e};return t.d(n,{a:n}),n}}(),function(){t.d=function(e,n){for(var r in n)t.o(n,r)&&!t.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:n[r]})}}(),function(){t.f={},t.e=function(e){return Promise.all(Object.keys(t.f).reduce((function(n,r){return t.f[r](e,n),n}),[]))}}(),function(){t.u=function(e){return"js/"+e+"."+{8:"ed41104e",31:"80a315fd",107:"41d68c9c",152:"27715bf9",204:"fac88ce9",211:"c8f85f79",251:"6f438730",288:"18778e83",318:"9ee83f55",328:"3c01d3b7",450:"9ebce67d",529:"8f68b993",649:"0280ddaa",679:"1612289d",751:"651282b7",770:"c866446f",815:"9e7e7304",840:"8acb3d5e",906:"91540660",932:"9b7adaab",963:"a290357c",973:"a4dd0567",996:"76c6845b"}[e]+".js"}}(),function(){t.miniCssF=function(e){return"css/"+e+"."+{8:"ccb37a3f",31:"ffee2343",107:"f0ae4281",152:"207cd676",204:"5507a754",251:"56d3fc82",288:"159d4753",318:"a38a5886",328:"352bc41e",450:"48c1d139",529:"fd60595c",649:"3ae248c3",679:"6c4c8a97",770:"237feb37",815:"a9f4c876",840:"fba0c000",906:"b81db2fb",932:"5fbb5ca4",963:"4f034e44",973:"dae010f6",996:"f03cbcd3"}[e]+".css"}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)}}(),function(){var e={},n="vueapp:";t.l=function(r,a,o,i){if(e[r])e[r].push(a);else{var u,s;if(void 0!==o)for(var c=document.getElementsByTagName("script"),l=0;l<c.length;l++){var d=c[l];if(d.getAttribute("src")==r||d.getAttribute("data-webpack")==n+o){u=d;break}}u||(s=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,t.nc&&u.setAttribute("nonce",t.nc),u.setAttribute("data-webpack",n+o),u.src=r),e[r]=[a];var m=function(n,t){u.onerror=u.onload=null,clearTimeout(f);var a=e[r];if(delete e[r],u.parentNode&&u.parentNode.removeChild(u),a&&a.forEach((function(e){return e(t)})),n)return n(t)},f=setTimeout(m.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=m.bind(null,u.onerror),u.onload=m.bind(null,u.onload),s&&document.head.appendChild(u)}}}(),function(){t.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){t.p="/"}(),function(){if("undefined"!==typeof document){var e=function(e,n,r,a,o){var i=document.createElement("link");i.rel="stylesheet",i.type="text/css",t.nc&&(i.nonce=t.nc);var u=function(t){if(i.onerror=i.onload=null,"load"===t.type)a();else{var r=t&&t.type,u=t&&t.target&&t.target.href||n,s=new Error("Loading CSS chunk "+e+" failed.\n("+r+": "+u+")");s.name="ChunkLoadError",s.code="CSS_CHUNK_LOAD_FAILED",s.type=r,s.request=u,i.parentNode&&i.parentNode.removeChild(i),o(s)}};return i.onerror=i.onload=u,i.href=n,r?r.parentNode.insertBefore(i,r.nextSibling):document.head.appendChild(i),i},n=function(e,n){for(var t=document.getElementsByTagName("link"),r=0;r<t.length;r++){var a=t[r],o=a.getAttribute("data-href")||a.getAttribute("href");if("stylesheet"===a.rel&&(o===e||o===n))return a}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){a=i[r],o=a.getAttribute("data-href");if(o===e||o===n)return a}},r=function(r){return new Promise((function(a,o){var i=t.miniCssF(r),u=t.p+i;if(n(i,u))return a();e(r,u,null,a,o)}))},a={524:0};t.f.miniCss=function(e,n){var t={8:1,31:1,107:1,152:1,204:1,251:1,288:1,318:1,328:1,450:1,529:1,649:1,679:1,770:1,815:1,840:1,906:1,932:1,963:1,973:1,996:1};a[e]?n.push(a[e]):0!==a[e]&&t[e]&&n.push(a[e]=r(e).then((function(){a[e]=0}),(function(n){throw delete a[e],n})))}}}(),function(){var e={524:0};t.f.j=function(n,r){var a=t.o(e,n)?e[n]:void 0;if(0!==a)if(a)r.push(a[2]);else{var o=new Promise((function(t,r){a=e[n]=[t,r]}));r.push(a[2]=o);var i=t.p+t.u(n),u=new Error,s=function(r){if(t.o(e,n)&&(a=e[n],0!==a&&(e[n]=void 0),a)){var o=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;u.message="Loading chunk "+n+" failed.\n("+o+": "+i+")",u.name="ChunkLoadError",u.type=o,u.request=i,a[1](u)}};t.l(i,s,"chunk-"+n,n)}},t.O.j=function(n){return 0===e[n]};var n=function(n,r){var a,o,i=r[0],u=r[1],s=r[2],c=0;if(i.some((function(n){return 0!==e[n]}))){for(a in u)t.o(u,a)&&(t.m[a]=u[a]);if(s)var l=s(t)}for(n&&n(r);c<i.length;c++)o=i[c],t.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return t.O(l)},r=self["webpackChunkvueapp"]=self["webpackChunkvueapp"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=t.O(void 0,[504],(function(){return t(3799)}));r=t.O(r)})();
//# sourceMappingURL=app.a4e6a3b4.js.map