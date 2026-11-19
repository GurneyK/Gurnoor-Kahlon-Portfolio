import { lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, MotionConfig } from "framer-motion";
import useScrollManager from "./lib/useScrollManager.js";
import BackToTop from "./components/BackToTop.jsx";
import Nav from "./components/Nav.jsx";
import PageTransition from "./components/PageTransition.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

// Case studies load on demand, so the home page stays light
const Remitian = lazy(() => import("./pages/Remitian.jsx"));
const CustomsCity = lazy(() => import("./pages/CustomsCity.jsx"));
const H3LDesignSystem = lazy(() => import("./pages/H3LDesignSystem.jsx"));
const CCGSCopilot = lazy(() => import("./pages/CCGSCopilot.jsx"));
const RDAgent = lazy(() => import("./pages/RDAgent.jsx"));
const PagodaYoga = lazy(() => import("./pages/PagodaYoga.jsx"));
const TCC = lazy(() => import("./pages/TCC.jsx"));

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
