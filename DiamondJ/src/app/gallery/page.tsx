import Nav from "@/components/Nav";
import { Footer } from "@/components/Footer";
import Section from "@/components/Section";
import { GalleryGrid } from "@/components/GalleryGrid";

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main>
        <Section title="Gallery" subtitle="Food, setups, and event shots.">
          <GalleryGrid />
        </Section>
      </main>
      <Footer />
    </>
  );
}
