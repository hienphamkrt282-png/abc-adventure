import * as THREE from "three";
import { FontLoader } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";

let letterFont = null;

const WORDS = [
  {en:"CAT",vi:"Con mèo",emoji:"🐱",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"DOG",vi:"Con chó",emoji:"🐶",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"SUN",vi:"Mặt trời",emoji:"☀️",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BUS",vi:"Xe buýt",emoji:"🚌",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"PEN",vi:"Cây bút",emoji:"🖊️",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"CUP",vi:"Cái cốc",emoji:"🥤",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"HAT",vi:"Cái mũ",emoji:"🧢",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BED",vi:"Cái giường",emoji:"🛏️",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BAG",vi:"Cái túi",emoji:"🎒",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"MAP",vi:"Bản đồ",emoji:"🗺️",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"PIG",vi:"Con heo",emoji:"🐷",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"FOX",vi:"Con cáo",emoji:"🦊",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"ANT",vi:"Con kiến",emoji:"🐜",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"EGG",vi:"Quả trứng",emoji:"🥚",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BOX",vi:"Cái hộp",emoji:"📦",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"KEY",vi:"Chìa khóa",emoji:"🔑",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"FAN",vi:"Quạt",emoji:"🪭",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BAT",vi:"Con dơi",emoji:"🦇",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"CAR",vi:"Ô tô",emoji:"🚗",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"TOY",vi:"Đồ chơi",emoji:"🧸",categoryVi:"Làm quen quanh em",categoryEn:"Around Me"},
  {en:"BIRD",vi:"Con chim",emoji:"🐦",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"FISH",vi:"Con cá",emoji:"🐟",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"DUCK",vi:"Con vịt",emoji:"🦆",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"FROG",vi:"Con ếch",emoji:"🐸",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"LION",vi:"Sư tử",emoji:"🦁",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"BEAR",vi:"Con gấu",emoji:"🐻",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"DEER",vi:"Con nai",emoji:"🦌",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"GOAT",vi:"Con dê",emoji:"🐐",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"SHEEP",vi:"Con cừu",emoji:"🐑",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"HORSE",vi:"Con ngựa",emoji:"🐴",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"MOUSE",vi:"Con chuột",emoji:"🐭",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"TIGER",vi:"Con hổ",emoji:"🐯",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"ZEBRA",vi:"Ngựa vằn",emoji:"🦓",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"PANDA",vi:"Gấu trúc",emoji:"🐼",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"MONKEY",vi:"Con khỉ",emoji:"🐵",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"RABBIT",vi:"Con thỏ",emoji:"🐰",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"TURTLE",vi:"Rùa",emoji:"🐢",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"CAMEL",vi:"Lạc đà",emoji:"🐫",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"SNAKE",vi:"Con rắn",emoji:"🐍",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"WHALE",vi:"Cá voi",emoji:"🐳",categoryVi:"Thế giới động vật",categoryEn:"Animal World"},
  {en:"BOOK",vi:"Quyển sách",emoji:"📘",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"DESK",vi:"Bàn học",emoji:"🪑",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"CHAIR",vi:"Cái ghế",emoji:"🪑",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"TABLE",vi:"Cái bàn",emoji:"🛋️",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"CLOCK",vi:"Đồng hồ",emoji:"🕒",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"PHONE",vi:"Điện thoại",emoji:"📱",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"TRAIN",vi:"Tàu hỏa",emoji:"🚆",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"PLANE",vi:"Máy bay",emoji:"✈️",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"TRUCK",vi:"Xe tải",emoji:"🚚",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"BIKE",vi:"Xe đạp",emoji:"🚲",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"BOAT",vi:"Thuyền",emoji:"⛵",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"DOOR",vi:"Cánh cửa",emoji:"🚪",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"LAMP",vi:"Đèn bàn",emoji:"💡",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"SOCK",vi:"Tất",emoji:"🧦",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"SHOE",vi:"Giày",emoji:"👟",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"BALL",vi:"Quả bóng",emoji:"⚽",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"DOLL",vi:"Búp bê",emoji:"🪆",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"BRUSH",vi:"Bàn chải",emoji:"🪥",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"CRAYON",vi:"Bút sáp màu",emoji:"🖍️",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"WINDOW",vi:"Cửa sổ",emoji:"🪟",categoryVi:"Đồ vật và phương tiện",categoryEn:"Things & Transport"},
  {en:"APPLE",vi:"Quả táo",emoji:"🍎",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"BREAD",vi:"Bánh mì",emoji:"🍞",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"CAKE",vi:"Bánh ngọt",emoji:"🍰",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"MILK",vi:"Sữa",emoji:"🥛",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"RICE",vi:"Cơm/gạo",emoji:"🍚",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"JUICE",vi:"Nước ép",emoji:"🧃",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"GRAPE",vi:"Quả nho",emoji:"🍇",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"LEMON",vi:"Quả chanh",emoji:"🍋",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"MANGO",vi:"Quả xoài",emoji:"🥭",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"PEACH",vi:"Quả đào",emoji:"🍑",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"WATER",vi:"Nước",emoji:"💧",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"CLOUD",vi:"Đám mây",emoji:"☁️",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"RAIN",vi:"Mưa",emoji:"🌧️",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"WIND",vi:"Gió",emoji:"💨",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"TREE",vi:"Cây",emoji:"🌳",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"FLOWER",vi:"Bông hoa",emoji:"🌸",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"GRASS",vi:"Cỏ",emoji:"🌱",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"STONE",vi:"Hòn đá",emoji:"🪨",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"RIVER",vi:"Dòng sông",emoji:"🏞️",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"OCEAN",vi:"Đại dương",emoji:"🌊",categoryVi:"Thiên nhiên và thức ăn",categoryEn:"Nature & Food"},
  {en:"HAPPY",vi:"Vui vẻ",emoji:"😊",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"SMILE",vi:"Nụ cười",emoji:"😁",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"LAUGH",vi:"Cười lớn",emoji:"😂",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"DANCE",vi:"Nhảy múa",emoji:"💃",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"SING",vi:"Hát",emoji:"🎤",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"JUMP",vi:"Nhảy",emoji:"🤸",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"RUN",vi:"Chạy",emoji:"🏃",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"WALK",vi:"Đi bộ",emoji:"🚶",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"HAND",vi:"Bàn tay",emoji:"✋",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"FOOT",vi:"Bàn chân",emoji:"🦶",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"HEAD",vi:"Đầu",emoji:"🙂",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"EYES",vi:"Đôi mắt",emoji:"👀",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"NOSE",vi:"Cái mũi",emoji:"👃",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"MOUTH",vi:"Miệng",emoji:"👄",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"HEART",vi:"Trái tim",emoji:"❤️",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"FAMILY",vi:"Gia đình",emoji:"👨‍👩‍👧",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"FRIEND",vi:"Bạn bè",emoji:"🧑‍🤝‍🧑",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"SCHOOL",vi:"Trường học",emoji:"🏫",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"GARDEN",vi:"Khu vườn",emoji:"🪴",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"},
  {en:"PICNIC",vi:"Dã ngoại",emoji:"🧺",categoryVi:"Cơ thể và hoạt động",categoryEn:"Body & Actions"}
];
const EXAMPLE_SENTENCES = {"CAT": "I see a cat.", "DOG": "The dog can run.", "SUN": "The sun is bright.", "BUS": "I ride the bus.", "PEN": "I write with a pen.", "CUP": "This is my cup.", "HAT": "I wear a hat.", "BED": "I sleep in my bed.", "BAG": "My bag is blue.", "MAP": "Look at the map.", "PIG": "The pig is pink.", "FOX": "The fox is clever.", "ANT": "A tiny ant is here.", "EGG": "I eat an egg.", "BOX": "The toy is in the box.", "KEY": "I have a key.", "FAN": "The fan is spinning.", "BAT": "A bat flies at night.", "CAR": "The car is red.", "TOY": "This is my toy.", "BIRD": "The bird can fly.", "FISH": "The fish can swim.", "DUCK": "The duck says quack.", "FROG": "The frog can jump.", "LION": "The lion is strong.", "BEAR": "The bear is big.", "DEER": "The deer runs fast.", "GOAT": "The goat eats grass.", "SHEEP": "The sheep is soft.", "HORSE": "The horse can run.", "MOUSE": "The mouse is small.", "TIGER": "The tiger has stripes.", "ZEBRA": "The zebra has stripes.", "PANDA": "The panda eats bamboo.", "MONKEY": "The monkey can climb.", "RABBIT": "The rabbit can hop.", "TURTLE": "The turtle walks slowly.", "CAMEL": "The camel lives in the desert.", "SNAKE": "The snake is long.", "WHALE": "The whale is huge.", "BOOK": "I read a book.", "DESK": "My book is on the desk.", "CHAIR": "Please sit on the chair.", "TABLE": "The cup is on the table.", "CLOCK": "The clock tells time.", "PHONE": "My phone can ring.", "TRAIN": "The train is long.", "PLANE": "The plane can fly.", "TRUCK": "The truck is big.", "BIKE": "I ride my bike.", "BOAT": "The boat is on the water.", "DOOR": "Please open the door.", "LAMP": "The lamp is bright.", "SOCK": "I wear a sock.", "SHOE": "This shoe is new.", "BALL": "Kick the ball.", "DOLL": "The doll is pretty.", "BRUSH": "I brush my hair.", "CRAYON": "I draw with a crayon.", "WINDOW": "Look out of the window.", "APPLE": "I eat an apple.", "BREAD": "I like fresh bread.", "CAKE": "The cake is sweet.", "MILK": "I drink milk.", "RICE": "I eat rice.", "JUICE": "The juice is yummy.", "GRAPE": "A grape is small.", "LEMON": "The lemon is yellow.", "MANGO": "The mango is sweet.", "PEACH": "The peach is soft.", "WATER": "I drink water.", "CLOUD": "A cloud is in the sky.", "RAIN": "The rain is falling.", "WIND": "The wind is blowing.", "TREE": "The tree is tall.", "FLOWER": "The flower is beautiful.", "GRASS": "The grass is green.", "STONE": "This stone is hard.", "RIVER": "The river flows.", "OCEAN": "The ocean is blue.", "HAPPY": "I am happy today.", "SMILE": "I smile at my friend.", "LAUGH": "We laugh together.", "DANCE": "I love to dance.", "SING": "I like to sing.", "JUMP": "I can jump high.", "RUN": "I can run fast.", "WALK": "I walk to school.", "HAND": "I clap my hands.", "FOOT": "I have two feet.", "HEAD": "Touch your head.", "EYES": "I see with my eyes.", "NOSE": "I smell with my nose.", "MOUTH": "I speak with my mouth.", "HEART": "My heart beats.", "FAMILY": "I love my family.", "FRIEND": "You are my friend.", "SCHOOL": "I go to school.", "GARDEN": "Flowers grow in the garden.", "PICNIC": "We have a picnic."};
const $ = id => document.getElementById(id);
const state = {index:0,stars:0,language:"vi",placed:[],assignment:{},solved:false,celebrated:false};
let scene,camera,renderer,raycaster,pointer,tiles=[],slotMeshes=[],dragging=null,dragOffset=new THREE.Vector3(),dragPlane;
let bankDrag=null;
let bankDragGhost=null;
const sceneEl=$("scene");
const COLORS=["#ff9b91","#79c9ef","#a68af4","#f3c75f","#70d9b0","#f59ac2"];

// Original, lightweight synthesized background tune. It starts after the first
// real user gesture to respect Chrome/mobile autoplay rules; no external music file is needed.
const MUSIC_KEY="abc-adventure-music-enabled-v09";
let musicEnabled=localStorage.getItem(MUSIC_KEY)!=="off";
let musicContext=null,musicMaster=null,musicTimer=null,musicStep=0;
const MUSIC_NOTES=[523.25,659.25,783.99,659.25,587.33,698.46,783.99,698.46,523.25,587.33,659.25,587.33,493.88,587.33,659.25,523.25];
function updateMusicButton(){
  const b=$("music-toggle");if(!b)return;
  b.textContent=musicEnabled?(state.language==="vi"?"♫ Nhạc: Bật":"♫ Music: On"):(state.language==="vi"?"♫ Nhạc: Tắt":"♫ Music: Off");
  b.setAttribute("aria-pressed",String(musicEnabled));
}
function playMusicNote(freq,when,duration=.34){
  if(!musicContext||!musicMaster)return;
  const osc=musicContext.createOscillator(),gain=musicContext.createGain();
  osc.type="triangle";osc.frequency.setValueAtTime(freq,when);
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(.10,when+.045);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
  osc.connect(gain);gain.connect(musicMaster);osc.start(when);osc.stop(when+duration+.03);
}
function scheduleMusicLoop(){
  if(!musicEnabled||!musicContext)return;
  const start=musicContext.currentTime+.08;
  for(let i=0;i<MUSIC_NOTES.length;i++){
    const t=start+i*.39;playMusicNote(MUSIC_NOTES[(musicStep+i)%MUSIC_NOTES.length],t,.32);
    if(i%4===0){
      const pad=musicContext.createOscillator(),pg=musicContext.createGain();pad.type="sine";pad.frequency.setValueAtTime(MUSIC_NOTES[(musicStep+i)%MUSIC_NOTES.length]/2,t);
      pg.gain.setValueAtTime(.0001,t);pg.gain.linearRampToValueAtTime(.018,t+.12);pg.gain.exponentialRampToValueAtTime(.0001,t+1.45);pad.connect(pg);pg.connect(musicMaster);pad.start(t);pad.stop(t+1.48);
    }
  }
  musicStep=(musicStep+8)%MUSIC_NOTES.length;
  musicTimer=setTimeout(scheduleMusicLoop,MUSIC_NOTES.length*390);
}
async function startMusic(){
  if(!musicEnabled)return;
  const AudioCtx=window.AudioContext||window.webkitAudioContext;if(!AudioCtx)return;
  if(!musicContext){musicContext=new AudioCtx();musicMaster=musicContext.createGain();musicMaster.gain.value=.34;musicMaster.connect(musicContext.destination);}
  if(musicContext.state==="suspended")await musicContext.resume();
  if(!musicTimer)scheduleMusicLoop();
}
function stopMusic(){
  musicEnabled=false;localStorage.setItem(MUSIC_KEY,"off");
  if(musicTimer){clearTimeout(musicTimer);musicTimer=null;}
  if(musicMaster&&musicContext)musicMaster.gain.setTargetAtTime(.0001,musicContext.currentTime,.12);
  updateMusicButton();
}
function enableMusic(){
  musicEnabled=true;localStorage.setItem(MUSIC_KEY,"on");
  if(musicMaster&&musicContext)musicMaster.gain.setTargetAtTime(.34,musicContext.currentTime,.18);
  startMusic();updateMusicButton();
}
function toggleMusic(){musicEnabled?stopMusic():enableMusic();}

function shuffle(a){const b=[...a];for(let i=b.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]];}return b;}
function word(){return WORDS[state.index];}
function say(text,lang=state.language){
  if(!("speechSynthesis" in window))return;
  window.speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(text);u.lang=lang==="en"?"en-US":"vi-VN";u.rate=.82;u.pitch=1.06;u.onstart=duckMusicForSpeech;u.onend=restoreMusicAfterSpeech;window.speechSynthesis.speak(u);
}
let letterSpeechToken=0,letterSpeechTimer=null,activeLetterSpeech=null;
function speakLetterLoopStep(letter,token){
  if(token!==letterSpeechToken||!activeLetterSpeech||!("speechSynthesis" in window))return;
  const utterance=new SpeechSynthesisUtterance(letter);
  utterance.lang="en-US";utterance.rate=.72;utterance.pitch=1.16;
  utterance.onstart=duckMusicForSpeech;
  utterance.onend=()=>{
    if(token!==letterSpeechToken||!activeLetterSpeech)return;
    letterSpeechTimer=setTimeout(()=>speakLetterLoopStep(letter,token),110);
  };
  utterance.onerror=()=>{if(token===letterSpeechToken&&activeLetterSpeech){letterSpeechTimer=setTimeout(()=>speakLetterLoopStep(letter,token),180);}};
  window.speechSynthesis.speak(utterance);
}
function startLetterLoop(letter){
  stopLetterLoop();
  if(!("speechSynthesis" in window))return;
  activeLetterSpeech=letter;const token=++letterSpeechToken;
  window.speechSynthesis.cancel();
  speakLetterLoopStep(letter,token);
}
function stopLetterLoop(){
  letterSpeechToken++;activeLetterSpeech=null;
  if(letterSpeechTimer){clearTimeout(letterSpeechTimer);letterSpeechTimer=null;}
  if("speechSynthesis" in window)window.speechSynthesis.cancel();
  restoreMusicAfterSpeech();
}

