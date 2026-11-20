import * as THREE from "three";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";

let letterFont = null;

const WORDS = [
  {en:"CAT",vi:"Con mèo",emoji:"🐱"},
  {en:"DOG",vi:"Con chó",emoji:"🐶"},
  {en:"SUN",vi:"Mặt trời",emoji:"☀️"},
  {en:"BUS",vi:"Xe buýt",emoji:"🚌"},
  {en:"FISH",vi:"Con cá",emoji:"🐟"},
  {en:"APPLE",vi:"Quả táo",emoji:"🍎"},
  {en:"BALL",vi:"Quả bóng",emoji:"⚽"},
  {en:"CAKE",vi:"Bánh ngọt",emoji:"🍰"}
];
const $ = id => document.getElementById(id);
const state = {index:0,stars:0,language:"vi",placed:[],assignment:{},solved:false,celebrated:false};
let scene,camera,renderer,raycaster,pointer,tiles=[],slotMeshes=[],dragging=null,dragOffset=new THREE.Vector3(),dragPlane;
let bankDrag=null;
const sceneEl=$("scene");
const COLORS=["#ff9b91","#79c9ef","#a68af4","#f3c75f","#70d9b0","#f59ac2"];

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function word(){return WORDS[state.index];}
function say(text,lang=state.language){
  if(!("speechSynthesis" in window))return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);u.lang=lang==="en"?"en-US":"vi-VN";u.rate=.82;u.pitch=1.06;window.speechSynthesis.speak(u);
}
function roundedRectShape(w,h,r){
  const s=new THREE.Shape();const x=-w/2,y=-h/2;
  s.moveTo(x+r,y);s.lineTo(x+w-r,y);s.quadraticCurveTo(x+w,y,x+w,y+r);
  s.lineTo(x+w,y+h-r);s.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  s.lineTo(x+r,y+h);s.quadraticCurveTo(x,y+h,x,y+h-r);
  s.lineTo(x,y+r);s.quadraticCurveTo(x,y,x+r,y);return s;
}
function makeFaceTexture(letter,color){
  const canvas=document.createElement("canvas");canvas.width=512;canvas.height=512;const c=canvas.getContext("2d");
  c.clearRect(0,0,512,512);
  c.fillStyle=color;c.fillRect(0,0,512,512);
  c.fillStyle="rgba(255,255,255,.18)";c.beginPath();c.arc(85,75,58,0,Math.PI*2);c.fill();
  c.fillStyle="rgba(255,255,255,.12)";c.beginPath();c.arc(430,420,95,0,Math.PI*2);c.fill();
  c.fillStyle="rgba(255,255,255,.94)";c.font="1000 275px Nunito,Arial";c.textAlign="center";c.textBaseline="middle";c.shadowColor="rgba(75,55,130,.18)";c.shadowBlur=9;c.fillText(letter,256,228);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
function makeLimb(material,x,y,z,rotation=0){
  const limb=new THREE.Mesh(new THREE.CapsuleGeometry(.075,.25,4,8),material);
  limb.position.set(x,y,z);limb.rotation.z=rotation;limb.castShadow=true;return limb;
}
function createCharacter(letter,index,total){
  // The glyph itself is the character's body: a rounded, beveled 3D letter,
  // not a letter printed on a square tile.
  const group=new THREE.Group();
  const color=COLORS[index%COLORS.length];
  const bodyMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:.34,metalness:.025});
  let bodyGeo;
  if(letterFont){
    bodyGeo=new TextGeometry(letter,{font:letterFont,size:1.34,height:.24,curveSegments:14,bevelEnabled:true,bevelThickness:.065,bevelSize:.035,bevelSegments:5});
    bodyGeo.computeBoundingBox();
    const box=bodyGeo.boundingBox;
    bodyGeo.translate(-(box.min.x+box.max.x)/2,-(box.min.y+box.max.y)/2,0);
  }else{
    // Graceful fallback if the font file cannot be reached.
    bodyGeo=new THREE.ExtrudeGeometry(roundedRectShape(.94,1.12,.2),{depth:.22,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:.065,bevelThickness:.065,curveSegments:12});
  }
  bodyGeo.computeVertexNormals();
  const body=new THREE.Mesh(bodyGeo,bodyMat);body.castShadow=true;body.receiveShadow=true;body.name="body";group.add(body);
  const bounds=bodyGeo.boundingBox || new THREE.Box3().setFromBufferAttribute(bodyGeo.attributes.position);
  const glyphWidth=Math.max(.55,bounds.max.x-bounds.min.x);
  const glyphHeight=Math.max(.75,bounds.max.y-bounds.min.y);
  const faceZ=.34;
  const white=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.2});
  const black=new THREE.MeshStandardMaterial({color:0x302c48,roughness:.25});
  const pink=new THREE.MeshStandardMaterial({color:0xff8e9c,roughness:.4});
  const eyeParts=[],pupils=[];
  const eyeSpacing=Math.min(.19,glyphWidth*.22);
  const eyeY=Math.min(.20,glyphHeight*.18);
  for(const x of [-eyeSpacing,eyeSpacing]){
    const eyeGroup=new THREE.Group();eyeGroup.position.set(x,eyeY,faceZ);eyeGroup.name="eyeGroup";
    const eye=new THREE.Mesh(new THREE.SphereGeometry(.105,24,18),white);eye.scale.set(1,1.18,.55);eyeGroup.add(eye);
    const pupil=new THREE.Mesh(new THREE.SphereGeometry(.048,18,14),black);pupil.position.set(.014,-.006,.062);pupil.name="pupil";eyeGroup.add(pupil);pupils.push(pupil);
    const glint=new THREE.Mesh(new THREE.SphereGeometry(.019,12,10),white);glint.position.set(.03,.035,.09);eyeGroup.add(glint);
    group.add(eyeGroup);eyeParts.push(eyeGroup);
  }
  const nose=new THREE.Mesh(new THREE.SphereGeometry(.035,16,12),new THREE.MeshStandardMaterial({color:0xffb27d,roughness:.4}));
  nose.position.set(0,-.035,faceZ+.045);nose.scale.set(1,.8,.55);nose.name="nose";group.add(nose);
  const smileCurve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(-.09,-.17,faceZ+.015),new THREE.Vector3(0,-.235,faceZ+.045),new THREE.Vector3(.09,-.17,faceZ+.015));
  const mouth=new THREE.Mesh(new THREE.TubeGeometry(smileCurve,18,.018,8,false),black);mouth.name="mouth";group.add(mouth);
  const tongue=new THREE.Mesh(new THREE.SphereGeometry(.04,14,10),new THREE.MeshStandardMaterial({color:0xff7794,roughness:.4}));
  tongue.position.set(0,-.22,faceZ+.04);tongue.scale.set(1,.2,.35);tongue.visible=false;group.add(tongue);
  const cheeks=[];
  for(const x of [-Math.min(.31,glyphWidth*.36),Math.min(.31,glyphWidth*.36)]){
    const cheek=new THREE.Mesh(new THREE.SphereGeometry(.068,16,12),pink);cheek.position.set(x,-.12,faceZ-.005);cheek.scale.set(1,.58,.34);group.add(cheek);cheeks.push(cheek);
  }
  const armMat=new THREE.MeshStandardMaterial({color:new THREE.Color(color),roughness:.38});
  const armReach=Math.max(.38,glyphWidth*.5);
  const leftArm=makeLimb(armMat,-armReach-.08,-.18,.02,.72);leftArm.name="leftArm";group.add(leftArm);
  const rightArm=makeLimb(armMat,armReach+.08,-.18,.02,-.72);rightArm.name="rightArm";group.add(rightArm);
  const footMat=new THREE.MeshStandardMaterial({color:0xffd36e,roughness:.45}),feet=[];
  for(const x of [-Math.min(.22,glyphWidth*.22),Math.min(.22,glyphWidth*.22)]){
    const foot=new THREE.Mesh(new THREE.SphereGeometry(.12,18,14),footMat);foot.position.set(x,-glyphHeight*.5-.075,.12);foot.scale.set(1.25,.65,1);group.add(foot);feet.push(foot);
  }
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(Math.max(.42,glyphWidth*.43),32),new THREE.MeshBasicMaterial({color:0x829baf,transparent:true,opacity:.16}));
  shadow.rotation.x=-Math.PI/2;shadow.position.set(0,-glyphHeight*.5-.16,0);group.add(shadow);
  group.scale.setScalar(.88);
  group.position.set((index-(total-1)/2)*1.42,.72,1.85);
  group.userData={letter,home:group.position.clone(),used:false,phase:index*.7,emotion:"happy",baseScale:.88,body,eyeParts,pupils,mouth,tongue,cheeks,leftArm,rightArm,feet,shadow,blinkAt:1.8+Math.random()*2.5,blink:0,reactUntil:0,glyphWidth,glyphHeight,dragTilt:0};
  scene.add(group);
  return group;
}
function setEmotion(character,emotion,duration=1.1){
  if(!character)return;character.userData.emotion=emotion;character.userData.reactUntil=performance.now()*.001+duration;
  const d=character.userData; if(d.tongue)d.tongue.visible=emotion==="happy"||emotion==="excited";
  if(d.mouth){d.mouth.scale.y=emotion==="surprised"?2.2:emotion==="sad"?.72:1;d.mouth.scale.x=emotion==="surprised"?.72:1;}
  if(d.cheeks)d.cheeks.forEach(c=>c.material.opacity=emotion==="happy"||emotion==="excited"?1:.55);
}
function burstAt(position,color=0xffd76b,count=12){
  const group=new THREE.Group();group.position.copy(position);scene.add(group);
  const material=new THREE.MeshBasicMaterial({color,transparent:true});
  for(let i=0;i<count;i++){
    const particle=new THREE.Mesh(new THREE.SphereGeometry(.035+Math.random()*.025,8,6),material);
    const a=Math.random()*Math.PI*2,r=.2+Math.random()*.45;
    particle.position.set(Math.cos(a)*r,Math.random()*.55,Math.sin(a)*r);particle.userData={velocity:new THREE.Vector3(Math.cos(a)*(.4+Math.random()*.6),.7+Math.random()*.8,Math.sin(a)*(.4+Math.random()*.6))};group.add(particle);
  }
  group.userData={born:performance.now()*.001,life:.8};effects.push(group);
}
const effects=[];

