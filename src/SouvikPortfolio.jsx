// SouvikPortfolio.jsx
// Ultra-premium cinematic portfolio for Souvik Mahanta

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from "framer-motion";
import profileImg from "./assets/profile/profile.png";

// ─── CONSTANTS ───────────────────────────────────────────────────────────────

const NAV_LINKS = ["About", "Skills", "Services", "Projects", "Contact"];

const SERVICES = [
  { icon: "◈", title: "AI & ML Systems", desc: "Multi-agent architectures, LLM pipelines, RAG systems, and intelligent automation built for production scale.", tag: "Intelligence" },
  { icon: "⬡", title: "Backend Engineering", desc: "High-throughput Go & Python APIs, distributed systems, message queues, and microservice architectures.", tag: "Infrastructure" },
  { icon: "◉", title: "Cybersecurity", desc: "Threat modeling, secure coding practices, CTF engineering, and penetration testing for enterprise systems.", tag: "Security" },
  { icon: "⟁", title: "Blockchain & Web3", desc: "Smart contracts, decentralized applications, and blockchain system design with cryptographic precision.", tag: "Decentralized" },
  { icon: "⊞", title: "System Design", desc: "Scalable architectures that handle 99.9% uptime, real-time observability, and zero-downtime deployments.", tag: "Architecture" },
  { icon: "◫", title: "DevOps & Cloud", desc: "Docker, Kubernetes, CI/CD pipelines, AWS infrastructure, and Prometheus-grade monitoring systems.", tag: "Operations" },
];

const PROJECTS = [
  {
    name: "NeuraBalancer",
    subtitle: "AI-Driven Load Balancer",
    desc: "Engineered an intelligent load balancer using Go and a 6-feature neural network (ONNX) achieving 35% lower response latency vs round-robin baseline with sub-100ms ML inference.",
    tags: ["Go", "PyTorch/ONNX", "TimescaleDB", "Prometheus", "Docker"],
    metric: "35% latency reduction",
    year: "2025",
    link: "https://github.com/souvik03-136/NeuraBalancer",
  },
  {
    name: "Book-Keeping AI",
    subtitle: "Financial Automation System",
    desc: "AI bookkeeping system with ensemble SARIMA-LSTM model achieving 10–15% MAPE accuracy. Dual NLP extraction via Groq LLaMA 3 with 92%+ F1-score.",
    tags: ["Python", "TensorFlow", "Flask", "spaCy", "Docker"],
    metric: "92%+ F1 NLP accuracy",
    year: "2024",
    link: "https://github.com/souvik03-136/book-keeping-ai",
  },
  {
    name: "Riviera'24",
    subtitle: "Scalable Fest Backend",
    desc: "Go-based REST API with RBAC serving 5,000+ participants. Async email system via RabbitMQ processing 10,000+ notifications. 70% boilerplate reduction via OpenAPI codegen.",
    tags: ["Go", "PostgreSQL", "RabbitMQ", "JWT", "Docker"],
    metric: "5,000+ concurrent users",
    year: "2024",
    link: "https://riviera2024-frontend.vercel.app/",
  },
];

const SKILLS = [
  { label: "AI / ML", items: ["LangChain", "LangGraph", "PyTorch", "TensorFlow", "RAG", "LLMs", "Multi-agent"] },
  { label: "Backend", items: ["Go", "Python", "Node.js", "FastAPI", "Flask", "GraphQL", "WebSockets"] },
  { label: "Data", items: ["PostgreSQL", "TimescaleDB", "Redis", "MongoDB", "ChromaDB", "Apache Spark"] },
  { label: "DevOps", items: ["Docker", "Kubernetes", "AWS", "CI/CD", "Prometheus", "Grafana"] },
  { label: "Security", items: ["CTF", "Penetration Testing", "Secure Coding", "Threat Modeling"] },
  { label: "Blockchain", items: ["Smart Contracts", "DApps", "Cryptography", "Web3"] },
];

