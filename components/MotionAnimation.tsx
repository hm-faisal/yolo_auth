"use client";

import React from "react";
import { motion } from "framer-motion";

export default function MotionAnimation({ children }: React.PropsWithChildren) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
