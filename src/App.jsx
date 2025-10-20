import React, { useMemo, useState } from "react";
import { Github, Linkedin, Mail, Download, MapPin, ExternalLink, ChevronRight, Calendar, Award, Briefcase, GraduationCap, Rocket, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";

// === Quick personalization ===
// Update the content objects below and hit "Run" to preview.
// You can deploy this instantly to Vercel/Netlify/GitHub Pages.

const DATA = {
  name: "Anshu Tripathi",
  tagline: "MS CS (Data Science) @ UTSA · DevOps | ML | Full‑Stack",
  location: "San Antonio, TX, USA",
  email: "anshu@example.com",
  links: {
    github: "https://github.com/your-username",
    linkedin: "https://www.linkedin.com/in/anshu-tripathi/",
    resume: "#", // Replace with your resume link (e.g., Google Drive or PDF in repo)
  },
  about:
    "Graduate student at UTSA (4.0 GPA) with ~5 years at Accenture (Software Engineer 2) and current DevOps Engineer Intern at SWBC (Swivel). I build reliable CI/CD pipelines, cloud apps, and data‑driven systems. Passionate about AI for social impact, spatial data, and performance engineering.",
  skills: [
    "Python", "Java", "C++", "SQL", "Docker", "Kubernetes", "GitLab CI", "AWS", "Azure",
    "React", "Node.js", "Flask", "TensorFlow", "PyTorch", "XGBoost", "Pandas", "NumPy",
    "ODI", "Oracle EPM/Essbase", "Linux", "Bash",
  ],
  experiences: [
    {
      role: "DevOps Engineer Intern (Co‑op)",
      org: "SWBC (Swivel)",
      period: "May 2025 – Present",
      bullets: [
        "Built Atlassian Forge apps to automate Jira issue creation and secure workflows.",
        "Owned CI/CD pipelines across AWS/Azure; improved deployment reliability and speed.",
        "Integrated secrets, compliance checks, and automated testing gates in pipelines.",
      ],
    },
    {
      role: "Software Engineer 2",
      org: "Accenture (Life Sciences)",
      period: "2019 – 2024",
      bullets: [
        "Led fixes for mission‑critical data integrations (ODI, EPM/Essbase) under tight SLAs.",
        "Automated build/release processes; reduced bugs by 47% via unit tests & CI.",
        "Partnered with client stakeholders to scope enhancements and deliver on time.",
      ],
    },
  ],
  education: [
    {
      program: "M.S., Computer & Information Science (Data Science)",
      school: "The University of Texas at San Antonio",
      period: "Fall 2024 – Present",
      notes: "GPA 4.0; Courses: OS, Algorithms, ML, Cloud Computing, Computer Architecture.",
    },
    {
      program: "B.Tech., Computer Science & Engineering",
      school: "Banasthali Vidyapith, Rajasthan, India",
      period: "2015 – 2019",
      notes: "Represented college/state in Badminton (All India West Zone).",
    },
  ],
  awards: [
    {
      title: "ACM PEARC25 Student Program (Selected)",
      by: "ACM/PEARC",
      year: "2025",
    },
    {
      title: "ISA Annual Scholarship",
      by: "UTSA Indian Student Association",
      year: "2024–25",
    },
  ],
  projects: [
    {
      name: "CloudTask – Task Tracker (MongoDB)",
      description:
        "Full‑stack task management app with authentication, tags, and analytics. Deployed on cloud with CI/CD and infra as code.",
      tech: ["React", "Node", "Express", "MongoDB", "Docker", "GitHub Actions"],
      links: { demo: "#", repo: "#" },
    },
    {
      name: "WakeWell – Circadian Health Recommender",
      description:
        "Analyzed 100k+ samples to model alertness; XGBoost/LightGBM with SHAP for interpretability; interactive visualizations.",
      tech: ["Python", "XGBoost", "LightGBM", "SHAP", "Plotly"],
      links: { demo: "#", repo: "#" },
    },
    {
      name: "GIS Spatial Indexing (QuadTree/R‑Tree/R*‑Tree)",
      description:
        "Built spatial data structures and benchmarks for GeoJSON datasets; visual tooling for queries.",
      tech: ["Python", "GeoJSON", "NumPy", "Matplotlib"],
      links: { demo: "#", repo: "#" },
    },
    {
      name: "DevOps: Forge‑based Jira Issue App",
      description:
        "Atlassian Forge app to streamline ticket creation, approvals, and secure file flows; integrated with AWS.",
      tech: ["TypeScript", "Atlassian Forge", "AWS", "CI/CD"],
      links: { demo: "#", repo: "#" },
    },
  ],
};

// === Small helpers ===
const Section = ({ id, icon: Icon, title, children }) => (
  <section id={id} className="scroll-mt-24 py-12" aria-label={title}>
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6">
        <Icon className="w-5 h-5" aria-hidden />
        <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Chip = ({ children }) => (
  <span className="text-sm px-3 py-1 rounded-full border shadow-sm">{children}</span>
);

// === Main component ===
export default function Portfolio() {
  const [openNav, setOpenNav] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  React.useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);
  const navItems = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#awards", label: "Awards" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
      {/* Decorative animated gradient */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-indigo-300 via-sky-200 to-cyan-200 blur-3xl opacity-60 dark:from-indigo-700 dark:via-sky-700 dark:to-cyan-700 animate-pulse"></div>
        <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-200 via-pink-200 to-rose-200 blur-3xl opacity-60 dark:from-amber-600 dark:via-pink-600 dark:to-rose-600 animate-pulse"></div>
      </div>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:supports-[backdrop-filter]:bg-gray-950/70 border-b dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold flex items-center gap-2">
            <Rocket className="w-5 h-5" aria-hidden />
            <span>Anshu</span>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((n) => (
              <a key={n.href} href={n.href} className="text-sm hover:opacity-80">
                {n.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setIsDark((v) => !v)}
              className="inline-flex items-center gap-2 text-sm border rounded-full px-3 py-1.5 hover:shadow"
              aria-label="Toggle color theme"
              title="Toggle theme"
            >
              {isDark ? (<Sun className="w-4 h-4" />) : (<Moon className="w-4 h-4" />)} {isDark ? 'Light' : 'Dark'}
            </button>
            <a
              href={DATA.links.resume}
              className="inline-flex items-center gap-2 text-sm border rounded-full px-3 py-1.5 hover:shadow"
            >
              <Download className="w-4 h-4" aria-hidden /> Resume
            </a>
          </nav>
          <button
            className="md:hidden p-2 border rounded-lg"
            aria-label="Toggle Menu"
            onClick={() => setOpenNav((v) => !v)}
          >
            <ChevronRight className={`w-5 h-5 transition-transform ${openNav ? "rotate-90" : ""}`} />
          </button>
        </div>
        {openNav && (
          <div className="md:hidden border-t">
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-3">
              {navItems.map((n) => (
                <a key={n.href} href={n.href} className="text-sm" onClick={() => setOpenNav(false)}>
                  {n.label}
                </a>
              ))}
              <a href={DATA.links.resume} className="text-sm" onClick={() => setOpenNav(false)}>
                Download Resume
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <motion.section
        id="home"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-4 pt-12 pb-6"
        aria-label="Intro"
      >
        <div className="grid md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-3">
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">
              {DATA.name}
            </h1>
            <p className="mt-3 text-lg md:text-xl text-gray-700">{DATA.tagline}</p>
            <div className="mt-4 flex flex-wrap gap-3 items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4" aria-hidden /> {DATA.location}
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={DATA.links.github}
                className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 hover:shadow"
              >
                <Github className="w-4 h-4" aria-hidden /> GitHub
              </a>
              <a
                href={DATA.links.linkedin}
                className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 hover:shadow"
              >
                <Linkedin className="w-4 h-4" aria-hidden /> LinkedIn
              </a>
              <a
                href={`mailto:${DATA.email}`}
                className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 hover:shadow"
              >
                <Mail className="w-4 h-4" aria-hidden /> Email
              </a>
            </div>
          </div>
          <div className="md:col-span-2">
            <div className="aspect-square rounded-2xl border shadow-inner flex items-center justify-center">
              <span className="text-6xl" aria-hidden>🧠</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* About */}
      <Section id="about" icon={Briefcase} title="About">
        <p className="text-gray-700 leading-relaxed max-w-4xl">{DATA.about}</p>
      </Section>

      {/* Experience */}
      <Section id="experience" icon={Calendar} title="Experience">
        <div className="space-y-6">
          {DATA.experiences.map((e, i) => (
            <div key={i} className="p-5 border rounded-2xl shadow-sm dark:border-gray-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg md:text-xl font-semibold">{e.role} · {e.org}</h3>
                <span className="text-sm text-gray-600">{e.period}</span>
              </div>
              <ul className="mt-3 list-disc pl-5 text-gray-700 space-y-1">
                {e.bullets.map((b, j) => (
                  <li key={j}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" icon={ExternalLink} title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          {DATA.projects.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
              className="p-5 border rounded-2xl shadow-sm flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-gray-800"
            >
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className="mt-2 text-gray-700">{p.description}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {p.tech.map((t, k) => (
                  <Chip key={k}>{t}</Chip>
                ))}
              </div>
              <div className="mt-4 flex gap-3">
                {p.links.demo && (
                  <a href={p.links.demo} className="text-sm inline-flex items-center gap-1 underline">
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {p.links.repo && (
                  <a href={p.links.repo} className="text-sm inline-flex items-center gap-1 underline">
                    Code <Github className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" icon={Rocket} title="Skills">
        <div className="flex flex-wrap gap-2">
          {DATA.skills.map((s, i) => (
            <Chip key={i}>{s}</Chip>
          ))}
        </div>
      </Section>

      {/* Education */}
      <Section id="education" icon={GraduationCap} title="Education">
        <div className="space-y-6">
          {DATA.education.map((ed, i) => (
            <div key={i} className="p-5 border rounded-2xl shadow-sm dark:border-gray-800">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg md:text-xl font-semibold">{ed.program}</h3>
                <span className="text-sm text-gray-600">{ed.period}</span>
              </div>
              <div className="mt-1 text-gray-700">{ed.school}</div>
              {ed.notes && <div className="mt-2 text-gray-700">{ed.notes}</div>}
            </div>
          ))}
        </div>
      </Section>

      {/* Awards */}
      <Section id="awards" icon={Award} title="Awards & Honors">
        <ul className="space-y-3">
          {DATA.awards.map((a, i) => (
            <li key={i} className="p-5 border rounded-2xl shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{a.title}</div>
                <div className="text-sm text-gray-600">{a.by}</div>
              </div>
              <span className="text-sm text-gray-600">{a.year}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Contact */}
      <Section id="contact" icon={Mail} title="Contact">
        <div className="grid md:grid-cols-2 gap-6 items-start">
          <div className="p-5 border rounded-2xl shadow-sm dark:border-gray-800">
            <h3 className="font-semibold">Get in touch</h3>
            <p className="mt-2 text-gray-700">
              The fastest way to reach me is email. I’m open to internships, co‑ops, and research collaborations.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`mailto:${DATA.email}`} className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 hover:shadow">
                <Mail className="w-4 h-4" /> {DATA.email}
              </a>
              <a href={DATA.links.linkedin} className="inline-flex items-center gap-2 border rounded-xl px-4 py-2 hover:shadow">
                <Linkedin className="w-4 h-4" /> Message on LinkedIn
              </a>
            </div>
          </div>
          <div className="p-5 border rounded-2xl shadow-sm dark:border-gray-800">
            <h3 className="font-semibold">What I’m exploring</h3>
            <ul className="mt-2 list-disc pl-5 text-gray-700 space-y-1">
              <li>Scaling CI/CD for regulated fintech workloads (audit‑ready pipelines).</li>
              <li>LLM agents for HPC/observability (SLURM, ServiceNow, Slack bots).</li>
              <li>Spatial ML and interpretable models for public health data.</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">© {year} {DATA.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href={DATA.links.github} className="inline-flex items-center gap-1 underline">
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a href={DATA.links.linkedin} className="inline-flex items-center gap-1 underline">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a href={`mailto:${DATA.email}`} className="inline-flex items-center gap-1 underline">
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

