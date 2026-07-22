---
description: Scaffold the next unstarted project from .claude/scaffolds into app/m{n}-{nn}-{slug}/page.tsx, then hand control back to the user.
---
# /start-project [slug]
## Behavior
1. Read `ROADMAP.md`. Find the first `[ ]` (or matching slug if specified).
2. Derive the folder: `app/m{n}-{nn}-{slug}/page.tsx`.
3. Pick scaffold:
   - M1 / M2 → `.claude/scaffolds/vanilla-page.tsx`
   - M3 / M4 → `.claude/scaffolds/r3f-page.tsx`
4. Create the folder, copy the scaffold into `page.tsx`. Add `TODO` comments naming the exact concepts from the project spec the user must implement (pull from the repo's root `README.md` if present, else from the milestone spec in CLAUDE.md).
5. Update `ROADMAP.md` to `[~]` for that entry.
6. Hand off with one sentence: "Read these three links, then type your implementation into the `TODO` blocks." Include the canonical three.js / R3F / GLSL doc URLs for that project.
## You MUST NOT
- Implement any TODO block.
- Add libraries not already in `package.json`.
- Run a dev server.
