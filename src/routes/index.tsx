import { createFileRoute } from '@tanstack/react-router';
import Navbar from '@/components/pertial/Navbar';
import Hero from '@/components/pertial/Hero';
import Features from '@/components/pertial/Features';
import Testimonials from '@/components/pertial/Testimonials';
import CTA from '@/components/pertial/CTA';
import Footer from '@/components/pertial/Footer';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
