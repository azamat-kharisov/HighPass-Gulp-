import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function initAnimations() {
  const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  tl.fromTo(
    ".header__menu-img",
    {
      y: -100,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 1,
    },
    0.2
  )
    .fromTo(
      ".header__menu-item",
      {
        y: -100,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
      }
    )
    .fromTo(
      ".header__menu-btn",
      { x: 300, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      0.2
    )
    .fromTo(".works__article", { opacity: 0 }, { opacity: 1, duration: 2 }, 1)
    .fromTo(
      ".works__prev-list li",
      { x: 500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      1
    )
    .fromTo(
      ".works__prev-title",
      { x: 500, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 },
      1
    );

  gsap.set(".about__grid", { opacity: 0, scale: 0 });

  gsap.to(".about__grid", {
    scrollTrigger: {
      trigger: ".about__grid",
      start: "top 100%",
      end: "top 50%",
      scrub: true,
    },
    opacity: 1,
    scale: 1,
    duration: 0.6,
  });

  gsap.set(".projects__item", { scale: 0, opacity: 0 });

  gsap.to(".projects__item", {
    scrollTrigger: {
      trigger: ".projects__item",
      start: "top 110%",
      end: "top 50%",
      scrub: 1,
    },
    scale: 1,
    opacity: 1,
    transformOrigin: "left center",
    stagger: 0.2,
    ease: "power2.out",
    duration: 0.6,
  });

  gsap.set(".footer__container", { opacity: 0, scale: 0 });

  gsap.to(".footer__container", {
    scrollTrigger: {
      trigger: ".contact__block",
      start: "top 90%",
      end: "top 20%",
      scrub: true,
      onEnter: () => {
        setTimeout(() => {
          gsap.to(".footer__container", {
            opacity: 1,
            scale: 1,
            ease: "power2.out",
            duration: 2,
          });
        }, 1000);
      },
    },
  });
}
