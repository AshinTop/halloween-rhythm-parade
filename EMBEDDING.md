# Rhythm Parade embedding

## Host mapping

Primary integration: `sprunki-game.top`. Its existing desktop player allocates a 654 px-tall game area; the audited wide container provides 1160 px of usable width. The main-site controls remain outside the game iframe. On mobile, use the actual iframe viewport height after reserving any host toolbar.

## Embed example

```html
<iframe
  src="https://ashintop.github.io/halloween-rhythm-parade/"
  title="Midnight Rhythm Parade"
  width="1160"
  height="654"
  allow="autoplay; fullscreen"
  allowfullscreen
  style="display:block;width:100%;border:0"
></iframe>
```

The URL is the intended GitHub Pages deployment target. Verify deployment before adding it to a production game catalog.

The app always uses its iframe's own `100dvh`; it does not depend on reading the parent page or on `postMessage`. `?embed=1` is harmless but not required. It works from a repository subpath because all runtime assets use relative URLs.

## Responsive targets

| Frame | Intended behavior |
| --- | --- |
| 1160 × 654 | Full stage and journal, four visible input buttons |
| 390 × 794 | Portrait stage, compact transport, journal hidden |
| 390 × 650 | Same controls with a shorter note field |
| 844 × 340 | Compact header, score strip and input row; playable note field |

The complete song selector, practice toggle, pause/resume, restart, sharing, help and calibration remain available when the journal is hidden. Dialogs scroll within the frame if needed. The page does not create an outer document scrollbar.

## Audio and input

Audio starts only after the Start button or an intentional keyboard action. An `allow="autoplay"` permission does not force autoplay. Avoid an iframe policy that blocks Web Audio; a sandbox should permit scripts, and same-origin access is needed only if local persistence is desired.

The four target buttons handle independent pointer events for multi-touch chords. Keyboard lanes are D/F/J/K; Space controls playback when a form control or dialog is not active. A positive calibration offset delays both visible notes and their judgement clock.

Closing or navigating the iframe stops the transport. Hiding the document pauses it, skips queued audio, and requires an explicit Resume. Browser-local storage is optional.

## Verification scope

Core and transport tests cover complete charts, timing judgements, pause/resume, asynchronous cancellation, and a long frozen-clock jump. Runtime files pass Node syntax checks. Browser layout and production deployment are separate acceptance steps; physical-phone touch behavior, Bluetooth delay and subjective audio quality must not be inferred from the automated checks.
