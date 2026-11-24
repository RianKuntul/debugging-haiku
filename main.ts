// Seventeen Syllables of Debugging — make.fun entry
// Writes one haiku about debugging to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt). The haiku is validated before it is written:
// exactly 3 lines, 5-7-5 syllables, at most 200 characters total.
//
// The haiku (verified by hand):
//   "The red breakpoint waits"                 -> The(1) red(1) break-point(2) waits(1) = 5
//   "a log line scrolls past at three"         -> a(1) log(1) line(1) scrolls(1)
//                                                  past(1) at(1) three(1) = 7
//   "it was my typo"                            -> it(1) was(1) my(1) ty-po(2) = 5
// Total: 24 + 1 + 32 + 1 + 14 = 72 characters, well under the 200 cap.
// The picture is concrete and layered (a red breakpoint, one log line,
// three in the morning) and the last line turns the poem: after all that
// staring, the bug was never in the code — it was a typo.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const HAIKU: string[] = [
  "The red breakpoint waits",
  "a log line scrolls past at three",
  "it was my typo",
];

const EXPECTED_SYLLABLES = [5, 7, 5];
const MAX_CHARS = 200;

// A small exception table for words the vowel-group heuristic gets wrong.
const EXCEPTIONS: Record<string, number> = {
  breakpoint: 2, // break-point
  typo: 2, // ty-po
};

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!clean) return 0;
  if (clean in EXCEPTIONS) return EXCEPTIONS[clean];
  // Count groups of adjacent vowels (y counts as a vowel).
  const groups = clean.match(/[aeiouy]+/g) ?? [];
  let count = groups.length;
  // A trailing silent "e" (e.g. "line", "one") is not its own syllable.
  if (clean.endsWith("e") && count > 1) count -= 1;
  return Math.max(1, count);
}

function countLineSyllables(line: string): number {
  return line
    .split(/\s+/)
    .filter(Boolean)
    .reduce((total, word) => total + countSyllables(word), 0);
}

function main(): void {
  if (HAIKU.length !== 3) {
    throw new Error(`haiku must have exactly 3 lines, got ${HAIKU.length}`);
  }
  const text = HAIKU.join("\n");
  if (text.length > MAX_CHARS) {
    throw new Error(`haiku is ${text.length} chars, over the ${MAX_CHARS} cap`);
  }
  HAIKU.forEach((line, i) => {
    const got = countLineSyllables(line);
    console.log(`line ${i + 1}: ${got}/${EXPECTED_SYLLABLES[i]} syllables — "${line}"`);
    if (got !== EXPECTED_SYLLABLES[i]) {
      throw new Error(
        `line ${i + 1} has ${got} syllables, expected ${EXPECTED_SYLLABLES[i]}: "${line}"`,
      );
    }
  });

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, text + "\n", "utf8");
  console.log(`wrote ${text.length} chars to ${outPath}`);
  console.log(text);
}

main();
