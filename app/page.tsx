import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { TopicsPreview } from "@/components/landing/TopicsPreview";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <TopicsPreview />
      <Footer />
    </main>
  );
}