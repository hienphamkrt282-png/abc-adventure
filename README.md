# ABC Adventure World — Version 0.4

## What's new
- Friendly 3D letter characters with rounded bodies, dimensional eyes, pupils, cheeks, mouth, arms and feet.
- Idle floating/bobbing and arm movement; happy celebration motion after a correct answer.
- Mobile-first responsive layout and larger touch targets.
- Each 3D target slot displays its matching letter as a faint guide (for example, C-A-T).
- Letters can only be dropped into the matching target slot; incorrect drops return to the letter bank with feedback.
- Real pointer-based drag-and-drop from the shuffled letter bank into the matching faint target slot. Works with a mouse on PC and touch on compatible phones/tablets; tapping a bank letter alone does not place it.
- Vietnamese/English interface toggle, speech synthesis, hint, stars and local progress.
- PWA manifest and service worker cache.

## Run locally on Windows 10/11
1. Extract the ZIP.
2. Open the extracted folder in File Explorer.
3. Click the address bar, type `cmd`, press Enter.
4. Run: `python -m http.server 8000`
5. Open Chrome at `http://localhost:8000`.

Do not open `index.html` directly from File Explorer. ES modules and service workers need a local web server.

## Publish
Upload the contents of this folder (not the enclosing folder) to a GitHub repository and enable GitHub Pages from `main` / root, or deploy the folder to Cloudflare Pages. Use the HTTPS URL on mobile.

## Offline notes
The first visit requires internet to fetch Three.js from jsDelivr. After a successful online load, the service worker caches the app shell and Three.js. Reopen once online after each deployment to receive updated files. Speech synthesis availability and offline voices depend on the device/browser.

## Current scope and limitations
This is a working prototype, not a production release. The 3D characters are procedurally assembled from geometry and materials; they are not custom sculpted animated character models yet. Facial expression and motion are lightweight procedural animations. The vocabulary set is eight words. Progress is local to each browser/device; there is no account or cloud synchronization. Test on actual target phones before relying on offline mode.


## Version 0.4.1 drag-and-drop correction
The letter buttons below the word now use pointer-based dragging. Click/tap without moving does not place a letter. Drag a letter directly over its matching target box and release. The 3D scene drag interaction remains available separately.

## Version 0.4 gameplay change
The target word is visible as faint letters inside the 3D slots and in the accessible slot row below the scene. Children arrange the shuffled letters by matching each character to its faint guide. A wrong letter cannot occupy a slot; it returns to its starting position and the game gives a gentle prompt.


## Version 0.4 – Hoạt ảnh nhân vật 3D
- Nhân vật chữ cái tự nhấp nháy mắt, chuyển động đồng tử và nhún người khi chờ.
- Tay và chân chuyển động nhẹ; thân có hiệu ứng squash-and-stretch.
- Khi kéo nhân vật, khuôn mặt chuyển sang ngạc nhiên; khi đặt đúng, nhân vật nhảy vui và có hiệu ứng hạt lấp lánh.
- Khi hoàn thành từ, toàn bộ nhân vật nhảy múa và hiệu ứng chúc mừng xuất hiện.


## Version 0.5 – Letter Creatures

- The 3D letter itself is now the character body (beveled extruded glyph), rather than a rounded square with a printed letter.
- Each glyph has independent eyes, pupils, nose, smile, cheeks, arms and feet.
- Dragging from the letter bank moves the actual Three.js character through the scene; the old flat DOM drag ghost has been removed.
- During drag, the character bobs, tilts, swings its arms and moves its eyes. Correct placement snaps that same 3D character into the matching slot.
- The bold typeface is loaded from the Three.js examples font asset. An online first load is needed if it is not already cached; a rounded fallback remains if the font cannot load.


## Version 0.5.1 – Animated letter bank

- The lower letter bank now renders each draggable letter as an animated mascot with a dimensional letter body, eyes, smile, arms and feet.
- Bank mascots bob, blink, wave and step while waiting. Hovering a mascot makes it bounce more energetically.
- Dragging a bank mascot fades its small DOM representation while the corresponding full Three.js character in the play scene follows the pointer, preserving the existing drag/drop interaction and correct-slot validation.
- The 3D scene character remains the actual object that snaps into the target slot.
