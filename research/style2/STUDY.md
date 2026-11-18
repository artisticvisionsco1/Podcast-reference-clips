# Style 2: "warm cinematic kinetic" podcast clip (owner's pick)

Source: one reference, uploaded by the owner on 2026-11-18 (`snapgram.io_h7rxosobk0sq.mp4`, not committed).
- 14.8 s, 720x1280, 30 fps.
- It is an editor showcase: "Before" / "After" cards on a grey page, with `Comment 'Raw'`. The style to learn is inside the **After** card.
- The owner said they like this one, unlike `research/premium-minimal`.

## Transcript (faster-whisper medium.en, word starts in s)
I 0.00 · think 0.14 · it's 0.34 · genuinely 0.94 · right 1.28 · to 1.60 · say 1.78 · that 2.08 · your 2.36 · calendar 2.50 · is 2.86 · a 3.06 · better 3.20 · measure 3.42 · of 3.74 · your 3.90 · wealth 4.02 · than 4.26 · your 4.44 · bank 4.58 · account. 4.78 · It's 5.18 · also 5.26 · the 5.42 · easiest 5.60 · way 5.90 · to 6.10 · know 6.20 · where 6.30 · someone's 6.44 · going 6.76 · to 6.88 · be 6.98 · in 7.12 · five 7.28 · years. 7.46 · But 8.02 · just 8.12 · like 8.70 · people 8.88 · want 9.22 · the 9.98 · immediate 10.16 · reward, 10.42 · they 11.12 · also 11.22 · see 11.58 · their 12.00 · current 12.16 · condition 12.40 · as 12.76 · a 12.92 · result 13.06 · of 13.38 · the 13.62 · behavior 13.74 · they're 13.96 · doing 14.14 · today. 14.30

## Segment timeline (frames at 30 fps)
| t (s) | screen | text on screen | what moves |
|---|---|---|---|
| 0.00–2.13 | Speaker 1, medium close-up, sunset-orange window light behind | "*I think* it's / **genuinely** *right* / to say", built word by word | script words write on; "genuinely" glows orange; an orange arrow cursor flicks in |
| 2.17–3.93 | Dark brown card. A 3D calendar slides in from the top-right corner and a dollar bill peeks in at the bottom-left | "That your *Calendar* / is a better measure of your / **Wealth**" | lines fade up one after another; "Wealth" is typed into an orange highlight box |
| 3.93–4.07 | Whip-zoom transition | — | the calendar flies at the camera with motion blur, and the text smears out to the left (≈6 frames) |
| 4.07–5.07 | Dark card: two rotating outline squares plus outline `$` signs | "than your / *bank account*" (orange script with glow) | squares rotate in, and the glow text writes on letter by letter |
| 5.07–6.27 | Speaker 2, tight close-up | "It's   also the / *easiest way* / to **know**" | same build: small words → big orange script → bold white |
| 6.27–7.87 | 3D scene: a man on a glowing orange pillar above a dark crowd | "Where someone's   gonna be / *5 years*" | words fade in at the sides of the figure; "5 years" fades in with a glow in the middle of the pillar |
| 7.87–9.30 | Speaker 2, wider shot with blue/red practical lights | one word at a time: "but", "just", "like", "people" (white, small) | plain single-word captions while the visuals rest |
| 9.30–11.10 | Fade through dark amber: a hand reaching up for a floating golden trophy ("immediate reward") | none | dip to amber over about 6 frames; hand and trophy fade up; then a push-in with blur as it exits |
| 11.10–13.25 | Amber background with a stack of three b-roll cards, the same speaker doing each thing | "Scrolling", "Working", "Learning" | cards slide in one by one from alternating sides, with ease-out and slight overshoot |
| 13.30–14.80 | Speaker 2, wide shot | "of the / *behaviour* / they are doing **today**" | same build as before; last word bold white |

## 1. Design
- **Palette:**
  - Very dark warm brown/black backgrounds (≈ `#1a1208` → `#3a2408` radial vignette).
  - **One accent**, a glowing amber/orange (≈ `#ff9a1f` core, `#ff6a00` glow).
  - White text.
  - The footage is pushed warm (orange skin and highlights, teal/blue practical lights kept as contrast).
