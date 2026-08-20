import { Hero } from "@/components/landing/Hero";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { Features } from "@/components/landing/Features";
import { AIShowcase } from "@/components/landing/AIShowcase";
import { TopicsPreview } from "@/components/landing/TopicsPreview";
import { Footer } from "@/components/landing/Footer";
import { ScrollProgressPath } from "@/components/landing/ScrollProgressPath";

export default function Home() {
  return (
    <main>
      <ScrollProgressPath />
      <Hero />
      <LiveDemo />
      <Features />
      <AIShowcase />
      <TopicsPreview />
      <Footer />
    </main>
  );
}