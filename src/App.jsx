import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Github, Linkedin, Mail, Download, MapPin, ExternalLink,
  ChevronRight, Award, Briefcase, GraduationCap, Rocket,
  Sun, Moon, Terminal, Database, Cloud, Code2, Menu, X,
  ArrowRight, Star, Layers, Shield
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  name: "Anshu Tripathi",
  tagline: "MS CS (Data Science) · UTSA",
  headline: "Building reliable systems at the intersection of DevOps, ML, and the Cloud.",
  location: "San Antonio, TX",
  email: "anshu.tripathi@my.utsa.edu", 
  links: {
    github: "https://github.com/anshutripathi11",
    linkedin: "https://www.linkedin.com/in/anshutripathi119/",
    resume: "/Anshu_Tripathi_Resume.pdf", 
  },
  about:
    "I'm a graduate student at UTSA (4.0 GPA) with nearly five years of industry experience as a Software Engineer at Accenture, and currently a DevOps Engineer Co-op at SWBC (Swivel). My work sits at the crossroads of cloud infrastructure, ML pipelines, and full-stack development. I'm driven by the idea that robust engineering and interpretable AI can solve real-world problems — from fintech automation to public health analytics.",

  // Skill categories for grouped display
  skillGroups: [
    {
      label: "Languages",
      icon: "Terminal",
      skills: ["Python", "Java", "TypeScript", "C++", "SQL", "Bash"],
    },
    {
      label: "Cloud & DevOps",
      icon: "Cloud",
      skills: ["AWS", "Azure", "Docker", "Kubernetes", "GitLab CI", "GitHub Actions", "Terraform"],
    },
    {
      label: "ML & Data",
      icon: "Database",
      skills: ["TensorFlow", "PyTorch", "XGBoost", "LightGBM", "SHAP", "Pandas", "NumPy", "Plotly"],
    },
    {
      label: "Web & Frameworks",
      icon: "Code2",
      skills: ["React", "Node.js", "Express", "Flask", "REST APIs"],
    },
    {
      label: "Enterprise & Tools",
      icon: "Layers",
      skills: ["Oracle ODI", "Oracle EPM/Essbase", "Atlassian Forge", "Jira", "Linux"],
    },
  ],

  experiences: [
    {
      role: "DevOps Engineer Co-op",
      org: "SWBC · Swivel",
      period: "May 2025 – Present",
      type: "Internship",
      bullets: [
        "Developed Atlassian Forge apps to automate Jira issue creation, approval flows, and secure file workflows — reducing manual ticket overhead by streamlining cross-team handoffs.",
        "Owned end-to-end CI/CD pipelines across AWS and Azure, improving deployment reliability and accelerating release cycles.",
        "Embedded secrets management, compliance gates, and automated testing checkpoints into pipelines for a regulated fintech environment.",
      ],
    },
    {
      role: "Software Engineer 2",
      org: "Accenture · Life Sciences",
      period: "Aug 2019 – Jul 2024",
      type: "Full-time · ~5 years",
      bullets: [
        "Led triage and resolution of mission-critical data integration failures in Oracle ODI and EPM/Essbase systems under tight SLA windows for a major pharmaceutical client.",
        "Automated build and release processes end-to-end; drove a 47% reduction in defect rate through unit test coverage and continuous integration practices.",
        "Collaborated directly with client stakeholders to scope feature enhancements, translate business requirements into technical designs, and deliver on schedule.",
        "Mentored junior engineers and facilitated knowledge transfer across onshore and offshore teams.",
      ],
    },
  ],

  education: [
    {
      program: "M.S., Computer & Information Science — Data Science Track",
      school: "The University of Texas at San Antonio (UTSA)",
      period: "Fall 2024 – Present",
      gpa: "4.0 / 4.0",
      notes: "Relevant coursework: Operating Systems, Algorithm Design, Machine Learning, Cloud Computing, Computer Architecture.",
    },
    {
      program: "B.Tech., Computer Science & Engineering",
      school: "Banasthali Vidyapith, Rajasthan, India",
      period: "2015 – 2019",
      gpa: null,
      notes: "Represented university and state at All India West Zone Badminton Championship.",
    },
  ],

  certifications: [
    { name: "AWS Certified Solutions Architect – Associate", issuer: "Amazon Web Services", year: "2023" },
    { name: "Microsoft Azure Fundamentals (AZ-900)", issuer: "Microsoft", year: "2022" },
  ],

  awards: [
    {
      title: "Selected — ACM PEARC25 Student Program",
      by: "ACM / Practice & Experience in Advanced Research Computing",
      year: "2025",
      note: "Competitive national selection for student researchers at the premier HPC conference.",
    },
    {
      title: "ISA Annual Scholarship",
      by: "UTSA Indian Student Association",
      year: "2024–25",
      note: "Merit-based scholarship awarded to graduate students demonstrating academic excellence.",
    },
    {
      title: "All India West Zone Badminton — University Representative",
      by: "Banasthali Vidyapith / State Association",
      year: "2017–2019",
      note: "Selected to represent college and state in national-level inter-university competition.",
    },
  ],

  projects: [
    {
      name: "CloudTask — Full-Stack Task Management Platform",
      description:
        "Built a full-stack task tracker with user authentication, tag filtering, priority queues, and usage analytics. Deployed on cloud with containerized services, automated CI/CD via GitHub Actions, and infrastructure-as-code.",
      tech: ["React", "Node.js", "Express", "MongoDB", "Docker", "GitHub Actions"],
      links: { demo: "#", repo: "#" },
      highlight: true,
    },
    {
      name: "WakeWell — Circadian Health Recommender",
      description:
        "Analyzed 100k+ physiological samples to model human alertness across circadian cycles. Trained XGBoost and LightGBM ensembles with SHAP-based interpretability and Plotly dashboards for clinician-facing insights.",
      tech: ["Python", "XGBoost", "LightGBM", "SHAP", "Plotly", "Pandas"],
      links: { demo: "#", repo: "#" },
      highlight: true,
    },
    {
      name: "GIS Spatial Indexing — QuadTree / R-Tree / R*-Tree",
      description:
        "Designed and benchmarked spatial data structures for large GeoJSON datasets. Implemented visual query tooling and performance analysis to compare index strategies across real-world geographic data.",
      tech: ["Python", "GeoJSON", "NumPy", "Matplotlib"],
      links: { demo: "#", repo: "#" },
    },
    {
      name: "Forge-Based Jira Automation App",
      description:
        "Atlassian Forge app that streamlines ticket creation, multi-stage approvals, and secure document flows within enterprise Jira environments. Integrated with AWS Lambda for backend processing.",
      tech: ["TypeScript", "Atlassian Forge", "AWS Lambda", "CI/CD"],
      links: { demo: "#", repo: "#" },
    },
  ],

  interests: [
    "Audit-ready CI/CD pipelines for regulated fintech workloads",
    "LLM agents for HPC observability (SLURM, ServiceNow, Slack bots)",
    "Spatial ML and interpretable models for public health data",
  ],
};

