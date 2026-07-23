import Link from 'next/link'

type LabPlaceholderProps = {
  status?: string // small uppercase eyebrow label
  title?: string
  message?: string
  code?: string // big faded code/word (e.g. "404", "WIP")
}

// Shared "nothing here yet" screen. Used by both the 404 page and the /wip route
// so the lab has one consistent placeholder look.
export default function LabPlaceholder({
  status = 'in the workshop',
  title = 'STILL IN THE LAB',
  message = 'This experiment is still being crafted on the workbench. Check back soon — it will light up on the lab index the moment it ships.',
  code = 'WIP',
}: LabPlaceholderProps) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
        {status}
      </p>

      <h1 className="font-retro text-4xl leading-none text-zinc-50 sm:text-6xl">
        {title}
      </h1>

      <p className="mt-4 max-w-md text-sm text-zinc-500">{message}</p>

      <p className="mt-6 font-mono text-6xl text-zinc-800">{code}</p>

      <Link
        href="/"
        className="mt-8 rounded-md border border-zinc-800 px-5 py-2 font-retro text-sm text-zinc-400 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
      >
        ← BACK TO LAB
      </Link>
    </main>
  )
}
