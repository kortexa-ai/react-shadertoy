import{r as F,e as Ee,u as Re,a as Ce,O as xe,C as Se,j,c as Te}from"./three-libs-1-CNJl59i1.js";import{l as we,f as Ae,U as $e,e as je,m as Oe}from"./three-core-DHTyafXL.js";import"./react-vendor-BHYkMPm1.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))h(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const v of o.addedNodes)v.tagName==="LINK"&&v.rel==="modulepreload"&&h(v)}).observe(document,{childList:!0,subtree:!0});function d(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function h(n){if(n.ep)return;n.ep=!0;const o=d(n);fetch(n.href,o)}})();/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Me=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,d,h)=>h?h.toUpperCase():d.toLowerCase()),fe=r=>{const s=Me(r);return s.charAt(0).toUpperCase()+s.slice(1)},ge=(...r)=>r.filter((s,d,h)=>!!s&&s.trim()!==""&&h.indexOf(s)===d).join(" ").trim(),Ie=r=>{for(const s in r)if(s.startsWith("aria-")||s==="role"||s==="title")return!0};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Pe={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=F.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:d=2,absoluteStrokeWidth:h,className:n="",children:o,iconNode:v,...l},E)=>F.createElement("svg",{ref:E,...Pe,width:s,height:s,stroke:r,strokeWidth:h?Number(d)*24/Number(s):d,className:ge("lucide",n),...!o&&!Ie(l)&&{"aria-hidden":"true"},...l},[...v.map(([$,_])=>F.createElement($,_)),...Array.isArray(o)?o:[o]]));/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const re=(r,s)=>{const d=F.forwardRef(({className:h,...n},o)=>F.createElement(ke,{ref:o,iconNode:s,className:ge(`lucide-${Ne(fe(r))}`,`lucide-${r}`,h),...n}));return d.displayName=fe(r),d};/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],De=re("pause",be);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ue=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Le=re("play",Ue);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const He=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Fe=re("rotate-ccw",He);/**
 * @license lucide-react v0.541.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ye=[["path",{d:"M21 4v16",key:"7j8fe9"}],["path",{d:"M6.029 4.285A2 2 0 0 0 3 6v12a2 2 0 0 0 3.029 1.715l9.997-5.998a2 2 0 0 0 .003-3.432z",key:"zs4d6"}]],qe=re("skip-forward",Ye);var oe={exports:{}},K={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var pe;function ze(){if(pe)return K;pe=1;var r=Symbol.for("react.transitional.element"),s=Symbol.for("react.fragment");function d(h,n,o){var v=null;if(o!==void 0&&(v=""+o),n.key!==void 0&&(v=""+n.key),"key"in n){o={};for(var l in n)l!=="key"&&(o[l]=n[l])}else o=n;return n=o.ref,{$$typeof:r,type:h,key:v,ref:n!==void 0?n:null,props:o}}return K.Fragment=s,K.jsx=d,K.jsxs=d,K}var de;function Be(){return de||(de=1,oe.exports=ze()),oe.exports}var H=Be(),se={exports:{}},c={};/**
 * @license React
 * react.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ve;function Ge(){if(ve)return c;ve=1;var r=Symbol.for("react.transitional.element"),s=Symbol.for("react.portal"),d=Symbol.for("react.fragment"),h=Symbol.for("react.strict_mode"),n=Symbol.for("react.profiler"),o=Symbol.for("react.consumer"),v=Symbol.for("react.context"),l=Symbol.for("react.forward_ref"),E=Symbol.for("react.suspense"),$=Symbol.for("react.memo"),_=Symbol.for("react.lazy"),a=Symbol.iterator;function T(e){return e===null||typeof e!="object"?null:(e=a&&e[a]||e["@@iterator"],typeof e=="function"?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},O=Object.assign,x={};function y(e,t,u){this.props=e,this.context=t,this.refs=x,this.updater=u||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function N(){}N.prototype=y.prototype;function R(e,t,u){this.props=e,this.context=t,this.refs=x,this.updater=u||g}var k=R.prototype=new N;k.constructor=R,O(k,y.prototype),k.isPureReactComponent=!0;var b=Array.isArray,f={H:null,A:null,T:null,S:null,V:null},Y=Object.prototype.hasOwnProperty;function C(e,t,u,i,m,S){return u=S.ref,{$$typeof:r,type:e,key:t,ref:u!==void 0?u:null,props:S}}function L(e,t){return C(e.type,t,void 0,void 0,void 0,e.props)}function w(e){return typeof e=="object"&&e!==null&&e.$$typeof===r}function Q(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(u){return t[u]})}var J=/\/+/g;function I(e,t){return typeof e=="object"&&e!==null&&e.key!=null?Q(""+e.key):t.toString(36)}function P(){}function Z(e){switch(e.status){case"fulfilled":return e.value;case"rejected":throw e.reason;default:switch(typeof e.status=="string"?e.then(P,P):(e.status="pending",e.then(function(t){e.status==="pending"&&(e.status="fulfilled",e.value=t)},function(t){e.status==="pending"&&(e.status="rejected",e.reason=t)})),e.status){case"fulfilled":return e.value;case"rejected":throw e.reason}}throw e}function D(e,t,u,i,m){var S=typeof e;(S==="undefined"||S==="boolean")&&(e=null);var p=!1;if(e===null)p=!0;else switch(S){case"bigint":case"string":case"number":p=!0;break;case"object":switch(e.$$typeof){case r:case s:p=!0;break;case _:return p=e._init,D(p(e._payload),t,u,i,m)}}if(p)return m=m(e),p=i===""?"."+I(e,0):i,b(m)?(u="",p!=null&&(u=p.replace(J,"$&/")+"/"),D(m,t,u,"",function(_e){return _e})):m!=null&&(w(m)&&(m=L(m,u+(m.key==null||e&&e.key===m.key?"":(""+m.key).replace(J,"$&/")+"/")+p)),t.push(m)),1;p=0;var U=i===""?".":i+":";if(b(e))for(var A=0;A<e.length;A++)i=e[A],S=U+I(i,A),p+=D(i,t,u,S,m);else if(A=T(e),typeof A=="function")for(e=A.call(e),A=0;!(i=e.next()).done;)i=i.value,S=U+I(i,A++),p+=D(i,t,u,S,m);else if(S==="object"){if(typeof e.then=="function")return D(Z(e),t,u,i,m);throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.")}return p}function q(e,t,u){if(e==null)return e;var i=[],m=0;return D(e,i,"","",function(S){return t.call(u,S,m++)}),i}function ne(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(u){(e._status===0||e._status===-1)&&(e._status=1,e._result=u)},function(u){(e._status===0||e._status===-1)&&(e._status=2,e._result=u)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var le=typeof reportError=="function"?reportError:function(e){if(typeof window=="object"&&typeof window.ErrorEvent=="function"){var t=new window.ErrorEvent("error",{bubbles:!0,cancelable:!0,message:typeof e=="object"&&e!==null&&typeof e.message=="string"?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process=="object"&&typeof process.emit=="function"){process.emit("uncaughtException",e);return}console.error(e)};function ye(){}return c.Children={map:q,forEach:function(e,t,u){q(e,function(){t.apply(this,arguments)},u)},count:function(e){var t=0;return q(e,function(){t++}),t},toArray:function(e){return q(e,function(t){return t})||[]},only:function(e){if(!w(e))throw Error("React.Children.only expected to receive a single React element child.");return e}},c.Component=y,c.Fragment=d,c.Profiler=n,c.PureComponent=R,c.StrictMode=h,c.Suspense=E,c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=f,c.__COMPILER_RUNTIME={__proto__:null,c:function(e){return f.H.useMemoCache(e)}},c.cache=function(e){return function(){return e.apply(null,arguments)}},c.cloneElement=function(e,t,u){if(e==null)throw Error("The argument must be a React element, but you passed "+e+".");var i=O({},e.props),m=e.key,S=void 0;if(t!=null)for(p in t.ref!==void 0&&(S=void 0),t.key!==void 0&&(m=""+t.key),t)!Y.call(t,p)||p==="key"||p==="__self"||p==="__source"||p==="ref"&&t.ref===void 0||(i[p]=t[p]);var p=arguments.length-2;if(p===1)i.children=u;else if(1<p){for(var U=Array(p),A=0;A<p;A++)U[A]=arguments[A+2];i.children=U}return C(e.type,m,void 0,void 0,S,i)},c.createContext=function(e){return e={$$typeof:v,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},c.createElement=function(e,t,u){var i,m={},S=null;if(t!=null)for(i in t.key!==void 0&&(S=""+t.key),t)Y.call(t,i)&&i!=="key"&&i!=="__self"&&i!=="__source"&&(m[i]=t[i]);var p=arguments.length-2;if(p===1)m.children=u;else if(1<p){for(var U=Array(p),A=0;A<p;A++)U[A]=arguments[A+2];m.children=U}if(e&&e.defaultProps)for(i in p=e.defaultProps,p)m[i]===void 0&&(m[i]=p[i]);return C(e,S,void 0,void 0,null,m)},c.createRef=function(){return{current:null}},c.forwardRef=function(e){return{$$typeof:l,render:e}},c.isValidElement=w,c.lazy=function(e){return{$$typeof:_,_payload:{_status:-1,_result:e},_init:ne}},c.memo=function(e,t){return{$$typeof:$,type:e,compare:t===void 0?null:t}},c.startTransition=function(e){var t=f.T,u={};f.T=u;try{var i=e(),m=f.S;m!==null&&m(u,i),typeof i=="object"&&i!==null&&typeof i.then=="function"&&i.then(ye,le)}catch(S){le(S)}finally{f.T=t}},c.unstable_useCacheRefresh=function(){return f.H.useCacheRefresh()},c.use=function(e){return f.H.use(e)},c.useActionState=function(e,t,u){return f.H.useActionState(e,t,u)},c.useCallback=function(e,t){return f.H.useCallback(e,t)},c.useContext=function(e){return f.H.useContext(e)},c.useDebugValue=function(){},c.useDeferredValue=function(e,t){return f.H.useDeferredValue(e,t)},c.useEffect=function(e,t,u){var i=f.H;if(typeof u=="function")throw Error("useEffect CRUD overload is not enabled in this build of React.");return i.useEffect(e,t)},c.useId=function(){return f.H.useId()},c.useImperativeHandle=function(e,t,u){return f.H.useImperativeHandle(e,t,u)},c.useInsertionEffect=function(e,t){return f.H.useInsertionEffect(e,t)},c.useLayoutEffect=function(e,t){return f.H.useLayoutEffect(e,t)},c.useMemo=function(e,t){return f.H.useMemo(e,t)},c.useOptimistic=function(e,t){return f.H.useOptimistic(e,t)},c.useReducer=function(e,t,u){return f.H.useReducer(e,t,u)},c.useRef=function(e){return f.H.useRef(e)},c.useState=function(e){return f.H.useState(e)},c.useSyncExternalStore=function(e,t,u){return f.H.useSyncExternalStore(e,t,u)},c.useTransition=function(){return f.H.useTransition()},c.version="19.1.0",c}var me;function We(){return me||(me=1,se.exports=Ge()),se.exports}var M=We();const X="iTime",z="iTimeDelta",B="iDate",G="iFrame",W="iMouse",V="iResolution",ce="iChannel",ae="iChannelResolution",te="iDeviceOrientation",Ve=["lowp","mediump","highp"],ue=`
// HSV to RGB conversion
vec3 hsv(float h, float s, float v) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
  return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
}
`,he=`
void main(void) {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
`,Je=`
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 FC = fragCoord;
  vec2 r = iResolution.xy;
  float t = iTime;
  vec4 o = vec4(0.0, 0.0, 0.0, 1.0);
  // ------------------------------
  // processed direct shader code
  // ------------------------------
%SHADER_CODE%
  // ------------------------------
  fragColor = o;
}
`,ee=(r,s,d)=>r.replace(new RegExp(`(${s}\\s+([a-zA-Z_]\\w*(?:\\s*,\\s*[a-zA-Z_]\\w*(?:\\s*=\\s*[^;]+?)?)*)\\s*;)`,"g"),(h,n,o)=>{console.log(`Found uninitialized ${s} variables`);const v=[];let l="",E=0,$=!1;for(let _=0;_<o.length;_++){const a=o[_];if(a==="("&&E++,a===")"&&E--,a==="="&&E===0&&($=!0),a===","&&E===0&&!$){const T=l.trim();v.push(T.includes("=")?T:`${T}=${d}`),l="",$=!1}else l+=a}if(l){const _=l.trim();v.push(_.includes("=")?_:`${_}=${d}`)}return`${s} ${v.join(", ")};`}),Ze=(r,s,d,h)=>{const o=`precision ${Ve.includes(s)?s:"highp"} float;
`,v=`#define DPR ${d.toFixed(1)}
`,l=r.includes("void main("),E=r.includes("void mainImage("),$=!l&&!E;let _=r;$&&(_=Je.replace("%SHADER_CODE%",r));let a=_;a=a.replace(/for\s*\(\s*float\s+(\w+)\s*;\s*([^;]+);([^)]+)\)/g,(x,y,N,R)=>N.includes("=")?x:`for(float ${y}=0.;${N};${R})`),a=a.replace(/for\s*\(\s*;\s*([^;]+);([^)]+)\)/g,(x,y,N)=>{const R=y.match(/(\w+)\s*(\+\+|\-\-|<|>|<=|>=|==|!=)/);return R&&!y.includes("=")?`for(float ${R[1]}=0.;${y};${N})`:x}),a=a.replace(/mat2\s*\(\s*cos\s*\(\s*([^)]+)\+vec4\s*\(([^)]+)\)\s*\)\s*\)\s*(\*?\s*[0-9.]+)?/g,(x,y,N,R)=>{const k=`${y}+vec4(${N})`,b=R?R.trim():"";return`mat2(cos(${k})${b})`}),a=a.replace(/exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,(x,y)=>`exp(clamp(${y}, -87.0, 87.0))`),a=a.replace(/exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,(x,y)=>`exp(clamp(${y}, -87.0, 87.0))`);const T=[];a.includes("out vec4 fragColor")&&!a.match(/\bfragColor\s*=/)&&T.push("fragColor = vec4(0.);"),a.includes("iResolution")||T.push("vec2 r = iResolution.xy;"),a.includes("iTime")||T.push("float t = iTime;"),T.length>0&&(a=a.replace(/void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{/,`$& ${T.join(" ")}`)),a=a.replace(/(void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{)([\s\S]*?)}/,(x,y,N)=>{let R=N;return R=ee(R,"float","0."),R=ee(R,"vec2","vec2(0.)"),R=ee(R,"vec3","vec3(0.)"),R=ee(R,"vec4","vec4(0.)"),`${y}${R}}`});let g="";l?g=o+v+ue+a:g=o+v+ue+a+he,g=g.replace(/texture\(/g,"texture2D(");const O=[`uniform float ${X};`,`uniform vec2 ${V};`];g.includes(z)&&O.push(`uniform float ${z};`),g.includes(G)&&O.push(`uniform int ${G};`),g.includes(W)&&O.push(`uniform vec4 ${W};`),g.includes(B)&&O.push(`uniform vec4 ${B};`),g.includes(te)&&O.push(`uniform vec4 ${te};`);for(let x=0;x<h;x++)g.includes(`${ce}${x}`)&&O.push(`uniform sampler2D ${ce}${x};`);if(g.includes(ae)&&h>0&&O.push(`uniform vec3 ${ae}[${h}];`),O.length>0){const x=O.join(`
`)+`

`,y=o.length+v.length;g=g.substring(0,y)+x+g.substring(y)}return g};function Ke(r=256,s=8,d=[255,255,255,255],h=[0,0,0,255]){const n=new Uint8Array(r*r*4),o=r/s;for(let l=0;l<r;l++)for(let E=0;E<r;E++){const $=(l*r+E)*4,_=Math.floor(E/o),a=Math.floor(l/o),g=(_+a)%2===0?d:h;n[$]=g[0],n[$+1]=g[1],n[$+2]=g[2],n[$+3]=g[3]}const v=new we(n,r,r,Ae,$e);return v.needsUpdate=!0,v}function Xe(r,s,d="iChannel",h="iChannelResolution"){const n={};if(r.length===0)return n;if(r.forEach((o,v)=>{const l=`${d}${v}`;s.includes(l)&&(n[l]={value:o})}),s.includes(h)){const o=[];r.forEach((v,l)=>{v?(o[l*3]=v.image.width,o[l*3+1]=v.image.height,o[l*3+2]=1):(o[l*3]=0,o[l*3+1]=0,o[l*3+2]=0)}),n[h]={value:o}}return n}Ee({ShaderMaterial:Oe});const Qe=`
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,et=`
uniform float ${X};
uniform vec2 ${V};

void main() {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 uv = gl_FragCoord.xy/${V}.xy;
    vec3 col = vec3(1,1,1);
    gl_FragColor = vec4(col,1.0);
}
`;function tt({fs:r=et,vs:s=Qe,textures:d=[],uniforms:h={},clearColor:n=null,precision:o="highp",width:v,height:l,devicePixelRatio:E=1}){const{size:$,scene:_,gl:a}=Re(),T=M.useRef(null),g=M.useRef(0),[O]=M.useState(Date.now()/1e3),x=M.useRef(0),[y]=M.useState([0,0,0,0]),[N,R]=M.useState([]);M.useEffect(()=>{const C=Ke(256,8,[255,0,0,255],[0,255,255,255]);return R([C]),()=>{N.forEach(L=>L?.dispose())}},[]);const k=M.useRef(null);if(!k.current){const C={[X]:{value:0},[V]:{value:[0,0]}};r.includes(z)&&(C[z]={value:0}),r.includes(B)&&(C[B]={value:[0,0,0,0]}),r.includes(G)&&(C[G]={value:0}),r.includes(W)&&(C[W]={value:[0,0,0,0]}),r.includes(te)&&(C[te]={value:[0,0,0,0]});const L=Xe(N,r,ce,ae);Object.assign(C,L),h&&Object.keys(h).forEach(w=>{r.includes(w)&&(C[w]={value:h[w].value})}),k.current=C}const b=M.useRef({width:0,height:0});b.current={width:v||$.width,height:l||$.height},Ce(()=>{if(!T.current||!f.current)return;const C=Date.now()/1e3-O,L=x.current?C-x.current:0;x.current=C;const w=T.current.uniforms,Q=b.current.width,J=b.current.height,I=Q/J;if(I>1?(f.current.left=-I,f.current.right=I,f.current.top=1,f.current.bottom=-1):(f.current.left=-1,f.current.right=1,f.current.top=1/I,f.current.bottom=-1/I),f.current.updateProjectionMatrix(),Y.current){const P=I>1?I:1,Z=I>1?1:1/I;Y.current.scale.set(P,Z,1)}if(w[X]&&(w[X].value=C),w[z]&&(w[z].value=L),w[V]&&(w[V].value=[Q*E,J*E]),w[G]&&(w[G].value=g.current,g.current+=1),w[W]&&(w[W].value=y),w[B]){const P=new Date,Z=P.getFullYear(),D=P.getMonth()+1,q=P.getDate(),ne=P.getHours()*60*60+P.getMinutes()*60+P.getSeconds()+P.getMilliseconds()*.001;w[B].value=[Z,D,q,ne]}}),M.useEffect(()=>{if(!(!_||!a))return n?(_.background=new je(n[0],n[1],n[2]),a.setClearAlpha(n[3])):(_.background=null,a.setClearAlpha(0)),()=>{_&&(_.background=null),a&&a.setClearAlpha(1)}},[_,a,n]),M.useEffect(()=>{if(T.current)try{const C=Ze(r,o,E,d.length);T.current.fragmentShader=C,T.current.vertexShader=s,T.current.needsUpdate=!0}catch(C){console.error("Shader processing error:",C)}},[r,s,o,E,d.length]);const f=M.useRef(null),Y=M.useRef(null);return H.jsxs(M.Suspense,{fallback:null,children:[H.jsx(xe,{ref:f,makeDefault:!0,position:[0,0,5],near:.1,far:1e3,left:-1,right:1,top:1,bottom:-1}),H.jsxs("mesh",{ref:Y,children:[H.jsx("planeGeometry",{args:[2,2]}),H.jsx("shaderMaterial",{ref:T,vertexShader:s,fragmentShader:r,uniforms:k.current})]})]})}function rt({style:r={},customProps:s={},...d}){return H.jsx(Se,{orthographic:!0,gl:{antialias:!0,alpha:!0,powerPreference:"high-performance",...s.gl},style:{width:"100%",height:"100%",...r},resize:{scroll:!0,debounce:{scroll:50,resize:0}},...s,children:H.jsx(tt,{...d})})}const nt=`
vec3 s=vec3(.0);
vec3 c=vec3(.0);
vec3 p=vec3(.0);
for(float i=.0,z=.0,f=.0;i++<3e1;p+=c,z+=f=abs(p.y+7.)*.5+.2,o+=vec4(1,2,4,1)/f/(z*.3+p*p).x)
    for(c=p=z*(2.*FC.rgb-r.xyy)/r.y,p.x*=f=s.y=.3;f++<3.;p+=cos(p.yzx*f+z+t)/f);
o=tanh(.1*o/length((c/p.z+s).xy));
`,ot=`
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / iResolution.y;

    float d = length(uv);
    float r = 0.3 + 0.2 * sin(iTime * 2.0);

    float circle = smoothstep(r + 0.02, r, d);
    float ring = smoothstep(r + 0.1, r + 0.08, d) - smoothstep(r + 0.02, r, d);

    vec3 color = vec3(0.2, 0.4, 0.8) * circle;
    color += vec3(0.8, 0.2, 0.4) * ring;

    // Add some sparkle
    float sparkle = sin(uv.x * 10.0 + iTime) * sin(uv.y * 10.0 + iTime);
    color += 0.1 * sparkle * sparkle;

    fragColor = vec4(color, 1.0);
}
`,st=`
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    float time = iTime * 0.5;

    float v = 0.0;
    v += sin((uv.x + time));
    v += sin((uv.y + time) / 2.0);
    v += sin((uv.x + uv.y + time) / 2.0);

    vec2 c = uv + vec2(sin(time / 3.0), cos(time / 2.0));
    v += sin(sqrt(c.x * c.x + c.y * c.y + 1.0) + time);

    v = v / 4.0;

    vec3 col = vec3(sin(v * 3.14159), sin(v * 3.14159 + 2.0), sin(v * 3.14159 + 4.0));
    col = col * 0.5 + 0.5;

    fragColor = vec4(col, 1.0);
}
`,ie=[{name:"Animated Circles",code:ot},{name:"Plasma",code:st},{name:"Simple UV",code:nt}];function ut(){const[r,s]=F.useState(0),[d,h]=F.useState(!0),n=ie[r],o=()=>{h(!d)},v=()=>{window.location.reload()},l=()=>{s(E=>(E+1)%ie.length)};return j.jsxs("div",{className:"card-container",children:[j.jsx("h2",{className:"card-title",children:"React Shadertoy Demo"}),j.jsxs("div",{className:"shader-info",children:[j.jsx("h3",{children:n.name}),j.jsxs("p",{children:["Shader ",r+1," of ",ie.length]})]}),j.jsx("div",{className:"shader-view-container",children:j.jsx(rt,{fs:n.code,style:{border:"2px solid #333",borderRadius:"8px"}})}),j.jsxs("div",{className:"button-row",children:[j.jsx("button",{type:"button",onClick:o,title:d?"Pause Shader":"Play Shader",children:d?j.jsx(De,{}):j.jsx(Le,{})}),j.jsx("button",{type:"button",onClick:l,title:"Next Shader",children:j.jsx(qe,{})}),j.jsx("button",{type:"button",onClick:v,title:"Reset Timer",children:j.jsx(Fe,{})})]})]})}function it(){return j.jsx(ut,{})}Te.createRoot(document.getElementById("root")).render(j.jsx(it,{}));
