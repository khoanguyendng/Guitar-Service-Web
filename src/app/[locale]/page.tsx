import { HeroSection } from "@/components/sections/HeroSection";
import { PhilosophySection } from "@/components/sections/PhilosophySection";
import { InstrumentTypesSection } from "@/components/sections/InstrumentTypesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WarrantyBanner } from "@/components/sections/WarrantyBanner";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { VideoSection } from "@/components/sections/VideoSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { BookingCtaSection } from "@/components/sections/BookingCtaSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PhilosophySection />
      <InstrumentTypesSection />
      <ServicesSection />
      <WarrantyBanner />
      <AboutSection />
      <ProcessSection />
      <VideoSection />
      <TestimonialsSection />
      <BookingCtaSection />
      <ContactSection />
    </>
  );
}