// ─── GLOBAL STYLES ────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400;500&family=Syne:wght@400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #080808;
      --surface: #0f0f0f;
      --surface2: #141414;
      --border: rgba(255,255,255,0.06);
      --text: #f0ede8;
      --muted: rgba(240,237,232,0.4);
      --accent: #c8a96e;
      --accent2: #7eb8c9;
      --glow: rgba(200,169,110,0.15);
      --font-display: 'Cormorant Garamond', serif;
      --font-sans: 'Syne', sans-serif;
      --font-mono: 'DM Mono', monospace;
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      overflow-x: hidden;
      cursor: none;
    }

    @media (max-width: 768px) {
      body { cursor: auto; }
    }

    ::selection { background: rgba(200,169,110,0.3); color: var(--text); }

    ::-webkit-scrollbar { width: 2px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    .section { padding: 120px 0; }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 40px;
    }

    @media (max-width: 768px) {
      .container { padding: 0 24px; }
      .section { padding: 80px 0; }

      /* Hero needs top padding on mobile for the nav */
      .hero-section {
        padding-top: 120px !important;
        min-height: 100svh !important;
        align-items: flex-start !important;
      }

      /* About section mobile grid */
      .about-grid {
        grid-template-columns: 1fr !important;
        gap: 3rem !important;
      }

      /* Hero stats hide on mobile */
      .hero-stats { display: none !important; }

      /* Footer grid mobile — brand full width, then 2 cols */
      .footer-grid {
        grid-template-columns: 1fr 1fr !important;
        gap: 2rem !important;
      }
      .footer-brand {
        grid-column: 1 / -1 !important;
      }

      /* Nav links hide on mobile */
      .nav-links { display: none !important; }

      /* Profile image mobile */
      .profile-card {
        max-width: 320px;
        margin: 0 auto;
      }

      /* Spotify card mobile */
      .spotify-card {
        right: 16px !important;
        bottom: 90px !important;
        left: 16px !important;
        width: auto !important;
      }
    }

    @media (max-width: 480px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr !important;
      }
    }

    /* Preloader */
    .preloader {
      position: fixed; inset: 0;
      background: var(--bg);
      z-index: 9999;
      display: flex; align-items: center; justify-content: center;
    }

    /* SVG signature draw */
    @keyframes drawSignature {
      from { stroke-dashoffset: 2000; opacity: 0.2; }
      to { stroke-dashoffset: 0; opacity: 1; }
    }

    /* Magnetic button */
    .magnetic { display: inline-block; }

    /* Grain overlay */
    .grain {
      position: fixed; inset: -200%;
      width: 400%; height: 400%;
      pointer-events: none; z-index: 1;
      opacity: 0.035;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      animation: grain 0.5s steps(1) infinite;
    }
    @keyframes grain {
      0%, 100% { transform: translate(0, 0); }
      10% { transform: translate(-2%, -3%); }
      20% { transform: translate(3%, 2%); }
      30% { transform: translate(-1%, 4%); }
      40% { transform: translate(4%, -1%); }
      50% { transform: translate(-3%, 1%); }
      60% { transform: translate(2%, -4%); }
      70% { transform: translate(-4%, 3%); }
      80% { transform: translate(1%, -2%); }
      90% { transform: translate(-2%, 4%); }
    }

    /* Hide custom cursor on mobile */
    @media (max-width: 768px) {
      #cursor-dot, #cursor-ring { display: none !important; }
    }

    /* Line clamp */
    .line { display: block; overflow: hidden; }
  `}</style>
);

// ─── CURSOR ───────────────────────────────────────────────────────────────────

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`;
      }
    };

    const onHoverIn = () => setHovered(true);
    const onHoverOut = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onHoverIn);
      el.addEventListener("mouseleave", onHoverOut);
    });

    let raf;
    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.08;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.08;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={cursorRef} style={{
        position: "fixed", top: 0, left: 0, width: 12, height: 12,
        borderRadius: "50%", background: "var(--accent)",
        pointerEvents: "none", zIndex: 99999,
        transition: "width 0.2s, height 0.2s, background 0.2s",
      }} />
      <div id="cursor-ring" ref={followerRef} style={{
        position: "fixed", top: 0, left: 0,
        width: hovered ? 60 : 40, height: hovered ? 60 : 40,
        borderRadius: "50%",
        border: `1px solid rgba(200,169,110,${hovered ? 0.8 : 0.3})`,
        pointerEvents: "none", zIndex: 99998,
        transition: "width 0.3s, height 0.3s, border-color 0.3s",
      }} />
    </>
  );
};

// ─── PRELOADER ────────────────────────────────────────────────────────────────

