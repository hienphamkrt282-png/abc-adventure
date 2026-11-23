# ABC Adventure v0.10 – recorded audio clips

The game now supports hybrid playback: prerecorded English clips are played first when a clip is mapped; otherwise the device Web Speech engine is used as a fallback.

No prerecorded MP3 recordings are included in this ZIP. This is intentional: the package does not pretend that synthesized audio is a studio recording.

To add recordings, place files in this folder (or a subfolder) and add their relative URLs to `RECORDED_AUDIO` near the top of the Speech Manager section in `app.js`. Example:

```js
const RECORDED_AUDIO = {
  letters: { A: "./audio/letters/A.mp3" },
  words: { CAT: "./audio/words/CAT.mp3" },
  stories: { CAT: "./audio/stories/CAT.mp3" }
};
```

Keys are uppercase. `words` clips are used for word playback, `letters` clips for letter names, and `stories` clips for the full English story associated with that word. If a clip is missing or cannot play, the game automatically falls back to Web Speech when available. Keep clips short, clear, and licensed for use in this game.
