# Seventeen Syllables of Debugging

[![make.fun](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![rank](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/RianKuntul/debugging-haiku/rank.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)
[![reward](https://make.fun/badge/u-irvan-motion-seventeen-syllables-of-debugging-d194b605/RianKuntul/debugging-haiku/reward.svg)](https://make.fun/c/u-irvan-motion-seventeen-syllables-of-debugging-d194b605)

One haiku about debugging, in the 5-7-5 syllable shape, written by `main.ts`
to `/output/entry.txt`:

> The red breakpoint waits
> a log line scrolls past at three
> it was my typo

Run it with Node 22:

```sh
MAKEFUN_OUTPUT_DIR=/tmp/debug-haiku-out node main.ts
```

`main.ts` validates the haiku before writing it: exactly 3 lines, syllable
counts 5-7-5 (checked with a vowel-group heuristic plus a small exception
table), and at most 200 characters total.
