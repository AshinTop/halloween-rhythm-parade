# Midnight Rhythm Parade — design notes

The player joins a friendly Halloween street procession. Four characters give each lane a distinct silhouette and color. The gold line provides a fixed timing reference, while notes travel through a shallow-perspective street. The interface uses plum, dusty lavender, pale jade, and candlelight rather than a high-contrast horror treatment.

## Loop and progression

Select one of three complete tracks → four-beat count-in → play the chart → review score, accuracy and combo → replay, rehearse, or select the next song. The three tracks progress from 70 to 133 to 168 notes. All songs continue after misses, allowing recovery and keeping the experience welcoming.

The traditional four-lane rhythm foundation adds a small Halloween reward: 20 consecutive hits activate Lantern Fever. Combo bonuses increase gradually, capped at 50%; the accuracy grade remains a separate timing measure. Practice scales both audio and note times to 75% speed, with unchanged pitches and note order.

## Implementation boundaries

- `core.js` owns charts, score, timing windows, grades and validation.
- `audio.js` owns the Web Audio clock and bounded lookahead. Seeking uses a binary search to skip stale events after stalls.
- `app.js` owns transport state, controls, localization, storage and Canvas presentation.
- Each input can judge at most one pending note. Repeated keydown is ignored; chords use independent lane inputs.
- Hidden pages and audio interruptions pause. Resumption requires an explicit user action.
- The motion-reduction preference removes decorative transitions; falling notes remain because they communicate timing.

No external samples, libraries, analytics, accounts, or server data are required. Best records are browser-local. Tests are deterministic and do not claim to verify human-perceived sound quality.
