import Image from "next/image";
import Parallax from "./Parallax";
import Reveal from "./Reveal";

export default function PhotoBand() {
  return (
    <section aria-label="Studio statement" className="container-shell pb-[72px]">
      <div className="relative flex min-h-[420px] items-center overflow-hidden bg-[#c6bcae] sm:min-h-[520px]">
        <Parallax className="absolute inset-0" speed={0.15}>
          <Image
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85"
            alt="Sunlit living space with natural textures"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </Parallax>
        <div className="absolute inset-0 bg-black/45" />

        <Reveal className="relative z-10 mx-auto max-w-[760px] px-7 text-center text-white">
          <p className="display-heading text-balance text-3xl sm:text-5xl lg:text-6xl">
            A home should feel{" "}
            <span className="italic text-[#e8d9c3]">easy to come back to.</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}