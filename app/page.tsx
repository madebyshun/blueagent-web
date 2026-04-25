import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Tools from "@/components/Tools";
import Integrations from "@/components/Integrations";
import CodeTabs from "@/components/CodeTabs";
import Pricing from "@/components/Pricing";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050508]">
      <Navbar />
      <Hero />
      <HowItWorks />
      <Tools />
      <Integrations />
      <CodeTabs />
      <Pricing />
      <Footer />
    </main>
  );
}
