import{r as h,e as J,u as Q,a as ee,j as u,O as te,C as re,c as oe}from"./three-libs-1-CQbpiwCu.js";import{l as ne,f as se,U as ce,e as ie,m as ae}from"./three-core-BZHiX_MI.js";import"./react-vendor-BbKYKnUt.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function c(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerPolicy&&(t.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?t.credentials="include":o.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(o){if(o.ep)return;o.ep=!0;const t=c(o);fetch(o.href,t)}})();/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),ue=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(r,c,i)=>i?i.toUpperCase():c.toLowerCase()),z=e=>{const r=ue(e);return r.charAt(0).toUpperCase()+r.slice(1)},Y=(...e)=>e.filter((r,c,i)=>!!r&&r.trim()!==""&&i.indexOf(r)===c).join(" ").trim(),fe=e=>{for(const r in e)if(r.startsWith("aria-")||r==="role"||r==="title")return!0};/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var de={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=h.forwardRef(({color:e="currentColor",size:r=24,strokeWidth:c=2,absoluteStrokeWidth:i,className:o="",children:t,iconNode:a,...s},f)=>h.createElement("svg",{ref:f,...de,width:r,height:r,stroke:e,strokeWidth:i?Number(c)*24/Number(r):c,className:Y("lucide",o),...!t&&!fe(s)&&{"aria-hidden":"true"},...s},[...a.map(([y,d])=>h.createElement(y,d)),...Array.isArray(t)?t:[t]]));/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(e,r)=>{const c=h.forwardRef(({className:i,...o},t)=>h.createElement(he,{ref:t,iconNode:r,className:Y(`lucide-${le(z(e))}`,`lucide-${e}`,i),...o}));return c.displayName=z(e),c};/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["rect",{x:"14",y:"4",width:"4",height:"16",rx:"1",key:"zuxfzm"}],["rect",{x:"6",y:"4",width:"4",height:"16",rx:"1",key:"1okwgv"}]],ve=k("pause",me);/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]],pe=k("play",ge);/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}]],Ce=k("rotate-ccw",xe);/**
 * @license lucide-react v0.526.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["polygon",{points:"5 4 15 12 5 20 5 4",key:"16p6eg"}],["line",{x1:"19",x2:"19",y1:"5",y2:"19",key:"futhcm"}]],Re=k("skip-forward",ye),b="iTime",_="iTimeDelta",N="iDate",A="iFrame",j="iMouse",M="iResolution",H="iChannel",V="iChannelResolution",D="iDeviceOrientation",Se=["lowp","mediump","highp"],L=`
// HSV to RGB conversion
vec3 hsv(float h, float s, float v) {
  vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
  vec3 p = abs(fract(vec3(h) + K.xyz) * 6.0 - K.www);
  return v * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), s);
}
`,G=`
void main(void) {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
`,$e=`
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
`,F=(e,r,c)=>e.replace(new RegExp(`(${r}\\s+([a-zA-Z_]\\w*(?:\\s*,\\s*[a-zA-Z_]\\w*(?:\\s*=\\s*[^;]+?)?)*)\\s*;)`,"g"),(i,o,t)=>{console.log(`Found uninitialized ${r} variables`);const a=[];let s="",f=0,y=!1;for(let d=0;d<t.length;d++){const n=t[d];if(n==="("&&f++,n===")"&&f--,n==="="&&f===0&&(y=!0),n===","&&f===0&&!y){const v=s.trim();a.push(v.includes("=")?v:`${v}=${c}`),s="",y=!1}else s+=n}if(s){const d=s.trim();a.push(d.includes("=")?d:`${d}=${c}`)}return`${r} ${a.join(", ")};`}),we=(e,r,c,i)=>{const t=`precision ${Se.includes(r)?r:"highp"} float;
`,a=`#define DPR ${c.toFixed(1)}
`,s=e.includes("void main("),f=e.includes("void mainImage("),y=!s&&!f;let d=e;y&&(d=$e.replace("%SHADER_CODE%",e));let n=d;n=n.replace(/for\s*\(\s*float\s+(\w+)\s*;\s*([^;]+);([^)]+)\)/g,(g,p,S,m)=>S.includes("=")?g:`for(float ${p}=0.;${S};${m})`),n=n.replace(/for\s*\(\s*;\s*([^;]+);([^)]+)\)/g,(g,p,S)=>{const m=p.match(/(\w+)\s*(\+\+|\-\-|<|>|<=|>=|==|!=)/);return m&&!p.includes("=")?`for(float ${m[1]}=0.;${p};${S})`:g}),n=n.replace(/mat2\s*\(\s*cos\s*\(\s*([^)]+)\+vec4\s*\(([^)]+)\)\s*\)\s*\)\s*(\*?\s*[0-9.]+)?/g,(g,p,S,m)=>{const I=`${p}+vec4(${S})`,O=m?m.trim():"";return`mat2(cos(${I})${O})`}),n=n.replace(/exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,(g,p)=>`exp(clamp(${p}, -87.0, 87.0))`),n=n.replace(/exp\s*\(\s*([^()]+|\([^()]*\))\s*\)/g,(g,p)=>`exp(clamp(${p}, -87.0, 87.0))`);const v=[];n.includes("out vec4 fragColor")&&!n.match(/\bfragColor\s*=/)&&v.push("fragColor = vec4(0.);"),n.includes("iResolution")||v.push("vec2 r = iResolution.xy;"),n.includes("iTime")||v.push("float t = iTime;"),v.length>0&&(n=n.replace(/void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{/,`$& ${v.join(" ")}`)),n=n.replace(/(void mainImage\s*\(\s*out vec4 fragColor[^)]*\)\s*{)([\s\S]*?)}/,(g,p,S)=>{let m=S;return m=F(m,"float","0."),m=F(m,"vec2","vec2(0.)"),m=F(m,"vec3","vec3(0.)"),m=F(m,"vec4","vec4(0.)"),`${p}${m}}`});let l="";s?l=t+a+L+n:l=t+a+L+n+G,l=l.replace(/texture\(/g,"texture2D(");const R=[`uniform float ${b};`,`uniform vec2 ${M};`];l.includes(_)&&R.push(`uniform float ${_};`),l.includes(A)&&R.push(`uniform int ${A};`),l.includes(j)&&R.push(`uniform vec4 ${j};`),l.includes(N)&&R.push(`uniform vec4 ${N};`),l.includes(D)&&R.push(`uniform vec4 ${D};`);for(let g=0;g<i;g++)l.includes(`${H}${g}`)&&R.push(`uniform sampler2D ${H}${g};`);if(l.includes(V)&&i>0&&R.push(`uniform vec3 ${V}[${i}];`),R.length>0){const g=R.join(`
`)+`

`,p=t.length+a.length;l=l.substring(0,p)+g+l.substring(p)}return l};function Ee(e=256,r=8,c=[255,255,255,255],i=[0,0,0,255]){const o=new Uint8Array(e*e*4),t=e/r;for(let s=0;s<e;s++)for(let f=0;f<e;f++){const y=(s*e+f)*4,d=Math.floor(f/t),n=Math.floor(s/t),l=(d+n)%2===0?c:i;o[y]=l[0],o[y+1]=l[1],o[y+2]=l[2],o[y+3]=l[3]}const a=new ne(o,e,e,se,ce);return a.needsUpdate=!0,a}function Ie(e,r,c="iChannel",i="iChannelResolution"){const o={};if(e.length===0)return o;if(e.forEach((t,a)=>{const s=`${c}${a}`;r.includes(s)&&(o[s]={value:t})}),r.includes(i)){const t=[];e.forEach((a,s)=>{a?(t[s*3]=a.image.width,t[s*3+1]=a.image.height,t[s*3+2]=1):(t[s*3]=0,t[s*3+1]=0,t[s*3+2]=0)}),o[i]={value:t}}return o}J({ShaderMaterial:ae});const _e=`
varying vec2 vUv;
void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,Ne=`
uniform float ${b};
uniform vec2 ${M};

