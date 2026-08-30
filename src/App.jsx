import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
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

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
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
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
