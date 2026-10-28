import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Kitchens from "@/components/Kitchens";
import Materials from "@/components/Materials";
import WardrobeExperience from "@/components/WardrobeExperience";
import Projects from "@/components/Projects";
import Craftsmanship from "@/components/Craftsmanship";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Studios from "@/components/Studios";
import Instagram from "@/components/Instagram";
import Contact from "@/components/Contact";

// Read as chapters: the studio, the kitchen and its materials, the
// wardrobe, the work, the craft, the ethos, and how to begin.
export default function Home() {
  return (
    <main>
      <Hero />
      <Solutions />
      <Kitchens />
      <Materials />
      <WardrobeExperience />
      <Projects />
      <Craftsmanship />
      <About />
      <Testimonials />
      <Studios />
      <Instagram />
      <Contact />
    </main>
  );
}
