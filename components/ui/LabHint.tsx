'use client'
import { useState } from 'react'

type LabHintProps = {
  title?: string // eyebrow label, e.g. the project name
  steps: string[] // one line per instruction
  defaultOpen?: boolean
}

// Fixed bottom-right "how to use this experiment" box. Branded to match the lab
// (retro font, zinc/emerald palette). Collapses to a small "?" pill so it never
// blocks the canvas. Drop one into any experiment route and pass its steps.
export default function LabHint({
  title = 'how to use',
  steps,
  defaultOpen = true,
}: LabHintProps) {
  const [open, setOpen] = useState(defaultOpen)

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Show instructions"
        className="fixed bottom-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/80 font-retro text-lg text-zinc-400 backdrop-blur transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
      >
        ?
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-72 max-w-[calc(100vw-2rem)] rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <p className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-emerald-400">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          {title}
        </p>
        <button
          onClick={() => setOpen(false)}
          aria-label="Hide instructions"
          className="font-retro text-sm text-zinc-500 transition-colors hover:text-emerald-400"
        >
          ✕
        </button>
      </div>

      <ol className="space-y-1.5">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-2 text-xs leading-relaxed text-zinc-400">
            <span className="font-mono text-zinc-600">{i + 1}.</span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </div>
  )
}
