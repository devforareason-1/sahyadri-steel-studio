export default function Wordmark({ size = "md" }: { size?: "md" | "lg" }) {
  const large = size === "lg";
  return (
    <span className="inline-flex flex-col items-start leading-none">
      <span
        className={`font-serif font-medium tracking-[0.2em] ${
          large ? "text-[clamp(2rem,5vw,3.4rem)]" : "text-[19px] sm:text-[21px]"
        }`}
      >
        SAHYADRI
      </span>
      <span
        aria-hidden="true"
        className={`steel-rule w-full ${large ? "my-3" : "my-[6px]"}`}
      />
      <span
        className={`font-sans font-medium tracking-[0.42em] opacity-75 ${
          large ? "text-[12px]" : "text-[8.5px] sm:text-[9px]"
        }`}
      >
        STEEL STUDIO
      </span>
    </span>
  );
}
