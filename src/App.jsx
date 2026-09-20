import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MENU_ORBIT = "https://dariakimberly4-netizen.github.io/interactive-drink-menu/starbucks-menu-orbit/";

function App() {
  const root = useRef(null);
  const cup = useRef(null);
  const halo = useRef(null);

  const cupImage = `${import.meta.env.BASE_URL}starbucks-drink.jpg`;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;

      gsap.to(".hero-ring-a", { rotate: 360, duration: 28, repeat: -1, ease: "none" });
      gsap.to(".hero-ring-b", { rotate: -360, duration: 18, repeat: -1, ease: "none" });

      gsap.fromTo(
        ".hero-copy > *",
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, stagger: 0.1, ease: "power3.out", delay: 0.15 }
      );

      gsap.fromTo(
        cup.current,
        { y: 70, rotate: -4, opacity: 0, scale: 0.9 },
        { y: 0, rotate: 0, opacity: 1, scale: 1, duration: 1.1, ease: "power3.out", delay: 0.25 }
      );

      gsap.to(cup.current, {
        y: -14,
        rotate: 1.5,
        duration: 3.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      })
      .to(".hero-word", { xPercent: 8, opacity: 0.12 }, 0)
      .to(".hero-copy", { y: -70, opacity: 0.25 }, 0)
      .to(cup.current, { y: -140, scale: 0.82, rotate: 7 }, 0)
      .to(".hero-orbit", { scale: 1.18, opacity: 0.4 }, 0);

      gsap.from(".feature-panel", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.16,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".features",
          start: "top 72%"
        }
      });

      gsap.from(".ritual-copy > *", {
        x: -70,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ritual",
          start: "top 68%"
        }
      });

      gsap.from(".ritual-cup", {
        x: 90,
        rotate: 8,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".ritual",
          start: "top 70%"
        }
      });

      gsap.to(".seasonal-track", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".seasonal",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.from(".orbit-cta-card", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".orbit-cta",
          start: "top 70%"
        }
      });
    }, root);

    return () => ctx.revert();
  }, []);

  const handlePointerMove = (event) => {
    if (!cup.current || !halo.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    gsap.to(cup.current, {
      x: x * 18,
      rotateY: x * 6,
      rotateX: -y * 5,
      duration: 0.45,
      ease: "power2.out"
    });

    gsap.to(halo.current, {
      x: x * -14,
      y: y * -12,
      duration: 0.5,
      ease: "power2.out"
    });
  };

  const handlePointerLeave = () => {
    if (!cup.current || !halo.current) return;
    gsap.to(cup.current, { x: 0, rotateY: 0, rotateX: 0, duration: 0.55, ease: "power2.out" });
    gsap.to(halo.current, { x: 0, y: 0, duration: 0.55, ease: "power2.out" });
  };

  return (
    <div className="site" ref={root}>
      <nav className="topbar">
        <a className="wordmark" href="#home" aria-label="Home">STARBUCKS</a>
        <div className="nav-actions">
          <a href="#featured">Featured</a>
          <a href="#ritual">Your Cup</a>
          <a className="nav-orbit" href={MENU_ORBIT}>Menu Orbit ↗</a>
        </div>
      </nav>

      <main>
        <section
          className="hero"
          id="home"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          <div className="hero-noise" />
          <div className="hero-word">STARBUCKS</div>
          <div className="hero-orbit" ref={halo}>
            <div className="hero-ring hero-ring-a" />
            <div className="hero-ring hero-ring-b" />
          </div>

          <div className="hero-copy">
            <span className="eyebrow">HOME · COFFEE IN MOTION</span>
            <h1>Make the first sip feel like an entrance.</h1>
            <p>
              A cinematic home experience built around one cup, bold movement,
              and a direct path into your existing Menu Orbit.
            </p>
            <div className="hero-buttons">
              <a className="button primary" href={MENU_ORBIT}>Enter Menu Orbit</a>
              <a className="button ghost" href="#featured">Explore Home</a>
            </div>
          </div>

          <div className="cup-stage">
            <div className="cup-shadow" />
            <img ref={cup} src={cupImage} alt="Starbucks drink" className="hero-cup" />
            <span className="cup-label">MOVE YOUR CURSOR</span>
          </div>

          <div className="hero-meta hero-meta-a">CRAFT</div>
          <div className="hero-meta hero-meta-b">CONNECTION</div>
          <div className="hero-meta hero-meta-c">YOUR RITUAL</div>
        </section>

        <section className="features" id="featured">
          <div className="section-heading">
            <span className="eyebrow dark">HOME HIGHLIGHTS</span>
            <h2>Three reasons to keep moving.</h2>
          </div>

          <div className="feature-grid">
            <article className="feature-panel panel-green">
              <span className="panel-index">01</span>
              <h3>One cup. Big entrance.</h3>
              <p>The hero stays focused on the drink instead of becoming another crowded menu.</p>
              <span className="panel-word">SIP</span>
            </article>

            <article className="feature-panel panel-cream">
              <span className="panel-index">02</span>
              <h3>Motion with purpose.</h3>
              <p>Scroll, tilt and orbit effects guide attention instead of decorating every corner.</p>
              <span className="panel-word">MOVE</span>
            </article>

            <article className="feature-panel panel-black">
              <span className="panel-index">03</span>
              <h3>Your Menu Orbit stays intact.</h3>
              <p>The homepage acts as the cinematic doorway. The menu remains its own experience.</p>
              <a href={MENU_ORBIT} className="text-link">Open Menu Orbit ↗</a>
              <span className="panel-word">ENTER</span>
            </article>
          </div>
        </section>

        <section className="ritual" id="ritual">
          <div className="ritual-copy">
            <span className="eyebrow">YOUR CUP · YOUR MOMENT</span>
            <h2>Home should feel like a ritual, not a catalog.</h2>
            <p>
              A quieter section after the hero gives the page room to breathe,
              then sends visitors into the full drink experience when they are ready.
            </p>
            <a href={MENU_ORBIT} className="button light">Choose your drink</a>
          </div>

          <div className="ritual-visual">
            <div className="ritual-disc" />
            <img src={cupImage} alt="Starbucks drink" className="ritual-cup" />
            <div className="ritual-caption">
              <b>ONE HAND FRIENDLY</b>
              <span>Large tap targets · simple navigation</span>
            </div>
          </div>
        </section>

        <section className="seasonal">
          <div className="seasonal-track" aria-hidden="true">
            <span>COFFEE · CRAFT · CONNECTION · HOME · </span>
            <span>COFFEE · CRAFT · CONNECTION · HOME · </span>
          </div>
          <div className="seasonal-center">
            <span className="eyebrow">SEASONAL SPOTLIGHT</span>
            <h2>One featured moment at a time.</h2>
            <p>No endless product grid here. Home can spotlight one mood, one drink, one campaign—then hand off to the Menu Orbit.</p>
          </div>
        </section>

        <section className="orbit-cta">
          <div className="orbit-cta-card">
            <div className="orbit-mini" aria-hidden="true">
              <i /><i /><i />
            </div>
            <span className="eyebrow">READY TO ORDER?</span>
            <h2>The homepage ends where your Menu Orbit begins.</h2>
            <a className="button primary" href={MENU_ORBIT}>Open Menu Orbit</a>
          </div>
        </section>
      </main>

      <footer>
        <span>STARBUCKS HOME CONCEPT</span>
        <span>Unofficial portfolio redesign. Not affiliated with or endorsed by Starbucks.</span>
      </footer>
    </div>
  );
}

export default App;
