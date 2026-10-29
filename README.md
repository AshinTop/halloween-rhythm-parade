[English](README.md) | [简体中文](README.zh-CN.md) | [Español](README.es.md) | [Português (Brasil)](README.pt-BR.md) | [日本語](README.ja.md)

# 🎃 Midnight Rhythm Parade — Halloween Rhythm Game with Original Music

**Four little monsters, three original songs, and a glowing Halloween street.** Midnight Rhythm Parade is a four-lane browser music game created for [Sprunki Game](https://sprunki-game.top/). Meet the gold timing line, build a lantern-lit combo, or slow the whole chart down for practice. Pumpkin, cat, ghost, and bat are ready for your next beat.

**[Play online](https://halloween-rhythm-parade.crazy3d.org/)** · [All Halloween games](https://github.com/AshinTop/halloween-games) · [Embedding guide](EMBEDDING.md) · [Design notes](DESIGN.md)

**Document languages:** English, 简体中文, Español, Português (Brasil), 日本語. **Game interface:** English and Simplified Chinese only; the other README languages do not add in-game translations.

![Midnight Rhythm Parade Halloween music game with four note lanes, a gold timing line and monster buttons](docs/images/gameplay.jpg)

## Join the parade 👻

- Three complete original songs, synthesized in the browser with Web Audio.
- Four distinct note shapes and monster buttons: color is supported by shape and lane.
- Real timing judgements, a 20-hit Lantern Fever, and combo bonuses up to 50%.
- A **75% speed practice mode**, pause / resume, local records, and shareable song links.
- Timing adjustment from **−150 to +150 ms** and optional sound.

## The setlist

| Song | Tempo | Notes | Normal-speed duration |
|---|---:|---:|---:|
| Lantern Walk / 南瓜灯的散步 | 96 BPM | 70 | 48.5 s |
| Velvet Wings / 天鹅绒蝠翼 | 112 BPM | 133 | 50.3 s |
| Midnight Confetti / 午夜糖果雨 | 126 BPM | 168 | 48.6 s |

Durations include a four-beat count-in. Lantern Walk begins gently; Velvet Wings adds syncopation and simultaneous notes; Midnight Confetti brings quicker patterns. Melodies, oscillator instruments, and deterministic noise percussion were made for this project. These are not downloaded soundtrack recordings.

## How to play

Choose a song, optionally select Practice, and press **Start the parade**. Sound begins after your interaction. Hit the matching lane as its note meets the gold target line. Two notes arriving together need two simultaneous inputs.

Perfect is within **±55 ms**, Good within **±115 ms**, and Okay within **±180 ms**. A miss breaks the combo, but the song continues: there is no early-failure health bar. Twenty consecutive hits light Lantern Fever. The result screen shows score, accuracy, best combo, and judgement counts.

Practice keeps the complete chart at 75% speed and does not replace normal-speed best scores. Use timing settings to find a comfortable offset for your setup; they do not remove device or output latency.

## Controls

| Action | Keyboard | Touch / mouse |
|---|---|---|
| Lanes 1–4 | D, F, J, K | Four monster buttons |
| Start / pause / resume | Space outside form fields | Main playback button |
| Choose a song | Focus the selector | Song selector |
| Timing offset | Focus settings controls | Gear button |
| Help / restart / share | Tab and Enter | Visible buttons |

Multiple touches support chords. Holding a key does not repeatedly score hits, and a note cannot be scored twice.

## Return to your favorite song

[A Velvet Wings practice link](https://halloween-rhythm-parade.crazy3d.org/#song=velvet-wings&practice=1) shares the song and speed choice. It does not start playback or upload a performance.

Language, sound, timing offset, and normal-speed best scores stay in the current browser. An unfinished performance is not restored after leaving. Hidden pages or interrupted audio pause automatically; resume when you return instead of hearing a backlog.

## FAQ

**Is this a Sprunki mod?** It is an original four-lane game, alongside Pumpkin Jam in the same Halloween collection.

**Can I finish if I miss many notes?** Yes. Every song can reach its results; missed phrases are a chance to recover.

**Does practice replace my best?** No. Slower practice leaves normal-speed records intact.

**Do the tests measure speaker latency?** No. They verify clocks and scheduling. Real output depends on your browser, device, volume, and audio setup.

## See the game

![Compact Midnight Rhythm Parade with falling notes, score and four touch controls](docs/images/mobile.jpg)

Actual game interface in a compact browser iframe. This illustrates the layout; it is not a physical-phone performance test.

[Watch the 24-second introduction](https://halloween-rhythm-parade.crazy3d.org/intro.html) · [Download the captioned MP4](docs/media/intro.mp4). This silent visual tour is assembled from actual game screenshots, not a continuous gameplay recording. The screenshots and video show captured interface states and may predate later visual refinements.

## Embed it on your site

```html
<iframe src="https://halloween-rhythm-parade.crazy3d.org/"
  title="Midnight Rhythm Parade"
  style="display:block;width:100%;height:654px;border:0"
  allow="fullscreen" allowfullscreen></iframe>
```

Designed iframe sizes include 1160×654, 390×650, 390×794 and 844×340 CSS pixels. Use a current browser with Canvas 2D, ES modules and Web Audio. Audio remains subject to browser permissions and device latency; responsive layout checks do not certify every physical phone.

The live site uses Cloudflare and is deployed from this GitHub repository. Give the iframe a real height and leave space for the host toolbar. Fullscreen may be provided by the host. See [EMBEDDING.md](EMBEDDING.md) for the integration contract.

## Run locally and check the rules

```sh
python3 -m http.server 4173
```

Serve the repository root, then open [http://localhost:4173/](http://localhost:4173/). The game is static: no build or dependency installation is needed. Use HTTP(S), because direct `file://` access can block ES modules. Node.js is required for the tests.

```sh
npm test
```

The **13 tests** cover every chart with simulated all-perfect inputs, timing boundaries, duplicate-hit prevention, misses, practice, preferences, links, bounded audio scheduling, frozen-tab jumps, pause / resume, queued-source cancellation, and stale asynchronous startup callbacks. Simulated perfect runs are not human performance or acoustic tests.

The game source does not require an account, remote API, advertising SDK, or external asset CDN. Records stay in browser storage; there is no cloud sync. Cloudflare may add its own hosting scripts and request logs. Optional synthesized audio follows browser sound permissions.

## More moonlit adventures 🍬

- [Pumpkin Jam](https://halloween-sprunki.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-sprunki) — Build an original Halloween monster band.
- [Ghostkeeper Maze 3D](https://halloween-haunted-maze.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-haunted-maze) — Explore first-person corridors and rescue lantern spirits.
- [Moonlit Mirrors](https://halloween-mirror-hearts.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-mirror-hearts) — Bring two mirrored ghosts home together.
- [Trick-or-Treat TriPeaks](https://halloween-tripeaks.crazy3d.org/) · [Source](https://github.com/AshinTop/halloween-tripeaks) — Higher-or-lower solitaire and Moon Bridges.

## Credits and a little support

Created for **AshinTop’s Midnight Candy Club** through human-directed AI collaboration in design, programming, writing, testing, and review. The original artwork and synthesized sounds were made for this project. [Design notes](DESIGN.md) explain its intent.

Enjoyed this little adventure? **[Star Midnight Rhythm Parade on GitHub](https://github.com/AshinTop/halloween-rhythm-parade)** to save it for later and follow updates. Useful issue reports include the game mode or level, browser, window size, and steps that reproduce the problem. Explore the [complete Halloween collection](https://github.com/AshinTop/halloween-games).
