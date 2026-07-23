'use client'
// Runtime error boundary for any experiment that throws on the client.
// Must be a client component and must accept { error, reset } (Next.js contract).
import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 text-center">
      <p className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-red-400">
        <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />
        reaction unstable
      </p>

      <h1 className="font-retro text-4xl leading-none text-zinc-50 sm:text-6xl">
        EXPERIMENT FAILED
      </h1>

      <p className="mt-4 max-w-md text-sm text-zinc-500">
        Something in this experiment blew up mid-reaction. The lab is fine — this
        beaker isn&apos;t. Try running it again, or head back to safety.
      </p>

      <pre className="mt-8 max-w-md overflow-x-auto rounded-lg border border-red-500/30 bg-zinc-950 px-4 py-3 text-left text-xs text-red-300">
        {error.message || 'Unknown reaction error.'}
        {error.digest ? `\n\ndigest: ${error.digest}` : ''}
      </pre>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="rounded-md border border-red-500/50 px-5 py-2 font-retro text-sm text-red-300 transition-colors hover:bg-red-500/10"
        >
          RE-RUN EXPERIMENT
        </button>
        <Link
          href="/"
          className="rounded-md border border-zinc-800 px-5 py-2 font-retro text-sm text-zinc-400 transition-colors hover:border-emerald-500/60 hover:text-emerald-400"
        >
          ← BACK TO LAB
        </Link>
      </div>
    </main>
  )
}
