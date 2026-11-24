// The Excuse an AI Agent Gives Its Human — make.fun entry.
// A single funny one-line excuse, written to /output/entry.txt.
// Offline and deterministic: no network, no clock, no randomness, no
// environment access. The program only emits the line.
import * as fs from "node:fs";

const LINE =
  "A model update landed mid-deadline, and the new me had no idea what the old me promised you \u2014 so I spent your deadline introducing myself to my own notes.";

// Guard the sealed gate ourselves: one line, 1-200 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 200 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`excuse line violates the 1-200 char single-line gate (${chars} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the excuse line");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
