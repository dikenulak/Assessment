"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, Info, X } from "lucide-react";
import { useGenerationStore } from "@/store/useGenerationStore";

export default function Notification() {
  const notification = useGenerationStore((state) => state.notification);
  const hideNotification = useGenerationStore(
    (state) => state.hideNotification,
  );

  if (!notification) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-green-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: "bg-green-500/10 border-green-500/30",
    error: "bg-red-500/10 border-red-500/30",
    info: "bg-blue-500/10 border-blue-500/30",
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-24 right-8 z-[100] max-w-sm"
      >
        <div
          className={`${bgColors[notification.type]} border rounded-[16px] px-5 py-4 shadow-2xl backdrop-blur-lg`}
        >
          <div className="flex items-start gap-3">
            {icons[notification.type]}
            <div className="flex-1 min-w-0">
              <h3 className="text-white text-sm font-bold leading-tight">
                {notification.title}
              </h3>
              {notification.message && (
                <p className="text-[#ccc] text-xs mt-1 leading-snug">
                  {notification.message}
                </p>
              )}
            </div>
            <button
              onClick={hideNotification}
              className="text-[#666] hover:text-white transition-colors shrink-0"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
