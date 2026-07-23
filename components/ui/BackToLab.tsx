'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Fixed top-left "back to lab" link. Rendered once in the root layout, so every
// experiment route gets it for free. Hidden on the lab index ("/") itself.
export default function BackToLab() {
  const pathname = usePathname()
  if (pathname === '/') return null

  return (
    <Link
      href="/"
      className="fixed left-4 top-4 z-50 select-none font-retro text-sm text-zinc-400 mix-blend-difference transition-colors hover:text-emerald-400"
    >
      ← LAB
    </Link>
  )
}
