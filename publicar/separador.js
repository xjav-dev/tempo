var vt=(e=>typeof require<"u"?require:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof require<"u"?require:t)[i]}):e)(function(e){if(typeof require<"u")return require.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')});var Ma=Object.defineProperty,ym=Object.getOwnPropertyDescriptor,_m=Object.getOwnPropertyNames,wm=Object.prototype.hasOwnProperty,bm=(e=>typeof vt<"u"?vt:typeof Proxy<"u"?new Proxy(e,{get:(t,i)=>(typeof vt<"u"?vt:t)[i]}):e)(function(e){if(typeof vt<"u")return vt.apply(this,arguments);throw Error('Dynamic require of "'+e+'" is not supported')}),q=(e,t)=>()=>(e&&(t=e(e=0)),t),Ft=(e,t)=>{for(var i in t)Ma(e,i,{get:t[i],enumerable:!0})},$m=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let a of _m(t))!wm.call(e,a)&&a!==i&&Ma(e,a,{get:()=>t[a],enumerable:!(r=ym(t,a))||r.enumerable});return e},fr=e=>$m(Ma({},"__esModule",{value:!0}),e),Yt,ht,Wt,Cs,id,ad=q(()=>{"use strict";Yt=new Map,ht=[],Wt=(e,t,i)=>{if(t&&typeof t.init=="function"&&typeof t.createInferenceSessionHandler=="function"){let r=Yt.get(e);if(r===void 0)Yt.set(e,{backend:t,priority:i});else{if(r.priority>i)return;if(r.priority===i&&r.backend!==t)throw new Error(`cannot register backend "${e}" using priority ${i}`)}if(i>=0){let a=ht.indexOf(e);a!==-1&&ht.splice(a,1);for(let n=0;n<ht.length;n++)if(Yt.get(ht[n]).priority<=i){ht.splice(n,0,e);return}ht.push(e)}return}throw new TypeError("not a valid backend")},Cs=async e=>{let t=Yt.get(e);if(!t)return"backend not found.";if(t.initialized)return t.backend;if(t.aborted)return t.error;{let i=!!t.initPromise;try{return i||(t.initPromise=t.backend.init(e)),await t.initPromise,t.initialized=!0,t.backend}catch(r){return i||(t.error=`${r}`,t.aborted=!0),t.error}finally{delete t.initPromise}}},id=async e=>{let t=e.executionProviders||[],i=t.map(l=>typeof l=="string"?l:l.name),r=i.length===0?ht:i,a,n=[],s=new Set;for(let l of r){let p=await Cs(l);typeof p=="string"?n.push({name:l,err:p}):(a||(a=p),a===p&&s.add(l))}if(!a)throw new Error(`no available backend found. ERR: ${n.map(l=>`[${l.name}] ${l.err}`).join(", ")}`);for(let{name:l,err:p}of n)i.includes(l)&&console.warn(`removing requested execution provider "${l}" from session options because it is not available: ${p}`);let u=t.filter(l=>s.has(typeof l=="string"?l:l.name));return[a,new Proxy(e,{get:(l,p)=>p==="executionProviders"?u:Reflect.get(l,p)})]}}),vm=q(()=>{"use strict";ad()}),nd,xm=q(()=>{"use strict";nd="1.23.2"}),vi,ke,sd=q(()=>{"use strict";xm(),vi="warning",ke={wasm:{},webgl:{},webgpu:{},versions:{common:nd},set logLevel(e){if(e!==void 0){if(typeof e!="string"||["verbose","info","warning","error","fatal"].indexOf(e)===-1)throw new Error(`Unsupported logging level: ${e}`);vi=e}},get logLevel(){return vi}},Object.defineProperty(ke,"logLevel",{enumerable:!0})}),ge,Cm=q(()=>{"use strict";sd(),ge=ke}),od,ud,Sm=q(()=>{"use strict";od=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas"):new OffscreenCanvas(1,1);i.width=e.dims[3],i.height=e.dims[2];let r=i.getContext("2d");if(r!=null){let a,n;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[3]):(a=e.dims[3],n=e.dims[2]);let s=t?.format!==void 0?t.format:"RGB",u=t?.norm,l,p;u===void 0||u.mean===void 0?l=[255,255,255,255]:typeof u.mean=="number"?l=[u.mean,u.mean,u.mean,u.mean]:(l=[u.mean[0],u.mean[1],u.mean[2],0],u.mean[3]!==void 0&&(l[3]=u.mean[3])),u===void 0||u.bias===void 0?p=[0,0,0,0]:typeof u.bias=="number"?p=[u.bias,u.bias,u.bias,u.bias]:(p=[u.bias[0],u.bias[1],u.bias[2],0],u.bias[3]!==void 0&&(p[3]=u.bias[3]));let c=n*a,h=0,m=c,_=c*2,y=-1;s==="RGBA"?(h=0,m=c,_=c*2,y=c*3):s==="RGB"?(h=0,m=c,_=c*2):s==="RBG"&&(h=0,_=c,m=c*2);for(let v=0;v<n;v++)for(let C=0;C<a;C++){let w=(e.data[h++]-p[0])*l[0],$=(e.data[m++]-p[1])*l[1],S=(e.data[_++]-p[2])*l[2],x=y===-1?255:(e.data[y++]-p[3])*l[3];r.fillStyle="rgba("+w+","+$+","+S+","+x+")",r.fillRect(C,v,1,1)}if("toDataURL"in i)return i.toDataURL();throw new Error("toDataURL is not supported")}else throw new Error("Can not access image data")},ud=(e,t)=>{let i=typeof document<"u"?document.createElement("canvas").getContext("2d"):new OffscreenCanvas(1,1).getContext("2d"),r;if(i!=null){let a,n,s;t?.tensorLayout!==void 0&&t.tensorLayout==="NHWC"?(a=e.dims[2],n=e.dims[1],s=e.dims[3]):(a=e.dims[3],n=e.dims[2],s=e.dims[1]);let u=t!==void 0&&t.format!==void 0?t.format:"RGB",l=t?.norm,p,c;l===void 0||l.mean===void 0?p=[255,255,255,255]:typeof l.mean=="number"?p=[l.mean,l.mean,l.mean,l.mean]:(p=[l.mean[0],l.mean[1],l.mean[2],255],l.mean[3]!==void 0&&(p[3]=l.mean[3])),l===void 0||l.bias===void 0?c=[0,0,0,0]:typeof l.bias=="number"?c=[l.bias,l.bias,l.bias,l.bias]:(c=[l.bias[0],l.bias[1],l.bias[2],0],l.bias[3]!==void 0&&(c[3]=l.bias[3]));let h=n*a;if(t!==void 0&&(t.format!==void 0&&s===4&&t.format!=="RGBA"||s===3&&t.format!=="RGB"&&t.format!=="BGR"))throw new Error("Tensor format doesn't match input tensor dims");let m=4,_=0,y=1,v=2,C=3,w=0,$=h,S=h*2,x=-1;u==="RGBA"?(w=0,$=h,S=h*2,x=h*3):u==="RGB"?(w=0,$=h,S=h*2):u==="RBG"&&(w=0,S=h,$=h*2),r=i.createImageData(a,n);for(let k=0;k<n*a;_+=m,y+=m,v+=m,C+=m,k++)r.data[_]=(e.data[w++]-c[0])*p[0],r.data[y]=(e.data[$++]-c[1])*p[1],r.data[v]=(e.data[S++]-c[2])*p[2],r.data[C]=x===-1?255:(e.data[x++]-c[3])*p[3]}else throw new Error("Can not access image data");return r}}),Tr,ld,dd,pd,cd,fd,Tm=q(()=>{"use strict";Na(),Tr=(e,t)=>{if(e===void 0)throw new Error("Image buffer must be defined");if(t.height===void 0||t.width===void 0)throw new Error("Image height and width must be defined");if(t.tensorLayout==="NHWC")throw new Error("NHWC Tensor layout is not supported yet");let{height:i,width:r}=t,a=t.norm??{mean:255,bias:0},n,s;typeof a.mean=="number"?n=[a.mean,a.mean,a.mean,a.mean]:n=[a.mean[0],a.mean[1],a.mean[2],a.mean[3]??255],typeof a.bias=="number"?s=[a.bias,a.bias,a.bias,a.bias]:s=[a.bias[0],a.bias[1],a.bias[2],a.bias[3]??0];let u=t.format!==void 0?t.format:"RGBA",l=t.tensorFormat!==void 0&&t.tensorFormat!==void 0?t.tensorFormat:"RGB",p=i*r,c=l==="RGBA"?new Float32Array(p*4):new Float32Array(p*3),h=4,m=0,_=1,y=2,v=3,C=0,w=p,$=p*2,S=-1;u==="RGB"&&(h=3,m=0,_=1,y=2,v=-1),l==="RGBA"?S=p*3:l==="RBG"?(C=0,$=p,w=p*2):l==="BGR"&&($=0,w=p,C=p*2);for(let x=0;x<p;x++,m+=h,y+=h,_+=h,v+=h)c[C++]=(e[m]+s[0])/n[0],c[w++]=(e[_]+s[1])/n[1],c[$++]=(e[y]+s[2])/n[2],S!==-1&&v!==-1&&(c[S++]=(e[v]+s[3])/n[3]);return l==="RGBA"?new Ne("float32",c,[1,4,i,r]):new Ne("float32",c,[1,3,i,r])},ld=async(e,t)=>{let i=typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement,r=typeof ImageData<"u"&&e instanceof ImageData,a=typeof ImageBitmap<"u"&&e instanceof ImageBitmap,n=typeof e=="string",s,u=t??{},l=()=>{if(typeof document<"u")return document.createElement("canvas");if(typeof OffscreenCanvas<"u")return new OffscreenCanvas(1,1);throw new Error("Canvas is not supported")},p=c=>typeof HTMLCanvasElement<"u"&&c instanceof HTMLCanvasElement||c instanceof OffscreenCanvas?c.getContext("2d"):null;if(i){let c=l();c.width=e.width,c.height=e.height;let h=p(c);if(h!=null){let m=e.height,_=e.width;if(t!==void 0&&t.resizedHeight!==void 0&&t.resizedWidth!==void 0&&(m=t.resizedHeight,_=t.resizedWidth),t!==void 0){if(u=t,t.tensorFormat!==void 0)throw new Error("Image input config format must be RGBA for HTMLImageElement");u.tensorFormat="RGBA",u.height=m,u.width=_}else u.tensorFormat="RGBA",u.height=m,u.width=_;h.drawImage(e,0,0),s=h.getImageData(0,0,_,m).data}else throw new Error("Can not access image data")}else if(r){let c,h;if(t!==void 0&&t.resizedWidth!==void 0&&t.resizedHeight!==void 0?(c=t.resizedHeight,h=t.resizedWidth):(c=e.height,h=e.width),t!==void 0&&(u=t),u.format="RGBA",u.height=c,u.width=h,t!==void 0){let m=l();m.width=h,m.height=c;let _=p(m);if(_!=null)_.putImageData(e,0,0),s=_.getImageData(0,0,h,c).data;else throw new Error("Can not access image data")}else s=e.data}else if(a){if(t===void 0)throw new Error("Please provide image config with format for Imagebitmap");let c=l();c.width=e.width,c.height=e.height;let h=p(c);if(h!=null){let m=e.height,_=e.width;return h.drawImage(e,0,0,_,m),s=h.getImageData(0,0,_,m).data,u.height=m,u.width=_,Tr(s,u)}else throw new Error("Can not access image data")}else{if(n)return new Promise((c,h)=>{let m=l(),_=p(m);if(!e||!_)return h();let y=new Image;y.crossOrigin="Anonymous",y.src=e,y.onload=()=>{m.width=y.width,m.height=y.height,_.drawImage(y,0,0,m.width,m.height);let v=_.getImageData(0,0,m.width,m.height);u.height=m.height,u.width=m.width,c(Tr(v.data,u))}});throw new Error("Input data provided is not supported - aborted tensor creation")}if(s!==void 0)return Tr(s,u);throw new Error("Input data provided is not supported - aborted tensor creation")},dd=(e,t)=>{let{width:i,height:r,download:a,dispose:n}=t,s=[1,r,i,4];return new Ne({location:"texture",type:"float32",texture:e,dims:s,download:a,dispose:n})},pd=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:n}=t;return new Ne({location:"gpu-buffer",type:i??"float32",gpuBuffer:e,dims:r,download:a,dispose:n})},cd=(e,t)=>{let{dataType:i,dims:r,download:a,dispose:n}=t;return new Ne({location:"ml-tensor",type:i??"float32",mlTensor:e,dims:r,download:a,dispose:n})},fd=(e,t,i)=>new Ne({location:"cpu-pinned",type:e,data:t,dims:i??[t.length]})}),kt,ur,xi,hd,km=q(()=>{"use strict";kt=new Map([["float32",Float32Array],["uint8",Uint8Array],["int8",Int8Array],["uint16",Uint16Array],["int16",Int16Array],["int32",Int32Array],["bool",Uint8Array],["float64",Float64Array],["uint32",Uint32Array],["int4",Uint8Array],["uint4",Uint8Array]]),ur=new Map([[Float32Array,"float32"],[Uint8Array,"uint8"],[Int8Array,"int8"],[Uint16Array,"uint16"],[Int16Array,"int16"],[Int32Array,"int32"],[Float64Array,"float64"],[Uint32Array,"uint32"]]),xi=!1,hd=()=>{if(!xi){xi=!0;let e=typeof BigInt64Array<"u"&&BigInt64Array.from,t=typeof BigUint64Array<"u"&&BigUint64Array.from,i=globalThis.Float16Array,r=typeof i<"u"&&i.from;e&&(kt.set("int64",BigInt64Array),ur.set(BigInt64Array,"int64")),t&&(kt.set("uint64",BigUint64Array),ur.set(BigUint64Array,"uint64")),r?(kt.set("float16",i),ur.set(i,"float16")):kt.set("float16",Uint16Array)}}}),md,gd,Im=q(()=>{"use strict";Na(),md=e=>{let t=1;for(let i=0;i<e.length;i++){let r=e[i];if(typeof r!="number"||!Number.isSafeInteger(r))throw new TypeError(`dims[${i}] must be an integer, got: ${r}`);if(r<0)throw new RangeError(`dims[${i}] must be a non-negative integer, got: ${r}`);t*=r}return t},gd=(e,t)=>{switch(e.location){case"cpu":return new Ne(e.type,e.data,t);case"cpu-pinned":return new Ne({location:"cpu-pinned",data:e.data,type:e.type,dims:t});case"texture":return new Ne({location:"texture",texture:e.texture,type:e.type,dims:t});case"gpu-buffer":return new Ne({location:"gpu-buffer",gpuBuffer:e.gpuBuffer,type:e.type,dims:t});case"ml-tensor":return new Ne({location:"ml-tensor",mlTensor:e.mlTensor,type:e.type,dims:t});default:throw new Error(`tensorReshape: tensor location ${e.location} is not supported`)}}}),Ne,Na=q(()=>{"use strict";Sm(),Tm(),km(),Im(),Ne=class{constructor(e,t,i){hd();let r,a;if(typeof e=="object"&&"location"in e)switch(this.dataLocation=e.location,r=e.type,a=e.dims,e.location){case"cpu-pinned":{let s=kt.get(r);if(!s)throw new TypeError(`unsupported type "${r}" to create tensor from pinned buffer`);if(!(e.data instanceof s))throw new TypeError(`buffer should be of type ${s.name}`);this.cpuData=e.data;break}case"texture":{if(r!=="float32")throw new TypeError(`unsupported type "${r}" to create tensor from texture`);this.gpuTextureData=e.texture,this.downloader=e.download,this.disposer=e.dispose;break}case"gpu-buffer":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from gpu buffer`);this.gpuBufferData=e.gpuBuffer,this.downloader=e.download,this.disposer=e.dispose;break}case"ml-tensor":{if(r!=="float32"&&r!=="float16"&&r!=="int32"&&r!=="int64"&&r!=="uint32"&&r!=="uint64"&&r!=="int8"&&r!=="uint8"&&r!=="bool"&&r!=="uint4"&&r!=="int4")throw new TypeError(`unsupported type "${r}" to create tensor from MLTensor`);this.mlTensorData=e.mlTensor,this.downloader=e.download,this.disposer=e.dispose;break}default:throw new Error(`Tensor constructor: unsupported location '${this.dataLocation}'`)}else{let s,u;if(typeof e=="string")if(r=e,u=i,e==="string"){if(!Array.isArray(t))throw new TypeError("A string tensor's data must be a string array.");s=t}else{let l=kt.get(e);if(l===void 0)throw new TypeError(`Unsupported tensor type: ${e}.`);if(Array.isArray(t)){if(e==="float16"&&l===Uint16Array||e==="uint4"||e==="int4")throw new TypeError(`Creating a ${e} tensor from number array is not supported. Please use ${l.name} as data.`);e==="uint64"||e==="int64"?s=l.from(t,BigInt):s=l.from(t)}else if(t instanceof l)s=t;else if(t instanceof Uint8ClampedArray)if(e==="uint8")s=Uint8Array.from(t);else throw new TypeError("A Uint8ClampedArray tensor's data must be type of uint8");else if(e==="float16"&&t instanceof Uint16Array&&l!==Uint16Array)s=new globalThis.Float16Array(t.buffer,t.byteOffset,t.length);else throw new TypeError(`A ${r} tensor's data must be type of ${l}`)}else if(u=t,Array.isArray(e)){if(e.length===0)throw new TypeError("Tensor type cannot be inferred from an empty array.");let l=typeof e[0];if(l==="string")r="string",s=e;else if(l==="boolean")r="bool",s=Uint8Array.from(e);else throw new TypeError(`Invalid element type of data array: ${l}.`)}else if(e instanceof Uint8ClampedArray)r="uint8",s=Uint8Array.from(e);else{let l=ur.get(e.constructor);if(l===void 0)throw new TypeError(`Unsupported type for tensor data: ${e.constructor}.`);r=l,s=e}if(u===void 0)u=[s.length];else if(!Array.isArray(u))throw new TypeError("A tensor's dims must be a number array");a=u,this.cpuData=s,this.dataLocation="cpu"}let n=md(a);if(this.cpuData&&n!==this.cpuData.length&&!((r==="uint4"||r==="int4")&&Math.ceil(n/2)===this.cpuData.length))throw new Error(`Tensor's size(${n}) does not match data length(${this.cpuData.length}).`);this.type=r,this.dims=a,this.size=n}static async fromImage(e,t){return ld(e,t)}static fromTexture(e,t){return dd(e,t)}static fromGpuBuffer(e,t){return pd(e,t)}static fromMLTensor(e,t){return cd(e,t)}static fromPinnedBuffer(e,t,i){return fd(e,t,i)}toDataURL(e){return od(this,e)}toImageData(e){return ud(this,e)}get data(){if(this.ensureValid(),!this.cpuData)throw new Error("The data is not on CPU. Use `getData()` to download GPU data to CPU, or use `texture` or `gpuBuffer` property to access the GPU data directly.");return this.cpuData}get location(){return this.dataLocation}get texture(){if(this.ensureValid(),!this.gpuTextureData)throw new Error("The data is not stored as a WebGL texture.");return this.gpuTextureData}get gpuBuffer(){if(this.ensureValid(),!this.gpuBufferData)throw new Error("The data is not stored as a WebGPU buffer.");return this.gpuBufferData}get mlTensor(){if(this.ensureValid(),!this.mlTensorData)throw new Error("The data is not stored as a WebNN MLTensor.");return this.mlTensorData}async getData(e){switch(this.ensureValid(),this.dataLocation){case"cpu":case"cpu-pinned":return this.data;case"texture":case"gpu-buffer":case"ml-tensor":{if(!this.downloader)throw new Error("The current tensor is not created with a specified data downloader.");if(this.isDownloading)throw new Error("The current tensor is being downloaded.");try{this.isDownloading=!0;let t=await this.downloader();return this.downloader=void 0,this.dataLocation="cpu",this.cpuData=t,e&&this.disposer&&(this.disposer(),this.disposer=void 0),t}finally{this.isDownloading=!1}}default:throw new Error(`cannot get data from location: ${this.dataLocation}`)}}dispose(){if(this.isDownloading)throw new Error("The current tensor is being downloaded.");this.disposer&&(this.disposer(),this.disposer=void 0),this.cpuData=void 0,this.gpuTextureData=void 0,this.gpuBufferData=void 0,this.mlTensorData=void 0,this.downloader=void 0,this.isDownloading=void 0,this.dataLocation="none"}ensureValid(){if(this.dataLocation==="none")throw new Error("The tensor is disposed.")}reshape(e){if(this.ensureValid(),this.downloader||this.disposer)throw new Error("Cannot reshape a tensor that owns GPU resource.");return gd(this,e)}}}),De,yd=q(()=>{"use strict";Na(),De=Ne}),Wr,Ci,Je,Ke,zt,At,_d=q(()=>{"use strict";sd(),Wr=(e,t)=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeStamp(`${e}::ORT::${t}`)},Ci=(e,t)=>{let i=new Error().stack?.split(/\r\n|\r|\n/g)||[],r=!1;for(let a=0;a<i.length;a++){if(r&&!i[a].includes("TRACE_FUNC")){let n=`FUNC_${e}::${i[a].trim().split(" ")[1]}`;t&&(n+=`::${t}`),Wr("CPU",n);return}i[a].includes("TRACE_FUNC")&&(r=!0)}},Je=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||Ci("BEGIN",e)},Ke=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||Ci("END",e)},zt=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.time(`ORT::${e}`)},At=e=>{(typeof ke.trace>"u"?!ke.wasm.trace:!ke.trace)||console.timeEnd(`ORT::${e}`)}}),wd,Em=q(()=>{"use strict";ad(),yd(),_d(),wd=class bd{constructor(t){this.handler=t}async run(t,i,r){Je(),zt("InferenceSession.run");let a={},n={};if(typeof t!="object"||t===null||t instanceof De||Array.isArray(t))throw new TypeError("'feeds' must be an object that use input names as keys and OnnxValue as corresponding values.");let s=!0;if(typeof i=="object"){if(i===null)throw new TypeError("Unexpected argument[1]: cannot be null.");if(i instanceof De)throw new TypeError("'fetches' cannot be a Tensor");if(Array.isArray(i)){if(i.length===0)throw new TypeError("'fetches' cannot be an empty array.");s=!1;for(let p of i){if(typeof p!="string")throw new TypeError("'fetches' must be a string array or an object.");if(this.outputNames.indexOf(p)===-1)throw new RangeError(`'fetches' contains invalid output name: ${p}.`);a[p]=null}if(typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else{let p=!1,c=Object.getOwnPropertyNames(i);for(let h of this.outputNames)if(c.indexOf(h)!==-1){let m=i[h];(m===null||m instanceof De)&&(p=!0,s=!1,a[h]=m)}if(p){if(typeof r=="object"&&r!==null)n=r;else if(typeof r<"u")throw new TypeError("'options' must be an object.")}else n=i}}else if(typeof i<"u")throw new TypeError("Unexpected argument[1]: must be 'fetches' or 'options'.");for(let p of this.inputNames)if(typeof t[p]>"u")throw new Error(`input '${p}' is missing in 'feeds'.`);if(s)for(let p of this.outputNames)a[p]=null;let u=await this.handler.run(t,a,n),l={};for(let p in u)if(Object.hasOwnProperty.call(u,p)){let c=u[p];c instanceof De?l[p]=c:l[p]=new De(c.type,c.data,c.dims)}return At("InferenceSession.run"),Ke(),l}async release(){return this.handler.dispose()}static async create(t,i,r,a){Je(),zt("InferenceSession.create");let n,s={};if(typeof t=="string"){if(n=t,typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof Uint8Array){if(n=t,typeof i=="object"&&i!==null)s=i;else if(typeof i<"u")throw new TypeError("'options' must be an object.")}else if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer){let c=t,h=0,m=t.byteLength;if(typeof i=="object"&&i!==null)s=i;else if(typeof i=="number"){if(h=i,!Number.isSafeInteger(h))throw new RangeError("'byteOffset' must be an integer.");if(h<0||h>=c.byteLength)throw new RangeError(`'byteOffset' is out of range [0, ${c.byteLength}).`);if(m=t.byteLength-h,typeof r=="number"){if(m=r,!Number.isSafeInteger(m))throw new RangeError("'byteLength' must be an integer.");if(m<=0||h+m>c.byteLength)throw new RangeError(`'byteLength' is out of range (0, ${c.byteLength-h}].`);if(typeof a=="object"&&a!==null)s=a;else if(typeof a<"u")throw new TypeError("'options' must be an object.")}else if(typeof r<"u")throw new TypeError("'byteLength' must be a number.")}else if(typeof i<"u")throw new TypeError("'options' must be an object.");n=new Uint8Array(c,h,m)}else throw new TypeError("Unexpected argument[0]: must be 'path' or 'buffer'.");let[u,l]=await id(s),p=await u.createInferenceSessionHandler(n,l);return At("InferenceSession.create"),Ke(),new bd(p)}startProfiling(){this.handler.startProfiling()}endProfiling(){this.handler.endProfiling()}get inputNames(){return this.handler.inputNames}get outputNames(){return this.handler.outputNames}get inputMetadata(){return this.handler.inputMetadata}get outputMetadata(){return this.handler.outputMetadata}}}),Zr,zm=q(()=>{"use strict";Em(),Zr=wd}),Am=q(()=>{"use strict"}),Om=q(()=>{"use strict"}),Rm=q(()=>{"use strict"}),Bm=q(()=>{"use strict"}),Mm={};Ft(Mm,{InferenceSession:()=>Zr,TRACE:()=>Wr,TRACE_EVENT_BEGIN:()=>zt,TRACE_EVENT_END:()=>At,TRACE_FUNC_BEGIN:()=>Je,TRACE_FUNC_END:()=>Ke,Tensor:()=>De,env:()=>ge,registerBackend:()=>Wt});var We=q(()=>{"use strict";vm(),Cm(),zm(),yd(),Am(),Om(),_d(),Rm(),Bm()}),Da=q(()=>{"use strict"}),$d={};Ft($d,{default:()=>vd});var Si,Ti,vd,Nm=q(()=>{"use strict";If(),Mt(),Pa(),Si="ort-wasm-proxy-worker",Ti=globalThis.self?.name===Si,Ti&&(self.onmessage=e=>{let{type:t,in:i}=e.data;try{switch(t){case"init-wasm":Ua(i.wasm).then(()=>{rn(i).then(()=>{postMessage({type:t})},r=>{postMessage({type:t,err:r})})},r=>{postMessage({type:t,err:r})});break;case"init-ep":{let{epName:r,env:a}=i;an(a,r).then(()=>{postMessage({type:t})},n=>{postMessage({type:t,err:n})});break}case"copy-from":{let{buffer:r}=i,a=Kr(r);postMessage({type:t,out:a});break}case"create":{let{model:r,options:a}=i;nn(r,a).then(n=>{postMessage({type:t,out:n})},n=>{postMessage({type:t,err:n})});break}case"release":sn(i),postMessage({type:t});break;case"run":{let{sessionId:r,inputIndices:a,inputs:n,outputIndices:s,options:u}=i;on(r,a,n,s,new Array(s.length).fill(null),u).then(l=>{l.some(p=>p[3]!=="cpu")?postMessage({type:t,err:"Proxy does not support non-cpu tensor location."}):postMessage({type:t,out:l},ln([...n,...l]))},l=>{postMessage({type:t,err:l})});break}case"end-profiling":un(i),postMessage({type:t});break;default:}}catch(r){postMessage({type:t,err:r})}}),vd=Ti?null:e=>new Worker(e??Me,{type:"module",name:Si})}),xd={};Ft(xd,{default:()=>Cd});var ki,Cd,Ss,Dm=q(()=>{"use strict";ki=async function(e={}){var t,i,r=e,a=new Promise((o,d)=>{t=o,i=d}),n=typeof window=="object",s=typeof WorkerGlobalScope<"u",u=s&&self.name?.startsWith("em-pthread");r.mountExternalData=(o,d)=>{o.startsWith("./")&&(o=o.substring(2)),(r.Fb||(r.Fb=new Map)).set(o,d)},r.unmountExternalData=()=>{delete r.Fb};var l=globalThis.SharedArrayBuffer??new WebAssembly.Memory({initial:0,maximum:0,qc:!0}).buffer.constructor;let p=o=>async(...d)=>{try{if(r.Gb)throw Error("Session already started");let f=r.Gb={ec:d[0],errors:[]},g=await o(...d);if(r.Gb!==f)throw Error("Session mismatch");r.Kb?.flush();let b=f.errors;if(0<b.length){let T=await Promise.all(b);if(T=T.filter(E=>E),0<T.length)throw Error(T.join(`
`))}return g}finally{r.Gb=null}};r.jsepInit=(o,d)=>{if(o==="webgpu"){[r.Kb,r.Vb,r.Zb,r.Lb,r.Yb,r.Ab,r.$b,r.bc,r.Wb,r.Xb,r.ac]=d;let f=r.Kb;r.jsepRegisterBuffer=(g,b,T,E)=>f.registerBuffer(g,b,T,E),r.jsepGetBuffer=g=>f.getBuffer(g),r.jsepCreateDownloader=(g,b,T)=>f.createDownloader(g,b,T),r.jsepOnCreateSession=g=>{f.onCreateSession(g)},r.jsepOnReleaseSession=g=>{f.onReleaseSession(g)},r.jsepOnRunStart=g=>f.onRunStart(g),r.cc=(g,b)=>{f.upload(g,b)}}else if(o==="webnn"){let f=d[0];[r.oc,r.Ob,r.webnnEnsureTensor,r.Pb,r.webnnDownloadTensor,r.nc,r.webnnEnableTraceEvent]=d.slice(1),r.webnnReleaseTensorId=r.Ob,r.webnnUploadTensor=r.Pb,r.webnnRegisterMLContext=r.nc,r.webnnOnRunStart=g=>f.onRunStart(g),r.webnnOnRunEnd=f.onRunEnd.bind(f),r.webnnOnReleaseSession=g=>{f.onReleaseSession(g)},r.webnnCreateMLTensorDownloader=(g,b)=>f.createMLTensorDownloader(g,b),r.webnnRegisterMLTensor=(g,b,T,E)=>f.registerMLTensor(g,b,T,E),r.webnnCreateMLContext=g=>f.createMLContext(g),r.webnnRegisterMLConstant=(g,b,T,E,O,P)=>f.registerMLConstant(g,b,T,E,O,r.Fb,P),r.webnnRegisterGraphInput=f.registerGraphInput.bind(f),r.webnnIsGraphInput=f.isGraphInput.bind(f),r.webnnRegisterGraphOutput=f.registerGraphOutput.bind(f),r.webnnIsGraphOutput=f.isGraphOutput.bind(f),r.webnnCreateTemporaryTensor=f.createTemporaryTensor.bind(f),r.webnnIsGraphInputOutputTypeSupported=f.isGraphInputOutputTypeSupported.bind(f)}};let c=()=>{let o=(d,f,g)=>(...b)=>{let T=Ye,E=f?.();b=d(...b);let O=f?.();return E!==O&&(d=O,g(E),f=g=null),Ye!=T?new Promise((P,W)=>{pi={resolve:P,reject:W}}):b};(()=>{for(let d of["_OrtAppendExecutionProvider","_OrtCreateSession","_OrtRun","_OrtRunWithBinding","_OrtBindInput"])r[d]=o(r[d],()=>r[d],f=>r[d]=f)})(),p!==void 0&&(r._OrtRun=p(r._OrtRun),r._OrtRunWithBinding=p(r._OrtRunWithBinding)),c=void 0};r.asyncInit=()=>{c?.()};var h,m,_=(o,d)=>{throw d},y=import.meta.url,v="";if(n||s){try{v=new URL(".",y).href}catch{}s&&(m=o=>{var d=new XMLHttpRequest;return d.open("GET",o,!1),d.responseType="arraybuffer",d.send(null),new Uint8Array(d.response)}),h=async o=>{if(ye(o))return new Promise((f,g)=>{var b=new XMLHttpRequest;b.open("GET",o,!0),b.responseType="arraybuffer",b.onload=()=>{b.status==200||b.status==0&&b.response?f(b.response):g(b.status)},b.onerror=g,b.send(null)});var d=await fetch(o,{credentials:"same-origin"});if(d.ok)return d.arrayBuffer();throw Error(d.status+" : "+d.url)}}var C,w,$,S,x,k,I,z,R,D,V,Z,X,re,j,se=console.log.bind(console),J=console.error.bind(console),G=se,ae=J,F=!1,ye=o=>o.startsWith("file://");function U(){return w.buffer!=x.buffer&&Oe(),x}function L(){return w.buffer!=x.buffer&&Oe(),k}function ie(){return w.buffer!=x.buffer&&Oe(),I}function pe(){return w.buffer!=x.buffer&&Oe(),z}function N(){return w.buffer!=x.buffer&&Oe(),R}function le(){return w.buffer!=x.buffer&&Oe(),D}function Ze(){return w.buffer!=x.buffer&&Oe(),V}function we(){return w.buffer!=x.buffer&&Oe(),re}if(u){let o=function(d){try{var f=d.data,g=f.Db;if(g==="load"){let b=[];self.onmessage=T=>b.push(T),self.startWorker=()=>{postMessage({Db:"loaded"});for(let T of b)o(T);self.onmessage=o};for(let T of f.Sb)r[T]&&!r[T].proxy||(r[T]=(...E)=>{postMessage({Db:"callHandler",Rb:T,args:E})},T=="print"&&(G=r[T]),T=="printErr"&&(ae=r[T]));w=f.kc,Oe(),j(f.lc)}else if(g==="run"){Zf(f.Bb),yi(f.Bb,0,0,1,0,0),bn(),li(f.Bb),Re||(cs(),Re=!0);try{Xf(f.hc,f.Jb)}catch(b){if(b!="unwind")throw b}}else f.target!=="setimmediate"&&(g==="checkMailbox"?Re&&gr():g&&(ae(`worker: received unknown command ${g}`),ae(f)))}catch(b){throw fs(),b}};var xe=o,Re=!1;self.onunhandledrejection=d=>{throw d.reason||d},self.onmessage=o}function Oe(){var o=w.buffer;r.HEAP8=x=new Int8Array(o),I=new Int16Array(o),r.HEAPU8=k=new Uint8Array(o),z=new Uint16Array(o),r.HEAP32=R=new Int32Array(o),r.HEAPU32=D=new Uint32Array(o),V=new Float32Array(o),re=new Float64Array(o),Z=new BigInt64Array(o),X=new BigUint64Array(o)}function mr(){u?startWorker(r):B.Da()}var Yr,Gt=0,Ht=null;function fn(){if(--Gt==0&&Ht){var o=Ht;Ht=null,o()}}function lt(o){throw ae(o="Aborted("+o+")"),F=!0,o=new WebAssembly.RuntimeError(o+". Build with -sASSERTIONS for more info."),i(o),o}function hn(){return{a:{L:mm,Aa:hm,b:Qf,$:Cn,A:kn,pa:In,X:En,Z:zn,qa:An,na:On,ga:Rn,ma:Bn,J:Mn,Y:Nn,V:Dn,oa:Pn,W:Un,va:Jf,E:th,Q:rh,O:ah,D:sh,v:oh,s:uh,P:lh,z:gh,R:yh,ja:_h,T:wh,aa:bh,M:$h,F:vh,ia:li,sa:xh,r:Ch,Ca:Sh,w:Ih,o:Eh,m:Ah,c:ni,Ba:Oh,n:Rh,j:Nh,u:Dh,p:Ph,f:Uh,t:qh,l:Wh,e:Lh,k:Vh,h:jh,g:Fh,d:Gh,da:Hh,ea:Kh,fa:Zh,ba:Qn,ca:Jn,N:es,xa:Yh,ua:em,i:tm,C:rm,G:im,ta:Qh,x:am,ra:nm,U:sm,q:Xh,y:om,K:um,S:lm,za:dm,ya:pm,ka:as,la:ns,_:ti,B:ss,I:os,ha:us,H:ls,a:w,wa:ei}}}class Qr{name="ExitStatus";constructor(d){this.message=`Program terminated with exit(${d})`,this.status=d}}var mn=o=>{o.terminate(),o.onmessage=()=>{}},Jr=[],gn=o=>{pt.length==0&&(vn(),$n(pt[0]));var d=pt.pop();if(!d)return 6;Kt.push(d),wt[o.Bb]=d,d.Bb=o.Bb;var f={Db:"run",hc:o.fc,Jb:o.Jb,Bb:o.Bb};return d.postMessage(f,o.Nb),0},dt=0,be=(o,d,...f)=>{for(var g=2*f.length,b=bi(),T=wi(8*g),E=T>>>3,O=0;O<f.length;O++){var P=f[O];typeof P=="bigint"?(Z[E+2*O]=1n,Z[E+2*O+1]=P):(Z[E+2*O]=0n,we()[E+2*O+1>>>0]=P)}return o=hs(o,0,g,T,d),Sr(b),o};function ei(o){if(u)return be(0,1,o);if(S=o,!(0<dt)){for(var d of Kt)mn(d);for(d of pt)mn(d);pt=[],Kt=[],wt={},F=!0}_(0,new Qr(o))}function yn(o){if(u)return be(1,0,o);ti(o)}var ti=o=>{if(S=o,u)throw yn(o),"unwind";ei(o)},pt=[],Kt=[],_n=[],wt={},wn=o=>{var d=o.Bb;delete wt[d],pt.push(o),Kt.splice(Kt.indexOf(o),1),o.Bb=0,ms(d)};function bn(){_n.forEach(o=>o())}var $n=o=>new Promise(d=>{o.onmessage=b=>{var T=(b=b.data).Db;if(b.Hb&&b.Hb!=gi()){var E=wt[b.Hb];E?E.postMessage(b,b.Nb):ae(`Internal error! Worker sent a message "${T}" to target pthread ${b.Hb}, but that thread no longer exists!`)}else T==="checkMailbox"?gr():T==="spawnThread"?gn(b):T==="cleanupThread"?wn(wt[b.ic]):T==="loaded"?(o.loaded=!0,d(o)):b.target==="setimmediate"?o.postMessage(b):T==="callHandler"?r[b.Rb](...b.args):T&&ae(`worker sent an unknown command ${T}`)},o.onerror=b=>{throw ae(`worker sent an error! ${b.filename}:${b.lineno}: ${b.message}`),b};var f,g=[];for(f of[])r.propertyIsEnumerable(f)&&g.push(f);o.postMessage({Db:"load",Sb:g,kc:w,lc:$})});function vn(){var o=new Worker((()=>{let d=URL;return import.meta.url>"file:"&&import.meta.url<"file;"?new d("ort.bundle.min.mjs",import.meta.url):new URL(import.meta.url)})(),{type:"module",workerData:"em-pthread",name:"em-pthread"});pt.push(o)}var Zf=o=>{Oe();var d=le()[o+52>>>2>>>0];o=le()[o+56>>>2>>>0],_s(d,d-o),Sr(d)},Xf=(o,d)=>{dt=0,o=ws(o,d),0<dt?S=o:_i(o)};class Yf{constructor(d){this.Ib=d-24}}function Qf(o,d,f){var g=new Yf(o>>>=0);throw d>>>=0,f>>>=0,le()[g.Ib+16>>>2>>>0]=0,le()[g.Ib+4>>>2>>>0]=d,le()[g.Ib+8>>>2>>>0]=f,o}function xn(o,d,f,g){return u?be(2,1,o,d,f,g):Cn(o,d,f,g)}function Cn(o,d,f,g){if(o>>>=0,f>>>=0,g>>>=0,l===void 0)return 6;var b=[];return u&&b.length===0?xn(o,d>>>=0,f,g):(o={fc:f,Bb:o,Jb:g,Nb:b},u?(o.Db="spawnThread",postMessage(o,b),0):gn(o))}var Sn=typeof TextDecoder<"u"?new TextDecoder:void 0,Tn=(o,d=0,f=NaN)=>{var g=(d>>>=0)+f;for(f=d;o[f]&&!(f>=g);)++f;if(16<f-d&&o.buffer&&Sn)return Sn.decode(o.buffer instanceof ArrayBuffer?o.subarray(d,f):o.slice(d,f));for(g="";d<f;){var b=o[d++];if(128&b){var T=63&o[d++];if((224&b)==192)g+=String.fromCharCode((31&b)<<6|T);else{var E=63&o[d++];65536>(b=(240&b)==224?(15&b)<<12|T<<6|E:(7&b)<<18|T<<12|E<<6|63&o[d++])?g+=String.fromCharCode(b):(b-=65536,g+=String.fromCharCode(55296|b>>10,56320|1023&b))}}else g+=String.fromCharCode(b)}return g},Ce=(o,d)=>(o>>>=0)?Tn(L(),o,d):"";function kn(o,d,f){return u?be(3,1,o,d,f):0}function In(o,d){if(u)return be(4,1,o,d)}function En(o,d){if(u)return be(5,1,o,d)}function zn(o,d,f){if(u)return be(6,1,o,d,f)}function An(o,d,f){return u?be(7,1,o,d,f):0}function On(o,d){if(u)return be(8,1,o,d)}function Rn(o,d,f){if(u)return be(9,1,o,d,f)}function Bn(o,d,f,g){if(u)return be(10,1,o,d,f,g)}function Mn(o,d,f,g){if(u)return be(11,1,o,d,f,g)}function Nn(o,d,f,g){if(u)return be(12,1,o,d,f,g)}function Dn(o){if(u)return be(13,1,o)}function Pn(o,d){if(u)return be(14,1,o,d)}function Un(o,d,f){if(u)return be(15,1,o,d,f)}var qn,Jf=()=>lt(""),Xe=o=>{for(var d="";L()[o>>>0];)d+=qn[L()[o++>>>0]];return d},ri={},ii={},eh={},Pt=r.BindingError=class extends Error{constructor(o){super(o),this.name="BindingError"}};function rt(o,d,f={}){return(function(g,b,T={}){var E=b.name;if(!g)throw new Pt(`type "${E}" must have a positive integer typeid pointer`);if(ii.hasOwnProperty(g)){if(T.Tb)return;throw new Pt(`Cannot register type '${E}' twice`)}ii[g]=b,delete eh[g],ri.hasOwnProperty(g)&&(b=ri[g],delete ri[g],b.forEach(O=>O()))})(o,d,f)}var Wn=(o,d,f)=>{switch(d){case 1:return f?g=>U()[g>>>0]:g=>L()[g>>>0];case 2:return f?g=>ie()[g>>>1>>>0]:g=>pe()[g>>>1>>>0];case 4:return f?g=>N()[g>>>2>>>0]:g=>le()[g>>>2>>>0];case 8:return f?g=>Z[g>>>3]:g=>X[g>>>3];default:throw new TypeError(`invalid integer width (${d}): ${o}`)}};function th(o,d,f){f>>>=0,rt(o>>>=0,{name:d=Xe(d>>>0),fromWireType:g=>g,toWireType:function(g,b){if(typeof b!="bigint"&&typeof b!="number")throw b=b===null?"null":(g=typeof b)=="object"||g==="array"||g==="function"?b.toString():""+b,new TypeError(`Cannot convert "${b}" to ${this.name}`);return typeof b=="number"&&(b=BigInt(b)),b},Cb:ct,readValueFromPointer:Wn(d,f,d.indexOf("u")==-1),Eb:null})}var ct=8;function rh(o,d,f,g){rt(o>>>=0,{name:d=Xe(d>>>0),fromWireType:function(b){return!!b},toWireType:function(b,T){return T?f:g},Cb:ct,readValueFromPointer:function(b){return this.fromWireType(L()[b>>>0])},Eb:null})}var ai=[],it=[];function ni(o){9<(o>>>=0)&&--it[o+1]==0&&(it[o]=void 0,ai.push(o))}var ze=o=>{if(!o)throw new Pt(`Cannot use deleted val. handle = ${o}`);return it[o]},Ue=o=>{switch(o){case void 0:return 2;case null:return 4;case!0:return 6;case!1:return 8;default:let d=ai.pop()||it.length;return it[d]=o,it[d+1]=1,d}};function si(o){return this.fromWireType(le()[o>>>2>>>0])}var ih={name:"emscripten::val",fromWireType:o=>{var d=ze(o);return ni(o),d},toWireType:(o,d)=>Ue(d),Cb:ct,readValueFromPointer:si,Eb:null};function ah(o){return rt(o>>>0,ih)}var nh=(o,d)=>{switch(d){case 4:return function(f){return this.fromWireType(Ze()[f>>>2>>>0])};case 8:return function(f){return this.fromWireType(we()[f>>>3>>>0])};default:throw new TypeError(`invalid float width (${d}): ${o}`)}};function sh(o,d,f){f>>>=0,rt(o>>>=0,{name:d=Xe(d>>>0),fromWireType:g=>g,toWireType:(g,b)=>b,Cb:ct,readValueFromPointer:nh(d,f),Eb:null})}function oh(o,d,f,g,b){if(o>>>=0,f>>>=0,d=Xe(d>>>0),b===-1&&(b=4294967295),b=O=>O,g===0){var T=32-8*f;b=O=>O<<T>>>T}var E=d.includes("unsigned")?function(O,P){return P>>>0}:function(O,P){return P};rt(o,{name:d,fromWireType:b,toWireType:E,Cb:ct,readValueFromPointer:Wn(d,f,g!==0),Eb:null})}function uh(o,d,f){function g(T){var E=le()[T>>>2>>>0];return T=le()[T+4>>>2>>>0],new b(U().buffer,T,E)}var b=[Int8Array,Uint8Array,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array,BigInt64Array,BigUint64Array][d];rt(o>>>=0,{name:f=Xe(f>>>0),fromWireType:g,Cb:ct,readValueFromPointer:g},{Tb:!0})}var bt=(o,d,f)=>{var g=L();if(d>>>=0,0<f){var b=d;f=d+f-1;for(var T=0;T<o.length;++T){var E=o.charCodeAt(T);if(55296<=E&&57343>=E&&(E=65536+((1023&E)<<10)|1023&o.charCodeAt(++T)),127>=E){if(d>=f)break;g[d++>>>0]=E}else{if(2047>=E){if(d+1>=f)break;g[d++>>>0]=192|E>>6}else{if(65535>=E){if(d+2>=f)break;g[d++>>>0]=224|E>>12}else{if(d+3>=f)break;g[d++>>>0]=240|E>>18,g[d++>>>0]=128|E>>12&63}g[d++>>>0]=128|E>>6&63}g[d++>>>0]=128|63&E}}g[d>>>0]=0,o=d-b}else o=0;return o},oi=o=>{for(var d=0,f=0;f<o.length;++f){var g=o.charCodeAt(f);127>=g?d++:2047>=g?d+=2:55296<=g&&57343>=g?(d+=4,++f):d+=3}return d};function lh(o,d){rt(o>>>=0,{name:d=Xe(d>>>0),fromWireType:function(f){for(var g,b=le()[f>>>2>>>0],T=f+4,E=T,O=0;O<=b;++O){var P=T+O;O!=b&&L()[P>>>0]!=0||(E=Ce(E,P-E),g===void 0?g=E:(g+="\0",g+=E),E=P+1)}return at(f),g},toWireType:function(f,g){g instanceof ArrayBuffer&&(g=new Uint8Array(g));var b=typeof g=="string";if(!(b||ArrayBuffer.isView(g)&&g.BYTES_PER_ELEMENT==1))throw new Pt("Cannot pass non-string to std::string");var T=b?oi(g):g.length,E=Cr(4+T+1),O=E+4;return le()[E>>>2>>>0]=T,b?bt(g,O,T+1):L().set(g,O>>>0),f!==null&&f.push(at,E),E},Cb:ct,readValueFromPointer:si,Eb(f){at(f)}})}var Ln=typeof TextDecoder<"u"?new TextDecoder("utf-16le"):void 0,dh=(o,d)=>{for(var f=o>>1,g=f+d/2;!(f>=g)&&pe()[f>>>0];)++f;if(32<(f<<=1)-o&&Ln)return Ln.decode(L().slice(o,f));for(f="",g=0;!(g>=d/2);++g){var b=ie()[o+2*g>>>1>>>0];if(b==0)break;f+=String.fromCharCode(b)}return f},ph=(o,d,f)=>{if(f??=2147483647,2>f)return 0;var g=d;f=(f-=2)<2*o.length?f/2:o.length;for(var b=0;b<f;++b){var T=o.charCodeAt(b);ie()[d>>>1>>>0]=T,d+=2}return ie()[d>>>1>>>0]=0,d-g},ch=o=>2*o.length,fh=(o,d)=>{for(var f=0,g="";!(f>=d/4);){var b=N()[o+4*f>>>2>>>0];if(b==0)break;++f,65536<=b?(b-=65536,g+=String.fromCharCode(55296|b>>10,56320|1023&b)):g+=String.fromCharCode(b)}return g},hh=(o,d,f)=>{if(d>>>=0,f??=2147483647,4>f)return 0;var g=d;f=g+f-4;for(var b=0;b<o.length;++b){var T=o.charCodeAt(b);if(55296<=T&&57343>=T&&(T=65536+((1023&T)<<10)|1023&o.charCodeAt(++b)),N()[d>>>2>>>0]=T,(d+=4)+4>f)break}return N()[d>>>2>>>0]=0,d-g},mh=o=>{for(var d=0,f=0;f<o.length;++f){var g=o.charCodeAt(f);55296<=g&&57343>=g&&++f,d+=4}return d};function gh(o,d,f){if(o>>>=0,d>>>=0,f=Xe(f>>>=0),d===2)var g=dh,b=ph,T=ch,E=O=>pe()[O>>>1>>>0];else d===4&&(g=fh,b=hh,T=mh,E=O=>le()[O>>>2>>>0]);rt(o,{name:f,fromWireType:O=>{for(var P,W=le()[O>>>2>>>0],H=O+4,ee=0;ee<=W;++ee){var ue=O+4+ee*d;ee!=W&&E(ue)!=0||(H=g(H,ue-H),P===void 0?P=H:(P+="\0",P+=H),H=ue+d)}return at(O),P},toWireType:(O,P)=>{if(typeof P!="string")throw new Pt(`Cannot pass non-string to C++ string type ${f}`);var W=T(P),H=Cr(4+W+d);return le()[H>>>2>>>0]=W/d,b(P,H+4,W+d),O!==null&&O.push(at,H),H},Cb:ct,readValueFromPointer:si,Eb(O){at(O)}})}function yh(o,d){rt(o>>>=0,{Ub:!0,name:d=Xe(d>>>0),Cb:0,fromWireType:()=>{},toWireType:()=>{}})}function _h(o){yi(o>>>0,!s,1,!n,131072,!1),bn()}var ui=o=>{if(!F)try{if(o(),!(0<dt))try{u?_i(S):ti(S)}catch(d){d instanceof Qr||d=="unwind"||_(0,d)}}catch(d){d instanceof Qr||d=="unwind"||_(0,d)}};function li(o){o>>>=0,typeof Atomics.jc=="function"&&(Atomics.jc(N(),o>>>2,o).value.then(gr),o+=128,Atomics.store(N(),o>>>2,1))}var gr=()=>{var o=gi();o&&(li(o),ui(ys))};function wh(o,d){(o>>>=0)==d>>>0?setTimeout(gr):u?postMessage({Hb:o,Db:"checkMailbox"}):(o=wt[o])&&o.postMessage({Db:"checkMailbox"})}var di=[];function bh(o,d,f,g,b){for(d>>>=0,g/=2,di.length=g,f=b>>>0>>>3,b=0;b<g;b++)di[b]=Z[f+2*b]?Z[f+2*b+1]:we()[f+2*b+1>>>0];return(d?mi[d]:fm[o])(...di)}var $h=()=>{dt=0};function vh(o){o>>>=0,u?postMessage({Db:"cleanupThread",ic:o}):wn(wt[o])}function xh(o){}var yr=(o,d)=>{var f=ii[o];if(f===void 0)throw o=ps(o),f=Xe(o),at(o),new Pt(`${d} has unknown type ${f}`);return f},Vn=(o,d,f)=>{var g=[];return o=o.toWireType(g,f),g.length&&(le()[d>>>2>>>0]=Ue(g)),o};function Ch(o,d,f){return d>>>=0,f>>>=0,o=ze(o>>>0),d=yr(d,"emval::as"),Vn(d,f,o)}function Sh(o,d){return d>>>=0,o=ze(o>>>0),(d=yr(d,"emval::as")).toWireType(null,o)}var _r=o=>{try{o()}catch(d){lt(d)}},ft=0,Ye=null,jn=0,wr=[],Fn={},Gn={},Th=0,pi=null,kh=[];function Hn(o){return(function(d){if(!F){if(ft===0){var f=!1,g=!1;d((b=0)=>{if(!F&&(jn=b,f=!0,g)){ft=2,_r(()=>vs(Ye)),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.resume(),b=!1;try{var T=(function(){var P=N()[Ye+8>>>2>>>0];return P=B[Gn[P]],--dt,P()})()}catch(P){T=P,b=!0}var E=!1;if(!Ye){var O=pi;O&&(pi=null,(b?O.reject:O.resolve)(T),E=!0)}if(b&&!E)throw T}}),g=!0,f||(ft=1,Ye=(function(){var b=Cr(65548),T=b+12;le()[b>>>2>>>0]=T,le()[b+4>>>2>>>0]=T+65536,T=wr[0];var E=Fn[T];return E===void 0&&(E=Th++,Fn[T]=E,Gn[E]=T),T=E,N()[b+8>>>2>>>0]=T,b})(),typeof MainLoop<"u"&&MainLoop.Qb&&MainLoop.pause(),_r(()=>bs(Ye)))}else ft===2?(ft=0,_r(xs),at(Ye),Ye=null,kh.forEach(ui)):lt(`invalid state: ${ft}`);return jn}})(d=>{o().then(d)})}function Ih(o){return o>>>=0,Hn(async()=>{var d=await ze(o);return Ue(d)})}var br=[];function Eh(o,d,f,g){return f>>>=0,g>>>=0,(o=br[o>>>0])(null,d=ze(d>>>0),f,g)}var zh={},$r=o=>{var d=zh[o];return d===void 0?Xe(o):d};function Ah(o,d,f,g,b){return f>>>=0,g>>>=0,b>>>=0,(o=br[o>>>0])(d=ze(d>>>0),d[f=$r(f)],g,b)}function Oh(o,d){return d>>>=0,(o=ze(o>>>0))==ze(d)}var Kn=()=>typeof globalThis=="object"?globalThis:Function("return this")();function Rh(o){return(o>>>=0)==0?Ue(Kn()):(o=$r(o),Ue(Kn()[o]))}var Bh=o=>{var d=br.length;return br.push(o),d},Mh=(o,d)=>{for(var f=Array(o),g=0;g<o;++g)f[g]=yr(le()[d+4*g>>>2>>>0],`parameter ${g}`);return f};function Nh(o,d,f){var g=(d=Mh(o,d>>>0)).shift();o--;var b=`return function (obj, func, destructorsRef, args) {
`,T=0,E=[];f===0&&E.push("obj");for(var O=["retType"],P=[g],W=0;W<o;++W)E.push(`arg${W}`),O.push(`argType${W}`),P.push(d[W]),b+=`  var arg${W} = argType${W}.readValueFromPointer(args${T?"+"+T:""});
`,T+=d[W].Cb;return b+=`  var rv = ${f===1?"new func":"func.call"}(${E.join(", ")});
`,g.Ub||(O.push("emval_returnValue"),P.push(Vn),b+=`  return emval_returnValue(retType, destructorsRef, rv);
`),o=new Function(...O,b+`};
`)(...P),f=`methodCaller<(${d.map(H=>H.name).join(", ")}) => ${g.name}>`,Bh(Object.defineProperty(o,"name",{value:f}))}function Dh(o){return o=$r(o>>>0),Ue(r[o])}function Ph(o,d){return d>>>=0,o=ze(o>>>0),d=ze(d),Ue(o[d])}function Uh(o){9<(o>>>=0)&&(it[o+1]+=1)}function qh(){return Ue([])}function Wh(o){o=ze(o>>>0);for(var d=Array(o.length),f=0;f<o.length;f++)d[f]=o[f];return Ue(d)}function Lh(o){return Ue($r(o>>>0))}function Vh(){return Ue({})}function jh(o){for(var d=ze(o>>>=0);d.length;){var f=d.pop();d.pop()(f)}ni(o)}function Fh(o,d,f){d>>>=0,f>>>=0,o=ze(o>>>0),d=ze(d),f=ze(f),o[d]=f}function Gh(o,d){return d>>>=0,o=(o=yr(o>>>0,"_emval_take_value")).readValueFromPointer(d),Ue(o)}function Hh(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),N()[d>>>2>>>0]=o.getUTCSeconds(),N()[d+4>>>2>>>0]=o.getUTCMinutes(),N()[d+8>>>2>>>0]=o.getUTCHours(),N()[d+12>>>2>>>0]=o.getUTCDate(),N()[d+16>>>2>>>0]=o.getUTCMonth(),N()[d+20>>>2>>>0]=o.getUTCFullYear()-1900,N()[d+24>>>2>>>0]=o.getUTCDay(),o=(o.getTime()-Date.UTC(o.getUTCFullYear(),0,1,0,0,0,0))/864e5|0,N()[d+28>>>2>>>0]=o}var Zn=o=>o%4==0&&(o%100!=0||o%400==0),Xn=[0,31,60,91,121,152,182,213,244,274,305,335],Yn=[0,31,59,90,120,151,181,212,243,273,304,334];function Kh(o,d){o=-9007199254740992>o||9007199254740992<o?NaN:Number(o),d>>>=0,o=new Date(1e3*o),N()[d>>>2>>>0]=o.getSeconds(),N()[d+4>>>2>>>0]=o.getMinutes(),N()[d+8>>>2>>>0]=o.getHours(),N()[d+12>>>2>>>0]=o.getDate(),N()[d+16>>>2>>>0]=o.getMonth(),N()[d+20>>>2>>>0]=o.getFullYear()-1900,N()[d+24>>>2>>>0]=o.getDay();var f=(Zn(o.getFullYear())?Xn:Yn)[o.getMonth()]+o.getDate()-1|0;N()[d+28>>>2>>>0]=f,N()[d+36>>>2>>>0]=-60*o.getTimezoneOffset(),f=new Date(o.getFullYear(),6,1).getTimezoneOffset();var g=new Date(o.getFullYear(),0,1).getTimezoneOffset();o=0|(f!=g&&o.getTimezoneOffset()==Math.min(g,f)),N()[d+32>>>2>>>0]=o}function Zh(o){o>>>=0;var d=new Date(N()[o+20>>>2>>>0]+1900,N()[o+16>>>2>>>0],N()[o+12>>>2>>>0],N()[o+8>>>2>>>0],N()[o+4>>>2>>>0],N()[o>>>2>>>0],0),f=N()[o+32>>>2>>>0],g=d.getTimezoneOffset(),b=new Date(d.getFullYear(),6,1).getTimezoneOffset(),T=new Date(d.getFullYear(),0,1).getTimezoneOffset(),E=Math.min(T,b);return 0>f?N()[o+32>>>2>>>0]=+(b!=T&&E==g):0<f!=(E==g)&&(b=Math.max(T,b),d.setTime(d.getTime()+6e4*((0<f?E:b)-g))),N()[o+24>>>2>>>0]=d.getDay(),f=(Zn(d.getFullYear())?Xn:Yn)[d.getMonth()]+d.getDate()-1|0,N()[o+28>>>2>>>0]=f,N()[o>>>2>>>0]=d.getSeconds(),N()[o+4>>>2>>>0]=d.getMinutes(),N()[o+8>>>2>>>0]=d.getHours(),N()[o+12>>>2>>>0]=d.getDate(),N()[o+16>>>2>>>0]=d.getMonth(),N()[o+20>>>2>>>0]=d.getYear(),o=d.getTime(),BigInt(isNaN(o)?-1:o/1e3)}function Qn(o,d,f,g,b,T,E){return u?be(16,1,o,d,f,g,b,T,E):-52}function Jn(o,d,f,g,b,T){if(u)return be(17,1,o,d,f,g,b,T)}var Zt={},Xh=()=>performance.timeOrigin+performance.now();function es(o,d){if(u)return be(18,1,o,d);if(Zt[o]&&(clearTimeout(Zt[o].id),delete Zt[o]),!d)return 0;var f=setTimeout(()=>{delete Zt[o],ui(()=>gs(o,performance.timeOrigin+performance.now()))},d);return Zt[o]={id:f,rc:d},0}function Yh(o,d,f,g){o>>>=0,d>>>=0,f>>>=0,g>>>=0;var b=new Date().getFullYear(),T=new Date(b,0,1).getTimezoneOffset();b=new Date(b,6,1).getTimezoneOffset();var E=Math.max(T,b);le()[o>>>2>>>0]=60*E,N()[d>>>2>>>0]=+(T!=b),o=(d=O=>{var P=Math.abs(O);return`UTC${0<=O?"-":"+"}${String(Math.floor(P/60)).padStart(2,"0")}${String(P%60).padStart(2,"0")}`})(T),d=d(b),b<T?(bt(o,f,17),bt(d,g,17)):(bt(o,g,17),bt(d,f,17))}var Qh=()=>Date.now(),Jh=1;function em(o,d,f){if(!(0<=o&&3>=o))return 28;if(o===0)o=Date.now();else{if(!Jh)return 52;o=performance.timeOrigin+performance.now()}return Z[f>>>0>>>3]=BigInt(Math.round(1e6*o)),0}var ci=[],ts=(o,d)=>{ci.length=0;for(var f;f=L()[o++>>>0];){var g=f!=105;d+=(g&=f!=112)&&d%8?4:0,ci.push(f==112?le()[d>>>2>>>0]:f==106?Z[d>>>3]:f==105?N()[d>>>2>>>0]:we()[d>>>3>>>0]),d+=g?8:4}return ci};function tm(o,d,f){return o>>>=0,d=ts(d>>>0,f>>>0),mi[o](...d)}function rm(o,d,f){return o>>>=0,d=ts(d>>>0,f>>>0),mi[o](...d)}var im=()=>{};function am(o,d){return ae(Ce(o>>>0,d>>>0))}var nm=()=>{throw dt+=1,"unwind"};function sm(){return 4294901760}var om=()=>navigator.hardwareConcurrency;function um(){return lt("Cannot use emscripten_pc_get_function without -sUSE_OFFSET_CONVERTER"),0}function lm(o){o>>>=0;var d=L().length;if(o<=d||4294901760<o)return!1;for(var f=1;4>=f;f*=2){var g=d*(1+.2/f);g=Math.min(g,o+100663296);e:{g=(Math.min(4294901760,65536*Math.ceil(Math.max(o,g)/65536))-w.buffer.byteLength+65535)/65536|0;try{w.grow(g),Oe();var b=1;break e}catch{}b=void 0}if(b)return!0}return!1}var vr=()=>(lt("Cannot use convertFrameToPC (needed by __builtin_return_address) without -sUSE_OFFSET_CONVERTER"),0),Ut={},rs=o=>{o.forEach(d=>{var f=vr();f&&(Ut[f]=d)})};function dm(){var o=Error().stack.toString().split(`
`);return o[0]=="Error"&&o.shift(),rs(o),Ut.Mb=vr(),Ut.dc=o,Ut.Mb}function pm(o,d,f){if(o>>>=0,d>>>=0,Ut.Mb==o)var g=Ut.dc;else(g=Error().stack.toString().split(`
`))[0]=="Error"&&g.shift(),rs(g);for(var b=3;g[b]&&vr()!=o;)++b;for(o=0;o<f&&g[o+b];++o)N()[d+4*o>>>2>>>0]=vr();return o}var fi,hi={},is=()=>{if(!fi){var o,d={USER:"web_user",LOGNAME:"web_user",PATH:"/",PWD:"/",HOME:"/home/web_user",LANG:(typeof navigator=="object"&&navigator.languages&&navigator.languages[0]||"C").replace("-","_")+".UTF-8",_:"./this.program"};for(o in hi)hi[o]===void 0?delete d[o]:d[o]=hi[o];var f=[];for(o in d)f.push(`${o}=${d[o]}`);fi=f}return fi};function as(o,d){if(u)return be(19,1,o,d);o>>>=0,d>>>=0;var f,g=0,b=0;for(f of is()){var T=d+g;le()[o+b>>>2>>>0]=T,g+=bt(f,T,1/0)+1,b+=4}return 0}function ns(o,d){if(u)return be(20,1,o,d);o>>>=0,d>>>=0;var f=is();for(var g of(le()[o>>>2>>>0]=f.length,o=0,f))o+=oi(g)+1;return le()[d>>>2>>>0]=o,0}function ss(o){return u?be(21,1,o):52}function os(o,d,f,g){return u?be(22,1,o,d,f,g):52}function us(o,d,f,g){return u?be(23,1,o,d,f,g):70}var cm=[null,[],[]];function ls(o,d,f,g){if(u)return be(24,1,o,d,f,g);d>>>=0,f>>>=0,g>>>=0;for(var b=0,T=0;T<f;T++){var E=le()[d>>>2>>>0],O=le()[d+4>>>2>>>0];d+=8;for(var P=0;P<O;P++){var W=o,H=L()[E+P>>>0],ee=cm[W];H===0||H===10?((W===1?G:ae)(Tn(ee)),ee.length=0):ee.push(H)}b+=O}return le()[g>>>2>>>0]=b,0}u||(function(){for(var o=r.numThreads-1;o--;)vn();Jr.push(()=>{Gt++,(function(d){u?d():Promise.all(pt.map($n)).then(d)})(()=>fn())})})();for(var ds=Array(256),xr=0;256>xr;++xr)ds[xr]=String.fromCharCode(xr);qn=ds,it.push(0,1,void 0,1,null,1,!0,1,!1,1),r.count_emval_handles=()=>it.length/2-5-ai.length,u||(w=new WebAssembly.Memory({initial:256,maximum:65536,shared:!0}),Oe()),r.wasmBinary&&(C=r.wasmBinary),r.stackSave=()=>bi(),r.stackRestore=o=>Sr(o),r.stackAlloc=o=>wi(o),r.setValue=function(o,d,f="i8"){switch(f.endsWith("*")&&(f="*"),f){case"i1":case"i8":U()[o>>>0]=d;break;case"i16":ie()[o>>>1>>>0]=d;break;case"i32":N()[o>>>2>>>0]=d;break;case"i64":Z[o>>>3]=BigInt(d);break;case"float":Ze()[o>>>2>>>0]=d;break;case"double":we()[o>>>3>>>0]=d;break;case"*":le()[o>>>2>>>0]=d;break;default:lt(`invalid type for setValue: ${f}`)}},r.getValue=function(o,d="i8"){switch(d.endsWith("*")&&(d="*"),d){case"i1":case"i8":return U()[o>>>0];case"i16":return ie()[o>>>1>>>0];case"i32":return N()[o>>>2>>>0];case"i64":return Z[o>>>3];case"float":return Ze()[o>>>2>>>0];case"double":return we()[o>>>3>>>0];case"*":return le()[o>>>2>>>0];default:lt(`invalid type for getValue: ${d}`)}},r.UTF8ToString=Ce,r.stringToUTF8=bt,r.lengthBytesUTF8=oi;var fm=[ei,yn,xn,kn,In,En,zn,An,On,Rn,Bn,Mn,Nn,Dn,Pn,Un,Qn,Jn,es,as,ns,ss,os,us,ls],mi={893836:(o,d,f,g,b)=>{if(r===void 0||!r.Fb)return 1;if((o=Ce(Number(o>>>0))).startsWith("./")&&(o=o.substring(2)),!(o=r.Fb.get(o)))return 2;if(d=Number(d>>>0),f=Number(f>>>0),g=Number(g>>>0),d+f>o.byteLength)return 3;try{let T=o.subarray(d,d+f);switch(b){case 0:L().set(T,g>>>0);break;case 1:r.mc?r.mc(g,T):r.cc(g,T);break;default:return 4}return 0}catch{return 4}},894660:(o,d,f)=>{r.Pb(o,L().subarray(d>>>0,d+f>>>0))},894724:()=>r.oc(),894766:o=>{r.Ob(o)},894803:()=>{r.Wb()},894834:()=>{r.Xb()},894863:()=>{r.ac()},894888:o=>r.Vb(o),894921:o=>r.Zb(o),894953:(o,d,f)=>{r.Lb(Number(o),Number(d),Number(f),!0)},895016:(o,d,f)=>{r.Lb(Number(o),Number(d),Number(f))},895073:()=>typeof wasmOffsetConverter<"u",895130:o=>{r.Ab("Abs",o,void 0)},895181:o=>{r.Ab("Neg",o,void 0)},895232:o=>{r.Ab("Floor",o,void 0)},895285:o=>{r.Ab("Ceil",o,void 0)},895337:o=>{r.Ab("Reciprocal",o,void 0)},895395:o=>{r.Ab("Sqrt",o,void 0)},895447:o=>{r.Ab("Exp",o,void 0)},895498:o=>{r.Ab("Erf",o,void 0)},895549:o=>{r.Ab("Sigmoid",o,void 0)},895604:(o,d,f)=>{r.Ab("HardSigmoid",o,{alpha:d,beta:f})},895683:o=>{r.Ab("Log",o,void 0)},895734:o=>{r.Ab("Sin",o,void 0)},895785:o=>{r.Ab("Cos",o,void 0)},895836:o=>{r.Ab("Tan",o,void 0)},895887:o=>{r.Ab("Asin",o,void 0)},895939:o=>{r.Ab("Acos",o,void 0)},895991:o=>{r.Ab("Atan",o,void 0)},896043:o=>{r.Ab("Sinh",o,void 0)},896095:o=>{r.Ab("Cosh",o,void 0)},896147:o=>{r.Ab("Asinh",o,void 0)},896200:o=>{r.Ab("Acosh",o,void 0)},896253:o=>{r.Ab("Atanh",o,void 0)},896306:o=>{r.Ab("Tanh",o,void 0)},896358:o=>{r.Ab("Not",o,void 0)},896409:(o,d,f)=>{r.Ab("Clip",o,{min:d,max:f})},896478:o=>{r.Ab("Clip",o,void 0)},896530:(o,d)=>{r.Ab("Elu",o,{alpha:d})},896588:o=>{r.Ab("Gelu",o,void 0)},896640:o=>{r.Ab("Relu",o,void 0)},896692:(o,d)=>{r.Ab("LeakyRelu",o,{alpha:d})},896756:(o,d)=>{r.Ab("ThresholdedRelu",o,{alpha:d})},896826:(o,d)=>{r.Ab("Cast",o,{to:d})},896884:o=>{r.Ab("Add",o,void 0)},896935:o=>{r.Ab("Sub",o,void 0)},896986:o=>{r.Ab("Mul",o,void 0)},897037:o=>{r.Ab("Div",o,void 0)},897088:o=>{r.Ab("Pow",o,void 0)},897139:o=>{r.Ab("Equal",o,void 0)},897192:o=>{r.Ab("Greater",o,void 0)},897247:o=>{r.Ab("GreaterOrEqual",o,void 0)},897309:o=>{r.Ab("Less",o,void 0)},897361:o=>{r.Ab("LessOrEqual",o,void 0)},897420:(o,d,f,g,b)=>{r.Ab("ReduceMean",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897595:(o,d,f,g,b)=>{r.Ab("ReduceMax",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897769:(o,d,f,g,b)=>{r.Ab("ReduceMin",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},897943:(o,d,f,g,b)=>{r.Ab("ReduceProd",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898118:(o,d,f,g,b)=>{r.Ab("ReduceSum",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898292:(o,d,f,g,b)=>{r.Ab("ReduceL1",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898465:(o,d,f,g,b)=>{r.Ab("ReduceL2",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898638:(o,d,f,g,b)=>{r.Ab("ReduceLogSum",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898815:(o,d,f,g,b)=>{r.Ab("ReduceSumSquare",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},898995:(o,d,f,g,b)=>{r.Ab("ReduceLogSumExp",o,{keepDims:!!d,noopWithEmptyAxes:!!f,axes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},899175:o=>{r.Ab("Where",o,void 0)},899228:(o,d,f)=>{r.Ab("Transpose",o,{perm:d?Array.from(N().subarray(Number(d)>>>0,Number(f)>>>0)):[]})},899352:(o,d,f,g)=>{r.Ab("DepthToSpace",o,{blocksize:d,mode:Ce(f),format:g?"NHWC":"NCHW"})},899485:(o,d,f,g)=>{r.Ab("DepthToSpace",o,{blocksize:d,mode:Ce(f),format:g?"NHWC":"NCHW"})},899618:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se)=>{r.Ab("ConvTranspose",o,{format:P?"NHWC":"NCHW",autoPad:d,dilations:[f],group:g,kernelShape:[b],pads:[T,E],strides:[O],wIsConst:()=>!!U()[W>>>0],outputPadding:H?Array.from(N().subarray(Number(H)>>>0,Number(ee)>>>0)):[],outputShape:ue?Array.from(N().subarray(Number(ue)>>>0,Number(fe)>>>0)):[],activation:Ce(Se)})},900051:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("ConvTranspose",o,{format:O?"NHWC":"NCHW",autoPad:d,dilations:Array.from(N().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:g,kernelShape:Array.from(N().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(N().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(N().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),wIsConst:()=>!!U()[P>>>0],outputPadding:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],outputShape:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[],activation:Ce(fe)})},900712:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se)=>{r.Ab("ConvTranspose",o,{format:P?"NHWC":"NCHW",autoPad:d,dilations:[f],group:g,kernelShape:[b],pads:[T,E],strides:[O],wIsConst:()=>!!U()[W>>>0],outputPadding:H?Array.from(N().subarray(Number(H)>>>0,Number(ee)>>>0)):[],outputShape:ue?Array.from(N().subarray(Number(ue)>>>0,Number(fe)>>>0)):[],activation:Ce(Se)})},901145:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("ConvTranspose",o,{format:O?"NHWC":"NCHW",autoPad:d,dilations:Array.from(N().subarray(Number(f)>>>0,2+(Number(f)>>>0)>>>0)),group:g,kernelShape:Array.from(N().subarray(Number(b)>>>0,2+(Number(b)>>>0)>>>0)),pads:Array.from(N().subarray(Number(T)>>>0,4+(Number(T)>>>0)>>>0)),strides:Array.from(N().subarray(Number(E)>>>0,2+(Number(E)>>>0)>>>0)),wIsConst:()=>!!U()[P>>>0],outputPadding:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],outputShape:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[],activation:Ce(fe)})},901806:(o,d)=>{r.Ab("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},901897:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("AveragePool",o,{format:fe?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:g,storage_order:b,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],strides:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},902376:(o,d)=>{r.Ab("GlobalAveragePool",o,{format:d?"NHWC":"NCHW"})},902467:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("AveragePool",o,{format:fe?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:g,storage_order:b,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],strides:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},902946:(o,d)=>{r.Ab("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},903033:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("MaxPool",o,{format:fe?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:g,storage_order:b,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],strides:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},903508:(o,d)=>{r.Ab("GlobalMaxPool",o,{format:d?"NHWC":"NCHW"})},903595:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>{r.Ab("MaxPool",o,{format:fe?"NHWC":"NCHW",auto_pad:d,ceil_mode:f,count_include_pad:g,storage_order:b,dilations:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[],kernel_shape:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],pads:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],strides:ee?Array.from(N().subarray(Number(ee)>>>0,Number(ue)>>>0)):[]})},904070:(o,d,f,g,b)=>{r.Ab("Gemm",o,{alpha:d,beta:f,transA:g,transB:b})},904174:o=>{r.Ab("MatMul",o,void 0)},904228:(o,d,f,g)=>{r.Ab("ArgMax",o,{keepDims:!!d,selectLastIndex:!!f,axis:g})},904336:(o,d,f,g)=>{r.Ab("ArgMin",o,{keepDims:!!d,selectLastIndex:!!f,axis:g})},904444:(o,d)=>{r.Ab("Softmax",o,{axis:d})},904507:(o,d)=>{r.Ab("Concat",o,{axis:d})},904567:(o,d,f,g,b)=>{r.Ab("Split",o,{axis:d,numOutputs:f,splitSizes:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},904723:o=>{r.Ab("Expand",o,void 0)},904777:(o,d)=>{r.Ab("Gather",o,{axis:Number(d)})},904848:(o,d)=>{r.Ab("GatherElements",o,{axis:Number(d)})},904927:(o,d)=>{r.Ab("GatherND",o,{batch_dims:Number(d)})},905006:(o,d,f,g,b,T,E,O,P,W,H)=>{r.Ab("Resize",o,{antialias:d,axes:f?Array.from(N().subarray(Number(f)>>>0,Number(g)>>>0)):[],coordinateTransformMode:Ce(b),cubicCoeffA:T,excludeOutside:E,extrapolationValue:O,keepAspectRatioPolicy:Ce(P),mode:Ce(W),nearestMode:Ce(H)})},905368:(o,d,f,g,b,T,E)=>{r.Ab("Slice",o,{starts:d?Array.from(N().subarray(Number(d)>>>0,Number(f)>>>0)):[],ends:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[],axes:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[]})},905632:o=>{r.Ab("Tile",o,void 0)},905684:(o,d,f)=>{r.Ab("InstanceNormalization",o,{epsilon:d,format:f?"NHWC":"NCHW"})},905798:(o,d,f)=>{r.Ab("InstanceNormalization",o,{epsilon:d,format:f?"NHWC":"NCHW"})},905912:o=>{r.Ab("Range",o,void 0)},905965:(o,d)=>{r.Ab("Einsum",o,{equation:Ce(d)})},906046:(o,d,f,g,b)=>{r.Ab("Pad",o,{mode:d,value:f,pads:g?Array.from(N().subarray(Number(g)>>>0,Number(b)>>>0)):[]})},906189:(o,d,f,g,b,T)=>{r.Ab("BatchNormalization",o,{epsilon:d,momentum:f,spatial:!!b,trainingMode:!!g,format:T?"NHWC":"NCHW"})},906358:(o,d,f,g,b,T)=>{r.Ab("BatchNormalization",o,{epsilon:d,momentum:f,spatial:!!b,trainingMode:!!g,format:T?"NHWC":"NCHW"})},906527:(o,d,f)=>{r.Ab("CumSum",o,{exclusive:Number(d),reverse:Number(f)})},906624:(o,d,f)=>{r.Ab("DequantizeLinear",o,{axis:d,blockSize:f})},906714:(o,d,f,g,b)=>{r.Ab("GridSample",o,{align_corners:d,mode:Ce(f),padding_mode:Ce(g),format:b?"NHWC":"NCHW"})},906884:(o,d,f,g,b)=>{r.Ab("GridSample",o,{align_corners:d,mode:Ce(f),padding_mode:Ce(g),format:b?"NHWC":"NCHW"})},907054:(o,d)=>{r.Ab("ScatterND",o,{reduction:Ce(d)})},907139:(o,d,f,g,b,T,E,O,P)=>{r.Ab("Attention",o,{numHeads:d,isUnidirectional:f,maskFilterValue:g,scale:b,doRotary:T,qkvHiddenSizes:E?Array.from(N().subarray(Number(O)>>>0,Number(O)+E>>>0)):[],pastPresentShareBuffer:!!P})},907411:o=>{r.Ab("BiasAdd",o,void 0)},907466:o=>{r.Ab("BiasSplitGelu",o,void 0)},907527:o=>{r.Ab("FastGelu",o,void 0)},907583:(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be)=>{r.Ab("Conv",o,{format:ee?"NHWC":"NCHW",auto_pad:d,dilations:f?Array.from(N().subarray(Number(f)>>>0,Number(g)>>>0)):[],group:b,kernel_shape:T?Array.from(N().subarray(Number(T)>>>0,Number(E)>>>0)):[],pads:O?Array.from(N().subarray(Number(O)>>>0,Number(P)>>>0)):[],strides:W?Array.from(N().subarray(Number(W)>>>0,Number(H)>>>0)):[],w_is_const:()=>!!U()[Number(ue)>>>0],activation:Ce(fe),activation_params:Se?Array.from(Ze().subarray(Number(Se)>>>0,Number(Be)>>>0)):[]})},908167:o=>{r.Ab("Gelu",o,void 0)},908219:(o,d,f,g,b,T,E,O,P)=>{r.Ab("GroupQueryAttention",o,{numHeads:d,kvNumHeads:f,scale:g,softcap:b,doRotary:T,rotaryInterleaved:E,smoothSoftmax:O,localWindowSize:P})},908436:(o,d,f,g)=>{r.Ab("LayerNormalization",o,{axis:d,epsilon:f,simplified:!!g})},908547:(o,d,f,g)=>{r.Ab("LayerNormalization",o,{axis:d,epsilon:f,simplified:!!g})},908658:(o,d,f,g,b,T)=>{r.Ab("MatMulNBits",o,{k:d,n:f,accuracyLevel:g,bits:b,blockSize:T})},908785:(o,d,f,g,b,T)=>{r.Ab("MultiHeadAttention",o,{numHeads:d,isUnidirectional:f,maskFilterValue:g,scale:b,doRotary:T})},908944:(o,d)=>{r.Ab("QuickGelu",o,{alpha:d})},909008:(o,d,f,g,b)=>{r.Ab("RotaryEmbedding",o,{interleaved:!!d,numHeads:f,rotaryEmbeddingDim:g,scale:b})},909147:(o,d,f)=>{r.Ab("SkipLayerNormalization",o,{epsilon:d,simplified:!!f})},909249:(o,d,f)=>{r.Ab("SkipLayerNormalization",o,{epsilon:d,simplified:!!f})},909351:(o,d,f,g)=>{r.Ab("GatherBlockQuantized",o,{gatherAxis:d,quantizeAxis:f,blockSize:g})},909472:o=>{r.$b(o)},909506:(o,d)=>r.bc(Number(o),Number(d),r.Gb.ec,r.Gb.errors)};function hm(o,d,f){return Hn(async()=>{await r.Yb(Number(o),Number(d),Number(f))})}function mm(){return typeof wasmOffsetConverter<"u"}var B=await(async function(){function o(g,b){return B=g.exports,B=(function(){var T=B,E={};for(let[O,P]of Object.entries(T))E[O]=typeof P=="function"?(...W)=>{wr.push(O);try{return P(...W)}finally{F||(wr.pop(),Ye&&ft===1&&wr.length===0&&(ft=0,dt+=1,_r($s),typeof Fibers<"u"&&Fibers.sc()))}}:P;return E})(),B=(function(){var T=B,E=P=>W=>P(W)>>>0,O=P=>()=>P()>>>0;return(T=Object.assign({},T)).Ea=E(T.Ea),T.gb=O(T.gb),T.ib=E(T.ib),T.tb=E(T.tb),T.ub=O(T.ub),T.__cxa_get_exception_ptr=E(T.__cxa_get_exception_ptr),T})(),_n.push(B.jb),$=b,fn(),B}Gt++;var d=hn();if(r.instantiateWasm)return new Promise(g=>{r.instantiateWasm(d,(b,T)=>{g(o(b,T))})});if(u)return new Promise(g=>{j=b=>{var T=new WebAssembly.Instance(b,hn());g(o(T,b))}});Yr??=r.locateFile?r.locateFile?r.locateFile("ort-wasm-simd-threaded.jsep.wasm",v):v+"ort-wasm-simd-threaded.jsep.wasm":new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href;try{var f=await(async function(g){var b=Yr;if(!C&&typeof WebAssembly.instantiateStreaming=="function"&&!ye(b))try{var T=fetch(b,{credentials:"same-origin"});return await WebAssembly.instantiateStreaming(T,g)}catch(E){ae(`wasm streaming compile failed: ${E}`),ae("falling back to ArrayBuffer instantiation")}return(async function(E,O){try{var P=await(async function(W){if(!C)try{var H=await h(W);return new Uint8Array(H)}catch{}if(W==Yr&&C)W=new Uint8Array(C);else{if(!m)throw"both async and sync fetching of the wasm failed";W=m(W)}return W})(E);return await WebAssembly.instantiate(P,O)}catch(W){ae(`failed to asynchronously prepare wasm: ${W}`),lt(W)}})(b,g)})(d);return o(f.instance,f.module)}catch(g){return i(g),Promise.reject(g)}})(),ps=o=>(ps=B.Ea)(o),cs=()=>(cs=B.Fa)();r._OrtInit=(o,d)=>(r._OrtInit=B.Ga)(o,d),r._OrtGetLastError=(o,d)=>(r._OrtGetLastError=B.Ha)(o,d),r._OrtCreateSessionOptions=(o,d,f,g,b,T,E,O,P,W)=>(r._OrtCreateSessionOptions=B.Ia)(o,d,f,g,b,T,E,O,P,W),r._OrtAppendExecutionProvider=(o,d,f,g,b)=>(r._OrtAppendExecutionProvider=B.Ja)(o,d,f,g,b),r._OrtAddFreeDimensionOverride=(o,d,f)=>(r._OrtAddFreeDimensionOverride=B.Ka)(o,d,f),r._OrtAddSessionConfigEntry=(o,d,f)=>(r._OrtAddSessionConfigEntry=B.La)(o,d,f),r._OrtReleaseSessionOptions=o=>(r._OrtReleaseSessionOptions=B.Ma)(o),r._OrtCreateSession=(o,d,f)=>(r._OrtCreateSession=B.Na)(o,d,f),r._OrtReleaseSession=o=>(r._OrtReleaseSession=B.Oa)(o),r._OrtGetInputOutputCount=(o,d,f)=>(r._OrtGetInputOutputCount=B.Pa)(o,d,f),r._OrtGetInputOutputMetadata=(o,d,f,g)=>(r._OrtGetInputOutputMetadata=B.Qa)(o,d,f,g),r._OrtFree=o=>(r._OrtFree=B.Ra)(o),r._OrtCreateTensor=(o,d,f,g,b,T)=>(r._OrtCreateTensor=B.Sa)(o,d,f,g,b,T),r._OrtGetTensorData=(o,d,f,g,b)=>(r._OrtGetTensorData=B.Ta)(o,d,f,g,b),r._OrtReleaseTensor=o=>(r._OrtReleaseTensor=B.Ua)(o),r._OrtCreateRunOptions=(o,d,f,g)=>(r._OrtCreateRunOptions=B.Va)(o,d,f,g),r._OrtAddRunConfigEntry=(o,d,f)=>(r._OrtAddRunConfigEntry=B.Wa)(o,d,f),r._OrtReleaseRunOptions=o=>(r._OrtReleaseRunOptions=B.Xa)(o),r._OrtCreateBinding=o=>(r._OrtCreateBinding=B.Ya)(o),r._OrtBindInput=(o,d,f)=>(r._OrtBindInput=B.Za)(o,d,f),r._OrtBindOutput=(o,d,f,g)=>(r._OrtBindOutput=B._a)(o,d,f,g),r._OrtClearBoundOutputs=o=>(r._OrtClearBoundOutputs=B.$a)(o),r._OrtReleaseBinding=o=>(r._OrtReleaseBinding=B.ab)(o),r._OrtRunWithBinding=(o,d,f,g,b)=>(r._OrtRunWithBinding=B.bb)(o,d,f,g,b),r._OrtRun=(o,d,f,g,b,T,E,O)=>(r._OrtRun=B.cb)(o,d,f,g,b,T,E,O),r._OrtEndProfiling=o=>(r._OrtEndProfiling=B.db)(o),r._JsepOutput=(o,d,f)=>(r._JsepOutput=B.eb)(o,d,f),r._JsepGetNodeName=o=>(r._JsepGetNodeName=B.fb)(o);var gi=()=>(gi=B.gb)(),at=r._free=o=>(at=r._free=B.hb)(o),Cr=r._malloc=o=>(Cr=r._malloc=B.ib)(o),yi=(o,d,f,g,b,T)=>(yi=B.kb)(o,d,f,g,b,T),fs=()=>(fs=B.lb)(),hs=(o,d,f,g,b)=>(hs=B.mb)(o,d,f,g,b),ms=o=>(ms=B.nb)(o),_i=o=>(_i=B.ob)(o),gs=(o,d)=>(gs=B.pb)(o,d),ys=()=>(ys=B.qb)(),_s=(o,d)=>(_s=B.rb)(o,d),Sr=o=>(Sr=B.sb)(o),wi=o=>(wi=B.tb)(o),bi=()=>(bi=B.ub)(),ws=r.dynCall_ii=(o,d)=>(ws=r.dynCall_ii=B.vb)(o,d);r.dynCall_vii=(o,d,f)=>(r.dynCall_vii=B.dynCall_vii)(o,d,f),r.dynCall_iiiii=(o,d,f,g,b)=>(r.dynCall_iiiii=B.dynCall_iiiii)(o,d,f,g,b),r.dynCall_iii=(o,d,f)=>(r.dynCall_iii=B.dynCall_iii)(o,d,f),r.dynCall_iiiiii=(o,d,f,g,b,T)=>(r.dynCall_iiiiii=B.dynCall_iiiiii)(o,d,f,g,b,T),r.dynCall_iiiiiiii=(o,d,f,g,b,T,E,O)=>(r.dynCall_iiiiiiii=B.dynCall_iiiiiiii)(o,d,f,g,b,T,E,O),r.dynCall_iiiiiii=(o,d,f,g,b,T,E)=>(r.dynCall_iiiiiii=B.dynCall_iiiiiii)(o,d,f,g,b,T,E),r.dynCall_vi=(o,d)=>(r.dynCall_vi=B.dynCall_vi)(o,d),r.dynCall_iiii=(o,d,f,g)=>(r.dynCall_iiii=B.dynCall_iiii)(o,d,f,g),r.dynCall_i=o=>(r.dynCall_i=B.dynCall_i)(o),r.dynCall_viiiiiiii=(o,d,f,g,b,T,E,O,P)=>(r.dynCall_viiiiiiii=B.dynCall_viiiiiiii)(o,d,f,g,b,T,E,O,P),r.dynCall_viii=(o,d,f,g)=>(r.dynCall_viii=B.dynCall_viii)(o,d,f,g),r.dynCall_viijj=(o,d,f,g,b)=>(r.dynCall_viijj=B.dynCall_viijj)(o,d,f,g,b),r.dynCall_viiiiii=(o,d,f,g,b,T,E)=>(r.dynCall_viiiiii=B.dynCall_viiiiii)(o,d,f,g,b,T,E),r.dynCall_viiii=(o,d,f,g,b)=>(r.dynCall_viiii=B.dynCall_viiii)(o,d,f,g,b),r.dynCall_viiiii=(o,d,f,g,b,T)=>(r.dynCall_viiiii=B.dynCall_viiiii)(o,d,f,g,b,T),r.dynCall_vfiii=(o,d,f,g,b)=>(r.dynCall_vfiii=B.dynCall_vfiii)(o,d,f,g,b),r.dynCall_viiiiff=(o,d,f,g,b,T,E)=>(r.dynCall_viiiiff=B.dynCall_viiiiff)(o,d,f,g,b,T,E),r.dynCall_viiiiiff=(o,d,f,g,b,T,E,O)=>(r.dynCall_viiiiiff=B.dynCall_viiiiiff)(o,d,f,g,b,T,E,O),r.dynCall_ffff=(o,d,f,g)=>(r.dynCall_ffff=B.dynCall_ffff)(o,d,f,g),r.dynCall_viiff=(o,d,f,g,b)=>(r.dynCall_viiff=B.dynCall_viiff)(o,d,f,g,b),r.dynCall_fffffff=(o,d,f,g,b,T,E)=>(r.dynCall_fffffff=B.dynCall_fffffff)(o,d,f,g,b,T,E),r.dynCall_jjjjjjj=(o,d,f,g,b,T,E)=>(r.dynCall_jjjjjjj=B.dynCall_jjjjjjj)(o,d,f,g,b,T,E),r.dynCall_jjjjjj=(o,d,f,g,b,T)=>(r.dynCall_jjjjjj=B.dynCall_jjjjjj)(o,d,f,g,b,T),r.dynCall_iijjii=(o,d,f,g,b,T)=>(r.dynCall_iijjii=B.dynCall_iijjii)(o,d,f,g,b,T),r.dynCall_viiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe)=>(r.dynCall_viiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe),r.dynCall_viiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H)=>(r.dynCall_viiiiiiiiii=B.dynCall_viiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H),r.dynCall_viiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee)=>(r.dynCall_viiiiiiiiiii=B.dynCall_viiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee),r.dynCall_viiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue)=>(r.dynCall_viiiiiiiiiiii=B.dynCall_viiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue),r.dynCall_viiiiiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt)=>(r.dynCall_viiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt),r.dynCall_viiiiiiiii=(o,d,f,g,b,T,E,O,P,W)=>(r.dynCall_viiiiiiiii=B.dynCall_viiiiiiiii)(o,d,f,g,b,T,E,O,P,W),r.dynCall_viiiiiiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt,$i)=>(r.dynCall_viiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt,$i),r.dynCall_viiiiiii=(o,d,f,g,b,T,E,O)=>(r.dynCall_viiiiiii=B.dynCall_viiiiiii)(o,d,f,g,b,T,E,O),r.dynCall_viiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be)=>(r.dynCall_viiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be),r.dynCall_jiji=(o,d,f,g)=>(r.dynCall_jiji=B.dynCall_jiji)(o,d,f,g),r.dynCall_v=o=>(r.dynCall_v=B.dynCall_v)(o),r.dynCall_iidiiii=(o,d,f,g,b,T,E)=>(r.dynCall_iidiiii=B.dynCall_iidiiii)(o,d,f,g,b,T,E),r.dynCall_iiiiiiiii=(o,d,f,g,b,T,E,O,P)=>(r.dynCall_iiiiiiiii=B.dynCall_iiiiiiiii)(o,d,f,g,b,T,E,O,P),r.dynCall_iiij=(o,d,f,g)=>(r.dynCall_iiij=B.dynCall_iiij)(o,d,f,g),r.dynCall_iiiiiiiiii=(o,d,f,g,b,T,E,O,P,W)=>(r.dynCall_iiiiiiiiii=B.dynCall_iiiiiiiiii)(o,d,f,g,b,T,E,O,P,W),r.dynCall_iiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue)=>(r.dynCall_iiiiiiiiiiiii=B.dynCall_iiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue),r.dynCall_iiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H)=>(r.dynCall_iiiiiiiiiii=B.dynCall_iiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H),r.dynCall_ji=(o,d)=>(r.dynCall_ji=B.dynCall_ji)(o,d),r.dynCall_iijii=(o,d,f,g,b)=>(r.dynCall_iijii=B.dynCall_iijii)(o,d,f,g,b),r.dynCall_vij=(o,d,f)=>(r.dynCall_vij=B.dynCall_vij)(o,d,f),r.dynCall_viiijii=(o,d,f,g,b,T,E)=>(r.dynCall_viiijii=B.dynCall_viiijii)(o,d,f,g,b,T,E),r.dynCall_viijiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t)=>(r.dynCall_viijiiiiiiiiiiiiii=B.dynCall_viijiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t),r.dynCall_viiiji=(o,d,f,g,b,T)=>(r.dynCall_viiiji=B.dynCall_viiiji)(o,d,f,g,b,T),r.dynCall_fiii=(o,d,f,g)=>(r.dynCall_fiii=B.dynCall_fiii)(o,d,f,g),r.dynCall_viijii=(o,d,f,g,b,T)=>(r.dynCall_viijii=B.dynCall_viijii)(o,d,f,g,b,T),r.dynCall_viij=(o,d,f,g)=>(r.dynCall_viij=B.dynCall_viij)(o,d,f,g),r.dynCall_jiij=(o,d,f,g)=>(r.dynCall_jiij=B.dynCall_jiij)(o,d,f,g),r.dynCall_fi=(o,d)=>(r.dynCall_fi=B.dynCall_fi)(o,d),r.dynCall_fii=(o,d,f)=>(r.dynCall_fii=B.dynCall_fii)(o,d,f),r.dynCall_jii=(o,d,f)=>(r.dynCall_jii=B.dynCall_jii)(o,d,f),r.dynCall_dii=(o,d,f)=>(r.dynCall_dii=B.dynCall_dii)(o,d,f),r.dynCall_fiiii=(o,d,f,g,b)=>(r.dynCall_fiiii=B.dynCall_fiiii)(o,d,f,g,b),r.dynCall_fif=(o,d,f)=>(r.dynCall_fif=B.dynCall_fif)(o,d,f),r.dynCall_jfi=(o,d,f)=>(r.dynCall_jfi=B.dynCall_jfi)(o,d,f),r.dynCall_viiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se)=>(r.dynCall_viiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se),r.dynCall_viiiiiiiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt,$i,gm)=>(r.dynCall_viiiiiiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt,$t,Xt,$i,gm),r.dynCall_viiiiiiiiiiiiiiii=(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt)=>(r.dynCall_viiiiiiiiiiiiiiii=B.dynCall_viiiiiiiiiiiiiiii)(o,d,f,g,b,T,E,O,P,W,H,ee,ue,fe,Se,Be,nt),r.dynCall_iif=(o,d,f)=>(r.dynCall_iif=B.dynCall_iif)(o,d,f),r.dynCall_jiiii=(o,d,f,g,b)=>(r.dynCall_jiiii=B.dynCall_jiiii)(o,d,f,g,b),r.dynCall_jiii=(o,d,f,g)=>(r.dynCall_jiii=B.dynCall_jiii)(o,d,f,g),r.dynCall_viif=(o,d,f,g)=>(r.dynCall_viif=B.dynCall_viif)(o,d,f,g),r.dynCall_viiij=(o,d,f,g,b)=>(r.dynCall_viiij=B.dynCall_viiij)(o,d,f,g,b),r.dynCall_viiiijii=(o,d,f,g,b,T,E,O)=>(r.dynCall_viiiijii=B.dynCall_viiiijii)(o,d,f,g,b,T,E,O),r.dynCall_iiiiij=(o,d,f,g,b,T)=>(r.dynCall_iiiiij=B.dynCall_iiiiij)(o,d,f,g,b,T),r.dynCall_iiiiid=(o,d,f,g,b,T)=>(r.dynCall_iiiiid=B.dynCall_iiiiid)(o,d,f,g,b,T),r.dynCall_iiiiijj=(o,d,f,g,b,T,E)=>(r.dynCall_iiiiijj=B.dynCall_iiiiijj)(o,d,f,g,b,T,E),r.dynCall_iiiiiijj=(o,d,f,g,b,T,E,O)=>(r.dynCall_iiiiiijj=B.dynCall_iiiiiijj)(o,d,f,g,b,T,E,O);var bs=o=>(bs=B.wb)(o),$s=()=>($s=B.xb)(),vs=o=>(vs=B.yb)(o),xs=()=>(xs=B.zb)();return(function o(){if(0<Gt)Ht=o;else if(u)t(r),mr();else{for(;0<Jr.length;)Jr.shift()(r);0<Gt?Ht=o:(r.calledRun=!0,F||(mr(),t(r)))}})(),r.PTR_SIZE=4,a},Cd=ki,Ss=globalThis.self?.name?.startsWith("em-pthread"),Ss&&ki()}),Ii,wa,Ts,Me,Sd,kr,ks,Is,Ei,Es,zi,Td,Ai,kd,Pa=q(()=>{"use strict";Da(),Ii=typeof location>"u"?void 0:location.origin,wa=import.meta.url>"file:"&&import.meta.url<"file;",Ts=()=>{if(wa){let e=URL;return new URL(new e("ort.bundle.min.mjs",import.meta.url).href,Ii).href}return import.meta.url},Me=Ts(),Sd=()=>{if(Me&&!Me.startsWith("blob:"))return Me.substring(0,Me.lastIndexOf("/")+1)},kr=(e,t)=>{try{let i=t??Me;return(i?new URL(e,i):new URL(e)).origin===Ii}catch{return!1}},ks=(e,t)=>{let i=t??Me;try{return(i?new URL(e,i):new URL(e)).href}catch{return}},Is=(e,t)=>`${t??"./"}${e}`,Ei=async e=>{let t=await(await fetch(e,{credentials:"same-origin"})).blob();return URL.createObjectURL(t)},Es=async e=>(await import(e)).default,zi=(Nm(),fr($d)).default,Td=async()=>{if(!Me)throw new Error("Failed to load proxy worker: cannot determine the script source URL.");if(kr(Me))return[void 0,zi()];let e=await Ei(Me);return[e,zi(e)]},Ai=(Dm(),fr(xd)).default,kd=async(e,t,i,r)=>{let a=Ai&&!(e||t);if(a)if(Me)a=kr(Me);else if(r&&!i)a=!0;else throw new Error("cannot determine the script source URL.");if(a)return[void 0,Ai];{let n="ort-wasm-simd-threaded.jsep.mjs",s=e??ks(n,t),u=i&&s&&!kr(s,t),l=u?await Ei(s):s??Is(n,t);return[u?l:void 0,await Es(l)]}}}),Oi,Ir,Qt,Ri,zs,As,Os,Ua,_e,Mt=q(()=>{"use strict";Pa(),Ir=!1,Qt=!1,Ri=!1,zs=()=>{if(typeof SharedArrayBuffer>"u")return!1;try{return typeof MessageChannel<"u"&&new MessageChannel().port1.postMessage(new SharedArrayBuffer(1)),WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,5,4,1,3,1,1,10,11,1,9,0,65,0,254,16,2,0,26,11]))}catch{return!1}},As=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,4,1,96,0,0,3,2,1,0,10,30,1,28,0,65,0,253,15,253,12,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,253,186,1,26,11]))}catch{return!1}},Os=()=>{try{return WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0,1,5,1,96,0,1,123,3,2,1,0,10,19,1,17,0,65,1,253,15,65,2,253,15,65,3,253,15,253,147,2,11]))}catch{return!1}},Ua=async e=>{if(Ir)return Promise.resolve();if(Qt)throw new Error("multiple calls to 'initializeWebAssembly()' detected.");if(Ri)throw new Error("previous call to 'initializeWebAssembly()' failed.");Qt=!0;let t=e.initTimeout,i=e.numThreads;if(e.simd!==!1){if(e.simd==="relaxed"){if(!Os())throw new Error("Relaxed WebAssembly SIMD is not supported in the current environment.")}else if(!As())throw new Error("WebAssembly SIMD is not supported in the current environment.")}let r=zs();i>1&&!r&&(typeof self<"u"&&!self.crossOriginIsolated&&console.warn("env.wasm.numThreads is set to "+i+", but this will not work unless you enable crossOriginIsolated mode. See https://web.dev/cross-origin-isolation-guide/ for more info."),console.warn("WebAssembly multi-threading is not supported in the current environment. Falling back to single-threading."),e.numThreads=i=1);let a=e.wasmPaths,n=typeof a=="string"?a:void 0,s=a?.mjs,u=s?.href??s,l=a?.wasm,p=l?.href??l,c=e.wasmBinary,[h,m]=await kd(u,n,i>1,!!c||!!p),_=!1,y=[];if(t>0&&y.push(new Promise(v=>{setTimeout(()=>{_=!0,v()},t)})),y.push(new Promise((v,C)=>{let w={numThreads:i};if(c)w.wasmBinary=c;else if(p||n)w.locateFile=$=>p??n+$;else if(u&&u.indexOf("blob:")!==0)w.locateFile=$=>new URL($,u).href;else if(h){let $=Sd();$&&(w.locateFile=S=>$+S)}m(w).then($=>{Qt=!1,Ir=!0,Oi=$,v(),h&&URL.revokeObjectURL(h)},$=>{Qt=!1,Ri=!0,C($)})})),await Promise.race(y),_)throw new Error(`WebAssembly backend initializing failed due to timeout: ${t}ms`)},_e=()=>{if(Ir&&Oi)return Oi;throw new Error("WebAssembly is not initialized yet.")}}),He,Lr,me,qa=q(()=>{"use strict";Mt(),He=(e,t)=>{let i=_e(),r=i.lengthBytesUTF8(e)+1,a=i._malloc(r);return i.stringToUTF8(e,a,r),t.push(a),a},Lr=(e,t,i,r)=>{if(typeof e=="object"&&e!==null){if(i.has(e))throw new Error("Circular reference in options");i.add(e)}Object.entries(e).forEach(([a,n])=>{let s=t?t+a:a;if(typeof n=="object")Lr(n,s+".",i,r);else if(typeof n=="string"||typeof n=="number")r(s,n.toString());else if(typeof n=="boolean")r(s,n?"1":"0");else throw new Error(`Can't handle extra config type: ${typeof n}`)})},me=e=>{let t=_e(),i=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetLastError(a,a+r);let n=Number(t.getValue(a,r===4?"i32":"i64")),s=t.getValue(a+r,"*"),u=s?t.UTF8ToString(s):"";throw new Error(`${e} ERROR_CODE: ${n}, ERROR_MESSAGE: ${u}`)}finally{t.stackRestore(i)}}}),Id,Pm=q(()=>{"use strict";Mt(),qa(),Id=e=>{let t=_e(),i=0,r=[],a=e||{};try{if(e?.logSeverityLevel===void 0)a.logSeverityLevel=2;else if(typeof e.logSeverityLevel!="number"||!Number.isInteger(e.logSeverityLevel)||e.logSeverityLevel<0||e.logSeverityLevel>4)throw new Error(`log severity level is not valid: ${e.logSeverityLevel}`);if(e?.logVerbosityLevel===void 0)a.logVerbosityLevel=0;else if(typeof e.logVerbosityLevel!="number"||!Number.isInteger(e.logVerbosityLevel))throw new Error(`log verbosity level is not valid: ${e.logVerbosityLevel}`);e?.terminate===void 0&&(a.terminate=!1);let n=0;return e?.tag!==void 0&&(n=He(e.tag,r)),i=t._OrtCreateRunOptions(a.logSeverityLevel,a.logVerbosityLevel,!!a.terminate,n),i===0&&me("Can't create run options."),e?.extra!==void 0&&Lr(e.extra,"",new WeakSet,(s,u)=>{let l=He(s,r),p=He(u,r);t._OrtAddRunConfigEntry(i,l,p)!==0&&me(`Can't set a run config entry: ${s} - ${u}.`)}),[i,r]}catch(n){throw i!==0&&t._OrtReleaseRunOptions(i),r.forEach(s=>t._free(s)),n}}}),Rs,Bs,Ms,Jt,Ns,Ed,Um=q(()=>{"use strict";Mt(),qa(),Rs=e=>{switch(e){case"disabled":return 0;case"basic":return 1;case"extended":return 2;case"layout":return 3;case"all":return 99;default:throw new Error(`unsupported graph optimization level: ${e}`)}},Bs=e=>{switch(e){case"sequential":return 0;case"parallel":return 1;default:throw new Error(`unsupported execution mode: ${e}`)}},Ms=e=>{e.extra||(e.extra={}),e.extra.session||(e.extra.session={});let t=e.extra.session;t.use_ort_model_bytes_directly||(t.use_ort_model_bytes_directly="1"),e.executionProviders&&e.executionProviders.some(i=>(typeof i=="string"?i:i.name)==="webgpu")&&(e.enableMemPattern=!1)},Jt=(e,t,i,r)=>{let a=He(t,r),n=He(i,r);_e()._OrtAddSessionConfigEntry(e,a,n)!==0&&me(`Can't set a session config entry: ${t} - ${i}.`)},Ns=async(e,t,i)=>{for(let r of t){let a=typeof r=="string"?r:r.name,n=[];switch(a){case"webnn":if(a="WEBNN",typeof r!="string"){let c=r?.deviceType;c&&Jt(e,"deviceType",c,i)}break;case"webgpu":if(a="JS",typeof r!="string"){let c=r;if(c?.preferredLayout){if(c.preferredLayout!=="NCHW"&&c.preferredLayout!=="NHWC")throw new Error(`preferredLayout must be either 'NCHW' or 'NHWC': ${c.preferredLayout}`);Jt(e,"preferredLayout",c.preferredLayout,i)}}break;case"wasm":case"cpu":continue;default:throw new Error(`not supported execution provider: ${a}`)}let s=He(a,i),u=n.length,l=0,p=0;if(u>0){l=_e()._malloc(u*_e().PTR_SIZE),i.push(l),p=_e()._malloc(u*_e().PTR_SIZE),i.push(p);for(let c=0;c<u;c++)_e().setValue(l+c*_e().PTR_SIZE,n[c][0],"*"),_e().setValue(p+c*_e().PTR_SIZE,n[c][1],"*")}await _e()._OrtAppendExecutionProvider(e,s,l,p,u)!==0&&me(`Can't append execution provider: ${a}.`)}},Ed=async e=>{let t=_e(),i=0,r=[],a=e||{};Ms(a);try{let n=Rs(a.graphOptimizationLevel??"all"),s=Bs(a.executionMode??"sequential"),u=typeof a.logId=="string"?He(a.logId,r):0,l=a.logSeverityLevel??2;if(!Number.isInteger(l)||l<0||l>4)throw new Error(`log severity level is not valid: ${l}`);let p=a.logVerbosityLevel??0;if(!Number.isInteger(p)||p<0||p>4)throw new Error(`log verbosity level is not valid: ${p}`);let c=typeof a.optimizedModelFilePath=="string"?He(a.optimizedModelFilePath,r):0;if(i=t._OrtCreateSessionOptions(n,!!a.enableCpuMemArena,!!a.enableMemPattern,s,!!a.enableProfiling,0,u,l,p,c),i===0&&me("Can't create session options."),a.executionProviders&&await Ns(i,a.executionProviders,r),a.enableGraphCapture!==void 0){if(typeof a.enableGraphCapture!="boolean")throw new Error(`enableGraphCapture must be a boolean value: ${a.enableGraphCapture}`);Jt(i,"enableGraphCapture",a.enableGraphCapture.toString(),r)}if(a.freeDimensionOverrides)for(let[h,m]of Object.entries(a.freeDimensionOverrides)){if(typeof h!="string")throw new Error(`free dimension override name must be a string: ${h}`);if(typeof m!="number"||!Number.isInteger(m)||m<0)throw new Error(`free dimension override value must be a non-negative integer: ${m}`);let _=He(h,r);t._OrtAddFreeDimensionOverride(i,_,m)!==0&&me(`Can't set a free dimension override: ${h} - ${m}.`)}return a.extra!==void 0&&Lr(a.extra,"",new WeakSet,(h,m)=>{Jt(i,h,m,r)}),[i,r]}catch(n){throw i!==0&&t._OrtReleaseSessionOptions(i)!==0&&me("Can't release session options."),r.forEach(s=>t._free(s)),n}}}),It,ot,Et,Xr,Vr,Wa,La,ba,te=q(()=>{"use strict";It=e=>{switch(e){case"int8":return 3;case"uint8":return 2;case"bool":return 9;case"int16":return 5;case"uint16":return 4;case"int32":return 6;case"uint32":return 12;case"float16":return 10;case"float32":return 1;case"float64":return 11;case"string":return 8;case"int64":return 7;case"uint64":return 13;case"int4":return 22;case"uint4":return 21;default:throw new Error(`unsupported data type: ${e}`)}},ot=e=>{switch(e){case 3:return"int8";case 2:return"uint8";case 9:return"bool";case 5:return"int16";case 4:return"uint16";case 6:return"int32";case 12:return"uint32";case 10:return"float16";case 1:return"float32";case 11:return"float64";case 8:return"string";case 7:return"int64";case 13:return"uint64";case 22:return"int4";case 21:return"uint4";default:throw new Error(`unsupported data type: ${e}`)}},Et=(e,t)=>{let i=[-1,4,1,1,2,2,4,8,-1,1,2,8,4,8,-1,-1,-1,-1,-1,-1,-1,.5,.5][e],r=typeof t=="number"?t:t.reduce((a,n)=>a*n,1);return i>0?Math.ceil(r*i):void 0},Xr=e=>{switch(e){case"float16":return typeof Float16Array<"u"&&Float16Array.from?Float16Array:Uint16Array;case"float32":return Float32Array;case"uint8":return Uint8Array;case"int8":return Int8Array;case"uint16":return Uint16Array;case"int16":return Int16Array;case"int32":return Int32Array;case"bool":return Uint8Array;case"float64":return Float64Array;case"uint32":return Uint32Array;case"int64":return BigInt64Array;case"uint64":return BigUint64Array;default:throw new Error(`unsupported type: ${e}`)}},Vr=e=>{switch(e){case"verbose":return 0;case"info":return 1;case"warning":return 2;case"error":return 3;case"fatal":return 4;default:throw new Error(`unsupported logging level: ${e}`)}},Wa=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",La=e=>e==="float32"||e==="float16"||e==="int32"||e==="int64"||e==="uint32"||e==="uint64"||e==="int8"||e==="uint8"||e==="bool"||e==="uint4"||e==="int4",ba=e=>{switch(e){case"none":return 0;case"cpu":return 1;case"cpu-pinned":return 2;case"texture":return 3;case"gpu-buffer":return 4;case"ml-tensor":return 5;default:throw new Error(`unsupported data location: ${e}`)}}}),Va,zd=q(()=>{"use strict";Da(),Va=async e=>{if(typeof e=="string"){let t=await fetch(e);if(!t.ok)throw new Error(`failed to load external data file: ${e}`);let i=t.headers.get("Content-Length"),r=i?parseInt(i,10):0;if(r<1073741824)return new Uint8Array(await t.arrayBuffer());{if(!t.body)throw new Error(`failed to load external data file: ${e}, no response body.`);let a=t.body.getReader(),n;try{n=new ArrayBuffer(r)}catch(u){if(u instanceof RangeError){let l=Math.ceil(r/65536);n=new WebAssembly.Memory({initial:l,maximum:l}).buffer}else throw u}let s=0;for(;;){let{done:u,value:l}=await a.read();if(u)break;let p=l.byteLength;new Uint8Array(n,s,p).set(l),s+=p}return new Uint8Array(n,0,r)}}else return e instanceof Blob?new Uint8Array(await e.arrayBuffer()):e instanceof Uint8Array?e:new Uint8Array(e)}}),Ds,Ps,Us,qs,ja,Ws,de,ut=q(()=>{"use strict";te(),Ds=["V","I","W","E","F"],Ps=(e,t)=>{console.log(`[${Ds[e]},${new Date().toISOString()}]${t}`)},ja=(e,t)=>{Us=e,qs=t},Ws=(e,t)=>{let i=Vr(e),r=Vr(Us);i>=r&&Ps(i,typeof t=="function"?t():t)},de=(...e)=>{qs&&Ws(...e)}}),Ls,Vt,A,jr,Ad,Od,Rd,ne=q(()=>{"use strict";Ls=class{static calcMatMulShape(e,t){return e[1]!==t[0]?void 0:[e[0],t[1]]}},Vt=class{static calcShape(e,t,i=!1){let r=e.length,a=t.length;if(r===0)return t;if(a===0)return e;let n=Math.max(e.length,t.length),s=new Array(n);if(i){if(r<2||a<2)return;let u=Ls.calcMatMulShape([e[r-2],e[r-1]],[t[a-2],t[a-1]]);if(u===void 0)return;[s[n-2],s[n-1]]=u}for(let u=i?3:1;u<=n;u++){let l=r-u<0?1:e[r-u],p=a-u<0?1:t[a-u];if(l!==p&&l>1&&p>1)return;let c=Math.max(l,p);if(l&&p)s[n-u]=Math.max(l,p);else{if(c>1)return;s[n-u]=0}}return s}static isValidBroadcast(e,t){let i=e.length,r=t.length;if(i>r)return!1;for(let a=1;a<=i;a++)if(e[i-a]!==1&&e[i-a]!==t[r-a])return!1;return!0}},A=class Ur{static size(t){return Ur.getSizeFromDimensionRange(t,0,t.length)}static convertShape(t,i=4){let r=t.length;if(r===0)return[];let a=new Array(r),n=r-1;for(;n>=0;){if(t[n]%i===0){a[n]=t[n]/i;break}if(i%t[n]!==0)throw new Error("cannot convert shape");a[n]=1,i/=t[n],n--}for(n--;n>=0;n--)a[n]=t[n];return a}static sizeFromDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeFromDimension as Tensor has ${t.length} dimensions.`);return Ur.getSizeFromDimensionRange(t,i,t.length)}static sizeToDimension(t,i){if(i<0||i>t.length)throw new Error(`invalid dimension of ${i} for sizeToDimension as Tensor has ${t.length} dimensions.`);return Ur.getSizeFromDimensionRange(t,0,i)}static getSizeFromDimensionRange(t,i,r){let a=1;for(let n=i;n<r;n++){if(t[n]<0)throw new Error("cannot get valid size from specified dimension range. Most likely the range contains negative values in them.");a*=Number(t[n])}return a}static computeStrides(t){let i=t.length;if(i===0)return[];if(i===1)return[1];let r=new Array(i);r[i-1]=1,r[i-2]=t[i-1];for(let a=i-3;a>=0;--a)r[a]=r[a+1]*t[a+1];return r}static normalizeAxis(t,i){if(t<-i&&t>=i)throw new Error("unsupported axis for this operation.");return t<0?t+i:t}static normalizeAxes(t,i){return t.map(r=>this.normalizeAxis(r,i??t.length))}static sortBasedOnPerm(t,i){return i?i.map(r=>t[r]):t.slice().reverse()}static padShape(t,i){let r=t.length;return t.map((a,n)=>a+i[n]+i[n+r])}static areEqual(t,i){return t.length!==i.length?!1:t.every((r,a)=>r===i[a])}},jr=class lr{static adjustPoolAttributes(t,i,r,a,n,s){if(!t&&r.length!==i.length-2)throw new Error("length of specified kernel shapes should be 2 less than length of input dimensions");if(t)for(let u=0;u<i.length-2;u++)u>=r.length?r.push(i[u+2]):r[u]=i[u+2];for(let u=0;u<r.length;u++)if(u<a.length){if(a[u]<0)throw new Error("strides should be greater than or equal to 1")}else a.push(1);for(let u=0;u<r.length;u++)if(u<n.length){if(n[u]<0)throw new Error("dilations should be greater than or equal to 1")}else n.push(1);for(let u=0;u<r.length*2;u++)if(u<s.length){if(s[u]<0)throw new Error("pad should be greater than or equal to 1")}else s.push(0);for(let u=0;u<r.length;u++){if(r[u]<=0)throw new Error("kernel shapes need to be greater than 0");if(s[u]>=r[u]||s[u+r.length]>=r[u])throw new Error("pads should be smaller than kernel")}}static adjustPadsBasedOnAutoPad(t,i,r,a,n,s,u){if(u){if(n.length!==2*(t.length-2))throw new Error("length of pads should be twice the length of data dimensions");if(i.length!==t.length-2)throw new Error("length of strides should be the length of data dimensions");if(a.length!==t.length-2)throw new Error("length of kernel shapes should be the length of data dimensions");for(let l=0;l<t.length-2;l++)lr.adjustPadAndReturnShape(t[l+(s?1:2)],i[l],r[l],a[l],n,l,l+t.length-2,u)}}static computePoolOutputShape(t,i,r,a,n,s,u){if(i.length<=0)throw new Error("input shape must be of size greater than 0");let l=[i[0],i[1]];return lr.computeShapeHelper(t,i,l,r,a,n,s,u),l}static computeConvOutputShape(t,i,r,a,n,s,u){if(t.length<=0||i.length<=0)throw new Error("invalid input tensor dims or invalid filter tensor dims");let l=[t[0],i[0]];return lr.computeShapeHelper(!1,t,l,r,a,n,s,u),l}static computeShapeHelper(t,i,r,a,n,s,u,l){if(t)for(let p=0;p<i.length-2;p++)r.push(1);else for(let p=0;p<i.length-2;p++)r.push(lr.adjustPadAndReturnShape(i[p+2],a[p],n[p],s[p],u,p,p+i.length-2,l))}static adjustPadAndReturnShape(t,i,r,a,n,s,u,l){let p=r*(a-1)+1;if(l&&l!=="NOTSET")switch(l){case"VALID":return n[s]=0,n[u]=0,Math.floor((t-p)/i+1);case"SAME_LOWER":case"SAME_UPPER":if(r!==1)throw new Error("Dilation not supported for SAME_UPPER or SAME_LOWER");{let c=((t+i-1)/i-1)*i+a-t;return n[s]=Math.floor(l==="SAME_LOWER"?(c+1)/2:c/2),n[u]=c-n[s],Math.floor((t+c-a)/i+1)}default:throw new Error("Unsupported AutoPad type")}else return Math.floor((t+n[s]+n[u]-p)/i+1)}},Ad=class{static getShapeOfGemmResult(e,t,i,r,a){if(e.length!==2||i.length!==2)throw new Error("shape need to be of size 2");let n,s,u;t?(n=e[1],s=e[0]):(n=e[0],s=e[1]);let l=-1;if(r?(u=i[0],l=1):(u=i[1],l=0),i[l]!==s)throw new Error("dimension mismatch");if(n<=0||u<=0||s<=0)throw new Error("invalid shape specified");if(a&&!Vt.isValidBroadcast(a,[n,u]))throw new Error("gemm: invalid bias shape for broadcast");return[n,u,s]}},Od=-34028234663852886e22,Rd=34028234663852886e22}),Fa,Bd=q(()=>{"use strict";te(),Fa=(e,t)=>new(Xr(t))(e)}),Bi,$a,Mi,Vs,Ni,js,Di,Pi,Ui,Fs,Md,qm=q(()=>{"use strict";te(),ut(),Bi=new Map([["float32",32],["float16",16],["int32",32],["uint32",32],["int64",64],["uint64",64],["int8",8],["uint8",8],["int4",4],["uint4",4]]),$a=(e,t)=>{if(t==="int32")return e;let i=Bi.get(t);if(!i)throw new Error(`WebNN backend does not support data type: ${t}`);let r=i/8;if(e.byteLength%r!==0)throw new Error(`Invalid Uint8Array length - must be a multiple of ${r}.`);let a=e.byteLength/r,n=new(Xr(t))(e.buffer,e.byteOffset,a);switch(t){case"int64":case"uint64":{let s=new Int32Array(a);for(let u=0;u<a;u++){let l=n[u];if(l>2147483647n||l<-2147483648n)throw new Error("Can not convert int64 data to int32 - value out of range.");s[u]=Number(l)}return new Uint8Array(s.buffer)}case"int8":case"uint8":case"uint32":{if(t==="uint32"&&n.some(u=>u>2147483647))throw new Error("Can not convert uint32 data to int32 - value out of range.");let s=Int32Array.from(n,Number);return new Uint8Array(s.buffer)}default:throw new Error(`Unsupported data conversion from ${t} to 'int32'`)}},Mi=(e,t)=>{if(t==="int32")return e;if(e.byteLength%4!==0)throw new Error("Invalid Uint8Array length - must be a multiple of 4 (int32).");let i=e.byteLength/4,r=new Int32Array(e.buffer,e.byteOffset,i);switch(t){case"int64":{let a=BigInt64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"uint64":{if(r.some(n=>n<0))throw new Error("Can not convert int32 data to uin64 - negative value found.");let a=BigUint64Array.from(r,BigInt);return new Uint8Array(a.buffer)}case"int8":{if(r.some(n=>n<-128||n>127))throw new Error("Can not convert int32 data to int8 - value out of range.");let a=Int8Array.from(r,Number);return new Uint8Array(a.buffer)}case"uint8":{if(r.some(a=>a<0||a>255))throw new Error("Can not convert int32 data to uint8 - value out of range.");return Uint8Array.from(r,Number)}case"uint32":{if(r.some(n=>n<0))throw new Error("Can not convert int32 data to uint32 - negative value found.");let a=Uint32Array.from(r,Number);return new Uint8Array(a.buffer)}default:throw new Error(`Unsupported data conversion from 'int32' to ${t}`)}},Vs=1,Ni=()=>Vs++,js=new Map([["int8","int32"],["uint8","int32"],["uint32","int32"],["int64","int32"]]),Di=(e,t)=>{let i=Bi.get(e);if(!i)throw new Error(`WebNN backend does not support data type: ${e}`);return t.length>0?Math.ceil(t.reduce((r,a)=>r*a)*i/8):0},Pi=class{constructor(e){this.isDataConverted=!1;let{sessionId:t,context:i,tensor:r,dataType:a,shape:n,fallbackDataType:s}=e;this.sessionId=t,this.mlContext=i,this.mlTensor=r,this.dataType=a,this.tensorShape=n,this.fallbackDataType=s}get tensor(){return this.mlTensor}get type(){return this.dataType}get fallbackType(){return this.fallbackDataType}get shape(){return this.tensorShape}get byteLength(){return Di(this.dataType,this.tensorShape)}destroy(){de("verbose",()=>"[WebNN] TensorWrapper.destroy"),this.mlTensor.destroy()}write(e){this.mlContext.writeTensor(this.mlTensor,e)}async read(e){if(this.fallbackDataType){let t=await this.mlContext.readTensor(this.mlTensor),i=Mi(new Uint8Array(t),this.dataType);if(e){(e instanceof ArrayBuffer?new Uint8Array(e):new Uint8Array(e.buffer,e.byteOffset,e.byteLength)).set(i);return}else return i.buffer}else return e?this.mlContext.readTensor(this.mlTensor,e):this.mlContext.readTensor(this.mlTensor)}canReuseTensor(e,t,i){return this.mlContext===e&&this.dataType===t&&this.tensorShape.length===i.length&&this.tensorShape.every((r,a)=>r===i[a])}setIsDataConverted(e){this.isDataConverted=e}},Ui=class{constructor(e,t){this.tensorManager=e,this.wrapper=t}get tensorWrapper(){return this.wrapper}releaseTensor(){this.tensorWrapper&&(this.tensorManager.releaseTensor(this.tensorWrapper),this.wrapper=void 0)}async ensureTensor(e,t,i,r){let a=this.tensorManager.getMLContext(e),n;if(!a.opSupportLimits().input.dataTypes.includes(t)){if(n=js.get(t),!n||!a.opSupportLimits().input.dataTypes.includes(n))throw new Error(`WebNN backend does not support data type: ${t}`);de("verbose",()=>`[WebNN] TensorIdTracker.ensureTensor: fallback dataType from ${t} to ${n}`)}if(this.wrapper){if(this.wrapper.canReuseTensor(a,t,i))return this.wrapper.tensor;if(r){if(this.wrapper.byteLength!==Di(t,i))throw new Error("Unable to copy data to tensor with different size.");this.activeUpload=new Uint8Array(await this.wrapper.read())}this.tensorManager.releaseTensor(this.wrapper)}let s=typeof MLTensorUsage>"u"?void 0:MLTensorUsage.READ|MLTensorUsage.WRITE;return this.wrapper=await this.tensorManager.getCachedTensor(e,t,i,s,!0,!0,n),r&&this.activeUpload&&(this.wrapper.write(this.activeUpload),this.activeUpload=void 0),this.wrapper.tensor}upload(e){let t=e;if(this.wrapper){if(this.wrapper.fallbackType)if(this.wrapper.fallbackType==="int32")t=$a(e,this.wrapper.type),this.wrapper.setIsDataConverted(!0);else throw new Error(`Unsupported fallback data type: ${this.wrapper.fallbackType}`);if(e.byteLength===this.wrapper.byteLength){this.wrapper.write(t);return}else de("verbose",()=>"Data size does not match tensor size. Releasing tensor."),this.releaseTensor()}this.activeUpload?this.activeUpload.set(t):this.activeUpload=new Uint8Array(t)}async download(e){if(this.activeUpload){let t=this.wrapper?.isDataConverted?Mi(this.activeUpload,this.wrapper?.type):this.activeUpload;if(e){e instanceof ArrayBuffer?new Uint8Array(e).set(t):new Uint8Array(e.buffer,e.byteOffset,e.byteLength).set(t);return}else return t.buffer}if(!this.wrapper)throw new Error("Tensor has not been created.");return e?this.wrapper.read(e):this.wrapper.read()}},Fs=class{constructor(e){this.backend=e,this.tensorTrackersById=new Map,this.freeTensors=[],this.externalTensors=new Set}getMLContext(e){let t=this.backend.getMLContext(e);if(!t)throw new Error("MLContext not found for session.");return t}reserveTensorId(){let e=Ni();return this.tensorTrackersById.set(e,new Ui(this)),e}releaseTensorId(e){let t=this.tensorTrackersById.get(e);t&&(this.tensorTrackersById.delete(e),t.tensorWrapper&&this.releaseTensor(t.tensorWrapper))}async ensureTensor(e,t,i,r,a){de("verbose",()=>`[WebNN] TensorManager.ensureTensor {tensorId: ${t}, dataType: ${i}, shape: ${r}, copyOld: ${a}}`);let n=this.tensorTrackersById.get(t);if(!n)throw new Error("Tensor not found.");return n.ensureTensor(e,i,r,a)}upload(e,t){let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");i.upload(t)}async download(e,t){de("verbose",()=>`[WebNN] TensorManager.download {tensorId: ${e}, dstBuffer: ${t?.byteLength}}`);let i=this.tensorTrackersById.get(e);if(!i)throw new Error("Tensor not found.");return i.download(t)}releaseTensorsForSession(e){for(let t of this.freeTensors)t.sessionId===e&&t.destroy();this.freeTensors=this.freeTensors.filter(t=>t.sessionId!==e)}registerTensor(e,t,i,r){let a=this.getMLContext(e),n=Ni(),s=new Pi({sessionId:e,context:a,tensor:t,dataType:i,shape:r});return this.tensorTrackersById.set(n,new Ui(this,s)),this.externalTensors.add(s),n}async getCachedTensor(e,t,i,r,a,n,s){let u=this.getMLContext(e);for(let[p,c]of this.freeTensors.entries())if(c.canReuseTensor(u,t,i)){de("verbose",()=>`[WebNN] Reusing tensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${i}`);let h=this.freeTensors.splice(p,1)[0];return h.sessionId=e,h}de("verbose",()=>`[WebNN] MLContext.createTensor {dataType: ${t}, ${s?`fallbackDataType: ${s},`:""} shape: ${i}}`);let l=await u.createTensor({dataType:s??t,shape:i,dimensions:i,usage:r,writable:a,readable:n});return new Pi({sessionId:e,context:u,tensor:l,dataType:t,shape:i,fallbackDataType:s})}releaseTensor(e){this.externalTensors.has(e)&&this.externalTensors.delete(e),this.freeTensors.push(e)}},Md=(...e)=>new Fs(...e)}),er,Gs,Nd,Wm=q(()=>{"use strict";te(),Mt(),Bd(),qm(),ut(),er=new Map([[1,"float32"],[10,"float16"],[6,"int32"],[12,"uint32"],[7,"int64"],[13,"uint64"],[22,"int4"],[21,"uint4"],[3,"int8"],[2,"uint8"],[9,"uint8"]]),Gs=(e,t)=>{if(e===t)return!0;if(e===void 0||t===void 0)return!1;let i=Object.keys(e).sort(),r=Object.keys(t).sort();return i.length===r.length&&i.every((a,n)=>a===r[n]&&e[a]===t[a])},Nd=class{constructor(e){this.tensorManager=Md(this),this.mlContextBySessionId=new Map,this.sessionIdsByMLContext=new Map,this.mlContextCache=[],this.sessionGraphInputs=new Map,this.sessionGraphOutputs=new Map,this.temporaryGraphInputs=[],this.temporaryGraphOutputs=[],this.temporarySessionTensorIds=new Map,ja(e.logLevel,!!e.debug)}get currentSessionId(){if(this.activeSessionId===void 0)throw new Error("No active session");return this.activeSessionId}onRunStart(e){de("verbose",()=>`[WebNN] onRunStart {sessionId: ${e}}`),this.activeSessionId=e}onRunEnd(e){de("verbose",()=>`[WebNN] onRunEnd {sessionId: ${e}}`);let t=this.temporarySessionTensorIds.get(e);if(t){for(let i of t)de("verbose",()=>`[WebNN] releasing temporary tensor {tensorId: ${i}}`),this.tensorManager.releaseTensorId(i);this.temporarySessionTensorIds.delete(e),this.activeSessionId=void 0}}async createMLContext(e){if(e instanceof GPUDevice){let i=this.mlContextCache.findIndex(r=>r.gpuDevice===e);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext(e);return this.mlContextCache.push({gpuDevice:e,mlContext:r}),r}}else if(e===void 0){let i=this.mlContextCache.findIndex(r=>r.options===void 0&&r.gpuDevice===void 0);if(i!==-1)return this.mlContextCache[i].mlContext;{let r=await navigator.ml.createContext();return this.mlContextCache.push({mlContext:r}),r}}let t=this.mlContextCache.findIndex(i=>Gs(i.options,e));if(t!==-1)return this.mlContextCache[t].mlContext;{let i=await navigator.ml.createContext(e);return this.mlContextCache.push({options:e,mlContext:i}),i}}registerMLContext(e,t){this.mlContextBySessionId.set(e,t);let i=this.sessionIdsByMLContext.get(t);i||(i=new Set,this.sessionIdsByMLContext.set(t,i)),i.add(e),this.temporaryGraphInputs.length>0&&(this.sessionGraphInputs.set(e,this.temporaryGraphInputs),this.temporaryGraphInputs=[]),this.temporaryGraphOutputs.length>0&&(this.sessionGraphOutputs.set(e,this.temporaryGraphOutputs),this.temporaryGraphOutputs=[])}onReleaseSession(e){this.sessionGraphInputs.delete(e),this.sessionGraphOutputs.delete(e);let t=this.mlContextBySessionId.get(e);if(!t)return;this.tensorManager.releaseTensorsForSession(e),this.mlContextBySessionId.delete(e);let i=this.sessionIdsByMLContext.get(t);if(i.delete(e),i.size===0){this.sessionIdsByMLContext.delete(t);let r=this.mlContextCache.findIndex(a=>a.mlContext===t);r!==-1&&this.mlContextCache.splice(r,1)}}getMLContext(e){return this.mlContextBySessionId.get(e)}reserveTensorId(){return this.tensorManager.reserveTensorId()}releaseTensorId(e){de("verbose",()=>`[WebNN] releaseTensorId {tensorId: ${e}}`),this.tensorManager.releaseTensorId(e)}async ensureTensor(e,t,i,r,a){let n=er.get(i);if(!n)throw new Error(`Unsupported ONNX data type: ${i}`);return this.tensorManager.ensureTensor(e??this.currentSessionId,t,n,r,a)}async createTemporaryTensor(e,t,i){de("verbose",()=>`[WebNN] createTemporaryTensor {onnxDataType: ${t}, shape: ${i}}`);let r=er.get(t);if(!r)throw new Error(`Unsupported ONNX data type: ${t}`);let a=this.tensorManager.reserveTensorId();await this.tensorManager.ensureTensor(e,a,r,i,!1);let n=this.temporarySessionTensorIds.get(e);return n?n.push(a):this.temporarySessionTensorIds.set(e,[a]),a}uploadTensor(e,t){if(!_e().shouldTransferToMLTensor)throw new Error("Trying to upload to a MLTensor while shouldTransferToMLTensor is false");de("verbose",()=>`[WebNN] uploadTensor {tensorId: ${e}, data: ${t.byteLength}}`),this.tensorManager.upload(e,t)}async downloadTensor(e,t){return this.tensorManager.download(e,t)}createMLTensorDownloader(e,t){return async()=>{let i=await this.tensorManager.download(e);return Fa(i,t)}}registerMLTensor(e,t,i,r){let a=er.get(i);if(!a)throw new Error(`Unsupported ONNX data type: ${i}`);let n=this.tensorManager.registerTensor(e,t,a,r);return de("verbose",()=>`[WebNN] registerMLTensor {tensor: ${t}, dataType: ${a}, dimensions: ${r}} -> {tensorId: ${n}}`),n}registerMLConstant(e,t,i,r,a,n,s=!1){if(!n)throw new Error("External mounted files are not available.");let u=e;e.startsWith("./")&&(u=e.substring(2));let l=n.get(u);if(!l)throw new Error(`File with name ${u} not found in preloaded files.`);if(t+i>l.byteLength)throw new Error("Out of bounds: data offset and length exceed the external file data size.");let p=l.slice(t,t+i).buffer,c;switch(a.dataType){case"float32":c=new Float32Array(p);break;case"float16":c=typeof Float16Array<"u"&&Float16Array.from?new Float16Array(p):new Uint16Array(p);break;case"int32":c=new Int32Array(p);break;case"uint32":c=new Uint32Array(p);break;case"int64":if(s){let h=$a(new Uint8Array(p),"int64");c=new Int32Array(h.buffer),a.dataType="int32"}else c=new BigInt64Array(p);break;case"uint64":c=new BigUint64Array(p);break;case"int8":c=new Int8Array(p);break;case"int4":case"uint4":case"uint8":c=new Uint8Array(p);break;default:throw new Error(`Unsupported data type: ${a.dataType} in creating WebNN Constant from external data.`)}return de("verbose",()=>`[WebNN] registerMLConstant {dataType: ${a.dataType}, shape: ${a.shape}}} ${s?"(Note: it was int64 data type and registered to int32 as workaround)":""}`),r.constant(a,c)}registerGraphInput(e){this.temporaryGraphInputs.push(e)}registerGraphOutput(e){this.temporaryGraphOutputs.push(e)}isGraphInput(e,t){let i=this.sessionGraphInputs.get(e);return i?i.includes(t):!1}isGraphOutput(e,t){let i=this.sessionGraphOutputs.get(e);return i?i.includes(t):!1}isGraphInputOutputTypeSupported(e,t,i=!0){let r=this.mlContextBySessionId.get(e),a=er.get(It(t));return typeof a>"u"?!1:i?!!r?.opSupportLimits().input.dataTypes.includes(a):!!r?.opSupportLimits().output.dataTypes.includes(a)}flush(){}}}),Ga=q(()=>{"use strict"}),qi,Er,zr,Hs,Ks,Wi,va,Zs,Dd,Lm=q(()=>{"use strict";ut(),Ga(),qi=new Map([[64,250],[128,200],[256,200],[512,200],[2048,230],[4096,200],[8192,50],[16384,50],[32768,50],[65536,50],[131072,50],[262144,50],[524288,50],[1048576,50],[2097152,30],[4194304,20],[8388608,10],[12582912,10],[16777216,10],[26214400,15],[33554432,22],[44236800,2],[58982400,6],[67108864,6],[134217728,6],[167772160,6]]),Er=[],zr=e=>Math.ceil(Number(e)/16)*16,Hs=e=>{for(let t=0;t<Er.length;t++){let i=Er[t];if(e<=i)return i}return Math.ceil(e/16)*16},Ks=1,Wi=()=>Ks++,va=async(e,t,i,r)=>{let a=zr(i),n=e.device.createBuffer({size:a,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});try{let s=e.getCommandEncoder();e.endComputePass(),s.copyBufferToBuffer(t,0,n,0,a),e.flush(),await n.mapAsync(GPUMapMode.READ);let u=n.getMappedRange();if(r){let l=r();return l.set(new Uint8Array(u,0,i)),l}else return new Uint8Array(u.slice(0,i))}finally{n.destroy()}},Zs=class{constructor(e){this.backend=e,this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.buffersPending=[],this.capturedPendingBuffers=new Map;for(let[t]of qi)Er.push(t),this.freeBuffers.set(t,[]),this.freeUniformBuffers.set(t,[]);this.sessionCount=0}upload(e,t){let i=t.buffer,r=t.byteOffset,a=t.byteLength,n=zr(a),s=this.storageCache.get(e);if(!s)throw new Error("gpu data for uploading does not exist");if(Number(s.originalSize)!==a)throw new Error(`inconsistent data size. gpu data size=${s.originalSize}, data size=${a}`);let u=this.backend.device.createBuffer({mappedAtCreation:!0,size:n,usage:GPUBufferUsage.MAP_WRITE|GPUBufferUsage.COPY_SRC}),l=u.getMappedRange();new Uint8Array(l).set(new Uint8Array(i,r,a)),u.unmap();let p=this.backend.device.createCommandEncoder();p.copyBufferToBuffer(u,0,s.gpuData.buffer,0,n),this.backend.device.queue.submit([p.finish()]),u.destroy(),de("verbose",()=>`[WebGPU] GpuDataManager.upload(id=${e})`)}memcpy(e,t){let i=this.storageCache.get(e);if(!i)throw new Error("source gpu data for memcpy does not exist");let r=this.storageCache.get(t);if(!r)throw new Error("destination gpu data for memcpy does not exist");if(i.originalSize!==r.originalSize)throw new Error("inconsistent source and destination gpu data size");let a=zr(i.originalSize),n=this.backend.getCommandEncoder();this.backend.endComputePass(),n.copyBufferToBuffer(i.gpuData.buffer,0,r.gpuData.buffer,0,a)}registerExternalBuffer(e,t,i){let r;if(i){if(r=i[0],e===i[1])return de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, buffer is the same, skip.`),r;if(this.backend.capturedCommandList.has(this.backend.currentSessionId))throw new Error(`Registering a different external buffer under graph capture mode is not supported yet.
             Please use the previous external buffer!`)}else r=Wi();return this.storageCache.set(r,{gpuData:{id:r,type:0,buffer:e},originalSize:t}),de("verbose",()=>`[WebGPU] GpuDataManager.registerExternalBuffer(size=${t}) => id=${r}, registered.`),r}unregisterExternalBuffer(e){e!==void 0&&(this.storageCache.delete(e),de("verbose",()=>`[WebGPU] GpuDataManager.unregisterExternalBuffer() => id=${e}`))}create(e,t=GPUBufferUsage.STORAGE|GPUBufferUsage.COPY_SRC|GPUBufferUsage.COPY_DST){let i=Hs(e),r,a=(t&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE,n=(t&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM;if(a||n){let u=(a?this.freeBuffers:this.freeUniformBuffers).get(i);u?u.length>0?r=u.pop():r=this.backend.device.createBuffer({size:i,usage:t}):r=this.backend.device.createBuffer({size:i,usage:t})}else r=this.backend.device.createBuffer({size:i,usage:t});let s={id:Wi(),type:0,buffer:r};return this.storageCache.set(s.id,{gpuData:s,originalSize:Number(e)}),de("verbose",()=>`[WebGPU] GpuDataManager.create(size=${e}) => id=${s.id}`),s}get(e){return this.storageCache.get(e)?.gpuData}release(e){let t=typeof e=="bigint"?Number(e):e,i=this.storageCache.get(t);if(!i){if(this.storageCache.size===0)return 0;throw new Error("releasing data does not exist")}return de("verbose",()=>`[WebGPU] GpuDataManager.release(id=${t}), gpuDataId=${i.gpuData.id}`),this.storageCache.delete(t),this.buffersPending.push(i.gpuData.buffer),i.originalSize}async download(e,t){let i=this.storageCache.get(Number(e));if(!i)throw new Error("data does not exist");await va(this.backend,i.gpuData.buffer,i.originalSize,t)}refreshPendingBuffers(){if(this.buffersPending.length!==0)if(this.backend.sessionStatus==="default"){for(let e of this.buffersPending){let t=qi.get(e.size);if((e.usage&GPUBufferUsage.STORAGE)===GPUBufferUsage.STORAGE){let i=this.freeBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else if((e.usage&GPUBufferUsage.UNIFORM)===GPUBufferUsage.UNIFORM){let i=this.freeUniformBuffers.get(e.size)||[];t===void 0||i.length>=t?e.destroy():i.push(e)}else e.destroy()}this.buffersPending=[]}else{let e=this.capturedPendingBuffers.get(this.backend.currentSessionId);e||(e=[],this.capturedPendingBuffers.set(this.backend.currentSessionId,e));for(let t of this.buffersPending)e.push(t);this.buffersPending=[]}}dispose(){this.freeBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.freeUniformBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache.forEach(e=>{e.gpuData.buffer.destroy()}),this.capturedPendingBuffers.forEach(e=>{e.forEach(t=>{t.destroy()})}),this.storageCache=new Map,this.freeBuffers=new Map,this.freeUniformBuffers=new Map,this.capturedPendingBuffers=new Map}onCreateSession(){this.sessionCount+=1}onReleaseSession(e){let t=this.capturedPendingBuffers.get(e);t&&(t.forEach(i=>{i.destroy()}),this.capturedPendingBuffers.delete(e)),this.sessionCount-=1,this.sessionCount===0&&(de("warning",()=>"[WebGPU] Clearing webgpu buffer cache"),this.storageCache.forEach(i=>{i.gpuData.buffer.destroy()}),this.storageCache=new Map)}},Dd=(...e)=>new Zs(...e)}),Xs,he,ve=q(()=>{"use strict";Xs=class{constructor(e){Object.assign(this,e)}get cacheKey(){return this.key||(this.key=Object.getOwnPropertyNames(this).sort().map(e=>`${this[e]}`).join(";")),this.key}},he=e=>new Xs(e)}),jt,Ar,Te,Ee,Q,$e,xa,Lt,yt,Y,tr,M,K,Pd,Ha,Ys,Ud,oe=q(()=>{"use strict";te(),ne(),jt=64,Ar=(e,t)=>{if(t===3)throw new Error("vec3 has same alignment as vec4, use vec4 instead");switch(Number(e)){case 10:return t>1?`vec${t}<f16>`:"f16";case 1:return t>1?`vec${t}<f32>`:"f32";case 6:return t>1?`vec${t}<i32>`:"i32";case 12:return t>1?`vec${t}<u32>`:"u32";case 7:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","i32"];case 13:if(t>1)throw new Error("currently not supported vecX of uint64 yet");return["vec2<u32>","u32"];case 9:if(t!==4)throw new Error("bool must be vec4");return["u32","vec4<bool>"];case 22:return"i32";case 21:return"u32";default:throw new Error(`Unknown data type: ${e}`)}},Te=(e,t=1)=>{let i=Ar(e,t);return typeof i=="string"?i:i[0]},Ee=(e,t=1)=>{let i=Ar(e,t);return typeof i=="string"?i:i[1]},Q=(...e)=>{let t=[];return e.forEach(i=>{i.length!==0&&t.push({type:12,data:i},{type:12,data:A.computeStrides(i)})}),t},$e=e=>e%4===0?4:e%2===0?2:1,xa=(e="f32",t,i="0")=>!t||t===1?`${e}(${i})`:`vec${t}<${e}>(${i})`,Lt=(e,t,i)=>e==="f32"?i:t===1?`f32(${i})`:`vec${t}<f32>(${i})`,yt=(e,t)=>t===4?`(${e}.x + ${e}.y + ${e}.z + ${e}.w)`:t===2?`(${e}.x + ${e}.y)`:t===3?`(${e}.x + ${e}.y + ${e}.z)`:e,Y=(e,t,i,r)=>e.startsWith("uniforms.")&&i>4?typeof t=="string"?r==="f16"?`${e}[(${t}) / 8][(${t}) % 8 / 4][(${t}) % 8 % 4]`:`${e}[(${t}) / 4][(${t}) % 4]`:r==="f16"?`${e}[${Math.floor(t/8)}][${Math.floor(t%8/4)}][${t%8%4}]`:`${e}[${Math.floor(t/4)}][${t%4}]`:i>1?`${e}[${t}]`:e,tr=(e,t,i,r,a)=>{let n=typeof i=="number",s=n?i:i.length,u=[...new Array(s).keys()],l=s<2?"u32":s<=4?`vec${s}<u32>`:`array<u32, ${s}>`,p=Ar(t,a),c=typeof p=="string"?p:p[1],h=typeof p=="string"?p:p[0],m={indices:l,value:c,storage:h,tensor:t},_=U=>typeof U=="string"?U:`${U}u`,y={offsetToIndices:!1,indicesToOffset:!1,broadcastedIndicesToOffset:!1,set:!1,setByIndices:!1,get:!1,getByIndices:!1},v=n?"uniforms.":"",C=`${v}${e}_shape`,w=`${v}${e}_strides`,$="";for(let U=0;U<s-1;U++)$+=`
    let dim${U} = current / ${Y(w,U,s)};
    let rest${U} = current % ${Y(w,U,s)};
    indices[${U}] = dim${U};
    current = rest${U};
    `;$+=`indices[${s-1}] = current;`;let S=s<2?"":`
  fn o2i_${e}(offset: u32) -> ${m.indices} {
    var indices: ${m.indices};
    var current = offset;
    ${$}
    return indices;
  }`,x=U=>(y.offsetToIndices=!0,s<2?U:`o2i_${e}(${U})`),k=[];if(s>=2)for(let U=s-1;U>=0;U--)k.push(`${Y(w,U,s)} * (indices[${U}])`);let I=s<2?"":`
  fn i2o_${e}(indices: ${m.indices}) -> u32 {
    return ${k.join("+")};
  }`,z=U=>(y.indicesToOffset=!0,s<2?U:`i2o_${e}(${U})`),R=(...U)=>s===0?"0u":`${m.indices}(${U.map(_).join(",")})`,D=(U,L)=>s<2?`${U}`:`${Y(U,L,s)}`,V=(U,L,ie)=>s<2?`${U}=${ie};`:`${Y(U,L,s)}=${ie};`,Z={},X=(U,L)=>{y.broadcastedIndicesToOffset=!0;let ie=`${L.name}broadcastedIndicesTo${e}Offset`;if(ie in Z)return`${ie}(${U})`;let pe=[];for(let N=s-1;N>=0;N--){let le=L.indicesGet("outputIndices",N+L.rank-s);pe.push(`${D(w,N)} * (${le} % ${D(C,N)})`)}return Z[ie]=`fn ${ie}(outputIndices: ${L.type.indices}) -> u32 {
             return ${pe.length>0?pe.join("+"):"0u"};
           }`,`${ie}(${U})`},re=(U,L)=>(()=>{if(m.storage===m.value)return`${e}[${U}]=${L};`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`${e}[${U}]=vec2<u32>(u32(${L}), select(0u, 0xFFFFFFFFu, ${L} < 0));`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`${e}[${U}]=vec2<u32>(u32(${L}), 0u);`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`${e}[${U}]=dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(${L}));`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),j=U=>(()=>{if(m.storage===m.value)return`${e}[${U}]`;if(m.storage==="vec2<u32>"&&m.value==="i32")return`i32(${e}[${U}].x)`;if(m.storage==="vec2<u32>"&&m.value==="u32")return`u32(${e}[${U}].x)`;if(m.storage==="u32"&&m.value==="vec4<bool>")return`vec4<bool>(bool(${e}[${U}] & 0xFFu), bool(${e}[${U}] & 0xFF00u), bool(${e}[${U}] & 0xFF0000u), bool(${e}[${U}] & 0xFF000000u))`;throw new Error(`not supported combination of storage type ${m.storage} and value type ${m.value} yet`)})(),se=s<2?"":`
  fn get_${e}ByIndices(indices: ${m.indices}) -> ${c} {
    return ${j(`i2o_${e}(indices)`)};
  }`,J=s<2?"":(()=>{let U=u.map(ie=>`d${ie}: u32`).join(", "),L=u.map(ie=>`d${ie}`).join(", ");return`
  fn get_${e}(${U}) -> ${c} {
    return get_${e}ByIndices(${R(L)});
  }`})(),G=(...U)=>{if(U.length!==s)throw new Error(`indices length must be ${s}`);let L=U.map(_).join(",");return s===0?j("0u"):s===1?j(L[0]):(y.get=!0,y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}(${L})`)},ae=U=>s<2?j(U):(y.getByIndices=!0,y.indicesToOffset=!0,`get_${e}ByIndices(${U})`),F=s<2?"":`
  fn set_${e}ByIndices(indices: ${m.indices}, value: ${c}) {
    ${re(`i2o_${e}(indices)`,"value")}
  }`,ye=s<2?"":(()=>{let U=u.map(ie=>`d${ie}: u32`).join(", "),L=u.map(ie=>`d${ie}`).join(", ");return`
  fn set_${e}(${U}, value: ${c}) {
    set_${e}ByIndices(${R(L)}, value);
  }`})();return{impl:()=>{let U=[],L=!1;return y.offsetToIndices&&(U.push(S),L=!0),y.indicesToOffset&&(U.push(I),L=!0),y.broadcastedIndicesToOffset&&(Object.values(Z).forEach(ie=>U.push(ie)),L=!0),y.set&&(U.push(ye),L=!0),y.setByIndices&&(U.push(F),L=!0),y.get&&(U.push(J),L=!0),y.getByIndices&&(U.push(se),L=!0),!n&&L&&U.unshift(`const ${C} = ${m.indices}(${i.join(",")});`,`const ${w} = ${m.indices}(${A.computeStrides(i).join(",")});`),U.join(`
`)},type:m,offsetToIndices:x,indicesToOffset:z,broadcastedIndicesToOffset:X,indices:R,indicesGet:D,indicesSet:V,set:(...U)=>{if(U.length!==s+1)throw new Error(`indices length must be ${s}`);let L=U[s];if(typeof L!="string")throw new Error("value must be string");let ie=U.slice(0,s).map(_).join(",");return s===0?re("0u",L):s===1?re(ie[0],L):(y.set=!0,y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}(${ie}, ${L})`)},setByOffset:re,setByIndices:(U,L)=>s<2?re(U,L):(y.setByIndices=!0,y.indicesToOffset=!0,`set_${e}ByIndices(${U}, ${L});`),get:G,getByOffset:j,getByIndices:ae,usage:r,name:e,strides:w,shape:C,rank:s}},M=(e,t,i,r=1)=>tr(e,t,i,"input",r),K=(e,t,i,r=1)=>tr(e,t,i,"output",r),Pd=(e,t,i)=>tr(e,t,i,"atomicOutput",1),Ha=(e,t,i,r=1)=>tr(e,t,i,"internal",r),Ys=class{constructor(e,t){this.normalizedDispatchGroup=e,this.limits=t,this.internalVariables=[],this.variables=[],this.uniforms=[],this.variableIndex=0}guardAgainstOutOfBoundsWorkgroupSizes(e){return`if (global_idx >= ${typeof e=="number"?`${e}u`:e}) { return; }`}mainStart(e=jt){let t=typeof e=="number"?e:e[0],i=typeof e=="number"?1:e[1],r=typeof e=="number"?1:e[2];if(t>this.limits.maxComputeWorkgroupSizeX||i>this.limits.maxComputeWorkgroupSizeY||r>this.limits.maxComputeWorkgroupSizeZ)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup size [${this.limits.maxComputeWorkgroupSizeX}, ${this.limits.maxComputeWorkgroupSizeY}, ${this.limits.maxComputeWorkgroupSizeZ}].`);if(t*i*r>this.limits.maxComputeInvocationsPerWorkgroup)throw new Error(`workgroup size [${t}, ${i}, ${r}] exceeds the maximum workgroup invocations ${this.limits.maxComputeInvocationsPerWorkgroup}.`);let a=this.normalizedDispatchGroup[1]===1&&this.normalizedDispatchGroup[2]===1,n=a?`@builtin(global_invocation_id) global_id : vec3<u32>,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(local_invocation_id) local_id : vec3<u32>`:`@builtin(global_invocation_id) global_id : vec3<u32>,
                                             @builtin(local_invocation_id) local_id : vec3<u32>,
    @builtin(local_invocation_index) local_idx : u32,
    @builtin(workgroup_id) workgroup_id : vec3<u32>,
    @builtin(num_workgroups) num_workgroups : vec3<u32>`,s=a?`let global_idx = global_id.x;
         let workgroup_index = workgroup_id.x;`:`let workgroup_index = workgroup_id.z * num_workgroups[0] * num_workgroups[1] +
             workgroup_id.y * num_workgroups[0] + workgroup_id.x;
         let global_idx = workgroup_index * ${t*i*r}u + local_idx;`;return`@compute @workgroup_size(${t}, ${i}, ${r})
  fn main(${n}) {
    ${s}
  `}appendVariableUniforms(e){e.rank!==0&&(e.shape.startsWith("uniforms.")&&this.uniforms.push({name:e.shape.replace("uniforms.",""),type:"u32",length:e.rank}),e.strides.startsWith("uniforms.")&&this.uniforms.push({name:e.strides.replace("uniforms.",""),type:"u32",length:e.rank}))}declareVariable(e,t){if(e.usage==="internal")throw new Error("cannot use internal variable with declareVariable(). use registerInternalVariables() instead.");this.variables.push(e),this.appendVariableUniforms(e);let i=e.usage==="input"?"read":"read_write",r=e.usage==="atomicOutput"?"atomic<i32>":e.type.storage;return`@group(0) @binding(${t}) var<storage, ${i}> ${e.name}: array<${r}>;`}declareVariables(...e){return e.map(t=>this.declareVariable(t,this.variableIndex++)).join(`
`)}registerInternalVariable(e){if(e.usage!=="internal")throw new Error("cannot use input or output variable with registerInternalVariable(). use declareVariables() instead.");this.internalVariables.push(e),this.appendVariableUniforms(e)}registerInternalVariables(...e){return e.forEach(t=>this.registerInternalVariable(t)),this}registerUniform(e,t,i=1){return this.uniforms.push({name:e,type:t,length:i}),this}registerUniforms(e){return this.uniforms=this.uniforms.concat(e),this}uniformDeclaration(){if(this.uniforms.length===0)return"";let e=[];for(let{name:t,type:i,length:r}of this.uniforms)if(r&&r>4)i==="f16"?e.push(`@align(16) ${t}:array<mat2x4<${i}>, ${Math.ceil(r/8)}>`):e.push(`${t}:array<vec4<${i}>, ${Math.ceil(r/4)}>`);else{let a=r==null||r===1?i:`vec${r}<${i}>`;e.push(`${t}:${a}`)}return`
      struct Uniforms { ${e.join(", ")} };
      @group(0) @binding(${this.variableIndex}) var<uniform> uniforms: Uniforms;`}get additionalImplementations(){return this.uniformDeclaration()+this.variables.map(e=>e.impl()).join(`
`)+this.internalVariables.map(e=>e.impl()).join(`
`)}get variablesInfo(){if(this.uniforms.length===0)return;let e=t=>[12,10,1,6][["u32","f16","f32","i32"].indexOf(t)];return this.uniforms.map(t=>[e(t.type),t.length??1])}},Ud=(e,t)=>new Ys(e,t)}),Qs,Li,Js,eo,to,ro,Pe,qd,Wd,_t=q(()=>{"use strict";te(),ne(),ve(),oe(),Qs=(e,t)=>{if(!e||e.length!==1)throw new Error("Transpose requires 1 input.");if(t.length!==0&&t.length!==e[0].dims.length)throw new Error(`perm size ${t.length} does not match input rank ${e[0].dims.length}`)},Li=(e,t)=>t.length!==0?t:[...new Array(e).keys()].reverse(),Js=(e,t)=>A.sortBasedOnPerm(e,Li(e.length,t)),eo=(e,t,i,r)=>{let a=`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`;for(let n=0;n<t;++n)a+=`a[${e[n]}]=i[${n}];`;return a+="return a;}"},to=(e,t)=>{let i=[],r=[];for(let a=0;a<e.length;++a)e[a]!==1&&i.push(e[a]),e[t[a]]!==1&&r.push(t[a]);return{newShape:i,newPerm:r}},ro=(e,t)=>{let i=0;for(let r=0;r<e.length;++r)if(t[e[r]]!==1){if(e[r]<i)return!1;i=e[r]}return!0},Pe=(e,t)=>{let i=e.dataType,r=e.dims.length,a=Li(r,t),n=Js(e.dims,a),s=e.dims,u=n,l=r<2||ro(a,e.dims),p;if(l)return p=y=>{let v=M("input",i,s,4),C=K("output",i,u,4);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,C)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    output[global_idx] = input[global_idx];
  }`},{name:"TransposeCopy",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let y=A.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64/4)},programUniforms:[{type:12,data:Math.ceil(y/4)}]}},getShaderSource:p};let{newShape:c,newPerm:h}=to(e.dims,a),m=A.areEqual(h,[2,3,1]),_=A.areEqual(h,[3,1,2]);if(c.length===2||m||_){s=m?[c[0],c[1]*c[2]]:_?[c[0]*c[1],c[2]]:c,u=[s[1],s[0]];let y=16;return p=v=>{let C=M("a",i,s.length),w=K("output",i,u.length);return`
  ${v.registerUniform("output_size","u32").declareVariables(C,w)}
  var<workgroup> tile : array<array<${w.type.value}, ${y+1}>, ${y}>;
  ${v.mainStart([y,y,1])}
    let stride = (uniforms.output_shape[1] - 1) / ${y} + 1;
    let workgroup_id_x = workgroup_index % stride;
    let workgroup_id_y = workgroup_index / stride;
    let input_col = workgroup_id_y * ${y}u + local_id.x;
    let input_row = workgroup_id_x * ${y}u + local_id.y;
    if (input_row < uniforms.a_shape[0] && input_col < uniforms.a_shape[1]) {
      tile[local_id.y][local_id.x] = ${C.getByIndices(`${C.type.indices}(input_row, input_col)`)};
    }
    workgroupBarrier();

    let output_col = workgroup_id_x * ${y}u + local_id.x;
    let output_row = workgroup_id_y * ${y}u + local_id.y;
    if (output_row < uniforms.output_shape[0] && output_col < uniforms.output_shape[1]) {
      ${w.setByIndices(`${w.type.indices}(output_row, output_col)`,"tile[local_id.x][local_id.y]")}
    }
  }`},{name:"TransposeShared",shaderCache:{inputDependencies:["type"]},getRunData:()=>{let v=A.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(u[1]/y),y:Math.ceil(u[0]/y)},programUniforms:[{type:12,data:v},...Q(s,u)]}},getShaderSource:p}}return p=y=>{let v=M("a",i,s.length),C=K("output",i,u.length);return`
  ${y.registerUniform("output_size","u32").declareVariables(v,C)}

  ${eo(a,r,v,C)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${C.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${C.setByOffset("global_idx",v.getByIndices("aIndices"))}
  }`},{name:"Transpose",shaderCache:{hint:`${t}`,inputDependencies:["rank"]},getRunData:()=>{let y=A.size(n);return{outputs:[{dims:n,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Q(s,u)]}},getShaderSource:p}},qd=(e,t)=>{Qs(e.inputs,t.perm),e.compute(Pe(e.inputs[0],t.perm))},Wd=e=>he({perm:e.perm})}),io,ao,no,so,oo,uo,lo,po,co,fo,Le,Ld,Vd,jd,Fd,Gd,Hd,Kd,Zd,Xd,Yd,Vm=q(()=>{"use strict";te(),ne(),oe(),Ka(),_t(),io={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate * candidate",logSumExp:"bestValue + exp(candidate)",l1:"bestValue + abs(candidate)",l2:"bestValue + candidate * candidate",logSum:"bestValue + candidate"},ao={max:"select(bestValue, candidate, candidate > bestValue)",min:"select(bestValue, candidate, candidate < bestValue)",mean:"bestValue + candidate",sum:"bestValue + candidate",prod:"bestValue * candidate",sumSquare:"bestValue + candidate",logSumExp:"bestValue + candidate",l1:"bestValue + candidate",l2:"bestValue + candidate",logSum:"bestValue + candidate"},no={max:"_A[offset]",min:"_A[offset]",mean:"0",sum:"0",prod:"1",sumSquare:"0",logSumExp:"0",l1:"0",l2:"0",logSum:"0"},so={max:"bestValue",min:"bestValue",sum:"bestValue",prod:"bestValue",sumSquare:"bestValue",logSumExp:"log(bestValue)",l1:"bestValue",l2:"sqrt(bestValue)",logSum:"log(bestValue)"},oo=(e,t)=>{let i=[];for(let r=t-e;r<t;++r)i.push(r);return i},uo=(e,t)=>{let i=[],r=e.length;for(let n=0;n<r;n++)t.indexOf(n)===-1&&i.push(e[n]);let a=t.map(n=>e[n]);return[i,a]},lo=(e,t)=>{let i=e.length+t.length,r=[],a=0;for(let n=0;n<i;n++)t.indexOf(n)===-1?r.push(e[a++]):r.push(1);return r},po=(e,t)=>{for(let i=0;i<e.length;++i)if(e[e.length-i-1]!==t-1-i)return!1;return!0},co=(e,t)=>{let i=[];if(!po(e,t)){for(let r=0;r<t;++r)e.indexOf(r)===-1&&i.push(r);e.forEach(r=>i.push(r))}return i},fo=(e,t,i,r,a,n,s)=>{let u=i[0].dims,l=A.size(n),p=A.size(s),c=M("_A",i[0].dataType,u),h=K("output",a,n),m=64;l===1&&(m=256);let _=`
          var<workgroup> aBestValues : array<f32, ${m}>;
       `,y=v=>`
        ${v.registerUniform("reduceSize","u32").declareVariables(c,h)}
        ${_}
        fn DIV_CEIL(a : u32, b : u32) -> u32 {
          return ((a - 1u) / b + 1u);
         }
         ${v.mainStart(m)}

          let outputIndex = global_idx / ${m};
          let offset = outputIndex * uniforms.reduceSize;

          var bestValue = f32(${no[r]});
          let Length = uniforms.reduceSize;
          for (var k = local_idx; k < Length; k = k + ${m}) {
           let candidate = f32(${c.getByOffset("offset + k")});
           bestValue = ${io[r]};
          }
          aBestValues[local_idx] = bestValue;
          workgroupBarrier();

         var reduceSize = min(Length, ${m}u);
         for (var currentSize = reduceSize / 2u; reduceSize > 1u;
             currentSize = reduceSize / 2u) {
           let interval = DIV_CEIL(reduceSize, 2u);
           if (local_idx < currentSize) {
            let candidate = aBestValues[local_idx + interval];
            bestValue = ${ao[r]};
            aBestValues[local_idx] = bestValue;
           }
           reduceSize = interval;
           workgroupBarrier();
         }

         if (local_idx == 0u) {
          ${h.setByOffset("outputIndex",`${r==="mean"?`${h.type.storage}(bestValue / f32(uniforms.reduceSize))`:`${h.type.storage}(${so[r]})`}`)};
         }
        }`;return{name:e,shaderCache:{hint:`${t};${m}`,inputDependencies:["type"]},getShaderSource:y,getRunData:()=>({outputs:[{dims:n,dataType:a}],dispatchGroup:{x:l},programUniforms:[{type:12,data:p}]})}},Le=(e,t,i,r)=>{let a=e.inputs.length===1?i:Ca(e.inputs,i),n=a.axes;n.length===0&&!a.noopWithEmptyAxes&&(n=e.inputs[0].dims.map((_,y)=>y));let s=A.normalizeAxes(n,e.inputs[0].dims.length),u=s,l=e.inputs[0],p=co(u,e.inputs[0].dims.length);p.length>0&&(l=e.compute(Pe(e.inputs[0],p),{inputs:[0],outputs:[-1]})[0],u=oo(u.length,l.dims.length));let[c,h]=uo(l.dims,u),m=c;a.keepDims&&(m=lo(c,s)),e.compute(fo(t,a.cacheKey,[l],r,e.inputs[0].dataType,m,h),{inputs:[l]})},Ld=(e,t)=>{Le(e,"ReduceMeanShared",t,"mean")},Vd=(e,t)=>{Le(e,"ReduceL1Shared",t,"l1")},jd=(e,t)=>{Le(e,"ReduceL2Shared",t,"l2")},Fd=(e,t)=>{Le(e,"ReduceLogSumExpShared",t,"logSumExp")},Gd=(e,t)=>{Le(e,"ReduceMaxShared",t,"max")},Hd=(e,t)=>{Le(e,"ReduceMinShared",t,"min")},Kd=(e,t)=>{Le(e,"ReduceProdShared",t,"prod")},Zd=(e,t)=>{Le(e,"ReduceSumShared",t,"sum")},Xd=(e,t)=>{Le(e,"ReduceSumSquareShared",t,"sumSquare")},Yd=(e,t)=>{Le(e,"ReduceLogSumShared",t,"logSum")}}),Ve,ho,Fr,Ca,je,mo,go,yo,_o,wo,bo,$o,vo,xo,Co,Fe,Qd,Jd,ep,tp,rp,ip,ap,np,sp,op,Ka=q(()=>{"use strict";te(),ne(),ve(),oe(),Vm(),Ve=e=>{if(!e||e.length===0||e.length>2)throw new Error("Reduce op requires 1 or 2 inputs.");if(e.length===2&&e[1].dims.length!==1)throw new Error("Invalid axes input dims.")},ho=e=>["","",`var value = ${e.getByIndices("input_indices")};`,""],Fr=(e,t,i,r,a,n,s=!1,u=!1)=>{let l=[],p=i[0].dims,c=p.length,h=A.normalizeAxes(a,c),m=!u&&h.length===0;p.forEach((v,C)=>{m||h.indexOf(C)>=0?s&&l.push(1):l.push(v)});let _=l.length,y=A.size(l);return{name:e,shaderCache:t,getShaderSource:v=>{let C=[],w=M("_A",i[0].dataType,c),$=K("output",n,_),S=r(w,$,h),x=S[2];for(let k=0,I=0;k<c;k++)m||h.indexOf(k)>=0?(s&&I++,x=`for(var j${k}: u32 = 0; j${k} < ${p[k]}; j${k}++) {
                  ${S[2].includes("last_index")?`let last_index = j${k};`:""}
                  ${w.indicesSet("input_indices",k,`j${k}`)}
                  ${x}
                }`):(C.push(`${w.indicesSet("input_indices",k,$.indicesGet("output_indices",I))};`),I++);return`

        ${v.registerUniform("output_size","u32").declareVariables(w,$)}

        ${v.mainStart()}
          ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          var input_indices: ${w.type.indices};
          let output_indices = ${$.offsetToIndices("global_idx")};

          ${C.join(`
`)}
          ${S[0]}       // init ops for reduce max/min
          ${S[1]}
          ${x}
          ${S[3]}
          ${S.length===4?$.setByOffset("global_idx","value"):S.slice(4).join(`
`)}
        }`},getRunData:()=>({outputs:[{dims:l,dataType:n}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:[{type:12,data:y},...Q(p,l)]})}},Ca=(e,t)=>{let i=[];return e[1].dims[0]>0&&e[1].getBigInt64Array().forEach(r=>i.push(Number(r))),he({axes:i,keepDims:t.keepDims,noopWithEmptyAxes:t.noopWithEmptyAxes})},je=(e,t,i,r)=>{let a=e.inputs,n=a.length===1?i:Ca(a,i);e.compute(Fr(t,{hint:n.cacheKey,inputDependencies:["rank"]},[a[0]],n.noopWithEmptyAxes&&n.axes.length===0?ho:r,n.axes,a[0].dataType,n.keepDims,n.noopWithEmptyAxes),{inputs:[0]})},mo=(e,t)=>{Ve(e.inputs),je(e,"ReduceLogSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,"value = log(value);"])},go=(e,t)=>{Ve(e.inputs),je(e,"ReduceL1",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += abs(${i.getByIndices("input_indices")});`,""])},yo=(e,t)=>{Ve(e.inputs),je(e,"ReduceL2",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += (t * t);`,"value = sqrt(value);"])},_o=(e,t)=>{Ve(e.inputs),je(e,"ReduceLogSumExp",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += exp(${i.getByIndices("input_indices")});`,"value = log(value);"])},wo=(e,t)=>{Ve(e.inputs),je(e,"ReduceMax",t,(i,r,a)=>{let n=[];for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(i.indicesSet("input_indices",s,0));return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = max(value, ${i.getByIndices("input_indices")});`,""]})},bo=(e,t)=>{Ve(e.inputs),je(e,"ReduceMean",t,(i,r,a)=>{let n=1;for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&(n*=e.inputs[0].dims[s]);return["var sum = f32(0);","",`sum += f32(${i.getByIndices("input_indices")});`,`let value = ${r.type.value}(sum / ${n});`]})},$o=(e,t)=>{Ve(e.inputs),je(e,"ReduceMin",t,(i,r,a)=>{let n=[];for(let s=0;s<i.rank;s++)(a.indexOf(s)>=0||a.length===0)&&n.push(`input_indices[${s}] = 0;`);return[`${n.join(`
`)}`,`var value = ${i.getByIndices("input_indices")};`,`value = min(value, ${i.getByIndices("input_indices")});`,""]})},vo=(e,t)=>{Ve(e.inputs),je(e,"ReduceProd",t,(i,r)=>[`var value = ${r.type.storage}(1);`,"",`value *= ${i.getByIndices("input_indices")};`,""])},xo=(e,t)=>{Ve(e.inputs),je(e,"ReduceSum",t,(i,r)=>[`var value = ${r.type.storage}(0);`,"",`value += ${i.getByIndices("input_indices")};`,""])},Co=(e,t)=>{Ve(e.inputs),je(e,"ReduceSumSquare",t,(i,r)=>[`var t = ${r.type.value}(0); var value = ${r.type.value}(0);`,"",`t = ${i.getByIndices("input_indices")}; value += t * t;`,""])},Fe=(e,t,i)=>{if(t.length===0)return i;let r=1,a=1;for(let n=0;n<t.length;n++)t.indexOf(n)===-1?r*=e[n]:a*=e[n];return a<32&&r>1024},Qd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?bo(e,t):Ld(e,t)},Jd=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?go(e,t):Vd(e,t)},ep=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?yo(e,t):jd(e,t)},tp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?_o(e,t):Fd(e,t)},rp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?wo(e,t):Gd(e,t)},ip=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?$o(e,t):Hd(e,t)},ap=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?vo(e,t):Kd(e,t)},np=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?xo(e,t):Zd(e,t)},sp=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?Co(e,t):Xd(e,t)},op=(e,t)=>{Fe(e.inputs[0].dims,t.axes,t.noopWithEmptyAxes)?mo(e,t):Yd(e,t)}}),Vi,up,lp,Sa,jm=q(()=>{"use strict";te(),ve(),Ka(),Vi=e=>{if(!e||e.length===0||e.length>2)throw new Error("ArgMinMaxOp op requires 1 or 2 inputs.");if(e[0].dataType!==1)throw new Error("Invalid input type.")},up=(e,t)=>{Vi(e.inputs);let i=(r,a,n)=>{let s=[];for(let u=0;u<r.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?"<=":"<"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Fr("ArgMin",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},lp=(e,t)=>{Vi(e.inputs);let i=(r,a,n)=>{let s=[];for(let u=0;u<r.rank;u++)(n.indexOf(u)>=0||n.length===0)&&s.push(`input_indices[${u}] = 0;`);return[`${s.join(`
`)}`,`var value = ${r.getByIndices("input_indices")};
var best_index : i32 = 0;`,`if (${r.getByIndices("input_indices")} ${t.selectLastIndex>0?">=":">"} value) {
         value = ${r.getByIndices("input_indices")};
         best_index = i32(last_index);
       }`,"",a.setByOffset("global_idx","best_index")]};e.compute(Fr("argMax",{hint:t.cacheKey,inputDependencies:["rank"]},[e.inputs[0]],i,[t.axis],7,t.keepDims),{inputs:[0]})},Sa=e=>he(e)}),So,Or,To,ko,Io,hr,Eo,dp,Za=q(()=>{"use strict";te(),ne(),Ga(),oe(),So=(e,t)=>{let i=e[0],r=e[1],a=e[2],n=e[3],s=e[4],u=e[5];if(s&&u)throw new Error("Attention cannot have both past and attention_bias");if(i.dims.length!==3)throw new Error('Input "input" must have 3 dimensions');let l=i.dims[0],p=i.dims[1],c=i.dims[2];if(a.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimensions');if(r.dims.length!==2)throw new Error('Input "weights" is expected to have 2 dimensions');if(r.dims[0]!==c)throw new Error("Input 1 dimension 0 should have same length as dimension 2 of input 0");if(a.dims[0]!==r.dims[1])throw new Error('Input "bias" dimension 0 should have same length as dimension 1 of input "weights"');let h=a.dims[0]/3,m=h,_=m;if(t.qkvHiddenSizes.length>0){if(t.qkvHiddenSizes.length!==3)throw new Error("qkv_hidden_sizes attribute should have 3 elements");for(let S of t.qkvHiddenSizes)if(S%t.numHeads!==0)throw new Error("qkv_hidden_sizes should be divisible by num_heads");h=t.qkvHiddenSizes[0],m=t.qkvHiddenSizes[1],_=t.qkvHiddenSizes[2]}let y=p;if(h!==m)throw new Error("qkv_hidden_sizes first element should be same as the second");if(a.dims[0]!==h+m+_)throw new Error('Input "bias" dimension 0 should have same length as sum of Q/K/V hidden sizes');let v=0;if(s){if(m!==_)throw new Error('Input "past" expect k_hidden_size == v_hidden_size');if(s.dims.length!==5)throw new Error('Input "past" must have 5 dimensions');if(s.dims[0]!==2)throw new Error('Input "past" first dimension must be 2');if(s.dims[1]!==l)throw new Error('Input "past" second dimension must be batch_size');if(s.dims[2]!==t.numHeads)throw new Error('Input "past" third dimension must be num_heads');if(s.dims[4]!==m/t.numHeads)throw new Error('Input "past" fifth dimension must be k_hidden_size / num_heads');t.pastPresentShareBuffer||(v=s.dims[3])}let C=y+v,w=-1,$=0;if(n)throw new Error("Mask not supported");if(s)throw new Error("past is not supported");if(u){if(u.dims.length!==4)throw new Error('Input "attention_bias" must have 4 dimensions');if(u.dims[0]!==l||u.dims[1]!==t.numHeads||u.dims[2]!==p||u.dims[3]!==C)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:l,sequenceLength:p,pastSequenceLength:v,kvSequenceLength:y,totalSequenceLength:C,maxSequenceLength:w,inputHiddenSize:c,hiddenSize:h,vHiddenSize:_,headSize:Math.floor(h/t.numHeads),vHeadSize:Math.floor(_/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:!1,qkvFormat:1}},Or=(e,t,i)=>t&&e?`
      let total_sequence_length_input = u32(${t.getByOffset("0")});
      let present_sequence_length = max(total_sequence_length_input, uniforms.past_sequence_length);
      let is_subsequent_prompt: bool = sequence_length > 1 && sequence_length != total_sequence_length_input;
      let is_first_prompt: bool = is_subsequent_prompt == false && sequence_length == total_sequence_length_input;
      total_sequence_length = u32(${e?.getByOffset("batchIdx")}) + 1;
      var past_sequence_length: u32 = 0;
      if (is_first_prompt == false) {
        past_sequence_length = total_sequence_length - sequence_length;
      }
       `:`
    ${i?"let past_sequence_length = uniforms.past_sequence_length":""};
    let present_sequence_length = total_sequence_length;
    `,To=(e,t,i,r,a,n,s,u)=>{let l=$e(s?1:n),p=64,c=n/l;c<p&&(p=32);let h=Math.ceil(n/l/p),m=[{type:12,data:t},{type:12,data:i},{type:12,data:r},{type:12,data:a},{type:12,data:c},{type:12,data:h}],_=Te(e.dataType,l),y=Ee(1,l),v=["type"];s&&v.push("type"),u&&v.push("type");let C=w=>{let $=K("x",e.dataType,e.dims,l),S=[$],x=s?M("seq_lens",s.dataType,s.dims):void 0;x&&S.push(x);let k=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;k&&S.push(k);let I=Ee(e.dataType),z=[{name:"batch_size",type:"u32"},{name:"num_heads",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"sequence_length",type:"u32"},{name:"total_sequence_length",type:"u32"},{name:"elements_per_thread",type:"u32"}];return`
  var<workgroup> thread_max: array<f32, ${p}>;
  var<workgroup> thread_sum: array<f32, ${p}>;
  ${w.registerUniforms(z).declareVariables(...S)}
  ${w.mainStart([p,1,1])}
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let sequence_length = uniforms.sequence_length;
    var total_sequence_length = uniforms.total_sequence_length;
    ${Or(x,k,!1)}
    let local_offset = local_idx * uniforms.elements_per_thread;
    let offset = (global_idx / ${p}) * uniforms.total_sequence_length + local_offset;
    let seq_causal_length = ${s?"u32(past_sequence_length + workgroup_id.y + 1)":"total_sequence_length"};
    var thread_max_vector = ${y}(-3.402823e+38f);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      thread_max_vector = max(${y}(x[offset + i]), thread_max_vector);
    }
    thread_max[local_idx] = ${(()=>{switch(l){case 1:return"thread_max_vector";case 2:return"max(thread_max_vector.x, thread_max_vector.y)";case 4:return"max(max(thread_max_vector.x, thread_max_vector.y), max(thread_max_vector.z, thread_max_vector.w))";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var max_value =  f32(-3.402823e+38f);
    for (var i = 0u; i < ${p}; i++) {
      max_value = max(thread_max[i], max_value);
    }

    var sum_vector = ${y}(0);
    for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
      sum_vector += exp(${y}(x[offset + i]) - max_value);
    }
    thread_sum[local_idx] = ${(()=>{switch(l){case 1:return"sum_vector";case 2:return"sum_vector.x + sum_vector.y";case 4:return"sum_vector.x + sum_vector.y + sum_vector.z + sum_vector.w";default:throw new Error(`Unsupported components: ${l}`)}})()};
    workgroupBarrier();

    var sum: f32 = 0;
    for (var i = 0u; i < ${p}; i++) {
      sum += thread_sum[i];
    }

    if (sum == 0) {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        x[offset + i] = ${$.type.value}(${I}(1.0) / ${I}(seq_causal_length));
      }
    } else {
      for (var i: u32 = 0; i < uniforms.elements_per_thread && i + local_offset < seq_causal_length; i++) {
        var f32input = ${y}(x[offset + i]);
        x[offset + i] = ${$.type.value}(exp(f32input - max_value) / sum);
      }
    }
      ${s?`
        for (var total_seq_id: u32 = seq_causal_length; total_seq_id + local_offset < uniforms.total_sequence_length; total_seq_id++) {
          x[offset + total_seq_id] = ${$.type.value}(${I}(0));
        }`:""};
  }`};return{name:"AttentionProbsSoftmax",shaderCache:{hint:`${p};${_};${l}`,inputDependencies:v},getShaderSource:C,getRunData:()=>({outputs:[],dispatchGroup:{x:1,y:a,z:t*i},programUniforms:m})}},ko=(e,t,i,r,a,n,s,u,l)=>{let p=s+n.kvSequenceLength,c=[n.batchSize,n.numHeads,n.sequenceLength,p],h=e>1&&r,m=n.kvNumHeads?n.kvNumHeads:n.numHeads,_=h?[n.batchSize,m,p,n.headSize]:void 0,y=n.nReps?n.nReps:1,v=n.scale===0?1/Math.sqrt(n.headSize):n.scale,C=$e(n.headSize),w=n.headSize/C,$=12,S={x:Math.ceil(p/$),y:Math.ceil(n.sequenceLength/$),z:n.batchSize*n.numHeads},x=[{type:12,data:n.sequenceLength},{type:12,data:w},{type:12,data:p},{type:12,data:n.numHeads},{type:12,data:n.headSize},{type:1,data:v},{type:12,data:s},{type:12,data:n.kvSequenceLength},{type:12,data:y}],k=h&&r&&A.size(r.dims)>0,I=["type","type"];k&&I.push("type"),a&&I.push("type"),u&&I.push("type"),l&&I.push("type");let z=[{dims:c,dataType:t.dataType,gpuDataType:0}];h&&z.push({dims:_,dataType:t.dataType,gpuDataType:0});let R=D=>{let V=M("q",t.dataType,t.dims,C),Z=M("key",i.dataType,i.dims,C),X=[V,Z];if(k){let F=M("past_key",r.dataType,r.dims,C);X.push(F)}a&&X.push(M("attention_bias",a.dataType,a.dims));let re=u?M("seq_lens",u.dataType,u.dims):void 0;re&&X.push(re);let j=l?M("total_sequence_length_input",l.dataType,l.dims):void 0;j&&X.push(j);let se=K("output",t.dataType,c),J=[se];h&&J.push(K("present_key",t.dataType,_,C));let G=Ee(1,C),ae=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"alpha",type:"f32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${$}u;

  var<workgroup> tileQ: array<${V.type.storage}, ${$*$}>;
  var<workgroup> tileK: array<${V.type.storage}, ${$*$}>;
  ${D.registerUniforms(ae).declareVariables(...X,...J)}
  ${D.mainStart([$,$,1])}
    // x holds the N and y holds the M
    let headIdx = workgroup_id.z % uniforms.num_heads;
    let kvHeadIdx = ${y===1?"headIdx":"headIdx / uniforms.n_reps"};
    let kv_num_heads = ${y===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
    let batchIdx = workgroup_id.z / uniforms.num_heads;
    let m = workgroup_id.y * TILE_SIZE;
    let n = workgroup_id.x * TILE_SIZE;
    let sequence_length = uniforms.M;
    var total_sequence_length = uniforms.N;
    ${Or(re,j,!0)}
    let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx;
    let qOffset = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
    ${k&&h?"let pastKeyOffset = absKvHeadIdx * uniforms.past_sequence_length * uniforms.K;":""};
    let kOffset = absKvHeadIdx * uniforms.kv_sequence_length * uniforms.K;
    ${h?"let presentKeyOffset = absKvHeadIdx * uniforms.N * uniforms.K;":""}
    var value = ${G}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (global_id.y < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = q[qOffset + local_id.y * uniforms.K + w + local_id.x];
      }
      if (n + local_id.y < uniforms.N && w + local_id.x < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
      ${k&&h?`
              if (n + local_id.y < past_sequence_length) {
                tileK[idx] = past_key[pastKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
              } else if (n + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
                tileK[idx] = key[kOffset + (n + local_id.y - past_sequence_length) * uniforms.K + w + local_id.x];
              }`:`
          if (n + local_id.y < uniforms.kv_sequence_length) {
            tileK[idx] = key[kOffset + (n + local_id.y) * uniforms.K + w + local_id.x];
          }`}
      ${h?`if (n + local_id.y < present_sequence_length) {
        present_key[presentKeyOffset + (n + local_id.y) * uniforms.K + w + local_id.x] = tileK[idx];
      }`:""}
      }
      workgroupBarrier();

      for (var k: u32 = 0u; k < TILE_SIZE && w+k < uniforms.K; k++) {
          value += ${G}(tileQ[TILE_SIZE * local_id.y + k] * tileK[TILE_SIZE * local_id.x + k]);
      }

      workgroupBarrier();
    }

    if (global_id.y < uniforms.M && global_id.x < total_sequence_length) {
      let headOffset = workgroup_id.z * uniforms.M * uniforms.N;
      let outputIdx = headOffset + global_id.y * uniforms.N + global_id.x;
      var sum: f32 = ${(()=>{switch(C){case 1:return"value";case 2:return"value.x + value.y";case 4:return"value.x + value.y + value.z + value.w";default:throw new Error(`Unsupported components: ${C}`)}})()};
        output[outputIdx] = ${se.type.value} (sum * uniforms.alpha) + ${a?"attention_bias[outputIdx]":"0.0"};
    }
  }`};return{name:"AttentionProbs",shaderCache:{hint:`${C};${a!==void 0};${r!==void 0};${e}`,inputDependencies:I},getRunData:()=>({outputs:z,dispatchGroup:S,programUniforms:x}),getShaderSource:R}},Io=(e,t,i,r,a,n,s=void 0,u=void 0)=>{let l=n+a.kvSequenceLength,p=a.nReps?a.nReps:1,c=a.vHiddenSize*p,h=e>1&&r,m=a.kvNumHeads?a.kvNumHeads:a.numHeads,_=h?[a.batchSize,m,l,a.headSize]:void 0,y=[a.batchSize,a.sequenceLength,c],v=12,C={x:Math.ceil(a.vHeadSize/v),y:Math.ceil(a.sequenceLength/v),z:a.batchSize*a.numHeads},w=[{type:12,data:a.sequenceLength},{type:12,data:l},{type:12,data:a.vHeadSize},{type:12,data:a.numHeads},{type:12,data:a.headSize},{type:12,data:c},{type:12,data:n},{type:12,data:a.kvSequenceLength},{type:12,data:p}],$=h&&r&&A.size(r.dims)>0,S=["type","type"];$&&S.push("type"),s&&S.push("type"),u&&S.push("type");let x=[{dims:y,dataType:t.dataType,gpuDataType:0}];h&&x.push({dims:_,dataType:t.dataType,gpuDataType:0});let k=I=>{let z=M("probs",t.dataType,t.dims),R=M("v",i.dataType,i.dims),D=[z,R];$&&D.push(M("past_value",r.dataType,r.dims));let V=s?M("seq_lens",s.dataType,s.dims):void 0;s&&D.push(V);let Z=u?M("total_sequence_length_input",u.dataType,u.dims):void 0;u&&D.push(Z);let X=[K("output",t.dataType,y)];h&&X.push(K("present_value",t.dataType,_));let re=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"v_hidden_size",type:"u32"},{name:"past_sequence_length",type:"u32"},{name:"kv_sequence_length",type:"u32"},{name:"n_reps",type:"u32"}];return`
  const TILE_SIZE = ${v}u;
  var<workgroup> tileQ: array<${z.type.value}, ${v*v}>;
  var<workgroup> tileV: array<${z.type.value}, ${v*v}>;
  ${I.registerUniforms(re).declareVariables(...D,...X)}
  ${I.mainStart([v,v,1])}
   let headIdx = workgroup_id.z % uniforms.num_heads;
   let batchIdx = workgroup_id.z / uniforms.num_heads;
   let kvHeadIdx = ${p===1?"headIdx":"headIdx / uniforms.n_reps"};
   let kv_num_heads = ${p===1?"uniforms.num_heads":"uniforms.num_heads / uniforms.n_reps"};
   let m = global_id.y;
   let n = global_id.x;
   let sequence_length = uniforms.M;
   var total_sequence_length = uniforms.K;
   ${Or(V,Z,!0)}
   let offsetA = workgroup_id.z * uniforms.M * uniforms.K + m * uniforms.K;
   let absKvHeadIdx = batchIdx * kv_num_heads + kvHeadIdx; // kvHeadIdx is relative to the batch
   ${$&&h?"let pastValueOffset = absKvHeadIdx * uniforms.N * uniforms.past_sequence_length + n;":""};
   let vOffset = absKvHeadIdx * uniforms.N * uniforms.kv_sequence_length + n;
   ${h?"let presentValueOffset = absKvHeadIdx * uniforms.N * uniforms.K + n;":""}
   var value = ${z.type.storage}(0);
   for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileQ[TILE_SIZE * local_id.y + local_id.x] = probs[offsetA + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        var idx = TILE_SIZE * local_id.y + local_id.x;
        ${$&&h?`
        if (w + local_id.y < past_sequence_length) {
          tileV[idx] = past_value[pastValueOffset + (w + local_id.y) * uniforms.N];
        } else if (w + local_id.y - past_sequence_length < uniforms.kv_sequence_length) {
          tileV[idx] = v[vOffset + (w + local_id.y - past_sequence_length) * uniforms.N];
        }
      `:`
            if (w + local_id.y < uniforms.kv_sequence_length) {
              tileV[idx] = v[vOffset + (w + local_id.y) * uniforms.N];
            }`}
        ${h?`
            if (w + local_id.y < present_sequence_length) {
          present_value[presentValueOffset + (w + local_id.y) * uniforms.N] = tileV[idx];
        }`:""}
      }
     workgroupBarrier();
     for (var k: u32 = 0u; k < TILE_SIZE && w+k < total_sequence_length; k++) {
       value += tileQ[TILE_SIZE * local_id.y + k] * tileV[TILE_SIZE * k + local_id.x];
     }
     workgroupBarrier();
   }

   // we need to transpose output from BNSH_v to BSND_v
   if (m < uniforms.M && n < uniforms.N) {
     let outputIdx = batchIdx * uniforms.M * uniforms.v_hidden_size + m * uniforms.v_hidden_size
       + headIdx * uniforms.N + n;
     output[outputIdx] = value;
   }
  }`};return{name:"AttentionScore",shaderCache:{hint:`${r!==void 0};${e}`,inputDependencies:S},getRunData:()=>({outputs:x,dispatchGroup:C,programUniforms:w}),getShaderSource:k}},hr=(e,t,i,r,a,n,s,u,l,p,c=void 0,h=void 0)=>{let m=Math.min(e.outputCount,1+(s?1:0)+(u?1:0)),_=m>1?p.pastSequenceLength:0,y=_+p.kvSequenceLength,v=l&&A.size(l.dims)>0?l:void 0,C=[t,i];m>1&&s&&A.size(s.dims)>0&&C.push(s),v&&C.push(v),c&&C.push(c),h&&C.push(h);let w=e.compute(ko(m,t,i,s,v,p,_,c,h),{inputs:C,outputs:m>1?[-1,1]:[-1]})[0];e.compute(To(w,p.batchSize,p.numHeads,_,p.sequenceLength,y,c,h),{inputs:c&&h?[w,c,h]:[w],outputs:[]});let $=[w,r];m>1&&u&&A.size(u.dims)>0&&$.push(u),c&&$.push(c),h&&$.push(h),e.compute(Io(m,w,r,u,p,_,c,h),{inputs:$,outputs:m>1?[0,2]:[0]})},Eo=(e,t)=>{let i=[t.batchSize,t.numHeads,t.sequenceLength,t.headSize],r=t.sequenceLength,a=t.inputHiddenSize,n=t.headSize,s=12,u={x:Math.ceil(t.headSize/s),y:Math.ceil(t.sequenceLength/s),z:t.batchSize*t.numHeads},l=[e.inputs[0],e.inputs[1],e.inputs[2]],p=[{type:12,data:r},{type:12,data:a},{type:12,data:n},{type:12,data:t.numHeads},{type:12,data:t.headSize},{type:12,data:t.hiddenSize},{type:12,data:t.hiddenSize+t.hiddenSize+t.vHiddenSize}],c=h=>{let m=K("output_q",l[0].dataType,i),_=K("output_k",l[0].dataType,i),y=K("output_v",l[0].dataType,i),v=M("input",l[0].dataType,l[0].dims),C=M("weight",l[1].dataType,l[1].dims),w=M("bias",l[2].dataType,l[2].dims),$=v.type.storage,S=[{name:"M",type:"u32"},{name:"K",type:"u32"},{name:"N",type:"u32"},{name:"num_heads",type:"u32"},{name:"head_size",type:"u32"},{name:"hidden_size",type:"u32"},{name:"ldb",type:"u32"}];return`
  const TILE_SIZE = ${s}u;
  var<workgroup> tileInput: array<${$}, ${s*s}>;
  var<workgroup> tileWeightQ: array<${$}, ${s*s}>;
  var<workgroup> tileWeightK: array<${$}, ${s*s}>;
  var<workgroup> tileWeightV: array<${$}, ${s*s}>;
  ${h.registerUniforms(S).declareVariables(v,C,w,m,_,y)}
  ${h.mainStart([s,s,1])}
    let batchIndex = workgroup_id.z / uniforms.num_heads;
    let headNumber = workgroup_id.z % uniforms.num_heads;
    let m = global_id.y;
    let n = global_id.x;

    let inputOffset = batchIndex * (uniforms.M * uniforms.K) + m * uniforms.K;
    let biasOffsetQ = headNumber * uniforms.head_size;
    let biasOffsetK = uniforms.hidden_size + biasOffsetQ;
    let biasOffsetV = uniforms.hidden_size + biasOffsetK;

    var valueQ = ${$}(0);
    var valueK = ${$}(0);
    var valueV = ${$}(0);
    for (var w: u32 = 0u; w < uniforms.K; w += TILE_SIZE) {
      if (m < uniforms.M && w + local_id.x < uniforms.K) {
        tileInput[TILE_SIZE * local_id.y + local_id.x] = input[inputOffset + w + local_id.x];
      }
      if (n < uniforms.N && w + local_id.y < uniforms.K) {
        let offset = n + (w + local_id.y) * uniforms.ldb;
        tileWeightQ[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetQ + offset];
        tileWeightK[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetK + offset];
        tileWeightV[TILE_SIZE * local_id.y + local_id.x] = weight[biasOffsetV + offset];
      }
      workgroupBarrier();
      for (var k: u32 = 0u; k<TILE_SIZE && w+k < uniforms.K; k++) {
        let inputTileOffset = TILE_SIZE * local_id.y + k;
        let weightTileOffset = TILE_SIZE * k + local_id.x;
        valueQ += tileInput[inputTileOffset] * tileWeightQ[weightTileOffset];
        valueK += tileInput[inputTileOffset] * tileWeightK[weightTileOffset];
        valueV += tileInput[inputTileOffset] * tileWeightV[weightTileOffset];
      }

      workgroupBarrier();
    }

    let headOffset = (m * uniforms.N + n) % uniforms.head_size;
    valueQ += bias[headOffset + biasOffsetQ];
    valueK += bias[headOffset + biasOffsetK];
    valueV += bias[headOffset + biasOffsetV];

    let offset = workgroup_id.z * uniforms.M * uniforms.N;
    if (m < uniforms.M && n < uniforms.N) {
      let outputIdx = offset + m * uniforms.N + n;
      output_q[outputIdx] = valueQ;
      output_k[outputIdx] = valueK;
      output_v[outputIdx] = valueV;
    }
  }`};return e.compute({name:"AttentionPrepare",shaderCache:{inputDependencies:["type","type","type"]},getRunData:()=>({outputs:[{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0},{dims:i,dataType:e.inputs[0].dataType,gpuDataType:0}],dispatchGroup:u,programUniforms:p}),getShaderSource:c},{inputs:l,outputs:[-1,-1,-1]})},dp=(e,t)=>{let i=So(e.inputs,t),[r,a,n]=Eo(e,i);return hr(e,r,a,n,e.inputs[4],void 0,void 0,void 0,e.inputs[5],i)}}),zo,Ao,Oo,pp,Fm=q(()=>{"use strict";We(),te(),ne(),ve(),oe(),zo=(e,t)=>{if(!e||e.length!==5)throw new Error("BatchNormalization requires 5 inputs");let i=(r,a,n)=>{let s=a.length;if(s!==r.length)throw new Error(`${n}: num dimensions != ${s}`);a.forEach((u,l)=>{if(u!==r[l])throw new Error(`${n}: dim[${l}] do not match`)})};if(e[0].dims.length>1){let r=t.format==="NHWC"?t.spatial?e[0].dims.slice(-1):e[0].dims.slice(-1).concat(e[0].dims.slice(1,e[0].dims.length-1)):e[0].dims.slice(1,t.spatial?2:void 0);i(e[1].dims,r,"Invalid input scale"),i(e[2].dims,r,"Invalid input B"),i(e[3].dims,r,"Invalid input mean"),i(e[4].dims,r,"Invalid input var")}else i(e[1].dims,[1],"Invalid input scale"),i(e[2].dims,[1],"Invalid input B"),i(e[3].dims,[1],"Invalid input mean"),i(e[4].dims,[1],"Invalid input var")},Ao=(e,t)=>{let{epsilon:i,spatial:r,format:a}=t,n=e[0].dims,s=r?$e(n[n.length-1]):1,u=a==="NHWC"&&n.length>1?s:1,l=A.size(n)/s,p=r,c=p?n.length:n,h=M("x",e[0].dataType,e[0].dims,s),m=M("scale",e[1].dataType,e[1].dims,u),_=M("bias",e[2].dataType,e[2].dims,u),y=M("inputMean",e[3].dataType,e[3].dims,u),v=M("inputVar",e[4].dataType,e[4].dims,u),C=K("y",e[0].dataType,c,s),w=()=>{let S="";if(r)S=`let cOffset = ${n.length===1?"0u":a==="NHWC"?`outputIndices[${n.length-1}] / ${s}`:"outputIndices[1]"};`;else if(a==="NCHW")S=`
            ${C.indicesSet("outputIndices","0","0")}
            let cOffset = ${C.indicesToOffset("outputIndices")};`;else{S=`var cIndices = ${m.type.indices}(0);
                       cIndices[0] = outputIndices[${n.length-1}];`;for(let x=1;x<m.rank;x++)S+=`cIndices[${x}] = outputIndices[${x}];`;S+=`let cOffset = ${m.indicesToOffset("cIndices")};`}return S},$=S=>`
  const epsilon = ${i};
  ${S.registerUniform("outputSize","u32").declareVariables(h,m,_,y,v,C)}
  ${S.mainStart()}
  ${S.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
    var outputIndices = ${C.offsetToIndices(`global_idx * ${s}`)};
    ${w()}
    let scale = ${m.getByOffset("cOffset")};
    let bias = ${_.getByOffset("cOffset")};
    let inputMean = ${y.getByOffset("cOffset")};
    let inputVar = ${v.getByOffset("cOffset")};
    let x = ${h.getByOffset("global_idx")};
    let value = (x - inputMean) * inverseSqrt(inputVar + epsilon) * scale + bias;
    ${C.setByOffset("global_idx","value")}
  }`;return{name:"BatchNormalization",shaderCache:{hint:`${t.epsilon}_${t.format}_${r}_${s}`,inputDependencies:p?["rank","type","type","type","type"]:void 0},getShaderSource:$,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p?[{type:12,data:l},...Q(n)]:[{type:12,data:l}]})}},Oo=e=>he(e),pp=(e,t)=>{let{inputs:i,outputCount:r}=e,a=Oo({...t,outputCount:r});if(ge.webgpu.validateInputContent&&zo(i,a),t.trainingMode)throw new Error("BatchNormalization trainingMode is not supported yet.");e.compute(Ao(i,a))}}),Ro,Bo,cp,Gm=q(()=>{"use strict";ne(),oe(),Ro=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![320,640,1280].includes(e[0].dims[2]))throw new Error("number of channels should be 320, 640 or 1280");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},Bo=e=>{let t=e[0].dims,i=e[0].dims[2],r=A.size(t)/4,a=e[0].dataType,n=M("input",a,t,4),s=M("bias",a,[i],4),u=M("residual",a,t,4),l=K("output",a,t,4);return{name:"BiasAdd",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(r/64)}}),getShaderSource:p=>`
  const channels = ${i}u / 4;
  ${p.declareVariables(n,s,u,l)}

  ${p.mainStart()}
    ${p.guardAgainstOutOfBoundsWorkgroupSizes(r)}
    let value = ${n.getByOffset("global_idx")}
      + ${s.getByOffset("global_idx % channels")} + ${u.getByOffset("global_idx")};
    ${l.setByOffset("global_idx","value")}
  }`}},cp=e=>{Ro(e.inputs),e.compute(Bo(e.inputs))}}),Mo,ce,fp,hp,mp,gp,yp,_p,wp,bp,$p,No,vp,xp,Cp,Sp,dr,Tp,qr,kp,Ip,Ep,zp,Ap,Op,Rp,Bp,Mp,Np,Dp,Pp,Up,qp,Wp,Lp,ji,Vp,Ta,ka,jp,Fp,Gp,Do,Po,Hp,Xa=q(()=>{"use strict";te(),ne(),ve(),oe(),Mo=(e,t,i,r,a,n,s)=>{let u=Math.ceil(t/4),l="";typeof a=="string"?l=`${a}(a)`:l=a("a");let p=M("inputData",i,[u],4),c=K("outputData",r,[u],4),h=[{name:"vec_size",type:"u32"}];return s&&h.push(...s),`
      ${e.registerUniforms(h).declareVariables(p,c)}

  ${n??""}

  ${e.mainStart()}
    ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}

    let a = ${p.getByOffset("global_idx")};
    ${c.setByOffset("global_idx",l)}
  }`},ce=(e,t,i,r,a,n=e.dataType,s,u)=>{let l=[{type:12,data:Math.ceil(A.size(e.dims)/4)}];return s&&l.push(...s),{name:t,shaderCache:{hint:a,inputDependencies:["type"]},getShaderSource:p=>Mo(p,A.size(e.dims),e.dataType,n,i,r,u),getRunData:p=>({outputs:[{dims:e.dims,dataType:n}],dispatchGroup:{x:Math.ceil(A.size(p[0].dims)/64/4)},programUniforms:l})}},fp=e=>{e.compute(ce(e.inputs[0],"Abs","abs"))},hp=e=>{e.compute(ce(e.inputs[0],"Acos","acos"))},mp=e=>{e.compute(ce(e.inputs[0],"Acosh","acosh"))},gp=e=>{e.compute(ce(e.inputs[0],"Asin","asin"))},yp=e=>{e.compute(ce(e.inputs[0],"Asinh","asinh"))},_p=e=>{e.compute(ce(e.inputs[0],"Atan","atan"))},wp=e=>{e.compute(ce(e.inputs[0],"Atanh","atanh"))},bp=e=>he(e),$p=(e,t)=>{let i;switch(t.to){case 10:i="vec4<f16>";break;case 1:i="vec4<f32>";break;case 12:i="vec4<u32>";break;case 6:i="vec4<i32>";break;case 9:i="vec4<bool>";break;default:throw new RangeError(`not supported type (specified in attribute 'to' from 'Cast' operator): ${t.to}`)}e.compute(ce(e.inputs[0],"Cast",i,void 0,t.cacheKey,t.to))},No=e=>{let t,i,r=e.length>=2&&e[1].data!==0,a=e.length>=3&&e[2].data!==0;switch(e[0].dataType){case 1:t=r?e[1].getFloat32Array()[0]:-34028234663852886e22,i=a?e[2].getFloat32Array()[0]:34028234663852886e22;break;case 10:t=r?e[1].getUint16Array()[0]:64511,i=a?e[2].getUint16Array()[0]:31743;break;default:throw new Error("Unsupport data type")}return he({min:t,max:i})},vp=(e,t)=>{let i=t||No(e.inputs),r=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Clip",a=>`clamp(${a}, vec4<${r}>(uniforms.min), vec4<${r}>(uniforms.max))`,void 0,i.cacheKey,void 0,[{type:e.inputs[0].dataType,data:i.min},{type:e.inputs[0].dataType,data:i.max}],[{name:"min",type:r},{name:"max",type:r}]),{inputs:[0]})},xp=e=>{e.compute(ce(e.inputs[0],"Ceil","ceil"))},Cp=e=>{e.compute(ce(e.inputs[0],"Cos","cos"))},Sp=e=>{e.compute(ce(e.inputs[0],"Cosh","cosh"))},dr=e=>he(e),Tp=(e,t)=>{let i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Elu",r=>`elu_vf32(${r})`,`
  const elu_alpha_ = ${i}(${t.alpha});

  fn elu_f32(a: ${i}) -> ${i} {
  return select((exp(a) - 1.0) * elu_alpha_, a, a >= 0.0);
  }

  fn elu_vf32(v: vec4<${i}>) -> vec4<${i}> {
  return vec4(elu_f32(v.x), elu_f32(v.y), elu_f32(v.z), elu_f32(v.w));
  }`,t.cacheKey))},qr=(e="f32")=>`
const r0: ${e} = 0.3275911;
const r1: ${e} = 0.254829592;
const r2: ${e} = -0.284496736;
const r3: ${e} = 1.421413741;
const r4: ${e} = -1.453152027;
const r5: ${e} = 1.061405429;

fn erf_vf32(v: vec4<${e}>) -> vec4<${e}> {
  let absv = abs(v);
  let x = 1.0 / (1.0 + r0 * absv);
  return sign(v) * (1.0 - ((((r5 * x + r4) * x + r3) * x + r2) * x + r1) * x * exp(-absv * absv));
}`,kp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Erf",i=>`erf_vf32(${i})`,qr(t)))},Ip=e=>{e.compute(ce(e.inputs[0],"Exp","exp"))},Ep=e=>{e.compute(ce(e.inputs[0],"Floor","floor"))},zp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Gelu",i=>`0.5 * ${i} * (1.0 + erf_vf32(${i} * 0.7071067811865475))`,qr(t)))},Ap=(e,t)=>{let i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"LeakyRelu",r=>`select(leaky_relu_alpha_ * ${r}, ${r}, ${r} >= vec4<${i}>(0.0))`,`const leaky_relu_alpha_ = ${i}(${t.alpha});`,t.cacheKey))},Op=e=>{e.compute(ce(e.inputs[0],"Not",t=>`!${t}`))},Rp=e=>{e.compute(ce(e.inputs[0],"Neg",t=>`-${t}`))},Bp=e=>{e.compute(ce(e.inputs[0],"Reciprocal",t=>`1.0/${t}`))},Mp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"Relu",i=>`select(vec4<${t}>(0.0), ${i}, ${i} > vec4<${t}>(0.0))`))},Np=e=>{e.compute(ce(e.inputs[0],"Sigmoid",t=>`(1.0 / (1.0 + exp(-${t})))`))},Dp=e=>he(e),Pp=(e,t)=>{let i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"HardSigmoid",r=>`max(vec4<${i}>(0.0), min(vec4<${i}>(1.0), ${t.alpha} * ${r} + vec4<${i}>(${t.beta})))`,void 0,t.cacheKey))},Up=e=>{e.compute(ce(e.inputs[0],"Sin","sin"))},qp=e=>{e.compute(ce(e.inputs[0],"Sinh","sinh"))},Wp=e=>{e.compute(ce(e.inputs[0],"Sqrt","sqrt"))},Lp=e=>{e.compute(ce(e.inputs[0],"Tan","tan"))},ji=e=>`sign(${e}) * (1 - exp(-2 * abs(${e}))) / (1 + exp(-2 * abs(${e})))`,Vp=e=>{e.compute(ce(e.inputs[0],"Tanh",ji))},Ta=(e="f32")=>`
const fast_gelu_a: ${e} = 0.5;
const fast_gelu_b: ${e} = 0.7978845608028654;
const fast_gelu_c: ${e} = 0.035677408136300125;

fn tanh_v(v: vec4<${e}>) -> vec4<${e}> {
  return ${ji("v")};
}
`,ka=e=>`(fast_gelu_a + fast_gelu_a * tanh_v(${e} * (fast_gelu_c * ${e} * ${e} + fast_gelu_b))) * ${e}`,jp=e=>{let t=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"FastGelu",ka,Ta(t),void 0,e.inputs[0].dataType))},Fp=(e,t)=>{let i=Ee(e.inputs[0].dataType);return e.compute(ce(e.inputs[0],"ThresholdedRelu",r=>`select(vec4<${i}>(0.0), ${r}, ${r} > thresholded_relu_alpha_)`,`const thresholded_relu_alpha_ = vec4<${i}>(${t.alpha});`,t.cacheKey)),0},Gp=e=>{e.compute(ce(e.inputs[0],"Log","log"))},Do=(e,t)=>`
const alpha = vec4<${e}>(${t});
const one = ${e}(1.0);
const zero = ${e}(0.0);

fn quick_gelu_impl(x: vec4<${e}>) -> vec4<${e}> {
  let v = x *alpha;
  var x1 : vec4<${e}>;
  for (var i = 0; i < 4; i = i + 1) {
    if (v[i] >= zero) {
      x1[i] = one / (one + exp(-v[i]));
    } else {
      x1[i] = one - one / (one + exp(v[i]));
    }
  }
  return x * x1;
}
`,Po=e=>`quick_gelu_impl(${e})`,Hp=(e,t)=>{let i=Ee(e.inputs[0].dataType);e.compute(ce(e.inputs[0],"QuickGelu",Po,Do(i,t.alpha),t.cacheKey,e.inputs[0].dataType))}}),Uo,qo,Kp,Hm=q(()=>{"use strict";ne(),oe(),Xa(),Uo=e=>{if(e[0].dims.length!==3)throw new Error("input should have 3 dimensions");if(![2560,5120,10240].includes(e[0].dims[2]))throw new Error("hidden state should be 2560, 5120 or 10240");if(e[1].dims.length!==1)throw new Error("bias is expected to have 1 dimensions");if(e[0].dims[2]!==e[1].dims[0])throw new Error("last dimension of input and bias are not the same")},qo=e=>{let t=e[0].dims.slice();t[2]=t[2]/2;let i=M("input",e[0].dataType,e[0].dims,4),r=M("bias",e[0].dataType,[e[0].dims[2]],4),a=K("output",e[0].dataType,t,4),n=A.size(t)/4,s=Te(e[0].dataType);return{name:"BiasSplitGelu",getRunData:()=>({outputs:[{dims:t,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)}}),getShaderSource:u=>`
  const M_SQRT2 = sqrt(2.0);
  const halfChannels = ${e[0].dims[2]/4/2}u;

  ${u.declareVariables(i,r,a)}

  ${qr(s)}

  ${u.mainStart()}
    ${u.guardAgainstOutOfBoundsWorkgroupSizes(n)}
    let biasIdx = global_idx % halfChannels;
    let batchIndex = global_idx / halfChannels;
    let inputOffset = biasIdx + batchIndex * halfChannels * 2;
    let valueLeft = input[inputOffset] + bias[biasIdx];
    let valueRight = input[inputOffset + halfChannels] + bias[biasIdx + halfChannels];
    let geluRight = valueRight * 0.5 * (erf_vf32(valueRight / M_SQRT2) + 1);

    ${a.setByOffset("global_idx","valueLeft * geluRight")}
  }`}},Kp=e=>{Uo(e.inputs),e.compute(qo(e.inputs))}}),Wo,Lo,Ge,Zp,Xp,Yp,Qp,Jp,ec,tc,rc,ic,ac,Km=q(()=>{"use strict";te(),ne(),oe(),Wo=(e,t,i,r,a,n,s,u,l,p,c,h)=>{let m,_;typeof u=="string"?m=_=($,S)=>`${u}((${$}),(${S}))`:typeof u=="function"?m=_=u:(m=u.scalar,_=u.vector);let y=K("outputData",c,r.length,4),v=M("aData",l,t.length,4),C=M("bData",p,i.length,4),w;if(a)if(n){let $=A.size(t)===1,S=A.size(i)===1,x=t.length>0&&t[t.length-1]%4===0,k=i.length>0&&i[i.length-1]%4===0;$||S?w=y.setByOffset("global_idx",_($?`${v.type.value}(${v.getByOffset("0")}.x)`:v.getByOffset("global_idx"),S?`${C.type.value}(${C.getByOffset("0")}.x)`:C.getByOffset("global_idx"))):w=`
            let outputIndices = ${y.offsetToIndices("global_idx * 4u")};
            let offsetA = ${v.broadcastedIndicesToOffset("outputIndices",y)};
            let offsetB = ${C.broadcastedIndicesToOffset("outputIndices",y)};
            ${y.setByOffset("global_idx",_(s||x?v.getByOffset("offsetA / 4u"):`${v.type.value}(${v.getByOffset("offsetA / 4u")}[offsetA % 4u])`,s||k?C.getByOffset("offsetB / 4u"):`${C.type.value}(${C.getByOffset("offsetB / 4u")}[offsetB % 4u])`))}
          `}else w=y.setByOffset("global_idx",_(v.getByOffset("global_idx"),C.getByOffset("global_idx")));else{if(!n)throw new Error("no necessary to use scalar implementation for element-wise binary op implementation.");let $=(S,x,k="")=>{let I=`aData[indexA${x}][componentA${x}]`,z=`bData[indexB${x}][componentB${x}]`;return`
            let outputIndices${x} = ${y.offsetToIndices(`global_idx * 4u + ${x}u`)};
            let offsetA${x} = ${v.broadcastedIndicesToOffset(`outputIndices${x}`,y)};
            let offsetB${x} = ${C.broadcastedIndicesToOffset(`outputIndices${x}`,y)};
            let indexA${x} = offsetA${x} / 4u;
            let indexB${x} = offsetB${x} / 4u;
            let componentA${x} = offsetA${x} % 4u;
            let componentB${x} = offsetB${x} % 4u;
            ${S}[${x}] = ${k}(${m(I,z)});
          `};c===9?w=`
            var data = vec4<u32>(0);
            ${$("data",0,"u32")}
            ${$("data",1,"u32")}
            ${$("data",2,"u32")}
            ${$("data",3,"u32")}
            outputData[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:w=`
            ${$("outputData[global_idx]",0)}
            ${$("outputData[global_idx]",1)}
            ${$("outputData[global_idx]",2)}
            ${$("outputData[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(v,C,y)}

        ${h??""}

        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${w}
      }`},Lo=(e,t,i,r,a,n,s=i.dataType)=>{let u=i.dims.map(v=>Number(v)??1),l=r.dims.map(v=>Number(v)??1),p=!A.areEqual(u,l),c=u,h=A.size(u),m=!1,_=!1,y=[p];if(p){let v=Vt.calcShape(u,l,!1);if(!v)throw new Error("Can't perform binary op on the given tensors");c=v.slice(),h=A.size(c);let C=A.size(u)===1,w=A.size(l)===1,$=u.length>0&&u[u.length-1]%4===0,S=l.length>0&&l[l.length-1]%4===0;y.push(C),y.push(w),y.push($),y.push(S);let x=1;for(let k=1;k<c.length;k++){let I=u[u.length-k],z=l[l.length-k];if(I===z)x*=I;else break}x%4===0?(_=!0,m=!0):(C||w||$||S)&&(m=!0)}else m=!0;return y.push(m),{name:e,shaderCache:{hint:t+y.map(v=>v.toString()).join("_"),inputDependencies:["rank","rank"]},getShaderSource:v=>Wo(v,u,l,c,m,p,_,a,i.dataType,r.dataType,s,n),getRunData:()=>({outputs:[{dims:c,dataType:s}],dispatchGroup:{x:Math.ceil(h/64/4)},programUniforms:[{type:12,data:Math.ceil(A.size(c)/4)},...Q(u,l,c)]})}},Ge=(e,t,i,r,a,n)=>{e.compute(Lo(t,a??"",e.inputs[0],e.inputs[1],i,r,n))},Zp=e=>{Ge(e,"Add",(t,i)=>`${t}+${i}`)},Xp=e=>{Ge(e,"Div",(t,i)=>`${t}/${i}`)},Yp=e=>{Ge(e,"Equal",{scalar:(t,i)=>`u32(${t}==${i})`,vector:(t,i)=>`vec4<u32>(${t}==${i})`},void 0,void 0,9)},Qp=e=>{Ge(e,"Mul",(t,i)=>`${t}*${i}`)},Jp=e=>{let t=M("input",e.inputs[0].dataType,e.inputs[0].dims).type.value;Ge(e,"Pow",{scalar:(i,r)=>`pow_custom(${i},${r})`,vector:(i,r)=>`pow_vector_custom(${i},${r})`},`
    fn pow_custom(a : ${t}, b : ${t}) -> ${t} {
      if (b == ${t}(0.0)) {
        return ${t}(1.0);
      } else if (a < ${t}(0.0) && f32(b) != floor(f32(b))) {
        return ${t}(pow(f32(a), f32(b))); // NaN
      }
      return select(sign(a), ${t}(1.0), round(f32(abs(b) % ${t}(2.0))) != 1.0) * ${t}(${t==="i32"?"round":""}(pow(f32(abs(a)), f32(b))));
    }
    fn pow_vector_custom(a : vec4<${t}>, b : vec4<${t}>) -> vec4<${t}> {
      // TODO: implement vectorized pow
      return vec4<${t}>(pow_custom(a.x, b.x), pow_custom(a.y, b.y), pow_custom(a.z, b.z), pow_custom(a.w, b.w));
    }
      `)},ec=e=>{Ge(e,"Sub",(t,i)=>`${t}-${i}`)},tc=e=>{Ge(e,"Greater",{scalar:(t,i)=>`u32(${t}>${i})`,vector:(t,i)=>`vec4<u32>(${t}>${i})`},void 0,void 0,9)},rc=e=>{Ge(e,"Less",{scalar:(t,i)=>`u32(${t}<${i})`,vector:(t,i)=>`vec4<u32>(${t}<${i})`},void 0,void 0,9)},ic=e=>{Ge(e,"GreaterOrEqual",{scalar:(t,i)=>`u32(${t}>=${i})`,vector:(t,i)=>`vec4<u32>(${t}>=${i})`},void 0,void 0,9)},ac=e=>{Ge(e,"LessOrEqual",{scalar:(t,i)=>`u32(${t}<=${i})`,vector:(t,i)=>`vec4<u32>(${t}<=${i})`},void 0,void 0,9)}}),Vo,jo,Fo,Go,nc,sc,Zm=q(()=>{"use strict";te(),ne(),ve(),oe(),Vo=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");let i=0,r=e[i],a=r.dataType,n=r.dims.length;e.forEach((s,u)=>{if(u!==i){if(s.dataType!==a)throw new Error("input tensors should be one type");if(s.dims.length!==n)throw new Error("input tensors should have the same shape");s.dims.forEach((l,p)=>{if(p!==t&&l!==r.dims[p])throw new Error("non concat dimensions must match")})}})},jo=(e,t)=>`
  fn calculateInputIndex(index: u32) -> u32 {
    let sizeInConcatAxis = array<u32, ${e}u>(${t});
    for (var i: u32 = 0u; i < ${e}; i += 1u ) {
      if (index < sizeInConcatAxis[i]) {
        return i;
      }
    }
    return ${e}u;
  }`,Fo=(e,t)=>{let i=e.length,r=[];for(let a=0;a<i;++a){let n=t.setByOffset("global_idx",e[a].getByIndices("indices"));i===1?r.push(n):a===0?r.push(`if (inputIndex == ${a}u) { ${n} }`):a===i-1?r.push(`else { ${n} }`):r.push(`else if (inputIndex == ${a}) { ${n} }`)}return r.join(`
`)},Go=(e,t,i,r)=>{let a=A.size(i),n=new Array(e.length),s=new Array(e.length),u=0,l=[],p=[],c=[{type:12,data:a}];for(let v=0;v<e.length;++v)u+=e[v].dims[t],n[v]=u,p.push(e[v].dims.length),s[v]=M(`input${v}`,r,p[v]),l.push("rank"),c.push({type:12,data:n[v]});for(let v=0;v<e.length;++v)c.push(...Q(e[v].dims));c.push(...Q(i));let h=K("output",r,i.length),m=h.indicesGet("indices",t),_=Array.from(Array(n.length).keys()).map(v=>`uniforms.sizeInConcatAxis${v}`).join(","),y=v=>`

  ${(()=>{v.registerUniform("outputSize","u32");for(let C=0;C<e.length;C++)v.registerUniform(`sizeInConcatAxis${C}`,"u32");return v.declareVariables(...s,h)})()}

  ${jo(n.length,_)}

  ${v.mainStart()}
    ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

    var indices = ${h.offsetToIndices("global_idx")};

    let inputIndex = calculateInputIndex(${m});
    if (inputIndex != 0u) {
      let sizeInConcatAxis = array<u32, ${n.length}u>(${_});
      ${m} -= sizeInConcatAxis[inputIndex - 1u];
    }

    ${Fo(s,h)}
  }`;return{name:"Concat",shaderCache:{hint:`${t}`,inputDependencies:l},getRunData:()=>({outputs:[{dims:i,dataType:r}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:c}),getShaderSource:y}},nc=(e,t)=>{let i=e.inputs,r=i[0].dims,a=A.normalizeAxis(t.axis,r.length);Vo(i,a);let n=r.slice();n[a]=i.reduce((u,l)=>u+(l.dims.length>a?l.dims[a]:0),0);let s=i.filter(u=>A.size(u.dims)>0);e.compute(Go(s,a,n,i[0].dataType),{inputs:s})},sc=e=>he({axis:e.axis})}),Ot,Rt,Bt,Ya,Nt=q(()=>{"use strict";te(),ne(),Ot=(e,t,i="f32")=>{switch(e.activation){case"Relu":return`value = max(value, ${t}(0.0));`;case"Sigmoid":return`value = (${t}(1.0) / (${t}(1.0) + exp(-value)));`;case"Clip":return`value = clamp(value, ${t}(${i}(uniforms.clip_min)), ${t}(${i}(uniforms.clip_max)));`;case"HardSigmoid":return`value = max(${t}(0.0), min(${t}(1.0), ${i}(uniforms.alpha) * value + ${i}(uniforms.beta)));`;case"LeakyRelu":return`value = select(${i}(uniforms.alpha) * value, value, value >= ${t}(0.0));`;case"Tanh":return`let e2x = exp(-2.0 * abs(value));
              value = sign(value) * (1.0 - e2x) / (1.0 + e2x);
        `;case"":return"";default:throw new Error(`Unsupported activation ${e.activation}`)}},Rt=(e,t)=>{e.activation==="Clip"?t.push({type:1,data:e.clipMax},{type:1,data:e.clipMin}):e.activation==="HardSigmoid"?t.push({type:1,data:e.alpha},{type:1,data:e.beta}):e.activation==="LeakyRelu"&&t.push({type:1,data:e.alpha})},Bt=(e,t)=>{e.activation==="Clip"?t.push({name:"clip_max",type:"f32"},{name:"clip_min",type:"f32"}):e.activation==="HardSigmoid"?t.push({name:"alpha",type:"f32"},{name:"beta",type:"f32"}):e.activation==="LeakyRelu"&&t.push({name:"alpha",type:"f32"})},Ya=e=>{let t=e?.activation||"";if(t==="HardSigmoid"){let[i,r]=e?.activation_params||[.2,.5];return{activation:t,alpha:i,beta:r}}else if(t==="Clip"){let[i,r]=e?.activation_params||[Od,Rd];return{activation:t,clipMax:r,clipMin:i}}else if(t==="LeakyRelu"){let[i]=e?.activation_params||[.01];return{activation:t,alpha:i}}return{activation:t}}}),Ie,oc,Qa=q(()=>{"use strict";Ie=(e,t)=>{switch(e){case 1:return t;case 2:return`vec2<${t}>`;case 3:return`vec3<${t}>`;case 4:return`vec4<${t}>`;default:throw new Error(`${e}-component is not supported.`)}},oc=e=>`
      ${e?"value = value + getBiasByOutputCoords(coords);":""}
      `}),uc,Xm=q(()=>{"use strict";uc=e=>`
fn getIndexFromCoords4D(coords : vec4<i32>, shape : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
      shape.y * shape.z * shape.w, shape.z * shape.w, shape.w, 1));
}
fn getOutputIndexFromCoords(coords : vec4<i32>) -> i32 {
  return dot(coords, vec4<i32>(
    i32(${e}.x), i32(${e}.y), i32(${e}.z), 1));
}
`}),cr,Ja,en=q(()=>{"use strict";te(),ne(),oe(),Nt(),cr=(e,t,i,r,a)=>{let n=r-i;return`
      ${Array.from({length:i}).map((s,u)=>`
      if (${Y(t.shape,u,t.rank)} != 1) {
        ${t.indicesSet(e,u,Y(a,u+n,r))}
      } else {
        ${t.indicesSet(e,u,0)}
      }`).join("")}
`},Ja=(e,t,i,r,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s[s.length-2],p=u[u.length-1],c=s[s.length-1],h=$e(p),m=$e(c),_=$e(l),y=A.size(i)/h/_,v=e.length>2,C=r?r.slice(0,-2):i.slice(0,-2),w=[A.size(C),l,p],$=[{type:12,data:y},{type:12,data:l},{type:12,data:p},{type:12,data:c}];Rt(t,$),$.push(...Q(C,s,u)),v&&$.push(...Q(e[2].dims)),$.push(...Q(w));let S=x=>{let k=Ha("batch_dims",e[0].dataType,C.length),I=M("a",e[0].dataType,s.length,m),z=M("b",e[1].dataType,u.length,h),R=K("output",e[0].dataType,w.length,h),D=Te(R.type.tensor),V=Ot(t,R.type.value,D),Z=[I,z],X="";if(v){let se=a?h:1;Z.push(M("bias",e[2].dataType,e[2].dims.length,se)),X=`${a?`value += bias[col / ${se}];`:`value += ${R.type.value}(bias[row + i]);`}`}let re=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"}];Bt(t,re);let j=()=>{let se=`var a_data: ${I.type.value};`;for(let J=0;J<m;J++)se+=`
              let b_data${J} = b[(b_offset + (k + ${J}) * uniforms.N + col) / ${h}];`;for(let J=0;J<_;J++){se+=`a_data = a[(a_offset + (row + ${J}) * uniforms.K + k) / ${m}];`;for(let G=0;G<m;G++)se+=`
            values[${J}] = fma(${z.type.value}(a_data${m===1?"":`[${G}]`}), b_data${G}, values[${J}]);
`}return se};return`
  ${x.registerUniforms(re).registerInternalVariables(k).declareVariables(...Z,R)}
  ${x.mainStart()}
    ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let col = (global_idx % (uniforms.N / ${h})) * ${h};
    var index1 = global_idx / (uniforms.N / ${h});
    let stride1 = uniforms.M / ${_};
    let row = (index1 % stride1) * ${_};
    let batch = index1 / stride1;

    ${i.length===2?"":`let batch_indices = ${k.offsetToIndices("batch")};`}

    var a_indices: ${I.type.indices};
    ${cr("a_indices",I,I.rank-2,k.rank,"batch_indices")}
    ${I.indicesSet("a_indices",I.rank-2,0)}
    ${I.indicesSet("a_indices",I.rank-1,0)}
    let a_offset = ${I.indicesToOffset("a_indices")};

    var b_indices: ${z.type.indices};
    ${cr("b_indices",z,z.rank-2,k.rank,"batch_indices")}
    ${z.indicesSet("b_indices",z.rank-2,0)}
    ${z.indicesSet("b_indices",z.rank-1,0)}
    let b_offset = ${z.indicesToOffset("b_indices")};
    var values: array<${R.type.value}, ${_}>;
    for (var k: u32 = 0u; k < uniforms.K; k = k + ${m}) {
      ${j()}
    }
    for (var i = 0u; i < ${_}u; i++) {
      var value = values[i];
      ${X}
      ${V}
      let cur_indices = ${R.type.indices}(batch, row + i, col);
      let offset = ${R.indicesToOffset("cur_indices")};
      ${R.setByOffset(`offset / ${h}`,"value")};
    }
  }
  `};return{name:"MatMulNaive",shaderCache:{hint:`${t.activation};${h};${m};${_};${a}`,inputDependencies:v?["rank","rank","rank"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(y/64)},programUniforms:$}),getShaderSource:S}}}),Ho,Ko,Ia,Fi,Zo,Ea,Xo,Gr,tn=q(()=>{"use strict";te(),ne(),oe(),Nt(),en(),Qa(),Ho=(e,t)=>e?`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          kStart + inputRow,
          globalRowStart / innerElementSize + inputCol${t?", batchIndices":""});
        `:`
        mm_Asub[inputRow][inputCol] = mm_readA(batch,
          globalRow + innerRow,
          kStart / innerElementSize + inputCol${t?", batchIndices":""});
        `,Ko=(e,t)=>e?`
        let ACached0 = mm_Asub[k * innerElementSize][localRow];
        let ACached1 = mm_Asub[k * innerElementSize + 1][localRow];
        let ACached2 = mm_Asub[k * innerElementSize + 2][localRow];
        ${t===3?"":"let ACached3 = mm_Asub[k * innerElementSize + 3][localRow];"}
        for (var i = 0; i < rowPerThread; i = i + 1) {
          acc[i] = BCached0 * ACached0[i] + acc[i];
          acc[i] = BCached1 * ACached1[i] + acc[i];
          acc[i] = BCached2 * ACached2[i] + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached3[i] + acc[i];"}
        }`:`
        for (var i = 0; i < rowPerThread; i = i + 1) {
          let ACached = mm_Asub[tileRow + i][k];
          acc[i] = BCached0 * ACached.x + acc[i];
          acc[i] = BCached1 * ACached.y + acc[i];
          acc[i] = BCached2 * ACached.z + acc[i];
          ${t===3?"":"acc[i] = BCached3 * ACached.w + acc[i];"}
        }`,Ia=(e,t,i="f32",r,a=!1,n=32,s=!1,u=32)=>{let l=t[1]*e[1],p=t[0]*e[0],c=a?l:n,h=a?n:l,m=c/t[0],_=n/t[1];if(!((a&&m===4&&e[1]===4||!a&&(m===3||m===4))&&c%t[0]===0&&n%t[1]===0&&e[0]===4))throw new Error(`If transposeA ${a} is true, innerElementSize ${m} and workPerThread[1] ${e[1]} must be 4.
      Otherwise, innerElementSize ${m} must be 3 or 4.
  tileAWidth ${c} must be divisible by workgroupSize[0]${t[0]}. tileInner ${n} must be divisible by workgroupSize[1] ${t[1]}. colPerThread ${e[0]} must be 4.`);return`
var<workgroup> mm_Asub: array<array<vec${m}<${i}>, ${c/m}>, ${h}>;
var<workgroup> mm_Bsub: array<array<vec4<${i}>, ${p/e[0]}>, ${n}>;

const rowPerThread = ${e[1]};
const colPerThread = ${e[0]};
const innerElementSize = ${m};
const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
  let localRow = i32(localId.y);
  let tileRow = localRow * rowPerThread;
  let tileCol = i32(localId.x);

  let globalRow =i32(globalId.y) * rowPerThread;
  let globalCol = i32(globalId.x);
  let batch = ${s?"0":"i32(globalId.z)"};
  ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
  let globalRowStart = i32(workgroupId.y) * ${l};

  let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
  var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

  var acc: array<vec4<${i}>, rowPerThread>;

  // Loop over shared dimension.
  let tileRowB = localRow * ${_};
  for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let inputRow = tileRow + innerRow;
          let inputCol = tileCol;
          ${Ho(a,r)}
      }

      // Load one tile of B into local memory.
      for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
          let inputRow = tileRowB + innerRow;
          let inputCol = tileCol;
          mm_Bsub[inputRow][inputCol] = mm_readB(batch, kStart + inputRow, globalCol${r?", batchIndices":""});
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      for (var k = 0; k < tileInner / innerElementSize; k = k + 1) {
          let BCached0 = mm_Bsub[k * innerElementSize][tileCol];
          let BCached1 = mm_Bsub[k * innerElementSize + 1][tileCol];
          let BCached2 = mm_Bsub[k * innerElementSize + 2][tileCol];
          ${m===3?"":"let BCached3 = mm_Bsub[k * innerElementSize + 3][tileCol];"}

          ${Ko(a,m)}
      }

      workgroupBarrier();
  }

  for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      mm_write(batch, globalRow + innerRow, globalCol, acc[innerRow]);
  }
}`},Fi=(e,t)=>e?`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              kStart + inputRow,
              globalRowStart + inputCol${t?", batchIndices":""});
            `:`
            mm_Asub[inputRow][inputCol] = mm_readA(batch,
              globalRowStart + inputRow,
              kStart + inputCol${t?", batchIndices":""});
            `,Zo=e=>e?"let ACached = mm_Asub[k][tileRow + innerRow];":"let ACached = mm_Asub[tileRow + innerRow][k];",Ea=(e,t,i="f32",r,a=!1,n=32,s=!1,u=32,l=!1)=>{let p=e[1]*t[1],c=e[0]*t[0],h=a?p:n,m=a?n:p;if(!(m%t[1]===0&&h%t[0]===0&&n%t[1]===0))throw new Error(`tileAHight ${m} must be divisible by workgroupSize[1]${t[1]}, tileAWidth ${h} must be divisible by workgroupSize[0]${t[0]}, tileInner ${n} must be divisible by workgroupSize[1]${t[1]}`);let _=m/t[1],y=h/t[0],v=n/t[1],C=l?`
    let localRow = i32(localId.y);
    let localCol = i32(localId.x);
    let globalRowStart = i32(workgroupId.y) * ${p};
    let globalColStart = i32(workgroupId.x) * ${c};

    // Loop over shared dimension.
    for (var t = 0; t < num_tiles; t = t + 1) {
      // Load one tile of A into local memory.
      for (var inputRow = localRow; inputRow < ${m}; inputRow = inputRow + ${t[1]}) {
        for (var inputCol = localCol; inputCol < ${h}; inputCol = inputCol + ${t[0]}) {
          ${Fi(a,r)}
        }
      }
      // Load one tile of B into local memory.
      for (var inputRow = localRow; inputRow < ${n}; inputRow = inputRow + ${t[1]}) {
            for (var inputCol = localCol; inputCol < ${c}; inputCol = inputCol + ${t[0]}) {
          mm_Bsub[inputRow][inputCol] = mm_readB(batch,
            kStart + inputRow,
            globalColStart + inputCol${r?", batchIndices":""});
        }
      }
      kStart = kStart + tileInner;
      workgroupBarrier();

      // Compute acc values for a single thread.
      var BCached : array<${i}, colPerThread>;
      for (var k = 0; k < tileInner; k = k + 1) {
        for (var inner = 0; inner < colPerThread; inner = inner + 1) {
          BCached[inner] = mm_Bsub[k][localCol + inner * ${t[0]}];
        }
        for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
          let ACached = ${a?`mm_Asub[k][localRow + innerRow * ${t[1]}];`:`mm_Asub[localRow + innerRow * ${t[1]}][k];`}
          for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
            acc[innerRow][innerCol] = acc[innerRow][innerCol] +
                ACached * BCached[innerCol];
          }
        }
      }
      workgroupBarrier();
    }
    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      let gRow = globalRowStart + localRow + innerRow * ${t[1]};
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        let gCol = globalColStart + localCol + innerCol * ${t[0]};
        mm_write(batch, gRow, gCol, acc[innerRow][innerCol]);
      }
    }
    `:`
let tileRow = i32(localId.y) * rowPerThread;
let tileCol = i32(localId.x) * colPerThread;

let globalRow = i32(globalId.y) * rowPerThread;
let globalCol = i32(globalId.x) * colPerThread;
let globalRowStart = i32(workgroupId.y) * ${p};

let tileRowA = i32(localId.y) * ${_};
let tileColA = i32(localId.x) * ${y};
let tileRowB = i32(localId.y) * ${v};
// Loop over shared dimension.
for (var t = 0; t < num_tiles; t = t + 1) {
  // Load one tile of A into local memory.
  for (var innerRow = 0; innerRow < ${_}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < ${y}; innerCol = innerCol + 1) {
      let inputRow = tileRowA + innerRow;
      let inputCol = tileColA + innerCol;
      ${Fi(a,r)}
    }
  }

  // Load one tile of B into local memory.
  for (var innerRow = 0; innerRow < ${v}; innerRow = innerRow + 1) {
    for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
      let inputRow = tileRowB + innerRow;
      let inputCol = tileCol + innerCol;
      mm_Bsub[inputRow][inputCol] = mm_readB(batch,
        kStart + inputRow,
        globalCol + innerCol${r?", batchIndices":""});
    }
  }
  kStart = kStart + tileInner;
  workgroupBarrier();

  // Compute acc values for a single thread.
  var BCached : array<${i}, colPerThread>;
  for (var k = 0; k < tileInner; k = k + 1) {
    for (var inner = 0; inner < colPerThread; inner = inner + 1) {
      BCached[inner] = mm_Bsub[k][tileCol + inner];
    }

    for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
      ${Zo(a)}
      for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
        acc[innerRow][innerCol] = acc[innerRow][innerCol] + ACached * BCached[innerCol];
      }
    }
  }

  workgroupBarrier();
}

for (var innerRow = 0; innerRow < rowPerThread; innerRow = innerRow + 1) {
  for (var innerCol = 0; innerCol < colPerThread; innerCol = innerCol + 1) {
    mm_write(batch, globalRow + innerRow, globalCol + innerCol,
        acc[innerRow][innerCol]);
  }
}
`;return`
  var<workgroup> mm_Asub : array<array<${i}, ${h}>, ${m}>;
  var<workgroup> mm_Bsub : array<array<${i}, ${c}>, ${n}>;
  const rowPerThread = ${e[1]};
  const colPerThread = ${e[0]};
  const tileInner = ${n};

@compute @workgroup_size(${t[0]}, ${t[1]}, ${t[2]})
fn main(@builtin(local_invocation_id) localId : vec3<u32>,
        @builtin(global_invocation_id) globalId : vec3<u32>,
        @builtin(workgroup_id) workgroupId : vec3<u32>) {
    let batch = ${s?"0":"i32(globalId.z)"};
    ${r?`let batchIndices = ${r.offsetToIndices("u32(batch)")};`:""}
    let num_tiles = ${s?`${Math.ceil(u/n)}`:"(uniforms.dim_inner - 1) / tileInner + 1"};
    var kStart = ${s?`i32(globalId.z) * ${u}`:"0"};

    var acc : array<array<${i}, colPerThread>, rowPerThread>;
    ${C}
  }
`},Xo=(e,t,i,r,a=!1)=>{let[n,s,u,l]=r,p=Te(r[0].type.tensor);return`
    fn mm_readA(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ie(e,p)} {
      var value = ${Ie(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_a_outer && col < uniforms.dim_inner)
      {
        var aIndices: ${s.type.indices};
        ${cr("aIndices",s,s.rank-2,n.rank,"batchIndices")}
        ${s.indicesSet("aIndices",s.rank-2,"u32(row)")}
        ${s.indicesSet("aIndices",s.rank-1,"u32(colIn)")}
        value = ${s.getByIndices("aIndices")};
      }
      return value;
    }

    fn mm_readB(batch: i32, row: i32, colIn: i32, batchIndices: ${n.type.indices}) -> ${Ie(e,p)} {
      var value = ${Ie(e,p)}(0.0);
      let col = colIn * ${e};
      if(row < uniforms.dim_inner && col < uniforms.dim_b_outer)
      {
        var bIndices: ${u.type.indices};
        ${cr("bIndices",u,u.rank-2,n.rank,"batchIndices")}
        ${u.indicesSet("bIndices",u.rank-2,"u32(row)")}
        ${u.indicesSet("bIndices",u.rank-1,"u32(colIn)")}
        value = ${u.getByIndices("bIndices")};
      }
      return value;
    }

    fn mm_write(batch: i32, row: i32, colIn: i32, valueIn: ${Ie(e,p)}) {
      let col = colIn * ${e};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer) {
        var value = valueIn;
        let coords = vec3<i32>(batch, row, colIn);
        ${t?`value = value + ${a?"bias[colIn]":`${Ie(e,p)}(bias[row])`};`:""}
        ${i}
        ${l.setByIndices("vec3<u32>(coords)","value")}
      }
    }
    `},Gr=(e,t,i,r,a=!1,n)=>{let s=e[0].dims,u=e[1].dims,l=s.slice(0,-2),p=u.slice(0,-2),c=r?r.slice(0,-2):i.slice(0,-2),h=A.size(c),m=s[s.length-2],_=s[s.length-1],y=u[u.length-1],v=_%4===0&&y%4===0,C=m<=8?[4,1,1]:[4,4,1],w=[8,8,1],$=[Math.ceil(y/w[0]/C[0]),Math.ceil(m/w[1]/C[1]),Math.ceil(h/w[2]/C[2])],S=v?4:1,x=[...l,m,_/S],k=x.length,I=[...p,_,y/S],z=I.length,R=[h,m,y/S],D=[{type:6,data:m},{type:6,data:y},{type:6,data:_}];Rt(t,D),D.push(...Q(c,x,I));let V=["rank","rank"],Z=e.length>2;Z&&(D.push(...Q(e[2].dims)),V.push("rank")),D.push(...Q(R));let X=re=>{let j=c.length,se=Ha("batchDims",e[0].dataType,j,1),J=Te(e[0].dataType),G=M("a",e[0].dataType,k,S),ae=M("b",e[1].dataType,z,S),F=K("result",e[0].dataType,R.length,S),ye=[G,ae];if(Z){let N=a?S:1;ye.push(M("bias",e[2].dataType,e[2].dims.length,N))}let U=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"}];Bt(t,U);let L=Te(F.type.tensor),ie=Ot(t,F.type.value,L),pe=Xo(S,Z,ie,[se,G,ae,F],a);return`
  ${re.registerUniforms(U).registerInternalVariables(se).declareVariables(...ye,F)}
  ${pe}
  ${v?Ia(C,w,J,se):Ea(C,w,J,se)}
                   `};return{name:"MatMul",shaderCache:{hint:`${C};${t.activation};${v};${a}`,inputDependencies:V},getRunData:()=>({outputs:[{dims:n?n(i):i,dataType:e[0].dataType}],dispatchGroup:{x:$[0],y:$[1],z:$[2]},programUniforms:D}),getShaderSource:X}}}),Yo,lc,Ym=q(()=>{"use strict";te(),ut(),oe(),Nt(),Qa(),Xm(),tn(),Yo=(e,t,i,r,a=!1,n,s=4,u=4,l=4,p="f32")=>{let c=D=>{switch(D){case 1:return"resData = x[xIndex];";case 3:return`resData = vec3<${p}>(x[xIndex], x[xIndex + 1], x[xIndex + 2]);`;case 4:return"resData = x[xIndex / 4];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},h=D=>{switch(D){case 1:return"return w[row * i32(uniforms.w_shape[3]) + colIn];";case 4:return"return w[row * i32(uniforms.w_shape[3]) / 4 + colIn];";default:throw new Error(`innerElementSize ${D} is not supported.`)}},m=e?`
    let coord = vec4<i32>(batch, xRow, xCol, xCh);
    `:`
    let coord = vec4<i32>(batch, xCh, xRow, xCol);
    `,_=e?`
    let coords = vec4<i32>(
      batch,
      row / outWidth,
      row % outWidth,
      col);
    `:`
    let coords = vec4<i32>(
      batch,
      row,
      col / outWidth,
      col % outWidth);
    `,y=e?"i32(uniforms.x_shape[1])":"i32(uniforms.x_shape[2])",v=e?"i32(uniforms.x_shape[2])":"i32(uniforms.x_shape[3])",C=e?"row":"col",w=e?"col":"row",$=`
    let inChannels = i32(uniforms.w_shape[2]);
    let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
    let outRow = ${C} / outWidth;
    let outCol = ${C} % outWidth;

    let WRow = ${w} / (i32(uniforms.w_shape[1]) * inChannels);
    let WCol = ${w} / inChannels % i32(uniforms.w_shape[1]);
    let xRow = outRow * uniforms.stride[0] + uniforms.dilation[0] * WRow - uniforms.pad[0];
    let xCol = outCol * uniforms.stride[1] + uniforms.dilation[1] * WCol - uniforms.pad[1];
    let xCh = ${w} % inChannels;
    var resData = ${Ie(s,p)}(0.0);
    // The bounds checking is always needed since we use it to pad zero for
    // the 'same' padding type.
    if (xRow >= 0 && xRow < ${y} && xCol >= 0 && xCol < ${v}) {
      ${m}
      let xIndex = getIndexFromCoords4D(coord, vec4<i32>(uniforms.x_shape));
      ${c(s)}
    }
    return resData;`,S=e?t&&r?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_a_outer && col < uniforms.dim_inner) {
      ${$}
    }
    return ${Ie(s,p)}(0.0);`:r&&i?`
    let col = colIn * ${s};
    ${$}`:`
    let col = colIn * ${s};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${$}
    }
    return ${Ie(s,p)}(0.0);`,x=e?r&&i?h(u):`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_b_outer) {
      ${h(u)}
    }
    return ${Ie(u,p)}(0.0);`:`
    let col = colIn * ${u};
    if (row < uniforms.dim_inner && col < uniforms.dim_a_outer) {
      ${h(u)}
    }
    return ${Ie(u,p)}(0.0);`,k=Ie(l,p),I=Ie(e?s:u,p),z=Ie(e?u:s,p),R=Ot(n,k,p);return`
    fn mm_readA(batch: i32, row : i32, colIn : i32) -> ${I} {
      ${e?S:x}
    }

    fn mm_readB(batch: i32, row : i32, colIn : i32) -> ${z} {
      ${e?x:S}
    }

    fn mm_write(batch: i32, row : i32, colIn : i32, valueIn : ${k}) {
      let col = colIn * ${l};
      if (row < uniforms.dim_a_outer && col < uniforms.dim_b_outer)
      {
      var value = valueIn;
      let outWidth = ${e?"i32(uniforms.result_shape[2])":"i32(uniforms.result_shape[3])"};
      ${_}
      ${oc(a)}
      ${R}
      setOutputAtCoords(coords[0], coords[1], coords[2], coords[3], value);
      }
    }`},lc=(e,t,i,r,a,n,s,u,l)=>{let p=t.format==="NHWC",c=p?e[0].dims[3]:e[0].dims[1],h=i[0],m=p?i[2]:i[3],_=p?i[1]:i[2],y=p?i[3]:i[1],v=p&&(c%4===0||c%3===0)&&y%4===0,C=p?y:m*_,w=p?m*_:y,$=[8,8,1],S=r<=8?[4,1,1]:[4,4,1],x=[Math.ceil(C/$[0]/S[0]),Math.ceil(w/$[1]/S[1]),Math.ceil(h/$[2]/S[2])];de("verbose",()=>`[conv2d_mm_webgpu] dispatch = ${x}`);let k=v?p&&c%4!==0?3:4:1,I=$[1]*S[1],z=$[0]*S[0],R=Math.max($[0]*k,$[1]),D=r%I===0,V=a%z===0,Z=n%R===0,X=v?[k,4,4]:[1,1,1],re=[{type:6,data:r},{type:6,data:a},{type:6,data:n},{type:6,data:[t.pads[0],t.pads[1]]},{type:6,data:t.strides},{type:6,data:t.dilations}];Rt(t,re),re.push(...Q(e[0].dims,e[1].dims));let j=["rank","rank"];s&&(re.push(...Q(e[2].dims)),j.push("rank")),re.push(...Q(i));let se=J=>{let G=[{name:"dim_a_outer",type:"i32"},{name:"dim_b_outer",type:"i32"},{name:"dim_inner",type:"i32"},{name:"pad",type:"i32",length:2},{name:"stride",type:"i32",length:2},{name:"dilation",type:"i32",length:2}];Bt(t,G);let ae=v?4:1,F=Te(e[0].dataType),ye=`
      fn setOutputAtIndex(flatIndex : i32, value : ${v?`vec4<${F}>`:F}) {
        result[flatIndex] = ${v?`vec4<${F}>`:F}(value);
      }
      fn setOutputAtCoords(d0 : i32, d1 : i32, d2 : i32, d3 : i32, value : ${v?`vec4<${F}>`:F}) {
        let flatIndex = getOutputIndexFromCoords(vec4<i32>(d0, d1, d2, d3));
        setOutputAtIndex(flatIndex ${v?"/ 4":""}, value);
      }`,U=M("x",e[0].dataType,e[0].dims.length,k===3?1:k),L=M("w",e[1].dataType,e[1].dims.length,ae),ie=[U,L],pe=K("result",e[0].dataType,i.length,ae);if(s){let N=M("bias",e[2].dataType,e[2].dims.length,ae);ie.push(N),ye+=`
        fn getBiasByOutputCoords(coords : vec4<i32>) -> ${v?`vec4<${F}>`:F} {
          return bias[coords.${p?"w":"y"}${v?"/ 4":""}];
        }`}return`
        ${uc("uniforms.result_strides")}
        //struct Uniforms { xShape : vec4<i32>, wShape : vec4<i32>, outShape : vec4<i32>,
        //  outShapeStrides: vec3<i32>, filterDims : vec2<i32>, pad : vec2<i32>, stride : vec2<i32>,
        //  dilation : vec2<i32>, dimAOuter : i32, dimBOuter : i32, dimInner : i32 };
        ${J.registerUniforms(G).declareVariables(...ie,pe)}
        ${ye}
        ${Yo(p,D,V,Z,s,t,X[0],X[1],X[2],F)}
        ${v?Ia(S,$,F,void 0,!p,R):Ea(S,$,F,void 0,!p,R,!1,void 0,u)}`};return{name:"Conv2DMatMul",shaderCache:{hint:`${t.cacheKey};${k};${v};${D};${V};${Z};${I};${z};${R}`,inputDependencies:j},getRunData:()=>({outputs:[{dims:l?l(i):i,dataType:e[0].dataType}],dispatchGroup:{x:x[0],y:x[1],z:x[2]},programUniforms:re}),getShaderSource:se}}}),Qo,Gi,rr,Jo,Hi,eu,dc,pc,Qm=q(()=>{"use strict";te(),ut(),ne(),oe(),Nt(),Qa(),Qo=e=>{let t=1;for(let i=0;i<e.length;i++)t*=e[i];return t},Gi=e=>typeof e=="number"?[e,e,e]:e,rr=(e,t)=>t<=1?e:e+(e-1)*(t-1),Jo=(e,t,i,r=1)=>{let a=rr(t,r);return Math.floor((e[0]*(i-1)-i+a)/2)},Hi=(e,t,i,r,a)=>{a==null&&(a=Jo(e,t[0],r[0]));let n=[0,0,0,i];for(let s=0;s<3;s++)e[s]+2*a>=t[s]&&(n[s]=Math.trunc((e[s]-t[s]+2*a)/r[s]+1));return n},eu=(e,t,i,r,a,n,s,u,l,p)=>{let c,h,m,_;if(e==="VALID"&&(e=0),typeof e=="number"){c={top:e,bottom:e,left:e,right:e,front:e,back:e};let y=Hi([t,i,r,1],[u,l,p],1,[a,n,s],e);h=y[0],m=y[1],_=y[2]}else if(Array.isArray(e)){if(!e.every((v,C,w)=>v===w[0]))throw Error(`Unsupported padding parameter: ${e}`);c={top:e[0],bottom:e[1],left:e[2],right:e[3],front:e[4],back:e[5]};let y=Hi([t,i,r,1],[u,l,p],1,[a,n,s],e[0]);h=y[0],m=y[1],_=y[2]}else if(e==="SAME_UPPER"){h=Math.ceil(t/a),m=Math.ceil(i/n),_=Math.ceil(r/s);let y=(h-1)*a+u-t,v=(m-1)*n+l-i,C=(_-1)*s+p-r,w=Math.floor(y/2),$=y-w,S=Math.floor(v/2),x=v-S,k=Math.floor(C/2),I=C-k;c={top:S,bottom:x,left:k,right:I,front:w,back:$}}else throw Error(`Unknown padding parameter: ${e}`);return{padInfo:c,outDepth:h,outHeight:m,outWidth:_}},dc=(e,t,i,r,a,n=!1,s="channelsLast")=>{let u,l,p,c,h;if(s==="channelsLast")[u,l,p,c,h]=e;else if(s==="channelsFirst")[u,h,l,p,c]=e;else throw new Error(`Unknown dataFormat ${s}`);let[m,,_,y,v]=t,[C,w,$]=Gi(i),[S,x,k]=Gi(r),I=rr(_,S),z=rr(y,x),R=rr(v,k),{padInfo:D,outDepth:V,outHeight:Z,outWidth:X}=eu(a,l,p,c,C,w,$,I,z,R),re=n?m*h:m,j=[0,0,0,0,0];return s==="channelsFirst"?j=[u,re,V,Z,X]:s==="channelsLast"&&(j=[u,V,Z,X,re]),{batchSize:u,dataFormat:s,inDepth:l,inHeight:p,inWidth:c,inChannels:h,outDepth:V,outHeight:Z,outWidth:X,outChannels:re,padInfo:D,strideDepth:C,strideHeight:w,strideWidth:$,filterDepth:_,filterHeight:y,filterWidth:v,effectiveFilterDepth:I,effectiveFilterHeight:z,effectiveFilterWidth:R,dilationDepth:S,dilationHeight:x,dilationWidth:k,inShape:e,outShape:j,filterShape:t}},pc=(e,t,i,r,a,n)=>{let s=n==="channelsLast",u=s?e[0].dims[3]:e[0].dims[1],l=!1,p=[64,1,1],c={x:i.map(($,S)=>S)},h=[Math.ceil(Qo(c.x.map($=>i[$]))/p[0]),1,1];de("verbose",()=>`[conv3d_naive_webgpu] dispatch = ${h}`);let m=l?s&&u%4!==0?3:4:1,_=A.size(i),y=[{type:12,data:_},{type:12,data:r},{type:12,data:a},{type:12,data:t.strides},{type:12,data:t.dilations}];Rt(t,y),y.push(...Q(e[0].dims,e[1].dims));let v=["rank","rank"],C=e.length===3;C&&(y.push(...Q(e[2].dims)),v.push("rank")),y.push(...Q(i));let w=$=>{let S=[{name:"output_size",type:"u32"},{name:"filter_dims",type:"u32",length:r.length},{name:"pads",type:"u32",length:a.length},{name:"strides",type:"u32",length:t.strides.length},{name:"dilations",type:"u32",length:t.dilations.length}];Bt(t,S);let x=l?4:1,k=Te(e[0].dataType),I=M("x",e[0].dataType,e[0].dims.length,m===3?1:m),z=M("W",e[1].dataType,e[1].dims.length,x),R=[I,z],D=K("result",e[0].dataType,i.length,x),V="";if(C){let re=M("bias",e[2].dataType,e[2].dims.length,x);R.push(re),V+=`
        fn getBiasByOutputCoords(coords : array<u32, 5>) -> ${l?`vec4<${k}>`:k} {
          return bias[${s?Y("coords",4,5):Y("coords",1,5)}${l?"/ 4":""}];
        }`}let Z=Ie(m,k),X=Ot(t,Z,k);return`
            ${V}
            fn getX(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${I.getByIndices("aIndices")};
            }
            fn getW(d0 : u32, d1 : u32, d2 : u32, d3 : u32, d4 : u32) -> f32 {
              let aIndices = array<u32, 5>(d0, d1, d2, d3, d4);
              return ${z.getByIndices("aIndices")};
            }
          ${$.registerUniforms(S).declareVariables(...R,D)}
          ${$.mainStart()}
          ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
              let coords = ${D.offsetToIndices("global_idx")};
              let batch = ${Y("coords",0,I.rank)};
              let d2 = ${s?Y("coords",I.rank-1,I.rank):Y("coords",1,I.rank)};
              let xFRCCorner = vec3<u32>(${s?Y("coords",1,I.rank):Y("coords",2,I.rank)},
              ${s?Y("coords",2,I.rank):Y("coords",3,I.rank)},
              ${s?Y("coords",3,I.rank):Y("coords",4,I.rank)}) * uniforms.strides - uniforms.pads;
              let xFCorner = xFRCCorner.x;
              let xRCorner = xFRCCorner.y;
              let xCCorner = xFRCCorner.z;
              let xShapeY = ${s?Y("uniforms.x_shape",1,I.rank):Y("uniforms.x_shape",2,I.rank)};
              let xShapeZ = ${s?Y("uniforms.x_shape",2,I.rank):Y("uniforms.x_shape",3,I.rank)};
              let xShapeW = ${s?Y("uniforms.x_shape",3,I.rank):Y("uniforms.x_shape",4,I.rank)};
              let xShapeU = ${s?Y("uniforms.x_shape",4,I.rank):Y("uniforms.x_shape",1,I.rank)};
              let inputDepthNearestVec4 = (xShapeU / 4) * 4;
              let inputDepthVec4Remainder = xShapeU % 4;

              var value = 0.0;
              for (var wF = 0u; wF < uniforms.filter_dims[0]; wF++) {
                let xF = xFCorner + wF * uniforms.dilations[0];
                if (xF < 0 || xF >= xShapeY) {
                  continue;
                }

                for (var wR = 0u; wR < uniforms.filter_dims[1]; wR++) {
                  let xR = xRCorner + wR * uniforms.dilations[1];
                  if (xR < 0 || xR >= xShapeZ) {
                    continue;
                  }

                  for (var wC = 0u; wC < uniforms.filter_dims[2]; wC++) {
                    let xC = xCCorner + wC * uniforms.dilations[2];
                    if (xC < 0 || xC >= xShapeW) {
                      continue;
                    }

                    for (var d1 = 0u; d1 < inputDepthNearestVec4; d1 += 4) {
                      ${s?`let xValues = vec4<f32>(
                               getX(batch, xF, xR, xC, d1),
                               getX(batch, xF, xR, xC, d1 + 1),
                               getX(batch, xF, xR, xC, d1 + 2),
                               getX(batch, xF, xR, xC, d1 + 3));
                            `:`let xValues = vec4<f32>(
                               getX(batch, d1, xF, xR, xC),
                               getX(batch, d1 + 1, xF, xR, xC),
                               getX(batch, d1 + 2, xF, xR, xC),
                               getX(batch, d1 + 3, xF, xR, xC));
                            `}
                            let wValues = vec4<f32>(
                              getW(d2, d1, wF, wR, wC),
                              getW(d2, d1 + 1, wF, wR, wC),
                              getW(d2, d1 + 2, wF, wR, wC),
                              getW(d2, d1 + 3, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                    if (inputDepthVec4Remainder == 1) {
                        ${s?`value += getX(batch, xF, xR, xC, inputDepthNearestVec4)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`:`value += getX(batch, inputDepthNearestVec4, xF, xR, xC)
                          * getW(d2, inputDepthNearestVec4, wF, wR, wC);`}
                    } else if (inputDepthVec4Remainder == 2) {
                      ${s?`let xValues = vec2<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1));
                      `:`let xValues = vec2<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC));
                    `}
                    let wValues = vec2<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC));
                      value += dot(xValues, wValues);
                    } else if (inputDepthVec4Remainder == 3) {
                      ${s?`let xValues = vec3<f32>(
                        getX(batch, xF, xR, xC, inputDepthNearestVec4),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 1),
                        getX(batch, xF, xR, xC, inputDepthNearestVec4 + 2));
                      `:`let xValues = vec3<f32>(
                        getX(batch, inputDepthNearestVec4, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 1, xF, xR, xC),
                        getX(batch, inputDepthNearestVec4 + 2, xF, xR, xC));
                    `}
                    let wValues = vec3<f32>(
                      getW(d2, inputDepthNearestVec4, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 1, wF, wR, wC),
                      getW(d2, inputDepthNearestVec4 + 2, wF, wR, wC));
                      value += dot(xValues, wValues);
                    }
                  }
                }
              }
              ${C?"value = value + getBiasByOutputCoords(coords)":""};
              ${X}
              result[global_idx] = f32(value);
          }`};return{name:"Conv3DNaive",shaderCache:{hint:`${t.cacheKey};${s};${m};${C}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:h[0],y:h[1],z:h[2]},programUniforms:y}),getShaderSource:w}}}),cc,fc,Jm=q(()=>{"use strict";te(),ne(),oe(),Nt(),cc=(e,t,i,r)=>{let a=e.length>2,n=a?"value += b[output_channel];":"",s=e[0].dims,u=e[1].dims,l=t.format==="NHWC",p=l?i[3]:i[1],c=p/t.group,h=l&&c>=4?$e(p):1,m=A.size(i)/h,_=[{type:12,data:m},{type:12,data:t.dilations},{type:12,data:[t.strides[0],t.strides[1]]},{type:12,data:[t.pads[0],t.pads[1]]},{type:12,data:c}];Rt(t,_),_.push(...Q(s,[u[0],u[1],u[2],u[3]/h]));let y=a?["rank","rank","rank"]:["rank","rank"];_.push(...Q([i[0],i[1],i[2],i[3]/h]));let v=C=>{let w=K("output",e[0].dataType,i.length,h),$=Te(w.type.tensor),S=Ot(t,w.type.value,$),x=M("x",e[0].dataType,s.length),k=M("w",e[1].dataType,u.length,h),I=[x,k];a&&I.push(M("b",e[2].dataType,e[2].dims,h));let z=[{name:"output_size",type:"u32"},{name:"dilations",type:"u32",length:t.dilations.length},{name:"strides",type:"u32",length:2},{name:"pads",type:"u32",length:2},{name:"output_channels_per_group",type:"u32"}];Bt(t,z);let R=l?`
      for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[0]; wHeight++) {
        let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

        if (xHeight < 0u || xHeight >= uniforms.x_shape[1]) {
          continue;
        }

        for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[1]; wWidth++) {
          let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
          if (xWidth < 0u || xWidth >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[2]; wInChannel++) {
            let input_channel = in_channel_offset + wInChannel;
            let xVal = ${x.get("batch","xHeight","xWidth","input_channel")};
            let wVal = ${k.get("wHeight","wWidth","wInChannel","output_channel")};
            value += xVal * wVal;
          }
        }
      }
      `:`
      for (var wInChannel: u32 = 0u; wInChannel < uniforms.w_shape[1]; wInChannel++) {
        let input_channel = in_channel_offset + wInChannel;
        for (var wHeight: u32 = 0u; wHeight < uniforms.w_shape[2]; wHeight++) {
          let xHeight = xRCCorner.x + wHeight * uniforms.dilations[0];

          if (xHeight < 0u || xHeight >= uniforms.x_shape[2]) {
            continue;
          }

          for (var wWidth: u32 = 0u; wWidth < uniforms.w_shape[3]; wWidth++) {
            let xWidth = xRCCorner.y + wWidth * uniforms.dilations[1];
            if (xWidth < 0u || xWidth >= uniforms.x_shape[3]) {
              continue;
            }

            let xVal = ${x.get("batch","input_channel","xHeight","xWidth")};
            let wVal = ${k.get("output_channel","wInChannel","wHeight","wWidth")};
            value += xVal * wVal;
          }
        }
      }
      `;return`
  ${C.registerUniforms(z).declareVariables(...I,w)}

  ${C.mainStart()}
    ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let outputIndices = ${w.offsetToIndices("global_idx")};
    let batch: u32 = outputIndices[0];
    let output_channel: u32 = outputIndices[${l?3:1}];
    let xRCCorner: vec2<u32> = vec2<u32>(outputIndices[${l?1:2}], outputIndices[${l?2:3}]) * uniforms.strides - uniforms.pads;
    let group_id: u32 = output_channel * ${h} / uniforms.output_channels_per_group;
    var in_channel_offset = group_id * uniforms.w_shape[${l?2:1}];

    var value: ${w.type.value} = ${w.type.value}(0);
    ${R}
    ${n}
    ${S}
    ${w.setByOffset("global_idx","value")}
  }`};return{name:"GroupedConv",shaderCache:{hint:`${t.cacheKey}_${h}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:v}},fc=(e,t,i,r)=>{let a=e.length>2,n=$e(i[3]),s=$e(i[2]),u=A.size(i)/n/s,l=[e[0].dims[0],e[0].dims[1],e[0].dims[2],e[0].dims[3]/n],p=[e[1].dims[0],e[1].dims[1],e[1].dims[2],e[1].dims[3]/n],c=[i[0],i[1],i[2],i[3]/n],h=[{type:12,data:u},{type:6,data:[t.strides[0],t.strides[1]]},{type:6,data:[t.pads[0],t.pads[1]]}];Rt(t,h),h.push(...Q(l,p,c));let m=(s-1)*t.strides[1]+p[1],_=y=>{let v=K("output",e[0].dataType,c.length,n),C=Te(v.type.tensor),w=Ot(t,v.type.value,C),$=M("x",e[0].dataType,l.length,n),S=M("w",e[1].dataType,p.length,n),x=[$,S];a&&x.push(M("b",e[2].dataType,e[2].dims,n));let k=a?"value += b[output_channel];":"",I=[{name:"output_size",type:"u32"},{name:"strides",type:"i32",length:2},{name:"pads",type:"i32",length:2}];return Bt(t,I),`
  ${y.registerUniforms(I).declareVariables(...x,v)}
  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let width0 = uniforms.output_shape[3];
    let output_channel = global_idx % width0;
    var index1 = global_idx / width0;
    let width1 = uniforms.output_shape[2] / ${s}u;
    let col = (index1 % width1) * ${s}u;
    index1 = index1 / width1;
    let row = index1 % uniforms.output_shape[1];
    let batch = index1 / uniforms.output_shape[1];

    let x_corner = vec2<i32>(i32(row), i32(col)) * uniforms.strides - uniforms.pads;

    var x_vals: array<${$.type.value}, ${m}>;
    var values: array<${v.type.value}, ${s}>;
    let input_channel = output_channel;
    // Use constant instead of uniform can give better performance for w's height/width.
    for (var w_height: u32 = 0u; w_height < ${p[0]}; w_height++) {
      let x_height = x_corner.x + i32(w_height);
      if (x_height >= 0 && u32(x_height) < uniforms.x_shape[1]) {
        for (var i = 0; i < ${m}; i++) {
          let x_width = x_corner.y + i;
          if (x_width >= 0 && u32(x_width) < uniforms.x_shape[2]) {
            x_vals[i] = ${$.get("batch","u32(x_height)","u32(x_width)","input_channel")};
          } else {
            x_vals[i] = ${$.type.value}(0);
          }
        }
        for (var w_width: u32 = 0u; w_width < ${p[1]}; w_width++) {
          let w_val = ${S.get("w_height","w_width","0","output_channel")};
          for (var i = 0u; i < ${s}u; i++) {
            values[i] = fma(x_vals[i * u32(uniforms.strides[1]) + w_width], w_val, values[i]);
          }
        }
      }
    }

    for (var i = 0u; i < ${s}u; i++) {
      var value = values[i];
      ${k}
      ${w}
      ${v.set("batch","row","col + i","output_channel","value")};
    }
  }`};return{name:"GroupedConv-Vectorize",shaderCache:{hint:`${t.cacheKey};${n};${s};${m};${p[0]};${p[1]}`,inputDependencies:a?["rank","rank","type"]:["rank","rank"]},getRunData:()=>({outputs:[{dims:r?r(i):i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:h}),getShaderSource:_}}}),tu,Rr,ru,Br,za,Ki,iu,au,Aa,eg=q(()=>{"use strict";ne(),Ym(),Qm(),tn(),Jm(),Nt(),en(),_t(),tu=(e,t,i,r,a,n)=>{let s=e[0],u=e.slice(n?1:2,n?3:4),l=u.length,p=t[0],c=t.slice(2).map((m,_)=>m+(m-1)*(i[_]-1)),h=u.map((m,_)=>m+r[_]+r[_+l]).map((m,_)=>Math.floor((m-c[_]+a[_])/a[_]));return h.splice(0,0,s),h.splice(n?3:1,0,p),h},Rr=[2,3,1,0],ru=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length>5)throw new Error("greater than 5D is not supported");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[1]*t.group;if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");if(e.length===3&&(e[2].dims.length!==1||e[1].dims[0]!==e[2].dims[0]))throw new Error("invalid bias");let a=e[0].dims.length-2;if(t.dilations.length!==a)throw new Error(`dilations should be ${a}D`);if(t.strides.length!==a)throw new Error(`strides should be ${a}D`);if(t.pads.length!==a*2)throw new Error(`pads should be ${a*2}D`);if(t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape")},Br=(e,t)=>{let i=e.kernelShape.slice();i.length<t[1].dims.length-2&&i.push(...Array(t[1].dims.length-2-i.length).fill(0));for(let n=2;n<t[1].dims.length;++n)i[n-2]===0&&(i[n-2]=t[1].dims[n]);let r=e.pads.slice();jr.adjustPadsBasedOnAutoPad(t[0].dims,e.strides,e.dilations,i,r,e.format==="NHWC",e.autoPad);let a=Object.assign({},e);return Object.assign(a,{kernelShape:i,pads:r}),a},za=e=>{let t=Ya(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],a=e.dilations,n=e.group,s=e.kernel_shape,u=e.pads,l=e.strides,p=e.w_is_const();return{autoPad:r,format:i,dilations:a,group:n,kernelShape:s,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},Ki=(e,t,i,r)=>{let a=i.format==="NHWC",n=tu(t[0].dims,t[1].dims,i.dilations,i.pads,i.strides,a);if(i.group!==1){let I=[t[0]];if(a){let z=e.kernelCustomData.wT??e.compute(Pe(t[1],Rr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=z),I.push(z)}else I.push(t[1]);t.length===3&&I.push(t[2]),!e.adapterInfo.isArchitecture("ampere")&&a&&t[1].dims[0]===i.group&&t[1].dims[1]===1&&i.dilations[0]===1&&i.dilations[1]===1?e.compute(fc(I,i,n,r),{inputs:I}):e.compute(cc(I,i,n,r),{inputs:I});return}let s=t.length===3,u=t[0].dims[a?1:2],l=t[0].dims[a?2:3],p=t[0].dims[a?3:1],c=t[1].dims[2],h=t[1].dims[3],m=n[a?1:2],_=n[a?2:3],y=n[a?3:1],v=a&&c===u&&h===l&&i.pads[0]===0&&i.pads[1]===0;if(v||c===1&&h===1&&i.dilations[0]===1&&i.dilations[1]===1&&i.strides[0]===1&&i.strides[1]===1&&i.pads[0]===0&&i.pads[1]===0){let I=n[0],z,R,D,V=[];if(a){let re=e.kernelCustomData.wT??e.compute(Pe(t[1],Rr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];if(i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=re),v){let j=u*l*p;z=t[0].reshape([1,I,j]),R=re.reshape([1,j,y]),D=[1,I,y]}else z=t[0].reshape([I,u*l,p]),R=re.reshape([1,p,y]),D=[I,m*_,y];V.push(z),V.push(R)}else z=t[0].reshape([I,p,u*l]),R=t[1].reshape([1,y,p]),D=[I,y,m*_],V.push(R),V.push(z);s&&V.push(t[2]);let Z=D[2],X=V[0].dims[V[0].dims.length-1];Z<8&&X<8?e.compute(Ja(V,i,n,D,a,r),{inputs:V}):e.compute(Gr(V,i,n,D,a,r),{inputs:V});return}let C=!0,w=e.kernelCustomData.wT??e.compute(Pe(t[1],Rr),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=w);let $=[t[0],w];s&&$.push(t[2]);let S=a?m*_:y,x=a?y:m*_,k=c*h*p;e.compute(lc($,i,n,S,x,k,s,C,r),{inputs:$})},iu=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=[0,t.pads[0],0,t.pads[1]],n=[1].concat(t.strides),s=[1].concat(t.dilations),u=[1].concat(t.kernelShape),l=Br({...t,pads:a,strides:n,dilations:s,kernelShape:u},r);Ki(e,r,l,p=>i?[p[0],p[2],p[3]]:[p[0],p[1],p[3]])},au=(e,t,i)=>{let r=i.format==="NHWC"?"channelsLast":"channelsFirst",a=Br(i,t),n=i.autoPad==="NOTSET"?i.pads:i.autoPad,s=dc(t[0].dims,t[1].dims,i.strides,i.dilations,n,!1,r);e.compute(pc(t,a,s.outShape,[s.filterDepth,s.filterHeight,s.filterWidth],[s.padInfo.front,s.padInfo.top,s.padInfo.left],r))},Aa=(e,t)=>{if(ru(e.inputs,t),e.inputs[0].dims.length===3)iu(e,t);else if(e.inputs[0].dims.length===5)au(e,e.inputs,t);else{let i=Br(t,e.inputs);Ki(e,e.inputs,i)}}}),hc,tg=q(()=>{"use strict";te(),ut(),ne(),oe(),hc=(e,t,i)=>{let r=e.length>2,a=t.outputShape,n=t.format==="NHWC",s=t.group,u=e[1].dims,l=u[2]/s,p=u[3],c=n?$e(l):1,h=n&&p===1&&l>=4,m=h?Math.floor(l/4)*4:Math.floor(l/c)*c,_=l-m,y=n?$e(p):1,v=n?p===1?c:y:1,C=A.size(a)/y,w=[Math.ceil(C/64),1,1];de("verbose",()=>`[conv2d_backprop_webgpu] dispatch = ${w}`);let $=["rank","rank"],S=[t.strides[0],t.strides[1]],x=[t.kernelShape[n?1:2],t.kernelShape[n?2:3]],k=[t.dilations[0],t.dilations[1]],I=[x[0]+(t.dilations[0]<=1?0:(t.kernelShape[n?1:2]-1)*(t.dilations[0]-1)),x[1]+(t.dilations[1]<=1?0:(t.kernelShape[n?2:3]-1)*(t.dilations[1]-1))],z=[I[0]-1-Math.floor((t.pads[0]+t.pads[2])/2),I[1]-1-Math.floor((t.pads[1]+t.pads[3])/2)],R=[{type:12,data:C},{type:12,data:S},{type:12,data:x},{type:12,data:k},{type:12,data:I},{type:6,data:z},{type:12,data:m},{type:12,data:l},{type:12,data:p},...Q(e[0].dims,e[1].dims)];r&&(R.push(...Q(e[2].dims)),$.push("rank")),R.push(...Q(a));let D=V=>{let Z=[{name:"output_size",type:"u32"},{name:"strides",type:"u32",length:S.length},{name:"filter_dims",type:"u32",length:x.length},{name:"dilations",type:"u32",length:x.length},{name:"effective_filter_dims",type:"u32",length:I.length},{name:"pads",type:"i32",length:z.length},{name:"input_channels_per_group_int",type:"u32"},{name:"input_channels_per_group",type:"u32"},{name:"output_channels_per_group",type:"u32"}],X=Te(e[0].dataType),re=n?1:2,j=n?2:3,se=n?3:1,J=M("W",e[1].dataType,e[1].dims.length,v),G=M("Dy",e[0].dataType,e[0].dims.length,c),ae=[G,J];r&&ae.push(M("bias",e[2].dataType,[a[se]].length,y));let F=K("result",e[0].dataType,a.length,y),ye=()=>{let ie="";if(h)c===4?ie+=`
        let xValue = ${G.getByOffset("x_offset")};
        let wValue = ${J.getByOffset("w_offset")};
        dotProd = dotProd + dot(xValue, wValue);
        x_offset += 1u;
        w_offset += 1u;`:c===2?ie+=`
          dotProd = dotProd + dot(vec4<${X}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}), vec4<${X}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}));
          x_offset += 2u;
          w_offset += 2u;`:c===1&&(ie+=`
          dotProd = dotProd + dot(vec4<${X}>(${G.getByOffset("x_offset")}, ${G.getByOffset("x_offset + 1u")}, ${G.getByOffset("x_offset + 2u")}, ${G.getByOffset("x_offset + 3u")}), vec4<${X}>(${J.getByOffset("w_offset")}, ${J.getByOffset("w_offset + 1u")}, ${J.getByOffset("w_offset + 2u")}, ${J.getByOffset("w_offset + 3u")}));
          x_offset += 4u;
          w_offset += 4u;`);else if(ie+=`
                  let xValue = ${n?G.getByOffset(`${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c}`):G.get("batch","inputChannel","idyR","idyC")};
        `,c===1)ie+=`
          let w_offset = ${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel, wOutChannel)`)};
          let wValue = ${J.getByOffset(`w_offset / ${v}`)};
          dotProd = dotProd + xValue * wValue;`;else for(let pe=0;pe<c;pe++)ie+=`
            let wValue${pe} = ${J.getByOffset(`${J.indicesToOffset(`${J.type.indices}(u32(wRPerm), u32(wCPerm), inputChannel + ${pe}, wOutChannel)`)} / ${v}`)};
            dotProd = dotProd + xValue[${pe}] * wValue${pe};`;return ie},U=()=>{if(_===0)return"";if(!h)throw new Error(`packInputAs4 ${h} is not true.`);let ie="";if(c===1){ie+="dotProd = dotProd";for(let pe=0;pe<_;pe++)ie+=`
            + ${G.getByOffset(`x_offset + ${pe}`)} * ${J.getByOffset(`w_offset + ${pe}`)}`;ie+=";"}else if(c===2){if(_!==2)throw new Error(`Invalid inputChannelsRemainder ${_}.`);ie+=`
          let xValue = ${G.getByOffset("x_offset")};
          let wValue = ${J.getByOffset("w_offset")};
          dotProd = dotProd + dot(xValue, wValue);`}return ie},L=`
            let outputIndices = ${F.offsetToIndices(`global_idx * ${y}`)};
            let batch = ${F.indicesGet("outputIndices",0)};
            let d1 = ${F.indicesGet("outputIndices",se)};
            let r = ${F.indicesGet("outputIndices",re)};
            let c = ${F.indicesGet("outputIndices",j)};
            let dyCorner = vec2<i32>(i32(r), i32(c)) - uniforms.pads;
            let dyRCorner = dyCorner.x;
            let dyCCorner = dyCorner.y;
            let groupId = d1 / uniforms.output_channels_per_group;
            let wOutChannel = d1 - groupId * uniforms.output_channels_per_group;
            // Convolve dy(?, ?, d2) with w(:, :, d1, d2) to compute dx(xR, xC, d1).
            // ? = to be determined. : = across all values in that axis.
            var dotProd = ${F.type.value}(0.0);
            var wR: u32 = 0;
            if (uniforms.dilations.x == 1) {
              // Minimum wR >= 0 that satisfies (dyRCorner + wR) % (uniforms.strides.x) == 0
              wR = u32(((dyRCorner + i32(uniforms.strides.x) - 1) / i32(uniforms.strides.x)) * i32(uniforms.strides.x) - dyRCorner);
            }
            for (; wR < uniforms.effective_filter_dims.x; wR = wR + 1) {
              if (wR % uniforms.dilations.x != 0) {
                continue;
              }
              let dyR = (${X}(dyRCorner) + ${X}(wR)) / ${X}(uniforms.strides[0]);
              let wRPerm = uniforms.filter_dims.x - 1 - wR / uniforms.dilations.x;
              if (dyR < 0.0 || dyR >= ${X}(uniforms.Dy_shape[${re}]) || fract(dyR) > 0.0 ||
                  wRPerm < 0) {
                continue;
              }
              let idyR: u32 = u32(dyR);
              var wC: u32 = 0;
              if (uniforms.dilations.y == 1) {
                // Minimum wC >= 0 that satisfies (dyCCorner + wC) % (uniforms.strides.y) == 0
                wC = u32(((dyCCorner + i32(uniforms.strides.y) - 1) / i32(uniforms.strides.y)) * i32(uniforms.strides.y) - dyCCorner);
              }
              for (; wC < uniforms.effective_filter_dims.y; wC = wC + 1) {
                if (wC % uniforms.dilations.y != 0) {
                  continue;
                }
                let dyC = (${X}(dyCCorner) + ${X}(wC)) / ${X}(uniforms.strides.y);
                let wCPerm = uniforms.filter_dims.y - 1 - wC / uniforms.dilations.y;
                if (dyC < 0.0 || dyC >= ${X}(uniforms.Dy_shape[${j}]) ||
                    fract(dyC) > 0.0 || wCPerm < 0) {
                  continue;
                }
                let idyC: u32 = u32(dyC);
                var inputChannel = groupId * uniforms.input_channels_per_group;
                ${h?`
                var x_offset = ${G.indicesToOffset(`${G.type.indices}(batch, idyR, idyC, inputChannel)`)} / ${c};
                var w_offset = ${J.indicesToOffset(`${J.type.indices}(wRPerm, wCPerm, inputChannel, wOutChannel)`)} / ${v};
                  `:""}
                for (var d2: u32 = 0; d2 < uniforms.input_channels_per_group_int; d2 = d2 + ${h?4:c}) {
                  ${ye()}
                  inputChannel = inputChannel + ${h?4:c};
                }
                ${U()}
                wC = wC + uniforms.strides.y - 1;
              }
              wR = wR + uniforms.strides[0] - 1;
            }
            let value = dotProd${r?` + bias[d1 / ${y}]`:""};
            ${F.setByOffset("global_idx","value")};
          `;return`
    ${V.registerUniforms(Z).declareVariables(...ae,F)}
      ${V.mainStart()}
      ${V.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")};
    ${L}}`};return{name:"ConvTranspose2D",shaderCache:{hint:`${t.cacheKey};${c}${v}${y}${h}${_}`,inputDependencies:$},getRunData:()=>({dispatchGroup:{x:w[0],y:w[1],z:w[2]},outputs:[{dims:i?i(a):a,dataType:e[0].dataType}],programUniforms:R}),getShaderSource:D}}}),nu,su,ou,Zi,mc,uu,Xi,lu,gc,rg=q(()=>{"use strict";tg(),Nt(),_t(),nu=(e,t,i,r,a,n)=>(e-1)*t+i+(r-1)*a+1-n,su=(e,t,i,r,a)=>{let n=Math.floor(e/2);t==="SAME_UPPER"?(i[r]=n,i[a]=e-n):t==="SAME_LOWER"&&(i[r]=e-n,i[a]=n)},ou=(e,t,i,r,a,n,s,u,l,p)=>{let c=e.length-2,h=p.length===0;l.length<c&&l.push(...Array(c-l.length).fill(0));let m=e[0],_=t[u?3:1]*a;for(let y=0,v=e.length-c-(u?1:0);y<c;++y,++v){let C=e[v],w=h?C*s[y]:p[y],$=nu(C,s[y],n[y],t[v],i[y],w);su($,r,n,y,y+c),h&&p.push(s[y]*(C-1)+l[y]+(t[v]-1)*i[y]+1-n[y]-n[y+c])}p.splice(0,0,m),p.splice(u?3:1,0,_)},Zi=(e,t)=>{let i=e.kernelShape.slice();if(e.kernelShape.length===0||e.kernelShape.reduce((h,m)=>h*m,1)===0){i.length=0;for(let h=2;h<t[1].dims.length;++h)i.push(t[1].dims[h])}let r=e.format==="NHWC";i.splice(0,0,t[1].dims[0]),i.splice(r?3:1,0,t[1].dims[1]);let a=e.pads.slice(),n=e.outputShape.slice(),s=e.outputPadding.slice(),u=t[0].dims,l=e.dilations.slice();if(l.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;l=new Array(h).fill(1)}let p=e.strides.slice();if(p.reduce((h,m)=>h+m,0)===0){let h=t[0].dims.length-2;p=new Array(h).fill(1)}ou(u,i,l,e.autoPad,e.group,a,p,r,s,n);let c=Object.assign({},e);return Object.assign(c,{kernelShape:i,pads:a,outputPadding:s,outputShape:n,dilations:l,strides:p}),c},mc=e=>{let t=Ya(e),i=e.format,r=["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][typeof e.autoPad>"u"?0:e.autoPad],a=e.dilations,n=e.group,s=e.kernelShape,u=e.pads,l=e.strides,p=e.wIsConst(),c=e.outputPadding,h=e.outputShape;return{autoPad:r,format:i,dilations:a,group:n,kernelShape:s,outputPadding:c,outputShape:h,pads:u,strides:l,wIsConst:p,...t,cacheKey:`${e.format};${t.activation};`}},uu=(e,t)=>{if(!e||e.length!==2&&e.length!==3)throw new Error("Conv requires 2 or 3 inputs");if(e[0].dims.length!==4&&e[0].dims.length!==3)throw new Error("currently only support 2-dimensional conv");if(e[0].dims.length!==e[1].dims.length)throw new Error("filter does not have same dimension as input");let i=e[0].dims[t.format==="NHWC"?e[0].dims.length-1:1],r=e[1].dims[0];if(i!==r)throw new Error("FILTER_IN_CHANNEL should be equal to DATA_CHANNEL");let a=e[1].dims[1]*t.group;if(e.length===3&&(e[2].dims.length!==1||e[2].dims[0]!==a))throw new Error("invalid bias");let n=e[0].dims.length-2;if(t.dilations.reduce((s,u)=>s+u,0)>0&&t.dilations.length!==n)throw new Error(`dilations should be ${n}D`);if(t.strides.reduce((s,u)=>s+u,0)>0&&t.strides.length!==n)throw new Error(`strides should be ${n}D`);if(t.pads.reduce((s,u)=>s+u,0)>0&&t.pads.length!==n*2)throw new Error(`pads should be ${n*2}D`);if(t.outputPadding.length!==n&&t.outputPadding.length!==0)throw new Error(`output_padding should be ${n}D`);if(t.kernelShape.reduce((s,u)=>s+u,0)>0&&t.kernelShape.length!==0&&t.kernelShape.length!==e[1].dims.length-2)throw new Error("invalid kernel shape");if(t.outputShape.length!==0&&t.outputShape.length!==e[0].dims.length-2)throw new Error("invalid output shape")},Xi=(e,t,i,r)=>{let a=e.kernelCustomData.wT??e.compute(Pe(t[1],[2,3,0,1]),{inputs:[1],outputs:[i.wIsConst?-2:-1]})[0];i.wIsConst&&!e.kernelCustomData.wT&&(e.kernelCustomData.wT=a);let n=[t[0],a];t.length===3&&n.push(t[2]),e.compute(hc(n,i,r),{inputs:n})},lu=(e,t)=>{let i=t.format==="NHWC",r=[e.inputs[0].reshape(i?[e.inputs[0].dims[0],1,e.inputs[0].dims[1],e.inputs[0].dims[2]]:[e.inputs[0].dims[0],e.inputs[0].dims[1],1,e.inputs[0].dims[2]]),e.inputs[1].reshape([e.inputs[1].dims[0],e.inputs[1].dims[1],1,e.inputs[1].dims[2]])];e.inputs.length===3&&r.push(e.inputs[2]);let a=t.kernelShape;(a.length===0||a[0]===0)&&(a=[e.inputs[1].dims[2]]);let n=t.dilations;(n.length===0||n[0]===0)&&(n=[1]);let s=t.strides;(s.length===0||s[0]===0)&&(s=[1]);let u=t.pads;u.length===0&&(u=[0,0]),u=[0,u[0],0,u[1]],s=[1].concat(s),n=[1].concat(n),a=[1].concat(a);let l=t.outputPadding;l=[0].concat(l);let p=Zi({...t,pads:u,strides:s,dilations:n,kernelShape:a,outputPadding:l},r);Xi(e,r,p,c=>i?[c[0],c[2],c[3]]:[c[0],c[1],c[3]])},gc=(e,t)=>{if(uu(e.inputs,t),e.inputs[0].dims.length===3)lu(e,t);else{let i=Zi(t,e.inputs);Xi(e,e.inputs,i)}}}),du,yc,_c,ig=q(()=>{"use strict";te(),ne(),ve(),oe(),du=(e,t,i,r)=>{let a=A.size(t),n=t.length,s=M("input",e,n),u=K("output",e,n),l=i.dataType===6?i.getInt32Array()[0]:Number(i.getBigInt64Array()[0]),p=A.normalizeAxis(l,n),c=h=>{let m=` i32(${s.indicesGet("inputIndices","uniforms.axis")}) `,_=Y("uniforms.input_shape","uniforms.axis",n),y=r.reverse?m+(r.exclusive?" + 1":""):"0",v=r.reverse?_:m+(r.exclusive?"":" + 1");return`
                ${h.registerUniform("outputSize","u32").registerUniform("axis","u32").declareVariables(s,u)}
                ${h.mainStart()}
                  ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
                  var inputIndices = ${u.offsetToIndices("global_idx")};
                  var sum = ${u.type.value}(0);
                  let first : i32 = ${y};
                  let last : i32 = ${v};
                  for (var i : i32 = first; i < last; i++) {
                    ${s.indicesSet("inputIndices","uniforms.axis","u32(i)")};
                    sum = sum + ${s.getByIndices("inputIndices")};
                  }
                  ${u.setByOffset("global_idx","sum")};
                }`};return{name:"CumSum",shaderCache:{hint:r.cacheKey,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:t,dataType:e}],dispatchGroup:{x:Math.ceil(a/64)},programUniforms:[{type:12,data:a},{type:12,data:p},...Q(t,t)]}),getShaderSource:c}},yc=(e,t)=>{let i=e.inputs[0].dims,r=e.inputs[0].dataType,a=e.inputs[1];e.compute(du(r,i,a,t),{inputs:[0]})},_c=e=>{let t=e.exclusive===1,i=e.reverse===1;return he({exclusive:t,reverse:i})}}),pu,cu,fu,wc,bc,ag=q(()=>{"use strict";te(),ne(),ve(),oe(),pu=e=>{if(!e||e.length!==1)throw new Error("DepthToSpace requires 1 input.");if(e[0].dims.length!==4)throw new Error("DepthToSpace requires 4D input.")},cu=(e,t,i,r)=>{let a=[];a.push(`fn perm(i: ${r.type.indices}) -> ${i.type.indices} {
    var a: ${i.type.indices};`);for(let n=0;n<t;++n)a.push(i.indicesSet("a",e[n],`i[${n}]`));return a.push("return a;}"),a.join(`
`)},fu=(e,t)=>{let i,r,a,n,s,u,l=t.format==="NHWC",p=t.blocksize,c=t.mode==="DCR";l?([i,r,a,n]=e.dims,s=c?[i,r,a,p,p,n/p**2]:[i,r,a,n/p**2,p,p],u=c?[0,1,3,2,4,5]:[0,1,4,2,5,3]):([i,r,a,n]=[e.dims[0],e.dims[2],e.dims[3],e.dims[1]],s=c?[i,p,p,n/p**2,r,a]:[i,n/p**2,p,p,r,a],u=c?[0,3,4,1,5,2]:[0,1,4,2,5,3]);let h=e.reshape(s),m=h.dims.length,_=e.dataType,y=M("a",_,m),v=K("output",_,m),C=w=>`
  ${w.registerUniform("output_size","u32").declareVariables(y,v)}

  ${cu(u,m,y,v)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let indices = ${v.offsetToIndices("global_idx")};
    let aIndices = perm(indices);

    ${v.setByOffset("global_idx",y.getByIndices("aIndices"))}
  }`;return{name:"DepthToSpace",shaderCache:{hint:`${e.dims};${t.blocksize};${t.mode}`,inputDependencies:["rank"]},getRunData:w=>{let $=l?[i,r*p,a*p,n/p**2]:[i,n/p**2,r*p,a*p],S=A.size($),x=h.dims,k=A.sortBasedOnPerm(x,u);return{outputs:[{dims:$,dataType:w[0].dataType}],dispatchGroup:{x:Math.ceil(S/64)},programUniforms:[{type:12,data:S},...Q(x,k)]}},getShaderSource:C}},wc=(e,t)=>{pu(e.inputs),e.compute(fu(e.inputs[0],t))},bc=e=>he({blocksize:e.blocksize,mode:e.mode,format:e.format})}),Mr,ir,Yi,hu,mu,gu,yu,Qi,_u,$c,vc,ng=q(()=>{"use strict";te(),ne(),ve(),oe(),Mr="[a-zA-Z]|\\.\\.\\.",ir="("+Mr+")+",Yi="^"+ir+"$",hu="("+ir+",)*"+ir,mu="^"+hu+"$",gu=class{constructor(e=-1){this.symbolToIndices=new Map,this.inputIndex=e}addSymbol(e,t){let i=this.symbolToIndices.get(e);i===void 0?i=[t]:i.push(t),this.symbolToIndices.set(e,i)}},yu=class{constructor(e,t){this.equation=t,this.hasEllipsis=!1,this.symbolToInfo=new Map,this.lhs=new Array,this.outputDims=[];let[i,r]=t.includes("->")?t.split("->",2):[t,""];if(!i.match(RegExp(mu)))throw new Error("Invalid LHS term");if(i.split(",").forEach((a,n)=>{let s=e[n].dims.slice();if(!a.match(RegExp(Yi)))throw new Error("Invalid LHS term");let u=this.processTerm(a,!0,s,n);this.lhs.push(u)}),r==="")r+=[...this.symbolToInfo.entries()].filter(([a,n])=>n.count===1||a==="...").map(([a])=>a).join("");else if(!r.match(RegExp(ir)))throw new Error("Invalid RHS");r.match(RegExp(Mr,"g"))?.forEach(a=>{if(a==="...")this.outputDims=this.outputDims.concat(this.ellipsisDims);else{let n=this.symbolToInfo.get(a);if(n===void 0)throw new Error("Invalid RHS symbol");this.outputDims.push(n.dimValue)}}),this.rhs=this.processTerm(r,!1,this.outputDims)}addSymbol(e,t,i){let r=this.symbolToInfo.get(e);if(r!==void 0){if(r.dimValue!==t&&r.count!==1)throw new Error("Dimension mismatch");r.count++,r.inputIndices.push(i)}else r={count:1,dimValue:t,inputIndices:[i]};this.symbolToInfo.set(e,r)}processTerm(e,t,i,r=-1){let a=i.length,n=!1,s=[],u=0;if(!e.match(RegExp(Yi))&&!t&&e!=="")throw new Error("Invalid LHS term");let l=e.match(RegExp(Mr,"g")),p=new gu(r);return l?.forEach((c,h)=>{if(c==="..."){if(n)throw new Error("Only one ellipsis is allowed per input term");n=!0;let m=a-l.length+1;if(m<0)throw new Error("Ellipsis out of bounds");if(s=i.slice(u,u+m),this.hasEllipsis){if(this.ellipsisDims.length!==s.length||this.ellipsisDims.toString()!==s.toString())throw new Error("Ellipsis dimensions mismatch")}else if(t)this.hasEllipsis=!0,this.ellipsisDims=s;else throw new Error("Ellipsis must be specified in the LHS");for(let _=0;_<s.length;_++){let y=String.fromCharCode(48+_);p.addSymbol(y,h+_),this.addSymbol(y,i[u++],r)}}else p.addSymbol(c,h+(this.hasEllipsis?this.ellipsisDims.length-1:0)),this.addSymbol(c,i[u++],r)}),p}},Qi=e=>e+"_max",_u=(e,t,i,r)=>{let a=e.map(p=>p.length).map((p,c)=>M(`input${c}`,t,p)),n=A.size(r),s=K("output",t,r.length),u=[...i.symbolToInfo.keys()].filter(p=>!i.rhs.symbolToIndices.has(p)),l=p=>{let c=[],h="var prod = 1.0;",m="var sum = 0.0;",_="sum += prod;",y=[],v=[],C=[],w=[],$=i.symbolToInfo.size===i.rhs.symbolToIndices.size;i.symbolToInfo.forEach((x,k)=>{if(i.rhs.symbolToIndices.has(k)){let I=i.rhs.symbolToIndices.get(k)?.[0];I!==void 0&&i.lhs.forEach((z,R)=>{if(x.inputIndices.includes(R)){let D=z.symbolToIndices.get(k);if(D===void 0)throw new Error("Invalid symbol error");D.forEach(V=>{c.push(`${a[R].indicesSet(`input${R}Indices`,V,s.indicesGet("outputIndices",I))}`)})}})}else i.lhs.forEach((I,z)=>{if(x.inputIndices.includes(z)){let R=I.symbolToIndices.get(k);if(R===void 0)throw new Error("Invalid symbol error");R.forEach(D=>{y.push(`${a[z].indicesSet(`input${z}Indices`,D,`${k}`)}`)}),w.push(`prod *= ${a[z].getByIndices(`input${z}Indices`)};`)}}),v.push(`for(var ${k}: u32 = 0; ${k} < uniforms.${Qi(k)}; ${k}++) {`),C.push("}")});let S=$?[...c,`let sum = ${a.map((x,k)=>x.getByIndices(`input${k}Indices`)).join(" * ")};`]:[...c,m,...v,...y,h,...w,_,...C];return`
            ${p.registerUniforms(u.map(x=>({name:`${Qi(x)}`,type:"u32"}))).registerUniform("outputSize","u32").declareVariables(...a,s)}

            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
            var outputIndices = ${s.offsetToIndices("global_idx")};
            ${a.map((x,k)=>`var input${k}Indices: ${a[k].type.indices};`).join(`
`)}
            ${S.join(`
`)};
            ${s.setByOffset("global_idx","sum")};
          }`};return{name:"Einsum",shaderCache:{hint:i.equation,inputDependencies:e.map(()=>"rank")},getRunData:()=>{let p=u.filter(h=>i.symbolToInfo.has(h)).map(h=>({type:12,data:i.symbolToInfo.get(h)?.dimValue||0}));p.push({type:12,data:n});let c=e.map((h,m)=>[...Q(h)]).reduce((h,m)=>h.concat(m),p);return c.push(...Q(r)),{outputs:[{dims:r,dataType:t}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:c}},getShaderSource:l}},$c=(e,t)=>{let i=new yu(e.inputs,t.equation),r=i.outputDims,a=e.inputs.map((n,s)=>n.dims);e.compute(_u(a,e.inputs[0].dataType,i,r))},vc=e=>{let t=e.equation.replace(/\s+/g,"");return he({equation:t})}}),wu,Ji,bu,$u,xc,sg=q(()=>{"use strict";te(),ne(),oe(),wu=e=>{if(!e||e.length!==2)throw new Error("Expand requires 2 input.");let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=i.length<t.length?0:i.length-t.length,a=t.length<i.length?0:t.length-i.length;for(;r<i.length&&a<t.length;++r,++a)if(i[r]!==t[a]&&i[r]!==1&&t[a]!==1)throw new Error("Expand requires shape to be broadcastable to input")},Ji=(e,t)=>{let i=e.length-t.length,r=[];for(let a=0;a<i;++a)r.push(e[a]);for(let a=0;a<t.length;++a)r.push(t[a]===1?e[a+i]:t[a]);return r},bu=(e,t)=>e.length>t.length?Ji(e,t):Ji(t,e),$u=e=>{let t=e[0].dims,i=Array.from(e[1].getBigInt64Array(),Number),r=bu(t,i),a=e[0].dataType,n=a===9||A.size(t)===1,s=a===9||t.length>0&&t[t.length-1]%4===0?4:1,u=n||r.length>0&&r[r.length-1]%4===0?4:1,l=Math.ceil(A.size(r)/u),p=h=>{let m=M("input",a,t.length,s),_=K("output",a,r.length,u),y;if(a===9){let v=(C,w,$="")=>`
          let outputIndices${w} = ${_.offsetToIndices(`outputOffset + ${w}u`)};
          let offset${w} = ${m.broadcastedIndicesToOffset(`outputIndices${w}`,_)};
          let index${w} = offset${w} / 4u;
          let component${w} = offset${w} % 4u;
          ${C}[${w}] = ${$}(${m.getByOffset(`index${w}`)}[component${w}]);
        `;y=`
        let outputOffset = global_idx * ${u};
        var data = vec4<u32>(0);
        ${v("data",0,"u32")}
        ${v("data",1,"u32")}
        ${v("data",2,"u32")}
        ${v("data",3,"u32")}
        ${_.setByOffset("global_idx","data")}
      }`}else y=`
        let outputIndices = ${_.offsetToIndices(`global_idx * ${u}`)};
        let inputOffset = ${m.broadcastedIndicesToOffset("outputIndices",_)};
        let data = ${_.type.value}(${m.getByOffset(`inputOffset / ${s}`)});
        ${_.setByOffset("global_idx","data")}
      }`;return`
    ${h.registerUniform("vec_size","u32").declareVariables(m,_)}
    ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
    ${y}`},c=[{type:12,data:l},...Q(t,r)];return{name:"Expand",shaderCache:{hint:`${r.length};${s}${u}`,inputDependencies:["rank"]},getShaderSource:p,getRunData:()=>({outputs:[{dims:r,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:c})}},xc=e=>{wu(e.inputs),e.compute($u(e.inputs),{inputs:[0]})}}),vu,Cc,og=q(()=>{"use strict";te(),ne(),oe(),Xa(),vu=e=>{let t=e[0].dataType,i=A.size(e[0].dims),r=A.size(e[1].dims),a=r%4===0,n=s=>{let u=M("x",t,[1],4),l=M("bias",t,[1],4),p=K("y",t,[1],4),c=[{name:"output_vec_size",type:"u32"},{name:"bias_size",type:"u32"}],h=_=>`
      let bias${_}_offset: u32 = (global_idx * 4 + ${_}) % uniforms.bias_size;
      let bias${_} = ${l.getByOffset(`bias${_}_offset / 4`)}[bias${_}_offset % 4];`,m=a?`
      let bias = ${l.getByOffset("global_idx % (uniforms.bias_size / 4)")};`:`${h(0)}${h(1)}${h(2)}${h(3)}
      let bias = ${u.type.value}(bias0, bias1, bias2, bias3);`;return`${s.registerUniforms(c).declareVariables(u,l,p)}

    ${Ta(Ee(t))}

    ${s.mainStart(jt)}
      ${s.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_vec_size")}

      let x = ${u.getByOffset("global_idx")};
      ${m}
      let x_in = x + bias;
      ${p.setByOffset("global_idx",ka("x_in"))}
    }`};return{name:"FastGeluWithBias",shaderCache:{hint:`${a}`,inputDependencies:["type","type"]},getShaderSource:n,getRunData:s=>({outputs:[{dims:s[0].dims,dataType:s[0].dataType}],programUniforms:[{type:12,data:Math.ceil(i/4)},{type:12,data:r}],dispatchGroup:{x:Math.ceil(i/jt/4)}})}},Cc=e=>{e.inputs.length<2||A.size(e.inputs[1].dims)===0?jp(e):e.compute(vu(e.inputs))}}),xu,Cu,Sc,Tc,ug=q(()=>{"use strict";te(),ne(),ve(),oe(),xu=e=>{if(!e||e.length!==2)throw new Error("Gather requires 2 inputs.")},Cu=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i.length,n=A.normalizeAxis(t.axis,a),s=i.slice(0);s.splice(n,1,...r);let u=i[n],l=e[0].dataType===9?4:1,p=Math.ceil(A.size(s)/l),c=[{type:12,data:p},{type:6,data:u},{type:12,data:n},...Q(e[0].dims,e[1].dims,s)],h=m=>{let _=M("data",e[0].dataType,e[0].dims.length,l),y=M("inputIndices",e[1].dataType,e[1].dims.length),v=K("output",e[0].dataType,s.length,l),C=$=>{let S=r.length,x=`var indicesIndices${$}  = ${y.type.indices}(0);`;for(let k=0;k<S;k++)x+=`${S>1?`indicesIndices${$}[${k}]`:`indicesIndices${$}`} = ${s.length>1?`outputIndices${$}[uniforms.axis + ${k}]`:`outputIndices${$}`};`;x+=`
          var idx${$} = ${y.getByIndices(`indicesIndices${$}`)};
          if (idx${$} < 0) {
            idx${$} = idx${$} + uniforms.axisDimLimit;
          }
          var dataIndices${$} : ${_.type.indices};
        `;for(let k=0,I=0;k<a;k++)k===n?(x+=`${a>1?`dataIndices${$}[${k}]`:`dataIndices${$}`} = u32(idx${$});`,I+=S):(x+=`${a>1?`dataIndices${$}[${k}]`:`dataIndices${$}`} = ${s.length>1?`outputIndices${$}[${I}]`:`outputIndices${$}`};`,I++);return x},w;if(e[0].dataType===9){let $=(S,x,k="")=>`
          let outputIndices${x} = ${v.offsetToIndices(`outputOffset + ${x}u`)};
          ${C(x)};
          let offset${x} = ${_.indicesToOffset(`dataIndices${x}`)};
          let index${x} = offset${x} / 4u;
          let component${x} = offset${x} % 4u;
          ${S}[${x}] = ${k}(${_.getByOffset(`index${x}`)}[component${x}]);
        `;w=`
        let outputOffset = global_idx * ${l};
        var value = vec4<u32>(0);
        ${$("value",0,"u32")}
        ${$("value",1,"u32")}
        ${$("value",2,"u32")}
        ${$("value",3,"u32")}
        ${v.setByOffset("global_idx","value")}
      `}else w=`
      let outputIndices = ${v.offsetToIndices("global_idx")};
      ${C("")};
      let value = ${_.getByIndices("dataIndices")};
      ${v.setByOffset("global_idx","value")};
      `;return`
      ${m.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(_,y,v)}
      ${m.mainStart()}
        ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        ${w}
      }`};return{name:"Gather",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:s,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:h}},Sc=e=>he({axis:e.axis}),Tc=(e,t)=>{let i=e.inputs;xu(i),e.compute(Cu(e.inputs,t))}}),Su,kc,Ic,lg=q(()=>{"use strict";te(),ne(),oe(),Su=(e,t,i,r,a,n,s,u,l)=>{let p=[{type:12,data:n},{type:12,data:r},{type:12,data:a},{type:12,data:i},{type:12,data:s},{type:12,data:u},{type:12,data:l}],c=[n];p.push(...Q(t.dims,c));let h=m=>{let _=M("indices_data",t.dataType,t.dims.length),y=K("input_slice_offsets_data",12,1,1),v=[_,y],C=[{name:"output_size",type:"u32"},{name:"batch_dims",type:"u32"},{name:"input_dims",type:"u32",length:a.length},{name:"sizes_from_slice_dims_data",type:"u32",length:i.length},{name:"num_slices_per_batch",type:"u32"},{name:"input_batch_stride",type:"u32"},{name:"num_slice_dims",type:"u32"}];return`
  ${m.registerUniforms(C).declareVariables(...v)}
  ${m.mainStart()}
    ${m.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let batch_idx = global_idx / uniforms.num_slices_per_batch;
    let base_offset = batch_idx * uniforms.input_batch_stride;

    let slice_indices_base_offset = global_idx * uniforms.num_slice_dims;
    var relative_slice_offset = 0;
    for (var dim_idx = 0u; dim_idx < uniforms.num_slice_dims; dim_idx ++) {
      var index = i32(indices_data[dim_idx + slice_indices_base_offset].x);
      let input_dim_idx = uniforms.batch_dims + dim_idx;
      if (index < 0) {
        ${a.length===1?"index += i32(uniforms.input_dims);":"index += i32(uniforms.input_dims[input_dim_idx]);"}
      }
      ${i.length===1?"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data);":"relative_slice_offset += index * i32(uniforms.sizes_from_slice_dims_data[dim_idx]);"}
    }

    input_slice_offsets_data[global_idx] =  base_offset + u32(relative_slice_offset);
  }`};return e.compute({name:"computeSliceOffsets",shaderCache:{hint:`${a.length}_${i.length}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:c,dataType:e.inputs[1].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:p}),getShaderSource:h},{inputs:[t],outputs:[-1]})[0]},kc=(e,t)=>{let i=e.inputs,r=i[0].dims,a=i[0].dataType,n=i[1].dims,s=n[n.length-1],u=A.sizeToDimension(n,n.length-1),l=A.sizeFromDimension(r,t.batchDims+s),p=A.sizeToDimension(r,t.batchDims),c=A.sizeFromDimension(r,t.batchDims),h=u/p,m=new Array(s),_=l;for(let x=0;x<s;++x)m[s-1-x]=_,_*=r[t.batchDims+s-1-x];let y=Su(e,i[1],m,t.batchDims,r,u,h,c,s),v=t.batchDims+s;if(v>r.length)throw new Error("last dimension of indices must not be larger than rank of input tensor");let C=n.slice(0,-1).concat(r.slice(v)),w=A.size(C),$=[{type:12,data:w},{type:12,data:l},...Q(i[0].dims,y.dims,C)],S=x=>{let k=M("data",i[0].dataType,i[0].dims.length),I=M("slice_offsets",12,y.dims.length),z=K("output",i[0].dataType,C.length);return`
          ${x.registerUniform("output_size","u32").registerUniform("slice_size","u32").declareVariables(k,I,z)}
            ${x.mainStart()}
            ${x.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let slice_offset = slice_offsets[global_idx / uniforms.slice_size];
          output[global_idx] = data[u32(slice_offset) + global_idx % uniforms.slice_size];
        }`};e.compute({name:"GatherND",shaderCache:{hint:t.cacheKey,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:C,dataType:a}],dispatchGroup:{x:Math.ceil(w/64)},programUniforms:$}),getShaderSource:S},{inputs:[i[0],y]})},Ic=e=>({batchDims:e.batch_dims,cacheKey:""})}),Tu,ku,Ec,zc,dg=q(()=>{"use strict";te(),ne(),ve(),oe(),Tu=(e,t)=>{if(e.length<3||e.length>4)throw new Error("GatherBlockQuantized requires 3 or 4 inputs.");let i=A.normalizeAxis(t.quantizeAxis,e[0].dims.length),r=t.blockSize,a=e[0],n=e[2],s=e.length===4?e[3]:void 0;if(n.dims.length!==a.dims.length||!a.dims.map((u,l)=>l===i?Math.ceil(u/r)===n.dims[l]:u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Scales must have the same rank as the input tensor and the dims should match except on gatherAxis.");if(s){if(s.dataType!==a.dataType)throw new Error("Zero point must have the same data type as the input tensor.");if(s.dims.length!==n.dims.length||!s.dims.map((u,l)=>u===n.dims[l]).reduce((u,l)=>u&&l,!0))throw new Error("Zero point must have the same rank as the input tensor and the dims should match except on quantizeAxis.")}},ku=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i.length,n=A.normalizeAxis(t.gatherAxis,a),s=A.normalizeAxis(t.quantizeAxis,a),u=i.slice(0);u.splice(n,1,...r);let l=A.size(u),p=e[2].dataType,c=e[0].dataType===22,h=[{type:12,data:l},{type:12,data:s},{type:12,data:n},{type:12,data:t.blockSize},...Q(...e.map((_,y)=>_.dims),u)],m=_=>{let y=M("data",e[0].dataType,e[0].dims.length),v=M("inputIndices",e[1].dataType,e[1].dims.length),C=M("scales",e[2].dataType,e[2].dims.length),w=e.length>3?M("zeroPoint",e[3].dataType,e[3].dims.length):void 0,$=K("output",p,u.length),S=[y,v,C];w&&S.push(w);let x=[{name:"output_size",type:"u32"},{name:"quantize_axis",type:"u32"},{name:"gather_axis",type:"u32"},{name:"block_size",type:"u32"}];return`
        ${_.registerUniforms(x).declareVariables(...S,$)}
        ${_.mainStart()}
        let output_indices = ${$.offsetToIndices("global_idx")};
        var indices_indices = ${v.type.indices}(0);
        ${r.length>1?`
          for (var i: u32 = 0; i < ${r.length}; i++) {
            let index = ${$.indicesGet("output_indices","uniforms.gather_axis + i")};
            ${v.indicesSet("indices_indices","i","index")};
          }`:`indices_indices = ${$.indicesGet("output_indices","uniforms.gather_axis")};`};
        var data_indices = ${y.type.indices}(0);
        for (var i: u32 = 0; i < uniforms.gather_axis; i++) {
          let index = ${$.indicesGet("output_indices","i")};
          ${y.indicesSet("data_indices","i","index")};
        }
        var index_from_indices = ${v.getByIndices("indices_indices")};
        if (index_from_indices < 0) {
          index_from_indices += ${i[n]};
        }
        ${y.indicesSet("data_indices","uniforms.gather_axis","u32(index_from_indices)")};
        for (var i = uniforms.gather_axis + 1; i < ${u.length}; i++) {
          let index = ${$.indicesGet("output_indices",`i + ${r.length} - 1`)};
          ${y.indicesSet("data_indices","i","index")};
        }
        let data_offset = ${y.indicesToOffset("data_indices")};
        let data_index = data_offset % 8;
        // Convert 4-bit packed data to 8-bit packed data.
        let packed_4bit_quantized_data = ${y.getByOffset("data_offset / 8")};
        let packed_8bit_quantized_data = (packed_4bit_quantized_data >> (4 * (data_index % 2))) & 0x0f0f0f0f;
        let quantized_data_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_quantized_data));
        let quantized_data = quantized_data_vec[data_index / 2];
        var scale_indices = data_indices;
        let quantize_axis_index = ${C.indicesGet("data_indices","uniforms.quantize_axis")} / uniforms.block_size;
        ${C.indicesSet("scale_indices","uniforms.quantize_axis","quantize_axis_index")};
        var scale = ${C.getByIndices("scale_indices")};
        ${w?`
              let zero_point_indices = scale_indices;
              let zero_point_offset = ${w.indicesToOffset("zero_point_indices")};
              let zero_point_index = zero_point_offset % 8;
              let packed_4bit_zero_points = ${w.getByOffset("zero_point_offset / 8")};
              let packed_8bit_zero_points = (packed_4bit_zero_points >> (4 * (zero_point_index % 2))) & 0x0f0f0f0f;
              let zero_point_vec = ${c?"unpack4xI8":"unpack4xU8"}(u32(packed_8bit_zero_points));
              let zero_point = zero_point_vec[zero_point_index / 2];`:"var zero_point = 0"};
        let dequantized_data = ${Ee(p)}(quantized_data - zero_point) * scale;
        ${$.setByOffset("global_idx","dequantized_data")};
    }`};return{name:"GatherBlockQuantized",shaderCache:{hint:`${t.cacheKey};${e.filter((_,y)=>y!==1).map(_=>_.dims.join("_")).join(";")}`,inputDependencies:Array.from({length:e.length},(_,y)=>"rank")},getRunData:()=>({outputs:[{dims:u,dataType:p}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:h}),getShaderSource:m}},Ec=(e,t)=>{let i=e.inputs;Tu(i,t),e.compute(ku(e.inputs,t))},zc=e=>he({blockSize:e.blockSize,gatherAxis:e.gatherAxis,quantizeAxis:e.quantizeAxis})}),Iu,Eu,Ac,Oc,pg=q(()=>{"use strict";te(),ne(),ve(),oe(),Iu=e=>{if(!e||e.length!==2)throw new Error("GatherElements requires 2 inputs.");if(e[0].dims.length<1)throw new Error("GatherElements requires that the data input be rank >= 1.");if(e[0].dims.length!==e[1].dims.length)throw new Error(`GatherElements requires that the data input and
                     indices input tensors be of same rank.`)},Eu=(e,t)=>{let i=e[0].dims,r=e[0].dataType,a=i.length,n=e[1].dims,s=e[1].dataType,u=A.normalizeAxis(t.axis,a),l=i[u],p=n.slice(0),c=A.size(p),h=M("input",r,a),m=M("indicesInput",s,n.length),_=K("output",r,p.length),y=[{type:12,data:c},{type:6,data:l},{type:12,data:u}];return y.push(...Q(i,n,p)),{name:"GatherElements",shaderCache:{inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:p,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:y}),getShaderSource:v=>`
      ${v.registerUniform("outputSize","u32").registerUniform("axisDimLimit","i32").registerUniform("axis","u32").declareVariables(h,m,_)}
      ${v.mainStart()}
      ${v.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

      let outputIndices = ${_.offsetToIndices("global_idx")};

      var idx = ${m.getByOffset("global_idx")};
      if (idx < 0) {
        idx = idx + uniforms.axisDimLimit;
      }
      var inputIndices = ${h.type.indices}(outputIndices);
      ${h.indicesSet("inputIndices","uniforms.axis","u32(idx)")};
      let value = ${h.getByIndices("inputIndices")};

      ${_.setByOffset("global_idx","value")};
  }`}},Ac=e=>he({axis:e.axis}),Oc=(e,t)=>{let i=e.inputs;Iu(i),e.compute(Eu(e.inputs,t))}}),zu,Au,Rc,Bc,cg=q(()=>{"use strict";te(),ne(),oe(),zu=e=>{if(!e)throw new Error("Input is missing");if(e.length<2||e.length>3)throw new Error("Invaid input number.");if(e.length===3&&e[2].dims.length>2)throw new Error("Invalid input shape of C");if(e[0].dataType!==e[1].dataType||e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("Input types are mismatched")},Au=(e,t)=>{let i=e[0].dims.slice(),r=e[1].dims.slice(),[a,n,s]=Ad.getShapeOfGemmResult(i,t.transA,r,t.transB,e.length===3?e[2].dims:void 0),u=[a,n];if(!u)throw new Error("Can't use gemm on the given tensors");let l=16,p=Math.ceil(n/l),c=Math.ceil(a/l),h=!0,m=A.size(u),_=[{type:12,data:h?p:m},{type:12,data:a},{type:12,data:n},{type:12,data:s},{type:1,data:t.alpha},{type:1,data:t.beta}],y=["type","type"];e.length===3&&(_.push(...Q(e[2].dims)),y.push("rank")),_.push(...Q(u));let v=w=>{let $="";t.transA&&t.transB?$="value += a[k * uniforms.M + m] * b[n * uniforms.K + k];":t.transA&&!t.transB?$="value += a[k * uniforms.M + m] * b[k * uniforms.N + n];":!t.transA&&t.transB?$="value += a[m * uniforms.K + k] * b[n * uniforms.K + k];":!t.transA&&!t.transB&&($="value += a[m * uniforms.K + k] * b[k * uniforms.N + n];");let S=t.alpha===1?"":"value *= uniforms.alpha;",x=M("a",e[0].dataType,e[0].dims),k=M("b",e[1].dataType,e[1].dims),I=x.type.value,z=null,R=[x,k];e.length===3&&(z=M("c",e[2].dataType,e[2].dims.length),R.push(z));let D=K("output",e[0].dataType,u.length);R.push(D);let V=[{name:"output_size",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}];return`
  ${w.registerUniforms(V).declareVariables(...R)}

  ${w.mainStart()}
    ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

    let m = global_idx / uniforms.N;
    let n = global_idx % uniforms.N;

    var value = ${I}(0);
    for (var k: u32 = 0u; k < uniforms.K; k++) {
      ${$}
    }

    ${S}
    ${z!=null?`let cOffset = ${z.broadcastedIndicesToOffset("vec2(m, n)",D)}; value += ${I}(uniforms.beta) * ${z.getByOffset("cOffset")};`:""}
    output[global_idx] = value;
  }`},C=w=>{let $=M("a",e[0].dataType,e[0].dims),S=M("b",e[1].dataType,e[1].dims),x=null,k=[$,S];e.length===3&&(x=M("c",e[2].dataType,e[2].dims.length),k.push(x));let I=K("output",e[0].dataType,u.length);k.push(I);let z=[{name:"num_tile_n",type:"u32"},{name:"M",type:"u32"},{name:"N",type:"u32"},{name:"K",type:"u32"},{name:"alpha",type:"f32"},{name:"beta",type:"f32"}],R="",D="";t.transA&&t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[local_id.x][k];"):t.transA&&!t.transB?(D=`
      var col = tile_row_start + local_id.x;
      var row = k_start + local_id.y;
      if (col < uniforms.M && row < uniforms.K) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.M + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,R="value += tile_a[k][local_id.y] * tile_b[k][local_id.x];"):!t.transA&&t.transB?(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = k_start + local_id.x;
      row = tile_col_start + local_id.y;
      if (col < uniforms.K && row < uniforms.N) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.K + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[local_id.x][k];"):!t.transA&&!t.transB&&(D=`
      var col = k_start + local_id.x;
      var row = tile_row_start + local_id.y;
      if (col < uniforms.K && row < uniforms.M) {
        tile_a[local_id.y][local_id.x] = a[row * uniforms.K + col];
      } else {
        tile_a[local_id.y][local_id.x] = ${$.type.value}(0);
      }

      col = tile_col_start + local_id.x;
      row = k_start + local_id.y;
      if (col < uniforms.N && row < uniforms.K) {
        tile_b[local_id.y][local_id.x] = b[row * uniforms.N + col];
      } else {
        tile_b[local_id.y][local_id.x] = ${S.type.value}(0);
      }
      `,R="value += tile_a[local_id.y][k] * tile_b[k][local_id.x];");let V=t.alpha===1?"":"value *= uniforms.alpha;";return`
  ${w.registerUniforms(z).declareVariables(...k)}
  var<workgroup> tile_a: array<array<${$.type.storage}, ${l}>, ${l}>;
  var<workgroup> tile_b: array<array<${S.type.storage}, ${l}>, ${l}>;
  ${w.mainStart([l,l,1])}
    let tile_col_start = (workgroup_index % uniforms.num_tile_n) * ${l};
    let tile_row_start = (workgroup_index / uniforms.num_tile_n) * ${l};
    let num_tiles = (uniforms.K - 1) / ${l} + 1;
    var k_start = 0u;
    var value = ${I.type.value}(0);
    for (var t: u32 = 0u; t < num_tiles; t++) {
      ${D}
      k_start = k_start + ${l};
      workgroupBarrier();

      for (var k: u32 = 0u; k < ${l}; k++) {
        ${R}
      }
      workgroupBarrier();
    }

    ${V}
    let m = tile_row_start + local_id.y;
    let n = tile_col_start + local_id.x;
    ${x!=null?`let cOffset = ${x.broadcastedIndicesToOffset("vec2(m, n)",I)}; value += ${I.type.value}(uniforms.beta) * ${x.getByOffset("cOffset")};`:""}
    if (m < uniforms.M && n < uniforms.N) {
      output[m * uniforms.N + n] = value;
    }
  }`};return h?{name:"GemmShared",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:p*c},programUniforms:_}),getShaderSource:C}:{name:"Gemm",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:u,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:_}),getShaderSource:v}},Rc=e=>{let t=e.transA,i=e.transB,r=e.alpha,a=e.beta;return{transA:t,transB:i,alpha:r,beta:a,cacheKey:`${e.transA};${e.transB};${e.alpha===1}`}},Bc=(e,t)=>{zu(e.inputs),e.compute(Au(e.inputs,t))}}),Qe,st,xt,Ct,Ou,Ru,Bu,Mu,Nu,Du,Pu,Uu,Mc,Nc,fg=q(()=>{"use strict";te(),ne(),ve(),oe(),[Qe,st,xt,Ct]=[0,1,2,3],Ou=e=>{if(e[0].dims.length!==4)throw new Error("only 4-D tensor is supported.");if(e[0].dims.length!==e[1].dims.length)throw new Error("input dimensions must be equal to grid dimensions");if(e[0].dims.length-2!==e[1].dims[e[1].dims.length-1])throw new Error(`last dimension of grid must be equal to ${e[0].dims.length-2}`);if(e[0].dims[0]!==e[1].dims[0])throw new Error("grid batch size must match input batch size")},Ru=`
  fn gs_get_cubic_coeffs(x: f32) -> vec4<f32> {
    let cubic_alpha = -0.75f;
    let x_abs = abs(x);
    var coeffs: vec4<f32>;
    coeffs[0] = (((cubic_alpha * (x_abs + 1) - 5 * cubic_alpha) * (x_abs + 1) + 8 * cubic_alpha) * (x_abs + 1) - 4 * cubic_alpha);
    coeffs[1] = (((cubic_alpha + 2) * x_abs - (cubic_alpha + 3)) * x_abs * x_abs + 1);
    coeffs[2] = (((cubic_alpha + 2) * (1 - x_abs) - (cubic_alpha + 3)) * (1 - x_abs) * (1 - x_abs) + 1);
    coeffs[3] = (((cubic_alpha * (2 - x_abs) - 5 * cubic_alpha) * (2 - x_abs) + 8 * cubic_alpha) * (2 - x_abs) - 4 * cubic_alpha);
    return coeffs;
  }
`,Bu=e=>`
  fn gs_bicubic_interpolate(p: mat4x4<${e}>, x: f32, y: f32) -> ${e} {
    var v: vec4<f32>;
    var coeffs = gs_get_cubic_coeffs(x);
    for (var i = 0; i < 4; i++) {
      v[i] = coeffs[0] * p[i][0] + coeffs[1] * p[i][1] + coeffs[2] * p[i][2] + coeffs[3] * p[i][3];
    }
    coeffs = gs_get_cubic_coeffs(y);
    let pixel = ${e}(coeffs[0] * v[0] + coeffs[1] * v[1] + coeffs[2] * v[2] + coeffs[3] * v[3]);
    return pixel;
  }
`,Mu=e=>`
  fn gs_denormalize(n: f32, length: i32) -> f32 {
    ${e.alignCorners===0?`
    // alignCorners: false => [-1, 1] to [-0.5, length - 0.5]
    return ((n + 1.0) * f32(length) - 1.0) / 2.0;
    `:`
    // alignCorners: true => [-1, 1] to [0, length - 1]
    return (n + 1.0) / 2.0 * (f32(length - 1));
    `}
  }
`,Nu=e=>`
  ${e.paddingMode==="reflection"?`
      fn gs_reflect(x: i32, x_min: f32, x_max: f32) -> u32 {
        var dx = 0.0;
        var fx = f32(x);
        let range = x_max - x_min;
        if (fx < x_min) {
          dx = x_min - fx;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_min + r;
          } else {
            fx = x_max - r;
          }
        } else if (fx > x_max) {
          dx = fx - x_max;
          let n = u32(dx / range);
          let r = dx - f32(n) * range;
          if (n % 2 == 0) {
            fx = x_max - r;
          } else {
            fx = x_min + r;
          }
        }
        return u32(fx);
      }`:""}
`,Du=(e,t,i)=>`
  fn pixel_at_grid(r: i32, c: i32, H: i32, W: i32, batch: u32, channel: u32, border: vec4<f32>) -> ${t} {
     var pixel = ${t}(0);
     var indices = vec4<u32>(0);
     indices[${Qe}] = batch;
     indices[${st}] = channel;`+(()=>{switch(i.paddingMode){case"zeros":return`
          if (r >= 0 && r < H && c >=0 && c < W) {
            indices[${xt}] = u32(r);
            indices[${Ct}] = u32(c);
          } else {
            return ${t}(0);
          }
        `;case"border":return`
          indices[${xt}] = u32(clamp(r, 0, H - 1));
          indices[${Ct}] = u32(clamp(c, 0, W - 1));
        `;case"reflection":return`
          indices[${xt}] = gs_reflect(r, border[1], border[3]);
          indices[${Ct}] = gs_reflect(c, border[0], border[2]);
        `;default:throw new Error(`padding mode ${i.paddingMode} is not supported`)}})()+`
    return ${e.getByIndices("indices")};
  }
`,Pu=(e,t,i)=>(()=>{switch(i.mode){case"nearest":return`
          let result = pixel_at_grid(i32(round(y)), i32(round(x)), H_in, W_in, indices[${Qe}], indices[${st}], border);
        `;case"bilinear":return`
          let x1 = i32(floor(x));
          let y1 = i32(floor(y));
          let x2 = x1 + 1;
          let y2 = y1 + 1;

          let p11 = pixel_at_grid(y1, x1, H_in, W_in, indices[${Qe}], indices[${st}], border);
          let p12 = pixel_at_grid(y1, x2, H_in, W_in, indices[${Qe}], indices[${st}], border);
          let p21 = pixel_at_grid(y2, x1, H_in, W_in, indices[${Qe}], indices[${st}], border);
          let p22 = pixel_at_grid(y2, x2, H_in, W_in, indices[${Qe}], indices[${st}], border);

          let dx2 = ${t}(f32(x2) - x);
          let dx1 = ${t}(x - f32(x1));
          let dy2 = ${t}(f32(y2) - y);
          let dy1 = ${t}(y - f32(y1));
          let result = dy2 * (dx2 * p11 + dx1 * p12) + dy1 * (dx2 * p21 + dx1 * p22);
        `;case"bicubic":return`
          let x0 = i32(floor(x)) - 1;
          let y0 = i32(floor(y)) - 1;
          var p: mat4x4<${t}>;
          for (var h = 0; h < 4; h++) {
            for (var w = 0; w < 4; w++) {
              p[h][w] = pixel_at_grid(h + y0, w + x0, H_in, W_in, indices[${Qe}], indices[${st}], border);
            }
          }

          let dx = x - f32(x0 + 1);
          let dy = y - f32(y0 + 1);
          let result = gs_bicubic_interpolate(p, dx, dy);
        `;default:throw new Error(`mode ${i.mode} is not supported`)}})()+`${e.setByOffset("global_idx","result")}`,Uu=(e,t)=>{let i=M("x",e[0].dataType,e[0].dims.length),r=[e[1].dims[0],e[1].dims[1],e[1].dims[2]],a=M("grid",e[1].dataType,r.length,2),n=[e[0].dims[0],e[0].dims[1],e[1].dims[1],e[1].dims[2]];t.format==="NHWC"&&(n=[e[0].dims[0],e[1].dims[1],e[1].dims[2],e[0].dims[3]],[Qe,st,xt,Ct]=[0,3,1,2]);let s=K("output",e[0].dataType,n.length),u=i.type.value,l=A.size(n),p=[{type:12,data:l},...Q(e[0].dims,r,n)],c=h=>`
  ${h.registerUniform("output_size","u32").declareVariables(i,a,s)}
  ${Ru}
  ${Bu(u)}
  ${Mu(t)}
  ${Nu(t)}
  ${Du(i,u,t)}

  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let H_in = i32(uniforms.x_shape[${xt}]);
      let W_in = i32(uniforms.x_shape[${Ct}]);

      ${t.alignCorners===0?`
      let x_min = -0.5;
      let x_max = f32(W_in) - 0.5;
      let y_min = -0.5;
      let y_max = f32(H_in) - 0.5;
      `:`
      let x_min = 0.0;
      let x_max = f32(W_in) - 1.0;
      let y_min = 0.0;
      let y_max = f32(H_in) - 1.0;
      `};
      let border = vec4<f32>(x_min, y_min, x_max, y_max);

      let indices = ${s.offsetToIndices("global_idx")};
      var grid_indices = vec3<u32>(indices[${Qe}], indices[${xt}], indices[${Ct}]);
      let nxy = ${a.getByIndices("grid_indices")};
      var x = gs_denormalize(f32(nxy[0]), W_in);
      var y = gs_denormalize(f32(nxy[1]), H_in);

      ${Pu(s,u,t)}
  }`;return{name:"GridSample",shaderCache:{hint:`${t.cacheKey}`,inputDependencies:["type","type"]},getRunData:h=>{let m=A.size(n);return{outputs:[{dims:n,dataType:h[0].dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:p}},getShaderSource:c}},Mc=(e,t)=>{Ou(e.inputs),e.compute(Uu(e.inputs,t))},Nc=e=>he({alignCorners:e.align_corners,mode:e.mode,paddingMode:e.padding_mode,format:e.format})}),Ae,qu,Dc,ea,Wu,pr,Pc,Uc=q(()=>{"use strict";te(),ne(),ve(),Ga(),Za(),oe(),_t(),Ae=(e,t)=>e.length>t&&e[t].dims.length>0?e[t]:void 0,qu=(e,t)=>{let i=e[0],r=Ae(e,1),a=Ae(e,2),n=Ae(e,3),s=Ae(e,4),u=Ae(e,5),l=Ae(e,6),p=Ae(e,7);if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let c=i.dims[0],h=i.dims[1],m=i.dims.length===3?i.dims[2]:t.numHeads*i.dims[4],_=h,y=0,v=0,C=Math.floor(m/t.numHeads);if(l&&p&&A.size(l.dims)&&A.size(p.dims)){if(l.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(l.dims[0]!==c||l.dims[1]!==t.numHeads||l.dims[3]!==C)throw new Error('Input "past_key" shape (batch_size, num_heads, past_sequence_length, head_size)');if(p.dims[0]!==c||p.dims[1]!==t.numHeads||p.dims[3]!==C)throw new Error('Input "past_value" shape (batch_size, num_heads, past_sequence_length, head_size)');if(l.dims[2]!==p.dims[2])throw new Error('Input "past_key" and "past_value" shall have same dim 2 (past_sequence_length)');if(p.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');y=l.dims[2],v=l.dims[2]}else if(l&&A.size(l.dims)||p&&A.size(p.dims))throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w;if(r&&A.size(r.dims)>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(r.dims[2]!==i.dims[2])throw new Error('Input "query" and "key" shall have same dim 2 (hidden_size)');w=2,_=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==C)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');w=5,_=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==C)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');w=0,_=r.dims[2]}}else{if(i.dims.length!==5)throw new Error('Input "query" is expected to have 5 dimensions when key is empty');if(i.dims[2]!==t.numHeads||i.dims[3]!==3)throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}if(n&&A.size(n.dims)>0){if(n.dims.length!==1)throw new Error('Input "bias" is expected to have 1 dimension');if(r&&r.dims.length===5&&r.dims[3]===2)throw new Error("bias is not allowed for packed kv.")}let $=y+_,S=0;if(s&&A.size(s.dims)>0){S=8;let z=s.dims;throw z.length===1?z[0]===c?S=1:z[0]===3*c+2&&(S=3):z.length===2&&z[0]===c&&z[1]===$&&(S=5),S===8?new Error('Input "key_padding_mask" shape shall be (batch_size) or (batch_size, total_sequence_length)'):new Error("Mask not supported")}let x=!1,k=m;if(a&&A.size(a.dims)>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(_!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');k=a.dims[2]}else{if(_!==a.dims[2])throw new Error('Input "key" and "value" shall have the same dim 2 (kv_sequence_length)');k=a.dims[1]*a.dims[3],x=!0}}let I=!1;if(s&&A.size(s.dims)>0)throw new Error("Key padding mask is not supported");if(u&&A.size(u.dims)>0){if(u.dims.length!==4)throw new Error('Input "attention_bias" is expected to have 4 dimensions');if(u.dims[0]!==c||u.dims[1]!==t.numHeads||u.dims[2]!==h||u.dims[3]!==$)throw new Error('Expect "attention_bias" shape (batch_size, num_heads, sequence_length, total_sequence_length)')}return{batchSize:c,sequenceLength:h,pastSequenceLength:y,kvSequenceLength:_,totalSequenceLength:$,maxSequenceLength:v,inputHiddenSize:0,hiddenSize:m,vHiddenSize:k,headSize:C,vHeadSize:Math.floor(k/t.numHeads),numHeads:t.numHeads,isUnidirectional:!1,pastPresentShareBuffer:!1,maskFilterValue:t.maskFilterValue,maskType:S,scale:t.scale,broadcastResPosBias:I,passPastInKv:x,qkvFormat:w}},Dc=e=>he({...e}),ea=he({perm:[0,2,1,3]}),Wu=(e,t,i,r,a,n,s)=>{let u=[r,a,n],l=A.size(u),p=[{type:12,data:l},{type:12,data:s},{type:12,data:n}],c=h=>{let m=K("qkv_with_bias",t.dataType,u),_=M("qkv",t.dataType,u),y=M("bias",i.dataType,u),v=[{name:"output_size",type:"u32"},{name:"bias_offset",type:"u32"},{name:"hidden_size",type:"u32"}];return`
  ${h.registerUniforms(v).declareVariables(_,y,m)}
  ${h.mainStart()}
    ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let bias_offset_idx = (global_idx % uniforms.hidden_size) + uniforms.bias_offset;

    qkv_with_bias[global_idx] = qkv[global_idx] + bias[bias_offset_idx];
  }`};return e.compute({name:"MultiHeadAttentionAddBias",shaderCache:{inputDependencies:["type","type"]},getRunData:()=>({outputs:[{dims:u,dataType:t.dataType,gpuDataType:0}],dispatchGroup:{x:Math.ceil(l/64)},programUniforms:p}),getShaderSource:c},{inputs:[t,i],outputs:[-1]})[0]},pr=(e,t,i,r,a,n,s,u)=>{let l=n;if(s&&A.size(s.dims)>0){if(r===1)throw new Error("AddBiasReshape is not implemented. Please export your model with packed QKV or KV");return l=Wu(e,n,s,t,r,i*a,u),l=l.reshape([t,r,i,a]),i===1||r===1?l:e.compute(Pe(l,ea.perm),{inputs:[l],outputs:[-1]})[0]}else return n.dims.length===3&&(l=n.reshape([t,r,i,a])),i===1||r===1?l:e.compute(Pe(l,ea.perm),{inputs:[l],outputs:[-1]})[0]},Pc=(e,t)=>{let i=qu(e.inputs,t),r=e.inputs[0],a=Ae(e.inputs,1),n=Ae(e.inputs,2),s=Ae(e.inputs,3),u=Ae(e.inputs,4),l=Ae(e.inputs,5),p=Ae(e.inputs,6),c=Ae(e.inputs,7);if(r.dims.length===5)throw new Error("Packed QKV is not implemented");if(a?.dims.length===5)throw new Error("Packed KV is not implemented");let h=a&&n&&a.dims.length===4&&n.dims.length===4,m=pr(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,r,s,0);if(h)return hr(e,m,a,n,u,void 0,p,c,l,i);if(!a||!n)throw new Error("key and value must be provided");let _=pr(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.headSize,a,s,i.hiddenSize),y=pr(e,i.batchSize,i.numHeads,i.kvSequenceLength,i.vHeadSize,n,s,2*i.hiddenSize);hr(e,m,_,y,u,void 0,p,c,l,i)}}),Lu,Vu,ju,Fu,Oa,qc,Wc,Lc=q(()=>{"use strict";te(),ne(),ve(),oe(),Lu=e=>{if(!e||e.length<1)throw new Error("too few inputs")},Vu=(e,t)=>{let i=[],r=t.numOutputs;return e[1].dims[0]>0&&(e[1].getBigInt64Array().forEach(a=>i.push(Number(a))),r=i.length),he({numOutputs:r,axis:t.axis,splitSizes:i})},ju=e=>`
fn calculateOutputIndex(index: u32) -> u32 {
    for (var i: u32 = 0u; i < ${e}u; i += 1u ) {
    if (index < ${Y("uniforms.size_in_split_axis","i",e)}) {
        return i;
    }
    }
    return ${e}u;
}`,Fu=e=>{let t=e.length,i=[];for(let r=0;r<t;++r){let a=e[r].setByIndices("indices","input[global_idx]");t===1?i.push(a):r===0?i.push(`if (output_number == ${r}u) { ${a} }`):r===t-1?i.push(`else { ${a} }`):i.push(`else if (output_number == ${r}) { ${a} }`)}return`
      fn writeBufferData(output_number: u32, indices: ${e[0].type.indices}, global_idx: u32) {
        ${i.join(`
`)}
      }`},Oa=(e,t)=>{let i=e[0].dims,r=A.size(i),a=e[0].dataType,n=A.normalizeAxis(t.axis,i.length),s=new Array(t.numOutputs),u=M("input",a,i.length),l=new Array(t.numOutputs),p=[],c=[],h=0,m=[{type:12,data:r}];for(let y=0;y<t.numOutputs;y++){h+=t.splitSizes[y],l[y]=h;let v=i.slice();v[n]=t.splitSizes[y],c.push(v),s[y]=K(`output${y}`,a,v.length),p.push({dims:c[y],dataType:e[0].dataType})}m.push({type:12,data:l},...Q(i,...c));let _=y=>`
  ${y.registerUniform("input_size","u32").registerUniform("size_in_split_axis","u32",l.length).declareVariables(u,...s)}
  ${ju(l.length)}
  ${Fu(s)}

  ${y.mainStart()}
    ${y.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.input_size")}

    var indices = ${u.offsetToIndices("global_idx")};
    var index = ${u.indicesGet("indices",n)};
    let output_number = calculateOutputIndex(index);
    if (output_number != 0) {
      index -= ${Y("uniforms.size_in_split_axis","output_number - 1u",l.length)};
      ${u.indicesSet("indices",n,"index")};
    }
    writeBufferData(output_number, indices, global_idx);
  }`;return{name:"Split",shaderCache:{hint:t.cacheKey,inputDependencies:["rank"]},getShaderSource:_,getRunData:()=>({outputs:p,dispatchGroup:{x:Math.ceil(r/64)},programUniforms:m})}},qc=(e,t)=>{Lu(e.inputs);let i=e.inputs.length===1?t:Vu(e.inputs,t);e.compute(Oa(e.inputs,i),{inputs:[0]})},Wc=e=>{let t=e.axis,i=e.splitSizes,r=e.numOutputs<0?i.length:e.numOutputs;if(r!==i.length)throw new Error("numOutputs and splitSizes length must be equal");return he({axis:t,numOutputs:r,splitSizes:i})}}),Gu,Hr,Vc,jc=q(()=>{"use strict";te(),ne(),ve(),oe(),Gu=(e,t)=>{let[i,r,a,n]=e,{numHeads:s,rotaryEmbeddingDim:u}=t;if(i.dims.length!==3&&i.dims.length!==4)throw new Error(`Input 'x' is expected to have 3 or 4 dimensions, got ${i.dims.length}`);if(!A.areEqual(r.dims,[])&&!A.areEqual(r.dims,[1])&&r.dims.length!==2)throw new Error(`Input 'position_ids' is expected to have 0, 1, or 2 dimensions, got ${r.dims.length}`);if(a.dims.length!==2)throw new Error(`Input 'cos_cache' is expected to have 2 dimensions, got ${a.dims.length}`);if(n.dims.length!==2)throw new Error(`Input 'sin_cache' is expected to have 2 dimensions, got ${n.dims.length}`);if(!A.areEqual(a.dims,n.dims))throw new Error("Inputs 'cos_cache' and 'sin_cache' are expected to have the same shape");if(u>0&&s===0)throw new Error("num_heads must be provided if rotary_embedding_dim is specified");let l=i.dims[0],p=i.dims[i.dims.length-2],c=a.dims[0],h=A.sizeFromDimension(i.dims,1)/p,m=u===0?a.dims[1]*2:h/s;if(u>m)throw new Error("rotary_embedding_dim must be less than or equal to head_size");if(r.dims.length===2){if(l!==r.dims[0])throw new Error(`Input 'position_ids' dimension 0 should be of size batch_size, got ${r.dims[0]}`);if(p!==r.dims[1])throw new Error(`Input 'position_ids' dimension 1 should be of size sequence_length, got ${r.dims[1]}`)}if(m/2!==a.dims[1]&&u/2!==a.dims[1])throw new Error(`Input 'cos_cache' dimension 1 should be same as head_size / 2 or rotary_embedding_dim / 2, got ${a.dims[1]}`);if(p>c)throw new Error("Updating cos_cache and sin_cache in RotaryEmbedding is not currently supported")},Hr=(e,t)=>{let{interleaved:i,numHeads:r,rotaryEmbeddingDim:a,scale:n}=t,s=e[0].dims[0],u=A.sizeFromDimension(e[0].dims,1),l=e[0].dims[e[0].dims.length-2],p=u/l,c=e[2].dims[1],h=a===0?c*2:p/r,m=new Array(s,l,p/h,h-c),_=A.computeStrides(m),y=[{type:1,data:n},{type:12,data:m},{type:12,data:_},...e[0].dims.length===3?new Array({type:12,data:[u,p,h,1]}):[],...e[0].dims.length===4?new Array({type:12,data:[u,h,l*h,1]}):[],...Q(e[0].dims,e[1].dims,e[2].dims,e[3].dims,e[0].dims)],v=C=>{let w=M("input",e[0].dataType,e[0].dims.length),$=M("position_ids",e[1].dataType,e[1].dims.length),S=M("cos_cache",e[2].dataType,e[2].dims.length),x=M("sin_cache",e[3].dataType,e[3].dims.length),k=K("output",e[0].dataType,e[0].dims.length);return C.registerUniforms([{name:"scale",type:"f32"},{name:"global_shape",type:"u32",length:m.length},{name:"global_strides",type:"u32",length:_.length},{name:"input_output_strides",type:"u32",length:_.length}]),`
        ${C.declareVariables(w,$,S,x,k)}

        ${C.mainStart(jt)}
          let half_rotary_emb_dim = uniforms.${S.name}_shape[1];
          let bsnh = global_idx / uniforms.global_strides % uniforms.global_shape;
          let size = uniforms.global_shape[0] * uniforms.global_strides[0];
          ${C.guardAgainstOutOfBoundsWorkgroupSizes("size")}

          if (bsnh[3] < half_rotary_emb_dim) {
            let position_ids_idx =
                ${$.broadcastedIndicesToOffset("bsnh.xy",K("",$.type.tensor,2))};
            let position_id =
                u32(${$.getByOffset("position_ids_idx")}) + select(0, bsnh[1], position_ids_idx == 0);
            let i = dot(bsnh, uniforms.input_output_strides) + select(0, bsnh[3], ${i});
            let j = i + select(half_rotary_emb_dim, 1, ${i});
            let re = ${w.getByOffset("i")} * ${S.get("position_id","bsnh[3]")} -
                ${w.getByOffset("j")} * ${x.get("position_id","bsnh[3]")};
            ${k.setByOffset("i","re")}
            let im = ${w.getByOffset("i")} * ${x.get("position_id","bsnh[3]")} +
                ${w.getByOffset("j")} * ${S.get("position_id","bsnh[3]")};
            ${k.setByOffset("j","im")}
          } else {
            let k = dot(bsnh, uniforms.input_output_strides) + half_rotary_emb_dim;
            ${k.setByOffset("k",w.getByOffset("k"))}
          }
        }`};return{name:"RotaryEmbedding",shaderCache:{hint:he({interleaved:i}).cacheKey,inputDependencies:["rank","rank","rank","rank"]},getShaderSource:v,getRunData:()=>({outputs:[{dims:e[0].dims,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(m)/jt)},programUniforms:y})}},Vc=(e,t)=>{Gu(e.inputs,t),e.compute(Hr(e.inputs,t))}}),Hu,Ku,ta,Zu,Fc,hg=q(()=>{"use strict";ve(),te(),Za(),Uc(),Lc(),_t(),jc(),oe(),Hu=(e,t)=>{if(t.doRotary&&e.length<=7)throw new Error("cos_cache and sin_cache inputs are required if do_rotary is specified");let i=e[0],r=e[1],a=e[2],n=e[3],s=e[4];if(t.doRotary!==0&&e.length<=7)throw new Error("cos_cast and sin_cache are expected if do_rotary attribute is non-zero");if(t.localWindowSize!==-1)throw new Error("Local attention is not supported");if(t.softcap!==0)throw new Error("Softcap is not supported");if(t.rotaryInterleaved!==0)throw new Error("Rotary interleaved is not supported");if(t.smoothSoftmax)throw new Error("Smooth softmax is not supported");if(i.dims.length!==3&&i.dims.length!==5)throw new Error("Input query is expected to have 3 or 5 dimensions");let u=!1,l=i.dims[0],p=i.dims[1],c=i.dims.length===3?u?i.dims[2]/3:i.dims[2]:t.numHeads*i.dims[4],h=p,m=0,_=!r||r.dims.length===0,y=Math.floor(_?c/(t.numHeads+2*t.kvNumHeads):c/t.numHeads);_&&(c=y*t.numHeads);let v=n&&n.dims.length!==0,C=s&&s.dims.length!==0;if(v&&n.dims.length===4&&n.dims[0]===l&&n.dims[1]!==t.kvNumHeads&&n.dims[2]===t.kvNumHeads&&n.dims[3]===y)throw new Error("BSNH pastKey/pastValue is not supported");if(v&&C){if(n.dims.length!==4)throw new Error('Input "past_key" is expected to have 4 dimensions');if(s.dims.length!==4)throw new Error('Input "past_value" is expected to have 4 dimensions');m=n.dims[2]}else if(v||C)throw new Error('Input "past_key" and "past_value" shall be both present or both absent');let w=1;if(r&&r.dims.length>0){if(i.dims.length!==3)throw new Error('Input "query" is expected to have 3 dimensions when key is given');if(r.dims.length<3||r.dims.length>5)throw new Error('Input "key" is expected to have 3, 4, or 5 dimensions');if(i.dims[0]!==r.dims[0])throw new Error('Input "query" and "key" shall have same dim 0 (batch size)');if(r.dims.length===3){if(i.dims[2]%r.dims[2]!==0)throw new Error('Dimension 2 of "query" should be a multiple of "key"');h=r.dims[1]}else if(r.dims.length===5){if(r.dims[2]!==t.numHeads||r.dims[3]!==2||r.dims[4]!==y)throw new Error('Expect "key" shape (batch_size, kv_sequence_length, num_heads, 2, head_size) for packed kv');if(a)throw new Error('Expect "value" be none when "key" has packed kv format.');h=r.dims[1]}else{if(r.dims[1]!==t.numHeads||r.dims[3]!==y)throw new Error('Expect "key" shape (batch_size, num_heads, kv_sequence_length, head_size) for past_key');h=r.dims[2]}}else{if(i.dims.length!==3&&i.dims.length!==5)throw new Error('Input "query" is expected to have 3 or 5 dimensions when key is empty');if(i.dims.length===5&&(i.dims[2]!==t.numHeads||i.dims[3]!==3))throw new Error('Expect "query" shape (batch_size, kv_sequence_length, num_heads, 3, head_size) for packed kv');w=3}let $=0,S=!1,x=t.kvNumHeads?y*t.kvNumHeads:c;if(a&&a.dims.length>0){if(a.dims.length!==3&&a.dims.length!==4)throw new Error('Input "value" is expected to have 3 or 4 dimensions');if(i.dims[0]!==a.dims[0])throw new Error('Input "query" and "value" shall have same dim 0 (batch_size)');if(a.dims.length===3){if(h!==a.dims[1])throw new Error('Input "key" and "value" shall have the same dim 1 (kv_sequence_length)');x=a.dims[2]}else{if(h!==a.dims[2])throw new Error('Input "past_key" and "past_value" shall have the same dim 2 (kv_sequence_length)');x=a.dims[1]*a.dims[3],S=!0}}let k=e.length>4?e[5]:void 0;if(k&&k.dims.length!==1&&k.dims[0]!==l)throw new Error('Input "seqlens" is expected to have 1 dimension and the same dim 0 as batch_size');return{batchSize:l,sequenceLength:p,pastSequenceLength:m,kvSequenceLength:h,totalSequenceLength:-1,maxSequenceLength:-1,inputHiddenSize:0,hiddenSize:c,vHiddenSize:x,headSize:y,vHeadSize:Math.floor(x/t.kvNumHeads),numHeads:t.numHeads,kvNumHeads:t.kvNumHeads,nReps:t.numHeads/t.kvNumHeads,pastPresentShareBuffer:!1,maskType:$,scale:t.scale,broadcastResPosBias:!1,passPastInKv:S,qkvFormat:w}},Ku=he({perm:[0,2,1,3]}),ta=(e,t,i)=>{let r=t,a=i.kvNumHeads;return t.dims.length===3&&i.kvSequenceLength!==0&&(r=t.reshape([i.batchSize,i.kvSequenceLength,a,i.headSize]),r=e.compute(Pe(r,Ku.perm),{inputs:[r],outputs:[-1]})[0]),r},Zu=(e,t,i,r)=>{let a=7,n=["type","type"],s=[e*t],u=e*t,l=[{type:12,data:u},{type:12,data:t},{type:12,data:e}],p=c=>{let h=M("seq_lens",i.dataType,i.dims),m=M("total_seq_lens",r.dataType,r.dims),_=K("pos_ids",a,s),y=[{name:"output_size",type:"u32"},{name:"sequence_length",type:"u32"},{name:"batch_size",type:"u32"}];return`
  ${c.registerUniforms(y).declareVariables(h,m,_)}
  ${c.mainStart()}
    ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
    let total_sequence_length = u32(${m.getByOffset("0")});
    let is_subsequent_prompt = uniforms.sequence_length > 1 && uniforms.sequence_length != total_sequence_length;
    let is_first_prompt = !is_subsequent_prompt && uniforms.sequence_length == total_sequence_length;
    let batch_idx = global_idx / uniforms.sequence_length;
    let sequence_idx = i32(global_idx % uniforms.sequence_length);
    var pos_id: i32 = 0;
    let seqlen = ${h.getByOffset("batch_idx")};
    let total_seqlen = seqlen + 1;
    if (is_first_prompt) {
      if (sequence_idx < total_seqlen) {
        pos_id = sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (is_subsequent_prompt) {
      let past_seqlen = total_seqlen - i32(uniforms.sequence_length);
      if (past_seqlen + sequence_idx < total_seqlen) {
        pos_id = past_seqlen + sequence_idx;
      } else {
        pos_id = 1;
      }
      ${_.setByOffset("global_idx","pos_id")}
    } else if (global_idx < uniforms.batch_size) {
      ${_.setByOffset("global_idx","seqlen")}
    };
  }
  `};return{name:"GeneratePositionIds",shaderCache:{hint:`${e};${t}`,inputDependencies:n},getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64)},programUniforms:l}),getShaderSource:p}},Fc=(e,t)=>{let i=Hu(e.inputs,t);if(e.inputs[0].dims.length===5)throw new Error("Packed QKV is not implemented");if(e.inputs[1]?.dims.length===5)throw new Error("Packed KV is not implemented");let r=e.inputs[0],a=e.inputs[1]&&e.inputs[1].dims.length>0?e.inputs[1]:void 0,n=e.inputs[2]&&e.inputs[2].dims.length>0?e.inputs[2]:void 0,s=e.inputs[3]&&e.inputs[3].dims.length!==0?e.inputs[3]:void 0,u=e.inputs[4]&&e.inputs[4].dims.length!==0?e.inputs[4]:void 0,l=e.inputs.length>4?e.inputs[5]:void 0,p=e.inputs.length>5?e.inputs[6]:void 0,c=i.kvNumHeads?i.kvNumHeads:i.numHeads,h=he({axis:2,numOutputs:3,splitSizes:[i.numHeads*i.headSize,c*i.headSize,c*i.headSize]}),[m,_,y]=!a&&!n?e.compute(Oa([r],h),{inputs:[r],outputs:[-1,-1,-1]}):[r,a,n],v,C;if(t.doRotary){let x=e.compute(Zu(i.batchSize,i.sequenceLength,l,p),{inputs:[l,p],outputs:[-1]})[0],k=e.inputs[7],I=e.inputs[8],z=he({interleaved:t.rotaryInterleaved!==0,numHeads:i.numHeads,rotaryEmbeddingDim:0,scale:t.scale}),R=[m,x,k,I],D=[-1];v=e.compute(Hr(R,z),{inputs:R,outputs:D})[0],R.splice(0,1,_);let V=he({interleaved:t.rotaryInterleaved!==0,numHeads:i.kvNumHeads,rotaryEmbeddingDim:0,scale:t.scale});C=e.compute(Hr(R,V),{inputs:R,outputs:D})[0]}let w=pr(e,i.batchSize,i.numHeads,i.sequenceLength,i.headSize,t.doRotary?v:m,void 0,0),$=ta(e,t.doRotary?C:_,i),S=ta(e,y,i);hr(e,w,$,S,void 0,void 0,s,u,void 0,i,l,p)}}),ra,Xu,Yu,Gc,mg=q(()=>{"use strict";te(),ne(),_t(),oe(),ra=(e,t,i,r,a,n,s,u)=>{let l=$e(n),p=l===1?"f32":`vec${l}f`,c=l===1?"vec2f":`mat2x${l}f`,h=a*s,m=64;h===1&&(m=256);let _=[a,s,n/l],y=[a,s,2],v=["rank","type","type"],C=[];C.push(...Q(_,y));let w=$=>{let S=M("x",t.dataType,3,l),x=M("scale",i.dataType,i.dims),k=M("bias",r.dataType,r.dims),I=K("output",1,3,2),z=[S,x,k,I];return`
  var<workgroup> workgroup_shared : array<${c}, ${m}>;
  const workgroup_size = ${m}u;
  ${$.declareVariables(...z)}
  ${$.mainStart(m)}
    let batch = workgroup_index / uniforms.x_shape[1];
    let channel = workgroup_index % uniforms.x_shape[1];
    let hight = uniforms.x_shape[2];
    // initialize workgroup memory
    var sum = ${p}(0);
    var squared_sum = ${p}(0);
    for (var h = local_idx; h < hight; h += workgroup_size) {
      let value = ${p}(${S.get("batch","channel","h")});
      sum += value;
      squared_sum += value * value;
    }
    workgroup_shared[local_idx] = ${c}(sum, squared_sum);
    workgroupBarrier();

    for (var currSize = workgroup_size >> 1;  currSize > 0; currSize = currSize >> 1) {
      if (local_idx < currSize) {
        workgroup_shared[local_idx] = workgroup_shared[local_idx] + workgroup_shared[local_idx + currSize];
      }
      workgroupBarrier();
    }
    if (local_idx == 0) {
      let sum_final = ${yt("workgroup_shared[0][0]",l)} / f32(hight * ${l});
      let squared_sum_final = ${yt("workgroup_shared[0][1]",l)} / f32(hight * ${l});

      let inv_std_dev = inverseSqrt(squared_sum_final - sum_final * sum_final + f32(${u}));
      let channel_scale = inv_std_dev * f32(scale[channel]);
      let channel_shift = f32(bias[channel]) - sum_final * channel_scale;
      output[workgroup_index] = vec2f(channel_scale, channel_shift);
    }
  }`};return e.compute({name:"InstanceNormComputeChannelScaleShift",shaderCache:{hint:`${l};${u};${m}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:y,dataType:1}],dispatchGroup:{x:h},programUniforms:C}),getShaderSource:w},{inputs:[t,i,r],outputs:[-1]})[0]},Xu=(e,t,i)=>{let r=t[0].dims,a=r,n=2,s=r[0],u=r[1],l=A.sizeFromDimension(r,n),p=$e(l),c=A.size(a)/p,h=ra(e,t[0],t[1],t[2],s,l,u,i.epsilon),m=[s,u,l/p],_=[s,u],y=["type","none"],v=C=>{let w=M("x",t[0].dataType,m.length,p),$=M("scale_shift",1,_.length,2),S=K("output",t[0].dataType,m.length,p),x=[w,$,S];return`
  ${C.registerUniform("output_size","u32").declareVariables(...x)}
  ${C.mainStart()}
  ${C.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let outputIndices = ${S.offsetToIndices("global_idx")};
      let batch = outputIndices[0];
      let channel = outputIndices[1];
      let scale_shift = ${$.getByIndices("vec2<u32>(batch, channel)")};
      let value = ${w.getByOffset("global_idx")} * ${S.type.value}(scale_shift.x) + ${S.type.value}(scale_shift.y);
      ${S.setByOffset("global_idx","value")};
  }`};e.compute({name:"InstanceNormalization",shaderCache:{hint:`${p}`,inputDependencies:y},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(c/64)},programUniforms:[{type:12,data:c},...Q(m,_,m)]}),getShaderSource:v},{inputs:[t[0],h]})},Yu=(e,t,i)=>{let r=t[0].dims,a=r,n=r[0],s=r[r.length-1],u=A.sizeFromDimension(r,1)/s,l=$e(s),p=A.size(a)/l,c=[{type:12,data:u},{type:12,data:Math.floor(s/l)}],h=["type","type"],m=!1,_=[0,r.length-1];for(let w=0;w<r.length-2;w++)m=m||r[w+1]!==1,_.push(w+1);m=m&&r[r.length-1]!==1;let y=m?e.compute(Pe(e.inputs[0],_),{inputs:[e.inputs[0]],outputs:[-1]})[0]:e.inputs[0].reshape(Array.from({length:r.length},(w,$)=>r[_[$]])),v=ra(e,y,t[1],t[2],n,u,s,i.epsilon),C=w=>{let $=Te(t[0].dataType),S=l===1?"vec2f":`mat${l}x2f`,x=z=>{let R=z===0?"x":"y",D=l===1?"f32":`vec${l}f`;switch(l){case 1:return`${$}(${D}(scale.${R}))`;case 2:return`vec2<${$}>(${D}(scale[0].${R}, scale[1].${R}))`;case 4:return`vec4<${$}>(${D}(scale[0].${R}, scale[1].${R}, scale[2].${R}, scale[3].${R}))`;default:throw new Error(`Not supported compoents ${l}`)}},k=M("input",t[0].dataType,t[0].dims,l),I=K("output",t[0].dataType,a,l);return`
  @group(0) @binding(0) var<storage, read> input : array<${k.type.storage}>;
  @group(0) @binding(1) var<storage, read> scale_input : array<${S}>;
  @group(0) @binding(2) var<storage, read_write> output : array<${I.type.storage}>;
  struct Uniforms {H: u32, C : u32};
  @group(0) @binding(3) var<uniform> uniforms: Uniforms;

  ${w.mainStart()}
    let current_image_number = global_idx / (uniforms.C * uniforms.H);
    let current_channel_number = global_idx % uniforms.C;

    let scale_offset = current_image_number * uniforms.C + current_channel_number;
    let scale = scale_input[scale_offset];
    output[global_idx] = fma(input[global_idx], ${x(0)}, ${x(1)});
  }`};e.compute({name:"InstanceNormalizationNHWC",shaderCache:{hint:`${l}`,inputDependencies:h},getRunData:()=>({outputs:[{dims:a,dataType:t[0].dataType}],dispatchGroup:{x:Math.ceil(p/64)},programUniforms:c}),getShaderSource:C},{inputs:[t[0],v]})},Gc=(e,t)=>{t.format==="NHWC"?Yu(e,e.inputs,t):Xu(e,e.inputs,t)}}),Qu,Ju,Hc,gg=q(()=>{"use strict";te(),ne(),oe(),Qu=e=>{if(!e||e.length<2)throw new Error("layerNorm requires at least 2 inputs.")},Ju=(e,t,i)=>{let r=t.simplified,a=e[0].dims,n=e[1],s=!r&&e[2],u=a,l=A.normalizeAxis(t.axis,a.length),p=A.sizeToDimension(a,l),c=A.sizeFromDimension(a,l),h=A.size(n.dims),m=s?A.size(s.dims):0;if(h!==c||s&&m!==c)throw new Error(`Size of X.shape()[axis:] == ${c}.
       Size of scale and bias (if provided) must match this.
       Got scale size of ${h} and bias size of ${m}`);let _=[];for(let k=0;k<a.length;++k)k<l?_.push(a[k]):_.push(1);let y=$e(c),v=["type","type"],C=[{type:12,data:p},{type:1,data:c},{type:12,data:Math.floor(c/y)},{type:1,data:t.epsilon}];s&&v.push("type");let w=i>1,$=i>2,S=k=>{let I=Te(e[0].dataType),z=[M("x",e[0].dataType,e[0].dims,y),M("scale",n.dataType,n.dims,y)];s&&z.push(M("bias",s.dataType,s.dims,y)),z.push(K("output",e[0].dataType,u,y)),w&&z.push(K("mean_data_output",1,_)),$&&z.push(K("inv_std_output",1,_));let R=[{name:"norm_count",type:"u32"},{name:"norm_size",type:"f32"},{name:"norm_size_vectorized",type:"u32"},{name:"epsilon",type:"f32"}];return`
  ${k.registerUniforms(R).declareVariables(...z)}
  ${k.mainStart()}
    ${k.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.norm_count")}
    let offset = global_idx * uniforms.norm_size_vectorized;
    var mean_vector = ${xa("f32",y)};
    var mean_square_vector = ${xa("f32",y)};

    for (var h: u32 = 0u; h < uniforms.norm_size_vectorized; h++) {
      let value = ${Lt(I,y,"x[h + offset]")};
      mean_vector += value;
      mean_square_vector += value * value;
    }
    let mean = ${yt("mean_vector",y)} / uniforms.norm_size;
    let inv_std_dev = inverseSqrt(${yt("mean_square_vector",y)} / uniforms.norm_size ${r?"":"- mean * mean"} + uniforms.epsilon);

    for (var j: u32 = 0; j < uniforms.norm_size_vectorized; j++) {
      let f32input = ${Lt(I,y,"x[j + offset]")};
      let f32scale = ${Lt(I,y,"scale[j]")};
      output[j + offset] = ${z[0].type.value}((f32input ${r?"":"- mean"}) * inv_std_dev * f32scale
        ${s?`+ ${Lt(I,y,"bias[j]")}`:""}
      );
    }

    ${w?"mean_data_output[global_idx] = mean":""};
    ${$?"inv_std_output[global_idx] = inv_std_dev":""};
  }`},x=[{dims:u,dataType:e[0].dataType}];return w&&x.push({dims:_,dataType:1}),$&&x.push({dims:_,dataType:1}),{name:"LayerNormalization",shaderCache:{hint:`${y};${i};${r}`,inputDependencies:v},getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(p/64)},programUniforms:C}),getShaderSource:S}},Hc=(e,t)=>{Qu(e.inputs),e.compute(Ju(e.inputs,t,e.outputCount))}}),el,Kc,yg=q(()=>{"use strict";ne(),en(),tn(),el=e=>{if(!e||e.length!==2)throw new Error("MatMul requires 2 inputs.");if(e[0].dims[e[0].dims.length-1]!==e[1].dims[e[1].dims.length-2])throw new Error("shared dimension does not match.")},Kc=e=>{el(e.inputs);let t=Vt.calcShape(e.inputs[0].dims,e.inputs[1].dims,!0);if(!t)throw new Error("Can't use matmul on the given tensors");let i=t[t.length-1],r=e.inputs[0].dims[e.inputs[0].dims.length-1];if(i<8&&r<8)e.compute(Ja(e.inputs,{activation:""},t));else{let a=t[t.length-2],n=A.size(e.inputs[0].dims.slice(0,-2)),s=A.size(e.inputs[1].dims.slice(0,-2));if(n!==1&&a===1&&s===1){let u=e.inputs[0].reshape([1,n,r]),l=e.inputs[1].reshape([1,r,i]),p=[1,n,i],c=[u,l];e.compute(Gr(c,{activation:""},t,p),{inputs:c})}else e.compute(Gr(e.inputs,{activation:""},t))}}}),tl,rl,il,Zc,Xc,_g=q(()=>{"use strict";te(),ne(),ve(),oe(),tl=(e,t)=>{if(e.length<3||e.length>4)throw new Error("MatMulNBits requires 3 or 4 inputs");let i=e[0],r=i.dims.length;if(i.dims[r-1]!==t.k)throw new Error("The last dim of input shape does not match the k value");let a=Math.floor((t.k+t.blockSize-1)/t.blockSize),n=t.blockSize/8*t.bits,s=e[1];if(!A.areEqual(s.dims,[t.n,a,n]))throw new Error("The second inputs must be 3D tensor with shape N X nBlocksPerCol X blobSize");let u=e[2].dims;if(A.size(u)!==t.n*a)throw new Error("scales input size error.");if(e.length===4){let l=e[3].dims,p=t.n*(t.bits===8?a:Math.floor((a*t.bits+7)/8));if(A.size(l)!==p)throw new Error("zeroPoints input size error.")}},rl=(e,t)=>{let i=e[0].dims,r=i.length,a=i[r-2],n=t.k,s=t.n,u=i.slice(0,r-2),l=A.size(u),p=e[1].dims[2]/4,c=e[0].dataType,h=$e(t.k),m=$e(p),_=$e(s),y=u.concat([a,s]),v=a>1&&s/_%2===0?2:1,C=A.size(y)/_/v,w=64,$=[],S=[l,a,n/h],x=A.convertShape(e[1].dims).slice();x.splice(-1,1,p/m),$.push(...Q(S)),$.push(...Q(x)),$.push(...Q(e[2].dims)),e.length===4&&$.push(...Q(A.convertShape(e[3].dims)));let k=[l,a,s/_];$.push(...Q(k));let I=z=>{let R=S.length,D=M("a",e[0].dataType,R,h),V=M("b",12,x.length,m),Z=M("scales",e[2].dataType,e[2].dims.length),X=[D,V,Z],re=e.length===4?M("zero_points",12,e[3].dims.length):void 0;re&&X.push(re);let j=k.length,se=K("output",e[0].dataType,j,_),J=Te(e[0].dataType),G=(()=>{switch(h){case 1:return`array<${J}, 8>`;case 2:return`mat4x2<${J}>`;case 4:return`mat2x4<${J}>`;default:throw new Error(`${h}-component is not supported.`)}})(),ae=()=>{let U=`
          // reuse a data
            var input_offset = ${D.indicesToOffset(`${D.type.indices}(batch, row, word_offset)`)};
            var a_data: ${G};
            for (var j: u32 = 0; j < ${8/h}; j++) {
              a_data[j] = ${D.getByOffset("input_offset")};
              input_offset++;
            }
          `;for(let L=0;L<_*v;L++)U+=`
            b_value = ${m===1?`b${L}_data`:`b${L}_data[i]`};
            b_value_lower = unpack4xU8(b_value & b_mask);
            b_value_upper = unpack4xU8((b_value >> 4) & b_mask);
            b_quantized_values = ${G}(${Array.from({length:4},(ie,pe)=>`${J}(b_value_lower[${pe}]), ${J}(b_value_upper[${pe}])`).join(", ")});
            b_dequantized_values = ${h===1?`${G}(${Array.from({length:8},(ie,pe)=>`(b_quantized_values[${pe}] - ${re?`zero_point${L}`:"zero_point"}) * scale${L}`).join(", ")});`:`(b_quantized_values - ${G}(${Array(8).fill(`${re?`zero_point${L}`:"zero_point"}`).join(",")})) * scale${L};`};
            workgroup_shared[local_id.x * ${v} + ${Math.floor(L/_)}]${_>1?`[${L%_}]`:""} += ${Array.from({length:8/h},(ie,pe)=>`${h===1?`a_data[${pe}] * b_dequantized_values[${pe}]`:`dot(a_data[${pe}], b_dequantized_values[${pe}])`}`).join(" + ")};
          `;return U},F=()=>{let U=`
            var col_index = col * ${_};
            ${re?`
            let zero_point_bytes_per_col = (nBlocksPerCol + 1) / 2;
            var zero_point_byte_count: u32;
            var zero_point_word_index: u32;
            var zero_point_byte_offset: u32;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            var zero_point_bits_offset: u32;
            var zero_point_word: u32;`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${J}(8);`}
            `;for(let L=0;L<_*v;L++)U+=`
            let scale${L} = ${Z.getByOffset("col_index * nBlocksPerCol + block")};
            ${re?`
            zero_point_byte_count = col_index * zero_point_bytes_per_col + (block >> 0x1u);
            zero_point_word_index = zero_point_byte_count >> 0x2u;
            zero_point_byte_offset = zero_point_byte_count & 0x3u;
            zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            zero_point_word = ${re.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point${L} = ${J}((zero_point_word) & 0xFu);`:""}
            col_index += 1;`;return U},ye=()=>{let U=`col_index = col * ${_};`;for(let L=0;L<_*v;L++)U+=`
            let b${L}_data = ${V.getByIndices(`${V.type.indices}(col_index, block, word)`)};
            col_index += 1;`;return U+=`
            var b_value: u32;
            let b_mask: u32 = 0x0F0F0F0Fu;
            var b_value_lower: vec4<u32>;
            var b_value_upper: vec4<u32>;
            var b_quantized_values: ${G};
            var b_dequantized_values: ${G};`,U};return`
        var<workgroup> workgroup_shared: array<${se.type.value}, ${v*w}>;
        ${z.declareVariables(...X,se)}
        ${z.mainStart([w,1,1])}
          let output_indices = ${se.offsetToIndices(`(global_idx / ${w}) * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let nBlocksPerCol = uniforms.b_shape[1];

          for (var block = local_id.x; block < nBlocksPerCol; block += ${w}) {
            //process one block
            var word_offset: u32 = block * ${t.blockSize/h};
            ${F()}
            for (var word: u32 = 0; word < ${p}; word += ${m}) {
              ${ye()}
              for (var i: u32 = 0; i < ${m}; i++) {
                ${ae()}
                word_offset += ${8/h};
              }
            }
          }
          workgroupBarrier();

          if (local_id.x < ${v}) {
            var output_value: ${se.type.value} = ${se.type.value}(0);
            var workgroup_shared_offset: u32 = local_id.x;
            for (var b: u32 = 0u; b < ${w}u; b++) {
              output_value += workgroup_shared[workgroup_shared_offset];
              workgroup_shared_offset += ${v};
            }
            ${se.setByIndices(`${se.type.indices}(batch, row, col + local_id.x)`,"output_value")};
          }
        }`};return{name:"MatMulNBits",shaderCache:{hint:`${t.blockSize};${t.bits};${h};${m};${_};${v};${w}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:y,dataType:c}],dispatchGroup:{x:C},programUniforms:$}),getShaderSource:I}},il=(e,t)=>{let i=e[0].dims,r=i.length,a=i[r-2],n=t.k,s=t.n,u=i.slice(0,r-2),l=A.size(u),p=e[1].dims[2]/4,c=e[0].dataType,h=$e(t.k),m=$e(p),_=u.concat([a,s]),y=128,v=s%8===0?8:s%4===0?4:1,C=y/v,w=C*m*8,$=w/h,S=w/t.blockSize,x=A.size(_)/v,k=[],I=[l,a,n/h],z=A.convertShape(e[1].dims).slice();z.splice(-1,1,p/m),k.push(...Q(I)),k.push(...Q(z)),k.push(...Q(e[2].dims)),e.length===4&&k.push(...Q(A.convertShape(e[3].dims)));let R=[l,a,s];k.push(...Q(R));let D=V=>{let Z=I.length,X=M("a",e[0].dataType,Z,h),re=M("b",12,z.length,m),j=M("scales",e[2].dataType,e[2].dims.length),se=[X,re,j],J=e.length===4?M("zero_points",12,e[3].dims.length):void 0;J&&se.push(J);let G=R.length,ae=K("output",e[0].dataType,G),F=Te(e[0].dataType),ye=()=>{switch(h){case 1:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1], sub_a[word_offset + 2], sub_a[word_offset + 3]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 4], sub_a[word_offset + 5], sub_a[word_offset + 6], sub_a[word_offset + 7]);`;case 2:return`
          let a_data0 = vec4<${F}>(sub_a[word_offset], sub_a[word_offset + 1]);
          let a_data1 = vec4<${F}>(sub_a[word_offset + 2], sub_a[word_offset + 3]);`;case 4:return`
          let a_data0 = sub_a[word_offset];
          let a_data1 = sub_a[word_offset + 1];`;default:throw new Error(`${h}-component is not supported.`)}};return`
        var<workgroup> sub_a: array<${X.type.value}, ${$}>;
        var<workgroup> inter_results: array<array<${ae.type.value}, ${C}>, ${v}>;
        ${V.declareVariables(...se,ae)}
        ${V.mainStart([C,v,1])}
          let output_indices = ${ae.offsetToIndices(`workgroup_index * ${v}`)};
          let col = output_indices[2];
          let row = output_indices[1];
          let batch = output_indices[0];
          let n_blocks_per_col = uniforms.b_shape[1];
          let num_tiles =  (n_blocks_per_col - 1) / ${S} + 1;

          // Loop over shared dimension.
          for (var tile: u32 = 0; tile < num_tiles; tile += 1) {
            let a_col_start = tile * ${$};
            // load one tile A data into shared memory.
            for (var a_offset = local_idx; a_offset < ${$}; a_offset += ${y})
            {
              let a_col = a_col_start + a_offset;
              if (a_col < uniforms.a_shape[2])
              {
                sub_a[a_offset] = ${X.getByIndices(`${X.type.indices}(batch, row, a_col)`)};
              } else {
                sub_a[a_offset] = ${X.type.value}(0);
              }
            }
            workgroupBarrier();

            // each thread process one block
            let b_row = col + local_id.y;
            let block = tile * ${S} + local_id.x;
            ${J?`
            let zero_point_bytes_per_col = (n_blocks_per_col + 1) / 2;
            let zero_point_byte_count = b_row * zero_point_bytes_per_col + (block >> 0x1u);
            let zero_point_word_index = zero_point_byte_count >> 0x2u;
            let zero_point_byte_offset = zero_point_byte_count & 0x3u;
            let zero_point_nibble_offset: u32 = block & 0x1u;
            let zero_point_bits_offset = (zero_point_byte_offset << 3) + (zero_point_nibble_offset << 2);
            let zero_point_word = ${J.getByOffset("zero_point_word_index")} >> zero_point_bits_offset;
            let zero_point = ${F}((zero_point_word) & 0xFu);`:`
            // The default zero point is 8 for unsigned 4-bit quantization.
            let zero_point = ${F}(8);`}
            let scale = ${j.getByOffset("b_row * n_blocks_per_col + block")};
            let b_data = ${re.getByIndices(`${re.type.indices}(b_row, block, 0)`)};
            var word_offset = local_id.x * ${t.blockSize/h};
            for (var i: u32 = 0; i < ${m}; i++) {
              ${ye()}
              let b_value = ${m===1?"b_data":"b_data[i]"};
              let b_value_lower = unpack4xU8(b_value & 0x0F0F0F0Fu);
              let b_value_upper = unpack4xU8((b_value >> 4) & 0x0F0F0F0Fu);
              let b_quantized_values = mat2x4<${F}>(${Array.from({length:4},(U,L)=>`${F}(b_value_lower[${L}]), ${F}(b_value_upper[${L}])`).join(", ")});
              let b_dequantized_values = (b_quantized_values - mat2x4<${F}>(${Array(8).fill("zero_point").join(",")})) * scale;
              inter_results[local_id.y][local_id.x] += ${Array.from({length:2},(U,L)=>`${`dot(a_data${L}, b_dequantized_values[${L}])`}`).join(" + ")};
              word_offset += ${8/h};
            }
            workgroupBarrier();
          }

          if (local_idx < ${v}) {
            var output_value: ${ae.type.value} = ${ae.type.value}(0);
            for (var b = 0u; b < ${C}; b++) {
              output_value += inter_results[local_idx][b];
            }
            if (col + local_idx < uniforms.output_shape[2])
            {
              ${ae.setByIndices(`${ae.type.indices}(batch, row, col + local_idx)`,"output_value")}
            }
          }
        }`};return{name:"BlockwiseMatMulNBits32",shaderCache:{hint:`${t.blockSize};${h};${m};${C};${v}`,inputDependencies:Array(e.length).fill("rank")},getRunData:()=>({outputs:[{dims:_,dataType:c}],dispatchGroup:{x},programUniforms:k}),getShaderSource:D}},Zc=(e,t)=>{tl(e.inputs,t),t.blockSize===32&&e.adapterInfo.isVendor("intel")&&e.adapterInfo.isArchitecture("gen-12lp")?e.compute(il(e.inputs,t)):e.compute(rl(e.inputs,t))},Xc=e=>he(e)}),al,nl,sl,ol,ul,ll,dl,pl,Yc,wg=q(()=>{"use strict";te(),ne(),oe(),al=e=>{if(!e||e.length<1)throw new Error("Too few inputs");if(e[0].dataType!==1&&e[0].dataType!==10)throw new Error("Input type must be float or float16.");if(e.length>=2){let t=e[0].dims.length*2===e[1].dims[0];if(e.length===4&&(t=e[3].dims[0]*2===e[1].dims[0]),!t)throw new Error("The pads should be a 1D tensor of shape [2 * input_rank] or [2 * num_axes].")}},nl=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
            k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,i)};
            if (k < 0) {
              break;
            }
            if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
              break;
            }
            offset += k * i32(${Y("uniforms.x_strides",a,t)});
        `;return`
          value = ${e.type.value}(uniforms.constant_value);
          for (var i = 0; i < 1; i++) {
            var offset = 0;
            var k = 0;
            ${r}
            value = x[offset];
          }
      `},sl=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,i)};
                if (k < 0) {
                  k = -k;
                }
                {
                  let _2n_1 = 2 * (i32(${Y("uniforms.x_shape",a,t)}) - 1);
                  k = k % _2n_1;
                  if(k >= i32(${Y("uniforms.x_shape",a,t)})) {
                    k = _2n_1 - k;
                  }
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},ol=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,i)};
                if (k < 0) {
                  k = 0;
                }
                if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
                  k = i32(${Y("uniforms.x_shape",a,t)}) - 1;
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},ul=(e,t,i)=>{let r="";for(let a=t-1;a>=0;--a)r+=`
                k = i32(${e.indicesGet("indices",a)}) - ${Y("uniforms.pads",a,i)};
                if (k < 0)  {
                  k += i32(${Y("uniforms.x_shape",a,t)}]);
                }
                if (k >= i32(${Y("uniforms.x_shape",a,t)})) {
                  k -= i32(${Y("uniforms.x_shape",a,t)});
                }
                offset += k * i32(${Y("uniforms.x_strides",a,t)});
            `;return`
              var offset = 0;
              var k = 0;
              ${r}
              value = x[offset];
          `},ll=(e,t,i)=>{switch(i.mode){case 0:return nl(e,t,i.pads.length);case 1:return sl(e,t,i.pads.length);case 2:return ol(e,t,i.pads.length);case 3:return ul(e,t,i.pads.length);default:throw new Error("Invalid mode")}},dl=(e,t)=>{let i=A.padShape(e[0].dims.slice(),t.pads),r=e[0].dims,a=A.size(i),n=[{type:12,data:a},{type:6,data:t.pads}],s=e.length>=3&&e[2].data;t.mode===0&&n.push({type:s?e[2].dataType:1,data:t.value}),n.push(...Q(e[0].dims,i));let u=["rank"],l=p=>{let c=K("output",e[0].dataType,i.length),h=M("x",e[0].dataType,r.length),m=h.type.value,_=ll(c,r.length,t),y=[{name:"output_size",type:"u32"},{name:"pads",type:"i32",length:t.pads.length}];return t.mode===0&&y.push({name:"constant_value",type:s?m:"f32"}),`
            ${p.registerUniforms(y).declareVariables(h,c)}
            ${p.mainStart()}
            ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}

            let indices = ${c.offsetToIndices("global_idx")};

            var value = ${m}(0);
            ${_}
            output[global_idx] = value;
        }`};return{name:"Pad",shaderCache:{hint:`${t.mode}${s}`,inputDependencies:u},getRunData:()=>({outputs:[{dims:i,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(A.size(i)/64)},programUniforms:n}),getShaderSource:l}},pl=(e,t)=>{if(e.length>1){let i=e[1].getBigInt64Array(),r=e.length>=3&&e[2].data?e[2].dataType===10?e[2].getUint16Array()[0]:e[2].getFloat32Array()[0]:0,a=e[0].dims.length,n=new Int32Array(2*a).fill(0);if(e.length>=4){let u=e[3].getBigInt64Array();for(let l=0;l<u.length;l++)n[Number(u[l])]=Number(i[l]),n[Number(u[l])+a]=Number(i[l+u.length])}else i.forEach((u,l)=>n[Number(l)]=Number(u));let s=[];return n.forEach(u=>s.push(u)),{mode:t.mode,value:r,pads:s}}else return t},Yc=(e,t)=>{al(e.inputs);let i=pl(e.inputs,t);e.compute(dl(e.inputs,i),{inputs:[0]})}}),ar,ia,aa,na,sa,cl,fl,oa,ua,Qc,Jc,la,ef,tf,da,rf,af,nf,sf,bg=q(()=>{"use strict";We(),te(),ne(),oe(),ar=e=>{if(ge.webgpu.validateInputContent&&(!e||e.length!==1))throw new Error("Pool ops requires 1 input.")},ia=(e,t,i)=>{let r=t.format==="NHWC",a=e.dims.slice();r&&a.splice(1,0,a.pop());let n=Object.hasOwnProperty.call(t,"dilations"),s=t.kernelShape.slice(),u=t.strides.slice(),l=n?t.dilations.slice():[],p=t.pads.slice();jr.adjustPoolAttributes(i,a,s,u,l,p);let c=jr.computePoolOutputShape(i,a,u,l,s,p,t.autoPad),h=Object.assign({},t);n?Object.assign(h,{kernelShape:s,strides:u,pads:p,dilations:l,cacheKey:t.cacheKey}):Object.assign(h,{kernelShape:s,strides:u,pads:p,cacheKey:t.cacheKey});let m=c.slice();return m.push(m.splice(1,1)[0]),[h,r?m:c]},aa=(e,t)=>{let i=t.format==="NHWC",r=A.size(e),a=A.size(t.kernelShape),n=[{type:12,data:r},{type:12,data:a}],s=[{name:"outputSize",type:"u32"},{name:"kernelSize",type:"u32"}];if(t.kernelShape.length<=2){let u=t.kernelShape[t.kernelShape.length-1],l=t.strides[t.strides.length-1],p=t.pads[t.pads.length/2-1],c=t.pads[t.pads.length-1],h=!!(p+c);n.push({type:12,data:u},{type:12,data:l},{type:12,data:p},{type:12,data:c}),s.push({name:"kw",type:"u32"},{name:"sw",type:"u32"},{name:"pwStart",type:"u32"},{name:"pwEnd",type:"u32"});let m=!1;if(t.kernelShape.length===2){let _=t.kernelShape[t.kernelShape.length-2],y=t.strides[t.strides.length-2],v=t.pads[t.pads.length/2-2],C=t.pads[t.pads.length-2];m=!!(v+C),n.push({type:12,data:_},{type:12,data:y},{type:12,data:v},{type:12,data:C}),s.push({name:"kh",type:"u32"},{name:"sh",type:"u32"},{name:"phStart",type:"u32"},{name:"phEnd",type:"u32"})}return[n,s,!0,h,m]}else{if(i)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let u=A.computeStrides(t.kernelShape);n.push({type:12,data:u},{type:12,data:t.pads},{type:12,data:t.strides}),s.push({name:"kernelStrides",type:"u32",length:u.length},{name:"pads",type:"u32",length:t.pads.length},{name:"strides",type:"u32",length:t.strides.length});let l=t.pads.reduce((p,c)=>p+c);return[n,s,!!l,!1,!1]}},na=(e,t,i,r,a,n,s,u,l,p,c,h)=>{let m=a.format==="NHWC",_=t.type.value,y=K("output",t.type.tensor,r);if(a.kernelShape.length<=2){let v="",C="",w="",$=i-(m?2:1);if(c?v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  if (xIndices[${$}] < 0 || xIndices[${$}]
                      >= uniforms.x_shape[${$}]) {
                    pad++;
                    continue;
                  }
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`:v=`
                for (var i: u32 = 0u; i < uniforms.kw; i++) {
                  xIndices[${$}] = indices[${$}] * uniforms.sw - uniforms.pwStart + i;
                  let x_val = x[${t.indicesToOffset("xIndices")}];
                  ${n}
                }`,a.kernelShape.length===2){let S=i-(m?3:2);h?C=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                  if (xIndices[${S}] < 0 || xIndices[${S}] >= uniforms.x_shape[${S}]) {
                    pad += i32(uniforms.kw);
                    continue;
                  }
              `:C=`
                for (var j: u32 = 0u; j < uniforms.kh; j++) {
                  xIndices[${S}] = indices[${S}] * uniforms.sh - uniforms.phStart + j;
                `,w=`
              }
            `}return`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}

              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var value = ${_}(${u});
              var pad = 0;
              ${C}
              ${v}
              ${w}
              ${s}

              output[global_idx] = value;
            }`}else{if(m)throw new Error("Pooling with kernelShape.length > 2 is not supported for NHWC format.");let v=a.kernelShape.length,C=a.pads.length,w="";return p?w=`
                if (xIndices[j] >= uniforms.x_shape[j]) {
                  pad++;
                  isPad = true;
                  break;
                }
              }
              if (!isPad) {
                let x_val = x[${t.indicesToOffset("xIndices")}];
                ${n}
              }`:w=`
              }
              let x_val = x[${t.indicesToOffset("xIndices")}];
              ${n}
            `,`
            ${e.registerUniforms(l).declareVariables(t,y)}

            ${e.mainStart()}
              ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
              let indices = ${y.offsetToIndices("global_idx")};
              var xIndices = ${y.offsetToIndices("global_idx")};

              var offsets: array<u32, ${v}>;

              var value = ${_}(${u});
              var pad = 0;
              var isPad = false;

              for (var i: u32 = 0u; i < uniforms.kernelSize; i++) {
                var offset = i;
                for (var j = 0u; j < ${v-1}u; j++) {
                  offsets[j] = offset / ${Y("uniforms.kernelStrides","j",v)};
                  offset -= offsets[j] * ${Y("uniforms.kernelStrides","j",v)};
                }
                offsets[${v-1}] = offset;

                isPad = false;
                for (var j = ${i-v}u; j < ${i}u; j++) {
                  xIndices[j] = indices[j] * ${Y("uniforms.strides",`j - ${i-v}u`,v)}
                    + offsets[j - ${i-v}u] - ${Y("uniforms.pads","j - 2u",C)};
                  ${w}
              }
              ${s}

              output[global_idx] = value;
            }`}},sa=e=>`${e.format};${e.ceilMode};${e.autoPad};${e.kernelShape.length}`,cl=e=>`${sa(e)};${e.countIncludePad}`,fl=e=>`${sa(e)};${e.storageOrder};${e.dilations}`,oa=e=>({format:e.format,autoPad:["NOTSET","VALID","SAME_UPPER","SAME_LOWER"][e.auto_pad],ceilMode:e.ceil_mode,kernelShape:e.kernel_shape,strides:e.strides,pads:e.pads}),ua=(e,t,i,r)=>{let[a,n]=ia(t,r,i),s=M("x",t.dataType,t.dims.length),u=s.type.value,l="value += x_val;",p="";a.countIncludePad?p+=`value /= ${u}(uniforms.kernelSize);`:p+=`value /= ${u}(i32(uniforms.kernelSize) - pad);`;let[c,h,m,_,y]=aa(n,a);c.push(...Q(t.dims,n));let v=["rank"];return{name:e,shaderCache:{hint:`${r.cacheKey};${m};${_};${y}`,inputDependencies:v},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(n)/64)},programUniforms:c}),getShaderSource:C=>na(C,s,t.dims.length,n.length,a,l,p,0,h,m,_,y)}},Qc=e=>{let t=e.count_include_pad!==0,i=oa(e);if(i.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for AveragePool");let r={countIncludePad:t,...i,cacheKey:""};return{...r,cacheKey:cl(r)}},Jc=(e,t)=>{ar(e.inputs),e.compute(ua("AveragePool",e.inputs[0],!1,t))},la={autoPad:"",ceilMode:0,countIncludePad:!1,kernelShape:[],strides:[],pads:[],storageOrder:0,dilations:[]},ef=e=>{let t=e.format;return{format:t,...la,cacheKey:t}},tf=(e,t)=>{ar(e.inputs),e.compute(ua("GlobalAveragePool",e.inputs[0],!0,t))},da=(e,t,i,r)=>{let[a,n]=ia(t,r,i),s=`
      value = max(x_val, value);
    `,u="",l=M("x",t.dataType,t.dims.length),p=["rank"],[c,h,m,_,y]=aa(n,a);return c.push(...Q(t.dims,n)),{name:e,shaderCache:{hint:`${r.cacheKey};${m};${_};${y}`,inputDependencies:p},getRunData:()=>({outputs:[{dims:n,dataType:t.dataType}],dispatchGroup:{x:Math.ceil(A.size(n)/64)},programUniforms:c}),getShaderSource:v=>na(v,l,t.dims.length,n.length,a,s,u,t.dataType===10?-65504:-1e5,h,m,_,y)}},rf=(e,t)=>{ar(e.inputs),e.compute(da("MaxPool",e.inputs[0],!1,t))},af=e=>{let t=e.storage_order,i=e.dilations,r=oa(e);if(t!==0)throw new Error("column major storage order is not yet supported for MaxPool");if(r.ceilMode!==0)throw new Error("using ceil() in shape computation is not yet supported for MaxPool");let a={storageOrder:t,dilations:i,...r,cacheKey:""};return{...a,cacheKey:fl(a)}},nf=e=>{let t=e.format;return{format:t,...la,cacheKey:t}},sf=(e,t)=>{ar(e.inputs),e.compute(da("GlobalMaxPool",e.inputs[0],!0,t))}}),hl,ml,of,uf,$g=q(()=>{"use strict";te(),ne(),ve(),oe(),hl=(e,t)=>{if(e.length<2||e.length>3)throw new Error("DequantizeLinear requires 2 or 3 inputs.");if(e.length===3&&e[1].dims===e[2].dims)throw new Error("x-scale and x-zero-point must have the same shape.");if(e.length===3&&e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[0].dataType===6&&e.length>2)throw new Error("In the case of dequantizing int32 there is no zero point.");if(e[1].dims.length!==0&&e[1].dims.length!==1&&e[1].dims.length!==e[0].dims.length)throw new Error("scale input must be a scalar, a 1D tensor, or have the same rank as the input tensor.");if(e.length>2){if(e[0].dataType!==e[2].dataType)throw new Error("x and x-zero-point must have the same data type.");if(e[1].dims.length!==e[2].dims.length)throw new Error("scale and zero-point inputs must have the same rank.");if(!e[1].dims.map((i,r)=>i===e[2].dims[r]).reduce((i,r)=>i&&r,!0))throw new Error("scale and zero-point inputs must have the same shape.")}if(t.blockSize>0){if(e[1].dims.length===0||e[1].dims.length===1&&e[1].dims[0]===1)throw new Error("blockSize must be set only for block quantization.");if(!e[1].dims.map((a,n)=>n===t.axis||a===e[0].dims[n]).reduce((a,n)=>a&&n,!0))throw new Error("For block qunatization, scale input shape to match the input shape except for the axis");if(e[1].dims.length!==e[0].dims.length)throw new Error("For block qunatization the scale input rank must be the same as the x rank.");let i=e[0].dims[t.axis],r=e[1].dims[t.axis];if(t.blockSize<Math.ceil(i/r)||t.blockSize>Math.ceil(i/(r-1)-1))throw new Error("blockSize must be with in the range [ceil(dI / Si), ceil(dI / (Si - 1) - 1)].")}},ml=(e,t)=>{let i=A.normalizeAxis(t.axis,e[0].dims.length),r=e[0].dataType,a=r===3,n=e[0].dims,s=e[1].dataType,u=A.size(n),l=r===3||r===2,p=l?[Math.ceil(A.size(e[0].dims)/4)]:e[0].dims,c=e[1].dims,h=e.length>2?e[2]:void 0,m=h?l?[Math.ceil(A.size(h.dims)/4)]:h.dims:void 0,_=c.length===0||c.length===1&&c[0]===1,y=_===!1&&c.length===1,v=$e(u),C=_&&(!l||v===4),w=C?v:1,$=C&&!l?v:1,S=M("input",l?12:r,p.length,$),x=M("scale",s,c.length),k=h?M("zero_point",l?12:r,m.length):void 0,I=K("output",s,n.length,w),z=[S,x];k&&z.push(k);let R=[p,c];h&&R.push(m);let D=[{type:12,data:u/w},{type:12,data:i},{type:12,data:t.blockSize},...Q(...R,n)],V=Z=>{let X=[{name:"output_size",type:"u32"},{name:"axis",type:"u32"},{name:"block_size",type:"u32"}];return`
      ${Z.registerUniforms(X).declareVariables(...z,I)}
      ${Z.mainStart()}
          ${Z.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
          let output_indices = ${I.offsetToIndices("global_idx")};

          // Set input x
          ${l?`
            let input = ${S.getByOffset("global_idx / 4")};
            let x_vec = ${a?"unpack4xI8(input)":"unpack4xU8(input)"};
            let x_value = ${w===1?"x_vec[global_idx % 4]":"x_vec"};`:`let x_value = ${S.getByOffset("global_idx")};`};

          // Set scale input
          ${_?`let scale_value= ${x.getByOffset("0")}`:y?`
            let scale_index = ${I.indicesGet("output_indices","uniforms.axis")};
            let scale_value= ${x.getByOffset("scale_index")};`:`
            var scale_indices: ${x.type.indices} = output_indices;
            let index = ${x.indicesGet("scale_indices","uniforms.axis")} / uniforms.block_size;
            ${x.indicesSet("scale_indices","uniforms.axis","index")};
            let scale_value= ${x.getByIndices("scale_indices")};`};

          // Set zero-point input
          ${k?_?l?`
                let zero_point_input = ${k.getByOffset("0")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value= zero_point_vec[0]`:`let zero_point_value = ${k.getByOffset("0")}`:y?l?`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_input = ${k.getByOffset("zero_point_index / 4")};
                let zero_point_vec =  ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_index % 4]`:`
                let zero_point_index = ${I.indicesGet("output_indices","uniforms.axis")};
                let zero_point_value = ${k.getByOffset("zero_point_index")};`:l?`
                let zero_point_offset = ${x.indicesToOffset("scale_indices")};
                let zero_point_input = ${k.getByOffset("zero_point_offset / 4")};
                let zero_point_vec = ${a?"unpack4xI8(zero_point_input)":"unpack4xU8(zero_point_input)"};
                let zero_point_value = zero_point_vec[zero_point_offset % 4];`:`let zero_point_value = ${k.getByIndices("scale_indices")};`:`let zero_point_value = ${l?a?"i32":"u32":S.type.value}(0);`};
      // Compute and write output
      ${I.setByOffset("global_idx",`${I.type.value}(x_value - zero_point_value) * scale_value`)};
      }`};return{name:"DequantizeLinear",shaderCache:{hint:t.cacheKey,inputDependencies:k?["rank","rank","rank"]:["rank","rank"]},getShaderSource:V,getRunData:()=>({outputs:[{dims:n,dataType:s}],dispatchGroup:{x:Math.ceil(u/w/64),y:1,z:1},programUniforms:D})}},of=(e,t)=>{hl(e.inputs,t),e.compute(ml(e.inputs,t))},uf=e=>he({axis:e.axis,blockSize:e.blockSize})}),gl,yl,lf,vg=q(()=>{"use strict";We(),te(),oe(),gl=(e,t,i)=>{let r=e===t,a=e<t&&i<0,n=e>t&&i>0;if(r||a||n)throw new Error("Range these inputs' contents are invalid.")},yl=(e,t,i,r)=>{let a=Math.abs(Math.ceil((t-e)/i)),n=[a],s=a,u=[{type:12,data:s},{type:r,data:e},{type:r,data:i},...Q(n)],l=p=>{let c=K("output",r,n.length),h=c.type.value,m=[{name:"outputSize",type:"u32"},{name:"start",type:h},{name:"delta",type:h}];return`
        ${p.registerUniforms(m).declareVariables(c)}
        ${p.mainStart()}
        ${p.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
        output[global_idx] = uniforms.start + ${h}(global_idx) * uniforms.delta;
      }`};return{name:"Range",shaderCache:{hint:`${r}`},getShaderSource:l,getRunData:()=>({outputs:[{dims:n,dataType:r}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:u})}},lf=e=>{let t=0,i=0,r=0;e.inputs[0].dataType===6?(t=e.inputs[0].getInt32Array()[0],i=e.inputs[1].getInt32Array()[0],r=e.inputs[2].getInt32Array()[0]):e.inputs[0].dataType===1&&(t=e.inputs[0].getFloat32Array()[0],i=e.inputs[1].getFloat32Array()[0],r=e.inputs[2].getFloat32Array()[0]),ge.webgpu.validateInputContent&&gl(t,i,r),e.compute(yl(t,i,r,e.inputs[0].dataType),{inputs:[]})}}),_l,wl,df,pf,xg=q(()=>{"use strict";te(),ne(),ve(),oe(),_l=(e,t,i,r)=>{if(e!=="none"&&r!=="i32"&&r!=="u32"&&r!=="f32")throw new Error(`Input ${r} is not supported with reduction ${e}.`);let a=`{
                var oldValue = 0;
                loop {
                  let newValueF32 =`,n=`;
                  let newValue = bitcast<i32>(newValueF32);
                  let res = atomicCompareExchangeWeak(&${t}, oldValue, newValue);
                  if res.exchanged {
                    break;
                  }
                  oldValue = res.old_value;
                }
              }`;switch(e){case"none":return`${t}=${i};`;case"add":return r==="i32"||r==="u32"?`atomicAdd(&${t}, bitcast<${r}>(${i}));`:`
              ${a}bitcast<${r}>(oldValue) + (${i})${n}`;case"max":return r==="i32"||r==="u32"?`atomicMax(&${t}, bitcast<${r}>(${i}));`:`
                ${a}max(bitcast<f32>(oldValue), (${i}))${n}`;case"min":return r==="i32"||r==="u32"?`atomicMin(&${t}, bitcast<${r}>(${i}));`:`${a}min(bitcast<${r}>(oldValue), (${i}))${n}`;case"mul":return`${a}(bitcast<${r}>(oldValue) * (${i}))${n}`;default:throw new Error(`Reduction ${e} is not supported.`)}},wl=(e,t)=>{let i=e[0].dims,r=e[1].dims,a=i,n=1,s=Math.ceil(A.sizeToDimension(r,r.length-1)/n),u=r[r.length-1],l=A.sizeFromDimension(i,u),p=[{type:12,data:s},{type:12,data:u},{type:12,data:l},...Q(e[1].dims,e[2].dims,a)],c=h=>{let m=M("indices",e[1].dataType,e[1].dims.length),_=M("updates",e[2].dataType,e[2].dims.length,n),y=t.reduction!=="none"&&t.reduction!==""?Pd("output",e[0].dataType,a.length):K("output",e[0].dataType,a.length,n);return`
      ${h.registerUniform("output_size","u32").registerUniform("last_index_dimension","u32").registerUniform("num_updates_elements","u32").declareVariables(m,_,y)}
      ${h.mainStart()}
        ${h.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
  var data_offset = 0u;
  let indices_start = uniforms.last_index_dimension * global_idx;
  let indices_end = indices_start + uniforms.last_index_dimension;
  for (var i = indices_start; i < indices_end; i++) {
    var index = i32(indices[i].x);
    ${e[0].dims.length===1?`
    let element_count_dim = uniforms.output_strides;
    let dim_value = uniforms.output_shape;`:`
    let element_count_dim = uniforms.output_strides[i - indices_start];
    let dim_value = uniforms.output_shape[i - indices_start];`}
    if (index >= 0) {
      if (index >= i32(dim_value)) {
        index = i32(dim_value - 1);
      }
    } else {
      if (index < -i32(dim_value)) {
        index = 0;
      } else {
        index += i32(dim_value);
      }
    }
    data_offset += u32((u32(index) * element_count_dim));
  }

  for (var i = 0u; i < uniforms.num_updates_elements; i++) {
    let value = updates[uniforms.num_updates_elements * global_idx + i];
    ${_l(t.reduction,"output[data_offset + i]","value",y.type.value)}
  }

      }`};return{name:"ScatterND",shaderCache:{hint:`${t.cacheKey}_${t.reduction}`,inputDependencies:["rank","rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(s/64)},programUniforms:p}),getShaderSource:c}},df=e=>he({reduction:e.reduction}),pf=(e,t)=>{e.compute(wl(e.inputs,t),{inputs:[e.inputs[1],e.inputs[2]],outputs:[]})}}),bl,$l,vl,pa,xl,Cl,Sl,Tl,kl,Il,El,zl,ca,Al,Ol,Rl,Bl,Ml,cf,ff,Cg=q(()=>{"use strict";te(),ne(),ve(),oe(),bl=(e,t)=>{if(e.every(i=>i>0||(()=>{throw new Error("Resize requires scales input values to be positive")})),e.length>0){if(t.mode==="linear"){if(!(e.length===2||e.length===3||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1||e.length===5&&e[0]===1&&e[1]===1))throw new Error(`For linear mode, Resize requires scales to be 2D, 3D, 4D with either two outermost or one innermost and
            one outermost scale values equal to 1, or 5D with two outermost scale values equal to 1`)}else if(t.mode==="cubic"&&!(e.length===2||e.length===4&&e[0]===1&&e[1]===1||e.length===4&&e[0]===1&&e[3]===1))throw new Error("Resize requires scales input size to be 2 or 4 for cubic mode")}},$l=(e,t,i)=>{t.every(a=>a>=0&&a<i||(()=>{throw new Error("Resize requires axes input values to be positive and less than rank")}));let r=new Array(i).fill(1);return t.forEach((a,n)=>r[a]=e[n]),r},vl=(e,t,i,r,a,n)=>{let[s,u,l]=i>10?[1,2,3]:[-1,e.length>1?1:-1,-1],p=e[0].dims.length;if(s>0&&e.length>s&&e[s].dims.length>0)e[s].getFloat32Array().forEach(c=>n.push(c));else if(t.coordinateTransformMode==="tf_crop_and_resize")throw new Error("Resize requires RoI input to be specified when coordinateTransformMode is tfCropAndResize");if(u>0&&e.length>u&&e[u].dims.length===1&&e[u].dims[0]>0){if(e[u].getFloat32Array().forEach(c=>r.push(c)),r.length!==0&&r.length!==p&&i>=18&&r.length!==t.axes.length)throw new Error("Resize requires scales input size to be same as input rank or axes size for opset 18 and up");bl(r,t),t.axes.length>0&&$l(r,t.axes,p).forEach((c,h)=>r[h]=c)}if(l>0&&e.length>l&&e[l].dims.length===1&&e[l].dims[0]>0&&(e[l].getBigInt64Array().forEach(c=>a.push(Number(c))),a.length!==0&&a.length!==p&&i>=18&&a.length!==t.axes.length))throw new Error("Resize requires sizes input size to be same as input rank or axes size for opset 18 and up");if(t.axes.length>0){if(r.length!==0&&r.length!==t.axes.length)throw new Error('Resize requires "scales" input size to be of axes rank when axes attributes is specified');if(a.length!==0&&a.length!==t.axes.length)throw new Error('Resize requires "sizes" input size to be of rank axes rank when axes attributes is specified')}if(typeof r<"u"&&typeof a<"u"&&r.length>0&&a.length>p)throw new Error("Resize requires only of scales or sizes to be specified")},pa=(e,t,i,r)=>`
  // The whole part and the fractional part are calculated separately due to inaccuracy of floating
  // point division. As an example, f32(21) / f32(7) may evaluate to 2.99... instead of 3, causing an
  // offset-by-one error later in floor().
  let big = (${e}) * (${t});
  let whole = ${r}(big / (${i}));
  let fract = ${r}(big % (${i})) / ${r}(${i});
  return whole + fract;
`,xl=(e,t)=>`fn getOriginalCoordinateFromResizedCoordinate(xResized: u32, xScale: f32, lengthResized: u32,
     lengthOriginal: u32, roiStart: f32, roiEnd: f32) -> ${t} { `+(()=>{switch(e){case"asymmetric":return`
          if (xScale < 1.0 || floor(xScale) != xScale) {
            return ${t}(xResized) / ${t}(xScale);
          } else {
            ${pa("xResized","lengthOriginal","lengthResized",t)}
          }
        `;case"pytorch_half_pixel":return`if (lengthResized > 1) {
                    return (${t}(xResized) + 0.5) / ${t}(xScale) - 0.5;
                  } else {
                    return 0.0;
                  }`;case"tf_half_pixel_for_nn":return`return (${t}(xResized) + 0.5) / ${t}(xScale);`;case"align_corners":return`if (lengthResized == 1) {
                    return 0.0;
                  } else {
                    ${pa("xResized","lengthOriginal - 1","lengthResized - 1",t)}
                  }`;case"tf_crop_and_resize":return`if (lengthResized > 1) {
                    return ${t}(roiStart) * ${t}(lengthOriginal - 1) +
                        (${t}(xResized) * ${t}(roiEnd - roiStart) * ${t}(lengthOriginal - 1)) /
                        ${t}(lengthResized - 1);
                  } else {
                    return 0.5 * ${t}(roiStart + roiEnd) * ${t}(lengthOriginal - 1);
                  }`;case"half_pixel_symmetric":return`const outputWidth = ${t}xScale * ${t}(lengthResized);
                  const adjustment = ${t}(lengthResized) / outputWidth;
                  const center = ${t}(lengthOriginal) / 2;
                  const offset = center * (1 - adjustment);
                  return offset + ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;case"half_pixel":return`return ((${t}(xResized) + 0.5) / ${t}(xScale)) - 0.5;`;default:throw new Error(`Coordinate transform mode ${e} is not supported`)}})()+"}",Cl=(e,t,i)=>`fn getNearestPixelFromOriginal(xOriginal: ${i}, isDownSample: bool) -> ${i} {`+(()=>{switch(e){case"round_prefer_ceil":return"if (fract(xOriginal) == 0.5) {             return ceil(xOriginal);           } else {             return round(xOriginal);           }";case"floor":return"return floor(xOriginal);";case"ceil":return"return ceil(xOriginal);";case"round_prefer_floor":return"if (fract(xOriginal) == 0.5) {                     return floor(xOriginal);                   } else {                     return round(xOriginal);                   }";default:if(t<11)return"if (isDownSample)                     {                       return ceil(xOriginal);                     } else {                       return xOriginal;                     }";throw new Error(`Nearest mode ${e} is not supported`)}})()+"}",Sl=(e,t,i)=>{let r=new Array(i).fill(0).concat(new Array(i).fill(1)),a=e.length===0?r:e.slice();return t.length>0?(t.forEach((n,s)=>{r[n]=a[s],r[s+i]=a[t.length+s]}),r):a},Tl=(e,t,i,r)=>{let a=[];if(i.length>0)if(r.length>0){if(e.forEach(n=>a.push(n)),Math.max(...r)>e.length)throw new Error("axes is out of bound");r.forEach((n,s)=>a[n]=i[s])}else i.forEach(n=>a.push(n));else{if(t.length===0)throw new Error("Resize requires either scales or sizes.");a=e.map((n,s)=>Math.round(n*t[s]))}return a},kl=(e,t,i)=>{let r=(()=>{switch(i.keepAspectRatioPolicy){case"not_larger":return i.axes.length>0?Math.min(...i.axes.map(n=>t[n]),Number.MAX_VALUE):Math.min(...t,Number.MAX_VALUE);case"not_smaller":return i.axes.length>0?Math.max(...i.axes.map(n=>t[n]),Number.MIN_VALUE):Math.max(...t,Number.MIN_VALUE);default:throw new Error(`Keep aspect ratio policy ${i.keepAspectRatioPolicy} is not supported`)}})();t.fill(1,0,t.length);let a=e.slice();return i.axes.length>0?(i.axes.forEach(n=>t[n]=r),i.axes.forEach(n=>a[n]=Math.round(e[n]*t[n]))):(t.fill(r,0,t.length),a.forEach((n,s)=>a[s]=Math.round(n*t[s]))),a},Il=(e,t,i,r,a)=>`
    fn calculateOriginalIndicesFromOutputIndices(output_indices: ${e.type.indices}) -> array<${e.type.value}, ${i.length}> {
      var original_indices: array<${e.type.value}, ${i.length}>;
      for (var i:u32 = 0; i < ${i.length}; i++) {
        var output_index = ${e.indicesGet("output_indices","i")};
        var scale = ${Y("uniforms.scales","i",r)};
        var roi_low = ${Y("uniforms.roi","i",a)};
        var roi_hi = ${Y("uniforms.roi",`i + ${t.length}`,a)};
        if (scale == 1.0) {
          original_indices[i] = ${e.type.value}(output_index);
        } else {
          var input_shape_i = ${Y("uniforms.input_shape","i",t.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",i.length)};
          original_indices[i] = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                           input_shape_i, roi_low, roi_hi);
        }
      }
      return original_indices;
    }`,El=(e,t,i,r,a,n,s)=>`
    fn calculateInputIndicesFromOutputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
      var input_indices: ${e.type.indices};
      for (var i:u32 = 0; i < ${r.length}; i++) {
        var output_index = ${t.indicesGet("output_indices","i")};
        var input_index: u32;
        var scale = ${Y("uniforms.scales","i",a)};
        if (scale == 1.0) {
          input_index = output_index;
        } else {
          var roi_low = ${Y("uniforms.roi","i",n)};
          var roi_hi = ${Y("uniforms.roi",`i + ${i.length}`,n)};
          var input_shape_i = ${Y("uniforms.input_shape","i",i.length)};
          var output_shape_i = ${Y("uniforms.output_shape","i",r.length)};
          var original_idx = getOriginalCoordinateFromResizedCoordinate(output_index, scale, output_shape_i,
                                                                        input_shape_i, roi_low, roi_hi);
          if (!${s} || (original_idx >= 0 && original_idx < ${t.type.value}(input_shape_i))) {
            if (original_idx < 0) {
              input_index = 0;
            } else if (original_idx > ${t.type.value}(input_shape_i - 1)) {
              input_index = input_shape_i - 1;
            } else {
              input_index = u32(getNearestPixelFromOriginal(original_idx, scale < 1));
            }
          } else {
            input_index = u32(original_idx);
          }
        }
        ${e.indicesSet("input_indices","i","input_index")}
      }
      return input_indices;
    }`,zl=(e,t)=>`
    fn checkInputIndices(input_indices: ${e.type.indices}) -> bool {
      for (var i:u32 = 0; i < ${t.length}; i++) {
        var input_index = ${e.indicesGet("input_indices","i")};
        if (input_index < 0 || input_index >= ${Y("uniforms.input_shape","i",t.length)}) {
          return false;
        }
      }
      return true;
    }`,ca=(e,t,i,r)=>e.rank>r?`
    ${e.indicesSet("input_indices",t,"channel")};
    ${e.indicesSet("input_indices",i,"batch")};
`:"",Al=(e,t,i,r,a)=>{let[n,s,u,l]=i.length===2?[-1,0,1,-1]:[0,2,3,1],p=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, row: u32, col: u32) -> ${p} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(row, ${i[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(col, ${i[u]} - 1))`)};
      ${ca(e,l,n,2)}
      return ${e.getByIndices("input_indices")};
    }

    fn bilinearInterpolation(output_indices: ${t.type.indices}) -> ${p} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var row:${p} = originalIndices[${s}];
      var col:${p} = originalIndices[${u}];
      ${r?`if (row < 0 || row > (${i[s]} - 1) || col < 0 || col > (${i[u]} - 1)) {
        return ${a};
      }`:""};
      row = max(0, min(row, ${i[s]} - 1));
      col = max(0, min(col, ${i[u]} - 1));
      var row1: u32 = u32(row);
      var col1: u32 = u32(col);
      var row2: u32 = u32(row + 1);
      var col2: u32 = u32(col + 1);
      var channel: u32 = ${i.length>2?`u32(originalIndices[${l}])`:"0"};
      var batch: u32 =  ${i.length>2?`u32(originalIndices[${n}])`:"0"};
      var x11: ${p} = getInputValue(batch, channel, row1, col1);
      var x12: ${p} = getInputValue(batch, channel, row1, col2);
      var x21: ${p} = getInputValue(batch, channel, row2, col1);
      var x22: ${p} = getInputValue(batch, channel, row2, col2);
      var dx1: ${p} = abs(row - ${p}(row1));
      var dx2: ${p} = abs(${p}(row2) - row);
      var dy1: ${p} = abs(col - ${p}(col1));
      var dy2: ${p} = abs(${p}(col2) - col);
      if (row1 == row2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (col1 == col2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      return (x11 * dx2 * dy2 + x12 * dx2 * dy1 + x21 * dx1 * dy2 + x22 * dx1 * dy1);
    }`},Ol=(e,t,i,r,a,n,s,u,l,p)=>{let c=i.length===2,h=!0,[m,_]=c?[0,1]:h?[2,3]:[1,2],y=e.type.value,v=C=>{let w=C===m?"row":"col";return`
      fn ${w}CubicInterpolation(input_indices: ${e.type.indices}, output_indices: ${t.type.indices}) -> ${y} {
        var output_index = ${t.indicesGet("output_indices",C)};
        var originalIdx: ${y} = getOriginalCoordinateFromResizedCoordinate(output_index, ${a[C]},
        ${r[C]}, ${i[C]}, ${n[C]}, ${n[C]} + ${i.length});
        var fractOriginalIdx: ${y} = originalIdx - floor(originalIdx);
        var coefs = getCubicInterpolationCoefs(fractOriginalIdx);

        if (${u} && (originalIdx < 0 || originalIdx > (${i[C]} - 1))) {
          return ${l};
        }
        var data: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
        for (var i: i32 = -1; i < 3; i++) {
          var ${w}: ${y} = originalIdx + ${y}(i);
          if (${w} < 0 || ${w} >= ${i[C]}) {
            ${p?`coefs[i + 1] = 0.0;
                        continue;`:u?`return ${l};`:`${w} = max(0, min(${w}, ${i[C]} - 1));`};
          }
        var input_indices_copy: ${e.type.indices} = input_indices;
          ${e.indicesSet("input_indices_copy",C,`u32(${w})`)};
          data[i + 1] = ${C===m?e.getByIndices("input_indices_copy"):"rowCubicInterpolation(input_indices_copy, output_indices)"};
        }
        return cubicInterpolation1D(data, coefs);
      }`};return`
    ${v(m)};
    ${v(_)};
  fn getCubicInterpolationCoefs(s: ${y}) -> array<${y}, 4> {
    var absS = abs(s);
    var coeffs: array<${y}, 4> = array<${y}, 4>(0.0, 0.0, 0.0, 0.0);
    var oneMinusAbsS: ${y} = 1.0 - absS;
    var twoMinusAbsS: ${y} = 2.0 - absS;
    var onePlusAbsS: ${y} = 1.0 + absS;
    coeffs[0] = ((${s} * onePlusAbsS - 5 * ${s}) * onePlusAbsS + 8 * ${s}) * onePlusAbsS - 4 * ${s};
    coeffs[1] = ((${s} + 2) * absS - (${s} + 3)) * absS * absS + 1;
    coeffs[2] = ((${s} + 2) * oneMinusAbsS - (${s} + 3)) * oneMinusAbsS * oneMinusAbsS + 1;
    coeffs[3] = ((${s} * twoMinusAbsS - 5 * ${s}) * twoMinusAbsS + 8 * ${s}) * twoMinusAbsS - 4 * ${s};
    return coeffs;
  }

  fn cubicInterpolation1D(x: array<${y}, 4>, coefs: array<${y}, 4>) -> ${y} {
    var coefsSum: ${y} = coefs[0] + coefs[1] + coefs[2] + coefs[3];
    return (x[0] * coefs[0] + x[1] * coefs[1]+ x[2] * coefs[2]+ x[3] * coefs[3]) / coefsSum;
  }

  fn bicubicInterpolation(output_indices: ${t.type.indices}) -> ${y} {
    var input_indices: ${e.type.indices} = output_indices;
    return colCubicInterpolation(input_indices, output_indices);
  }
    `},Rl=(e,t,i,r,a)=>{let[n,s,u,l,p]=i.length===3?[-1,0,1,2,-1]:[0,2,3,4,1],c=e.type.value;return`
    fn getInputValue(batch: u32, channel: u32, depth:u32, height: u32, width: u32) -> ${c} {
      var input_indices: ${e.type.indices};
      ${e.indicesSet("input_indices",s,`max(0, min(depth, ${i[s]} - 1))`)};
      ${e.indicesSet("input_indices",u,`max(0, min(height, ${i[u]} - 1))`)};
      ${e.indicesSet("input_indices",l,`max(0, min(width, ${i[l]} - 1))`)};
      ${ca(e,p,n,3)}
      return ${e.getByIndices("input_indices")};
    }

    fn trilinearInterpolation(output_indices: ${t.type.indices}) -> ${c} {
      var originalIndices = calculateOriginalIndicesFromOutputIndices(output_indices);
      var depth:${c} = originalIndices[${s}];
      var height:${c} = originalIndices[${u}];
      var width:${c} = originalIndices[${l}];
      ${r?`if (depth < 0 || depth > (${i[s]} - 1) || height < 0 || height > (${i[u]} - 1) || width < 0 || (width > ${i[l]} - 1)) {
      return ${a};
        }`:""};

    depth = max(0, min(depth, ${i[s]} - 1));
      height = max(0, min(height, ${i[u]} - 1));
      width = max(0, min(width, ${i[l]} - 1));
      var depth1: u32 = u32(depth);
      var height1: u32 = u32(height);
      var width1: u32 = u32(width);
      var depth2: u32 = u32(depth + 1);
      var height2: u32 = u32(height + 1);
      var width2: u32 = u32(width + 1);
      var channel: u32 = ${i.length>3?`u32(originalIndices[${p}])`:"0"};
      var batch: u32 =  ${i.length>3?`u32(originalIndices[${n}])`:"0"};

      var x111: ${c} = getInputValue(batch, channel, depth1, height1, width1);
      var x112: ${c} = getInputValue(batch, channel, depth1, height1, width2);
      var x121: ${c} = getInputValue(batch, channel, depth1, height2, width1);
      var x122: ${c} = getInputValue(batch, channel, depth1, height2, width2);
      var x211: ${c} = getInputValue(batch, channel, depth2, height1, width1);
      var x212: ${c} = getInputValue(batch, channel, depth2, height1, width2);
      var x221: ${c} = getInputValue(batch, channel, depth2, height2, width1);
      var x222: ${c} = getInputValue(batch, channel, depth2, height2, width2);
      var dx1: ${c} = abs(depth - ${c}(depth1));
      var dx2: ${c} = abs(${c}(depth2) - depth);
      var dy1: ${c} = abs(height - ${c}(height1));
      var dy2: ${c} = abs(${c}(height2) - height);
      var dz1: ${c} = abs(width - ${c}(width1));
      var dz2: ${c} = abs(${c}(width2) - width);
      if (depth1 == depth2) {
        dx1 = 0.5;
        dx2 = 0.5;
      }
      if (height1 == height2) {
        dy1 = 0.5;
        dy2 = 0.5;
      }
      if (width1 == width2) {
        dz1 = 0.5;
        dz2 = 0.5;
      }
      return (x111 * dx2 * dy2 * dz2 + x112 * dx2 * dy2 * dz1 + x121 * dx2 * dy1 *dz2 + x122 * dx2 * dy1 * dz1 +
              x211 * dx1 * dy2 * dz2 + x212 * dx1 * dy2 * dz1 + x221 * dx1 * dy1 *dz2 + x222 * dx1 * dy1 * dz1);
    }`},Bl=(e,t,i,r,a,n)=>{let s=e.dims,u=Sl(n,t.axes,s.length),l=Tl(s,r,a,t.axes),p=r.slice();r.length===0&&(p=s.map(($,S)=>$===0?1:l[S]/$),t.keepAspectRatioPolicy!=="stretch"&&(l=kl(s,p,t)));let c=K("output",e.dataType,l.length),h=M("input",e.dataType,s.length),m=A.size(l),_=s.length===l.length&&s.every(($,S)=>$===l[S]),y=t.coordinateTransformMode==="tf_crop_and_resize",v=t.extrapolationValue,C=h.type.value,w=$=>`
      ${_?"":`
      ${xl(t.coordinateTransformMode,C)};
      ${(()=>{switch(t.mode){case"nearest":return`
              ${zl(h,s)};
              ${Cl(t.nearestMode,i,C)};
              ${El(h,c,s,l,p.length,u.length,y)};
              `;case"linear":return`
              ${Il(c,s,l,p.length,u.length)};
              ${(()=>{if(s.length===2||s.length===4)return`${Al(h,c,s,y,v)}`;if(s.length===3||s.length===5)return`${Rl(h,c,s,y,v)}`;throw Error("Linear mode only supports input dims 2, 3, 4 and 5 are supported in linear mode.")})()};
            `;case"cubic":return`
            ${(()=>{if(s.length===2||s.length===4)return`${Ol(h,c,s,l,p,u,t.cubicCoeffA,y,t.extrapolationValue,t.excludeOutside)}`;throw Error("Cubic mode only supports input dims 2 and 4 are supported in linear mode.")})()};
            `;default:throw Error("Invalid resize mode")}})()};
      `}
      ${$.registerUniform("output_size","u32").registerUniform("scales","f32",p.length).registerUniform("roi","f32",u.length).declareVariables(h,c)}
      ${$.mainStart()}
        ${$.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
        ${_?"output[global_idx] = input[global_idx];":`
        let output_indices = ${c.offsetToIndices("global_idx")};
        var input_indices: ${h.type.indices};
        ${(()=>{switch(t.mode){case"nearest":return`input_indices = calculateInputIndicesFromOutputIndices(output_indices);
                if (checkInputIndices(input_indices)) {
                  output[global_idx] = ${h.getByIndices("input_indices")};
                } else {
                  output[global_idx] = ${t.extrapolationValue};
                }`;case"linear":return`output[global_idx] = ${s.length===2||s.length===4?"bilinearInterpolation":"trilinearInterpolation"}(output_indices);`;case"cubic":return"output[global_idx] = bicubicInterpolation(output_indices);";default:throw Error(`Unsupported resize mode: ${t.mode}`)}})()};
`}
      }`;return{name:"Resize",shaderCache:{hint:`${t.cacheKey}|${i}|${p.length>0?t.mode==="cubic"?p:p.length:""}|${a.length>0?a:""}|${u.length>0?u:""}|${_}|${t.mode==="nearest"?s.length:s}`,inputDependencies:["rank"]},getShaderSource:w,getRunData:()=>({outputs:[{dims:l,dataType:e.dataType}],dispatchGroup:{x:Math.ceil(m/64)},programUniforms:[{type:12,data:m},{type:1,data:p},{type:1,data:u},...Q(s,l)]})}},Ml=e=>{let t=e.customDataBuffer;return new Uint32Array(t,t.byteOffset,1)[0]},cf=(e,t)=>{let i=[],r=[],a=[],n=Ml(e);if(t.antialias!==0)throw Error("Only default value (0) for Antialias attribute is supported");vl(e.inputs,t,n,i,r,a),e.compute(Bl(e.inputs[0],t,n,i,r,a),{inputs:[0]})},ff=e=>{let t=e.antialias,i=e.axes,r=e.coordinateTransformMode,a=e.cubicCoeffA,n=e.excludeOutside!==0,s=e.extrapolationValue,u=e.keepAspectRatioPolicy,l=e.mode,p=e.nearestMode===""?"simple":e.nearestMode;return he({antialias:t,axes:i,coordinateTransformMode:r,cubicCoeffA:a,excludeOutside:n,extrapolationValue:s,keepAspectRatioPolicy:u,mode:l,nearestMode:p})}}),Nl,Dl,hf,Sg=q(()=>{"use strict";te(),ne(),oe(),Nl=e=>{if(!e||e.length<3)throw new Error("layerNorm requires at least 3 inputs.");let t=e[0],i=e[1],r=e[2];if(t.dataType!==i.dataType||t.dataType!==r.dataType)throw new Error("All inputs must have the same data type");if(t.dims.length!==3&&t.dims.length!==2)throw new Error("Input must be 2D or 3D");if(i.dims.length!==3&&i.dims.length!==2)throw new Error("Skip must be 2D or 3D");let a=t.dims[t.dims.length-1],n=t.dims[t.dims.length-2];if(i.dims[i.dims.length-1]!==a)throw new Error("Skip must have the same hidden size as input");if(i.dims[i.dims.length-2]!==n)throw new Error("Skip must have the same sequence length as input");if(r.dims.length!==1)throw new Error("Gamma must be 1D");if(r.dims[r.dims.length-1]!==a)throw new Error("Gamma must have the same hidden size as input");if(e.length>3){let s=e[3];if(s.dims.length!==1)throw new Error("Beta must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Beta must have the same hidden size as input")}if(e.length>4){let s=e[4];if(s.dims.length!==1)throw new Error("Bias must be 1D");if(s.dims[s.dims.length-1]!==a)throw new Error("Bias must have the same hidden size as input")}},Dl=(e,t,i,r)=>{let a=t.simplified,n=e[0].dims,s=A.size(n),u=n,l=s,p=n.slice(-1)[0],c=r?n.slice(0,-1).concat(1):[],h=!a&&e.length>3,m=e.length>4,_=r&&i>1,y=r&&i>2,v=i>3,C=64,w=$e(p),$=[{type:12,data:l},{type:12,data:w},{type:12,data:p},{type:1,data:t.epsilon}],S=k=>{let I=[{name:"output_size",type:"u32"},{name:"components",type:"u32"},{name:"hidden_size",type:"u32"},{name:"epsilon",type:"f32"}],z=[M("x",e[0].dataType,e[0].dims,w),M("skip",e[1].dataType,e[1].dims,w),M("gamma",e[2].dataType,e[2].dims,w)];h&&z.push(M("beta",e[3].dataType,e[3].dims,w)),m&&z.push(M("bias",e[4].dataType,e[4].dims,w)),z.push(K("output",e[0].dataType,u,w)),_&&z.push(K("mean_output",1,c)),y&&z.push(K("inv_std_output",1,c)),v&&z.push(K("input_skip_bias_sum",e[0].dataType,u,w));let R=Te(e[0].dataType),D=Te(1,w);return`

      ${k.registerUniforms(I).declareVariables(...z)}
      var<workgroup> sum_shared : array<${D}, ${C}>;
      var<workgroup> sum_squared_shared : array<${D}, ${C}>;

      ${k.mainStart([C,1,1])}
        let ix = local_id.x;
        let iy = global_id.x / ${C};

        let hidden_size_vectorized: u32 = uniforms.hidden_size / uniforms.components;
        var stride = hidden_size_vectorized / ${C};
        let offset = ix * stride + iy * hidden_size_vectorized;
        let offset1d = stride * ix;
        if (ix == ${C-1}) {
          stride = hidden_size_vectorized - stride * ix;
        }
        for (var i: u32 = 0; i < stride; i++) {
          let skip_value = skip[offset + i];
          let bias_value = ${m?"bias[offset1d + i]":R+"(0.0)"};
          let input_value = x[offset + i];
          let value = input_value + skip_value + bias_value;
          ${v?"input_skip_bias_sum[offset + i] = value;":""}
          output[offset + i] = value;
          let f32_value = ${Lt(R,w,"value")};
          sum_shared[ix] += f32_value;
          sum_squared_shared[ix] += f32_value * f32_value;
        }
        workgroupBarrier();

        var reduce_size : u32 = ${C};
        for (var curr_size = reduce_size >> 1;  curr_size > 0; curr_size = reduce_size >> 1) {
          reduce_size = curr_size + (reduce_size & 1);
          if (ix < curr_size) {
            sum_shared[ix] += sum_shared[ix + reduce_size];
            sum_squared_shared[ix] += sum_squared_shared[ix + reduce_size];
          }
          workgroupBarrier();
        }

        let sum = sum_shared[0];
        let square_sum = sum_squared_shared[0];
        let mean = ${yt("sum",w)} / f32(uniforms.hidden_size);
        let inv_std_dev = inverseSqrt(${yt("square_sum",w)} / f32(uniforms.hidden_size) ${a?"":"- mean * mean"} + uniforms.epsilon);
        ${_?"mean_output[global_idx] = mean;":""}
        ${y?"inv_std_output[global_idx] = inv_std_dev;":""}

        for (var i: u32 = 0; i < stride; i++) {
          output[offset + i] = (output[offset + i] ${a?"":`- ${R}(mean)`}) *
            ${R}(inv_std_dev) * gamma[offset1d + i]
            ${h?"+ beta[offset1d + i]":""};
        }
      }`},x=[{dims:u,dataType:e[0].dataType}];return i>1&&x.push({dims:c,dataType:1}),i>2&&x.push({dims:c,dataType:1}),i>3&&x.push({dims:n,dataType:e[0].dataType}),{name:"SkipLayerNormalization",shaderCache:{hint:`${w};${_};${y};${v}`,inputDependencies:e.map((k,I)=>"type")},getShaderSource:S,getRunData:()=>({outputs:x,dispatchGroup:{x:Math.ceil(l/p)},programUniforms:$})}},hf=(e,t)=>{Nl(e.inputs);let i=[0];e.outputCount>1&&i.push(-3),e.outputCount>2&&i.push(-3),e.outputCount>3&&i.push(3),e.compute(Dl(e.inputs,t,e.outputCount,!1),{outputs:i})}}),Pl,nr,Ul,fa,ql,Wl,mf,gf,Tg=q(()=>{"use strict";te(),ne(),ve(),oe(),Pl=(e,t)=>{if(!e||e.length<1)throw new Error("too few inputs");if(t.axes.length!==0){if(t.axes.length!==t.starts.length||t.axes.length!==t.ends.length)throw new Error("axes, starts and ends must have the same length")}else if(t.starts.length!==t.ends.length)throw new Error("starts and ends must have the same length");e.slice(1).forEach((i,r)=>{if(e[r+1].dataType!==6&&e[r+1].dataType!==7)throw new Error(`Input ${r} must be an array of int32 or int64`)})},nr=(e,t)=>{let i=[];if(e.length>t)if(e[t].dataType===7)e[t].getBigInt64Array().forEach(r=>i.push(Number(r)));else if(e[t].dataType===6)e[t].getInt32Array().forEach(r=>i.push(Number(r)));else throw new Error(`Input ${t} must be an array of int32 or int64`);return i},Ul=(e,t)=>{if(e.length>1){let i=nr(e,1),r=nr(e,2),a=nr(e,3);return a.length===0&&(a=[...Array(e[0].dims.length).keys()]),he({starts:i,ends:r,axes:a})}else return t},fa=(e,t,i,r,a)=>{let n=e;return e<0&&(n+=i[r[t]]),a[t]<0?Math.max(0,Math.min(n,i[r[t]]-1)):Math.max(0,Math.min(n,i[r[t]]))},ql=(e,t,i)=>`fn calculateInputIndices(output_indices: ${t.type.indices}) -> ${e.type.indices} {
          var input_indices: ${e.type.indices};
          var carry = 0u;
          for (var i = ${i.length-1}; i >= 0; i--) {
            let input_shape_i = ${Y("uniforms.input_shape","i",i.length)};
            let steps_i = ${Y("uniforms.steps","i",i.length)};
            let signs_i = ${Y("uniforms.signs","i",i.length)};
            let starts_i = ${Y("uniforms.starts","i",i.length)};
            var output_index = ${t.indicesGet("output_indices","i")};
            var input_index = output_index * steps_i + starts_i + carry;
            carry = input_index / input_shape_i;
            input_index = input_index % input_shape_i;
            if (signs_i < 0) {
              input_index = input_shape_i - input_index - 1u + starts_i;
            }
            ${e.indicesSet("input_indices","i","input_index")};
          }
          return input_indices;
      }`,Wl=(e,t)=>{let i=e[0].dims,r=A.size(i),a=t.axes.length>0?A.normalizeAxes(t.axes,i.length):[...Array(i.length).keys()],n=nr(e,4);n.forEach(w=>w!==0||(()=>{throw new Error("step cannot be 0")})),n.length===0&&(n=Array(a.length).fill(1));let s=t.starts.map((w,$)=>fa(w,$,i,a,n)),u=t.ends.map((w,$)=>fa(w,$,i,a,n));if(a.length!==s.length||a.length!==u.length)throw new Error("start, ends and axes should have the same number of elements");if(a.length!==i.length)for(let w=0;w<i.length;++w)a.includes(w)||(s.splice(w,0,0),u.splice(w,0,i[w]),n.splice(w,0,1));let l=n.map(w=>Math.sign(w));n.forEach((w,$,S)=>{if(w<0){let x=(u[$]-s[$])/w,k=s[$],I=k+x*n[$];s[$]=I,u[$]=k,S[$]=-w}});let p=i.slice(0);a.forEach((w,$)=>{p[w]=Math.ceil((u[w]-s[w])/n[w])});let c={dims:p,dataType:e[0].dataType},h=K("output",e[0].dataType,p.length),m=M("input",e[0].dataType,e[0].dims.length),_=A.size(p),y=[{name:"outputSize",type:"u32"},{name:"starts",type:"u32",length:s.length},{name:"signs",type:"i32",length:l.length},{name:"steps",type:"u32",length:n.length}],v=[{type:12,data:_},{type:12,data:s},{type:6,data:l},{type:12,data:n},...Q(e[0].dims,p)],C=w=>`
      ${w.registerUniforms(y).declareVariables(m,h)}
        ${ql(m,h,i)}
        ${w.mainStart()}
          ${w.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.outputSize")}
          let output_indices = ${h.offsetToIndices("global_idx")};
          let input_indices = calculateInputIndices(output_indices);
          ${h.setByOffset("global_idx",m.getByIndices("input_indices"))}
      }`;return{name:"Slice",shaderCache:{hint:`${l.length}_${s.length}_${n.length}`,inputDependencies:["rank"]},getShaderSource:C,getRunData:()=>({outputs:[c],dispatchGroup:{x:Math.ceil(r/64)},programUniforms:v})}},mf=(e,t)=>{Pl(e.inputs,t);let i=Ul(e.inputs,t);e.compute(Wl(e.inputs,i),{inputs:[0]})},gf=e=>{let t=e.starts,i=e.ends,r=e.axes;return he({starts:t,ends:i,axes:r})}}),Ll,Vl,yf,_f,kg=q(()=>{"use strict";te(),ne(),ve(),_t(),oe(),Ll=e=>{if(!e||e.length!==1)throw new Error("Softmax op requires 1 input.")},Vl=(e,t)=>{let i=e.inputs[0],r=i.dims,a=A.size(r),n=r.length,s=A.normalizeAxis(t.axis,n),u=s<r.length-1,l,p=[];u?(p=Array.from({length:n},(z,R)=>R),p[s]=n-1,p[n-1]=s,l=e.compute(Pe(i,p),{inputs:[i],outputs:[-1]})[0]):l=i;let c=l.dims,h=c[n-1],m=a/h,_=$e(h),y=h/_,v=64;m===1&&(v=256);let C=(z,R)=>R===4?`max(max(${z}.x, ${z}.y), max(${z}.z, ${z}.w))`:R===2?`max(${z}.x, ${z}.y)`:R===3?`max(max(${z}.x, ${z}.y), ${z}.z)`:z,w=M("x",l.dataType,l.dims,_),$=K("result",l.dataType,l.dims,_),S=w.type.value,x=Te(l.dataType)==="f32"?`var threadMax = ${S}(-3.402823e+38f);`:`var threadMax = ${S}(-65504.0h);`,k=z=>`
      var<workgroup> rowMaxShared : ${S};
      var<workgroup> rowSumShared : ${S};
      var<workgroup> threadShared : array<${S}, ${v}>;

      fn getValue(row: i32, col: i32, row_stride: i32) -> ${S} {
        let index = row * row_stride + col;
        return x[index];
      }

      fn setValue(row: i32, col: i32, row_stride: i32, value: ${S}) {
        let index = row * row_stride + col;
        result[index] = value;
      }
      ${z.registerUniform("packedCols","i32").declareVariables(w,$)}
      ${z.mainStart(v)}
        let gindex = i32(global_idx);
        let lindex = i32(local_idx);
        const wg = ${v};
        let row = gindex / wg;
        let cols = uniforms.packedCols;
        let row_stride : i32 = uniforms.packedCols;

        // find the rows max
        ${x}
        for (var col = lindex; col < cols; col += wg) {
          let value = getValue(row, col, row_stride);
          threadMax = max(threadMax, value);
        }
        if (lindex < cols) {
          threadShared[lindex] = threadMax;
        }
        workgroupBarrier();

        var reduceSize = min(cols, wg);
        for (var currSize = reduceSize >> 1;  currSize > 0; currSize = reduceSize >> 1) {
          reduceSize = currSize + (reduceSize & 1);
          if (lindex < currSize) {
            threadShared[lindex] = max(threadShared[lindex], threadShared[lindex + reduceSize]);
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowMaxShared = ${S}(${C("threadShared[0]",_)});
        }
        workgroupBarrier();

        // find the rows sum
        var threadSum = ${S}(0.0);
        for (var col = lindex; col < cols; col += wg) {
          let subExp = exp(getValue(row, col, row_stride) - rowMaxShared);
          threadSum += subExp;
        }
        threadShared[lindex] = threadSum;
        workgroupBarrier();

        for (var currSize = wg >> 1;  currSize > 0; currSize = currSize >> 1) {
          if (lindex < currSize) {
            threadShared[lindex] = threadShared[lindex] + threadShared[lindex + currSize];
          }
          workgroupBarrier();
        }
        if (lindex == 0) {
          rowSumShared = ${S}(${yt("threadShared[0]",_)});
        }
        workgroupBarrier();

        // calculate final value for each element in the row
        for (var col = lindex; col < cols; col += wg) {
          var value = exp(getValue(row, col, row_stride) - rowMaxShared) / rowSumShared;
          // max operation protects against NaN since all values should be >=0
          value = max(value, ${S}(0.0));
          setValue(row, col, row_stride, value);
        }
      }`,I=e.compute({name:"Softmax",shaderCache:{hint:`${_};${v}`,inputDependencies:["type"]},getRunData:()=>({outputs:[{dims:c,dataType:l.dataType}],dispatchGroup:{x:m},programUniforms:[{type:6,data:y}]}),getShaderSource:k},{inputs:[l],outputs:[u?-1:0]})[0];u&&e.compute(Pe(I,p),{inputs:[I]})},yf=(e,t)=>{Ll(e.inputs),Vl(e,t)},_f=e=>he({axis:e.axis})}),ha,jl,Fl,Gl,wf,Ig=q(()=>{"use strict";te(),ne(),oe(),ha=e=>Array.from(e.getBigInt64Array(),Number),jl=e=>{if(!e||e.length!==2)throw new Error("Tile requires 2 inputs.");if(e[0].dataType!==1&&e[0].dataType!==10&&e[0].dataType!==6&&e[0].dataType!==12)throw new Error("Tile only support float, float16, int32, and uint32 data types");if(e[1].dataType!==7)throw new Error("Tile `repeats` input should be of int64 data type");if(e[1].dims.length!==1)throw new Error("Tile `repeats` input should be 1-D");if(ha(e[1]).length!==e[0].dims.length)throw new Error("Tile `repeats` input should have same number of elements as rank of input data tensor")},Fl=(e,t)=>{let i=[];for(let r=0;r<e.length;++r)i.push(e[r]*t[r]);return i},Gl=(e,t)=>{let i=e[0].dims,r=t??ha(e[1]),a=Fl(i,r),n=A.size(a),s=e[0].dataType,u=M("input",s,i.length),l=K("output",s,a.length),p=c=>`
      const inputShape = ${u.indices(...i)};
      ${c.registerUniform("output_size","u32").declareVariables(u,l)}
      ${c.mainStart()}
      ${c.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.output_size")}
      let output_indices = ${l.offsetToIndices("global_idx")};
      var input_indices: ${u.type.indices};
      for (var i = 0; i < ${i.length}; i++) {
        let input_dim_i = ${u.indicesGet("uniforms.input_shape","i")};
        let input_dim_value = ${l.indicesGet("output_indices","i")}  % input_dim_i;

        ${u.indicesSet("input_indices","i","input_dim_value")}
      }
      ${l.setByOffset("global_idx",u.getByIndices("input_indices"))}
    }`;return{name:"Tile",shaderCache:{hint:`${r}`,inputDependencies:["rank"]},getRunData:()=>({outputs:[{dims:a,dataType:e[0].dataType}],dispatchGroup:{x:Math.ceil(n/64)},programUniforms:[{type:12,data:n},...Q(e[0].dims,a)]}),getShaderSource:p}},wf=e=>{jl(e.inputs),e.compute(Gl(e.inputs),{inputs:[0]})}}),Hl,Kl,bf,Eg=q(()=>{"use strict";te(),ne(),oe(),Hl=(e,t,i,r,a)=>{let n=K("output_data",a,i.length,4),s=M("a_data",t[1].dataType,t[1].dims.length,4),u=M("b_data",t[2].dataType,t[2].dims.length,4),l=M("c_data",t[0].dataType,t[0].dims.length,4),p,c=(h,m,_)=>`select(${m}, ${h}, ${_})`;if(!r)p=n.setByOffset("global_idx",c(s.getByOffset("global_idx"),u.getByOffset("global_idx"),l.getByOffset("global_idx")));else{let h=(m,_,y="")=>{let v=`a_data[index_a${_}][component_a${_}]`,C=`b_data[index_b${_}][component_b${_}]`,w=`bool(c_data[index_c${_}] & (0xffu << (component_c${_} * 8)))`;return`
            let output_indices${_} = ${n.offsetToIndices(`global_idx * 4u + ${_}u`)};
            let offset_a${_} = ${s.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let offset_b${_} = ${u.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let offset_c${_} = ${l.broadcastedIndicesToOffset(`output_indices${_}`,n)};
            let index_a${_} = offset_a${_} / 4u;
            let index_b${_} = offset_b${_} / 4u;
            let index_c${_} = offset_c${_} / 4u;
            let component_a${_} = offset_a${_} % 4u;
            let component_b${_} = offset_b${_} % 4u;
            let component_c${_} = offset_c${_} % 4u;
            ${m}[${_}] = ${y}(${c(v,C,w)});
          `};a===9?p=`
            var data = vec4<u32>(0);
            ${h("data",0,"u32")}
            ${h("data",1,"u32")}
            ${h("data",2,"u32")}
            ${h("data",3,"u32")}
            output_data[global_idx] = dot(vec4<u32>(0x1, 0x100, 0x10000, 0x1000000), vec4<u32>(data));`:p=`
            ${h("output_data[global_idx]",0)}
            ${h("output_data[global_idx]",1)}
            ${h("output_data[global_idx]",2)}
            ${h("output_data[global_idx]",3)}
          `}return`
        ${e.registerUniform("vec_size","u32").declareVariables(l,s,u,n)}
        ${e.mainStart()}
        ${e.guardAgainstOutOfBoundsWorkgroupSizes("uniforms.vec_size")}
        ${p}
      }`},Kl=e=>{let t=e[1].dims,i=e[2].dims,r=e[0].dims,a=e[1].dataType,n=!(A.areEqual(t,i)&&A.areEqual(i,r)),s=t,u=A.size(t);if(n){let p=Vt.calcShape(Vt.calcShape(t,i,!1),r,!1);if(!p)throw new Error("Can't perform where op on the given tensors");s=p,u=A.size(s)}let l=Math.ceil(u/4);return{name:"Where",shaderCache:{inputDependencies:["rank","rank","rank"]},getShaderSource:p=>Hl(p,e,s,n,a),getRunData:()=>({outputs:[{dims:s,dataType:a}],dispatchGroup:{x:Math.ceil(u/64/4)},programUniforms:[{type:12,data:l},...Q(r,t,i,s)]})}},bf=e=>{e.compute(Kl(e.inputs))}}),$f,zg=q(()=>{"use strict";jm(),Za(),Fm(),Gm(),Hm(),Km(),Zm(),eg(),rg(),ig(),ag(),ng(),sg(),og(),ug(),lg(),dg(),pg(),cg(),fg(),hg(),mg(),gg(),yg(),_g(),Uc(),wg(),bg(),$g(),vg(),xg(),Ka(),Cg(),jc(),Sg(),Tg(),kg(),Lc(),Ig(),_t(),Xa(),Eg(),$f=new Map([["Abs",[fp]],["Acos",[hp]],["Acosh",[mp]],["Add",[Zp]],["ArgMax",[lp,Sa]],["ArgMin",[up,Sa]],["Asin",[gp]],["Asinh",[yp]],["Atan",[_p]],["Atanh",[wp]],["Attention",[dp]],["AveragePool",[Jc,Qc]],["BatchNormalization",[pp]],["BiasAdd",[cp]],["BiasSplitGelu",[Kp]],["Cast",[$p,bp]],["Ceil",[xp]],["Clip",[vp]],["Concat",[nc,sc]],["Conv",[Aa,za]],["ConvTranspose",[gc,mc]],["Cos",[Cp]],["Cosh",[Sp]],["CumSum",[yc,_c]],["DepthToSpace",[wc,bc]],["DequantizeLinear",[of,uf]],["Div",[Xp]],["Einsum",[$c,vc]],["Elu",[Tp,dr]],["Equal",[Yp]],["Erf",[kp]],["Exp",[Ip]],["Expand",[xc]],["FastGelu",[Cc]],["Floor",[Ep]],["FusedConv",[Aa,za]],["Gather",[Tc,Sc]],["GatherElements",[Oc,Ac]],["GatherBlockQuantized",[Ec,zc]],["GatherND",[kc,Ic]],["Gelu",[zp]],["Gemm",[Bc,Rc]],["GlobalAveragePool",[tf,ef]],["GlobalMaxPool",[sf,nf]],["Greater",[tc]],["GreaterOrEqual",[ic]],["GridSample",[Mc,Nc]],["GroupQueryAttention",[Fc]],["HardSigmoid",[Pp,Dp]],["InstanceNormalization",[Gc]],["LayerNormalization",[Hc]],["LeakyRelu",[Ap,dr]],["Less",[rc]],["LessOrEqual",[ac]],["Log",[Gp]],["MatMul",[Kc]],["MatMulNBits",[Zc,Xc]],["MaxPool",[rf,af]],["Mul",[Qp]],["MultiHeadAttention",[Pc,Dc]],["Neg",[Rp]],["Not",[Op]],["Pad",[Yc]],["Pow",[Jp]],["QuickGelu",[Hp,dr]],["Range",[lf]],["Reciprocal",[Bp]],["ReduceMin",[ip]],["ReduceMean",[Qd]],["ReduceMax",[rp]],["ReduceSum",[np]],["ReduceProd",[ap]],["ReduceL1",[Jd]],["ReduceL2",[ep]],["ReduceLogSum",[op]],["ReduceLogSumExp",[tp]],["ReduceSumSquare",[sp]],["Relu",[Mp]],["Resize",[cf,ff]],["RotaryEmbedding",[Vc]],["ScatterND",[pf,df]],["Sigmoid",[Np]],["Sin",[Up]],["Sinh",[qp]],["Slice",[mf,gf]],["SkipLayerNormalization",[hf]],["Split",[qc,Wc]],["Sqrt",[Wp]],["Softmax",[yf,_f]],["Sub",[ec]],["Tan",[Lp]],["Tanh",[Vp]],["ThresholdedRelu",[Fp,dr]],["Tile",[wf]],["Transpose",[qd,Wd]],["Where",[bf]]])}),vf,Ag=q(()=>{"use strict";We(),ut(),oe(),vf=class{constructor(e){this.backend=e,this.repo=new Map,this.attributesBound=!1}getArtifact(e){return this.repo.get(e)}setArtifact(e,t){this.repo.set(e,t)}run(e,t,i,r,a){Je(e.programInfo.name);let n=this.backend.device,s=this.backend.getComputePassEncoder();this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2);let u=[];for(let p of t)u.push({binding:u.length,resource:{buffer:p.buffer}});for(let p of i)u.push({binding:u.length,resource:{buffer:p.buffer}});a&&u.push({binding:u.length,resource:a});let l=n.createBindGroup({layout:e.computePipeline.getBindGroupLayout(0),entries:u,label:e.programInfo.name});if(this.backend.sessionStatus==="capturing"){let p={kernelId:this.backend.currentKernelId,computePipeline:e.computePipeline,bindGroup:l,dispatchGroup:r};this.backend.capturedCommandList.get(this.backend.currentSessionId).push(p)}s.setPipeline(e.computePipeline),s.setBindGroup(0,l),s.dispatchWorkgroups(...r),this.backend.writeTimestamp(this.backend.pendingDispatchNumber*2+1),this.backend.pendingDispatchNumber++,(this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber||this.backend.queryType==="at-passes")&&this.backend.endComputePass(),this.backend.pendingDispatchNumber>=this.backend.maxDispatchNumber&&this.backend.flush(),Ke(e.programInfo.name)}dispose(){}build(e,t){Je(e.name);let i=this.backend.device,r=[];[{feature:"shader-f16",extension:"f16"},{feature:"subgroups",extension:"subgroups"}].forEach(p=>{i.features.has(p.feature)&&r.push(`enable ${p.extension};`)});let a=Ud(t,this.backend.device.limits),n=e.getShaderSource(a),s=`${r.join(`
`)}
${a.additionalImplementations}
${n}`,u=i.createShaderModule({code:s,label:e.name});de("verbose",()=>`[WebGPU] ${e.name} shader code: ${s}`);let l=i.createComputePipeline({compute:{module:u,entryPoint:"main"},layout:"auto",label:e.name});return Ke(e.name),{programInfo:e,computePipeline:l,uniformVariablesInfo:a.variablesInfo}}normalizeDispatchGroupSize(e){let t=typeof e=="number"?e:e.x,i=typeof e=="number"?1:e.y||1,r=typeof e=="number"?1:e.z||1,a=this.backend.device.limits.maxComputeWorkgroupsPerDimension;if(t<=a&&i<=a&&r<=a)return[t,i,r];let n=t*i*r,s=Math.ceil(Math.sqrt(n));if(s>a){if(s=Math.ceil(Math.cbrt(n)),s>a)throw new Error("Total dispatch size exceeds WebGPU maximum.");return[s,s,s]}else return[s,s,1]}}}),xf={};Ft(xf,{WebGpuBackend:()=>Cf});var Zl,Xl,Yl,Cf,Og=q(()=>{"use strict";We(),te(),ut(),Bd(),Lm(),zg(),Ag(),Zl=(e,t)=>{if(t.length!==e.length)throw new Error(`inputDependencies length ${t.length} is not equal to inputTensors length ${e.length}.`);let i=[];for(let r=0;r<e.length;++r){let a=e[r].dataType;switch(t[r]){case"none":{i.push("");break}case"type":{i.push(`${a}`);break}case"rank":{let n=e[r].dims.length;i.push(`${a};${n}`);break}case"dims":{let n=e[r].dims.join(",");i.push(`${a};${n}`);break}default:throw new Error(`unsupported input dependency: ${t[r]}`)}}return i.join("|")},Xl=(e,t,i)=>{let r=e.name;return e.shaderCache?.hint&&(r+="["+e.shaderCache.hint+"]"),r+=":"+i+`:${Zl(t,e.shaderCache?.inputDependencies??new Array(t.length).fill("dims"))}`,r},Yl=class{constructor(e){e&&(this.architecture=e.architecture,this.vendor=e.vendor)}isArchitecture(e){return this.architecture===e}isVendor(e){return this.vendor===e}},Cf=class{constructor(){this.currentSessionId=null,this.currentKernelId=null,this.commandEncoder=null,this.computePassEncoder=null,this.maxDispatchNumber=16,this.pendingDispatchNumber=0,this.pendingKernels=[],this.pendingQueries=new Map,this.sessionStatus="default",this.capturedCommandList=new Map,this.capturedPendingKernels=new Map,this.sessionExternalDataMapping=new Map}get currentKernelCustomData(){if(this.currentKernelId===null)throw new Error("currentKernelCustomData(): currentKernelId is null. (should not happen)");let e=this.kernelCustomData.get(this.currentKernelId);return e||(e={},this.kernelCustomData.set(this.currentKernelId,e)),e}async initialize(e,t){this.env=e;let i=[],r={requiredLimits:{maxComputeWorkgroupStorageSize:t.limits.maxComputeWorkgroupStorageSize,maxComputeWorkgroupsPerDimension:t.limits.maxComputeWorkgroupsPerDimension,maxStorageBufferBindingSize:t.limits.maxStorageBufferBindingSize,maxBufferSize:t.limits.maxBufferSize,maxComputeInvocationsPerWorkgroup:t.limits.maxComputeInvocationsPerWorkgroup,maxComputeWorkgroupSizeX:t.limits.maxComputeWorkgroupSizeX,maxComputeWorkgroupSizeY:t.limits.maxComputeWorkgroupSizeY,maxComputeWorkgroupSizeZ:t.limits.maxComputeWorkgroupSizeZ},requiredFeatures:i},a=n=>t.features.has(n)&&i.push(n)&&!0;a("chromium-experimental-timestamp-query-inside-passes")||a("timestamp-query"),a("shader-f16"),a("subgroups"),this.device=await t.requestDevice(r),this.adapterInfo=new Yl(t.info||await t.requestAdapterInfo()),this.gpuDataManager=Dd(this),this.programManager=new vf(this),this.kernels=new Map,this.kernelPersistentData=new Map,this.kernelCustomData=new Map,ja(e.logLevel,!!e.debug),this.device.onuncapturederror=n=>{n.error instanceof GPUValidationError&&console.error(`An uncaught WebGPU validation error was raised: ${n.error.message}`)},Object.defineProperty(this.env.webgpu,"device",{value:this.device,writable:!1,enumerable:!0,configurable:!1}),Object.defineProperty(this.env.webgpu,"adapter",{value:t,writable:!1,enumerable:!0,configurable:!1}),this.setQueryType()}dispose(){typeof this.querySet<"u"&&this.querySet.destroy(),this.gpuDataManager.dispose()}getCommandEncoder(){return this.commandEncoder||(this.commandEncoder=this.device.createCommandEncoder()),this.commandEncoder}getComputePassEncoder(){if(!this.computePassEncoder){let e=this.getCommandEncoder(),t={};this.queryType==="at-passes"&&(t.timestampWrites={querySet:this.querySet,beginningOfPassWriteIndex:this.pendingDispatchNumber*2,endOfPassWriteIndex:this.pendingDispatchNumber*2+1}),this.computePassEncoder=e.beginComputePass(t)}return this.computePassEncoder}endComputePass(){this.computePassEncoder&&(this.computePassEncoder.end(),this.computePassEncoder=null)}flush(){if(!this.commandEncoder)return;Je(),this.endComputePass();let e;this.queryType!=="none"&&(this.commandEncoder.resolveQuerySet(this.querySet,0,this.pendingDispatchNumber*2,this.queryResolveBuffer,0),e=this.device.createBuffer({size:this.pendingDispatchNumber*2*8,usage:GPUBufferUsage.MAP_READ|GPUBufferUsage.COPY_DST}),this.pendingQueries.set(e,this.pendingKernels),this.pendingKernels=[],this.commandEncoder.copyBufferToBuffer(this.queryResolveBuffer,0,e,0,this.pendingDispatchNumber*2*8)),this.device.queue.submit([this.commandEncoder.finish()]),this.gpuDataManager.refreshPendingBuffers(),this.commandEncoder=null,this.pendingDispatchNumber=0,this.queryType!=="none"&&e.mapAsync(GPUMapMode.READ).then(()=>{let t=new BigUint64Array(e.getMappedRange()),i=this.pendingQueries.get(e);for(let r=0;r<t.length/2;r++){let a=i[r],n=a.kernelId,s=this.kernels.get(n),u=s.kernelType,l=s.kernelName,p=a.programName,c=a.inputTensorViews,h=a.outputTensorViews,m=t[r*2],_=t[r*2+1];typeof this.queryTimeBase>"u"&&(this.queryTimeBase=m);let y=Number(m-this.queryTimeBase),v=Number(_-this.queryTimeBase);if(!Number.isSafeInteger(y)||!Number.isSafeInteger(v))throw new RangeError("incorrect timestamp range");if(this.env.webgpu.profiling?.ondata)this.env.webgpu.profiling.ondata({version:1,inputsMetadata:c.map(C=>({dims:C.dims,dataType:ot(C.dataType)})),outputsMetadata:h.map(C=>({dims:C.dims,dataType:ot(C.dataType)})),kernelId:n,kernelType:u,kernelName:l,programName:p,startTime:y,endTime:v});else{let C="";c.forEach(($,S)=>{C+=`input[${S}]: [${$.dims}] | ${ot($.dataType)}, `});let w="";h.forEach(($,S)=>{w+=`output[${S}]: [${$.dims}] | ${ot($.dataType)}, `}),console.log(`[profiling] kernel "${n}|${u}|${l}|${p}" ${C}${w}start time: ${y} ns, execution time: ${v-y} ns`)}Wr("GPU",`${p}::${m}::${_}`)}e.unmap(),this.pendingQueries.delete(e)}),Ke()}run(e,t,i,r,a,n){Je(e.name);let s=[];for(let $=0;$<t.length;++$){let S=t[$].data;if(S===0)continue;let x=this.gpuDataManager.get(S);if(!x)throw new Error(`no GPU data for input: ${S}`);s.push(x)}let{outputs:u,dispatchGroup:l,programUniforms:p}=e.getRunData(t),c=i.length===0?u.map(($,S)=>S):i;if(c.length!==u.length)throw new Error(`Output size ${c.length} must be equal to ${u.length}.`);let h=[],m=[];for(let $=0;$<u.length;++$){if(!Number.isInteger(c[$])||c[$]<-3||c[$]>=n)throw new Error(`Invalid output index: ${c[$]}`);if(c[$]===-3)continue;let S=c[$]===-1,x=c[$]===-2,k=S||x?a(u[$].dataType,u[$].dims):r(c[$],u[$].dataType,u[$].dims);if(h.push(k),k.data===0)continue;let I=this.gpuDataManager.get(k.data);if(!I)throw new Error(`no GPU data for output: ${k.data}`);if(S&&this.temporaryData.push(I),x){let z=this.kernelPersistentData.get(this.currentKernelId);z||(z=[],this.kernelPersistentData.set(this.currentKernelId,z)),z.push(I)}m.push(I)}if(s.length!==t.length||m.length!==h.length){if(m.length===0)return Ke(e.name),h;throw new Error(`Program ${e.name} has zero-sized tensor(s) in inputs or outputs. This is not supported now.`)}let _;if(p){let $=0,S=[];p.forEach(z=>{let R=typeof z.data=="number"?[z.data]:z.data;if(R.length===0)return;let D=z.type===10?2:4,V,Z;z.type===10?(Z=R.length>4?16:R.length>2?8:R.length*D,V=R.length>4?16:D*R.length):(Z=R.length<=2?R.length*D:16,V=16),$=Math.ceil($/Z)*Z,S.push($);let X=z.type===10?8:4;$+=R.length>4?Math.ceil(R.length/X)*V:R.length*D});let x=16;$=Math.ceil($/x)*x;let k=new ArrayBuffer($);p.forEach((z,R)=>{let D=S[R],V=typeof z.data=="number"?[z.data]:z.data;if(z.type===6)new Int32Array(k,D,V.length).set(V);else if(z.type===12)new Uint32Array(k,D,V.length).set(V);else if(z.type===10)new Uint16Array(k,D,V.length).set(V);else if(z.type===1)new Float32Array(k,D,V.length).set(V);else throw new Error(`Unsupported uniform type: ${ot(z.type)}`)});let I=this.gpuDataManager.create($,GPUBufferUsage.COPY_DST|GPUBufferUsage.UNIFORM);this.device.queue.writeBuffer(I.buffer,0,k,0,$),this.gpuDataManager.release(I.id),_={offset:0,size:$,buffer:I.buffer}}let y=this.programManager.normalizeDispatchGroupSize(l),v=y[1]===1&&y[2]===1,C=Xl(e,t,v),w=this.programManager.getArtifact(C);if(w||(w=this.programManager.build(e,y),this.programManager.setArtifact(C,w),de("info",()=>`[artifact] key: ${C}, programName: ${e.name}`)),p&&w.uniformVariablesInfo){if(p.length!==w.uniformVariablesInfo.length)throw new Error(`Uniform variables count mismatch: expect ${w.uniformVariablesInfo.length}, got ${p.length} in program "${w.programInfo.name}".`);for(let $=0;$<p.length;$++){let S=p[$],x=S.type,k=typeof S.data=="number"?1:S.data.length,[I,z]=w.uniformVariablesInfo[$];if(x!==I||k!==z)throw new Error(`Uniform variable ${$} mismatch: expect type ${I} with size ${z}, got type ${x} with size ${k} in program "${w.programInfo.name}".`)}}if(de("info",()=>`[ProgramManager] run "${e.name}" (key=${C}) with ${y[0]}x${y[1]}x${y[2]}`),this.queryType!=="none"||this.sessionStatus==="capturing"){let $={kernelId:this.currentKernelId,programName:w.programInfo.name,inputTensorViews:t,outputTensorViews:h};this.pendingKernels.push($),this.sessionStatus==="capturing"&&this.capturedPendingKernels.get(this.currentSessionId).push($)}return this.programManager.run(w,s,m,y,_),Ke(e.name),h}upload(e,t){this.gpuDataManager.upload(e,t)}memcpy(e,t){this.gpuDataManager.memcpy(e,t)}async download(e,t){await this.gpuDataManager.download(e,t)}alloc(e){return this.gpuDataManager.create(e).id}free(e){return this.gpuDataManager.release(e)}createKernel(e,t,i,r){let a=$f.get(e);if(!a)throw new Error(`kernel not implemented: ${e}`);let n={kernelType:e,kernelName:r,kernelEntry:a[0],attributes:[a[1],i]};this.kernels.set(t,n)}releaseKernel(e){let t=this.kernelPersistentData.get(e);if(t){for(let i of t)this.gpuDataManager.release(i.id);this.kernelPersistentData.delete(e)}this.kernelCustomData.delete(e),this.kernels.delete(e)}computeKernel(e,t,i){let r=this.kernels.get(e);if(!r)throw new Error(`kernel not created: ${e}`);let a=r.kernelType,n=r.kernelName,s=r.kernelEntry,u=r.attributes;if(this.currentKernelId!==null)throw new Error(`kernel "[${a}] ${n}" is not allowed to be called recursively`);this.currentKernelId=e,u[0]&&(u[1]=u[0](u[1]),u[0]=void 0),de("info",()=>`[WebGPU] Start to run kernel "[${a}] ${n}"...`);let l=this.env.debug;this.temporaryData=[];try{return l&&this.device.pushErrorScope("validation"),s(t,u[1]),0}catch(p){return i.push(Promise.resolve(`[WebGPU] Kernel "[${a}] ${n}" failed. ${p}`)),1}finally{l&&i.push(this.device.popErrorScope().then(p=>p?`GPU validation error for kernel "[${a}] ${n}": ${p.message}`:null));for(let p of this.temporaryData)this.gpuDataManager.release(p.id);this.temporaryData=[],this.currentKernelId=null}}registerBuffer(e,t,i,r){let a=this.sessionExternalDataMapping.get(e);a||(a=new Map,this.sessionExternalDataMapping.set(e,a));let n=a.get(t),s=this.gpuDataManager.registerExternalBuffer(i,r,n);return a.set(t,[s,i]),s}unregisterBuffers(e){let t=this.sessionExternalDataMapping.get(e);t&&(t.forEach(i=>this.gpuDataManager.unregisterExternalBuffer(i[0])),this.sessionExternalDataMapping.delete(e))}getBuffer(e){let t=this.gpuDataManager.get(e);if(!t)throw new Error(`no GPU data for buffer: ${e}`);return t.buffer}createDownloader(e,t,i){return async()=>{let r=await va(this,e,t);return Fa(r.buffer,i)}}writeTimestamp(e){this.queryType==="inside-passes"&&this.computePassEncoder.writeTimestamp(this.querySet,e)}setQueryType(){this.queryType="none",(this.env.webgpu.profiling?.mode==="default"||(typeof this.env.trace>"u"?this.env.wasm.trace:this.env.trace))&&(this.device.features.has("chromium-experimental-timestamp-query-inside-passes")?this.queryType="inside-passes":this.device.features.has("timestamp-query")&&(this.queryType="at-passes"),this.queryType!=="none"&&typeof this.querySet>"u"&&(this.querySet=this.device.createQuerySet({type:"timestamp",count:this.maxDispatchNumber*2}),this.queryResolveBuffer=this.device.createBuffer({size:this.maxDispatchNumber*2*8,usage:GPUBufferUsage.COPY_SRC|GPUBufferUsage.QUERY_RESOLVE})))}captureBegin(){de("info","captureBegin"),this.capturedCommandList.get(this.currentSessionId)||this.capturedCommandList.set(this.currentSessionId,[]),this.capturedPendingKernels.get(this.currentSessionId)||this.capturedPendingKernels.set(this.currentSessionId,[]),this.flush(),this.sessionStatus="capturing"}captureEnd(){de("info","captureEnd"),this.flush(),this.sessionStatus="default"}replay(){de("info","replay"),this.sessionStatus="replaying";let e=this.capturedCommandList.get(this.currentSessionId),t=this.capturedPendingKernels.get(this.currentSessionId),i=e.length;this.pendingKernels=[];for(let r=0;r<i;r++){let a=this.getComputePassEncoder(),n=e[r];this.writeTimestamp(this.pendingDispatchNumber*2),a.setPipeline(n.computePipeline),a.setBindGroup(0,n.bindGroup),a.dispatchWorkgroups(...n.dispatchGroup),this.writeTimestamp(this.pendingDispatchNumber*2+1),this.pendingDispatchNumber++,this.queryType!=="none"&&this.pendingKernels.push(t[r]),(this.pendingDispatchNumber>=this.maxDispatchNumber||this.queryType==="at-passes")&&this.endComputePass(),this.pendingDispatchNumber>=this.maxDispatchNumber&&this.flush()}this.flush(),this.sessionStatus="default"}onCreateSession(){this.gpuDataManager.onCreateSession()}onReleaseSession(e){this.unregisterBuffers(e),this.capturedCommandList.has(e)&&this.capturedCommandList.delete(e),this.capturedPendingKernels.has(e)&&this.capturedPendingKernels.delete(e),this.gpuDataManager.onReleaseSession(e)}onRunStart(e){this.currentSessionId=e,this.setQueryType()}}}),Sf={};Ft(Sf,{init:()=>Tf});var Nr,Ql,Tf,Rg=q(()=>{"use strict";te(),ut(),ne(),Wm(),Nr=class kf{constructor(t,i,r,a){this.module=t,this.dataType=i,this.data=r,this.dims=a}getFloat32Array(){if(this.dataType!==1)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Float32Array:new Float32Array(this.module.HEAP8.buffer,this.data,t)}getBigInt64Array(){if(this.dataType!==7)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new BigInt64Array:new BigInt64Array(this.module.HEAP8.buffer,this.data,t)}getInt32Array(){if(this.dataType!==6)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Int32Array:new Int32Array(this.module.HEAP8.buffer,this.data,t)}getUint16Array(){if(this.dataType!==10&&this.dataType!==4)throw new Error("Invalid data type");let t=A.size(this.dims);return t===0?new Uint16Array:new Uint16Array(this.module.HEAP8.buffer,this.data,t)}reshape(t){if(A.size(t)!==A.size(this.dims))throw new Error("Invalid new shape");return new kf(this.module,this.dataType,this.data,t)}},Ql=class{constructor(e,t,i){this.module=e,this.backend=t,this.customDataOffset=0,this.customDataSize=0,this.adapterInfo=t.adapterInfo;let r=e.PTR_SIZE,a=i/e.PTR_SIZE,n=r===4?"i32":"i64";this.opKernelContext=Number(e.getValue(r*a++,n));let s=Number(e.getValue(r*a++,n));this.outputCount=Number(e.getValue(r*a++,n)),this.customDataOffset=Number(e.getValue(r*a++,"*")),this.customDataSize=Number(e.getValue(r*a++,n));let u=[];for(let l=0;l<s;l++){let p=Number(e.getValue(r*a++,n)),c=Number(e.getValue(r*a++,"*")),h=Number(e.getValue(r*a++,n)),m=[];for(let _=0;_<h;_++)m.push(Number(e.getValue(r*a++,n)));u.push(new Nr(e,p,c,m))}this.inputs=u}get kernelCustomData(){return this.backend.currentKernelCustomData}get customDataBuffer(){return this.module.HEAPU8.subarray(this.customDataOffset,this.customDataOffset+this.customDataSize)}compute(e,t){let i=t?.inputs?.map(s=>typeof s=="number"?this.inputs[s]:s)??this.inputs,r=t?.outputs??[],a=(s,u,l)=>new Nr(this.module,u,this.output(s,l),l),n=(s,u)=>{let l=Et(s,u);if(!l)throw new Error(`Unsupported data type: ${s}`);let p=l>0?this.backend.gpuDataManager.create(l).id:0;return new Nr(this.module,s,p,u)};return this.backend.run(e,i,r,a,n,this.outputCount)}output(e,t){let i=this.module.stackSave();try{let r=this.module.PTR_SIZE,a=r===4?"i32":"i64",n=this.module.stackAlloc((1+t.length)*r);this.module.setValue(n,t.length,a);for(let s=0;s<t.length;s++)this.module.setValue(n+r*(s+1),t[s],a);return this.module._JsepOutput(this.opKernelContext,e,n)}catch(r){throw new Error(`Failed to generate kernel's output[${e}] with dims [${t}]. If you are running with pre-allocated output, please make sure the output type/dims are correct. Error: ${r}`)}finally{this.module.stackRestore(i)}}},Tf=async(e,t,i,r)=>{let a=t.jsepInit;if(!a)throw new Error("Failed to initialize JSEP. The WebAssembly module is not built with JSEP support.");if(e==="webgpu"){let n=(Og(),fr(xf)).WebGpuBackend,s=new n;await s.initialize(i,r),a("webgpu",[s,u=>s.alloc(Number(u)),u=>s.free(u),(u,l,p,c=!1)=>{if(c)de("verbose",()=>`[WebGPU] jsepCopyGpuToGpu: src=${Number(u)}, dst=${Number(l)}, size=${Number(p)}`),s.memcpy(Number(u),Number(l));else{de("verbose",()=>`[WebGPU] jsepCopyCpuToGpu: dataOffset=${Number(u)}, gpuDataId=${Number(l)}, size=${Number(p)}`);let h=t.HEAPU8.subarray(Number(u>>>0),Number(u>>>0)+Number(p));s.upload(Number(l),h)}},async(u,l,p)=>{de("verbose",()=>`[WebGPU] jsepCopyGpuToCpu: gpuDataId=${u}, dataOffset=${l}, size=${p}`),await s.download(Number(u),()=>t.HEAPU8.subarray(Number(l)>>>0,Number(l+p)>>>0))},(u,l,p)=>s.createKernel(u,Number(l),p,t.UTF8ToString(t._JsepGetNodeName(Number(l)))),u=>s.releaseKernel(u),(u,l,p,c)=>{de("verbose",()=>`[WebGPU] jsepRun: sessionHandle=${p}, kernel=${u}, contextDataOffset=${l}`);let h=new Ql(t,s,Number(l));return s.computeKernel(Number(u),h,c)},()=>s.captureBegin(),()=>s.captureEnd(),()=>s.replay()])}else{let n=new Nd(i);a("webnn",[n,()=>n.reserveTensorId(),s=>n.releaseTensorId(s),async(s,u,l,p,c)=>n.ensureTensor(s,u,l,p,c),(s,u)=>{n.uploadTensor(s,u)},async(s,u)=>n.downloadTensor(s,u),(s,u)=>n.registerMLContext(s,u),!!i.trace])}}}),Jl,rn,an,mt,ed,ma,Kr,nn,sn,ga,on,un,ln,If=q(()=>{"use strict";We(),Pm(),Um(),te(),Mt(),qa(),zd(),Jl=(e,t)=>{_e()._OrtInit(e,t)!==0&&me("Can't initialize onnxruntime.")},rn=async e=>{Jl(e.wasm.numThreads,Vr(e.logLevel))},an=async(e,t)=>{_e().asyncInit?.();let i=e.webgpu.adapter;if(t==="webgpu"){if(typeof navigator>"u"||!navigator.gpu)throw new Error("WebGPU is not supported in current environment");if(i){if(typeof i.limits!="object"||typeof i.features!="object"||typeof i.requestDevice!="function")throw new Error("Invalid GPU adapter set in `env.webgpu.adapter`. It must be a GPUAdapter object.")}else{let r=e.webgpu.powerPreference;if(r!==void 0&&r!=="low-power"&&r!=="high-performance")throw new Error(`Invalid powerPreference setting: "${r}"`);let a=e.webgpu.forceFallbackAdapter;if(a!==void 0&&typeof a!="boolean")throw new Error(`Invalid forceFallbackAdapter setting: "${a}"`);if(i=await navigator.gpu.requestAdapter({powerPreference:r,forceFallbackAdapter:a}),!i)throw new Error('Failed to get GPU adapter. You may need to enable flag "--enable-unsafe-webgpu" if you are using Chrome.')}}if(t==="webnn"&&(typeof navigator>"u"||!navigator.ml))throw new Error("WebNN is not supported in current environment");{let r=(Rg(),fr(Sf)).init;t==="webgpu"&&await r("webgpu",_e(),e,i),t==="webnn"&&await r("webnn",_e(),e)}},mt=new Map,ed=e=>{let t=_e(),i=t.stackSave();try{let r=t.PTR_SIZE,a=t.stackAlloc(2*r);t._OrtGetInputOutputCount(e,a,a+r)!==0&&me("Can't get session input/output count.");let n=r===4?"i32":"i64";return[Number(t.getValue(a,n)),Number(t.getValue(a+r,n))]}finally{t.stackRestore(i)}},ma=(e,t)=>{let i=_e(),r=i.stackSave(),a=0;try{let n=i.PTR_SIZE,s=i.stackAlloc(2*n);i._OrtGetInputOutputMetadata(e,t,s,s+n)!==0&&me("Can't get session input/output metadata.");let u=Number(i.getValue(s,"*"));a=Number(i.getValue(s+n,"*"));let l=i.HEAP32[a/4];if(l===0)return[u,0];let p=i.HEAPU32[a/4+1],c=[];for(let h=0;h<p;h++){let m=Number(i.getValue(a+8+h*n,"*"));c.push(m!==0?i.UTF8ToString(m):Number(i.getValue(a+8+(h+p)*n,"*")))}return[u,l,c]}finally{i.stackRestore(r),a!==0&&i._OrtFree(a)}},Kr=e=>{let t=_e(),i=t._malloc(e.byteLength);if(i===0)throw new Error(`Can't create a session. failed to allocate a buffer of size ${e.byteLength}.`);return t.HEAPU8.set(e,i),[i,e.byteLength]},nn=async(e,t)=>{let i,r,a=_e();Array.isArray(e)?[i,r]=e:e.buffer===a.HEAPU8.buffer?[i,r]=[e.byteOffset,e.byteLength]:[i,r]=Kr(e);let n=0,s=0,u=0,l=[],p=[],c=[];try{if([s,l]=await Ed(t),t?.externalData&&a.mountExternalData){let x=[];for(let k of t.externalData){let I=typeof k=="string"?k:k.path;x.push(Va(typeof k=="string"?k:k.data).then(z=>{a.mountExternalData(I,z)}))}await Promise.all(x)}for(let x of t?.executionProviders??[])if((typeof x=="string"?x:x.name)==="webnn"){if(a.shouldTransferToMLTensor=!1,typeof x!="string"){let k=x,I=k?.context,z=k?.gpuDevice,R=k?.deviceType,D=k?.powerPreference;I?a.currentContext=I:z?a.currentContext=await a.webnnCreateMLContext(z):a.currentContext=await a.webnnCreateMLContext({deviceType:R,powerPreference:D})}else a.currentContext=await a.webnnCreateMLContext();break}n=await a._OrtCreateSession(i,r,s),a.webgpuOnCreateSession?.(n),n===0&&me("Can't create a session."),a.jsepOnCreateSession?.(),a.currentContext&&(a.webnnRegisterMLContext(n,a.currentContext),a.currentContext=void 0,a.shouldTransferToMLTensor=!0);let[h,m]=ed(n),_=!!t?.enableGraphCapture,y=[],v=[],C=[],w=[],$=[];for(let x=0;x<h;x++){let[k,I,z]=ma(n,x);k===0&&me("Can't get an input name."),p.push(k);let R=a.UTF8ToString(k);y.push(R),C.push(I===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:ot(I),shape:z})}for(let x=0;x<m;x++){let[k,I,z]=ma(n,x+h);k===0&&me("Can't get an output name."),c.push(k);let R=a.UTF8ToString(k);v.push(R),w.push(I===0?{name:R,isTensor:!1}:{name:R,isTensor:!0,type:ot(I),shape:z});{if(_&&t?.preferredOutputLocation===void 0){$.push("gpu-buffer");continue}let D=typeof t?.preferredOutputLocation=="string"?t.preferredOutputLocation:t?.preferredOutputLocation?.[R]??"cpu",V=a.webnnIsGraphOutput;if(D==="cpu"&&V&&V(n,R)){$.push("ml-tensor-cpu-output");continue}if(D!=="cpu"&&D!=="cpu-pinned"&&D!=="gpu-buffer"&&D!=="ml-tensor")throw new Error(`Not supported preferred output location: ${D}.`);if(_&&D!=="gpu-buffer")throw new Error(`Not supported preferred output location: ${D}. Only 'gpu-buffer' location is supported when enableGraphCapture is true.`);$.push(D)}}let S=null;return $.some(x=>x==="gpu-buffer"||x==="ml-tensor"||x==="ml-tensor-cpu-output")&&(u=a._OrtCreateBinding(n),u===0&&me("Can't create IO binding."),S={handle:u,outputPreferredLocations:$,outputPreferredLocationsEncoded:$.map(x=>x==="ml-tensor-cpu-output"?"ml-tensor":x).map(x=>ba(x))}),mt.set(n,[n,p,c,S,_,!1]),[n,y,v,C,w]}catch(h){throw p.forEach(m=>a._OrtFree(m)),c.forEach(m=>a._OrtFree(m)),u!==0&&a._OrtReleaseBinding(u)!==0&&me("Can't release IO binding."),n!==0&&a._OrtReleaseSession(n)!==0&&me("Can't release session."),h}finally{a._free(i),s!==0&&a._OrtReleaseSessionOptions(s)!==0&&me("Can't release session options."),l.forEach(h=>a._free(h)),a.unmountExternalData?.()}},sn=e=>{let t=_e(),i=mt.get(e);if(!i)throw new Error(`cannot release session. invalid session id: ${e}`);let[r,a,n,s,u]=i;s&&(u&&t._OrtClearBoundOutputs(s.handle)!==0&&me("Can't clear bound outputs."),t._OrtReleaseBinding(s.handle)!==0&&me("Can't release IO binding.")),t.jsepOnReleaseSession?.(e),t.webnnOnReleaseSession?.(e),t.webgpuOnReleaseSession?.(e),a.forEach(l=>t._OrtFree(l)),n.forEach(l=>t._OrtFree(l)),t._OrtReleaseSession(r)!==0&&me("Can't release session."),mt.delete(e)},ga=async(e,t,i,r,a,n,s=!1)=>{if(!e){t.push(0);return}let u=_e(),l=u.PTR_SIZE,p=e[0],c=e[1],h=e[3],m=h,_,y;if(p==="string"&&(h==="gpu-buffer"||h==="ml-tensor"))throw new Error("String tensor is not supported on GPU.");if(s&&h!=="gpu-buffer")throw new Error(`External buffer must be provided for input/output index ${n} when enableGraphCapture is true.`);if(h==="gpu-buffer"){let w=e[2].gpuBuffer;y=Et(It(p),c);{let $=u.jsepRegisterBuffer;if(!$)throw new Error('Tensor location "gpu-buffer" is not supported without using WebGPU.');_=$(r,n,w,y)}}else if(h==="ml-tensor"){let w=e[2].mlTensor;y=Et(It(p),c);let $=u.webnnRegisterMLTensor;if(!$)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');_=$(r,w,It(p),c)}else{let w=e[2];if(Array.isArray(w)){y=l*w.length,_=u._malloc(y),i.push(_);for(let $=0;$<w.length;$++){if(typeof w[$]!="string")throw new TypeError(`tensor data at index ${$} is not a string`);u.setValue(_+$*l,He(w[$],i),"*")}}else{let $=u.webnnIsGraphInput,S=u.webnnIsGraphOutput;if(p!=="string"&&$&&S){let x=u.UTF8ToString(a);if($(r,x)||S(r,x)){let k=It(p);y=Et(k,c),m="ml-tensor";let I=u.webnnCreateTemporaryTensor,z=u.webnnUploadTensor;if(!I||!z)throw new Error('Tensor location "ml-tensor" is not supported without using WebNN.');let R=await I(r,k,c);z(R,new Uint8Array(w.buffer,w.byteOffset,w.byteLength)),_=R}else y=w.byteLength,_=u._malloc(y),i.push(_),u.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,y),_)}else y=w.byteLength,_=u._malloc(y),i.push(_),u.HEAPU8.set(new Uint8Array(w.buffer,w.byteOffset,y),_)}}let v=u.stackSave(),C=u.stackAlloc(4*c.length);try{c.forEach(($,S)=>u.setValue(C+S*l,$,l===4?"i32":"i64"));let w=u._OrtCreateTensor(It(p),_,y,C,c.length,ba(m));w===0&&me(`Can't create tensor for input/output. session=${r}, index=${n}.`),t.push(w)}finally{u.stackRestore(v)}},on=async(e,t,i,r,a,n)=>{let s=_e(),u=s.PTR_SIZE,l=mt.get(e);if(!l)throw new Error(`cannot run inference. invalid session id: ${e}`);let p=l[0],c=l[1],h=l[2],m=l[3],_=l[4],y=l[5],v=t.length,C=r.length,w=0,$=[],S=[],x=[],k=[],I=s.stackSave(),z=s.stackAlloc(v*u),R=s.stackAlloc(v*u),D=s.stackAlloc(C*u),V=s.stackAlloc(C*u);try{[w,$]=Id(n),zt("wasm prepareInputOutputTensor");for(let j=0;j<v;j++)await ga(i[j],S,k,e,c[t[j]],t[j],_);for(let j=0;j<C;j++)await ga(a[j],x,k,e,h[r[j]],v+r[j],_);At("wasm prepareInputOutputTensor");for(let j=0;j<v;j++)s.setValue(z+j*u,S[j],"*"),s.setValue(R+j*u,c[t[j]],"*");for(let j=0;j<C;j++)s.setValue(D+j*u,x[j],"*"),s.setValue(V+j*u,h[r[j]],"*");if(m&&!y){let{handle:j,outputPreferredLocations:se,outputPreferredLocationsEncoded:J}=m;if(c.length!==v)throw new Error(`input count from feeds (${v}) is expected to be always equal to model's input count (${c.length}).`);zt("wasm bindInputsOutputs");for(let G=0;G<v;G++){let ae=t[G];await s._OrtBindInput(j,c[ae],S[G])!==0&&me(`Can't bind input[${G}] for session=${e}.`)}for(let G=0;G<C;G++){let ae=r[G];a[G]?.[3]?s._OrtBindOutput(j,h[ae],x[G],0)!==0&&me(`Can't bind pre-allocated output[${G}] for session=${e}.`):s._OrtBindOutput(j,h[ae],0,J[ae])!==0&&me(`Can't bind output[${G}] to ${se[G]} for session=${e}.`)}At("wasm bindInputsOutputs"),mt.set(e,[p,c,h,m,_,!0])}s.jsepOnRunStart?.(p),s.webnnOnRunStart?.(p);let Z;m?Z=await s._OrtRunWithBinding(p,m.handle,C,D,w):Z=await s._OrtRun(p,R,z,v,V,C,D,w),Z!==0&&me("failed to call OrtRun().");let X=[],re=[];zt("wasm ProcessOutputTensor");for(let j=0;j<C;j++){let se=Number(s.getValue(D+j*u,"*"));if(se===x[j]){X.push(a[j]);continue}let J=s.stackSave(),G=s.stackAlloc(4*u),ae=!1,F,ye=0;try{s._OrtGetTensorData(se,G,G+u,G+2*u,G+3*u)!==0&&me(`Can't access output tensor data on index ${j}.`);let U=u===4?"i32":"i64",L=Number(s.getValue(G,U));ye=s.getValue(G+u,"*");let ie=s.getValue(G+u*2,"*"),pe=Number(s.getValue(G+u*3,U)),N=[];for(let we=0;we<pe;we++)N.push(Number(s.getValue(ie+we*u,U)));s._OrtFree(ie)!==0&&me("Can't free memory for tensor dims.");let le=N.reduce((we,xe)=>we*xe,1);F=ot(L);let Ze=m?.outputPreferredLocations[r[j]];if(F==="string"){if(Ze==="gpu-buffer"||Ze==="ml-tensor")throw new Error("String tensor is not supported on GPU.");let we=[];for(let xe=0;xe<le;xe++){let Re=s.getValue(ye+xe*u,"*"),Oe=s.getValue(ye+(xe+1)*u,"*"),mr=xe===le-1?void 0:Oe-Re;we.push(s.UTF8ToString(Re,mr))}X.push([F,N,we,"cpu"])}else if(Ze==="gpu-buffer"&&le>0){let we=s.jsepGetBuffer;if(!we)throw new Error('preferredLocation "gpu-buffer" is not supported without using WebGPU.');let xe=we(ye),Re=Et(L,le);if(Re===void 0||!Wa(F))throw new Error(`Unsupported data type: ${F}`);ae=!0,X.push([F,N,{gpuBuffer:xe,download:s.jsepCreateDownloader(xe,Re,F),dispose:()=>{s._OrtReleaseTensor(se)!==0&&me("Can't release tensor.")}},"gpu-buffer"])}else if(Ze==="ml-tensor"&&le>0){let we=s.webnnEnsureTensor,xe=s.webnnIsGraphInputOutputTypeSupported;if(!we||!xe)throw new Error('preferredLocation "ml-tensor" is not supported without using WebNN.');if(Et(L,le)===void 0||!La(F))throw new Error(`Unsupported data type: ${F}`);if(!xe(e,F,!1))throw new Error(`preferredLocation "ml-tensor" for ${F} output is not supported by current WebNN Context.`);let Re=await we(e,ye,L,N,!1);ae=!0,X.push([F,N,{mlTensor:Re,download:s.webnnCreateMLTensorDownloader(ye,F),dispose:()=>{s.webnnReleaseTensorId(ye),s._OrtReleaseTensor(se)}},"ml-tensor"])}else if(Ze==="ml-tensor-cpu-output"&&le>0){let we=s.webnnCreateMLTensorDownloader(ye,F)(),xe=X.length;ae=!0,re.push((async()=>{let Re=[xe,await we];return s.webnnReleaseTensorId(ye),s._OrtReleaseTensor(se),Re})()),X.push([F,N,[],"cpu"])}else{let we=Xr(F),xe=new we(le);new Uint8Array(xe.buffer,xe.byteOffset,xe.byteLength).set(s.HEAPU8.subarray(ye,ye+xe.byteLength)),X.push([F,N,xe,"cpu"])}}finally{s.stackRestore(J),F==="string"&&ye&&s._free(ye),ae||s._OrtReleaseTensor(se)}}m&&!_&&(s._OrtClearBoundOutputs(m.handle)!==0&&me("Can't clear bound outputs."),mt.set(e,[p,c,h,m,_,!1]));for(let[j,se]of await Promise.all(re))X[j][2]=se;return At("wasm ProcessOutputTensor"),X}finally{s.webnnOnRunEnd?.(p),s.stackRestore(I),S.forEach(Z=>s._OrtReleaseTensor(Z)),x.forEach(Z=>s._OrtReleaseTensor(Z)),k.forEach(Z=>s._free(Z)),w!==0&&s._OrtReleaseRunOptions(w),$.forEach(Z=>s._free(Z))}},un=e=>{let t=_e(),i=mt.get(e);if(!i)throw new Error("invalid session id");let r=i[0],a=t._OrtEndProfiling(r);a===0&&me("Can't get an profile file name."),t._OrtFree(a)},ln=e=>{let t=[];for(let i of e){let r=i[2];!Array.isArray(r)&&"buffer"in r&&t.push(r.buffer)}return t}}),gt,qe,qt,sr,or,Dr,ya,Pr,St,Tt,td,Ef,zf,Af,Of,Rf,Bf,Mf,Nf=q(()=>{"use strict";We(),If(),Mt(),Pa(),gt=()=>!!ge.wasm.proxy&&typeof document<"u",qt=!1,sr=!1,or=!1,Pr=new Map,St=(e,t)=>{let i=Pr.get(e);i?i.push(t):Pr.set(e,[t])},Tt=()=>{if(qt||!sr||or||!qe)throw new Error("worker not ready")},td=e=>{switch(e.data.type){case"init-wasm":qt=!1,e.data.err?(or=!0,ya[1](e.data.err)):(sr=!0,ya[0]()),Dr&&(URL.revokeObjectURL(Dr),Dr=void 0);break;case"init-ep":case"copy-from":case"create":case"release":case"run":case"end-profiling":{let t=Pr.get(e.data.type);e.data.err?t.shift()[1](e.data.err):t.shift()[0](e.data.out);break}default:}},Ef=async()=>{if(!sr){if(qt)throw new Error("multiple calls to 'initWasm()' detected.");if(or)throw new Error("previous call to 'initWasm()' failed.");if(qt=!0,gt())return new Promise((e,t)=>{qe?.terminate(),Td().then(([i,r])=>{try{qe=r,qe.onerror=n=>t(n),qe.onmessage=td,ya=[e,t];let a={type:"init-wasm",in:ge};!a.in.wasm.wasmPaths&&(i||wa)&&(a.in.wasm.wasmPaths={wasm:new URL("ort-wasm-simd-threaded.jsep.wasm",import.meta.url).href}),qe.postMessage(a),Dr=i}catch(a){t(a)}},t)});try{await Ua(ge.wasm),await rn(ge),sr=!0}catch(e){throw or=!0,e}finally{qt=!1}}},zf=async e=>{if(gt())return Tt(),new Promise((t,i)=>{St("init-ep",[t,i]);let r={type:"init-ep",in:{epName:e,env:ge}};qe.postMessage(r)});await an(ge,e)},Af=async e=>gt()?(Tt(),new Promise((t,i)=>{St("copy-from",[t,i]);let r={type:"copy-from",in:{buffer:e}};qe.postMessage(r,[e.buffer])})):Kr(e),Of=async(e,t)=>{if(gt()){if(t?.preferredOutputLocation)throw new Error('session option "preferredOutputLocation" is not supported for proxy.');return Tt(),new Promise((i,r)=>{St("create",[i,r]);let a={type:"create",in:{model:e,options:{...t}}},n=[];e instanceof Uint8Array&&n.push(e.buffer),qe.postMessage(a,n)})}else return nn(e,t)},Rf=async e=>{if(gt())return Tt(),new Promise((t,i)=>{St("release",[t,i]);let r={type:"release",in:e};qe.postMessage(r)});sn(e)},Bf=async(e,t,i,r,a,n)=>{if(gt()){if(i.some(s=>s[3]!=="cpu"))throw new Error("input tensor on GPU is not supported for proxy.");if(a.some(s=>s))throw new Error("pre-allocated output tensor is not supported for proxy.");return Tt(),new Promise((s,u)=>{St("run",[s,u]);let l=i,p={type:"run",in:{sessionId:e,inputIndices:t,inputs:l,outputIndices:r,options:n}};qe.postMessage(p,ln(l))})}else return on(e,t,i,r,a,n)},Mf=async e=>{if(gt())return Tt(),new Promise((t,i)=>{St("end-profiling",[t,i]);let r={type:"end-profiling",in:e};qe.postMessage(r)});un(e)}}),_a,rd,Df,Bg=q(()=>{"use strict";We(),Nf(),te(),Da(),zd(),_a=(e,t)=>{switch(e.location){case"cpu":return[e.type,e.dims,e.data,"cpu"];case"gpu-buffer":return[e.type,e.dims,{gpuBuffer:e.gpuBuffer},"gpu-buffer"];case"ml-tensor":return[e.type,e.dims,{mlTensor:e.mlTensor},"ml-tensor"];default:throw new Error(`invalid data location: ${e.location} for ${t()}`)}},rd=e=>{switch(e[3]){case"cpu":return new De(e[0],e[2],e[1]);case"gpu-buffer":{let t=e[0];if(!Wa(t))throw new Error(`not supported data type: ${t} for deserializing GPU tensor`);let{gpuBuffer:i,download:r,dispose:a}=e[2];return De.fromGpuBuffer(i,{dataType:t,dims:e[1],download:r,dispose:a})}case"ml-tensor":{let t=e[0];if(!La(t))throw new Error(`not supported data type: ${t} for deserializing MLTensor tensor`);let{mlTensor:i,download:r,dispose:a}=e[2];return De.fromMLTensor(i,{dataType:t,dims:e[1],download:r,dispose:a})}default:throw new Error(`invalid data location: ${e[3]}`)}},Df=class{async fetchModelAndCopyToWasmMemory(e){return Af(await Va(e))}async loadModel(e,t){Je();let i;typeof e=="string"?i=await this.fetchModelAndCopyToWasmMemory(e):i=e,[this.sessionId,this.inputNames,this.outputNames,this.inputMetadata,this.outputMetadata]=await Of(i,t),Ke()}async dispose(){return Rf(this.sessionId)}async run(e,t,i){Je();let r=[],a=[];Object.entries(e).forEach(h=>{let m=h[0],_=h[1],y=this.inputNames.indexOf(m);if(y===-1)throw new Error(`invalid input '${m}'`);r.push(_),a.push(y)});let n=[],s=[];Object.entries(t).forEach(h=>{let m=h[0],_=h[1],y=this.outputNames.indexOf(m);if(y===-1)throw new Error(`invalid output '${m}'`);n.push(_),s.push(y)});let u=r.map((h,m)=>_a(h,()=>`input "${this.inputNames[a[m]]}"`)),l=n.map((h,m)=>h?_a(h,()=>`output "${this.outputNames[s[m]]}"`):null),p=await Bf(this.sessionId,a,u,s,l,i),c={};for(let h=0;h<p.length;h++)c[this.outputNames[s[h]]]=n[h]??rd(p[h]);return Ke(),c}startProfiling(){}endProfiling(){Mf(this.sessionId)}}}),Pf={};Ft(Pf,{OnnxruntimeWebAssemblyBackend:()=>Ba,initializeFlags:()=>Ra,wasmBackend:()=>Uf});var Ra,Ba,Uf,Mg=q(()=>{"use strict";We(),Nf(),Bg(),Ra=()=>{(typeof ge.wasm.initTimeout!="number"||ge.wasm.initTimeout<0)&&(ge.wasm.initTimeout=0);let e=ge.wasm.simd;if(typeof e!="boolean"&&e!==void 0&&e!=="fixed"&&e!=="relaxed"&&(console.warn(`Property "env.wasm.simd" is set to unknown value "${e}". Reset it to \`false\` and ignore SIMD feature checking.`),ge.wasm.simd=!1),typeof ge.wasm.proxy!="boolean"&&(ge.wasm.proxy=!1),typeof ge.wasm.trace!="boolean"&&(ge.wasm.trace=!1),typeof ge.wasm.numThreads!="number"||!Number.isInteger(ge.wasm.numThreads)||ge.wasm.numThreads<=0)if(typeof self<"u"&&!self.crossOriginIsolated)ge.wasm.numThreads=1;else{let t=typeof navigator>"u"?bm("node:os").cpus().length:navigator.hardwareConcurrency;ge.wasm.numThreads=Math.min(4,Math.ceil((t||1)/2))}},Ba=class{async init(e){Ra(),await Ef(),await zf(e)}async createInferenceSessionHandler(e,t){let i=new Df;return await i.loadModel(e,t),i}},Uf=new Ba});We();We();We();var Ng="1.23.2";{let e=(Mg(),fr(Pf)).wasmBackend;Wt("webgpu",e,5),Wt("webnn",e,5),Wt("cpu",e,10),Wt("wasm",e,10)}Object.defineProperty(ge.versions,"web",{value:Ng,enumerable:!0});function Wf(e,t=null){let i=e.length;if((i&i-1)!==0)throw new Error("FFT size must be power of 2");let r=new Float32Array(e),a=t?new Float32Array(t):new Float32Array(i),n=0;for(let s=0;s<i-1;s++){s<n&&([r[s],r[n]]=[r[n],r[s]],[a[s],a[n]]=[a[n],a[s]]);let u=i>>1;for(;u<=n;)n-=u,u>>=1;n+=u}for(let s=2;s<=i;s<<=1){let u=s>>1,l=-2*Math.PI/s;for(let p=0;p<i;p+=s){let c=1,h=0;for(let m=0;m<u;m++){let _=p+m,y=_+u,v=c*r[y]-h*a[y],C=c*a[y]+h*r[y];r[y]=r[_]-v,a[y]=a[_]-C,r[_]+=v,a[_]+=C;let w=c;c=w*Math.cos(l)-h*Math.sin(l),h=w*Math.sin(l)+h*Math.cos(l)}}}return{real:r,imag:a}}function Pg(e,t){let i=e.length,r=new Float32Array(i);for(let n=0;n<i;n++)r[n]=-t[n];let a=Wf(e,r);for(let n=0;n<i;n++)a.real[n]/=i,a.imag[n]=-a.imag[n]/i;return a}function Lf(e){let t=new Float32Array(e);for(let i=0;i<e;i++)t[i]=.5*(1-Math.cos(2*Math.PI*i/e));return t}function Ug(e,t,i){let r=e.length,a=r+t+i,n=new Float32Array(a);for(let s=0;s<r;s++)n[t+s]=e[s];for(let s=0;s<t;s++){let u=t-s;n[s]=n[u]}for(let s=0;s<i;s++){let u=t+r+s,l=t+r-2-s;n[u]=n[l]}return n}function Vf(e,t,i="constant"){let r=e.shape[e.shape.length-1],[a,n]=t,s=e.data,u=e.shape,l=a,p=n;if(i==="reflect"){let C=Math.max(a,n);if(r<=C){let w=C-r+1,$=Math.min(n,w),S=w-$,x=[...u];x[x.length-1]=r+S+$;let k=x.reduce((D,V)=>D*V,1),I=new Float32Array(k),z=k/x[x.length-1],R=x[x.length-1];for(let D=0;D<z;D++)for(let V=0;V<r;V++)I[D*R+S+V]=s[D*r+V];s=I,u=x,l=a-S,p=n-$}}let c=u[u.length-1],h=[...u];h[h.length-1]=c+l+p;let m=h.reduce((C,w)=>C*w,1),_=new Float32Array(m),y=m/h[h.length-1],v=h[h.length-1];for(let C=0;C<y;C++){let w=C*c,$=C*v;if(i==="constant")for(let S=0;S<c;S++)_[$+l+S]=s[w+S];else if(i==="reflect"){let S=s.slice(w,w+c),x=Ug(S,l,p);for(let k=0;k<v;k++)_[$+k]=x[k]}}return{data:_,shape:h}}function qg(e,t,i,r,a=!0,n=!0,s="reflect"){let[u,l]=e.shape,p=e.data,c=l;if(n){let C=Math.floor(t/2),w=Vf(e,[C,C],s);p=w.data,c=w.shape[w.shape.length-1]}let h=Math.floor((c-t)/i)+1,m=Math.floor(t/2)+1,_=new Float32Array(u*m*h),y=new Float32Array(u*m*h),v=a?1/Math.sqrt(t):1;for(let C=0;C<u;C++)for(let w=0;w<h;w++){let $=w*i,S=new Float32Array(t);for(let I=0;I<t;I++){let z=C*c+$+I;S[I]=p[z]*r[I]*v}let{real:x,imag:k}=Wf(S);for(let I=0;I<m;I++){let z=C*m*h+I*h+w;_[z]=x[I],y[z]=k[I]}}return{real:{data:_,shape:[u,m,h]},imag:{data:y,shape:[u,m,h]}}}function Wg(e,t=512,i=null){i===null&&(i=Math.floor(t/4));let r=e.shape,a=r[r.length-1],n=e.data.length/a,s={data:e.data,shape:[n,a]},u=Lf(t),l=qg(s,t,i,u,!0,!0,"reflect"),[p,c,h]=l.real.shape,m=[...r.slice(0,-1),c,h];return{real:{data:l.real.data,shape:m},imag:{data:l.imag.data,shape:m}}}function jf(e){let i=e.shape[e.shape.length-1],r=Math.ceil(i/1024),a=Math.floor(1024/2)*3,n=a+r*1024-i,s=Vf(e,[a,n],"reflect"),u=Wg(s,4096,1024),l=u.real.shape,p=l[l.length-2]-1,c=l[l.length-1],h=u.real.data.length/(l[l.length-2]*c),m=[...l];m[m.length-2]=p;let _=m.reduce((x,k)=>x*k,1),y=new Float32Array(_),v=new Float32Array(_);for(let x=0;x<h;x++)for(let k=0;k<p;k++)for(let I=0;I<c;I++){let z=x*l[l.length-2]*c+k*c+I,R=x*p*c+k*c+I;y[R]=u.real.data[z],v[R]=u.imag.data[z]}let C=[...m];C[C.length-1]=r;let w=C.reduce((x,k)=>x*k,1),$=new Float32Array(w),S=new Float32Array(w);for(let x=0;x<h;x++)for(let k=0;k<p;k++)for(let I=0;I<r;I++){let z=x*p*c+k*c+(2+I),R=x*p*r+k*r+I;$[R]=y[z],S[R]=v[z]}return{real:{data:$,shape:C},imag:{data:S,shape:C}}}function Ff(e){let[t,i,r,a]=e.real.shape,n=[t,i*2,r,a],s=t*i*2*r*a,u=new Float32Array(s);for(let l=0;l<t;l++)for(let p=0;p<i;p++)for(let c=0;c<r;c++)for(let h=0;h<a;h++){let m=l*i*r*a+p*r*a+c*a+h,_=l*(i*2)*r*a+p*2*r*a+c*a+h;u[_]=e.real.data[m];let y=l*(i*2)*r*a+(p*2+1)*r*a+c*a+h;u[y]=e.imag.data[m]}return{data:u,shape:n}}function Lg(e,t,i,r,a=!0,n=null,s=!0){let[u,l,p]=e.real.shape;if(2*l-2!==t)throw new Error(`Expected freqs = nFft/2 + 1, got freqs=${l}, nFft=${t}`);let c;n!==null?c=n:c=t+(p-1)*i,s&&(c-=t);let h=new Float32Array(u*c),m=new Float32Array(u*c),_=a?Math.sqrt(t):1;for(let y=0;y<u;y++)for(let v=0;v<p;v++){let C=new Float32Array(t),w=new Float32Array(t);for(let x=0;x<l;x++){let k=y*l*p+x*p+v;C[x]=e.real.data[k],w[x]=e.imag.data[k]}for(let x=l;x<t;x++){let k=t-x;C[x]=C[k],w[x]=-w[k]}let $=Pg(C,w),S=v*i-(s?t/2:0);for(let x=0;x<t;x++){let k=S+x;if(k>=0&&k<c){let I=y*c+k;h[I]+=$.real[x]*r[x]*_,m[I]+=r[x]*r[x]}}}for(let y=0;y<h.length;y++)m[y]>1e-8&&(h[y]/=m[y]);return{data:h,shape:[u,c]}}function Vg(e,t=null,i=null){let r=e.real.shape,a=r[r.length-2],n=r[r.length-1],s=2*a-2;t===null&&(t=Math.floor(s/4));let u=e.real.data.length/(a*n),l={real:{data:e.real.data,shape:[u,a,n]},imag:{data:e.imag.data,shape:[u,a,n]}},p=Lf(s),c=Lg(l,s,t,p,!0,i,!0),h=c.shape[1],m=[...r.slice(0,-2),h];return{data:c.data,shape:m}}function qf(e,t,i){let r=e.real.shape,a=r.length,[n,s]=t,[u,l]=i,p=r[a-2],c=r[a-1],h=p+n+s,m=c+u+l,_=[...r];_[a-2]=h,_[a-1]=m;let y=_.reduce(($,S)=>$*S,1),v=new Float32Array(y),C=new Float32Array(y),w=y/(h*m);for(let $=0;$<w;$++)for(let S=0;S<p;S++)for(let x=0;x<c;x++){let k=$*p*c+S*c+x,I=$*h*m+(S+n)*m+(x+u);v[I]=e.real.data[k],C[I]=e.imag.data[k]}return{real:{data:v,shape:_},imag:{data:C,shape:_}}}function Gf(e,t){let r=qf(e,[0,1],[0,0]);r=qf(r,[0,0],[2,2]);let a=Math.floor(1024/2)*3,n=1024*Math.ceil(t/1024)+2*a,s=Vg(r,1024,n),u=s.shape,l=u.length-1,p=u[l],c=[...u];c[l]=t;let h=c.reduce((y,v)=>y*v,1),m=new Float32Array(h),_=h/t;for(let y=0;y<_;y++)for(let v=0;v<t;v++){let C=y*p+a+v,w=y*t+v;m[w]=s.data[C]}return{data:m,shape:c}}function Hf(e){let t=e.length,i=e[0].length;if(t===1)return e[0];{let r=!0;for(let a=1;a<t;a++)if(e[a].buffer!==e[0].buffer||e[a].byteOffset!==e[a-1].byteOffset+e[a-1].length*4){r=!1;break}if(r)return new Float32Array(e[0].buffer,e[0].byteOffset,t*i);{let a=new Float32Array(t*i);for(let n=0;n<t;n++)a.set(e[n],n*i);return a}}}var dn=class{tensor;offset;length;constructor(t,i=0,r=null){let a=t.shape[t.shape.length-1];if(i<0)throw new Error("offset must be >= 0");if(i>=a)throw new Error("offset must be < totalLength");r===null?r=a-i:r=Math.min(a-i,r),this.tensor=t,this.offset=i,this.length=r}padded(t){let i=t-this.length,r=this.tensor.shape[this.tensor.shape.length-1];if(i<0)throw new Error("targetLength must be >= length");let a=this.offset-Math.floor(i/2),n=a+t,s=Math.max(0,a),u=Math.min(r,n),l=s-a,p=n-u,c=[...this.tensor.shape],h=c.length-1;c[h]=t;let m=c.reduce((w,$)=>w*$,1),_=new Float32Array(m),y=u-s,v=c[h],C=m/v;for(let w=0;w<C;w++){let $=w*r+s,S=w*v+l;for(let x=0;x<y;x++)_[S+x]=this.tensor.data[$+x]}if(_.length!==m)throw new Error(`Output size mismatch: ${_.length} !== ${m}`);return{data:_,shape:c}}};function jg(e,t){let i=e.shape[e.shape.length-1];if(i>=t)return e;let r=[...e.shape];r[r.length-1]=t;let a=r.reduce((u,l)=>u*l,1),n=new Float32Array(a),s=a/t;for(let u=0;u<s;u++){let l=u*i,p=u*t;for(let c=0;c<i;c++)n[p+c]=e.data[l+c]}return{data:n,shape:r}}function Fg(e){let[t,i,r,a,n]=e.shape,s=r/2,u=[t,i,s,a,n],l=u.reduce((h,m)=>h*m,1),p=new Float32Array(l),c=new Float32Array(l);for(let h=0;h<t;h++)for(let m=0;m<i;m++)for(let _=0;_<s;_++)for(let y=0;y<a;y++)for(let v=0;v<n;v++){let C=_*2,w=_*2+1,$=h*i*r*a*n+m*r*a*n+C*a*n+y*n+v,S=h*i*r*a*n+m*r*a*n+w*a*n+y*n+v,x=h*i*s*a*n+m*s*a*n+_*a*n+y*n+v;p[x]=e.data[$],c[x]=e.data[S]}return{real:{data:p,shape:u},imag:{data:c,shape:u}}}function Gg(e,t){if(e.shape.length!==t.shape.length||!e.shape.every((r,a)=>r===t.shape[a]))throw new Error("Tensor shapes must match for addition");let i=new Float32Array(e.data.length);for(let r=0;r<e.data.length;r++)i[r]=e.data[r]+t.data[r];return{data:i,shape:[...e.shape]}}function Hg(e,t){let i=e.shape,r=i[i.length-1];if(t>=r)return e;let a=[...i];a[a.length-1]=t;let n=a.reduce((l,p)=>l*p,1),s=new Float32Array(n),u=n/t;for(let l=0;l<u;l++)for(let p=0;p<t;p++){let c=l*r+p,h=l*t+p;s[h]=e.data[c]}return{data:s,shape:a}}function Kg(e,t){let i=e.shape[e.shape.length-1],a=i-t;if(a<0)throw new Error(`tensor must be larger than reference. Delta is ${a}.`);if(a===0)return e;let n=Math.floor(a/2),s=i-(a-Math.floor(a/2)),u=[...e.shape],l=s-n;u[u.length-1]=l;let p=u.reduce((m,_)=>m*_,1),c=new Float32Array(p),h=p/l;for(let m=0;m<h;m++)for(let _=0;_<l;_++){let y=m*i+n+_,v=m*l+_;c[v]=e.data[y]}return{data:c,shape:u}}async function Zg(e,t){let i=t.length,r=e.validLength(i),a=t.padded(r),n=Math.floor(e.segment*e.samplerate),s=jg(a,n),u=jf(s),l=Ff(u),{outX:p,outXt:c}=await e.forward(a,l),h=Fg(p),m=Gf(h,n),_=Gg(c,m),y=Hg(_,r);return Kg(y,i)}async function Xg(e,t,i,r=.25){let[a,n,s]=t.shape,u=e.sources.length,l=new Float32Array(a*u*n*s),p=new Float32Array(s),c=Math.floor(e.samplerate*e.segment),h=Math.floor((1-r)*c),m=new Float32Array(c);for(let w=0;w<Math.floor(c/2)+1;w++)m[w]=w+1;for(let w=Math.floor(c/2)+1;w<c;w++)m[w]=c-w;let _=m.reduce((w,$)=>Math.max(w,$),-1/0);for(let w=0;w<c;w++)m[w]/=_;let y=Math.ceil(s/h);i?.(0,y);let v=0,C=0;for(;v<s;){let w=new dn(t,v,c),$=await Zg(e,w),S=$.shape[$.shape.length-1];for(let x=0;x<a;x++)for(let k=0;k<u;k++)for(let I=0;I<n;I++)for(let z=0;z<S;z++){let R=x*u*n*s+k*n*s+I*s+v+z,D=x*u*n*S+k*n*S+I*S+z;l[R]+=m[z]*$.data[D]}for(let x=0;x<S;x++)p[v+x]+=m[x];v+=h,C++,i?.(C,y)}for(let w=0;w<l.length;w++){let $=w%s;l[w]/=p[$]}return{data:l,shape:[a,u,n,s]}}async function Yg(e,t,i,r=.25){return await Xg(e,t,i,r)}async function pn(e,t,i,r=.25){let{channelData:a,sampleRate:n}=t,s=a.length,u=a[0].length,p={data:Hf(t.channelData),shape:[1,s,u]},c=await Yg(e,p,i,r),[h,m,_,y]=c.shape,v={};for(let C=0;C<m;C++){let w=e.sources[C],$=[];for(let S=0;S<s;S++){let x=C*s*y+S*y,k=new Float32Array(c.data.buffer,x*4,y);$.push(k)}v[w]={channelData:$,sampleRate:n}}return v}ge.wasm.wasmPaths=new URL("./",self.location.href).href;ge.logLevel="error";var et=null,cn=null,Dt=null,tt=(e,t)=>self.postMessage(e,t||[]);async function Qg(e){let t=await crypto.subtle.digest("SHA-256",e);return[...new Uint8Array(t)].map(i=>i.toString(16).padStart(2,"0")).join("")}async function Jg(){let e=await(await fetch("htdemucs.json",{cache:"no-cache"})).json(),t=new Uint8Array(e.bytes),i=0,r=0;for(let a of e.parts){let n=await fetch(a.file);if(!n.ok)throw new Error(`Falta el archivo ${a.file} (${n.status}). Comprueba que lo has subido.`);let s;if(n.body&&n.body.getReader){let u=n.body.getReader(),l=[],p=0;for(;;){let{done:h,value:m}=await u.read();if(h)break;l.push(m),p+=m.length,r+=m.length,tt({type:"progress",phase:"model",done:r,total:e.bytes})}s=new Uint8Array(p);let c=0;for(let h of l)s.set(h,c),c+=h.length}else s=new Uint8Array(await n.arrayBuffer()),r+=s.length,tt({type:"progress",phase:"model",done:r,total:e.bytes});if(s.length!==a.bytes)throw new Error(`El archivo ${a.file} est\xE1 incompleto (${s.length} de ${a.bytes} bytes). Vuelve a subirlo.`);if(a.sha256&&crypto.subtle&&await Qg(s)!==a.sha256)throw new Error(`El archivo ${a.file} est\xE1 da\xF1ado. Vuelve a subirlo.`);t.set(s,i),i+=s.length}return t}async function ey(e,t){let i={executionProviders:[t],graphOptimizationLevel:"all"};return Zr.create(e,i)}async function Kf(e){if(et)return;tt({type:"progress",phase:"model",done:0,total:1});let t=await Jg();tt({type:"progress",phase:"init",done:0,total:1});let i=e==="wasm"?["wasm"]:self.navigator&&navigator.gpu?["webgpu","wasm"]:["wasm"],r=null;for(let a of i)try{if(a==="wasm"){let n=self.crossOriginIsolated?Math.max(1,Math.min(8,navigator.hardwareConcurrency||4)):1;ge.wasm.numThreads=n}et=await ey(t,a),Dt=a;break}catch(n){r=n,et=null}if(!et)throw r||new Error("No se ha podido iniciar el modelo.");cn={sources:["drums","bass","other","vocals"],audioChannels:2,samplerate:44100,segment:7.8,validLength(a){let n=Math.floor(this.segment*this.samplerate);if(n<a)throw new Error("trozo demasiado largo");return n},async forward(a,n){let s={};s[et.inputNames[0]]=new De("float32",a.data,a.shape),s[et.inputNames[1]]=new De("float32",n.data,n.shape);let u=await et.run(s),l=u[et.outputNames[0]],p=u[et.outputNames[1]];return{outX:{data:l.data,shape:l.dims},outXt:{data:p.data,shape:p.dims}}}},tt({type:"ready",ep:Dt,threads:ge.wasm.numThreads||1})}self.onmessage=async e=>{let t=e.data;if(t.type==="separate")try{await Kf(t.prefer);let i=performance.now(),r;try{r=await pn(cn,{channelData:t.channels,sampleRate:44100},(u,l)=>tt({type:"progress",phase:"sep",done:u,total:l,ep:Dt}),t.overlap??.25)}catch(u){if(Dt!=="webgpu")throw u;et=null,Dt=null,tt({type:"fallback",message:String(u&&u.message||u)}),await Kf("wasm"),r=await pn(cn,{channelData:t.channels,sampleRate:44100},(l,p)=>tt({type:"progress",phase:"sep",done:l,total:p,ep:Dt}),t.overlap??.25)}let a=["drums","bass","other","vocals"],n=r.drums.channelData[0].buffer,s=r.drums.channelData[0].length;tt({type:"done",id:t.id,buffer:n,length:s,names:a,ep:Dt,seconds:(performance.now()-i)/1e3},[n])}catch(i){tt({type:"error",id:t.id,message:String(i&&i.message||i)})}};
/*! Bundled license information:

onnxruntime-web/dist/ort.bundle.min.mjs:
  (*!
   * ONNX Runtime Web v1.23.2
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Licensed under the MIT License.
   *)

onnxruntime-web/dist/ort.bundle.min.mjs:
  (**
   * @license
   * Copyright 2021 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2020 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
  (**
   * @license
   * Copyright 2019 Google LLC. All Rights Reserved.
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * =============================================================================
   *)
*/
