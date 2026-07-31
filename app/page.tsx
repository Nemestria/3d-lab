import Link from "next/link";

type Project = {
  id: string;
  name: string;
  href?: string; // present only when the route exists
};

type Milestone = {
  code: string;
  title: string;
  projects: Project[];
};

const LAB: Milestone[] = [
  {
    code: "M1",
    title: "Vanilla Fundamentals",
    projects: [
      { id: "P1", name: "Spinning Cube Hero", href: "/m1-01-spinning-cube-hero" },
      { id: "P2", name: "Interactive Solar System", href: "/m1-02-interactive-solar-system" },
      { id: "P3", name: "GLTF Product Configurator", href: "/m1-03-gltf-product-configurator" },
    ],
  },
  {
    code: "M2",
    title: "Motion & Scrollytelling",
    projects: [
      { id: "P4", name: "Cinematic Camera Tour", href: "/m2-04-cinematic-camera-tour" },
      { id: "P5", name: "Scrollytelling Exploded View" },
      { id: "P6", name: "Neon Bloom Sign" },
    ],
  },
  {
    code: "M3",
    title: "React Three Fiber + Drei",
    projects: [
      { id: "P7", name: "R3F Floating Laptop" },
      { id: "P8", name: "HTML / 3D Mixed Layout" },
      { id: "P9", name: "Glassmorphism Orb" },
    ],
  },
  {
    code: "M4",
    title: "Shaders & Performance",
    projects: [
      { id: "P10", name: "100k Dust Motes" },
      { id: "P11", name: "Twisted 3D Text" },
      { id: "P12", name: "Capstone — Hover Flowmap" },
    ],
  },
];

function Card({ project }: { project: Project }) {
  const live = Boolean(project.href);

  const body = (
    <>
      <div className="flex items-baseline justify-between">
        <span className="text-sm text-zinc-500">{project.id}</span>
        <span
          className={`text-[10px] uppercase tracking-widest ${
            live ? "text-emerald-400" : "text-zinc-700"
          }`}
        >
          {live ? "Live" : "Soon"}
        </span>
      </div>
      <h3
        className={`mt-6 text-lg leading-tight ${
          live ? "text-zinc-100" : "text-zinc-600"
        }`}
      >
        {project.name}
      </h3>
    </>
  );

  const base =
    "block h-full rounded-lg border p-5 transition-colors duration-200";

  if (!live) {
    return (
      <Link
        href="/wip"
        className={`${base} border-zinc-900 bg-zinc-950/40 hover:border-zinc-700`}
      >
        {body}
      </Link>
    );
  }

  return (
    <Link
      href={project.href!}
      className={`${base} border-zinc-800 bg-zinc-950 hover:border-emerald-500/60 hover:bg-zinc-900`}
    >
      {body}
    </Link>
  );
}

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-20 sm:py-28">
      <header className="mb-20">
        <h1 className="font-retro text-5xl leading-none text-zinc-50 sm:text-7xl">
          3D LAB
        </h1>
        <p className="mt-4 max-w-md text-sm text-zinc-500">
          A twelve-project journey through three.js — from a first spinning cube
          to custom GLSL. Built in the open by Alejandro.
        </p>
      </header>

      <div className="space-y-16">
        {LAB.map((milestone) => (
          <section key={milestone.code}>
            <div className="mb-6 flex items-baseline gap-3 border-b border-zinc-900 pb-3">
              <h2 className="font-retro text-xl text-emerald-400">
                {milestone.code}
              </h2>
              <span className="text-xs uppercase tracking-widest text-zinc-600">
                {milestone.title}
              </span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {milestone.projects.map((project) => (
                <Card key={project.id} project={project} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer className="mt-24 border-t border-zinc-900 pt-6 text-xs text-zinc-700">
        ALE · 3D LAB — lab.alejandrosancho.com
      </footer>
    </main>
  );
}