function saySequence(parts,lang="en"){
  if(!("speechSynthesis" in window))return;
  window.speechSynthesis.cancel();
  const queue=parts.filter(Boolean);
  const speakNext=()=>{
    if(!queue.length){restoreMusicAfterSpeech();return;}
    const u=new SpeechSynthesisUtterance(queue.shift());
    u.lang=lang==="en"?"en-US":"vi-VN";u.rate=.78;u.pitch=1.08;
    u.onstart=duckMusicForSpeech;
    u.onend=()=>{restoreMusicAfterSpeech();if(queue.length)setTimeout(speakNext,220);};
    window.speechSynthesis.speak(u);
  };
  speakNext();
}
function duckMusicForSpeech(){if(musicMaster&&musicContext&&musicEnabled)musicMaster.gain.setTargetAtTime(.10,musicContext.currentTime,.08);}
function restoreMusicAfterSpeech(){if(musicMaster&&musicContext&&musicEnabled)musicMaster.gain.setTargetAtTime(.34,musicContext.currentTime,.25);}

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
  const spacing = total >= 6 ? 1.12 : total === 5 ? 1.24 : 1.42;
  const characterScale = total >= 6 ? .90 : total === 5 ? .98 : 1.04;
  group.scale.setScalar(characterScale);
  group.position.set((index-(total-1)/2)*spacing,.72,1.85);
  group.userData={letter,home:group.position.clone(),used:false,phase:index*.7,emotion:"happy",baseScale:characterScale,body,eyeParts,pupils,mouth,tongue,cheeks,leftArm,rightArm,feet,shadow,blinkAt:1.8+Math.random()*2.5,blink:0,reactUntil:0,glyphWidth,glyphHeight,dragTilt:0};
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
  c.fillStyle="rgba(105,87,217,0.34)";c.fillText(letter,128,132);
  const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;return texture;
}
function makeSlot(index,total,letter){
  const slotGap = total >= 6 ? 1.12 : total === 5 ? 1.24 : 1.42;
  const mesh=new THREE.Mesh(new THREE.BoxGeometry(1.08,1.16,.24),new THREE.MeshStandardMaterial({color:0xffffff,transparent:true,opacity:.72,roughness:.72}));
  mesh.position.set((index-(total-1)/2)*slotGap,.22,-.45);
  mesh.userData={slotIndex:index,expectedLetter:letter};scene.add(mesh);slotMeshes.push(mesh);
  const outline=new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry),new THREE.LineBasicMaterial({color:0x9589dc}));mesh.add(outline);
  const ghost=new THREE.Mesh(new THREE.PlaneGeometry(.94,1.02),new THREE.MeshBasicMaterial({map:makeGhostLetterTexture(letter),transparent:true,depthWrite:false}));
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
  camera.fov=w<480?42:35;camera.position.set(0,w<480?5.8:5.1,w<480?11.7:9.8);camera.lookAt(0,0,0);camera.updateProjectionMatrix();
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
  $("level-label").textContent=(state.language==="vi"?"BÀI ":"LESSON ")+(state.index+1)+" / "+WORDS.length+" · "+(state.language==="vi"?w.categoryVi:w.categoryEn);
  $("task-title").textContent=state.language==="vi"?"Ghép từ tiếng Anh":"Spell the English word";
  $("word-meaning").textContent=state.language==="vi"?w.vi:w.en;$("word-pronunciation").textContent=w.en;$("picture-emoji").textContent=w.emoji;
  $("progress-label").textContent=`${state.index+1} / ${WORDS.length}`;$("progress-bar").style.width=`${(state.index+1)/WORDS.length*100}%`;
  $("star-count").textContent=state.stars;
  $("slots").innerHTML="";
  state.placed.forEach((letter,i)=>{const b=document.createElement("button");b.type="button";b.className="slot"+(letter?" filled":"")+(state.solved?" correct":"");b.dataset.slotIndex=String(i);b.textContent=letter||w.en[i];b.classList.toggle("placeholder",!letter);b.setAttribute("aria-label",`Ô chữ ${i+1}: ${letter||"chữ "+w.en[i]}`);b.addEventListener("click",()=>removeLetter(i));$("slots").appendChild(b);});
  $("letter-bank").innerHTML="";
  $("slots").style.setProperty("--word-length",String(w.en.length));
  const upper=tiles.map((_,i)=>i).filter(i=>i%2===0),lower=tiles.map((_,i)=>i).filter(i=>i%2===1);
  tiles.forEach((tile,i)=>{
    const b=document.createElement("button");b.type="button";
    b.className="letter-tile"+(tile.userData.used?" used":"");
    b.disabled=tile.userData.used;b.dataset.tileIndex=String(i);
    const row=i%2===0?upper:lower,position=row.indexOf(i),x=(position+1)/(row.length+1)*100;
    b.style.left=`${x}%`;b.style.top=i%2===0?"17%":"78%";
    b.style.setProperty("--letter-tilt",`${((i*17)%13)-6}deg`);
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
  $("scene-hint").textContent=state.language==="vi"?"Kéo từng chữ cái vào đúng vị trí":"Drag each letter into its place";
  $("answer-instruction").textContent=state.language==="vi"?"Kéo các chữ cái vào đúng vị trí:":"Drag the letters into the right places:";
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
  updateMusicButton();
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
  // Repeat the letter name while the child is holding the letter; stop on release.
  startLetterLoop(tiles[tileIndex].userData.letter);
  // Keep a visible animated creature attached to the pointer. The original
  // bank item remains faintly visible as the pickup location.
  const creature=source.querySelector(".bank-creature");
  if(bankDragGhost)bankDragGhost.remove();
  bankDragGhost=document.createElement("div");
  bankDragGhost.className="letter-drag-ghost";
  bankDragGhost.setAttribute("aria-hidden","true");
  if(creature){
    const activeCreature=creature.cloneNode(true);
    activeCreature.classList.add("is-active");
    // The drag ghost is moved to document.body, outside the original tile.
    // Copy the tile's palette explicitly so CSS nth-child variables and
    // gradients remain intact while the letter follows the pointer.
    const tileStyle=getComputedStyle(source);
    ["--creature","--creature-dark","--letter-tilt"].forEach(name=>{
      const value=tileStyle.getPropertyValue(name).trim();
      if(value) activeCreature.style.setProperty(name,value);
    });
    const sourceGlyph=creature.querySelector(".bank-glyph");
    const activeGlyph=activeCreature.querySelector(".bank-glyph");
    if(sourceGlyph&&activeGlyph){
      const glyphStyle=getComputedStyle(sourceGlyph);
      activeGlyph.style.backgroundImage=glyphStyle.backgroundImage;
      activeGlyph.style.backgroundSize=glyphStyle.backgroundSize;
      activeGlyph.style.backgroundPosition=glyphStyle.backgroundPosition;
      activeGlyph.style.webkitTextFillColor=glyphStyle.webkitTextFillColor;
      activeGlyph.style.color=glyphStyle.color;
    }
    bankDragGhost.appendChild(activeCreature);
  }
  document.body.appendChild(bankDragGhost);
  bankDrag={pointerId:e.pointerId,tileIndex,source,ghost:bankDragGhost};
  source.classList.add("drag-source");
  source.setPointerCapture?.(e.pointerId);
  dragging=tiles[tileIndex];
  setRay(e);
  const startPoint=new THREE.Vector3();if(raycaster.ray.intersectPlane(dragPlane,startPoint))dragOffset.copy(dragging.position).sub(startPoint);
  setEmotion(dragging,"surprised",2.5);
  dragging.userData.talking=true;
  dragging.scale.setScalar(dragging.userData.baseScale*1.16);
  dragging.userData.dragTilt=0;
  moveBankDrag(e);
}
function moveBankDrag(e){
  if(!bankDrag||e.pointerId!==bankDrag.pointerId||!dragging)return;
  // DOM creature follows the pointer across both the 3D stage and the answer area.
  if(bankDrag.ghost){
    bankDrag.ghost.style.left=`${e.clientX}px`;
    bankDrag.ghost.style.top=`${e.clientY}px`;
  }
  document.querySelectorAll(".slot.drop-hover").forEach(el=>el.classList.remove("drop-hover"));
  const hoverTarget=document.elementFromPoint(e.clientX,e.clientY)?.closest(".slot");
  if(hoverTarget)hoverTarget.classList.add("drop-hover");
  // Move the matching WebGL character while the pointer is over the 3D stage.
  // Outside the canvas, leave it visible on the stage; the animated pointer
  // creature bridges the distance to the target slot below.
  const rect=renderer.domElement.getBoundingClientRect();
  const inside=e.clientX>=rect.left&&e.clientX<=rect.right&&e.clientY>=rect.top&&e.clientY<=rect.bottom;
  if(inside){
    setRay(e);
    const p=new THREE.Vector3();
    if(raycaster.ray.intersectPlane(dragPlane,p)){
      const oldX=dragging.position.x;
      dragging.position.set(p.x+dragOffset.x,.55,p.z+dragOffset.z);
      dragging.userData.dragTilt=THREE.MathUtils.clamp((dragging.position.x-oldX)*-2.8,-.42,.42);
    }
  }
}
function endBankDrag(e){
  if(!bankDrag||e.pointerId!==bankDrag.pointerId)return;
  stopLetterLoop();
  const drag=bankDrag;bankDrag=null;drag.source.classList.remove("drag-source");
  document.querySelectorAll(".slot.drop-hover").forEach(el=>el.classList.remove("drop-hover"));
  if(drag.ghost){drag.ghost.remove();}
  bankDragGhost=null;
  const target=document.elementFromPoint(e.clientX,e.clientY)?.closest(".slot");
  const tile=tiles[drag.tileIndex];
  if(tile)tile.userData.talking=false;
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
  tiles.forEach(t=>setEmotion(t,"excited",2.2));burstAt(new THREE.Vector3(0,.7,0),0xffd76b,28);
  const example=EXAMPLE_SENTENCES[word().en]||`This is ${word().en.toLowerCase()}.`;
  const context=`At school, my teacher shows me a picture. ${example} I say the word ${word().en.toLowerCase()} aloud and smile.`;
  // Read the completed word, then a short story that places the example sentence in context.
  saySequence([word().en,context],"en");
  $("celebration-copy").textContent=state.language==="vi"
    ?`Con ghép đúng ${word().en}!

Tình huống: Ở lớp, cô giáo cho con xem một bức tranh. ${example} Con đọc lại từ ${word().en} và mỉm cười.`
    :`You spelled ${word().en}!

At school, my teacher shows me a picture. ${example} I say the word ${word().en.toLowerCase()} aloud and smile.`;
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
  if(state.index<WORDS.length-1){
    state.index++;
    saveProgress();
    renderBoard();
  }else{
    $("celebration-title").textContent=state.language==="vi"?"Con đã hoàn thành 100 bài học!":"You completed all 100 lessons!";
    $("celebration-copy").textContent=state.language==="vi"?"Con đã khám phá tất cả 5 chủ đề. Thật tuyệt vời!":"You explored all five learning worlds. Amazing work!";
    $("celebration-continue").textContent=state.language==="vi"?"Chơi lại từ đầu":"Play again";
    $("celebration").classList.remove("hidden");
  }
}
function restartCourse(){
  state.index=0;
  saveProgress();
  $("celebration").classList.add("hidden");
  renderBoard();
}
function saveProgress(){try{localStorage.setItem("abc-adventure-progress-v3",JSON.stringify({stars:state.stars,index:state.index}));}catch(e){}}
function loadProgress(){try{const p=JSON.parse(localStorage.getItem("abc-adventure-progress-v3")||localStorage.getItem("abc-adventure-progress-v2")||"{}");state.stars=Number(p.stars)||0;state.index=Math.max(0,Math.min(WORDS.length-1,Number(p.index)||0));}catch(e){state.index=0;}}

function setRay(event){
  const rect=renderer.domElement.getBoundingClientRect();pointer.x=((event.clientX-rect.left)/rect.width)*2-1;pointer.y=-((event.clientY-rect.top)/rect.height)*2+1;raycaster.setFromCamera(pointer,camera);
}
function onPointerDown(e){
  if(state.solved)return;setRay(e);
  const hits=raycaster.intersectObjects(tiles.filter(t=>!t.userData.used),true);
  if(!hits.length)return;
  let root=hits[0].object;while(root.parent&&root.parent!==scene)root=root.parent;
  if(!tiles.includes(root))return;
  dragging=root;startLetterLoop(root.userData.letter);root.userData.talking=true;renderer.domElement.setPointerCapture?.(e.pointerId);
  const p=new THREE.Vector3();raycaster.ray.intersectPlane(dragPlane,p);dragOffset.copy(dragging.position).sub(p);setEmotion(dragging,"surprised",1);dragging.scale.setScalar(dragging.userData.baseScale*1.08);
}
function onPointerMove(e){
  if(!dragging)return;setRay(e);const p=new THREE.Vector3();if(raycaster.ray.intersectPlane(dragPlane,p)){dragging.position.x=p.x+dragOffset.x;dragging.position.z=p.z+dragOffset.z;dragging.position.y=.4;}
}
function onPointerUp(e){
  if(!dragging)return;stopLetterLoop();setRay(e);const tile=dragging;tile.userData.talking=false;dragging=null;
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
      if(d.mouth){const talk=0.55+Math.abs(Math.sin(dt*19+d.phase))*.9;d.mouth.scale.set(1,talk,1);}
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
$("music-toggle").addEventListener("click",toggleMusic);
document.addEventListener("pointerdown",()=>{if(musicEnabled)startMusic();},{once:true});
document.addEventListener("keydown",()=>{if(musicEnabled)startMusic();},{once:true});
$("hint-button").addEventListener("click",hint);
$("next-button").addEventListener("click",nextWord);
$("celebration-continue").addEventListener("click",()=>{if(state.index<WORDS.length-1)nextWord();else restartCourse();});
$("reset-button").addEventListener("click",()=>{state.index=0;state.stars=0;saveProgress();$("celebration").classList.add("hidden");renderBoard();});
$("language-toggle").addEventListener("click",()=>{state.language=state.language==="vi"?"en":"vi";renderUI();});
window.addEventListener("online",renderUI);window.addEventListener("offline",renderUI);
document.addEventListener("pointermove",moveBankDrag);
document.addEventListener("pointerup",endBankDrag);
document.addEventListener("pointercancel",endBankDrag);
window.addEventListener("blur",()=>{if(bankDrag){stopLetterLoop();if(bankDragGhost)bankDragGhost.remove();bankDragGhost=null;bankDrag.source.classList.remove("drag-source");if(dragging){dragging.userData.talking=false;dragging.position.copy(dragging.userData.home);dragging.scale.setScalar(dragging.userData.baseScale);setEmotion(dragging,"happy",.8);dragging=null;}bankDrag=null;}});

updateMusicButton();
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
