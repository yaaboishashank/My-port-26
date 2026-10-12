import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function usePortfolioMotion(scopeRef, motionEnabled, content) {
  const smootherRef = useRef(null);
  const entered = useRef(false);

  useLayoutEffect(() => {
    if (!motionEnabled) return undefined;
    const media = gsap.matchMedia();
    // Smoothing is optional on desktop. Touch keeps native scrolling.
    media.add('(min-width: 769px) and (pointer: fine)', () => {
      const smoother = ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 0.85,
        smoothTouch: false,
        effects: false,
      });
      smootherRef.current = smoother;
      return () => {
        smoother.kill();
        smootherRef.current = null;
      };
    });

    const context = gsap.context(() => {
      if (!entered.current) {
        gsap.fromTo(
          '.hero .letter',
          { yPercent: 32, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            stagger: 0.045,
            duration: 0.85,
            ease: 'power3.out',
            clearProps: 'transform,opacity',
          },
        );
        entered.current = true;
      }
      gsap.utils.toArray('.reveal-target').forEach((element) => {
        if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;
        gsap.fromTo(
          element,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 92%', once: true },
            clearProps: 'transform,opacity',
          },
        );
      });
    }, scopeRef);

    let alive = true;
    document.fonts?.ready.then(() => {
      if (alive) ScrollTrigger.refresh();
    });
    ScrollTrigger.refresh();
    return () => {
      alive = false;
      context.revert();
      media.revert();
    };
  }, [scopeRef, motionEnabled, content]);

  function navigate(event) {
    const anchor = event.target.closest?.('a[href^="#"]');
    if (
      !anchor ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const id = anchor.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    // Keep keyboard navigation meaningful without fighting the scroll animation.
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.classList.add('scroll-focus');
    target.focus({ preventScroll: true });
    history.replaceState(null, '', `#${id}`);
    if (smootherRef.current && motionEnabled) {
      smootherRef.current.scrollTo(target, true, 'top 88px');
    } else {
      target.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'auto' });
    }
  }
  return { navigate, smootherRef };
}
