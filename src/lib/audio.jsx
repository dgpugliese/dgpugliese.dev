import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

// Track playing through hidden YouTube IFrame embed.
// Iframe approach relies on YouTube's existing rights deals with the
// uploader / rights holder — we're not redistributing audio ourselves.
// Track licensing: FilFar grants creators permission to use this music in
// personal projects with required credit ("Music by FilFar / @filfar").
// Source: video description on the linked YouTube video.
export const TRACK = {
  videoId: 'qfDc10opQf0',
  title: 'Chapter I',
  artist: 'FilFar',
  artistHandle: '@filfar',
  artistHref: 'https://www.youtube.com/@filfar',
  href: 'https://www.youtube.com/watch?v=qfDc10opQf0&list=PLEM4vOSCprStzppPemEYAF6ZEUrQYj5N5',
};

const AudioCtx = createContext(null);

export function AudioProvider({ children }) {
  const [playing, setPlaying] = useState(false);
  const [armed, setArmed] = useState(false); // becomes true on first toggle
  const playerRef = useRef(null);
  const containerRef = useRef(null);
  const readyRef = useRef(false);

  // Lazy-load the YouTube IFrame API only after the user opts in.
  // Eager loading was crashing mobile Safari during long-page scroll
  // (extra ~100KB of JS + an audio surface in memory before any intent).
  useEffect(() => {
    if (!armed) return;
    let cancelled = false;
    const ensureApi = () => new Promise((resolve) => {
      if (window.YT && window.YT.Player) return resolve();
      if (!document.querySelector('script[data-yt-api]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.async = true;
        tag.dataset.ytApi = '1';
        document.head.appendChild(tag);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); resolve(); };
    });

    ensureApi().then(() => {
      if (cancelled || !containerRef.current || playerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: TRACK.videoId,
        playerVars: { autoplay: 0, controls: 0, modestbranding: 1, rel: 0, playsinline: 1 },
        events: {
          onReady: () => {
            readyRef.current = true;
            try { playerRef.current.setVolume(45); } catch {}
            if (playing) { try { playerRef.current.playVideo(); } catch {} }
          },
        },
      });
    });

    return () => { cancelled = true; };
  }, [armed]);

  // Sync play/pause with state once the player exists.
  useEffect(() => {
    const p = playerRef.current;
    if (!p || !readyRef.current) return;
    try {
      if (playing) p.playVideo();
      else p.pauseVideo();
    } catch {}
  }, [playing]);

  const toggle = useCallback(() => {
    setArmed(true);
    setPlaying(s => !s);
  }, []);

  return (
    <AudioCtx.Provider value={{ playing, toggle, track: TRACK }}>
      {children}
      {armed && (
        <div
          aria-hidden
          style={{
            // position: absolute (not fixed) so the iframe scrolls out of the
            // viewport with the page. Browsers stop compositing it once off-
            // screen — fixes mobile + desktop scroll crashes that happened
            // when YT's video layer recomposited on every scroll frame.
            position: 'absolute',
            top: 0,
            left: 0,
            width: 2,
            height: 2,
            opacity: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
            contain: 'strict',
          }}
        >
          <div ref={containerRef} />
        </div>
      )}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioCtx);
  if (!ctx) return { playing: false, toggle: () => {}, track: TRACK };
  return ctx;
}