function makeGhostLetterTexture(letter){
  const canvas=document.createElement("canvas");canvas.width=256;canvas.height=256;
  const c=canvas.getContext("2d");c.clearRect(0,0,256,256);
  c.font="1000 190px Nunito,Arial";c.textAlign="center";c.textBaseline="middle";
  c.fillStyle="rgba(105,87,217,0.24)";c.fillText(letter,128,132);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
function makeSlot(index,total,letter){
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(.83,.88,.22),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.58,roughness:.8}));
  mesh.position.set((index-(total-1)/2)*.96,.22,-.45);
  mesh.userData={slotIndex:index,expectedLetter:letter};scene.add(mesh);slotMeshes.push(mesh);
  const outline=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color:0x9589dc}));mesh.add(outline);
  const ghost=new THREE.Mesh(new THREE.PlaneGeometry(.70,.72),new THREE.MeshBasicMaterial({map:makeGhostLetterTexture(letter),transparent:true,depthWrite:false}));
  ghost.position.set(0,0,.116);ghost.name="ghost-letter";mesh.add(ghost);
}
function disposeBoard(){
  for(const obj of [...tiles,...slotMeshes]){scene.remove(obj);obj.traverse?.(child=>{child.geometry?.dispose();if(Array.isArray(child.material))child.material.forEach(m=>m.dispose());else child.material?.dispose();});}
  tiles=[];slotMeshes=[];
}
function initThree(){
  scene=new THREE.Scene();scene.background=new THREE.Color("#eaf5ff");
  camera=new THREE.PerspectiveCamera(35,1,.1,100);camera.position.set(0,5.4,10.5);camera.lookAt(0,0,0);
  renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,powerPreference:"low-power"});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.5));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.12;
  renderer.domElement.setAttribute("aria-label","Kéo nhân vật chữ cái đến ô trống");sceneEl.appendChild(renderer.domElement);
  scene.add(new THREE.HemisphereLight(0xffffff,0x9bc6bb,2.0));
  const keyLight=new THREE.DirectionalLight(0xffffff,2.1);keyLight.position.set(-3,8,5);keyLight.castShadow=true;keyLight.shadow.mapSize.set(512,512);scene.add(keyLight);
  const fill=new THREE.PointLight(0xb9b0ff,.65,15);fill.position.set(4,3,2);scene.add(fill);
  const floor=new THREE.Mesh(new THREE.CircleGeometry(8,48),new THREE.MeshStandardMaterial({color:0xd9f3e8,roughness:1}));floor.rotation.x=-Math.PI/2;floor.position.y=-.72;floor.receiveShadow=true;scene.add(floor);
  const platform=new THREE.Mesh(new THREE.CylinderGeometry(4.5,4.8,.25,48),new THREE.MeshStandardMaterial({color:0xc9e8f8,roughness:.85}));platform.position.y=-.56;platform.receiveShadow=true;scene.add(platform);
  // Small floating decorative orbs, kept lightweight for mobile GPUs.
  for(let i=0;i<9;i++){const orb=new THREE.Mesh(new THREE.SphereGeometry(.055+(i%3)*.02,10,8),new THREE.MeshStandardMaterial({color:[0xffd878,0xb8a9ff,0x8ee4c5][i%3],roughness:.6}));const a=i/9*Math.PI*2;orb.position.set(Math.cos(a)*3.6,.2+Math.sin(i*2)*.3,Math.sin(a)*1.4-.2);scene.add(orb);}
  raycaster=new THREE.Raycaster();pointer=new THREE.Vector2();dragPlane=new THREE.Plane(new THREE.Vector3(0,1,0),-.2);
  resize();window.addEventListener("resize",resize);
  renderer.domElement.addEventListener("pointerdown",onPointerDown);
  renderer.domElement.addEventListener("pointermove",onPointerMove);
  renderer.domElement.addEventListener("pointerup",onPointerUp);
  renderer.domElement.addEventListener("pointercancel",onPointerUp);
  animate();
}
function resize(){
  if(!renderer)return;const w=Math.max(1,sceneEl.clientWidth),h=Math.max(1,sceneEl.clientHeight);
  camera.aspect=w/h;
  // Wider camera framing on narrow screens so every draggable character remains visible.
  camera.fov=w<480?42:35;camera.position.set(0,w<480?6.0:5.4,w<480?12.5:10.5);camera.lookAt(0,0,0);camera.updateProjectionMatrix();
  renderer.setSize(w,h,false);
}
function renderBoard(){
  disposeBoard();const w=word();state.placed=Array(w.en.length).fill(null);state.assignment={};state.solved=false;state.celebrated=false;
  for(let i=0;i<w.en.length;i++)makeSlot(i,w.en.length,w.en[i]);
  const order=shuffle(w.en.split(""));
  order.forEach((letter,i)=>tiles.push(createCharacter(letter,i,order.length)));
  renderUI();
}
function renderUI(){
  const w=word();
  $("level-label").textContent=(state.language==="vi"?"THỬ THÁCH ":"CHALLENGE ")+(state.index+1);
  $("task-title").textContent=state.language==="vi"?"Ghép từ tiếng Anh":"Spell the English word";
  $("word-meaning").textContent=state.language==="vi"?w.vi:w.en;$("word-pronunciation").textContent=w.en;$("picture-emoji").textContent=w.emoji;
  $("progress-label").textContent=`${state.index+1} / ${WORDS.length}`;$("progress-bar").style.width=`${(state.index+1)/WORDS.length*100}%`;
  $("star-count").textContent=state.stars;
  $("slots").innerHTML="";
  state.placed.forEach((letter,i)=>{const b=document.createElement("button");b.type="button";b.className="slot"+(letter?" filled":"")+(state.solved?" correct":"");b.dataset.slotIndex=String(i);b.textContent=letter||w.en[i];b.classList.toggle("placeholder",!letter);b.setAttribute("aria-label",`Ô chữ ${i+1}: ${letter||"chữ "+w.en[i]}`);b.addEventListener("click",()=>removeLetter(i));$("slots").appendChild(b);});
  $("letter-bank").innerHTML="";
  tiles.forEach((tile,i)=>{
    const b=document.createElement("button");b.type="button";
    b.className="letter-tile"+(tile.userData.used?" used":"");
    b.disabled=tile.userData.used;b.dataset.tileIndex=String(i);
    // Animated mini letter-creature in the bank. The matching Three.js character
    // above remains the real object that follows the pointer during dragging.
    b.innerHTML=`<span class="bank-creature" aria-hidden="true">
      <span class="bank-arm bank-arm-left"></span><span class="bank-arm bank-arm-right"></span>
      <span class="bank-glyph">${tile.userData.letter}</span>
      <span class="bank-face"><i class="bank-eye"></i><i class="bank-eye"></i><i class="bank-mouth"></i></span>
      <span class="bank-foot bank-foot-left"></span><span class="bank-foot bank-foot-right"></span>
    </span>`;
    b.setAttribute("aria-label",`Kéo nhân vật chữ ${tile.userData.letter} vào ô chữ giống nó`);
    b.addEventListener("pointerdown",(e)=>startBankDrag(e,i));
    $("letter-bank").appendChild(b);
  });
  $("next-button").disabled=!state.solved;
  $("feedback").textContent=state.language==="vi"?"Hãy kéo mỗi chữ vào ô có chữ mờ giống nó nhé!":"Drag each letter onto its matching faint guide!";$("feedback").className="feedback";
  $("scene-hint").textContent=state.language==="vi"?"Chạm hoặc kéo các nhân vật chữ cái vào ô trống":"Tap or drag the letter friends into the slots";
  $("answer-instruction").textContent=state.language==="vi"?"Kéo các bạn chữ cái vào đúng vị trí:":"Drag the letter friends into the right places:";
  $("listen-label").textContent=state.language==="vi"?"Nghe phát âm":"Listen";
  $("encourage-title").textContent=state.language==="vi"?"Mỗi ngày một chút":"A little every day";
  $("encourage-copy").textContent=state.language==="vi"?"Con đang tiến bộ qua từng lần thử!":"You learn something with every try!";
  $("headline").textContent=state.language==="vi"?"Cùng khám phá thế giới chữ cái!":"Explore the world of letters!";
  $("subheadline").textContent=state.language==="vi"?"Gặp gỡ những người bạn chữ cái và cùng ghép từ nhé.":"Meet the letter friends and spell a word together.";
  $("eyebrow").textContent=state.language==="vi"?"HỌC MÀ CHƠI – CHƠI MÀ HỌC":"LEARN THROUGH PLAY";
  $("hint-button").textContent=state.language==="vi"?"💡 Gợi ý":"💡 Hint";
  $("next-button").textContent=state.language==="vi"?"Tiếp theo →":"Next →";
  $("reset-button").textContent=state.language==="vi"?"↻ Chơi lại từ đầu":"↻ Start again";
  $("celebration-title").textContent=state.language==="vi"?"Tuyệt vời!":"Amazing!";
  $("celebration-copy").textContent=state.language==="vi"?"Con đã ghép đúng từ này.":"You spelled the word correctly.";
  $("celebration-continue").textContent=state.language==="vi"?"Chơi tiếp →":"Continue →";
  $("connection-status").textContent=navigator.onLine?(state.language==="vi"?"● Trực tuyến":"● Online"):(state.language==="vi"?"● Ngoại tuyến":"● Offline");
  $("connection-status").classList.toggle("offline",!navigator.onLine);
}
function usedBankIndices(){return new Set(Object.values(state.assignment));}
function showTryAgain(){
  tiles.filter(t=>!t.userData.used).forEach(t=>setEmotion(t,"surprised",.8));
  $("feedback").textContent=state.language==="vi"?"Chưa đúng vị trí rồi! Con nhìn chữ mờ để tìm ô phù hợp nhé.":"Not quite! Match the letter to its faint guide.";
  $("feedback").className="feedback try";
  say(state.language==="vi"?"Thử lại nhé":"Try again");
}
function placeTileInNextSlot(tileIndex){
  if(state.solved)return;const slotIndex=state.placed.findIndex(v=>v===null);if(slotIndex<0)return;
  placeTileInSlot(tileIndex,slotIndex);
}
function placeTileInSlot(tileIndex,slotIndex){
  if(state.solved||slotIndex<0||state.placed[slotIndex]!==null)return;
  const tile=tiles[tileIndex];if(!tile||tile.userData.used)return;
  if(tile.userData.letter!==word().en[slotIndex]){showTryAgain();return;}
  state.placed[slotIndex]=tile.userData.letter;state.assignment[slotIndex]=tileIndex;tile.userData.used=true;setEmotion(tile,"excited",1.5);
  snapCharacterToSlot(tile,slotIndex);burstAt(tile.position,0x8fe3bd,10);updateAfterPlacement();
}
function startBankDrag(e,tileIndex){
  if(state.solved||tiles[tileIndex]?.userData.used)return;
  e.preventDefault();
  const source=e.currentTarget;
  bankDrag={pointerId:e.pointerId,tileIndex,source};
  source.classList.add("drag-source");
  source.setPointerCapture?.(e.pointerId);
  dragging=tiles[tileIndex];
  setRay(e);
  const startPoint=new THREE.Vector3();if(raycaster.ray.intersectPlane(dragPlane,startPoint))dragOffset.copy(dragging.position).sub(startPoint);
  setEmotion(dragging,"surprised",2.5);
  dragging.scale.setScalar(dragging.userData.baseScale*1.16);
  dragging.userData.dragTilt=0;
  moveBankDrag(e);
}
function moveBankDrag(e){
  if(!bankDrag||e.pointerId!==bankDrag.pointerId||!dragging)return;
  setRay(e);
  const p=new THREE.Vector3();
  if(raycaster.ray.intersectPlane(dragPlane,p)){
    const oldX=dragging.position.x;
    dragging.position.set(p.x+dragOffset.x,.55,p.z+dragOffset.z);
    dragging.userData.dragTilt=THREE.MathUtils.clamp((dragging.position.x-oldX)*-2.8,-.42,.42);
  }
}
function endBankDrag(e){
  if(!bankDrag||e.pointerId!==bankDrag.pointerId)return;
  const drag=bankDrag;bankDrag=null;drag.source.classList.remove("drag-source");
  const target=document.elementFromPoint(e.clientX,e.clientY)?.closest(".slot");
  const tile=tiles[drag.tileIndex];
  dragging=null;
  if(target){
    const slotIndex=Number(target.dataset.slotIndex);
    if(state.placed[slotIndex]===null&&tile.userData.letter===word().en[slotIndex]){
      placeTileInSlot(drag.tileIndex,slotIndex);
      return;
    }
    showTryAgain();
  }
  tile.position.copy(tile.userData.home);
  tile.rotation.set(0,0,0);
  tile.scale.setScalar(tile.userData.baseScale);
  tile.userData.dragTilt=0;
  setEmotion(tile,"happy",.8);
}
function snapCharacterToSlot(tile,slotIndex){
  const target=slotMeshes[slotIndex].position;tile.position.set(target.x,.28,target.z+.12);
  tile.scale.setScalar(.62);
  tile.rotation.set(0,0,0);
  tile.userData.used=true;tile.userData.targetY=.28;
}
function updateAfterPlacement(){
  renderUI();
  if(state.placed.every(v=>v!==null)){
    if(state.placed.join("")===word().en){success();}
    else{$("feedback").textContent=state.language==="vi"?"Gần đúng rồi! Con thử đổi vị trí các chữ nhé.":"Almost! Try changing the letters."; $("feedback").className="feedback try";say(state.language==="vi"?"Thử lại nhé":"Try again");}
  }
}
function removeLetter(slotIndex){
  if(state.solved||state.placed[slotIndex]===null)return;
  const tileIndex=state.assignment[slotIndex];if(tiles[tileIndex]){tiles[tileIndex].userData.used=false;tiles[tileIndex].position.copy(tiles[tileIndex].userData.home);tiles[tileIndex].scale.setScalar(tiles[tileIndex].userData.baseScale);}
  state.placed[slotIndex]=null;delete state.assignment[slotIndex];renderUI();
}
function success(){
  state.solved=true;state.stars++;saveProgress();
  $("feedback").textContent=state.language==="vi"?"Chính xác! Con làm rất tốt!":"Correct! Well done!";$("feedback").className="feedback good";
  $("next-button").disabled=false;document.querySelectorAll(".slot").forEach(el=>el.classList.add("correct"));
  tiles.forEach(t=>setEmotion(t,"excited",2.2));burstAt(new THREE.Vector3(0,.7,0),0xffd76b,28);say(word().en,"en");
  setTimeout(()=>{$("celebration").classList.remove("hidden");},400);
}
function hint(){
  if(state.solved)return;const i=state.placed.findIndex(v=>v===null);if(i<0)return;
  const expected=word().en[i];const already=usedBankIndices();
  const tileIndex=tiles.findIndex((t,j)=>!already.has(j)&&t.userData.letter===expected);
  if(tileIndex>=0)placeTileInNextSlot(tileIndex);
}
function nextWord(){
  $("celebration").classList.add("hidden");
  if(state.index<WORDS.length-1){state.index++;renderBoard();}
  else{
    $("celebration-title").textContent=state.language==="vi"?"Con đã hoàn thành!":"You did it!";
    $("celebration-copy").textContent=state.language==="vi"?"Con đã khám phá hết các thử thách.":"You completed all the challenges.";
    $("celebration-continue").textContent=state.language==="vi"?"Chơi lại":"Play again";
    $("celebration").classList.remove("hidden");
    $("celebration-continue").onclick=()=>{state.index=0;$("celebration").classList.add("hidden");renderBoard();};
  }
}
function saveProgress(){try{localStorage.setItem("abc-adventure-progress-v2",JSON.stringify({stars:state.stars,index:state.index}));}catch(e){}}
function loadProgress(){try{const p=JSON.parse(localStorage.getItem("abc-adventure-progress-v2")||"{}");state.stars=Number(p.stars)||0;}catch(e){}}

