function T(t){return t.next()|0}function u(t,e){return e===0?t:n=>t(n)+e}function a(t){const e=t.next()|0,n=t.next()>>>0;return(e&2097151)*4294967296+n+(e&2097152?-9007199254740992:0)}function L(t){for(;;){const e=t.next()|0;if(e&4194304){if((e&8388607)===4194304&&!(t.next()|0))return 9007199254740992}else{const n=t.next()>>>0;return(e&2097151)*4294967296+n+(e&2097152?-9007199254740992:0)}}}function U(t){return t.next()>>>0}function E(t){const e=t.next()&2097151,n=t.next()>>>0;return e*4294967296+n}function I(t){for(;;){const e=t.next()|0;if(e&2097152){if(!(e&2097151)&&!(t.next()|0))return 9007199254740992}else{const n=t.next()>>>0;return(e&2097151)*4294967296+n}}}function M(t){return(t+1&t)===0}function F(t){return e=>e.next()&t}function G(t){const e=t+1,n=e*Math.floor(4294967296/e);return r=>{let o=0;do o=r.next()>>>0;while(o>=n);return o%e}}function b(t){return M(t)?F(t):G(t)}function m(t){return(t|0)===0}function Z(t){return e=>{const n=e.next()&t,r=e.next()>>>0;return n*4294967296+r}}function j(t){const e=t*Math.floor(9007199254740992/t);return n=>{let r=0;do{const o=n.next()&2097151,i=n.next()>>>0;r=o*4294967296+i}while(r>=e);return r%t}}function O(t){const e=t+1;if(m(e)){const n=(e/4294967296|0)-1;if(M(n))return Z(n)}return j(e)}function N(t,e){return n=>{let r=0;do{const o=n.next()|0,i=n.next()>>>0;r=(o&2097151)*4294967296+i+(o&2097152?-9007199254740992:0)}while(r<t||r>e);return r}}function l(t,e){if(t=Math.floor(t),e=Math.floor(e),t<-9007199254740992||!isFinite(t))throw new RangeError(`Expected min to be at least ${-9007199254740992}`);if(e>9007199254740992||!isFinite(e))throw new RangeError(`Expected max to be at most ${9007199254740992}`);const n=e-t;return n<=0||!isFinite(n)?()=>t:n===4294967295?t===0?U:u(T,t+2147483648):n<4294967295?u(b(n),t):n===9007199254740991?u(E,t):n<9007199254740991?u(O(n),t):e-1-t===9007199254740991?u(I,t):t===-9007199254740992&&e===9007199254740992?L:t===-9007199254740992&&e===9007199254740991?a:t===-9007199254740991&&e===9007199254740992?u(a,1):e===9007199254740992?u(N(t-1,e-1),1):N(t,e)}function X(t){return(t.next()&1)===1}function _(t,e){return n=>t(n)<e}function y(t){if(t<=0)return()=>!1;if(t>=1)return()=>!0;{const e=t*4294967296;return e%1===0?_(T,e-2147483648|0):_(E,Math.round(t*9007199254740992))}}function C(t,e){return e==null?t==null?X:y(t):t<=0?()=>!1:t>=e?()=>!0:_(l(0,e-1),t)}function k(t,e){const n=l(+t,+e);return r=>new Date(n(r))}function w(t){return l(1,t)}function v(t,e){const n=w(t);return r=>{const o=[];for(let i=0;i<e;++i)o.push(n(r));return o}}const D="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";function d(t=D){const e=t.length;if(!e)throw new Error("Expected pool not to be an empty string");const n=l(0,e-1);return(r,o)=>{let i="";for(let s=0;s<o;++s){const f=n(r);i+=t.charAt(f)}return i}}const R="0123456789abcdef",H=d(R),P=d(R.toUpperCase());function W(t){return t?P:H}function A(t,e){return t<0?Math.max(t+e,0):Math.min(t,e)}function g(t){const e=+t;return e<0?Math.ceil(e):Math.floor(e)}function $(t,e,n,r){const o=e.length;if(o===0)throw new RangeError("Cannot pick from an empty array");const i=n==null?0:A(g(n),o),s=r===void 0?o:A(g(r),o);if(i>=s)throw new RangeError(`Cannot pick between bounds ${i} and ${s}`);const f=l(i,s-1);return e[f(t)]}function B(t,e){return e===1?t:e===0?()=>0:n=>t(n)*e}function x(t){return E(t)/9007199254740992}function p(t){return I(t)/9007199254740992}function q(t,e,n=!1){if(isFinite(t)){if(!isFinite(e))throw new RangeError("Expected max to be a finite number")}else throw new RangeError("Expected min to be a finite number");return u(B(n?p:x,e-t),t)}const J=Array.prototype.slice;function S(t,e,n=0){const r=e.length;if(r)for(let o=r-1>>>0;o>n;--o){const s=l(0,o)(t);if(o!==s){const f=e[o];e[o]=e[s],e[s]=f}}return e}function K(t,e,n){if(n<0||n>e.length||!isFinite(n))throw new RangeError("Expected sampleSize to be within 0 and the length of the population");if(n===0)return[];const r=J.call(e),o=r.length;if(o===n)return S(t,r,0);const i=o-n;return S(t,r,i-1).slice(i)}const Q=(()=>{try{if("x".repeat(3)==="xxx")return(t,e)=>t.repeat(e)}catch{}return(t,e)=>{let n="";for(;e>0;)e&1&&(n+=t),e>>=1,t+=t;return n}})();function c(t,e){return Q("0",e-t.length)+t}function V(t){const e=t.next()>>>0,n=t.next()|0,r=t.next()|0,o=t.next()>>>0;return c(e.toString(16),8)+"-"+c((n&65535).toString(16),4)+"-"+c((n>>4&4095|16384).toString(16),4)+"-"+c((r&16383|32768).toString(16),4)+"-"+c((r>>4&65535).toString(16),4)+c(o.toString(16),8)}const Y={next(){return Math.random()*4294967296|0}};class z{constructor(e=Y){this.engine=e}int32(){return T(this.engine)}uint32(){return U(this.engine)}uint53(){return E(this.engine)}uint53Full(){return I(this.engine)}int53(){return a(this.engine)}int53Full(){return L(this.engine)}integer(e,n){return l(e,n)(this.engine)}realZeroToOneInclusive(){return p(this.engine)}realZeroToOneExclusive(){return x(this.engine)}real(e,n,r=!1){return q(e,n,r)(this.engine)}bool(e,n){return C(e,n)(this.engine)}pick(e,n,r){return $(this.engine,e,n,r)}shuffle(e){return S(this.engine,e)}sample(e,n){return K(this.engine,e,n)}die(e){return w(e)(this.engine)}dice(e,n){return v(e,n)(this.engine)}uuid4(){return V(this.engine)}string(e,n){return d(n)(this.engine,e)}hex(e,n){return W(n)(this.engine,e)}date(e,n){return k(e,n)(this.engine)}}(()=>{try{const t=new ArrayBuffer(4),e=new Int32Array(t);if(e[0]=2147483648,e[0]===-2147483648)return Int32Array}catch{}return Array})();(()=>{try{if(Math.imul(4294967295,5)===-5)return Math.imul}catch{}const t=65535;return(e,n)=>{const r=e>>>16&t,o=e&t,i=n>>>16&t,s=n&t;return o*s+(r*s+o*i<<16>>>0)|0}})();class tt{_chain_length;_data;_random;constructor(e,n=8){this._chain_length=n,this._data=e,this._random=new z}complete(e){for(e.length>this._chain_length&&(e=e.substring(e.length-this._chain_length));e.length>0;){const n=this.selectRandomFromCounter(this._data[e]);if(n!==null)return n;e=e.substring(1)}return this._random.pick(Object.keys(this._data))}getSuggestion(e,n){let r=e;for(;r.length<n;)r+=this.complete(r);return r}selectRandomFromCounter(e){const n=Object.values(e??{}).reduce((i,s)=>i+s,0);if(n===0)return null;const r=this._random.integer(0,n-1);let o=0;for(const[i,s]of Object.entries(e)){if(r<o+s)return i;o+=s}return null}}const et=Object.assign({"./models/all.json":()=>import("./all-62435bd9.js").then(t=>t.default),"./models/de.json":()=>import("./de-ed36d8c3.js").then(t=>t.default),"./models/en.json":()=>import("./en-fa1d96ae.js").then(t=>t.default),"./models/es.json":()=>import("./es-e8c7d993.js").then(t=>t.default),"./models/fr.json":()=>import("./fr-0c49ae1d.js").then(t=>t.default),"./models/he-all.json":()=>import("./he-all-3b97e5fc.js").then(t=>t.default),"./models/he-bible.json":()=>import("./he-bible-942f61ba.js").then(t=>t.default),"./models/he-pg.json":()=>import("./he-pg-58f96f62.js").then(t=>t.default),"./models/he.json":()=>import("./he-75cc6d65.js").then(t=>t.default),"./models/it.json":()=>import("./it-47c1093d.js").then(t=>t.default),"./models/shakespear.json":()=>import("./shakespear-93673cd8.js").then(t=>t.default),"./models/zh.json":()=>import("./zh-77510a22.js").then(t=>t.default)});async function nt(t){const n=await(await fetch(await et[`./models/${t}.json`]())).json();return new tt(n)}let h=new Map;onmessage=async t=>{h.has(t.data.model)||h.set(t.data.model,await nt(t.data.model));const n=h.get(t.data.model).getSuggestion(t.data.text,t.data.length);postMessage({model:t.data.model,text:n})};
