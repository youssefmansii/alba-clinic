import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  CalendarCheck,
  ChevronDown,
  Clock3,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Star,
  WandSparkles,
} from "lucide-react";

const phoneNumber = "01107815510";
const whatsappNumber = phoneNumber.startsWith("0") ? `20${phoneNumber.slice(1)}` : phoneNumber;
const whatsappUrl = `https://wa.me/${whatsappNumber}`;
const instagramUrl = "https://www.instagram.com/albadentalclinicc?igsh=djJxOW9jZnl3Nm1o";
const mapUrl =
  "https://maps.app.goo.gl/aaHN8pTVF6VXXpVX7?g_st=ic";

const assets = {
  logo: "/assets/alba-logo.jpeg",
  alignerDetail: "/assets/aligner-detail.jpeg",
  offer: "/assets/aligners-offer.jpeg",
  before: "/assets/before-cleaning.jpeg",
  after: "/assets/after-cleaning.jpeg",
  almost: "/assets/almost-there.jpeg",
  monthOne: "/assets/aligner-month-1.jpeg",
  video: "/assets/clinic-work-video.mp4",
};

function useReveal() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = [...document.querySelectorAll("[data-reveal]")];

    if (reduceMotion) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -64px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);
}

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 18);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary navigation">
      <a className="brand" href="#top" aria-label="Alba Dental Clinic home">
        <img src={assets.logo} alt="Alba Dental Clinic logo" />
        <span>
          <strong>ALBA</strong>
          <small>Dental Clinic</small>
        </span>
      </a>
      <nav className="nav-links" aria-label="Page sections">
        <a href="#services">Services</a>
        <a href="#results">Results</a>
        <a href="#experience">Experience</a>
        <a href="#visit">Visit</a>
      </nav>
      <a className="nav-cta" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`WhatsApp Alba Dental Clinic at ${phoneNumber}`}>
        <Phone size={17} />
        <span>{phoneNumber}</span>
      </a>
    </header>
  );
}

function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const handleMove = (event) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 18;
      const y = ((event.clientY - rect.top) / rect.height - 0.5) * 18;
      heroRef.current.style.setProperty("--tilt-x", `${x.toFixed(2)}px`);
      heroRef.current.style.setProperty("--tilt-y", `${y.toFixed(2)}px`);
    };

    const reset = () => {
      heroRef.current?.style.setProperty("--tilt-x", "0px");
      heroRef.current?.style.setProperty("--tilt-y", "0px");
    };

    const node = heroRef.current;
    node?.addEventListener("pointermove", handleMove);
    node?.addEventListener("pointerleave", reset);
    return () => {
      node?.removeEventListener("pointermove", handleMove);
      node?.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-backdrop" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-kicker">
          <span className="pulse-dot" aria-hidden="true" />
          Premium smile care in Maadi
        </div>
        <h1 id="hero-title">Designed smiles, calmer visits, visible results.</h1>
        <p className="hero-copy">
          Alba Dental Clinic blends clear aligners, cosmetic dentistry, cleaning,
          and whitening with a polished experience built around patient comfort.
        </p>
        <div className="hero-actions" aria-label="Booking actions">
          <a className="button primary magnetic" href={whatsappUrl} target="_blank" rel="noreferrer">
            <Phone size={19} />
            Book by phone
          </a>
          <a className="button secondary magnetic" href={instagramUrl} target="_blank" rel="noreferrer">
            <Instagram size={19} />
            View Instagram
          </a>
        </div>
        <div className="hero-trust" aria-label="Clinic highlights">
          <span>
            <ShieldCheck size={17} />
            Aligner follow-ups
          </span>
          <span>
            <Sparkles size={17} />
            Cosmetic polish
          </span>
          <span onClick={() => window.open(mapUrl, "_blank")}>
            <MapPin size={17} />
            Meds Hub, Maadi
          </span>
        </div>
      </div>

      <div className="hero-showcase" aria-label="Alba Dental Clinic featured work">
        <div className="logo-orbit">
          <img src={assets.logo} alt="Alba Dental Clinic logo" />
        </div>
        <img className="showcase-main" src={assets.alignerDetail} alt="Clear aligner close-up" />
        <div className="floating-result before-after">
          <span>Smile cleaning</span>
          <div>
            <img src={assets.before} alt="Before cleaning" />
            <img src={assets.after} alt="After cleaning" />
          </div>
        </div>
        <div className="floating-result offer-chip">
          <Star size={16} />
          Latest aligner offer
        </div>
      </div>

      <a className="hero-scroll" href="#services" aria-label="Explore services">
        <ChevronDown size={20} />
      </a>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children }) {
  return (
    <div className="section-heading" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function Services() {
  const services = [
    {
      icon: WandSparkles,
      title: "Clear aligners",
      text: "Discreet smile correction with staged progress checks and consultation-led planning.",
    },
    {
      icon: Sparkles,
      title: "Cleaning and whitening",
      text: "A brighter smile presentation with focused cleaning, polishing, and stain removal.",
    },
    {
      icon: ShieldCheck,
      title: "Cosmetic dentistry",
      text: "Natural-looking smile refinements designed around balance, comfort, and confidence.",
    },
  ];

  return (
    <section className="section services" id="services" aria-labelledby="services-title">
      <SectionHeading eyebrow="Signature care" title="A premium dental visit without the cold clinic feeling.">
        The page guides visitors from aspiration to evidence: service clarity, real visual work,
        then fast booking options.
      </SectionHeading>

      <div className="services-grid">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <article className="service-card" key={service.title} data-reveal style={{ "--delay": `${index * 90}ms` }}>
              <span className="service-icon">
                <Icon size={22} />
              </span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label={`WhatsApp about ${service.title}`}>
             
                <ArrowUpRight size={17} />ask about this
              </a>
            </article>
          );
        })}
      </div>

      <div className="offer-panel" data-reveal>
        <div className="offer-copy">
          <p className="eyebrow">Current focus</p>
          <h3>Aligners new offer</h3>
          <p>Use the clinic’s premium black-and-gold campaign as a direct consultation driver.</p>
        </div>
        <img src={assets.offer} alt="Alba Dental Clinic aligners new offer" loading="lazy" />
      </div>
    </section>
  );
}

