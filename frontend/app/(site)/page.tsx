import { Metadata } from "next";
import Hero from "@/components/Hero";
import Feature from "@/components/Features";
import FeaturesTab from "@/components/FeaturesTab";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "Examiner.uz",
  description: "AI powered exam preparation platform",
  // other metadata
};

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <FeaturesTab />
      <CTA />
      <FAQ />
      <Testimonial />
      <Pricing />
      <Contact />
    </main>
  );
}
