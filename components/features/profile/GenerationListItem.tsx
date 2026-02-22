'use client';

import { motion } from 'framer-motion';
import { Play, AlertCircle, Loader2 } from 'lucide-react';
import { Generation } from '@/types/generation';
import { cn } from '@/lib/utils'; // wait, I haven't created it yet? Yes I did step 85.

interface GenerationListItemProps {
  generation: Generation;
}

export default function GenerationListItem({ generation }: GenerationListItemProps) {
  const { status, promptShort, version, progress } = generation;

  // Map progress to specific gradient classes defined in globals.css
  const getGradientClass = (prog: number) => {
      if (prog < 20) return "bg-grad-progress-0";
      if (prog < 40) return "bg-grad-progress-25";
      if (prog < 60) return "bg-grad-progress-50";
      if (prog < 80) return "bg-grad-progress-75";
      if (prog < 95) return "bg-grad-progress-90";
      return "bg-grad-progress-100";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      layout
      className="flex items-center gap-3 bg-[#131313] p-2 rounded-xl group"
    >
      {/* Thumbnail */}
      <div className={cn(
        "w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0 flex items-center justify-center text-[10px] font-bold text-white shadow-inner",
        status === 'generating' ? getGradientClass(progress) : "bg-[#222]"
      )}>
         {status === 'generating' && `${Math.round(progress)}%`}
         {status === 'completed' && <Play className="w-4 h-4" />}
         {status === 'pending' && <Loader2 className="w-4 h-4 animate-spin" />}
         {status === 'failed' && "!"}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
         <p className="text-xs text-[#CCC] truncate leading-tight mb-0.5">{promptShort}</p>
         <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#666]">
                {status === 'generating' ? 'Generating...' : (status === 'completed' ? 'v1' : 'Queued')}
            </span>
            <span className="text-[9px] border border-[#333] px-1 rounded text-[#555] group-hover:border-[#555] transition-colors">
                {version}
            </span>
         </div>
      </div>
    </motion.div>
  );
}
