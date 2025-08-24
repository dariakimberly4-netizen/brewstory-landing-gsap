import React from "react";
import heroImage from "../assets/images/image.png";
import stamp from "../assets/images/stamp.png";
import IngredientItem from "./common/IngredientItem";
import { ingredients, timelineData } from "./data";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import TimeLineEntry from "./common/TimeLineEntry";
import { pinAndAnimate } from "../utils/scrollFunction";

const HeroSection = () => {
  useGSAP(() => {
    const onLoadT1 = gsap.timeline({ defaults: { ease: "power2.out" } });

    onLoadT1
      .to(
        ".hero-content h1",
        {
          opacity: 1,
          duration: 1,
        },
        0
      )
      .to(
        ".hero-content h1",
        {
          duration: 0.5,
          color: "var(--sienna)",
          "-webkit-text-stroke": "0px var(--sienna)",
        },
        0
      )
      .from(
        ".hero-content .heading",
        {
          x: 100,
          delay: 0.6,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
        },
        0
      )
      .to(
        ".bottle-wrapper",
        {
          opacity: 1,
          scale: 1,
          delay: 1.5,
          duration: 1.3,
          ease: "power3.out",
        },
        0
      )
      .to(
        ".stamp",
        {
          opacity: 1,
          scale: 1,
          delay: 2,
          duration: 0.2,
          ease: "back.out(3)",
        },
        0
      )
      .to(".stamp", {
        y: "+=5",
        x: "-=3",
        repeat: 2,
        yoyo: true,
        duration: 0.05,
        ease: "power1.inOut",
      });

    function setupScrollAnimations() {
      const headerOffset = 63;

      // Set up ScrollTriggers that only apply to certain viewport sizes using media queries
      ScrollTrigger.matchMedia({
        "(min-width: 769px)": function () {
          pinAndAnimate({
            trigger: ".hero-section",
            endTrigger: ".intro-section",
            pin: ".bottle-wrapper",
            animations: [
              {
                target: ".bottle",
                vars: { rotate: 0, scale: 0.9 },
              },
            ],
            headerOffset,
          });

          pinAndAnimate({
            trigger: ".intro-section",
            endTrigger: ".timeline-entry:nth-child(even)",
            pin: ".bottle-wrapper",
            animations: [
              { target: ".bottle", vars: { rotate: 10, scale: 1 } },
              { target: ".bottle-wrapper", vars: { x: "30%" } },
            ],
            markers: false,
            headerOffset,
          });

          pinAndAnimate({
            trigger: ".timeline-entry:nth-child(even)",
            endTrigger: ".timeline-entry:nth-child(odd)",
            pin: ".bottle-wrapper",
            animations: [
              { target: ".bottle", vars: { rotate: -10, scale: 0.8 } },
              { target: ".bottle-wrapper", vars: { x: "-25%" } },
            ],
            markers: false,
            headerOffset,
          });
        },

        "(max-width: 768px)": function () {
          gsap.to(".bottle-wrapper", {
            opacity: 1,
            duration: 1,
            delay: 0.5,
          });
        },
      });
    }

    setupScrollAnimations(); // Scroll-based animations

    // Final recalculation for all ScrollTriggers
    ScrollTrigger.refresh();
  }, []);

  return (
    <main className="relative">
      {/* hero bottle overlay wrapper */}
      <div className="bottle-wrapper absolute left-0 top-0 w-full h-[25rem] md:h-[30rem] lg:h-[35rem] z-40 flex justify-center items-center opacity-0">
        <img
          src={heroImage}
          alt="Crimson Fermentation Bottle"
          className="bottle bottle-transition absolute left-0 right-0 top-0 w-auto h-full mx-auto"
        />
      </div>

      {/* hero section */}
      <section className="hero-section relative md:min-h-[calc(50rem - 80px)] min-h-[calc(30rem - 80px)] flex items-center justify-center bg-[var(--papaya-whip)] bg-cover p-8 text-center overflow-hidden">
        <div className="hero-content relative z-20">
          <img
            src={stamp}
            alt="Crimson Fermentation Stamp"
            className="stamp stamp-filter absolute md:left-[40%] md:top-60 top-40 left-[40%] right-0 z-50 max-w-[100px] md:max-w-[150px] opacity-0"
          />

          <h1 className="font-veneer font-extralight md:text-[clamp(8rem,16vw,10rem)] text-[18vw] uppercase tracking-wide leading-[0.8] text-stroke text-transparent my-30 lg:mb-40 opacity-0">
            <span className="heading block">Crimson</span>
            <span className="heading block">Fermentation</span>
          </h1>
        </div>
      </section>

      {/* intro section */}
      <section className="intro-section relative bg-[var(----papaya-whip)] border-t border-[var(--tan)] py-4 lg:py-10 lg:px-20 px-10 z-10">
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-16 text-center lg:text-left">
          {/* left side: headings and description */}
          <div className="lg:max-w-[30%] w-full max-w-full flex flex-col justify-center">
            <p className="font-bold text-sm uppercase tracking-widest text-[var(--sienna-2)] mb-3 md:mb-1">
              Our Selection
            </p>
            <h2 className="font-extralight md:text-7xl text-4xl tracking-wide text-[var(--sienna)] mb-5 md:mb-1.5 font-veneer">
              The Heritage Line
            </h2>
            <p className="text-[1.05rem] text-[var(--black)] tracking-wide mb-4 md:mb-2">
              Handcrafted with tradition, our brews celebrate timeless flavors
              and rich heritage. Each bottle tells a story of passion, patience,
              and the finest ingredients, brewed for those who savor
              authenticity.
            </p>
            <a
              href="#"
              className="inline-block mx-auto lg:mx-0 max-w-[130px] text-center px-[0.75rem] py-1.5 border-2 border-[var(--sienna)] bg-[var(--sienna)] text-[var(--papaya-whip)] no-underline font-semibold transition-allv duration-300 ease-in-out  hover:bg-[var(--papaya-whip)] hover:text-[var(--sienna)]"
            >
              Explore All
            </a>
          </div>

          {/* right side: Ingredients list */}
          <div className="lg:max-w-[30%] w-full max-w-full">
            <div className="bg-transparent md:py-1 py-10">
              <h3 className="font-veneer md:text-3xl text-[2.5rem] text-[var(--sienna)] mb-2.5 uppercase lg:text-left tracking-wide">
                Brewed With
              </h3>

              {ingredients.map((item, idx) => (
                <IngredientItem
                  key={idx}
                  amount={item.amount}
                  title={item.title}
                  desciption={item.desciption}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* timeline section */}
      <section className="timelien-section border-t border-[var(--tan)] flex flex-col lg:pl-20 pr-8 px-10 md:pt-40 pt-6 pb-3">
        <h2 className="font-veneer font-extralight text-[4rem] lg:text-[10rem] md:leading-1.5 leading-16 text-center md:text-left text-[var(--sienna)] mb-6 md:mb-16 px-2">
          Our Timeline
        </h2>

        {timelineData.map((item, index) => (
          <TimeLineEntry key={index} {...item} isOdd={index % 2 === 1} />
        ))}
      </section>

      <footer className="bg-[var(--sienna-2)] text-[var(--white)] py-12 px-6 min-h-[50vh]">
        <div className="max-w-[1280px] mx-auto flex flex-wrap justify-between gap-8">
          {/* Logo */}
          <div className="font-veneer text-2xl tracking-wide">BREWSTORY</div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2">
            <a
              href="#"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              Careers
            </a>
            <a
              href="#"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              Terms
            </a>
          </div>

          {/* Contact and Social Links */}
          <div className="flex flex-col gap-2">
            <a
              href="mailto:hello@craftedge.com"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              hello@brewstory.com
            </a>
            <a
              href="#"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[var(--papaya-whip)] text-[0.95rem] hover:text-[var(--tan)] transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default HeroSection;
