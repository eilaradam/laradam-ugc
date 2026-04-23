"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { Video } from "@/data/content";

type Ctx = {
  open: (video: Video) => void;
  close: () => void;
};

const VideoModalContext = createContext<Ctx | null>(null);

export function useVideoModal() {
  const ctx = useContext(VideoModalContext);
  if (!ctx)
    throw new Error("useVideoModal must be used inside VideoModalProvider");
  return ctx;
}

export default function VideoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [video, setVideo] = useState<Video | null>(null);

  const open = useCallback((v: Video) => {
    setVideo(v);
    document.body.style.overflow = "hidden";
  }, []);

  const close = useCallback(() => {
    setVideo(null);
    document.body.style.overflow = "";
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  // YouTube embed com qualidade máxima + controles + som
  // - autoplay=1: toca ao abrir
  // - controls=1: mostra barra completa (play/pause/volume/seek/fullscreen)
  // - rel=0: não mostra vídeos sugeridos ao final
  // - modestbranding=1: esconde logo do YouTube
  // - playsinline=1: toca inline no mobile
  // - vq=hd1080: pedido explícito de qualidade máxima (YouTube ajusta se não disponível)
  const embedUrl = video?.youtubeId
    ? `https://www.youtube.com/embed/${video.youtubeId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1&vq=hd1080&hd=1`
    : null;

  return (
    <VideoModalContext.Provider value={{ open, close }}>
      {children}

      <AnimatePresence>
        {video && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          >
            {/* Close button */}
            <button
              onClick={close}
              aria-label="Fechar"
              className="absolute top-4 right-4 md:top-6 md:right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-primary text-white flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Meta top-left */}
            <div className="absolute top-4 left-4 md:top-6 md:left-6 text-white z-10 max-w-[60%]">
              <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/60">
                {video.category}
              </div>
              <div className="font-display font-black text-lg md:text-xl tracking-tight mt-0.5">
                {video.title}
              </div>
              <div className="flex items-center gap-2 mt-2 text-[10px] md:text-xs uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded-full bg-white/15 text-white">
                  {video.brand}
                </span>
                {video.views && (
                  <span className="px-2 py-0.5 rounded-full bg-primary text-primary-light">
                    {video.views} views
                  </span>
                )}
              </div>
            </div>

            {/* Video container — formato vertical (Shorts/Reels) */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[min(90vh,900px)] aspect-[9/16] max-w-full bg-black rounded-2xl overflow-hidden shadow-2xl"
            >
              {embedUrl ? (
                <iframe
                  src={embedUrl}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-white/60 text-center p-8">
                  Vídeo em breve — ainda sem link do YouTube.
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </VideoModalContext.Provider>
  );
}
