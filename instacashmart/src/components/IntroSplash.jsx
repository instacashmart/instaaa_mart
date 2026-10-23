import { useEffect, useState } from "react";
import logoImg from "../assets/logo.png";

const INTRO_SEEN_KEY = "cn-intro-seen";

const INTRO_DURATION = 5000;

const INTRO_EXIT_DURATION = 1000;

const INTRO_PARTICLES = Array.from(
  {
    length: 16,
  },
  (A, e) => {
    const t = e >= 12;
    return {
      left: 34 + ((e * 23) % 33),
      top: 18 + ((e * 41) % 62),
      size: t ? 6 + (e % 3) * 2 : 1.5 + (e % 3),
      blur: t ? 3 : 0,
      delay: 1.2 + ((e * 7) % 10) / 10,
      float: 6 + ((e * 11) % 5),
      drift: ((e * 13) % 24) - 12,
    };
  },
);

function shouldPlayIntro() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  try {
    return !sessionStorage.getItem(INTRO_SEEN_KEY);
  } catch {
    return true;
  }
}

export function IntroSplash() {
  const [A, setA] = useState(() => {
    if (shouldPlayIntro()) {
      return "play";
    }
    return "done";
  });
  const t = A === "done";
  useEffect(() => {
    if (t) {
      return;
    }
    const document_documentElement = document.documentElement;
    document_documentElement.classList.add("intro-playing");
    document.body.classList.add("overflow-hidden");
    return () => {
      document_documentElement.classList.remove("intro-playing");
      document.body.classList.remove("overflow-hidden");
    };
  }, [t]);
  useEffect(() => {
    if (A === "play") {
      try {
        sessionStorage.setItem(INTRO_SEEN_KEY, "1");
      } catch {}
      const r = setTimeout(() => setA("exit"), INTRO_DURATION);
      return () => clearTimeout(r);
    }
    if (A === "exit") {
      const r = setTimeout(() => setA("done"), INTRO_EXIT_DURATION);
      return () => clearTimeout(r);
    }
  }, [A]);
  useEffect(() => {
    if (A !== "play") {
      return;
    }
    const r = (a) => ["Escape", "Enter", " "].includes(a.key) && setA("exit");
    document.addEventListener("keydown", r);
    return () => document.removeEventListener("keydown", r);
  }, [A]);
  if (t) {
    return null;
  }
  return (
    <div
      className={`intro ${A === "exit" ? "intro-exit" : ""}`}
      role="presentation"
      onClick={() => setA("exit")}
    >
      <div className="intro-stage">
        <span className="intro-haze" aria-hidden="true" />
        <span className="intro-beam" aria-hidden="true">
          <span />
        </span>
        <span className="intro-pool" aria-hidden="true" />
        <span className="intro-streak" aria-hidden="true" />
        <div className="intro-dust" aria-hidden="true">
          {INTRO_PARTICLES.map((r, a) => (
            <span
              key={a}
              style={{
                left: `${r.left}%`,
                top: `${r.top}%`,
                width: r.size,
                height: r.size,
                filter: r.blur ? `blur(${r.blur}px)` : undefined,
                "--drift": `${r.drift}px`,
                animationDelay: `${r.delay}s, ${r.delay}s`,
                animationDuration: `1.2s, ${r.float}s`,
              }}
            />
          ))}
        </div>
        <div className="intro-lockup">
          <div className="intro-mark-wrap">
            <span className="intro-mark intro-logo">
              <img src={logoImg} alt="InstaCashMart" />
            </span>
            <span className="intro-mark-shadow" aria-hidden="true" />
          </div>
          <p className="intro-sub">Instant Re-Commerce</p>
        </div>
      </div>
      <button
        type="button"
        onClick={(r) => {
          r.stopPropagation();
          setA("exit");
        }}
        className="intro-skip"
      >
        Skip <i className="fa-solid fa-forward text-[9px]" />
      </button>
    </div>
  );
}
