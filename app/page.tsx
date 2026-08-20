import { Hero } from "@/components/landing/Hero";
import { LiveDemo } from "@/components/landing/LiveDemo";
import { Features } from "@/components/landing/Features";
import { AIShowcase } from "@/components/landing/AIShowcase";
import { TopicsPreview } from "@/components/landing/TopicsPreview";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <LiveDemo />
      <Features />
      <AIShowcase />
      <TopicsPreview />
      <Footer />
    </main>
  );
}