'use client';

import { useState, useEffect } from 'react';

const prompts = [
  "Create a funky house song with female vocals...",
  "A lo-fi hip hop beat with rainy day vibes...",
  "Epic orchestral track for a fantasy battle scene...",
  "Smooth jazz with trumpet, perfect for a late-night drive...",
  "Upbeat pop song about summer and freedom...",
];

export function useCyclingPlaceholder() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % prompts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return prompts[index];
}
