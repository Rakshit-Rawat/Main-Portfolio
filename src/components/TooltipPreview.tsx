"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import NextImage from "next/image"; // alias to avoid clashing with global Image

interface TooltipPreviewProps {
  url: string | null;
  image: string | null; // local /public path or remote (allow in next.config.js)
  children: React.ReactNode;
}

/** Utility: extract hostname (fallback safe) */
const getHostname = (link: string) => {
  try {
    return new URL(link).hostname;
  } catch {
    return "";
  }
};

export default function TooltipPreview({
  url,
  image,
  children,
}: TooltipPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");
  const [loading, setLoading] = useState<boolean>(false);
  const hideTimeoutRef = useRef<number | null>(null);

  /** When tooltip opens: if there's an image, show skeleton until Next/Image completes */
  useEffect(() => {
    if (!visible) {
      setLoading(false);
      return;
    }
    setLoading(!!image);
  }, [visible, image]);

  /** Compute placement on demand */
  const updatePosition = useCallback(() => {
    const tooltipEl = tooltipRef.current;
    const containerEl = containerRef.current;
    if (!tooltipEl || !containerEl) return;

    const containerRect = containerEl.getBoundingClientRect();
    const tooltipH = tooltipEl.offsetHeight;
    const vh = window.innerHeight;

    const spaceBelow = vh - containerRect.bottom;
    const spaceAbove = containerRect.top;

    if (spaceBelow >= tooltipH + 10) {
      setPlacement("bottom");
    } else if (spaceAbove >= tooltipH + 10) {
      setPlacement("top");
    } else {
      setPlacement("bottom");
    }
  }, []);

  /** Attach listeners only while visible */
  useEffect(() => {
    if (!visible) return;
    const onScrollOrResize = () => {
      requestAnimationFrame(updatePosition);
    };
    updatePosition();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [visible, updatePosition]);

  /** Show/hide handlers with tiny hide delay (reduce flicker) */
  const show = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setVisible(true);
  };
  const scheduleHide = () => {
    if (hideTimeoutRef.current) window.clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimeoutRef.current = null;
    }, 120);
  };

  /** Keyboard focus accessibility mirrors hover */
  const handleFocus = () => show();
  const handleBlur = () => scheduleHide();

  return (
    <div ref={containerRef} className="relative inline-block">
      <div
        onMouseEnter={show}
        onMouseLeave={scheduleHide}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
        tabIndex={0}
        aria-describedby="link-tooltip"
      >
        {children}
      </div>

      <AnimatePresence>
        {visible && (
          <motion.div
            id="link-tooltip"
            ref={tooltipRef}
            role="tooltip"
            initial={{ opacity: 0, scale: 0.98, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 4 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute z-50 w-64 rounded-md bg-gray-900/95 border border-gray-700 shadow-xl p-3 left-0"
            style={{
              top: placement === "bottom" ? "calc(100% + 8px)" : "auto",
              bottom: placement === "top" ? "calc(100% + 8px)" : "auto",
            }}
            onMouseEnter={show}
            onMouseLeave={scheduleHide}
          >
            <div className="flex flex-col space-y-2">
              {/* Media area: fixed aspect ratio; Next/Image fills it */}
              {image?.trim() ? (
                <div
                  className="relative w-full rounded-md overflow-hidden bg-gray-800"
                  style={{ aspectRatio: "16 / 9" }} // tweak to "4/3" or "1/1" if you want
                >
                  {loading && (
                    <div className="absolute inset-0 bg-gray-700/70 animate-pulse flex items-center justify-center z-0">
                      <svg
                        className="animate-spin h-6 w-6 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                    </div>
                  )}
                  <NextImage
                    src={image}
                    alt="Preview"
                    fill
                    className="object-cover" // use "object-contain" if you don't want cropping
                    sizes="256px"            // matches w-64 (~256px)
                    onLoadingComplete={() => setLoading(false)}
                    onError={() => setLoading(false)}
                    priority={false}
                  />
                </div>
              ) : (
                <div
                  className="w-full rounded-md overflow-hidden bg-gray-800 flex flex-col items-center justify-center text-xs text-gray-500"
                  style={{ aspectRatio: "16 / 9" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-600 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>No preview image</span>
                </div>
              )}

              {/* Hostname / link label */}
              {url?.trim() ? (
                <p className="text-sm text-gray-300 text-center truncate">
                  {getHostname(url)}
                </p>
              ) : (
                <div className="w-full h-6 bg-gray-800 rounded-md flex items-center justify-center text-xs text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-600 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  <span>No link available</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
