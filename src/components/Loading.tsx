import "@css/components/loading.css";
import { motion } from "motion/react";
import { CircleNotchIcon } from "@phosphor-icons/react/dist/ssr";

export default function Loading() {
  return (
    <div className="loading-page">
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
      >
        <CircleNotchIcon />
      </motion.span>
    </div>
  );
}
