import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/addons/shaders/FXAAShader.js';

const holder=document.querySelector('#gym-world');
const section=document.querySelector('.experience');
const preference=matchMedia('(prefers-reduced-motion: reduce)');
let renderer;
try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:'high-performance'});}catch{document.documentElement.classList.add('no-webgl');}
if(renderer) init();
function init(){
 const mobile=innerWidth<701;
 renderer.setPixelRatio(Math.min(devicePixelRatio,mobile?1.25:1.5));
 renderer.setSize(innerWidth,innerHeight);
 renderer.toneMapping=THREE.ACESFilmicToneMapping;
 renderer.toneMappingExposure=.98;
 renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
 renderer.outputColorSpace=THREE.SRGBColorSpace;
 holder.appendChild(renderer.domElement);
 const scene=new THREE.Scene();scene.background=new THREE.Color('#55565a');scene.fog=new THREE.FogExp2('#646363',.014);
 const camera=new THREE.PerspectiveCamera(mobile?66:60,innerWidth/innerHeight,.1,130);
 const pmrem=new THREE.PMREMGenerator(renderer);
 const room=new RoomEnvironment();const environment=pmrem.fromScene(room,.05);scene.environment=environment.texture;scene.environmentIntensity=.5;room.dispose();pmrem.dispose();
 scene.add(new THREE.HemisphereLight('#f0f1f2','#5f584d',1.45));
 const sun=new THREE.DirectionalLight('#fff1da',2.1);sun.position.set(4,9,15);sun.target.position.set(-2,0,-10);scene.add(sun,sun.target);sun.castShadow=true;sun.shadow.mapSize.set(mobile?1024:2048,mobile?1024:2048);Object.assign(sun.shadow.camera,{left:-25,right:25,top:30,bottom:-30,near:1,far:90});sun.shadow.normalBias=.035;sun.shadow.bias=-.0003;
 const fill=new THREE.DirectionalLight('#cbdad8',.6);fill.position.set(-9,3,-20);scene.add(fill);
 const redGlow=new THREE.PointLight('#ed183c',65,14,2);redGlow.position.set(-4,2,-31);scene.add(redGlow);
 const warmGlow=new THREE.PointLight('#ffe0aa',95,19,2);warmGlow.position.set(2.5,3.2,4);scene.add(warmGlow);
 const mat={};
 function material(name,color,metalness=0,roughness=.6,extra={}){return mat[name]=new THREE.MeshStandardMaterial({color,metalness,roughness,...extra});}
 material('floor','#b4a788',.05,.78);material('wall','#77797d',.08,.8);material('ceiling','#aaa6a0',.03,.9);material('rubber','#111914',.02,.94);material('steel','#323c38',.73,.29);material('chrome','#bcc5bc',.92,.2);material('black','#151c19',.28,.45);material('leather','#3d4148',.05,.78);material('red','#92172d',.18,.68);material('brass','#998464',.67,.3);material('pale','#c7c5b7',.15,.55);material('glass','#4b525c',.8,.16);material('screen','#071d17',.2,.32,{emissive:'#3b5b41',emissiveIntensity:.15});material('light','#f5ead3',0,.3,{emissive:'#fff0d1',emissiveIntensity:3.0});material('redlight','#d5223a',0,.3,{emissive:'#e5233a',emissiveIntensity:1.6});
 // Shared instanced geometry keeps the detailed environment light on mobile GPUs.
 const geometry={box:new THREE.BoxGeometry(1,1,1),cylinder:new THREE.CylinderGeometry(1,1,1,16),ring:new THREE.TorusGeometry(1,.075,6,24),sphere:new THREE.SphereGeometry(1,12,8)};
 const batches=new Map();const rotation=new THREE.Euler();const quaternion=new THREE.Quaternion();const matrix=new THREE.Matrix4();const position=new THREE.Vector3();const scale=new THREE.Vector3();
 function item(type,materialName,x,y,z,sx,sy,sz,rx=0,ry=0,rz=0){const key=type+'|'+materialName;if(!batches.has(key))batches.set(key,[]);rotation.set(rx,ry,rz);quaternion.setFromEuler(rotation);matrix.compose(position.set(x,y,z),quaternion,scale.set(sx,sy,sz));batches.get(key).push(matrix.clone());}
 const box=(w,h,d,x,y,z,m='steel',rx=0,ry=0,rz=0)=>item('box',m,x,y,z,w,h,d,rx,ry,rz);
 const cylinder=(r,h,x,y,z,m='chrome',rx=0,ry=0,rz=0)=>item('cylinder',m,x,y,z,r,h,r,rx,ry,rz);
 function barBetween(a,b,r=.025,m='chrome'){const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b);const delta=end.clone().sub(start);const q=new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),delta.clone().normalize());const center=start.add(end).multiplyScalar(.5);const key='cylinder|'+m;if(!batches.has(key))batches.set(key,[]);batches.get(key).push(new THREE.Matrix4().compose(center,q,new THREE.Vector3(r,delta.length(),r)));}
 function plate(x,y,z,r=.38,m='black',axis='x'){cylinder(r,.11,x,y,z,m,axis==='z'?Math.PI/2:0,0,axis==='x'?Math.PI/2:0);cylinder(.065,.135,x,y,z,'chrome',axis==='z'?Math.PI/2:0,0,axis==='x'?Math.PI/2:0);item('ring','chrome',x+(axis==='x'?.062:0),y,z+(axis==='z'?.062:0),r*.7,r*.7,r*.7,0,axis==='x'?Math.PI/2:0,0);}
 function barbell(x,y,z,w=2.1){cylinder(.024,w,x,y,z,'chrome',0,0,Math.PI/2);for(const side of[-1,1]){plate(x+side*w*.37,y,z,.37,'red');plate(x+side*w*.43,y,z,.31,'black');plate(x+side*w*.48,y,z,.25,'black');}}
 function bench(x,z,angle=0){
  box(1.1,.08,1.9,x,.08,z,'rubber');box(.58,.15,1.35,x,.68,z+.1,'leather',-.16);box(.56,.14,.48,x,.53,z+.95,'leather',.16);
  for(const dz of[-.55,.75]){box(.08,.48,.08,x,.3,z+dz,'steel');box(.88,.07,.17,x,.1,z+dz,'steel');}
  box(.09,.1,1.7,x,.3,z+.2,'steel');
 }
 function rack(x,z){
  box(2.35,.06,2.4,x,.03,z,'rubber');
  for(const dx of[-.93,.93])for(const dz of[-.75,.75]){box(.095,2.65,.095,x+dx,1.37,z+dz,'steel');box(.17,.06,.33,x+dx,.1,z+dz,'black');}
  for(const dz of[-.75,.75]){box(1.95,.1,.09,x,2.6,z+dz,'steel');box(1.95,.06,.09,x,.2,z+dz,'steel');}
  barBetween([x-.93,2.6,z+.75],[x+.93,2.6,z+.75],.023,'chrome');
  for(const dx of[-.91,.91]){for(let k=0;k<6;k++)cylinder(.012,.105,x+dx,.7+k*.22,z+.74,'chrome',Math.PI/2);box(.17,.07,.3,x+dx,1.28,z+.69,'brass');}
  barbell(x,1.32,z+.68);bench(x,z+.38);
  for(const side of[-1,1])for(const dz of[-.38,.38]){cylinder(.022,.3,x+side*1.08,.85,z+dz,'chrome',0,0,Math.PI/2);plate(x+side*1.16,.85,z+dz,.3,'black');}
 }
 function cableMachine(x,z,mirror=false){
  box(1.7,.08,1.6,x,.05,z,'rubber');
  for(const dx of[-.63,.63]){box(.09,2.5,.09,x+dx,1.3,z-.3,'steel');box(.09,.09,1.4,x+dx,.13,z,'steel');}
  box(1.38,.15,.15,x,2.49,z-.3,'steel');box(.72,1.1,.44,x,.75,z-.28,'black');
  for(let j=0;j<12;j++)box(.58,.035,.32,x,.35+j*.065,z-.2,'chrome');
  for(const dx of[-.28,.28])cylinder(.012,1.7,x+dx,1.25,z-.15,'chrome');
  cylinder(.07,.14,x,2.38,z-.1,'black',Math.PI/2);barBetween([x,2.35,z-.05],[x,1.75,z+.68],.007,'black');
  cylinder(.022,1.1,x,1.74,z+.68,'chrome',0,0,Math.PI/2);for(const dx of[-.5,.5])cylinder(.035,.2,x+dx,1.74,z+.68,'black',0,0,Math.PI/2);
  box(.55,.15,.62,x,.68,z+.45,'leather');box(.48,.68,.15,x,.98,z+.04,'leather');box(.08,.55,.08,x,.35,z+.45,'steel');box(.9,.07,.23,x,.1,z+.7,'steel');cylinder(.09,.76,x,.76,z+1,'black',0,0,Math.PI/2);
 }
 function dumbbellRack(x,z){
  box(.12,.7,3.8,x-.34,.45,z,'steel');box(.12,.7,3.8,x+.34,.45,z,'steel');
  for(const y of[.65,1.05]){box(.9,.06,3.9,x,y,z,'steel');for(let j=0;j<7;j++){const zz=z-1.55+j*.5;cylinder(.022,.53,x,y+.12,zz,'chrome',0,0,Math.PI/2);for(const dx of[-.23,.23])cylinder(.12,.13,x+dx,y+.12,zz,'black',0,0,Math.PI/2);}}
 }
 function treadmill(x,z){box(.95,.15,2.2,x,.19,z,'black');box(.72,.02,1.7,x,.28,z+.1,'rubber');for(const dx of[-.4,.4])barBetween([x+dx,.26,z-.5],[x+dx,1.4,z-.78],.035,'steel');box(.8,.1,.38,x,1.4,z-.76,'black',-.3);box(.37,.012,.23,x,1.46,z-.79,'screen',-.3);for(const dx of[-.37,.37])barBetween([x+dx,1.25,z-.65],[x+dx,1.15,z+.02],.026,'chrome');}
 // Architecture: the red central lane and rectangular ceiling light language of the club.
 box(18,.2,72,0,-.12,-11,'floor');box(18,.18,52,0,3.6,-5,'ceiling');
 box(.25,3.6,72,-8.4,1.73,-11,'wall');box(.25,3.6,72,8.4,1.73,-11,'wall');box(17,3.6,.3,0,1.73,-46.8,'wall');
 box(4.1,.025,62,-5.65,.006,-12,'rubber');box(5,.025,62,5.5,.006,-12,'rubber');
 for(let z=19;z>-45;z-=8){
  for(const x of[-7.1,7.1]){box(.47,3.55,.47,x,1.7,z,'wall');box(.03,2.9,.04,x+(x<0?.25:-.25),1.7,z+.25,'chrome');}
  box(16,.045,.08,0,3.47,z,'ceiling');
 }
 for(let z=16;z>-45;z-=6.7){
  const center=-1.7;box(5.5,.025,.045,center,3.37,z,'light');box(5.5,.025,.045,center,3.37,z-3.4,'light');for(const x of[center-2.75,center+2.75])box(.045,.025,3.4,x,3.37,z-1.7,'light');
  box(1.25,.12,1.25,-1.7,3.32,z-1.7,'pale');box(.64,.025,.64,-1.7,3.25,z-1.7,'black');for(let g=0;g<7;g++){box(.82,.018,.018,-1.7,3.23,z-2+g*.1,'chrome');}
 }
 for(let z=17;z>-44;z-=7){box(.015,2.6,5.6,-8.24,1.9,z-2,'glass');box(.015,.035,5.6,-8.22,3.0,z-2,'chrome');box(.015,2.6,5.6,8.24,1.9,z-2,'glass');box(.015,.035,5.6,8.22,3.0,z-2,'chrome');}
 // Fine joints and lane marking are geometry, not a prerecorded image sequence.
 box(2.15,.03,62,-1.7,.025,-12,'red');for(const x of[-2.73,-.67])box(.035,.008,62,x,.046,-12,'pale');
 for(let z=17;z>-42;z-=2.3){for(const x of[-2.58,-.82])box(.3,.008,.035,x,.049,z,'pale');}
 for(let i=0;i<6;i++){
  const labelCanvas=document.createElement('canvas');labelCanvas.width=128;labelCanvas.height=128;const lc=labelCanvas.getContext('2d');lc.fillStyle='#d4d0bc';lc.font='700 82px Arial';lc.textAlign='center';lc.fillText(String(i+1),64,95);const texture=new THREE.CanvasTexture(labelCanvas);texture.colorSpace=THREE.SRGBColorSpace;
  const label=new THREE.Mesh(new THREE.PlaneGeometry(.48,.48),new THREE.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false}));label.rotation.x=-Math.PI/2;label.position.set(-1.7,.052,15-i*7);scene.add(label);
 }
 for(const z of[7,-8,-23])rack(-5.7,z);for(const z of[13,-3,-19,-35]){for(const x of[-3.65,2.5])box(.6,3.55,.6,x,1.72,z,'wall');}
 for(const z of[7,-1,-9,-17,-25,-33])cableMachine(4.8,z);for(const z of[-5,-17,-29])cableMachine(-6.3,z);
 for(const z of[4,-9,-22]){bench(.9,z);barbell(.9,.22,z+1.5,1.7);}dumbbellRack(6.95,9);dumbbellRack(6.95,-5);dumbbellRack(-7.3,-18);
 treadmill(4.9,18);treadmill(6.35,18);treadmill(-5.2,18);treadmill(-6.6,18);
 // Lounge / cafe corner.
 box(4,.2,7,5.7,.08,16.0,'rubber');box(2.9,.42,.95,5.5,.4,14.299999999999997,'leather');box(2.9,.6,.18,5.5,.85,13.899999999999999,'leather');for(const x of[3.95,7.05])box(.22,.5,1,x,.65,14.299999999999997,'leather');
 box(1.7,.42,.95,7.1,.4,16.799999999999997,'leather',0,Math.PI/2);box(1.7,.6,.18,7.5,.85,16.799999999999997,'leather',0,Math.PI/2);
 cylinder(.65,.055,5.3,.69,16.5,'brass');cylinder(.06,.57,5.3,.38,16.5,'steel');cylinder(.4,.035,5.3,.08,16.5,'black');
 box(3,1.05,.95,4.9,.54,10.200000000000003,'wall');box(3.1,.08,1.05,4.9,1.1,10.200000000000003,'brass');box(.8,.44,.55,4.35,1.34,10.149999999999999,'chrome');cylinder(.15,.32,5.7,1.28,10.200000000000003,'black');
 for(let j=0;j<5;j++)cylinder(.07,.12,4.4+j*.28,1.2,10.600000000000001,'pale');
 for(const x of[-7.4,7.4]){cylinder(.25,.5,x,.27,11.0,'black');for(let j=0;j<8;j++){const a=j*.8;barBetween([x,.5,11.0],[x+Math.cos(a)*.48,1.6+(j%3)*.15,11.0+Math.sin(a)*.4],.025,'leather');item('sphere','leather',x+Math.cos(a)*.48,1.6+(j%3)*.15,11.0+Math.sin(a)*.4,.12,.4,.1,0,a,.4);}}
 // Club mark on the end wall, loaded from the actual brand's restored vector.
 const logoTexture=new THREE.TextureLoader().load('assets/brand-ab.svg',()=>{renderOnce();});logoTexture.colorSpace=THREE.SRGBColorSpace;
 const logo=new THREE.Mesh(new THREE.PlaneGeometry(3.9,2.57),new THREE.MeshBasicMaterial({map:logoTexture,transparent:true,depthWrite:false}));logo.position.set(-1.7,1.9,-46.55);scene.add(logo);
 box(6.4,.018,.04,-1.7,3.1,-46.2,'light');
 // Slightly rotating metal plate is a physical suspended sign near the entrance.
 const floatingGroup=new THREE.Group();scene.add(floatingGroup);
 const plateMesh=new THREE.Mesh(new THREE.TorusGeometry(.55,.17,12,40),mat.black);plateMesh.position.set(-3.3,1.2,16.6);floatingGroup.add(plateMesh);
 const ringMesh=new THREE.Mesh(new THREE.TorusGeometry(.27,.025,6,30),mat.brass);ringMesh.position.copy(plateMesh.position);ringMesh.position.z+=.15;floatingGroup.add(ringMesh);
 barBetween([-3.3,1.2,16.7],[-3.3,1.2,17.6],.035,'chrome');box(.85,.1,1.3,-3.3,.07,16.9,'black');barBetween([-3.3,.12,16.7],[-3.3,1.2,16.7],.045,'steel');

 // A foosball table and lit aquarium echo the entrance seen in the club reels.
 material('felt','#15604c',.05,.8);material('water','#1476aa',.45,.18,{emissive:'#168fd1',emissiveIntensity:.55});
 box(1.7,.6,1,4.4,.85,16,'pale');box(1.5,.04,.8,4.4,1.17,16,'felt');for(const dx of[-.65,.65])for(const dz of[-.35,.35])box(.07,.64,.07,4.4+dx,.35,16+dz,'steel');
 for(let r=0;r<5;r++){cylinder(.017,2.1,4.4,1.25,15.68+r*.16,'chrome',0,0,Math.PI/2);for(let p=0;p<3;p++)box(.06,.17,.07,3.95+p*.43,1.25,15.68+r*.16,r%2?'red':'pale');}
 box(2.2,1.0,.65,6.4,.53,22,'black');box(2.1,.75,.6,6.4,1.38,22,'water');box(2.2,.07,.65,6.4,1.8,22,'chrome');
 for(let j=0;j<7;j++)item('sphere','pale',5.65+j*.23,1.3+Math.sin(j)*.15,22.25,.045,.025,.015);
 // Compress positions along the long axis to match the compact, open plan.
 for(const transforms of batches.values())for(const transform of transforms)transform.elements[14]*=.65;
 for(const object of scene.children){if(object.isMesh&&!object.isInstancedMesh)object.position.z*=.65;}
 for(const [key,transforms] of batches){const[type,name]=key.split('|');const mesh=new THREE.InstancedMesh(geometry[type],mat[name],transforms.length);transforms.forEach((m,i)=>mesh.setMatrixAt(i,m));mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere();mesh.castShadow=!['light','redlight','floor','ceiling','wall','glass'].includes(name);mesh.receiveShadow=['floor','rubber','red','wall','leather'].includes(name);scene.add(mesh);}
 const particles=new Float32Array(72*3);for(let i=0;i<72;i++){particles[i*3]=Math.sin(i*38.1)*7;particles[i*3+1]=(Math.sin(i*73.9)*.5+.5)*4.3;particles[i*3+2]=Math.cos(i*29.3)*28-10;}
 const dustGeo=new THREE.BufferGeometry();dustGeo.setAttribute('position',new THREE.BufferAttribute(particles,3));const dust=new THREE.Points(dustGeo,new THREE.PointsMaterial({color:'#d9c8a3',size:.018,transparent:true,opacity:.25,depthWrite:false}));scene.add(dust);
 const composer=new EffectComposer(renderer);composer.addPass(new RenderPass(scene,camera));const bloom=new UnrealBloomPass(new THREE.Vector2(innerWidth,innerHeight),.2,.35,1.7);composer.addPass(bloom);composer.addPass(new OutputPass());const fxaa=new ShaderPass(FXAAShader);fxaa.material.uniforms.resolution.value.set(1/(innerWidth*renderer.getPixelRatio()),1/(innerHeight*renderer.getPixelRatio()));composer.addPass(fxaa);
 const hero=document.querySelector('.hero-content');const stamp=document.querySelector('.hero-stamp');const journey=document.querySelector('.journey-copy');const shade=document.querySelector('.scene-shade');let zone=-1;let progress=0,targetProgress=0,paused=preference.matches,last=0,visible=true,raf=0;
 const phases=[['00 / THE ENTRANCE','همین‌جا،<br>آریوبرزن.','بازسازی بر اساس نماهای واقعی سالن؛ بدون برداشت ابعادی دقیق.'],['01 / THE TRACK','جایی برای<br>حرکت کردن.','مسیر مرکزی؛ از قدم اول تا آخرین تکرار.'],['02 / THE STRENGTH FLOOR','تمرکز روی<br>تکرارِ بعدی.','ردیف دستگاه‌ها، فضای تمرین و ریتمی که تو می‌سازی.'],['03 / THE SOCIAL CORNER','آخرین ست،<br>آخرِ ماجرا نیست.','کمی مکث. یک گپ خوب. انرژی برای ادامهٔ روز.']];
 const movementButton=document.querySelector('#motion-toggle');movementButton.addEventListener('click',()=>{paused=!paused;movementButton.setAttribute('aria-pressed',String(paused));movementButton.innerHTML=paused?'حرکت <span>▷</span>':'حرکت <span>Ⅱ</span>';movementButton.setAttribute('aria-label',paused?'ادامه حرکت محیط':'توقف حرکت محیط');if(!raf)tick(performance.now());});
 function updateUI(p){const fade=THREE.MathUtils.clamp(1-p*7,0,1);hero.style.opacity=fade;hero.style.transform=`translateY(${-p*130}px)`;hero.style.pointerEvents=fade>.15?'auto':'none';stamp.style.opacity=fade;const narrative=1;journey.style.opacity=narrative;journey.style.transform=`translateY(${(1-narrative)*25}px)`;journey.style.pointerEvents=narrative>.5?'auto':'none';shade.style.opacity=String(1-p*.25);document.querySelector('.journey-progress span').style.width=`${p*100}%`;const current=p<.17?0:p<.46?1:p<.78?2:3;if(current!==zone){zone=current;document.querySelector('#zone-index').textContent=phases[zone][0];document.querySelector('#zone-title').innerHTML=phases[zone][1];document.querySelector('#zone-text').textContent=phases[zone][2];document.querySelectorAll('[data-zone]').forEach((el,i)=>el.classList.toggle('active',i===zone));}}
 function scroll(){const rect=section.getBoundingClientRect();const distance=section.offsetHeight-innerHeight;targetProgress=preference.matches?0:THREE.MathUtils.clamp(-rect.top/Math.max(distance,1),0,1);visible=rect.bottom>0&&rect.top<innerHeight;if(visible&&!raf)tick(performance.now());}
 function cameraAt(p,t){const lounge=THREE.MathUtils.smoothstep(p,.72,1);const along=p<=.72?22-(p/.72)*54:-32+THREE.MathUtils.smoothstep(p,.72,1)*50;const strength=THREE.MathUtils.smoothstep(p,.40,.60)*(1-THREE.MathUtils.smoothstep(p,.68,.78));const x=(-1.7+strength*.6)*(1-lounge)+3.1*lounge;camera.position.set(x,1.72,along*.65);camera.lookAt((-1.7+strength*7)*(1-lounge)+5.9*lounge,1.35,(along-(1-lounge)*(11-strength*7)+lounge*5)*.65);if(!paused){camera.position.y+=Math.sin(t*.00032)*.012;dust.rotation.y=Math.sin(t*.00006)*.025;plateMesh.rotation.z=Math.sin(t*.00025)*.025;ringMesh.rotation.z=plateMesh.rotation.z;}}

 function renderOnce(){cameraAt(progress,0);composer.render();}
 function tick(now){raf=0;if(document.hidden||!visible)return;const dt=Math.min((now-last)/1000,.05);last=now;if(!paused)progress=THREE.MathUtils.damp(progress,targetProgress,6,dt||.016);updateUI(targetProgress);cameraAt(progress,now);composer.render();if(!preference.matches)raf=requestAnimationFrame(tick);}
 addEventListener('scroll',scroll,{passive:true});addEventListener('resize',()=>{const width=holder.clientWidth,height=holder.clientHeight;camera.aspect=width/height;camera.updateProjectionMatrix();renderer.setSize(width,height);composer.setSize(width,height);fxaa.material.uniforms.resolution.value.set(1/(width*renderer.getPixelRatio()),1/(height*renderer.getPixelRatio()));scroll();renderOnce();});
 document.addEventListener('visibilitychange',()=>{if(!document.hidden){last=performance.now();scroll();}});
 renderer.domElement.addEventListener('webglcontextlost',event=>{event.preventDefault();document.documentElement.classList.remove('webgl-ready');document.documentElement.classList.add('no-webgl');cancelAnimationFrame(raf);raf=0;});
 preference.addEventListener('change',()=>{paused=preference.matches;if(paused){progress=0;targetProgress=0;updateUI(0);renderOnce();}else scroll();});
 document.documentElement.classList.add('webgl-ready');scroll();renderOnce();
}
