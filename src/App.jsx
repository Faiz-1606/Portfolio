import { MotionConfig } from "framer-motion";
import { LenisProvider } from "./lib/LenisProvider.jsx";
import { ThemeProvider } from "./lib/ThemeProvider.jsx";
import BackToTop from "./components/BackToTop.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Experience from "./components/Experience.jsx";
import Skills from "./components/Skills.jsx";
import Teaching from "./components/Teaching.jsx";
import Blog from "./components/Blog.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <MotionConfig reducedMotion="user">
        <LenisProvider>
          <Nav />
          <main>
            <Hero />
            <About />
            <Work />
            <Experience />
            <Skills />
            <Teaching />
            <Blog />
          </main>
          <Footer />
          <BackToTop />
        </LenisProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
