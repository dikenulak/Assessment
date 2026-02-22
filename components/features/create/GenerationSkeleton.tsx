"use client";

import { motion } from "framer-motion";

export default function GenerationSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="px-2 py-3 rounded-2xl flex items-center gap-5 relative max-w-3xl"
    >
      {/* Thumbnail Skeleton */}
      <div className="w-15 h-15 rounded-[14px] bg-[#222] shrink-0" />

      {/* Text Info Skeleton */}
      <div className="flex-1 space-y-3 pt-1">
        <div className="h-[21px] bg-[#222] rounded-full w-44" />
        <div className="h-[15px] bg-[#222] rounded-full w-64" />
      </div>

      {/* Action Area Skeleton */}
      <div className="w-[20px] h-[20px] rounded-full bg-[#222] shrink-0 ml-auto" />
    </motion.div>
  );
}
