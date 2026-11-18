import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import useScrollManager from "./lib/useScrollManager.js";
import BackToTop from "./components/BackToTop.jsx";
import Nav from "./components/Nav.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import Remitian from "./pages/Remitian.jsx";
import CustomsCity from "./pages/CustomsCity.jsx";
import H3LDesignSystem from "./pages/H3LDesignSystem.jsx";
import CCGSCopilot from "./pages/CCGSCopilot.jsx";
import RDAgent from "./pages/RDAgent.jsx";
import PagodaYoga from "./pages/PagodaYoga.jsx";
import TCC from "./pages/TCC.jsx";

function App() {
  const location = useLocation();

  useScrollManager();

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[var(--color-ink)] text-[var(--color-paper)]">
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><Home /></PageTransition>} />
          <Route path="/about" element={<PageTransition><About /></PageTransition>} />
          <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
          <Route path="/work/remitian" element={<PageTransition><Remitian /></PageTransition>} />
          <Route path="/work/customscity" element={<PageTransition><CustomsCity /></PageTransition>} />
          <Route path="/work/h3l-design-system" element={<PageTransition><H3LDesignSystem /></PageTransition>} />
          <Route path="/work/ccgs-copilot" element={<PageTransition><CCGSCopilot /></PageTransition>} />
          <Route path="/work/rd-agent" element={<PageTransition><RDAgent /></PageTransition>} />
          <Route path="/work/pagoda-yoga" element={<PageTransition><PagodaYoga /></PageTransition>} />
          <Route path="/work/tcc" element={<PageTransition><TCC /></PageTransition>} />
        </Routes>
      </AnimatePresence>
      <BackToTop />
    </div>
    </MotionConfig>
  );
}

export default App;
