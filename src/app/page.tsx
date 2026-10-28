import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Kitchens from "@/components/Kitchens";
import WardrobeExperience from "@/components/WardrobeExperience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import { testimonials } from "@/data/content";

// Six short chapters, so the enquiry is never far away: the studio, the
// kitchen, the wardrobe, the work, (client words, once there are some) and
// how to begin. The interactive planners live on the solution pages.
export default function Home() {
  const hasReviews = testimonials.length > 0;

  return (
    <main>
      <Hero />
      <Solutions />
      <Kitchens />
      <WardrobeExperience />
      <Projects />
      <Testimonials number="05" />
      <Contact number={hasReviews ? "06" : "05"} />
    </main>
  );
}