function setRay(event){
  const rect=renderer.domElement.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;raycaster.setFromCamera(pointer,camera);
}
function onPointerDown(e){
  if(state.solved)return;setRay(e);
  const hits=raycaster.intersectObjects(tiles.filter(t=>!t.userData.used),true);
  if(!hits.length)return;
  let root=hits[0].object;while(root.parent&&root.parent!==scene)root=root.parent;
  if(!tiles.includes(root))return;
  dragging=root;renderer.domElement.setPointerCapture?.(e.pointerId);
  const p=new THREE.Vector3();raycaster.ray.intersectPlane(dragPlane,p);dragOffset.copy(dragging.position).sub(p);setEmotion(dragging,"surprised",1);dragging.scale.setScalar(dragging.userData.baseScale*1.08);
}
function onPointerMove(e){
  if(!dragging)return;setRay(e);const p=new THREE.Vector3();if(raycaster.ray.intersectPlane(dragPlane,p)){dragging.position.x=p.x+dragOffset.x;dragging.position.z=p.z+dragOffset.z;dragging.position.y=.4;}
}
function onPointerUp(e){
  if(!dragging)return;setRay(e);const tile=dragging;dragging=null;
  const hits=raycaster.intersectObjects(slotMeshes,false);
  if(hits.length){const i=hits[0].object.userData.slotIndex;if(state.placed[i]===null){
    if(tile.userData.letter===word().en[i]){
      const tileIndex=tiles.indexOf(tile);state.placed[i]=tile.userData.letter;state.assignment[i]=tileIndex;tile.userData.used=true;setEmotion(tile,"excited",1.5);tile.scale.setScalar(tile.userData.baseScale);snapCharacterToSlot(tile,i);burstAt(tile.position,0x8fe3bd,10);updateAfterPlacement();return;
    } else {showTryAgain();}
  }}
  tile.position.copy(tile.userData.home);tile.scale.setScalar(tile.userData.baseScale);setEmotion(tile,"happy",.8);
}
function animate(){
  requestAnimationFrame(animate);const t=performance.now()*.001;
  tiles.forEach((g,i)=>{
    const d=g.userData;
    if(g===dragging){
      const dt=performance.now()*.001;
      g.rotation.z=d.dragTilt+Math.sin(dt*15+d.phase)*.075;
      if(d.body){const pulse=1+Math.sin(dt*18+d.phase)*.045;d.body.scale.set(1/pulse,pulse,1);}
      if(d.leftArm&&d.rightArm){const wave=Math.sin(dt*17+d.phase)*1.05;d.leftArm.rotation.z=.65+wave;d.rightArm.rotation.z=-.65-wave;}
      if(d.feet)d.feet.forEach((foot,j)=>foot.rotation.z=Math.sin(dt*18+d.phase+j)*.28);
      if(d.pupils)d.pupils.forEach((p,j)=>{p.position.x=.018+Math.sin(dt*5+j)*.025;p.position.y=-.006+Math.cos(dt*6+j)*.018;});
      return;
    }
    const excited=d.emotion==="excited"&&t<d.reactUntil;
    if(!d.used){
      const bob=Math.sin(t*2.25+d.phase)*.085;
      g.position.y=.72+bob+(excited?Math.abs(Math.sin(t*13+d.phase))*.16:0);
      g.rotation.z=Math.sin(t*1.35+d.phase)*.065+(excited?Math.sin(t*12+d.phase)*.12:0);
    }else if(state.solved){g.rotation.z=Math.sin(t*5+d.phase)*.09;g.position.y=.35+Math.abs(Math.sin(t*5+d.phase))*.10;}
    else if(excited){g.rotation.z=Math.sin(t*10+d.phase)*.12;g.position.y=.35+Math.abs(Math.sin(t*11+d.phase))*.10;}
    // Gentle squash-and-stretch gives the idle bounce a soft, toy-like feel.
    if(d.body){const squash=1+Math.sin(t*4+d.phase)*.018+(excited?Math.abs(Math.sin(t*12+d.phase))*.07:0);d.body.scale.set(1/squash,squash,1);}
    if(d.leftArm&&d.rightArm){
      const wave=excited?Math.sin(t*13+d.phase)*.8:Math.sin(t*2.4+d.phase)*.28;
      d.leftArm.rotation.z=.65+wave;d.rightArm.rotation.z=-.65-wave;
    }
    if(d.feet) d.feet.forEach((foot,j)=>{foot.rotation.z=excited?Math.sin(t*12+d.phase+j)*.25:Math.sin(t*2+d.phase+j)*.035;});
    // Automatic blinks and tiny eye movements keep characters from looking frozen.
    if(d.blinkAt<t&&!d.blink){d.blink=.14;d.blinkAt=t+2.2+Math.random()*3;}
    if(d.blink>0){d.blink=Math.max(0,d.blink-.018);const sy=Math.max(.08,1-d.blink*6.5);d.eyeParts?.forEach(e=>e.scale.y=sy);}
    else d.eyeParts?.forEach(e=>e.scale.y=1);
    d.pupils?.forEach((p,j)=>{p.position.x=.018+Math.sin(t*.8+d.phase)*.012;p.position.y=-.006+Math.sin(t*1.1+d.phase+j*.4)*.008;});
    if(d.shadow){const k=1-Math.max(0,g.position.y-.72)*.45;d.shadow.scale.setScalar(k);}
    if(d.emotion!=="happy"&&t>d.reactUntil){d.emotion="happy";if(d.mouth){d.mouth.scale.set(1,1,1);}if(d.tongue)d.tongue.visible=true;if(d.cheeks)d.cheeks.forEach(c=>c.material.opacity=1);}
  });
  for(let i=effects.length-1;i>=0;i--){const fx=effects[i],age=t-fx.userData.born;fx.children.forEach(p=>{p.position.addScaledVector(p.userData.velocity,.016);p.userData.velocity.y-=.025;p.scale.multiplyScalar(.985);});fx.children.forEach(p=>p.material.opacity=Math.max(0,1-age/fx.userData.life));if(age>fx.userData.life){scene.remove(fx);fx.traverse(o=>{o.geometry?.dispose();});effects.splice(i,1);}}
  renderer.render(scene,camera);
}

$("listen-button").addEventListener("click",()=>say(state.language==="vi"?word().vi:word().en,state.language));
$("hint-button").addEventListener("click",hint);
$("next-button").addEventListener("click",nextWord);
$("celebration-continue").addEventListener("click",nextWord);
$("reset-button").addEventListener("click",()=>{state.index=0;state.stars=0;saveProgress();$("celebration").classList.add("hidden");renderBoard();});
$("language-toggle").addEventListener("click",()=>{state.language=state.language==="vi"?"en":"vi";renderUI();});
window.addEventListener("online",renderUI);window.addEventListener("offline",renderUI);
document.addEventListener("pointermove",moveBankDrag);
document.addEventListener("pointerup",endBankDrag);
document.addEventListener("pointercancel",endBankDrag);

loadProgress();
initThree();
// Load a real extruded typeface so each letter is the character's silhouette.
// If offline, the cached font is used; otherwise the built-in rounded fallback remains available.
const fontLoader=new FontLoader();
fontLoader.load(
  "https://threejs.org/examples/fonts/helvetiker_bold.typeface.json",
  font=>{letterFont=font;renderBoard();},
  undefined,
  ()=>{console.warn("3D typeface unavailable; using local fallback geometry.");renderBoard();}
);
