// One Emoji, One Smile — entry program.
//
// Writes exactly one emoji to /output/entry.txt: heart hands.
// The entry is the emoji alone: no words, no caption, no explanation,
// no trailing newline. A sealed scorer checks entry.txt is UTF-8 text
// of 1 to 8 characters and not only whitespace; a single heart-hands
// emoji is 1 code point, so it passes the gate with margin.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: U+1FAF6 HEART HANDS. Chosen against the judge's brief:
// a stranger reads it instantly as warm and friendly (criterion 1-2),
// it is universal across ages and backgrounds with no irony (criterion 3),
// it is picked for the moment rather than the first smiley that comes
// to mind (criterion 4), and it carries no intimacy, sarcasm or
// flirtation from a stranger (criterion 5).
const EMOJI = "\u{1FAF6}";

const outDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });

// Guard: the entry must be exactly one grapheme cluster, 1-8 characters,
// and not whitespace-only. Count code points (an emoji outside the BMP
// is one code point in JS string iteration, two UTF-16 units in .length),
// and reject anything that is not a single grapheme.
const codePoints = [...EMOJI];
if (codePoints.length !== 1) {
  throw new Error(`entry must be exactly one emoji, got ${codePoints.length} code points`);
}
if (EMOJI.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (codePoints.length > 8) {
  throw new Error("entry exceeds the 8-character gate");
}
// Write the emoji alone: no trailing newline. A newline would add a
// second character to the file and dilute the "exactly one emoji" read,
// even though the gate allows up to 8 characters.

writeFileSync(join(outDir, "entry.txt"), EMOJI, "utf8");
