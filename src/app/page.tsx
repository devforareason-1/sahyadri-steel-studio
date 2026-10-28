import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import SteelStandard from "@/components/SteelStandard";
import Kitchens from "@/components/Kitchens";
import WardrobeExperience from "@/components/WardrobeExperience";
import Vanities from "@/components/Vanities";
import Projects from "@/components/Projects";
import Partners from "@/components/Partners";
import InstagramFeed from "@/components/InstagramFeed";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { partners, testimonials } from "@/data/content";
import { showInstagram } from "@/data/instagram";

// Short chapters, so the enquiry is never far away: the studio, the kitchen,
// the wardrobe, the vanity, the work, (partners and client words, once there
// are some) and how to begin. The interactive planners live on the solution
// pages.
export default function Home() {
  // Chapters 01–05 are fixed; the optional ones number on from there.
  let next = 6;
  const label = () => String(next++).padStart(2, "0");
  const partnersNumber = partners.length > 0 ? label() : "";
  const instagramNumber = showInstagram ? label() : "";
  const testimonialsNumber = testimonials.length > 0 ? label() : "";
  const contactNumber = label();

  return (
    <main>
      <Hero />
      <Solutions />
      <SteelStandard />
      <Kitchens />
      <WardrobeExperience />
      <Vanities />
      <Projects />
      <Partners number={partnersNumber} />
      {showInstagram && <InstagramFeed number={instagramNumber} />}
      <Testimonials number={testimonialsNumber} />
      <Contact number={contactNumber} />
    </main>
  );
}
