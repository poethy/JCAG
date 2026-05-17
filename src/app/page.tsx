import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Chatbot from "@/components/Chatbot";
import About from "@/components/About";
import Services from "@/components/Services";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Allies from "@/components/Allies";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Stats />
        <Projects />
        <Testimonials />
        <Allies />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
