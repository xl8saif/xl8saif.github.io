import { useState } from "react";

const navigation = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Expertise", id: "expertise" },
  { label: "Projects", id: "projects" },
  { label: "Languages", id: "languages" },
  { label: "Contact", id: "contact" },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container nav-container">
          <button
            className="brand"
            onClick={() => scrollToSection("home")}
            aria-label="Go to homepage"
          >
            <span className="brand-mark">SU</span>
            <span className="brand-name">Saif Ullah</span>
          </button>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>

          <nav className={`navigation ${menuOpen ? "navigation-open" : ""}`}>
            {navigation.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="nav-contact"
            onClick={() => scrollToSection("contact")}
          >
            Contact
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="container hero-grid">
            <div className="hero-content">
              <p className="eyebrow">
                TRANSLATOR · LOCALIZATION · LANGUAGE TECHNOLOGY
              </p>

              <h1>
                Language connects
                <span> people, cultures and ideas.</span>
              </h1>

              <p className="hero-description">
                Saif Ullah is a multilingual translator and localization
                expert working across Arabic, Urdu, Persian, English,
                Indus Kohistani and Shina, with a focus on language
                technology and digital preservation.
              </p>

              <div className="hero-actions">
                <button
                  className="button button-primary"
                  onClick={() => scrollToSection("projects")}
                >
                  Explore my work
                </button>

                <button
                  className="button button-secondary"
                  onClick={() => scrollToSection("contact")}
                >
                  Get in touch
                </button>
              </div>
            </div>

            <div className="hero-profile">
              <div className="profile-frame">
                <div className="profile-placeholder">
                  <span>SU</span>
                </div>
              </div>

              <div className="profile-caption">
                <strong>Saif Ullah</strong>
                <span>Translator & Localization Expert</span>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="content-section">
          <div className="container">
            <p className="section-label">01 — ABOUT</p>

            <div className="section-heading">
              <h2>Professional language expertise with a cultural mission.</h2>

              <p>
                I work at the intersection of translation, localization,
                multilingual communication and language preservation.
              </p>
            </div>

            <div className="about-grid">
              <div>
                <h3>12+ Years</h3>
                <p>
                  Professional experience across translation,
                  interpretation, localization, LQA and multilingual
                  communication.
                </p>
              </div>

              <div>
                <h3>6 Core Languages</h3>
                <p>
                  Arabic, Urdu, Persian, English, Indus Kohistani and
                  Shina.
                </p>
              </div>

              <div>
                <h3>Language Preservation</h3>
                <p>
                  Dedicated to documenting and digitally preserving
                  under-resourced and endangered languages.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="expertise" className="content-section section-muted">
          <div className="container">
            <p className="section-label">02 — EXPERTISE</p>

            <div className="section-heading">
              <h2>What I do</h2>
            </div>

            <div className="expertise-grid">
              {[
                "Translation",
                "Interpretation",
                "Localization",
                "Game Localization",
                "LQA & Linguistic Testing",
                "MTPE",
                "Subtitling",
                "Language Documentation",
                "Digital Preservation",
                "Language Technology",
                "AI & NLP",
                "Multilingual Content",
              ].map((item, index) => (
                <article className="expertise-card" key={item}>
                  <span>0{index + 1}</span>
                  <h3>{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="content-section">
          <div className="container">
            <p className="section-label">03 — SELECTED WORK</p>

            <div className="section-heading">
              <h2>Projects that define my work.</h2>
            </div>

            <div className="projects-grid">
              <article className="project-card project-featured">
                <span className="project-number">01</span>
                <p>LANGUAGE PRESERVATION</p>
                <h3>Indus Kohistani Digital Preservation</h3>
                <span className="project-line" />
                <p>
                  Digital documentation, Unicode language data,
                  multilingual resources and AI-assisted preservation
                  for Indus Kohistani.
                </p>
              </article>

              <article className="project-card">
                <span className="project-number">02</span>
                <p>LOCALIZATION</p>
                <h3>Saudi Ministry of Hajj & Umrah</h3>
                <span className="project-line" />
                <p>
                  Large-scale English and Arabic to Urdu and Persian
                  translation and localization.
                </p>
              </article>

              <article className="project-card">
                <span className="project-number">03</span>
                <p>GAME LOCALIZATION</p>
                <h3>PUBG MOBILE / World of Wonder</h3>
                <span className="project-line" />
                <p>
                  Urdu localization, terminology, LQA and structured
                  game content handling.
                </p>
              </article>

              <article className="project-card">
                <span className="project-number">04</span>
                <p>LANGUAGE DOCUMENTATION</p>
                <h3>Shina Language Documentation</h3>
                <span className="project-line" />
                <p>
                  Verification and linguistic documentation of
                  Shina-language media and community content.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="languages" className="content-section section-dark">
          <div className="container">
            <p className="section-label">04 — LANGUAGES</p>

            <div className="languages-grid">
              {[
                ["Arabic", "Native"],
                ["Indus Kohistani", "Native"],
                ["Urdu", "Expert"],
                ["English", "Fluent"],
                ["Persian", "Advanced"],
                ["Shina", "Advanced"],
              ].map(([language, level]) => (
                <div className="language-item" key={language}>
                  <h3>{language}</h3>
                  <span>{level}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-content">
            <p className="section-label">05 — CONTACT</p>

            <h2>
              Let's build better communication across languages.
            </h2>

            <a
              className="email-link"
              href="mailto:xl8.saif@gmail.com"
            >
              xl8.saif@gmail.com
            </a>

            <div className="contact-links">
              <a
                href="https://www.linkedin.com/in/xl8saif/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>

              <a
                href="https://www.proz.com/profile/3150554"
                target="_blank"
                rel="noreferrer"
              >
                ProZ
              </a>

              <a
                href="https://www.upwork.com/freelancers/~011ed3711aa3cf98f4"
                target="_blank"
                rel="noreferrer"
              >
                Upwork
              </a>

              <a
                href="https://wa.me/923100989830"
                target="_blank"
                rel="noreferrer"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <span>© {new Date().getFullYear()} Saif Ullah</span>
          <span>Translation · Localization · Language Technology</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
