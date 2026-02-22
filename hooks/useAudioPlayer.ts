import { useRef, useState, useEffect } from "react";
import { useGenerationStore } from "@/store/useGenerationStore";

export function useAudioPlayer() {
  const activeTrack = useGenerationStore((state) => state.activeTrack);
  const isPlaying = useGenerationStore((state) => state.isPlaying);
  const togglePlay = useGenerationStore((state) => state.togglePlay);
  const closePlayer = useGenerationStore((state) => state.closePlayer);

  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);

  // Consolidate audio state synchronization to prevent AbortError
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // 1. Sync Source
    if (
      activeTrack?.audioUrl &&
      audio.src !== window.location.origin + activeTrack.audioUrl
    ) {
      audio.src = activeTrack.audioUrl;
      audio.load();
    }

    // 2. Sync Play/Pause State
    const handlePlayback = async () => {
      try {
        if (isPlaying && activeTrack) {
          // Only play if we have a source
          if (audio.src) {
            await audio.play();
          }
        } else {
          audio.pause();
        }
      } catch (err: any) {
        // Ignore AbortError as it's expected during rapid switching
        if (err.name !== "AbortError") {
          console.error("Playback error:", err);
        }
      }
    };

    handlePlayback();
  }, [isPlaying, activeTrack?.audioUrl, activeTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Reset state when track changes or closes
  useEffect(() => {
    if (!activeTrack) {
      setCurrentTime(0);
      setDuration(0);
    }
  }, [activeTrack]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    if (audioRef.current) audioRef.current.currentTime = 0;
    setCurrentTime(0);
    togglePlay();
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleClose = () => {
    // Pause first
    if (audioRef.current) audioRef.current.pause();
    closePlayer();
  };

  return {
    audioRef,
    activeTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    setVolume,
    togglePlay,
    handleSeek,
    handleClose,
    handleTimeUpdate,
    handleLoadedMetadata,
    handleEnded,
  };
}
