# Premium minimal editing style: study

Source: Google Drive folder "Reference folder podcast clips Claude" (owner upload, 2026-11-14).
- 12 MP4 files, but 4 are duplicates (04=05, 07=08, 09=10, 11=12; SSIM > 0.995). **8 unique references**: ref01, 02, 03, 04, 06, 07, 09, 11.
- The Figma board was **not** in the folder.
- Each reference has its own file `refXX.md` with a word-by-word transcript, word timings, a segment timeline and visual notes.
- How the data was made:
  - Transcription: faster-whisper `medium.en`.
  - Cuts: frame difference inside the "finished" card (`engine/study/timeline.py`).
  - Frames: 2 fps sheets (`sheets/`), 6 fps crops (`crops/`) and 30 fps strips around the key moments (`strips/`).

## 0. What the clips actually are
- Every reference is an **editor's showcase**: the raw clip and the finished clip side by side.
- **Wrapper A** (ref01, 03, 04, 07, 09, 11):
  - White page.
  - A tilted "raw" card behind, and a straight "finished" card in front.
  - Below them: `Comment "W"` / `And I'll send you the Raw video.`
- **Wrapper B** (ref02, 06):
  - Grey page `#d2d2d2`.
  - A "before" card and an "after" card, plus the editor's logo `@ner.oprime`.
- The style to learn is what happens **inside the finished/after card**. That is a 9:16 podcast clip of 10–15 s. Each one is a single thought from a well-known speaker (podcast or interview footage with a mic in shot).
- The wrapper is the editor's portfolio frame, not part of the edit itself.

## 1. Design: colours, layout, effects, proportions, fonts

### Palette (sampled pixel values)
| role | value |
|---|---|
| white card | `#FFFFFF` |
| navy card (A) | `#002359` |
| navy card / navy ink (B) | `#001A52` |
| main text on white | near-black `#111` |
| incoming / secondary text | mid grey (~`#9a9a9a`) before it settles |
| text on navy and on footage | white |
| icons | chrome / silver 3D renders, greyscale |
| only accent ever seen | the middle star in ref01 (gold/beige) |

- Only **two flat backgrounds** are used (white and navy), plus the footage itself.
- No gradients, emojis, colour grading tricks, progress bars or stickers.

### Layout and proportions
- The finished frame is 9:16 with rounded corners (about 5 % of the width) and a soft drop shadow (the shadow belongs to the wrapper).
- **Captions on footage:**
  - One word, centred horizontally, at about **60–65 % of frame height** (on the chest, under the face).
  - Cap height is about 4–5 % of frame height.
- **Text cards:**
  - The text block is centred, sitting slightly above the middle (about 45–50 %).
  - A single word takes about 25–40 % of the width, so there is a lot of empty space.
- **Icon cards:**
  - The icon is about 30–35 % of the width, centred, at about 35–45 % height.
  - The word sits directly under it, and often overlaps the icon's base.
- **Kicker + word (B):**
  - A small regular-weight word (about 35 % size) sits left-aligned on top of a big bold word.
  - Examples: "the / smartest", "It's / impossible.", "You can / damage", "and / completely".
- About **70–85 % of every card is empty**. That is the "minimal" look.

### Fonts
- **Main:** a bold neo-grotesk with tight negative tracking (Helvetica Now Display Bold / Inter Tight Bold look). Mostly lowercase, with sentence punctuation kept ("unbeatable.", "beat.").
- **Accent:** a high-contrast **script/italic serif** (Bodoni/Didot italic or a calligraphic italic). It is used for one emotional or evaluative word next to a bold word: "I *totally* could", "a *failure*", "deep *level*", "hear you *whine*".
- **Brackets:** `[ word ]` with spaces inside, white on navy, for the one thesis word of the clip: [perfect], [do it], [shut up], [gratitude], [powerful], [negotiation], [surprising], [third].
- **Typewriter lines:** in B, small regular text with an ellipsis: "I can't be…", "I'm totally…", "that's true in life…".

### Effects inventory
| effect | where |
|---|---|
| Blur-in transition (footage starts defocused and sharpens) | every card → face cut in A |
| Blue RGB / scan-line glitch flash | card → face in B |
| Arrow line drawing under a word | "completely" (ref06) |
| Punch-in zoom about 115 % on footage | "permanent" (ref09) |
| Chrome 3D icons | trophy, cracked trophy, scales, 8-point star, speech bubbles, sprinter, push-up figure, burst figure, iceberg crystal, Instagram glyph, star rating |

