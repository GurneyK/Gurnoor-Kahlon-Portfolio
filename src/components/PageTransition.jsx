import { Suspense } from "react";
import { motion } from "framer-motion";

export default function PageTransition({ children }) {
  return (
    <motion.div
      data-page
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <Suspense fallback={<div className="min-h-screen" />}>{children}</Suspense>
    </motion.div>
  );
}
