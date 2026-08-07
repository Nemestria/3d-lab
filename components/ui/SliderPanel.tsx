'use client'
import { useState } from 'react'

export type SliderConfig = {
  label: string
  min: number
  max: number
  step: number
  defaultValue: number
  decimals?: number // how many decimals to show in the readout (default 2)
  onChange: (value: number) => void
}

type SliderPanelProps = {
  title?: string
  sliders: SliderConfig[]
}

// Generic, data-driven controls HUD. Pass an array of sliders; each reports its
// parsed value up via onChange. Presentational only — it never touches three.js,
// so it's reusable across experiments. Styled to the lab branding (retro font,
// zinc/emerald, backdrop-blur), matching BackToLab / LabHint / ControlsPanel.
export default function SliderPanel({ title = 'CONTROLS', sliders }: SliderPanelProps) {
  return (
    <div className="fixed right-4 top-4 z-50 w-60 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 backdrop-blur">
      <h2 className="mb-4 flex items-center gap-2 font-retro text-sm tracking-widest text-emerald-400">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
        {title}
      </h2>

      <div className="flex flex-col gap-4">
        {sliders.map((s) => (
          <Slider key={s.label} {...s} />
        ))}
      </div>
    </div>
  )
}

function Slider({ label, min, max, step, defaultValue, decimals = 2, onChange }: SliderConfig) {
  const [value, setValue] = useState(defaultValue)

  return (
    <label className="flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="font-retro text-xs text-zinc-400">{label}</span>
        <span className="font-mono text-[10px] text-zinc-500">{value.toFixed(decimals)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => {
          const v = Number(e.target.value)
          setValue(v)
          onChange(v)
        }}
        className="accent-emerald-500"
      />
    </label>
  )
}
