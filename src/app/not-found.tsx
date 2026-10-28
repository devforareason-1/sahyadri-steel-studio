import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[80svh] items-center pb-24 pt-[calc(var(--header-height)+64px)]">
      <div className="shell max-w-[720px] text-center">
        <p className="eyebrow eyebrow-plain justify-center text-champagne-ink">Error 404</p>
        <h1 className="display h-xl mt-6">
          This page <em>has moved on.</em>
        </h1>
        <p className="lede mx-auto mt-6 max-w-[420px]">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="btn btn-dark mt-10">
          Back to home
          <ArrowRight size={16} strokeWidth={1.6} />
        </Link>
      </div>
    </main>
  );
}