function Results() {
  const results = useMemo(
    () => [
      { src: assets.alignerDetail, title: "Clear aligner detail", label: "Aligners", wide: true },
      { src: assets.before, title: "Before cleaning", label: "Before" },
      { src: assets.after, title: "After cleaning", label: "After" },
      { src: assets.almost, title: "Almost there", label: "Progress" },
      { src: assets.monthOne, title: "Month 1 progress", label: "Journey" },
    ],
    [],
  );

  return (
    <section className="section results" id="results" aria-labelledby="results-title">
      <SectionHeading eyebrow="Real work" title="Proof that feels immediate, visual, and human.">
        The gallery uses clinical before-and-after images beside social progress moments, so
        visitors see both technical care and patient momentum.
      </SectionHeading>

      <div className="results-grid">
        {results.map((item, index) => (
          <figure
            className={`result-card ${item.wide ? "wide" : ""}`}
            key={item.title}
            data-reveal
            style={{ "--delay": `${index * 70}ms` }}
          >
            <img src={item.src} alt={item.title} loading="lazy" />
            <figcaption>
              <span>{item.label}</span>
              <strong>{item.title}</strong>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="experience" id="experience" aria-labelledby="experience-title">
      <div className="experience-copy" data-reveal>
        <p className="eyebrow">Smile journey</p>
        <h2 id="experience-title">Social proof with movement, not noise.</h2>
        <p>
          Short-form progress content gives the page energy while keeping the interface elegant,
          readable, and easy to act on.
        </p>
        <div className="experience-stats" aria-label="Experience highlights">
          <span>
            <strong>01</strong>
            Consultation
          </span>
          <span>
            <strong>02</strong>
            Treatment plan
          </span>
          <span>
            <strong>03</strong>
            Follow-up care
          </span>
        </div>
      </div>
      <div className="video-shell" data-reveal>
        <video controls muted playsInline preload="metadata" poster={assets.almost}>
          <source src={assets.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
}

function Visit() {
  const contactItems = [
    { icon: MessageCircle, label: "WhatsApp", value: phoneNumber, href: whatsappUrl },
    { icon: Instagram, label: "Instagram", value: "@albadentalclinicc", href: instagramUrl },
    { icon: MapPin, label: "Location", value: "Open map", href: mapUrl },
  ];

  return (
    <section className="visit" id="visit" aria-labelledby="visit-title">
      <div className="visit-inner">
        <div className="visit-copy" data-reveal>
          <p className="eyebrow">Visit Alba</p>
          <h2 id="visit-title">Book your consultation in Maadi.</h2>
          <p className="arabic" lang="ar" dir="rtl">
            العنوان: ٧١ ش النصر – المعادي، أمام التوحيد والنور، وأعلى حلواني تسيباس ومكتبة ألوان، الدور الثاني – مجمع عيادات Meds Hub. مستنينكم نتشرف بزيارتكم.
          </p>
          <a className="button primary visit-button" href={`tel:${phoneNumber}`}>
            <CalendarCheck size={19} />
            Call to book
          </a>
        </div>
        <div className="contact-panel" data-reveal>
          {contactItems.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" key={item.label}>
                <Icon size={19} />
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </a>
            );
          })}
          <div className="hours">
            <Clock3 size={19} />
            <span>Appointments</span>
            <strong>Call for availability</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileBooking() {
  return (
    <div className="mobile-booking" aria-label="Quick booking">
      <a href={`tel:${phoneNumber}`}>
        <Phone size={17} />
        Call now
      </a>
      <a href={instagramUrl} target="_blank" rel="noreferrer">
        <Instagram size={17} />
        Instagram
      </a>
    </div>
  );
}

function App() {
  useReveal();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <Results />
        <Experience />
        <Visit />
      </main>
      <footer className="site-footer">
        <p>ALBA Dental Clinic, Maadi</p>
        <a href="#top">Back to top</a>
      </footer>
      <MobileBooking />
    </>
  );
}

export default App;
