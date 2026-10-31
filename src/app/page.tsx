import Hero from "@/components/Hero";
import Studio from "@/components/Studio";
import Spaces from "@/components/Spaces";
import Materials from "@/components/Materials";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import WhySteel from "@/components/WhySteel";
import Partners from "@/components/Partners";
import InstagramFeed from "@/components/InstagramFeed";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { showInstagram } from "@/data/instagram";
import { homeDescription, homeTitle, pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: homeTitle,
  description: homeDescription,
  path: "/",
  absoluteTitle: true,
});

// A design studio first: who we are, the rooms we design, the finishes
// and the way we work, the work itself, then why it is all built in steel
// and how to begin. Room-by-room detail and planners live on the solution
// pages.
export default function Home() {
  return (
    <main>
      <Hero />
      <Studio />
      <Spaces />
      <Materials />
      <Process />
      <Projects />
      <WhySteel />
      <Partners />
      {showInstagram && <InstagramFeed />}
      <Testimonials />
      <Contact />
    </main>
  );
}
