"use strict";(self["webpackChunkvueapp"]=self["webpackChunkvueapp"]||[]).push([[107],{8600:function(e,t,r){r.d(t,{JP:function(){return d},QE:function(){return u},_L:function(){return i},sH:function(){return h},tB:function(){return c},uj:function(){return m}});r(4114);var o=r(953),l=r(5852),s=r(2241),a=(0,o.Kh)([]);let n=[{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()-1,selectedObject:"John",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate(),selectedObject:"John",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate(),selectedObject:"John",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()+1,selectedObject:"John",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()+1,selectedObject:"Friend1",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()+1,selectedObject:"Friend1",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()+1,selectedObject:"Friend2",Creator:"Osminogka",yourSelf:!1,showGroupList:!1,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"},{selectedYear:2024,selectedMonth:3,selectedDay:s.kg.getDate()+1,selectedObject:"Group1",Creator:"Osminogka",yourSelf:!1,showGroupList:!0,hour:12,minute:30,recordName:"Meeting",recordContent:"Discuss the project plan"}];const c=e=>{let t=Math.min(e,s.kg.getDate()),r=Math.max(e,s.kg.getDate());return a.filter((o=>o.selectedMonth===s.kg.getMonth()+1&&o.selectedYear===s.kg.getFullYear()&&(s.kg.getDate()==e?o.selectedDay===e:o.selectedDay>t&&o.selectedDay<r)))},u=async e=>{let t=s.hb.indexOf(e.month)+1,r=e.day,o=e.year;return e.all?n.filter((e=>e.selectedDay===r&&e.selectedMonth===t&&e.selectedYear===o)):e.isGroup?n.filter((l=>l.selectedDay===r&&l.selectedMonth===t&&l.selectedYear===o&&!0===l.showGroupList&&l.selectedObject===e.name)):e.isFriend?n.filter((l=>l.selectedDay===r&&l.selectedMonth===t&&l.selectedYear===o&&!1===l.showGroupList&&l.selectedObject===e.name)):void 0},d=e=>l.PR.value.some((t=>t.name===e))?{isFriend:!0,records:[...n.filter((t=>(t.selectedObject===e||t.Creator===e)&&!1===t.yourSelf&&!1===t.showGroupList))]}:{isFriend:!1,records:[]},i=e=>l.M5.value.some((t=>t.name===e))?{isMember:!0,isCreator:l.M5.value.find((t=>t.name===e)).creator===l.kQ.value.name,Creator:l.M5.value.find((t=>t.name===e)).creator,members:["test1","test2","test3"],records:n.filter((t=>t.selectedObject===e&&!0===t.showGroupList))}:{isMember:!1,isCreator:!1,members:[],records:[]},h=e=>{e.all&&(a=n),e.isGroup&&(a=n.filter((t=>!1===t.yourSelf&&!0===t.showGroupList&&t.selectedObject===e.name))),e.isFriend&&(a=n.filter((t=>!1===t.yourSelf&&!1===t.showGroupList&&t.selectedObject===e.name)))},m=e=>{let t=p(e);return 0===t.length?(e.Creator=l.kQ.value.name,e.selectedMonth+=1,n.push(e),[]):t};function p(e){let t=[];return s.kg.getFullYear()-10<=e.selectedYear&&e.selectedYear<=s.kg.getFullYear()+10||t.push("selectedYear"),1<=e.selectedDay&&e.selectedDay<=new Date(e.selectedYear,e.selectedMonth+1,0).getDate()||t.push("selectedDay"),0<=e.selectedMonth&&e.selectedMonth<=11||t.push("selectedMonth"),(e.yourSelf?e.selectedObject==l.kQ.value.name:e.showGroupList?l.M5.value.some((t=>t.name===e.selectedObject)):l.PR.value.some((t=>t.name===e.selectedObject)))||t.push("selectedObject"),0<=parseInt(e.hour)&&parseInt(e.hour)<=23||t.push("hour"),0<=parseInt(e.minute)&&parseInt(e.minute)<=59||t.push("minute"),(e.recordName.length<=0||e.recordName.length>50)&&t.push("recordName"),(e.recordContent.length<=0||e.recordContent.length>500)&&t.push("recordContent"),t}},5107:function(e,t,r){r.r(t),r.d(t,{default:function(){return $}});r(4114);var o=r(641),l=r(33),s=r(953),a=r(3751);const n=e=>((0,o.Qi)("data-v-059800a8"),e=e(),(0,o.jt)(),e),c={key:0},u=n((()=>(0,o.Lk)("label",{class:"custom-label"},"Hour",-1))),d={key:0,class:"error-message"},i={key:1},h=n((()=>(0,o.Lk)("label",{class:"custom-label"},"Minute",-1))),m={key:0,class:"error-message"};var p={__name:"TimeSelector",props:(0,o.zz)({type:String,error:Boolean},{modelValue:{},modelModifiers:{}}),emits:["update:modelValue"],setup(e){const t=(0,o.fn)(e,"modelValue");return(r,s)=>"hour"===e.type?((0,o.uX)(),(0,o.CE)("div",c,[u,e.error?((0,o.uX)(),(0,o.CE)("p",d,"Invalid hour")):(0,o.Q3)("",!0),(0,o.bo)((0,o.Lk)("input",{class:(0,l.C4)(["input-time",{"error-input":e.error}]),type:"number","onUpdate:modelValue":s[0]||(s[0]=e=>t.value=e),min:"0",max:"23",step:"1",placeholder:"Hour"},null,2),[[a.Jo,t.value]])])):"minute"===e.type?((0,o.uX)(),(0,o.CE)("div",i,[h,e.error?((0,o.uX)(),(0,o.CE)("p",m,"Invalid minute")):(0,o.Q3)("",!0),(0,o.bo)((0,o.Lk)("input",{class:(0,l.C4)(["input-time",{"error-input":e.error}]),type:"number","onUpdate:modelValue":s[1]||(s[1]=e=>t.value=e),min:"0",max:"59",step:"1",placeholder:"Minute"},null,2),[[a.Jo,t.value]])])):(0,o.Q3)("",!0)}},k=r(6262);const g=(0,k.A)(p,[["__scopeId","data-v-059800a8"]]);var b=g,f=r(5852),y=r(2241),v=r(8600);const L={class:"container"},C={class:"table-container"},w={class:"month-header"},M={key:0},D=(0,o.Lk)("thead",null,[(0,o.Lk)("tr",null,[(0,o.Lk)("th",null,"Mon"),(0,o.Lk)("th",null,"Tue"),(0,o.Lk)("th",null,"Wed"),(0,o.Lk)("th",null,"Thu"),(0,o.Lk)("th",null,"Fri"),(0,o.Lk)("th",null,"Sat"),(0,o.Lk)("th",null,"Sun")])],-1),j={class:"arrow-container"},O={class:"form-for-record"},E={class:"p-selected-day"},Y={class:"checkbox-container"},x=(0,o.Lk)("label",{class:"label-checkbox"},"For Group",-1),R=(0,o.Lk)("label",{class:"label-checkbox"},"Yourself",-1),G={key:0,class:"error-message"},F=["data-value","data-list"],I={class:"label"},S={key:0},_=["onClick"],X=(0,o.Lk)("label",{class:"custom-label"},"Select importance",-1),N=["data-value","data-list"],T={class:"label"},Q={key:0},V=["onClick"],P={class:"checkbox-container checkbox-container-time"},K=(0,o.Lk)("label",{class:"label-checkbox"},"Enter Time",-1),J={key:0},B=(0,o.Lk)("label",{class:"custom-label"},"Record Name",-1),U={key:0,class:"error-message"},A=(0,o.Lk)("label",{class:"custom-label"},"Record Content",-1),W={key:1,class:"error-message"};var H={__name:"MainTable",setup(e){r.e(649).then(r.bind(r,8649)),r.e(996).then(r.bind(r,2996)),r.e(288).then(r.bind(r,9288)),r.e(204).then(r.bind(r,9204));const t=(0,s.Kh)({status:!0,message:"",showMessage:!1});async function n(){let e=(0,v.uj)({...(0,s.ux)(d)});for(let t in i)i[t].error=!1;if(e.length>0){for(let t of e)i[t].error=!0;t.showMessage=!0,t.message="Record creation failed!",t.status=!1,c(!1)}else t.showMessage=!0,t.message="Record created successfully!",t.status=!0,c(!0);setTimeout((()=>{t.showMessage=!1}),3e3)}function c(e){for(let t in i){let r=i[t];e&&(r.error=!1,"selectedObject"!==t&&(d[t]=r.default)),r.error&&!e&&(d[t]=r.default)}}const u=[{name:"Low",value:0},{name:"Medium",value:1},{name:"High",value:2}],d=(0,s.Kh)({selectedYear:y.kg.getFullYear(),selectedDay:1,selectedMonth:y.kg.getMonth(),showGroupList:!1,yourSelf:!1,selectedObject:f.PR.value[0].name,importance:0,enterTime:!1,hour:0,minute:0,recordName:"",recordContent:"",showObjectList:!1,showImportanceList:!1}),i=(0,s.Kh)({selectedYear:{error:!1,message:"Invalid year",default:y.kg.getFullYear()},selectedDay:{error:!1,message:"Invalid day",default:1},selectedMonth:{error:!1,message:"Invalid month",default:y.kg.getMonth()},selectedObject:{error:!1,message:"Invalid person selected"},hour:{error:!1,message:"Invalid hour",default:0},minute:{error:!1,message:"Invalid minute",default:0},recordName:{error:!1,message:d.recordName.length<=0?"Record name is too short":"Record name is too long",default:""},recordContent:{error:!1,message:d.recordContent<=0?"Record content is too long":"Record content is too short",default:""}});let h=y.kg.getFullYear(),m=(0,s.KR)(new Date(h,y.kg.getMonth()+1,0).getDate()),p=(0,s.KR)(new Date(h,y.kg.getMonth(),1).getDay()-1),k=(0,o.EW)((()=>y.dF[d.selectedMonth])),g=(0,o.EW)((()=>d.selectedYear!==y.kg.getFullYear()?d.selectedYear:"")),H=e=>e===y.kg.getDate()&&y.kg.getMonth()===d.selectedMonth;function z(){d.showImportanceList&&(d.showImportanceList=!1),d.showObjectList=!d.showObjectList}function $(e){d.selectedObject=e}function q(e){"Group"===e?(d.showGroupList=!d.showGroupList,d.yourSelf=!1,d.selectedObject=d.showGroupList?f.M5.value[0].name:f.PR.value[0].name):(d.yourSelf=!d.yourSelf,d.showGroupList=!1,d.selectedObject=d.yourSelf?f.kQ.value.name:f.PR.value[0].name)}function Z(){d.showImportanceList=!d.showImportanceList}function ee(e){d.importance=u.find((t=>t.name===e)).value}let te=e=>{let t=e.target;t.classList.add("animate"),setTimeout((()=>{t.classList.remove("animate"),d.selectedDay=parseInt(e.target.textContent)}),300)},re=e=>{d.selectedDay=1,d.selectedMonth+e<0?(d.selectedMonth=11,d.selectedYear--):d.selectedMonth+e>11?(d.selectedMonth=0,d.selectedYear++):d.selectedMonth+=e,m.value=new Date(d.selectedYear,d.selectedMonth+1,0).getDate(),p.value=new Date(d.selectedYear,d.selectedMonth,1).getDay()-1;let t=event.target;t.classList.add("animate"),setTimeout((()=>{t.classList.remove("animate")}),300)};const oe=(0,o.EW)((()=>{let e=[],t=[],r=1;for(let o=0;o<7;o++)o<p.value?t.push(null):t.push(r++);e.push(t);while(r<=m.value){t=[];for(let e=0;e<7;e++)r<=m.value?t.push(r++):t.push(null);e.push(t)}return e}));return(e,r)=>((0,o.uX)(),(0,o.CE)("div",L,[(0,o.Lk)("div",C,[(0,o.Lk)("p",w,[(0,o.eW)((0,l.v_)((0,s.R1)(k))+" ",1),(0,s.R1)(g)?((0,o.uX)(),(0,o.CE)("span",M,(0,l.v_)((0,s.R1)(g)),1)):(0,o.Q3)("",!0)]),(0,o.Lk)("table",null,[D,(0,o.Lk)("tbody",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(oe.value,((e,t)=>((0,o.uX)(),(0,o.CE)("tr",{key:t},[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(e,((e,t)=>((0,o.uX)(),(0,o.CE)("td",{key:t,class:(0,l.C4)({"td-today":(0,s.R1)(H)(e),"td-common-day":!(0,s.R1)(H)(e),"td-null-day":null===e})},[null!==e?((0,o.uX)(),(0,o.CE)("button",{key:0,onClick:r[0]||(r[0]=(...e)=>(0,s.R1)(te)&&(0,s.R1)(te)(...e)),class:(0,l.C4)(["button-cell",{"button-cell-current-day":(0,s.R1)(H)(e),"button-cell-selected":e==d.selectedDay}])},(0,l.v_)(e),3)):(0,o.Q3)("",!0)],2)))),128))])))),128))])]),(0,o.Lk)("div",j,[(0,o.Lk)("button",{onClick:r[1]||(r[1]=e=>(0,s.R1)(re)(-1)),class:"left-arrow custom-button arrow"}),(0,o.Lk)("button",{onClick:r[2]||(r[2]=e=>(0,s.R1)(re)(1)),class:"right-arrow custom-button arrow"})])]),(0,o.Lk)("form",O,[(0,o.Lk)("p",E,"Selected day: "+(0,l.v_)(d.selectedDay),1),(0,o.Lk)("div",Y,[(0,o.Lk)("div",{id:"input-checkbox",class:(0,l.C4)([{"input-checkbox-checked":d.showGroupList},"input-checkbox"]),onClick:r[3]||(r[3]=e=>q("Group"))},null,2),x,(0,o.Lk)("div",{id:"input-checkbox-yourself",class:(0,l.C4)([{"input-checkbox-checked":d.yourSelf},"input-checkbox"]),onClick:r[4]||(r[4]=e=>q("Yourself")),style:{"margin-left":"1em"}},null,2),R]),i.selectedObject.error?((0,o.uX)(),(0,o.CE)("p",G,(0,l.v_)(i.selectedObject.message),1)):(0,o.Q3)("",!0),(0,o.bF)(a.eB,{name:"showTimeEnter"},{default:(0,o.k6)((()=>[d.yourSelf?(0,o.Q3)("",!0):((0,o.uX)(),(0,o.CE)("div",{key:0,class:"aselect","data-value":d.selectedObject,"data-list":d.showGroupList?(0,s.R1)(f.M5):(0,s.R1)(f.PR)},[(0,o.Lk)("div",{class:(0,l.C4)([{"error-input":i.selectedObject.error},"selector"]),onClick:r[5]||(r[5]=e=>z())},[(0,o.Lk)("div",I,[(0,o.Lk)("span",null,(0,l.v_)(d.selectedObject),1)]),(0,o.Lk)("div",{class:(0,l.C4)(["arrow-select",{expanded:d.showObjectList}])},null,2),(0,o.bF)(a.eB,{name:"fadey"},{default:(0,o.k6)((()=>[d.showObjectList?((0,o.uX)(),(0,o.CE)("div",S,[(0,o.Lk)("ul",null,[((0,o.uX)(!0),(0,o.CE)(o.FK,null,(0,o.pI)(d.showGroupList?(0,s.R1)(f.M5):(0,s.R1)(f.PR),((t,r)=>((0,o.uX)(),(0,o.CE)("li",{class:(0,l.C4)({current:t===e.value}),onClick:e=>$(t.name),key:r},(0,l.v_)(t.name),11,_)))),128))])])):(0,o.Q3)("",!0)])),_:1})],2)],8,F))])),_:1}),X,(0,o.Lk)("div",{class:"aselect","data-value":d.importance,"data-list":u.name},[(0,o.Lk)("div",{class:"selector",onClick:r[6]||(r[6]=e=>Z())},[(0,o.Lk)("div",T,[(0,o.Lk)("span",null,(0,l.v_)(u.find((e=>e.value===d.importance)).name),1)]),(0,o.Lk)("div",{class:(0,l.C4)(["arrow-select",{expanded:d.showImportanceList}])},null,2),(0,o.bF)(a.eB,{name:"fadey"},{default:(0,o.k6)((()=>[d.showImportanceList?((0,o.uX)(),(0,o.CE)("div",Q,[(0,o.Lk)("ul",null,[((0,o.uX)(),(0,o.CE)(o.FK,null,(0,o.pI)(u,((t,r)=>(0,o.Lk)("li",{class:(0,l.C4)({current:t===e.value}),onClick:e=>ee(t.name),key:r},(0,l.v_)(t.name),11,V))),64))])])):(0,o.Q3)("",!0)])),_:1})])],8,N),(0,o.Lk)("div",P,[(0,o.Lk)("div",{id:"input-checkbox",class:(0,l.C4)([{"input-checkbox-checked":d.enterTime},"input-checkbox"]),onClick:r[7]||(r[7]=e=>d.enterTime=!d.enterTime)},null,2),K]),(0,o.bF)(a.eB,{name:"showTimeEnter"},{default:(0,o.k6)((()=>[d.enterTime?((0,o.uX)(),(0,o.CE)("div",J,[(0,o.bF)(b,{modelValue:d.hour,"onUpdate:modelValue":r[8]||(r[8]=e=>d.hour=e),type:"hour",error:i.hour.error},null,8,["modelValue","error"]),(0,o.bF)(b,{modelValue:d.minute,"onUpdate:modelValue":r[9]||(r[9]=e=>d.minute=e),type:"minute",error:i.minute.error},null,8,["modelValue","error"])])):(0,o.Q3)("",!0)])),_:1}),(0,o.Lk)("div",null,[B,i.recordName.error?((0,o.uX)(),(0,o.CE)("p",U,(0,l.v_)(i.recordName.message),1)):(0,o.Q3)("",!0),(0,o.bo)((0,o.Lk)("input",{class:(0,l.C4)(["input-form",{"error-input":i.recordName.error}]),type:"text","onUpdate:modelValue":r[10]||(r[10]=e=>d.recordName=e)},null,2),[[a.Jo,d.recordName]]),A,i.recordContent.error?((0,o.uX)(),(0,o.CE)("p",W,(0,l.v_)(i.recordContent.message),1)):(0,o.Q3)("",!0),(0,o.bo)((0,o.Lk)("textarea",{class:(0,l.C4)(["textarea-form input-record-content",{"error-input":i.recordContent.error}]),"onUpdate:modelValue":r[11]||(r[11]=e=>d.recordContent=e)},null,2),[[a.Jo,d.recordContent]])]),(0,o.Lk)("button",{onClick:(0,a.D$)(n,["prevent"]),class:"submit-button"},"Create Record"),(0,o.bF)(a.eB,{name:"showTimeEnter"},{default:(0,o.k6)((()=>[t.showMessage?((0,o.uX)(),(0,o.CE)("p",{key:0,class:(0,l.C4)(["creation-status",{"creation-successful":t.status,"creation-failed":!t.status}])},(0,l.v_)(t.message),3)):(0,o.Q3)("",!0)])),_:1})])]))}};const z=H;var $=z},4527:function(e,t,r){var o=r(3724),l=r(4376),s=TypeError,a=Object.getOwnPropertyDescriptor,n=o&&!function(){if(void 0!==this)return!0;try{Object.defineProperty([],"length",{writable:!1}).length=1}catch(e){return e instanceof TypeError}}();e.exports=n?function(e,t){if(l(e)&&!a(e,"length").writable)throw new s("Cannot set read only .length");return e.length=t}:function(e,t){return e.length=t}},6837:function(e){var t=TypeError,r=9007199254740991;e.exports=function(e){if(e>r)throw t("Maximum allowed index exceeded");return e}},4376:function(e,t,r){var o=r(4576);e.exports=Array.isArray||function(e){return"Array"===o(e)}},4114:function(e,t,r){var o=r(6518),l=r(8981),s=r(6198),a=r(4527),n=r(6837),c=r(9039),u=c((function(){return 4294967297!==[].push.call({length:4294967296},1)})),d=function(){try{Object.defineProperty([],"length",{writable:!1}).push()}catch(e){return e instanceof TypeError}},i=u||!d();o({target:"Array",proto:!0,arity:1,forced:i},{push:function(e){var t=l(this),r=s(t),o=arguments.length;n(r+o);for(var c=0;c<o;c++)t[r]=arguments[c],r++;return a(t,r),r}})}}]);
//# sourceMappingURL=107.41d68c9c.js.map