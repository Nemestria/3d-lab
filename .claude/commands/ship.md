---
description: Verify a project's done-when conditions and run the project's anti-pattern scan before allowing a commit.
---
# /ship [slug]
## Behavior
1. Read the project's `app/m{n}-{nn}-{slug}/README.md`. All "Done when" boxes must be checked, OR the user gives specific evidence per condition.
2. Anti-pattern scan on `page.tsx`:
   - Missing `'use client'` at top → block.
   - `window.` / `document.` outside `useEffect` → block.
   - No cleanup in `useEffect` return (raf cancel, dispose, listener removal) → block.
   - No `setPixelRatio(Math.min(devicePixelRatio, 2))` for vanilla routes → warn.
   - R3F routes: missing `dpr={[1, 2]}` on Canvas → warn.
3. If clean, print (do NOT execute): `git add . && git commit -m "M{n}-P{nn}: {slug}"`.
4. After the user confirms they committed, update `ROADMAP.md` to `[x]`.
5. Suggest next: "Run `/start-project` for the next one."
## You MUST NOT
- Run `git commit` yourself. Print the command, wait for confirmation.
- Modify `page.tsx`.
- Skip the anti-pattern scan.