const Preloader = ({ onComplete }) => {
  const [phase, setPhase] = useState("draw"); // draw → shatter → done

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("shatter"), 2200);
    const t2 = setTimeout(() => { setPhase("done"); onComplete(); }, 3200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onComplete]);

  const fragments = Array.from({ length: 24 }, (_, i) => i);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Signature SVG drawn via stroke animation */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: phase === "shatter" ? 1.15 : 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            {/* Signature text (fallback for SVG) */}
            <motion.div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 10vw, 7rem)",
                fontWeight: 300,
                fontStyle: "italic",
                color: "var(--accent)",
                letterSpacing: "-0.02em",
                position: "relative",
                zIndex: 2,
              }}
              animate={phase === "shatter" ? { opacity: 0, scale: 1.3, filter: "blur(20px)" } : {}}
              transition={{ duration: 0.5 }}
            >
              Souvik
            </motion.div>

            {/* Shatter fragments */}
            {phase === "shatter" && fragments.map(i => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
                animate={{
                  opacity: 0,
                  x: (Math.random() - 0.5) * 600,
                  y: (Math.random() - 0.5) * 400,
                  scale: Math.random() * 0.5,
                  rotate: (Math.random() - 0.5) * 360,
                }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  position: "absolute",
                  width: Math.random() * 60 + 10,
                  height: Math.random() * 60 + 10,
                  background: `rgba(200,169,110,${Math.random() * 0.4 + 0.1})`,
                  borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                  backdropFilter: "blur(2px)",
                  clipPath: `polygon(${Math.random()*50}% 0%, 100% ${Math.random()*50}%, ${50+Math.random()*50}% 100%, 0% ${50+Math.random()*50}%)`,
                  zIndex: 1,
                }}
              />
            ))}
          </motion.div>

          {/* Loading counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "shatter" ? 0 : 1 }}
            style={{
              position: "absolute", bottom: "12vh",
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              color: "var(--muted)", letterSpacing: "0.3em",
            }}
          >
            LOADING PORTFOLIO
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── NAVIGATION ───────────────────────────────────────────────────────────────

const Nav = ({ visible }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -80, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "24px 40px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "background 0.4s, border-color 0.4s",
      }}
    >
      <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontStyle: "italic", color: "var(--accent)", fontWeight: 300 }}>
        SM
      </div>
      <div style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
        {NAV_LINKS.map(link => (
          <motion.a
            key={link}
            href={`#${link.toLowerCase()}`}
            whileHover={{ color: "var(--accent)" }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.72rem",
              color: "var(--muted)", letterSpacing: "0.12em",
              textDecoration: "none", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
          >
            {link}
          </motion.a>
        ))}
        <motion.a
          href="https://drive.google.com/file/d/1TT8yKIxCNr94h_04dBTR-mwi1HHLEt-K/view"
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: "var(--bg)", background: "var(--accent)",
            padding: "8px 20px", borderRadius: "2px",
            letterSpacing: "0.1em", textTransform: "uppercase",
            textDecoration: "none",
          }}
        >
          Resume ↗
        </motion.a>
      </div>
    </motion.nav>
  );
};

// ─── IMAGE TRAIL ──────────────────────────────────────────────────────────────

const ImageTrail = () => {
  // Use abstract CSS art since we can't load files
  const colors = [
    ["#c8a96e", "#1a1208"],
    ["#7eb8c9", "#081218"],
    ["#9b8ec4", "#100818"],
    ["#c46e7e", "#180810"],
    ["#6ec49b", "#081810"],
  ];

  const [images, setImages] = useState([]);
  const lastPos = useRef({ x: 0, y: 0 });
  const idRef = useRef(0);

  const onMouseMove = useCallback((e) => {
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) return;
    lastPos.current = { x: e.clientX, y: e.clientY };

    const id = ++idRef.current;
    const color = colors[id % colors.length];
    const rotate = (Math.random() - 0.5) * 30;
    const size = 80 + Math.random() * 60;

    setImages(prev => [...prev.slice(-6), {
      id, x: e.clientX, y: e.clientY, color, rotate, size,
    }]);

    setTimeout(() => {
      setImages(prev => prev.filter(img => img.id !== id));
    }, 1200);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [onMouseMove]);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 5 }}>
      {images.map(img => (
        <motion.div
          key={img.id}
          initial={{ opacity: 0, scale: 0.6, rotate: img.rotate - 10 }}
          animate={{ opacity: 0.7, scale: 1, rotate: img.rotate }}
          exit={{ opacity: 0, scale: 1.2, y: -30 }}
          style={{
            position: "fixed",
            left: img.x - img.size / 2,
            top: img.y - img.size / 2,
            width: img.size,
            height: img.size,
            borderRadius: "4px",
            background: `linear-gradient(135deg, ${img.color[0]}22, ${img.color[1]})`,
            border: `1px solid ${img.color[0]}44`,
            backdropFilter: "blur(8px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          transition={{ duration: 0.3 }}
        >
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            color: img.color[0], opacity: 0.6, fontStyle: "italic",
          }}>
            {["◈", "⬡", "◉", "⟁", "⊞"][img.id % 5]}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ─── SPOTIFY NOW PLAYING ──────────────────────────────────────────────────────

const SONG = {
  title: "This Is Who I Am",
  artist: "Celeste",
  src: "/theme.mp3",
};

const SpotifyWidget = () => {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [visible, setVisible] = useState(false);
  const audioRef = useRef(null);

  // Create audio element once
  useEffect(() => {
    const audio = new Audio(SONG.src);
    audio.preload = "metadata";
    audioRef.current = audio;

    audio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(audio.duration));
    });
    audio.addEventListener("timeupdate", () => {
      setProgress(Math.floor(audio.currentTime));
    });
    audio.addEventListener("ended", () => {
      setPlaying(false);
      setProgress(0);
    });

    const t = setTimeout(() => setVisible(true), 2800);

    return () => {
      audio.pause();
      audio.src = "";
      clearTimeout(t);
    };
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {});
    }
  };

  const scrub = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const newTime = (x / rect.width) * duration;
    audio.currentTime = newTime;
    setProgress(Math.floor(newTime));
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  const pct = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="spotify-card"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            bottom: 32, right: 32,
            width: 280, zIndex: 500,
            background: "rgba(12,12,12,0.92)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "16px",
            backdropFilter: "blur(24px)",
            boxShadow: "0 8px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(200,169,110,0.06)",
          }}
        >
          {/* Header */}
          <div style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginBottom: "14px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
              </svg>
              <span style={{
                fontFamily: "var(--font-mono)", fontSize: "0.6rem",
                color: playing ? "#1DB954" : "var(--muted)",
                letterSpacing: "0.15em", textTransform: "uppercase",
                transition: "color 0.3s",
              }}>
                {playing ? "Now Playing" : "Paused"}
              </span>
            </div>

            {/* Animated equaliser bars */}
            <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: 14 }}>
              {[1, 2, 3, 4].map(i => (
                <motion.div
                  key={i}
                  animate={playing ? {
                    height: ["3px", `${7 + i * 2}px`, "3px"],
                  } : { height: "3px" }}
                  transition={{
                    duration: 0.45 + i * 0.12,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.08,
                  }}
                  style={{ width: 3, background: "#1DB954", borderRadius: 2 }}
                />
              ))}
            </div>
          </div>

          {/* Song info row */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            {/* Album art */}
            <div style={{
              width: 44, height: 44, borderRadius: "6px", flexShrink: 0,
              overflow: "hidden",
              boxShadow: playing ? "0 0 16px rgba(29,185,84,0.25)" : "none",
              transition: "box-shadow 0.4s",
              border: "1px solid rgba(255,255,255,0.08)",
            }}>
              <motion.img
                src="/theme.jpeg"
                alt="Album art"
                animate={playing ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
            </div>

            {/* Title + artist */}
            <div style={{ overflow: "hidden", flex: 1 }}>
              <div style={{
                fontFamily: "var(--font-sans)", fontSize: "0.78rem",
                fontWeight: 600, color: "var(--text)",
                whiteSpace: "nowrap", overflow: "hidden",
                textOverflow: "ellipsis", lineHeight: 1.3,
              }}>
                {SONG.title}
              </div>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.62rem",
                color: "var(--muted)", marginTop: "3px",
              }}>
                {SONG.artist}
              </div>
            </div>

            {/* Play / Pause button */}
            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.88 }}
              onClick={togglePlay}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: playing ? "#1DB954" : "rgba(255,255,255,0.12)",
                border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "background 0.25s",
                color: playing ? "#000" : "#fff",
                fontSize: playing ? "0.55rem" : "0.75rem",
                paddingLeft: playing ? 0 : "2px",
              }}
            >
              {playing ? "❚❚" : "▶"}
            </motion.button>
          </div>

          {/* Progress bar — clickable scrubber */}
          <div>
            <div
              onClick={scrub}
              style={{
                width: "100%", height: 4,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 2, cursor: "pointer",
                marginBottom: "6px", position: "relative",
              }}
            >
              <div style={{
                height: "100%", borderRadius: 2,
                background: "linear-gradient(to right, #1DB954, #1ed760)",
                width: `${pct}%`,
                transition: "width 0.8s linear",
              }} />
            </div>
            <div style={{
              display: "flex", justifyContent: "space-between",
              fontFamily: "var(--font-mono)", fontSize: "0.58rem",
              color: "rgba(255,255,255,0.22)",
            }}>
              <span>{fmt(progress)}</span>
              <span>{duration > 0 ? fmt(duration) : "--:--"}</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── HERO ─────────────────────────────────────────────────────────────────────

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const words = ["Architect.", "Builder.", "Craftsman."];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIdx(i => (i + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero-section" style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Background gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 80% 60% at 20% 50%, rgba(200,169,110,0.04) 0%, transparent 70%), radial-gradient(ellipse 60% 80% at 80% 20%, rgba(126,184,201,0.04) 0%, transparent 70%)",
      }} />

      {/* Vertical line */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ delay: 0.5, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", left: "50%", top: 0, bottom: 0,
          width: 1, background: "var(--border)",
          transformOrigin: "top",
        }}
      />

      <motion.div className="container" style={{ y, opacity, position: "relative", zIndex: 10 }}>
        <div style={{ maxWidth: 900 }}>
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-mono)", fontSize: "0.7rem",
              color: "var(--accent)", letterSpacing: "0.3em",
              textTransform: "uppercase", marginBottom: "2rem",
              display: "flex", alignItems: "center", gap: "1rem",
            }}
          >
            <span style={{ display: "block", width: 40, height: 1, background: "var(--accent)" }} />
            Explorer of Ideas. Builder by Nature.
          </motion.div>

          {/* Main headline */}
          <div style={{ overflow: "hidden", marginBottom: "0.5rem" }}>
            <motion.h1
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 7.5rem)",
                fontWeight: 300, lineHeight: 0.95, letterSpacing: "-0.02em",
                color: "var(--text)",
              }}
            >
              Souvik Mahanta
            </motion.h1>
          </div>

          {/* Animated word */}
          <div style={{ overflow: "hidden", marginBottom: "2.5rem", height: "clamp(3rem, 7vw, 6.5rem)", display: "flex", alignItems: "center" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={wordIdx}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6.5rem)",
                  fontWeight: 300, fontStyle: "italic", lineHeight: 0.95,
                  color: "var(--accent)", letterSpacing: "-0.02em",
                }}
              >
                {words[wordIdx]}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            style={{
              fontFamily: "var(--font-sans)", fontSize: "1rem",
              color: "var(--muted)", maxWidth: 520, lineHeight: 1.7,
              marginBottom: "3rem",
            }}
          >
            Backend engineer & AI systems specialist. I build scalable backend infrastructure, autonomous AI agents, and high-performance distributed systems — from multi-agent LLM pipelines to production Go backends.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            style={{ display: "flex", gap: "1.5rem", alignItems: "center", flexWrap: "wrap" }}
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                color: "var(--bg)", background: "var(--accent)",
                padding: "14px 32px", borderRadius: "2px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", display: "inline-block",
              }}
            >
              View Work
            </motion.a>
            <motion.a
              href="https://drive.google.com/file/d/1TT8yKIxCNr94h_04dBTR-mwi1HHLEt-K/view"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, borderColor: "var(--accent)", color: "var(--accent)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                color: "var(--muted)", background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "14px 28px", borderRadius: "2px",
                letterSpacing: "0.1em", textTransform: "uppercase",
                textDecoration: "none", display: "inline-block",
                transition: "all 0.2s",
              }}
            >
              Resume ↗
            </motion.a>
            <motion.a
              href="https://github.com/souvik03-136"
              target="_blank"
              whileHover={{ color: "var(--accent)" }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                color: "var(--muted)", letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none",
                display: "flex", alignItems: "center", gap: "0.5rem",
                transition: "color 0.2s",
              }}
            >
              GitHub ↗
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/souvik-mahanta"
              target="_blank"
              whileHover={{ color: "var(--accent2)" }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.75rem",
                color: "var(--muted)", letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none",
                transition: "color 0.2s",
              }}
            >
              LinkedIn ↗
            </motion.a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          className="hero-stats"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          style={{
            position: "absolute", right: 0, bottom: "-10vh",
            display: "flex", flexDirection: "column", gap: "2rem",
          }}
        >
          {[["3+", "Years Building"], ["5k+", "Users Served"], ["3", "Internships"]].map(([num, label]) => (
            <div key={label} style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "2.5rem", fontWeight: 300, color: "var(--accent)", lineHeight: 1 }}>
                {num}
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em", marginTop: 4 }}>
                {label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: "5vh", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
        }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.2em" }}>SCROLL</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          style={{ width: 1, height: 40, background: "linear-gradient(to bottom, var(--accent), transparent)" }}
        />
      </motion.div>
    </section>
  );
};

