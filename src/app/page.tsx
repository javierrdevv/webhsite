import Hero from "@/components/sections/Hero";
import Work from "@/components/sections/Work";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import CinematicBand from "@/components/sections/CinematicBand";
import SocialProof from "@/components/sections/SocialProof";
import Marquee from "@/components/ui/Marquee";

const BAND_PROCESS =
  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2400&auto=format&fit=crop";
const BAND_FRAMES =
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=2400&auto=format&fit=crop";

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Work />
      <CinematicBand
        src={BAND_PROCESS}
        alt="Monumental architecture under a dramatic sky"
        title="Every artifact begins with intent."
      />
      <About />
      <CinematicBand
        src={BAND_FRAMES}
        alt="Misty ridge fading into fog"
      />
      <SocialProof />
      <Contact />
      <Footer />
    </>
  );
}
