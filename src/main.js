import './styles.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const depth = document.querySelector('[data-depth]');
const progress = document.querySelector('.scroll-progress');
const heroVideo = document.querySelector('.hero-video');
const siteHeader = document.querySelector('.site-header');

const syncHeaderState = () => {
  siteHeader?.classList.toggle('is-scrolled', window.scrollY > 36);
};

syncHeaderState();
window.addEventListener('scroll', syncHeaderState, { passive: true });

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
    if (progress) {
      progress.style.transform = `scaleY(${self.progress})`;
    }
  },
});

if (heroVideo) {
  heroVideo.pause();
  heroVideo.currentTime = 0;

  const heroIntro = gsap.timeline({ defaults: { ease: 'power3.out' } });

  heroIntro
    .set('.floating-ideas', { autoAlpha: 0 })
    .set('.floating-ideas span', { y: 14, filter: 'blur(10px)' })
    .set('.hero-video', {
      opacity: 0.18,
      scale: 1.08,
      filter: 'brightness(0.42) contrast(1.16) saturate(1.08)',
    })
    .from('.hero-content .eyebrow', {
      autoAlpha: 0,
      y: 16,
      duration: 0.8,
    })
    .from(
      '.hero-content h1 span',
      {
        autoAlpha: 0,
        y: 40,
        filter: 'blur(16px)',
        duration: 1.05,
        stagger: 0.2,
      },
      '-=0.3',
    )
    .from(
      '.hero-lead',
      {
        autoAlpha: 0,
        y: 18,
        filter: 'blur(8px)',
        duration: 0.8,
      },
      '-=0.45',
    )
    .from(
      '.hero-actions .button',
      {
        autoAlpha: 0,
        y: 14,
        duration: 0.6,
        stagger: 0.08,
      },
      '-=0.3',
    )
    .from(
      '.hero-index',
      {
        autoAlpha: 0,
        x: -18,
        duration: 0.75,
      },
      '-=0.25',
    )
    .call(() => {
      heroVideo.currentTime = 0;
      heroVideo.play().catch(() => {});
    })
    .to(
      '.hero-video',
      {
        opacity: 0.82,
        scale: 1,
        filter: 'brightness(1.04) contrast(1.12) saturate(1.16)',
        duration: 4.8,
        ease: 'power2.out',
      },
      '-=0.1',
    )
    .to(
      '.hero-video',
      {
        opacity: 0.5,
        filter: 'brightness(0.76) contrast(1.12) saturate(1.08)',
        duration: 3.2,
        ease: 'sine.inOut',
      },
      '+=0.6',
    )
    .to(
      '.floating-ideas',
      {
        autoAlpha: 1,
        duration: 1,
      },
      '-=2.1',
    )
    .to(
      '.floating-ideas span',
      {
        y: 0,
        filter: 'blur(0px)',
        duration: 1.1,
        stagger: 0.12,
      },
      '-=2.1',
    );
} else {
  gsap.from('.hero-content > *', {
    autoAlpha: 0,
    y: 24,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out',
  });
}

gsap.to('.hero-video', {
  scale: 1.08,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.utils.toArray('.reveal').forEach((item, index) => {
  ScrollTrigger.create({
    trigger: item,
    start: 'top 84%',
    once: true,
    onEnter: () => {
      window.setTimeout(() => {
        item.classList.add('is-visible');
      }, (index % 5) * 70);
    },
  });
});

gsap.utils.toArray('.index-card, .work-card, .object-card, .service-panel').forEach((item) => {
  gsap.to(item, {
    y: -10,
    ease: 'none',
    scrollTrigger: {
      trigger: item,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.1,
    },
  });
});

gsap.from('.process-copy li', {
  autoAlpha: 0,
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

window.addEventListener('load', () => {
  ScrollTrigger.refresh();
});