// ─── ABOUT ────────────────────────────────────────────────────────────────────

const About = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section id="about" className="section" ref={ref} style={{ position: "relative", overflow: "hidden" }}>
      <div className="container">
        <div className="about-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          {/* Left: Profile visual */}
          <motion.div className="profile-card" style={{ position: "relative" }}>
            {/* Profile image placeholder with 3D tilt */}
            <motion.div
              whileHover={{ rotateY: -5, rotateX: 3, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                width: "100%", aspectRatio: "4/5",
                background: "linear-gradient(135deg, #1a1208, #0f0f0f)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                position: "relative", overflow: "hidden",
                boxShadow: "0 40px 80px rgba(0,0,0,0.6)",
              }}
            >
              {/* Actual profile image */}
              <img
                src={profileImg}
                alt="Souvik Mahanta"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center top",
                  display: "block",
                }}
              />
              {/* Subtle golden overlay at bottom for cinematic depth */}
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)",
                pointerEvents: "none",
              }} />
              {/* Accent glow overlay */}
              <div style={{
                position: "absolute", inset: 0,
                background: "radial-gradient(ellipse at 30% 20%, rgba(200,169,110,0.06) 0%, transparent 60%)",
                pointerEvents: "none",
              }} />
              {/* Decorative border inset */}
              <div style={{
                position: "absolute", inset: "12px",
                border: "1px solid rgba(200,169,110,0.12)",
                borderRadius: "2px",
                pointerEvents: "none",
              }} />
            </motion.div>

            {/* Floating tag */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              style={{
                position: "absolute", bottom: -20, right: -20,
                background: "var(--surface2)", border: "1px solid var(--border)",
                padding: "16px 24px", borderRadius: "2px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", marginBottom: 4 }}>Currently</div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--accent)", fontWeight: 500 }}>AI Health Tech</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>Stealth Startup</div>
            </motion.div>
          </motion.div>

          {/* Right: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                color: "var(--accent)", letterSpacing: "0.3em",
                textTransform: "uppercase", marginBottom: "1.5rem",
                display: "flex", alignItems: "center", gap: "1rem",
              }}>
                <span style={{ display: "block", width: 30, height: 1, background: "var(--accent)" }} />
                About
              </div>

              <h2 style={{
                fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)",
                fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em",
                marginBottom: "2rem", color: "var(--text)",
              }}>
                Driven by curiosity,<br />
                <em style={{ fontStyle: "italic", color: "var(--accent)" }}>built for execution.</em>
              </h2>

              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.95rem",
                color: "var(--muted)", lineHeight: 1.8, marginBottom: "1.5rem",
              }}>
                I'm a B.Tech Computer Science student at VIT Vellore specializing in Blockchain Technology, graduating in 2026. I approach every challenge with a builder's mindset and a craftsman's precision.
              </p>
              <p style={{
                fontFamily: "var(--font-sans)", fontSize: "0.95rem",
                color: "var(--muted)", lineHeight: 1.8, marginBottom: "3rem",
              }}>
                From AI multi-agent systems at Indium Software to high-scale backend infrastructure serving 5,000+ users — I bring structure to chaos and clarity to complexity. Fluent in English, Bengali, Hindi, and elementary German.
              </p>

              <div style={{ display: "flex", gap: "2rem" }}>
                {[["VIT", "B.Tech CSE"], ["2026", "Graduation"], ["Kolkata", "Origin"]].map(([val, label]) => (
                  <div key={label}>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", color: "var(--accent)", fontWeight: 300 }}>{val}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ─── SKILLS ───────────────────────────────────────────────────────────────────

const Skills = () => {
  return (
    <section id="skills" className="section" style={{ background: "var(--surface)" }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
            Technical Stack
          </div>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--text)" }}>
            Engineered <em style={{ fontStyle: "italic", color: "var(--accent)" }}>expertise</em>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
          {SKILLS.map((skill, i) => (
            <motion.div
              key={skill.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.7 }}
              whileHover={{ borderColor: "rgba(200,169,110,0.3)", y: -4 }}
              style={{
                background: "var(--bg)", border: "1px solid var(--border)",
                borderRadius: "4px", padding: "2rem",
                transition: "border-color 0.3s, transform 0.3s",
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "0.65rem",
                color: "var(--accent)", letterSpacing: "0.2em",
                textTransform: "uppercase", marginBottom: "1.5rem",
              }}>
                {skill.label}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {skill.items.map(item => (
                  <motion.span
                    key={item}
                    whileHover={{ background: "rgba(200,169,110,0.15)", color: "var(--accent)" }}
                    style={{
                      fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                      color: "var(--muted)", background: "rgba(255,255,255,0.04)",
                      border: "1px solid var(--border)",
                      padding: "6px 12px", borderRadius: "2px",
                      cursor: "default", transition: "all 0.2s",
                    }}
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── SERVICES ─────────────────────────────────────────────────────────────────

const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-50, 50], [5, -5]));
  const rotateY = useSpring(useTransform(x, [-50, 50], [-5, 5]));

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const onMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.7 }}
      style={{ perspective: 1000 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onMouseEnter={() => setHovered(true)}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          background: hovered ? "linear-gradient(135deg, #141414, #0f0f0f)" : "var(--surface)",
          border: `1px solid ${hovered ? "rgba(200,169,110,0.3)" : "var(--border)"}`,
          borderRadius: "4px", padding: "2.5rem",
          position: "relative", overflow: "hidden",
          transition: "background 0.4s, border-color 0.4s",
          cursor: "default",
        }}
      >
        {/* Animated border glow */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(200,169,110,0.05) 0%, transparent 60%)",
            borderRadius: "4px",
          }} />
        )}

        {/* Corner tag */}
        <div style={{
          position: "absolute", top: 20, right: 20,
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          color: "var(--accent)", letterSpacing: "0.15em",
          opacity: 0.6,
        }}>
          {service.tag}
        </div>

        {/* Icon */}
        <div style={{
          fontFamily: "var(--font-sans)", fontSize: "2rem",
          color: hovered ? "var(--accent)" : "var(--muted)",
          marginBottom: "1.5rem", transition: "color 0.3s",
        }}>
          {service.icon}
        </div>

        <h3 style={{
          fontFamily: "var(--font-sans)", fontSize: "1.1rem",
          fontWeight: 600, color: "var(--text)",
          marginBottom: "1rem", letterSpacing: "-0.01em",
        }}>
          {service.title}
        </h3>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "0.875rem",
          color: "var(--muted)", lineHeight: 1.7,
        }}>
          {service.desc}
        </p>

        {/* Bottom line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute", bottom: 0, left: 0, right: 0,
            height: 2, background: "linear-gradient(to right, var(--accent), transparent)",
            transformOrigin: "left",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Services = () => (
  <section id="services" className="section">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ marginBottom: "5rem" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
          What I Offer
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--text)", maxWidth: 600 }}>
          What I <em style={{ fontStyle: "italic", color: "var(--accent)" }}>build & deliver</em>
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
        {SERVICES.map((service, i) => (
          <ServiceCard key={service.title} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: "default" }}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        style={{
          background: "var(--surface)",
          border: `1px solid ${hovered ? "rgba(200,169,110,0.25)" : "var(--border)"}`,
          borderRadius: "4px", padding: "3rem",
          position: "relative", overflow: "hidden",
          transition: "border-color 0.4s",
          height: "100%", display: "flex", flexDirection: "column",
        }}
      >
        {/* Year + link row */}
        <div style={{
          position: "absolute", top: "2rem", right: "2rem",
          display: "flex", alignItems: "center", gap: "1rem",
        }}>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--muted)", letterSpacing: "0.1em",
          }}>
            {project.year}
          </div>
          <motion.a
            href={project.link}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.1, color: "var(--accent)" }}
            whileTap={{ scale: 0.95 }}
            title="View Project"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: "50%",
              border: "1px solid rgba(200,169,110,0.3)",
              color: "var(--muted)", textDecoration: "none",
              fontSize: "0.85rem", cursor: "pointer",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onClick={e => e.stopPropagation()}
          >
            ↗
          </motion.a>
        </div>

        {/* Index */}
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "3.5rem",
          color: "rgba(200,169,110,0.1)", fontWeight: 300,
          lineHeight: 1, marginBottom: "1.5rem",
        }}>
          {String(index + 1).padStart(2, "0")}
        </div>

        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--accent)", letterSpacing: "0.15em", marginBottom: "0.5rem" }}>
          {project.subtitle}
        </div>

        <h3 style={{
          fontFamily: "var(--font-sans)", fontSize: "1.5rem",
          fontWeight: 700, color: "var(--text)",
          marginBottom: "1.25rem", letterSpacing: "-0.02em",
        }}>
          {project.name}
        </h3>

        <p style={{
          fontFamily: "var(--font-sans)", fontSize: "0.875rem",
          color: "var(--muted)", lineHeight: 1.75,
          marginBottom: "2rem", flex: 1,
        }}>
          {project.desc}
        </p>

        {/* Metric callout */}
        <div style={{
          background: "rgba(200,169,110,0.08)", border: "1px solid rgba(200,169,110,0.15)",
          borderRadius: "2px", padding: "10px 16px",
          fontFamily: "var(--font-mono)", fontSize: "0.7rem",
          color: "var(--accent)", marginBottom: "2rem",
          display: "inline-block",
        }}>
          ↑ {project.metric}
        </div>

        {/* Tags + view link */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontFamily: "var(--font-mono)", fontSize: "0.65rem",
              color: "var(--muted)", background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border)",
              padding: "4px 10px", borderRadius: "2px",
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom CTA link */}
        <motion.a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.25 }}
          style={{
            marginTop: "2rem",
            display: "inline-flex", alignItems: "center", gap: "0.5rem",
            fontFamily: "var(--font-mono)", fontSize: "0.7rem",
            color: "var(--accent)", textDecoration: "none",
            letterSpacing: "0.08em", textTransform: "uppercase",
          }}
        >
          View Project <span>→</span>
        </motion.a>

        {/* Glow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0 }}
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 100%, rgba(200,169,110,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => (
  <section id="projects" className="section" style={{ background: "var(--surface)" }}>
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginBottom: "5rem" }}
      >
        <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "1rem" }}>
          Selected Work
        </div>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300, letterSpacing: "-0.02em", color: "var(--text)" }}>
          Projects that <em style={{ fontStyle: "italic", color: "var(--accent)" }}>speak louder</em>
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))", gap: "2rem" }}>
        {PROJECTS.map((p, i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </div>
  </section>
);

// ─── EXPERIENCE MARQUEE ───────────────────────────────────────────────────────

const Marquee = () => {
  const items = ["Go", "Python", "PyTorch", "LangGraph", "PostgreSQL", "Kubernetes", "Docker", "Prometheus", "ONNX", "MLflow", "LangChain", "RabbitMQ"];

  return (
    <div style={{
      padding: "3rem 0", overflow: "hidden",
      borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)",
      background: "var(--bg)",
    }}>
      <motion.div
        animate={{ x: [0, "-50%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: "4rem", width: "max-content" }}
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: "var(--font-display)", fontSize: "1.5rem",
            fontStyle: "italic", fontWeight: 300,
            color: i % 4 === 0 ? "var(--accent)" : "rgba(240,237,232,0.15)",
            whiteSpace: "nowrap",
          }}>
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── CONTACT ──────────────────────────────────────────────────────────────────

const Contact = () => (
  <section id="contact" className="section">
    <div className="container">
      <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: "var(--accent)", letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "2rem" }}>
            Let's Build
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 300, letterSpacing: "-0.02em", color: "var(--text)",
            lineHeight: 1.05, marginBottom: "2rem",
          }}>
            Have a project<br />
            <em style={{ fontStyle: "italic", color: "var(--accent)" }}>in mind?</em>
          </h2>

          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "1rem",
            color: "var(--muted)", lineHeight: 1.7, marginBottom: "3.5rem",
          }}>
            I'm available for consulting, freelance projects, and full-time opportunities. Let's connect and build something meaningful.
          </p>

          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
            <motion.a
              href="mailto:souvikmahanta2003@gmail.com"
              whileHover={{ scale: 1.02, boxShadow: "0 0 40px rgba(200,169,110,0.2)" }}
              whileTap={{ scale: 0.98 }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.8rem",
                color: "var(--bg)", background: "var(--accent)",
                padding: "18px 48px", borderRadius: "2px",
                letterSpacing: "0.12em", textTransform: "uppercase",
                textDecoration: "none", display: "inline-block",
              }}
            >
              souvikmahanta2003@gmail.com
            </motion.a>

            <div style={{ display: "flex", gap: "3rem" }}>
              {[
                ["GitHub", "https://github.com/souvik03-136"],
                ["LinkedIn", "https://linkedin.com/in/souvik-mahanta"],
                ["LeetCode", "https://leetcode.com/u/TESTKING/"],
              ].map(([label, url]) => (
                <motion.a
                  key={label}
                  href={url} target="_blank"
                  whileHover={{ color: "var(--accent)" }}
                  style={{
                    fontFamily: "var(--font-mono)", fontSize: "0.7rem",
                    color: "var(--muted)", letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                >
                  {label} ↗
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer style={{ background: "var(--surface)", borderTop: "1px solid var(--border)" }}>

    {/* Main footer grid */}
    <div className="container" style={{ padding: "5rem 40px 3rem" }}>
      <div className="footer-grid" style={{
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "3rem",
      }}>

        {/* Brand col */}
        <div className="footer-brand">
          <div style={{
            fontFamily: "var(--font-display)", fontSize: "2rem",
            fontStyle: "italic", color: "var(--accent)", fontWeight: 300,
            marginBottom: "1rem",
          }}>
            Souvik Mahanta
          </div>
          <p style={{
            fontFamily: "var(--font-sans)", fontSize: "0.85rem",
            color: "var(--muted)", lineHeight: 1.7, maxWidth: 280,
            marginBottom: "1.5rem",
          }}>
            Backend engineer & AI systems specialist. Building scalable infrastructure, autonomous agents, and distributed systems that work at scale.
          </p>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--muted)", letterSpacing: "0.1em",
          }}>
            Kolkata, India 🇮🇳
          </div>
        </div>

        {/* Links col */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--accent)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            Navigation
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {["About", "Skills", "Services", "Projects", "Contact"].map(link => (
              <motion.a
                key={link}
                href={`#${link.toLowerCase()}`}
                whileHover={{ color: "var(--accent)", x: 4 }}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem",
                  color: "var(--muted)", textDecoration: "none",
                  transition: "color 0.2s",
                }}
              >
                {link}
              </motion.a>
            ))}
          </div>
        </div>

        {/* Connect col */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--accent)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            Connect
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              ["GitHub", "https://github.com/souvik03-136"],
              ["LinkedIn", "https://linkedin.com/in/souvik-mahanta"],
              ["LeetCode", "https://leetcode.com/u/TESTKING/"],
            ].map(([label, url]) => (
              <motion.a
                key={label}
                href={url} target="_blank" rel="noreferrer"
                whileHover={{ color: "var(--accent)", x: 4 }}
                style={{
                  fontFamily: "var(--font-sans)", fontSize: "0.85rem",
                  color: "var(--muted)", textDecoration: "none",
                  display: "flex", alignItems: "center", gap: "0.4rem",
                  transition: "color 0.2s",
                }}
              >
                {label} <span style={{ fontSize: "0.7rem" }}>↗</span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Contact col */}
        <div>
          <div style={{
            fontFamily: "var(--font-mono)", fontSize: "0.65rem",
            color: "var(--accent)", letterSpacing: "0.2em",
            textTransform: "uppercase", marginBottom: "1.5rem",
          }}>
            Contact
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <motion.a
              href="mailto:souvikmahanta2003@gmail.com"
              whileHover={{ color: "var(--accent)" }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                color: "var(--muted)", textDecoration: "none",
                wordBreak: "break-all", lineHeight: 1.5,
                transition: "color 0.2s",
              }}
            >
              souvikmahanta2003@gmail.com
            </motion.a>
            <motion.a
              href="mailto:souvikmahantabusiness2003@gmail.com"
              whileHover={{ color: "var(--accent)" }}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "0.72rem",
                color: "var(--muted)", textDecoration: "none",
                wordBreak: "break-all", lineHeight: 1.5,
                transition: "color 0.2s",
              }}
            >
              souvikmahantabusiness2003@gmail.com
            </motion.a>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom bar */}
    <div style={{ borderTop: "1px solid var(--border)" }}>
      <div className="container" style={{
        padding: "1.5rem 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: "1rem",
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.65rem",
          color: "var(--muted)", letterSpacing: "0.08em",
        }}>
          © 2026 Souvik Mahanta. All rights reserved.
        </div>
        <div style={{
          fontFamily: "var(--font-display)", fontSize: "0.9rem",
          fontStyle: "italic", color: "var(--muted)",
          display: "flex", alignItems: "center", gap: "0.4rem",
        }}>
          Made with <span style={{ color: "#e05c5c", fontSize: "1rem" }}>♥</span> by Souvik Mahanta
        </div>
      </div>
    </div>
  </footer>
);

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const completedRef = useRef(false);

  const handleComplete = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    setLoaded(true);
  }, []);

  // Set page title and favicon — using data URI (no blob, no revocation bug)
  useEffect(() => {
    document.title = "Souvik Mahanta — Backend Engineer & AI Specialist";

    const svgRaw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="10" fill="%23080808"/><text x="50%25" y="54%25" dominant-baseline="middle" text-anchor="middle" font-family="Georgia%2C serif" font-size="26" font-style="italic" font-weight="400" fill="%23c8a96e">SM</text></svg>`;
    const dataURI = `data:image/svg+xml,${svgRaw}`;

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.type = "image/svg+xml";
    link.href = dataURI;
  }, []);

  return (
    <>
      <GlobalStyles />
      <div className="grain" />
      <CustomCursor />
      <Preloader onComplete={handleComplete} />

      <div style={{
        opacity: loaded ? 1 : 0,
        transition: "opacity 0.8s ease",
        pointerEvents: loaded ? "auto" : "none",
      }}>
        <ImageTrail />
        <SpotifyWidget />
        <Nav visible={loaded} />
        <main>
          <Hero />
          <About />
          <Skills />
          <Services />
          <Marquee />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}