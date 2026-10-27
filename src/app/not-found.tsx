import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-padding">
      <div className="container-shell max-w-[640px] py-16 text-center">
        <p className="eyebrow justify-center text-accent">Error 404</p>
        <h1 className="display-heading mt-6 text-5xl sm:text-6xl">
          This page <span className="italic text-accent">wandered off.</span>
        </h1>
        <p className="mt-6 text-sm leading-7 text-muted">
          The page you are looking for does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex min-h-12 items-center bg-foreground px-6 py-3 text-xs font-medium text-white transition-colors hover:bg-accent"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}