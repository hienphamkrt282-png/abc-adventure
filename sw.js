const CACHE_NAME="abc-adventure-v06-100-lessons-large-targets";
const CORE=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./register-sw.js","./assets/icon.svg"];
const THREE_URL="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
const FONT_LOADER_URL="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/loaders/FontLoader.js";
const TEXT_GEOMETRY_URL="https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/geometries/TextGeometry.js";
const FONT_URL="https://threejs.org/examples/fonts/helvetiker_bold.typeface.json";
self.addEventListener("install",event=>event.waitUntil((async()=>{
  const cache=await caches.open(CACHE_NAME);
  await Promise.all(CORE.map(async path=>{try{await cache.add(path)}catch(e){console.warn("Cache skipped:",path)}}));
  for(const url of [THREE_URL,FONT_LOADER_URL,TEXT_GEOMETRY_URL,FONT_URL]){
    try{await cache.add(url)}catch(e){console.warn("External asset cache skipped:",url)}
  }
  await self.skipWaiting();
})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{
  const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE_NAME).map(k=>caches.delete(k)));await self.clients.claim();
})()));
self.addEventListener("fetch",event=>{
  const req=event.request;if(req.method!=="GET")return;
  event.respondWith((async()=>{
    const cached=await caches.match(req);if(cached)return cached;
    try{
      const response=await fetch(req);
      if(response.ok&&(new URL(req.url).origin===self.location.origin||[THREE_URL,FONT_LOADER_URL,TEXT_GEOMETRY_URL,FONT_URL].includes(req.url))){
        const cache=await caches.open(CACHE_NAME);cache.put(req,response.clone());
      }
      return response;
    }catch(err){
      if(req.mode==="navigate")return (await caches.match("./index.html"))||Response.error();
      return Response.error();
    }
  })());
});