- **Type** (three roles, always mixed inside one caption block):
  1. Small regular sans for the filler words ("it's", "to", "that your", "of the").
  2. A **big script/calligraphic italic** in orange with an outer glow for the emotional or key word ("*genuinely right*", "*easiest way*", "*bank account*", "*behaviour*", "*5 years*"), or white script for a softer key word ("*I think*", "*Calendar*").
  3. A **bold rounded sans** in white for the anchor word ("know", "today", "Wealth", "Scrolling").
- **Caption block:**
  - 2–3 lines, centred, staggered.
  - The small words sit at the corners of the big word, so the block looks like a typographic lock-up, not a subtitle line.
  - On footage it sits at about **55–65 % of frame height**, on the chest.
- **Highlight box:** a solid orange rectangle with a glow behind a bold white word ("Wealth").
- **Visual cards:**
  - 3D-rendered props or scenes (calendar, money, pillar with figure and crowd, hand with trophy) on dark warm backgrounds.
  - Thin outline graphics: rotated squares, `$` signs.
  - Rounded b-roll thumbnail cards with a thin light border and a label.
- **Effects:**
  - Glow/bloom on all orange text.
  - Motion blur on fast moves.
  - Vignette.
  - Soft depth-of-field.

## 2. Animation logic
| animation | timing | curve |
|---|---|---|
| Small sans word | fades in over 3–4 frames | ease-out |
| Script word | writes on / wipes in left→right over 6–10 frames, the glow rising with it | ease-out |
| Highlight word | the orange box pops first (1–2 frames), then the letters type in at ~1 letter per 1–2 frames (≈0.4 s for "Wealth") | stepped |
| Prop entry | the calendar slides diagonally in from the corner with a slight rotation, ~15 frames | ease-out, no bounce |
| Whip-zoom transition | the outgoing prop scales toward camera ~150 % with heavy motion blur while the text smears; ~6 frames, then the new scene fades up | ease-in on exit |
| Fade through colour | footage dims to amber in ~6 frames; the next scene fades up over ~10 frames | ease-in-out |
| B-roll cards | each slides in from off-frame (alternating left/right) over ~8–10 frames, staggered ~0.4 s | ease-out with a small overshoot |
| Footage cuts | hard cuts between speaker shots and visual cards | — |

Pace:
- **About 1 new visual every 1.5–2 s.**
- Footage takes about 45 % of the time and visual cards about 55 %.
- Text never sits still on an empty screen. Something is always building, sliding or glowing.

## 3. Animation vs script
1. **Every concrete noun gets a picture:** calendar → 3D calendar, wealth / bank account → money and `$` outlines, "where someone's going to be in 5 years" → a man on a pedestal above the crowd, immediate reward → a trophy just out of reach, behaviour → scrolling / working / learning b-roll.
2. **Literal first, then metaphor.** The calendar is literal; the pedestal and the trophy are metaphors for the idea.
3. **Key-word typography:**
   - The word carrying the meaning becomes the big orange script.
   - The concluding or result word becomes the bold white.
   - Function words stay small.
4. **Captions follow speech word by word**, but they **accumulate into a lock-up** for the whole phrase instead of replacing each other. The exception is quiet bridge words ("but just like people"), shown one at a time.
5. **Visual cards cover the "idea" half of a sentence, the face covers the "claim" half:**
   - It opens on the speaker ("I think it's genuinely right to say").
   - It cuts to visuals for the idea, comes back to the face for the next claim, and so on.
   - It ends on the face with the final word "today".
6. **The list in the script becomes a list on screen** (three b-roll cards stacking as the speaker talks about behaviour).

Timing note: with Whisper word times (±0.3 s), the visuals land on or slightly before (≈0.2–0.5 s) the spoken word, so the picture anticipates the word.

## What we need to make this ourselves
- The podcast footage itself, uploaded to Drive. YouTube links can't be downloaded from the cloud.
- 3D props and scenes:
  - We can't use the editor's renders.
  - We would generate our own: AI image generation (via a connector, or from the owner) or simple 3D/2D renders in code. Static images are fine; we animate them with slides, zooms and glow.
- B-roll: either extra clips of the same speaker, or stock.
- Engine: an HTML-canvas/ffmpeg pipeline in `engine/`, written fresh for this account.
