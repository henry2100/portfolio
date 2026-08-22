import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VscLoading } from "react-icons/vsc";
import { FiExternalLink } from "react-icons/fi";

interface ProjectPreviewProps {
  url: string;
  title: string;
  containerStyle?: string;
}

const DESKTOP_WIDTH = 1280;
const DESKTOP_HEIGHT = 800;

const ProjectPreview = ({ url, title, containerStyle }: ProjectPreviewProps) => {
  const [mode, setMode] = useState<"loading" | "iframe" | "screenshot" | "fallback">("loading");
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const loadedRef = useRef(false);

  const mshotsUrl = `https://s.wordpress.com/mshots/v1/${encodeURIComponent(url)}?w=${DESKTOP_WIDTH}&h=${DESKTOP_HEIGHT}`;

  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const recalc = () => {
      const cw = el.clientWidth;
      const ch = el.clientHeight;
      if (cw === 0 || ch === 0) return;
      setScale(Math.min(cw / DESKTOP_WIDTH, ch / DESKTOP_HEIGHT));
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setMode("loading");
    loadedRef.current = false;

    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      if (loadedRef.current) return;
      loadedRef.current = true;
      clearTimeout(timeout);
      setMode("iframe");
    };

    iframe.addEventListener("load", handleLoad);
    iframe.src = url;

    const timeout = setTimeout(() => {
      if (!loadedRef.current) {
        setMode("screenshot");
      }
    }, 6000);

    return () => {
      clearTimeout(timeout);
      iframe.removeEventListener("load", handleLoad);
      iframe.src = "about:blank";
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={`relative group overflow-hidden ${containerStyle}`}
    >
      <iframe
        ref={iframeRef}
        className="hidden"
        title={`preload-${title}`}
      />

      <AnimatePresence mode="wait">
        {mode === "loading" && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-DarkBg2 z-20"
          >
            <VscLoading className="text-Primary text-3xl animate-spin mb-3" />
            <span className="text-gray-500 text-xs uppercase tracking-wider">Loading preview</span>
          </motion.div>
        )}

        {mode === "iframe" && (
          <motion.div
            key="iframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10"
          >
            <iframe
              src={url}
              title={title}
              className="border-0 bg-white pointer-events-auto"
              style={{
                width: DESKTOP_WIDTH,
                height: DESKTOP_HEIGHT,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </motion.div>
        )}

        {mode === "screenshot" && (
          <motion.img
            key="screenshot"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            src={mshotsUrl}
            alt={`${title} preview`}
            className="w-full h-full object-cover object-top z-10"
            onError={() => setMode("fallback")}
          />
        )}

        {mode === "fallback" && (
          <motion.div
            key="fallback"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-DarkBg2 z-10"
          >
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_40%,_#6366f1_0%,_transparent_50%)]" />
              <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_60%,_#6366f1_0%,_transparent_50%)]" />
            </div>
            <div className="relative flex flex-col items-center gap-4 px-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-Primary_Accents_xs border border-Primary/20 flex items-center justify-center">
                <FiExternalLink className="text-Primary text-xl" />
              </div>
              <h4 className="font_cabinet-bold text-lg text-white">{title}</h4>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-Primary hover:text-white border border-Primary/30 hover:bg-Primary px-4 py-2 rounded-full transition-all duration-300"
              >
                View Live Project
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectPreview;
