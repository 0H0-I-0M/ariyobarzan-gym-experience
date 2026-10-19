'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced && 'IntersectionObserver' in window) {
 document.documentElement.classList.add('js-motion');
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}), {threshold:.08});
 document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const tour = document.querySelector('.tour');
const canvas = document.querySelector('#tour-canvas');
const ctx = canvas.getContext('2d', {alpha:false});
const frameTotal=224;
const frames = new Map();
let target=0, displayed=-1, scene=-1, running=false;
const frameURL=index=>`assets/frames/${String(index+1).padStart(3,'0')}.jpg`;
function draw(index){const img=frames.get(index);if(img?.complete&&img.naturalWidth){ctx.drawImage(img,0,0,360,640);displayed=index;}}
function loadFrame(index){
 if(index<0||index>=frameTotal||frames.has(index)) return;
 const img=new Image(); frames.set(index,img);img.onload=()=>{if(index===target||displayed<0)draw(index);};img.src=frameURL(index);
}
loadFrame(0);
const scenes=[['۰۱ / ۰۳','به آریوبرزن خوش اومدی.','از فضای ورودی، وارد حال‌وهوای باشگاه شو.'],['۰۲ / ۰۳','حالا وسط تمرینی.','مسیر مرکزی، سالن بدنسازی و دستگاه‌ها؛ از نزدیک ببین.'],['۰۳ / ۰۳','بعد از آخرین ست.','کافه و سرگرمی؛ یک مکث برای ادامهٔ روز.']];
function update(){
 running=false;
 const sy=window.scrollY;const full=document.documentElement.scrollHeight-innerHeight;
 document.querySelector('.progress').style.width=`${full>0?sy/full*100:0}%`;
 if(!reduced){document.querySelector('.hero-image').style.transform=`scale(${1+Math.min(sy/innerHeight,1)*.13}) translateY(${Math.min(sy*.12,130)}px)`;}
 const rect=tour.getBoundingClientRect();
 const p=reduced?0:Math.max(0,Math.min(1,-rect.top/(tour.offsetHeight-innerHeight)));
 target=Math.round(p*(frameTotal-1));
 const nextScene=p<.23?0:p<.71?1:2;
 if(nextScene!==scene){scene=nextScene;['scene-number','scene-title','scene-desc'].forEach((id,i)=>{document.getElementById(id).textContent=scenes[scene][i];});}
 document.querySelector('.tour-line span').style.width=`${p*100}%`;
 document.querySelector('#frame-count').textContent=`00:${String(Math.floor(p*28)).padStart(2,'0')} / 00:28`;
 if(rect.top<innerHeight*1.5&&rect.bottom>0){
  loadFrame(target); if(displayed!==target)draw(target);
  for(let i=1;i<=14;i++){loadFrame(target+i);loadFrame(target-i);}
 }
}
function requestUpdate(){if(!running){running=true;requestAnimationFrame(update);}}
addEventListener('scroll',requestUpdate,{passive:true});addEventListener('resize',requestUpdate);update();
// Preload in small batches after the initial page paint; nearest frames load first on scroll.
let preload=1;
function warmFrames(){for(let j=0;j<8&&preload<frameTotal;j++,preload++)loadFrame(preload);if(preload<frameTotal)setTimeout(warmFrames,180);}
setTimeout(warmFrames,1400);
const posterDialog=document.querySelector('#poster-dialog');
document.querySelectorAll('[data-poster]').forEach(button=>button.addEventListener('click',()=>{
 const img=posterDialog.querySelector('img');img.src=button.dataset.poster;img.alt=`پوستر ${button.dataset.title}`;
 const link=posterDialog.querySelector('a');link.href=button.dataset.poster;
 posterDialog.showModal();
}));
const videoDialog=document.querySelector('#video-dialog');
document.querySelector('#play-tour').addEventListener('click',()=>{videoDialog.showModal();videoDialog.querySelector('video').play().catch(()=>{});});
videoDialog.addEventListener('close',()=>videoDialog.querySelector('video').pause());
document.querySelectorAll('dialog').forEach(dialog=>{
 dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
});
const visitDialog=document.querySelector('#visit-dialog');
const goal=document.querySelector('#visit-goal');
function message(){document.querySelector('#visit-message').value=`سلام، از سایت نمایشی آریوبرزن با باشگاه آشنا شدم. برای ${goal.value} می‌خواستم شهریه، ساعت کاری و شرایط هماهنگی بازدید را بدونم. ممنونم.`;document.querySelector('.copy-status').textContent='';}
document.querySelector('#visit-button').addEventListener('click',()=>{message();visitDialog.showModal();});goal.addEventListener('change',message);
document.querySelector('#copy-message').addEventListener('click',async()=>{
 const field=document.querySelector('#visit-message');
 try{await navigator.clipboard.writeText(field.value);document.querySelector('.copy-status').textContent='پیام کپی شد؛ حالا در دایرکت باشگاه بفرست.';}catch{field.focus();field.select();document.querySelector('.copy-status').textContent='متن انتخاب شد؛ با گزینهٔ کپی دستگاهت بردار.';}
});
