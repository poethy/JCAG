import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoStrip from "@/components/LogoStrip";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Coverage from "@/components/Coverage";
import Allies from "@/components/Allies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <LogoStrip />
        <About />
        <Services />
        <Stats />
        <Projects />
        <Testimonials />
        <Coverage />
        <Allies />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