// ─── ICON MAP ─────────────────────────────────────────────────────────────────
const ICON_MAP = { Terminal, Cloud, Database, Code2, Layers, Shield };

// ─── HOOKS ───────────────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  return [dark, setDark];
}

function useInView(ref, threshold = 0.15) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return visible;
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(18px)",
        transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Section({ id, title, children, flush = false }) {
  return (
    <section id={id} className="scroll-mt-20 py-16">
      <div className={flush ? "" : "max-w-5xl mx-auto px-6"}>
        {title && (
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

function Pill({ children, accent = false }) {
  return (
    <span
      className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
        accent
          ? "bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950 dark:border-indigo-700 dark:text-indigo-300"
          : "border-gray-200 text-gray-600 dark:border-gray-700 dark:text-gray-400"
      }`}
    >
      {children}
    </span>
  );
}

function Card({ children, className = "", hover = true }) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm ${
        hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all duration-200" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [dark, setDark] = useDarkMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const year = useMemo(() => new Date().getFullYear(), []);
  const [activeSection, setActiveSection] = useState("home");

  // Scrollspy
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const nav = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#education", label: "Education" },
    { href: "#awards", label: "Awards" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-100 font-sans">

      {/* ── Ambient background blobs ── */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-indigo-200/40 dark:bg-indigo-800/20 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-80 h-80 rounded-full bg-sky-200/30 dark:bg-sky-800/20 blur-3xl" />
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-violet-200/30 dark:bg-violet-800/15 blur-3xl" />
      </div>

      {/* ── Nav ── */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400">
            <Rocket className="w-4 h-4" />
            Anshu Tripathi
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(({ href, label }) => {
              const id = href.replace("#", "");
              return (
                <a
                  key={href}
                  href={href}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    activeSection === id
                      ? "text-indigo-600 dark:text-indigo-400 font-medium bg-indigo-50 dark:bg-indigo-950"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDark((v) => !v)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <a
              href={DATA.links.resume}
              className="hidden md:inline-flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" /> Resume
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 py-4 flex flex-col gap-3">
            {nav.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="text-sm text-gray-700 dark:text-gray-300"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
            <a href={DATA.links.resume} className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
              ↓ Download Resume
            </a>
          </div>
        )}
      </header>

      {/* ── Hero ── */}
      <section id="home" className="scroll-mt-20 max-w-6xl mx-auto px-6 pt-20 pb-12">
        <div className="grid md:grid-cols-5 gap-10 items-center">

          {/* Text */}
          <div className="md:col-span-3">
            <div
              style={{ opacity: 1, animation: "fadeUp 0.6s ease both" }}
            >
              <span className="inline-block text-xs font-semibold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 mb-3">
                Available for Internships & Research
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
                {DATA.name}
              </h1>
              <p className="mt-3 text-lg text-indigo-600 dark:text-indigo-400 font-medium">{DATA.tagline}</p>
              <p className="mt-4 text-base md:text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-xl">
                {DATA.headline}
              </p>

              <div className="mt-3 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="w-3.5 h-3.5" /> {DATA.location}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={DATA.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-sm transition-all"
                >
                  <Github className="w-4 h-4" /> GitHub
                </a>
                <a
                  href={DATA.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-sm transition-all"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn
                </a>
                <a
                  href={`mailto:${DATA.email}`}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-gray-500 dark:hover:border-gray-500 hover:shadow-sm transition-all"
                >
                  <Mail className="w-4 h-4" /> Email
                </a>
                <a
                  href={DATA.links.resume}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-4 h-4" /> Resume
                </a>
              </div>

              {/* Quick stats */}
              <div className="mt-9 flex gap-8">
                {[
                  { label: "GPA", value: "4.0" },
                  { label: "Industry years", value: "~5" },
                  { label: "Projects", value: `${DATA.projects.length}+` },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Photo */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-64 md:w-full max-w-xs aspect-square rounded-2xl overflow-hidden border-2 border-indigo-200 dark:border-indigo-800 shadow-xl">
              <img
                {/* src="/Anshu Tripathi.jpg" */}
                src="/anshu.jpeg"
                alt="Anshu Tripathi"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <Section id="about" title="About Me">
        <FadeIn>
          <Card hover={false} className="p-7">
            <div className="flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 shrink-0">
                <Briefcase className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">{DATA.about}</p>
            </div>
            <div className="mt-6 pt-5 border-t border-gray-100 dark:border-gray-800">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
                Currently exploring
              </p>
              <ul className="space-y-1.5">
                {DATA.interests.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ArrowRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </FadeIn>
      </Section>

      {/* ── Experience ── */}
      <Section id="experience" title="Work Experience">
        <div className="space-y-5">
          {DATA.experiences.map((exp, i) => (
            <FadeIn key={i} delay={i * 80}>
              <Card className="p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold">{exp.role}</h3>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{exp.org}</span>
                      <span className="text-gray-300 dark:text-gray-700">·</span>
                      <Pill>{exp.type}</Pill>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{exp.period}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-sm text-gray-600 dark:text-gray-400">
                      <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-indigo-400 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Projects ── */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-5">
          {DATA.projects.map((p, i) => (
            <FadeIn key={i} delay={i * 70}>
              <Card className={`p-6 flex flex-col h-full ${p.highlight ? "ring-1 ring-indigo-200 dark:ring-indigo-800" : ""}`}>
                {p.highlight && (
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 text-indigo-500 fill-indigo-500" />
                    <span className="text-xs font-semibold text-indigo-500 uppercase tracking-wide">Featured</span>
                  </div>
                )}
                <h3 className="font-semibold text-base leading-snug">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => <Pill key={t} accent>{t}</Pill>)}
                </div>
                <div className="mt-4 flex gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                  {p.links.demo && p.links.demo !== "#" && (
                    <a href={p.links.demo} className="text-sm inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400 hover:underline" target="_blank" rel="noreferrer">
                      Live demo <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {p.links.repo && p.links.repo !== "#" && (
                    <a href={p.links.repo} className="text-sm inline-flex items-center gap-1 text-gray-600 dark:text-gray-400 hover:underline" target="_blank" rel="noreferrer">
                      Source <Github className="w-3 h-3" />
                    </a>
                  )}
                  {(p.links.demo === "#" && p.links.repo === "#") && (
                    <span className="text-xs text-gray-400">Links coming soon</span>
                  )}
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Skills ── */}
      <Section id="skills" title="Technical Skills">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {DATA.skillGroups.map((group, i) => {
            const Icon = ICON_MAP[group.icon] || Code2;
            return (
              <FadeIn key={group.label} delay={i * 60}>
                <Card className="p-5">
                  <div className="flex items-center gap-2.5 mb-4">
                    <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950">
                      <Icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <h3 className="font-semibold text-sm">{group.label}</h3>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {group.skills.map((s) => <Pill key={s}>{s}</Pill>)}
                  </div>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </Section>

      {/* ── Education ── */}
      <Section id="education" title="Education">
        <div className="space-y-5">
          {DATA.education.map((ed, i) => (
            <FadeIn key={i} delay={i * 80}>
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950 shrink-0">
                    <GraduationCap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="font-semibold text-base">{ed.program}</h3>
                      <span className="text-sm text-gray-500 whitespace-nowrap">{ed.period}</span>
                    </div>
                    <div className="text-sm text-indigo-600 dark:text-indigo-400 mt-0.5 font-medium">{ed.school}</div>
                    {ed.gpa && (
                      <div className="mt-2">
                        <Pill accent>GPA {ed.gpa}</Pill>
                      </div>
                    )}
                    {ed.notes && (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">{ed.notes}</p>
                    )}
                  </div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Certifications ── */}
      <Section id="certifications" title="Certifications">
        <div className="grid sm:grid-cols-2 gap-4">
          {DATA.certifications.map((cert, i) => (
            <FadeIn key={i} delay={i * 60}>
              <Card className="p-5 flex items-center gap-4">
                <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950 shrink-0">
                  <Shield className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="font-medium text-sm">{cert.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{cert.issuer} · {cert.year}</div>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Awards ── */}
      <Section id="awards" title="Awards & Leadership">
        <div className="space-y-4">
          {DATA.awards.map((a, i) => (
            <FadeIn key={i} delay={i * 60}>
              <Card className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="flex items-start gap-3">
                    <Award className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-medium text-sm">{a.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{a.by}</div>
                      {a.note && <p className="text-xs text-gray-500 mt-1 max-w-xl">{a.note}</p>}
                    </div>
                  </div>
                  <Pill>{a.year}</Pill>
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ── Contact ── */}
      <Section id="contact" title="Get in Touch">
        <div className="grid md:grid-cols-2 gap-5">
          <FadeIn>
            <Card hover={false} className="p-7">
              <h3 className="font-semibold text-base mb-2">Let's connect</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                I'm actively looking for Summer 2026 internships, research collaborations, and full-time
                opportunities in DevOps, ML Engineering, and Cloud. Feel free to reach out — email is
                the fastest way to get in touch.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <a
                  href={`mailto:${DATA.email}`}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:shadow-sm transition-all w-fit"
                >
                  <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  {DATA.email}
                </a>
                <a
                  href={DATA.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:shadow-sm transition-all w-fit"
                >
                  <Linkedin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  Message on LinkedIn
                </a>
                <a
                  href={DATA.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 hover:border-indigo-400 hover:shadow-sm transition-all w-fit"
                >
                  <Github className="w-4 h-4" />
                  github.com/anshutripathi11
                </a>
              </div>
            </Card>
          </FadeIn>
          <FadeIn delay={100}>
            <Card hover={false} className="p-7">
              <h3 className="font-semibold text-base mb-2">Open to</h3>
              <ul className="space-y-2">
                {[
                  "Summer / Fall 2026 Internships & Co-ops",
                  "Research Assistantships (ML, HPC, Systems)",
                  "Open-source collaboration on DevOps tooling",
                  "Networking with engineers and researchers",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <ChevronRight className="w-3.5 h-3.5 mt-0.5 text-indigo-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6">
                <a
                  href={DATA.links.resume}
                  className="inline-flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
                >
                  <Download className="w-4 h-4" /> Download Resume
                </a>
              </div>
            </Card>
          </FadeIn>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© {year} {DATA.name}. Built with React + Tailwind.</p>
          <div className="flex items-center gap-4 text-sm">
            <a href={DATA.links.github} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 inline-flex items-center gap-1">
              <Github className="w-3.5 h-3.5" /> GitHub
            </a>
            <a href={DATA.links.linkedin} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 inline-flex items-center gap-1">
              <Linkedin className="w-3.5 h-3.5" /> LinkedIn
            </a>
            <a href={`mailto:${DATA.email}`} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 inline-flex items-center gap-1">
              <Mail className="w-3.5 h-3.5" /> Email
            </a>
          </div>
        </div>
      </footer>

      {/* Keyframe animation */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}
