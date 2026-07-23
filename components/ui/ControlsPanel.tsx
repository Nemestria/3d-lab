'use client'
import { useState } from 'react'

type ControlsPanelProps = {
  initialColor?: string
  initialSize?: number
  initialSpeed?: number
  onColorChange: (hex: string) => void
  onSizeChange: (size: number) => void
  onSpeedChange: (speed: number) => void
}

// Presentational HUD for a lab experiment. Holds its own display state and
// reports parsed values up via callbacks — it never touches three.js directly,
// so it stays reusable across projects. Styled to match the lab branding.
export default function ControlsPanel({
  initialColor = '#00ff00',
  initialSize = 1,
  initialSpeed = 0.002,
  onColorChange,
  onSizeChange,
  onSpeedChange,
}: ControlsPanelProps) {
  const [color, setColor] = useState(initialColor)
  const [size, setSize] = useState(initialSize)
  const [speed, setSpeed] = useState(initialSpeed)

  return (
    <div className="fixed right-4 top-4 z-50 w-56 rounded-lg border border-zinc-800 bg-zinc-950/80 p-4 backdrop-blur">
      <h2 className="mb-4 font-retro text-sm tracking-widest text-emerald-400">
        CONTROLS
      </h2>

      <div className="flex flex-col gap-4">
        <label className="flex items-center justify-between gap-3">
          <span className="font-retro text-xs text-zinc-400">COLOR</span>
          <input
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value)
              onColorChange(e.target.value)
            }}
            className="h-6 w-10 cursor-pointer rounded border border-zinc-700 bg-transparent"
          />
        </label>

        <label className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-retro text-xs text-zinc-400">SIZE</span>
            <span className="font-mono text-[10px] text-zinc-500">
              {size.toFixed(1)}
            </span>
          </div>
          <input
            type="range"
            min={0.1}
            max={3}
            step={0.1}
            value={size}
            onChange={(e) => {
              const v = Number(e.target.value)
              setSize(v)
              onSizeChange(v)
            }}
            className="accent-emerald-500"
          />
        </label>

        <label className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span className="font-retro text-xs text-zinc-400">SPEED</span>
            <span className="font-mono text-[10px] text-zinc-500">
              {speed.toFixed(3)}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={0.05}
            step={0.001}
            value={speed}
            onChange={(e) => {
              const v = Number(e.target.value)
              setSpeed(v)
              onSpeedChange(v)
            }}
            className="accent-emerald-500"
          />
        </label>
      </div>
    </div>
  )
}
