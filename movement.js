/** Educational movement sketches, deliberately simplified rather than a form assessment. */
export function startMovement(canvas, exerciseId, options = {}) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return { setPaused() {}, setSpeed() {}, destroy() {} };
  const W = 480, H = 320;
  const colors = { background: '#0b1420', line: '#eff5f7', muted: '#526678', active: '#ff743d', cyan: '#64d9e6' };
  let destroyed = false, paused = !!options.reduced, speed = 1, raf = 0, previous = 0, time = 0;
  const point = (x,y) => ({x,y});
  const mix = (a,b,t) => a+(b-a)*t;
  const distance = (a,b) => Math.hypot(a.x-b.x,a.y-b.y);
  // Two-bone inverse kinematics keeps limbs consistent while hands and feet move.
  function joint(a,b,l1,l2,bend=1) {
    const raw=distance(a,b), d=Math.max(.01,Math.min(raw,l1+l2-.001));
    const angle=Math.atan2(b.y-a.y,b.x-a.x);
    const offset=Math.acos(Math.max(-1,Math.min(1,(l1*l1+d*d-l2*l2)/(2*l1*d))));
    return point(a.x+Math.cos(angle+offset*bend)*l1,a.y+Math.sin(angle+offset*bend)*l1);
  }
  function line(points, color=colors.line, width=6, alpha=1) {
    ctx.save(); ctx.globalAlpha=alpha; ctx.strokeStyle=color; ctx.lineWidth=width; ctx.lineCap='round'; ctx.lineJoin='round';
    ctx.beginPath(); points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)); ctx.stroke(); ctx.restore();
  }
  function circle(p,r,color,alpha=1) { ctx.save();ctx.globalAlpha=alpha;ctx.fillStyle=color;ctx.beginPath();ctx.arc(p.x,p.y,r,0,Math.PI*2);ctx.fill();ctx.restore(); }
  function rect(x,y,w,h,color,r=4) {ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
  function dumbbell(p,angle=0) {
    ctx.save();ctx.translate(p.x,p.y);ctx.rotate(angle);
    rect(-18,-3,36,6,'#a4b4be',2);rect(-23,-13,10,26,colors.active,3);rect(13,-13,10,26,colors.active,3);ctx.restore();
  }
  function person({hip,shoulder,feet,hands,legBends=[-1,-1],armBends=[1,1],head}) {
    const rear=colors.muted;
    feet.forEach((foot,i)=>{const knee=joint(hip,foot,52,54,legBends[i]);line([hip,knee,foot],i?colors.line:rear,7);circle(knee,4,i?colors.active:rear);line([point(foot.x-7,foot.y+2),point(foot.x+13,foot.y+2)],i?colors.line:rear,5);});
    line([hip,shoulder],colors.line,10);
    hands.forEach((hand,i)=>{const elbow=joint(shoulder,hand,38,36,armBends[i]);line([shoulder,elbow,hand],i?colors.line:rear,6);circle(elbow,4,i?colors.cyan:rear);circle(hand,4,colors.line);});
    const normal=point((shoulder.x-hip.x)/68,(shoulder.y-hip.y)/68);
    const h=head || point(shoulder.x+normal.x*22,shoulder.y+normal.y*22);
    line([shoulder,h],colors.line,6);circle(h,13,colors.line);circle(point(h.x+4,h.y-2),2,colors.background);
    circle(hip,5,colors.active);circle(shoulder,5,colors.cyan);
  }
  function pose(t) {
    const p=(1-Math.cos(t*Math.PI*2))/2;
    const ground=274;
    if(exerciseId==='squat') {
      const hip=point(mix(229,203,p),mix(176,222,p)), lean=mix(.03,.42,p);
      const shoulder=point(hip.x+Math.sin(lean)*68,hip.y-Math.cos(lean)*68);
      person({hip,shoulder,feet:[point(208,ground),point(256,ground)],hands:[point(shoulder.x+60,shoulder.y-7),point(shoulder.x+65,shoulder.y+2)],legBends:[-1,-1]});
      line([point(185,ground+8),point(278,ground+8)],colors.active,2,.35);
    } else if(exerciseId==='lunge') {
      const hip=point(233,mix(202,219,p)),shoulder=point(238,hip.y-68);
      person({hip,shoulder,feet:[point(156,ground),point(311,ground-5)],hands:[point(225,hip.y-5),point(257,hip.y-8)],legBends:[1,-1],armBends:[-1,1]});
      line([point(149,282),point(322,282)],colors.active,2,.35);
    } else if(exerciseId==='pushup') {
      const shoulder=point(mix(295,307,p),mix(193,242,p)),hip=point(shoulder.x-66,shoulder.y-16);
      person({hip,shoulder,feet:[point(131,ground-3),point(143,ground)],hands:[point(310,ground-2),point(328,ground)],legBends:[-1,-1],armBends:[1,1],head:point(shoulder.x+22,shoulder.y-2)});
      rect(104,284,260,4,'#273c4c',2);
    } else if(exerciseId==='chest') {
      rect(145,222,183,12,'#435a6b',5);line([point(173,234),point(163,278),point(153,278)],colors.muted,7);line([point(303,234),point(312,278)],colors.muted,7);
      const shoulder=point(272,205),hip=point(204,205),hand=point(mix(305,274,p),mix(193,133,p));
      person({hip,shoulder,feet:[point(147,ground),point(158,ground)],hands:[point(hand.x-13,hand.y+4),hand],legBends:[-1,-1],armBends:[1,1],head:point(298,205)});
      dumbbell(point(hand.x-13,hand.y+4),Math.PI/2);dumbbell(hand,Math.PI/2);
    } else if(exerciseId==='curl') {
      const shoulder=point(235,103),hip=point(232,171),elbow=point(242,140),angle=mix(1.22,-1.05,p),hand=point(elbow.x+Math.cos(angle)*36,elbow.y+Math.sin(angle)*36);
      person({hip,shoulder,feet:[point(211,ground),point(250,ground)],hands:[point(hand.x-12,hand.y+5),hand],armBends:[1,1]});
      dumbbell(hand,angle+Math.PI/2);
    } else if(exerciseId==='row') {
      const hip=point(202,174),shoulder=point(255,131),hand=point(mix(265,225,p),mix(200,172,p));
      person({hip,shoulder,feet:[point(181,ground),point(232,ground)],hands:[point(hand.x-11,hand.y-4),hand],legBends:[-1,-1],armBends:[1,1],head:point(277,118)});
      line([point(hand.x-28,hand.y),point(hand.x+28,hand.y)],'#b1c0c9',6);rect(hand.x-36,hand.y-17,12,34,colors.active,3);rect(hand.x+24,hand.y-17,12,34,colors.active,3);
    } else if(exerciseId==='lat') {
      line([point(330,279),point(330,57),point(230,57)],'#354e60',9);circle(point(230,57),7,colors.muted);
      rect(191,208,94,12,'#435a6b');line([point(249,220),point(249,280)],colors.muted,8);rect(302,190,34,70,'#1b3040');
      for(let i=0;i<4;i++)rect(306,198+i*12-p*20,26,7,'#526678',1);
      const shoulder=point(235,130),hip=point(231,198),y=mix(63,127,p),hand=point(279,y);
      line([point(230,58),point(230,y)],colors.cyan,2);line([point(184,y+5),point(202,y),point(263,y),point(284,y+5)],colors.active,6);
      person({hip,shoulder,feet:[point(292,ground),point(305,ground)],hands:[point(191,y+4),hand],legBends:[1,1],armBends:[-1,1]});
    }
  }
  function draw() {
    if(destroyed)return;
    const dpr=Math.min(window.devicePixelRatio||1,2),box=canvas.getBoundingClientRect();
    const width=Math.max(1,Math.round((box.width||W)*dpr)),height=Math.max(1,Math.round((box.height||H)*dpr));
    if(canvas.width!==width||canvas.height!==height){canvas.width=width;canvas.height=height;}
    ctx.setTransform(canvas.width/W,0,0,canvas.height/H,0,0);ctx.clearRect(0,0,W,H);
    const glow=ctx.createRadialGradient(248,148,8,248,148,240);glow.addColorStop(0,'#182d3d');glow.addColorStop(1,colors.background);ctx.fillStyle=glow;ctx.fillRect(0,0,W,H);
    for(let x=40;x<W;x+=40)line([point(x,42),point(x,279)],'#304556',.5,.23);
    line([point(50,282),point(430,282)],'#536879',1,.6);
    ctx.save();ctx.shadowColor=colors.cyan;ctx.shadowBlur=7;pose((time*.22)%1);ctx.restore();
    // The small progress rail describes a repeating movement cycle, not repetitions.
    line([point(188,304),point(292,304)],'#2b4152',3);circle(point(188+104*((time*.22)%1),304),3,colors.active);
  }
  function frame(stamp){raf=0;if(destroyed||paused)return;if(previous)time+=Math.min((stamp-previous)/1000,.05)*speed;previous=stamp;draw();raf=requestAnimationFrame(frame);}
  const observer=typeof ResizeObserver!=='undefined'?new ResizeObserver(draw):null;observer?.observe(canvas);
  draw();if(!paused)raf=requestAnimationFrame(frame);
  return {
    setPaused(value){paused=!!value||!!options.reduced;previous=0;if(paused){cancelAnimationFrame(raf);raf=0;}else if(!raf&&!destroyed)raf=requestAnimationFrame(frame);},
    setSpeed(value){if(Number.isFinite(value))speed=Math.min(3,Math.max(.15,value));},
    destroy(){destroyed=true;cancelAnimationFrame(raf);observer?.disconnect();}
  };
}