## 2. Animation logic: types, timing, speed, curve

**Rule of the style: almost nothing moves.**
- Change comes from **cuts and fades**, not from slides, bounces or rotations.
- Measured at 30 fps:

| animation | timing | curve / notes |
|---|---|---|
| Word caption on footage | appears exactly on the word onset; fades from ~40 % to 100 % opacity in **3–4 frames (100–130 ms)**; holds until the next word (no gap, no stacking) | linear / ease-out, no scale, no position move |
| Word added to a card phrase | each new word fades in grey → full colour in **~3 frames**; earlier words stay | ease-out |
| Typewriter line | about 1 character per frame | stepped |
| Appended word | e.g. "flattened" → "flattened out", the new word pops in at its onset | about 3 frames |
| Icon reveal | opacity 0 → 1 over **5–6 frames (~200 ms)**; the label words then build next to it | ease-out; no motion |
| Card ↔ card | **hard cut**, 0 frames, on a word onset | — |
| Card → face (A) | **blur-in**: footage enters heavily blurred and sharpens over **5 frames (~170 ms)** | ease-out |
| Card → face (B) | **glitch**: 3–4 frames of light-blue overexposed footage with horizontal scan lines | stepped |
| Face → card | hard cut on a word onset | — |
| Underline arrow | line draws left → right over ~10 frames, then holds | ease-out |
| Punch-in | instant scale step (~115 %) inside a long face shot, on the stressed word | step |

### Pace
| measure | value |
|---|---|
| Clip length | 10–14.5 s |
| Average segment | **1.0–1.9 s** (median about 1.2 s) |
| Text/icon cards | 0.33–1.8 s each |
| Face runs | 0.9–5.5 s each |
| Screen time | footage **45–61 %**, white cards 16–40 %, navy cards 9–23 % |
| Speech rate (real speakers, not narration) | 144–269 wpm |

- **Every cut lands on a word onset.** No cut happens in the middle of a word.

## 3. Animation behaviour vs the script

1. **Open on a card, not a face** (7 of 8). The first words of the hook are typeset on white or navy. The speaker's face only appears after 0.5–2.3 s, and the hook line finishes on the face. Only ref06 opens on the face.
2. **Always end on the face** (8 of 8). The speaker delivers the last line, and the caption carries the final word.
3. **Cards carry the idea words; the face carries the connective words.**
   - Explanations, examples and "you know"-type filler stay on the footage.
   - The concept nouns and the key verbs go to cards.
4. **What each card colour does:**
   - **White** = the lead-in or setup phrase ("If I can't be", "and anything", "The reason that", "Everything has been").
   - **Navy** = the punch, a contrast word or a negative ("perfect", "less", "beat.", "shut up", "negotiation", "nothing surprising", "third").
   - The rhythm is usually **white → navy → face**, then it repeats. Two face segments almost never sit next to each other without a card between them.
5. **Brackets mark the single thesis word** of the clip, about 1–2 per clip.
6. **Icons are used only for concrete nouns or concepts**:
   - success → trophy
   - failure → cracked trophy
   - great life → star
   - whine → speech bubbles
   - social media → Instagram glyph
   - deep → iceberg
   - discipline / motivation / obsession → chrome figures
   - The icon lands on the noun. The surrounding words then build around it, and the emotional word is set in the script italic.
7. **Visual callbacks:**
   - The same icon comes back changed when the meaning flips: trophy on "success", then cracked trophy on "failure".
   - Parallel sentences get identical visual patterns. In ref04, three times: icon card → navy "is" → face.
8. **Words get split for tension:** "preten- / tiousness" (ref01); "un." on the face, then "unbeatable." (ref06). The second half lands on its own beat.
9. **Phrases build word by word on a card**, never as a whole sentence at once. This keeps the viewer reading in sync with the voice.
10. **Emphasis on footage comes from a punch-in, not a new graphic**, when a face shot runs long (ref09 "permanent").

## Open points for the owner
- The Figma board was not in the Drive folder. Please upload it, or share a link.
- The owner said 10 references; the folder has 12 files, but only 8 unique videos.
- Source footage:
  - The style needs real podcast or interview footage (a speaker with a mic).
  - Decide where it comes from: owner recordings, licensed or credited podcast clips, or something else.
- Wrapper:
  - Do we post the clean full-screen edit (the "finished" card only)? Recommended.
  - Or do we also post it inside a showcase wrapper, the way the reference editors do?
