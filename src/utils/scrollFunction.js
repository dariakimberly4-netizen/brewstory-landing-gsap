import gsap from "gsap";

export function pinAndAnimate({
  trigger,
  endTrigger,
  pin,
  animations,
  markers = false,
  headerOffset = 0,
}) {
  const end = `top top+=${headerOffset}`;

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: `top top+=${headerOffset}`,
      endTrigger,
      end,
      scrub: true,
      pin,
      pinSpacing: false,
      markers: markers,
      invalidateOnRefresh: true,
    },
  });

  animations.forEach(({ target, vars, position = 0 }) => {
    tl.to(target, vars, position);
  });
  return tl;
}
