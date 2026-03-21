import HeroSection from "@/sections/HeroSection";
import CurrentWorkSection from "@/sections/ExperiencesSection";
import FeaturedProjectsSection from "@/sections/HighlightedProjects";

export default function Page() {
  return (
    <div className="flex flex-col gap-12">
      <HeroSection />
      <CurrentWorkSection />
      <FeaturedProjectsSection />
    </div>
  );
}
