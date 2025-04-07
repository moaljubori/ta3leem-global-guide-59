
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CountriesSection from "@/components/CountriesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import BlogPreviewSection from "@/components/BlogPreviewSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <CountriesSection />
        <ProcessSection />
        <TestimonialsSection />
        <BlogPreviewSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