void main() {
    vec4 fragColor = vec4(0.0, 0.0, 0.0, 1.0);
    vec2 uv = gl_FragCoord.xy/${M}.xy;
    vec3 col = vec3(1,1,1);
    gl_FragColor = vec4(col,1.0);
}
`;function Ae({fs:e=Ne,vs:r=_e,textures:c=[],uniforms:i={},clearColor:o=null,precision:t="highp",width:a,height:s,devicePixelRatio:f=1}){const{size:y,scene:d,gl:n}=Q(),v=h.useRef(null),l=h.useRef(0),[R]=h.useState(Date.now()/1e3),g=h.useRef(0),[p]=h.useState([0,0,0,0]),[S,m]=h.useState([]);h.useEffect(()=>{const x=Ee(256,8,[255,0,0,255],[0,255,255,255]);return m([x]),()=>{S.forEach(T=>T?.dispose())}},[]);const I=h.useRef(null);if(!I.current){const x={[b]:{value:0},[M]:{value:[0,0]}};e.includes(_)&&(x[_]={value:0}),e.includes(N)&&(x[N]={value:[0,0,0,0]}),e.includes(A)&&(x[A]={value:0}),e.includes(j)&&(x[j]={value:[0,0,0,0]}),e.includes(D)&&(x[D]={value:[0,0,0,0]});const T=Ie(S,e,H,V);Object.assign(x,T),i&&Object.keys(i).forEach(C=>{e.includes(C)&&(x[C]={value:i[C].value})}),I.current=x}const O=h.useRef({width:0,height:0});O.current={width:a||y.width,height:s||y.height},ee(()=>{if(!v.current||!$.current)return;const x=Date.now()/1e3-R,T=g.current?x-g.current:0;g.current=x;const C=v.current.uniforms,K=O.current.width,W=O.current.height,w=K/W;if(w>1?($.current.left=-w,$.current.right=w,$.current.top=1,$.current.bottom=-1):($.current.left=-1,$.current.right=1,$.current.top=1/w,$.current.bottom=-1/w),$.current.updateProjectionMatrix(),P.current){const E=w>1?w:1,U=w>1?1:1/w;P.current.scale.set(E,U,1)}if(C[b]&&(C[b].value=x),C[_]&&(C[_].value=T),C[M]&&(C[M].value=[K*f,W*f]),C[A]&&(C[A].value=l.current,l.current+=1),C[j]&&(C[j].value=p),C[N]){const E=new Date,U=E.getFullYear(),Z=E.getMonth()+1,q=E.getDate(),X=E.getHours()*60*60+E.getMinutes()*60+E.getSeconds()+E.getMilliseconds()*.001;C[N].value=[U,Z,q,X]}}),h.useEffect(()=>{if(!(!d||!n))return o?(d.background=new ie(o[0],o[1],o[2]),n.setClearAlpha(o[3])):(d.background=null,n.setClearAlpha(0)),()=>{d&&(d.background=null),n&&n.setClearAlpha(1)}},[d,n,o]),h.useEffect(()=>{if(v.current)try{const x=we(e,t,f,c.length);v.current.fragmentShader=x,v.current.vertexShader=r,v.current.needsUpdate=!0}catch(x){console.error("Shader processing error:",x)}},[e,r,t,f,c.length]);const $=h.useRef(null),P=h.useRef(null);return u.jsxs(h.Suspense,{fallback:null,children:[u.jsx(te,{ref:$,makeDefault:!0,position:[0,0,5],near:.1,far:1e3,left:-1,right:1,top:1,bottom:-1}),u.jsxs("mesh",{ref:P,children:[u.jsx("planeGeometry",{args:[2,2]}),u.jsx("shaderMaterial",{ref:v,vertexShader:r,fragmentShader:e,uniforms:I.current})]})]})}function je({style:e={},customProps:r={},...c}){return u.jsx(re,{orthographic:!0,gl:{antialias:!0,alpha:!0,powerPreference:"high-performance",...r.gl},style:{width:"100%",height:"100%",...e},resize:{scroll:!0,debounce:{scroll:50,resize:0}},...r,children:u.jsx(Ae,{...c})})}const Me=`
void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = fragCoord / iResolution.xy;
    vec3 col = vec3(uv.x, uv.y, 0.5 + 0.5 * sin(iTime));
    fragColor = vec4(col, 1.0);
}
`,Oe=`
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
`,Te=`
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
`,B=[{name:"Animated Circles",code:Oe},{name:"Plasma",code:Te},{name:"Simple UV",code:Me}];function be(){const[e,r]=h.useState(0),[c,i]=h.useState(!0),o=B[e],t=()=>{i(!c)},a=()=>{window.location.reload()},s=()=>{r(f=>(f+1)%B.length)};return u.jsxs("div",{className:"card-container",children:[u.jsx("h2",{className:"card-title",children:"React Shadertoy Demo"}),u.jsxs("div",{className:"shader-info",children:[u.jsx("h3",{children:o.name}),u.jsxs("p",{children:["Shader ",e+1," of ",B.length]})]}),u.jsx("div",{className:"shader-view-container",children:u.jsx(je,{fs:o.code,style:{border:"2px solid #333",borderRadius:"8px"}})}),u.jsxs("div",{className:"button-row",children:[u.jsx("button",{onClick:t,title:c?"Pause Shader":"Play Shader",children:c?u.jsx(ve,{}):u.jsx(pe,{})}),u.jsx("button",{onClick:s,title:"Next Shader",children:u.jsx(Re,{})}),u.jsx("button",{onClick:a,title:"Reset Timer",children:u.jsx(Ce,{})})]})]})}function Fe(){return u.jsx(be,{})}oe.createRoot(document.getElementById("root")).render(u.jsx(Fe,{}));
