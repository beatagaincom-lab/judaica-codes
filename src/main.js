import './styles.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const depth = document.querySelector('[data-depth]');
const progress = document.querySelector('.scroll-progress');
const heroVideo = document.querySelector('.hero-video');

window.addEventListener('pointermove', (event) => {
  if (!depth) return;
  const x = (event.clientX / window.innerWidth - 0.5) * 2;
  const y = (event.clientY / window.innerHeight - 0.5) * 2;
  depth.style.setProperty('--mx', x.toFixed(3));
  depth.style.setProperty('--my', y.toFixed(3));
});

ScrollTrigger.create({
  start: 0,
  end: 'max',
  onUpdate: (self) => {
    if (progress) progress.style.transform = `scaleY(${self.progress})`;
  },
});

if (heroVideo) {
  heroVideo.pause();
  heroVideo.currentTime = 0;

  const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroIntro
    .set('.idea-cloud', { autoAlpha: 0 })
    .set('.idea-cloud span', { y: 14, filter: 'blur(10px)' })
    .set('.hero-video', {
      opacity: 0.12,
      scale: 1.08,
      filter: 'brightness(0.34) contrast(1.18) saturate(1.02)',
    })
    .from('.cinematic-brand', {
      autoAlpha: 0,
      y: 18,
      duration: 0.9,
    })
    .from(
      '.cinematic-copy h1 span',
      {
        autoAlpha: 0,
        y: 42,
        filter: 'blur(18px)',
        duration: 1.15,
        stagger: 0.22,
      },
      '-=0.34',
    )
    .from(
      '.cinematic-copy > p:last-child',
      {
        autoAlpha: 0,
        y: 18,
        filter: 'blur(8px)',
        duration: 0.9,
      },
      '-=0.48',
    )
    .call(() => {
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {});
    })
    .to(
      '.hero-video',
      {
        opacity: 0.86,
        scale: 1,
        filter: 'brightness(1.12) contrast(1.13) saturate(1.18)',
        duration: 5.2,
        ease: 'power2.out',
      },
      '-=0.15',
    )
    .to(
      '.hero-video',
      {
        opacity: 0.54,
        filter: 'brightness(0.78) contrast(1.12) saturate(1.08)',
        duration: 3.4,
        ease: 'sine.inOut',
      },
      '+=0.8',
    )
    .to(
      '.idea-cloud',
      {
        autoAlpha: 1,
        duration: 1.1,
      },
      '-=2.35',
    )
    .to(
      '.idea-cloud span',
      {
        y: 0,
        filter: 'blur(0px)',
        duration: 1.3,
        stagger: 0.16,
      },
      '-=2.35',
    );
} else {
  gsap.from('.hero-copy > *', {
    opacity: 0,
    y: 28,
    duration: 1.05,
    stagger: 0.12,
    ease: 'power3.out',
  });

  gsap.from('.hero-note span', {
    opacity: 0,
    x: 18,
    duration: 0.8,
    stagger: 0.1,
    delay: 0.4,
    ease: 'power2.out',
  });

  gsap.from('.hero-scroll', {
    opacity: 0,
    delay: 0.75,
    duration: 0.9,
    ease: 'power2.out',
  });
}

gsap.to('.hero-video, .hero-bg img', {
  scale: 1.08,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.utils.toArray('.reveal-card').forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 84%',
    once: true,
    onEnter: () => {
      window.setTimeout(() => item.classList.add('is-visible'), (index % 4) * 80);
    },
  });
});

gsap.utils.toArray('.mini-case, .product-grid figure, .service-grid article').forEach((item) => {
  gsap.to(item, {
    y: -16,
    scrollTrigger: {
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.1,
    },
  });
});

gsap.from('.process-copy li', {
  opacity: 0,
  x: 24,
  duration: 0.65,
  stagger: 0.12,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.process',
    start: 'top 62%',
  },
});

gsap.utils.toArray('.process-copy li').forEach((step) => {
  ScrollTrigger.create({
    trigger: step,
    start: 'top 68%',
    end: 'bottom 42%',
    toggleClass: { targets: step, className: 'is-lit' },
  });
});
