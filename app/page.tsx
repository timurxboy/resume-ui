"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Mail, Phone, MapPin, Github, ChevronDown, ChevronRight,
  Server, Database, Cpu, Cloud, GitBranch, Zap, Shield, BarChart3,
  ArrowRight, Circle, CheckCircle2, Globe
} from "lucide-react";

/* ============================================================
   TRANSLATIONS
============================================================ */
const T = {
  en: {
    role: "Backend & Edge AI Engineer",
    tagline: "Designing and delivering real-time systems — from embedded edge devices and computer vision pipelines to scalable backend services and production infrastructure.",
    contact: "Contact",
    skills: "Technical Stack",
    experience: "Experience",
    projectsLabel: "Key Projects",
    metrics: "Impact Metrics",
    career: "Career Timeline",
    present: "Present",
    toggle: "RU",
    metricsData: [
      { value: "3–5×", label: "Faster time-series queries", sub: "PostgreSQL time-based partitioning" },
      { value: "≈0%", label: "Data loss during network issues", sub: "MQTT batching & auto-reconnect" },
      { value: "30–50%", label: "API response time reduction", sub: "SQL optimisation & Redis caching" },
      { value: "10+", label: "Telegram bots deployed", sub: "Aiogram + third-party API integrations" },
    ],
    projects: [
      {
        title: "Traffic Violation Detection System",
        company: "DriveLens AI",
        desc: "End-to-end distributed system for real-time traffic violation detection using edge cameras.",
        arch: [
          { label: "Edge Device\n(Jetson / RPi)", icon: "cpu", color: "#6366f1" },
          { label: "MQTT Broker\n(Batched)", icon: "zap", color: "#8b5cf6" },
          { label: "Kafka\nPipeline", icon: "git", color: "#a855f7" },
          { label: "FastAPI\nBackend", icon: "server", color: "#d946ef" },
          { label: "PostgreSQL\n+ S3", icon: "db", color: "#ec4899" },
          { label: "Notification\nLayer", icon: "shield", color: "#f43f5e" },
        ],
        bullets: [
          "Real-time RTSP stream processing with optimised inference on NVIDIA Jetson & Raspberry Pi",
          "MQTT ingestion with batching and auto-reconnect — near-zero data loss",
          "Kafka event-driven pipeline: media → detection → plate recognition → violation entity",
          "PostgreSQL time-based partitioning for GPS data (3–5× faster queries)",
          "Automated S3 retention (last N days) — reduced storage costs",
          "Snapshot generation, FastAPI services, Ubuntu Server + Supervisor deployment",
        ],
      },
      {
        title: "Real-Time GPS Parking Zone Monitoring",
        company: "DriveLens AI",
        desc: "Geofencing service that detects vehicle entry into parking zones and triggers plate recognition.",
        arch: [
          { label: "GPS\nTelemetry", icon: "cpu", color: "#0ea5e9" },
          { label: "MQTT\nIngestion", icon: "zap", color: "#06b6d4" },
          { label: "Geofence\nService", icon: "shield", color: "#10b981" },
          { label: "Camera\nTrigger", icon: "cpu", color: "#84cc16" },
          { label: "Plate\nRecognition", icon: "git", color: "#f59e0b" },
          { label: "Notification\n+ Storage", icon: "db", color: "#ef4444" },
        ],
        bullets: [
          "Real-time GPS coordinate monitoring and parking zone boundary detection",
          "Trigger-based camera activation for automatic plate recognition",
          "Automated violation identification for unauthorised vehicles",
          "Instant notification delivery to violators",
          "Backend validation and structured data storage",
        ],
      },
      {
        title: "High-Throughput GPS Telemetry Storage",
        company: "DriveLens AI",
        desc: "Scalable time-series storage layer for continuous high-frequency GPS and telemetry ingestion.",
        arch: [
          { label: "Vehicle\nDevices", icon: "cpu", color: "#6366f1" },
          { label: "MQTT\nBroker", icon: "zap", color: "#8b5cf6" },
          { label: "Ingestion\nService", icon: "server", color: "#a855f7" },
          { label: "Partitioned\nPostgreSQL", icon: "db", color: "#d946ef" },
          { label: "Auto\nCleanup", icon: "shield", color: "#ec4899" },
        ],
        bullets: [
          "Automatic monthly partition creation for time-series GPS data",
          "Optimised range queries and composite indexing strategies",
          "Automated partition lifecycle management — zero manual DBA work",
          "Integrated MQTT ingestion pipeline for real-time telemetry streaming",
          "Stable performance under continuous high-frequency inserts",
        ],
      },
    ],
    experiences: [
      {
        company: "DriveLens AI",
        role: "Software & Hardware Engineer",
        period: "Jun 2025 – Present",
        bullets: [
          "Designed full distributed traffic violation detection architecture (edge → broker → backend → storage → notifications)",
          "Built real-time RTSP video processing pipelines with optimised edge inference (Jetson / Raspberry Pi)",
          "Implemented MQTT ingestion with batching and auto-reconnect (near-zero data loss)",
          "Designed PostgreSQL time-based partitioning for GPS & telemetry (3–5× faster queries)",
          "Automated partition lifecycle & retention management",
          "Implemented Kafka-based detection pipelines with auto violation creation",
          "Built real-time geofencing system for parking zone monitoring",
          "Developed FastAPI services for event processing & notifications",
          "Implemented snapshot generation and Amazon S3 media storage",
          "Built Windows Python app for USB media ingestion, S3 upload & storage management",
          "Containerised and deployed production services on Ubuntu Server with Supervisor auto-recovery",
          "Designed and assembled in-vehicle hardware systems (power supply, networking)",
        ],
      },
      {
        company: "Freelance",
        role: "Software Engineer",
        period: "Sep 2024 – May 2025",
        bullets: [
          "Developed and deployed 10+ Telegram bots using Aiogram with third-party API integrations",
          "Designed scalable FastAPI backend systems with clean architecture",
          "Handled high-concurrency workloads using async programming",
          "Implemented JWT authentication and RBAC",
          "Reduced API latency by 30–50% through SQL optimisation & indexing",
          "Implemented Redis caching and Docker-based deployments",
        ],
      },
      {
        company: "UZINFOCOM",
        role: "Backend Developer",
        period: "Mar 2024 – Aug 2024",
        bullets: [
          "Developed scalable Django & DRF backend systems",
          "Implemented Redis caching to significantly reduce database load",
          "Optimised complex SQL queries for analytics APIs",
          "Built secure JWT authentication and RBAC",
          "Integrated Swagger documentation and streamlined team collaboration",
          "Automated recurring processes using cron jobs",
          "Implemented batch Excel processing (openpyxl) for large-scale data imports",
        ],
      },
      {
        company: "Next Level Group",
        role: "Backend Developer",
        period: "Apr 2023 – Feb 2024",
        bullets: [
          "Improved backend performance via SQL query optimisation and caching strategies",
          "Implemented modular and integration testing, reducing production defects",
          "Developed Telegram bots for internal and client-facing workflow automation",
          "Implemented JWT-based authentication and API documentation",
          "Participated in architectural design and task estimation",
        ],
      },
      {
        company: "DY",
        role: "Backend Developer",
        period: "Apr 2022 – Mar 2023",
        bullets: [
          "Integrated microservices using Kafka and RabbitMQ for async communication",
          "Implemented event-driven data processing between distributed services",
          "Developed backend features using Python and Go",
          "Contributed to distributed system scalability and inter-service optimisation",
        ],
      },
    ],
    stack: {
      Backend: ["Python", "FastAPI", "Django", "DRF", "Pydantic", "SQLAlchemy"],
      "Data & Messaging": ["PostgreSQL", "Redis", "MongoDB", "Kafka", "RabbitMQ", "MQTT"],
      "Computer Vision": ["OpenCV", "Ultralytics", "RTSP", "FFmpeg", "Jetson", "Raspberry Pi", "Arduino"],
      "Infrastructure & DevOps": ["Docker", "Docker Compose", "Ubuntu Server", "Linux", "Supervisor", "Amazon S3", "Netplan", "NetworkManager"],
    },
  },
  ru: {
    role: "Backend & Edge AI Инженер",
    tagline: "Проектирую и реализую системы реального времени — от встраиваемых устройств и конвейеров компьютерного зрения до масштабируемых бэкенд-сервисов и продакшн-инфраструктуры.",
    contact: "Контакты",
    skills: "Технический стек",
    experience: "Опыт работы",
    projectsLabel: "Ключевые проекты",
    metrics: "Результаты в цифрах",
    career: "Карьерный путь",
    present: "Наст. вр.",
    toggle: "EN",
    metricsData: [
      { value: "3–5×", label: "Ускорение time-series запросов", sub: "Партиционирование PostgreSQL по времени" },
      { value: "≈0%", label: "Потери данных при сбоях сети", sub: "MQTT батчинг и авто-переподключение" },
      { value: "30–50%", label: "Снижение времени ответа API", sub: "Оптимизация SQL и Redis кэширование" },
      { value: "10+", label: "Развёрнутых Telegram-ботов", sub: "Aiogram + интеграции сторонних API" },
    ],
    projects: [
      {
        title: "Система обнаружения нарушений ПДД",
        company: "DriveLens AI",
        desc: "Распределённая система реального времени для обнаружения нарушений ПДД с помощью граничных камер.",
        arch: [
          { label: "Edge-устройство\n(Jetson / RPi)", icon: "cpu", color: "#6366f1" },
          { label: "MQTT Брокер\n(Батчинг)", icon: "zap", color: "#8b5cf6" },
          { label: "Kafka\nПайплайн", icon: "git", color: "#a855f7" },
          { label: "FastAPI\nБэкенд", icon: "server", color: "#d946ef" },
          { label: "PostgreSQL\n+ S3", icon: "db", color: "#ec4899" },
          { label: "Уведомления", icon: "shield", color: "#f43f5e" },
        ],
        bullets: [
          "Обработка RTSP-потоков в реальном времени с оптимизированным инференсом на NVIDIA Jetson и Raspberry Pi",
          "MQTT-ингестия с батчингом и авто-переподключением — потери данных близки к нулю",
          "Kafka event-driven пайплайн: медиа → детекция → распознавание номеров → создание нарушения",
          "Партиционирование PostgreSQL по времени для GPS-данных (запросы быстрее в 3–5 раз)",
          "Автоматическое S3-хранение (последние N дней) — снижение расходов на хранение",
          "Генерация снапшотов, FastAPI-сервисы, развёртывание на Ubuntu Server + Supervisor",
        ],
      },
      {
        title: "GPS-мониторинг парковочных зон",
        company: "DriveLens AI",
        desc: "Геофенсинг-сервис, определяющий въезд транспорта в парковочные зоны и запускающий распознавание номеров.",
        arch: [
          { label: "GPS\nТелеметрия", icon: "cpu", color: "#0ea5e9" },
          { label: "MQTT\nИнгестия", icon: "zap", color: "#06b6d4" },
          { label: "Геофенсинг\nСервис", icon: "shield", color: "#10b981" },
          { label: "Активация\nКамеры", icon: "cpu", color: "#84cc16" },
          { label: "Распознавание\nНомеров", icon: "git", color: "#f59e0b" },
          { label: "Уведомления\n+ Хранение", icon: "db", color: "#ef4444" },
        ],
        bullets: [
          "Мониторинг GPS-координат и детекция границ парковочных зон в реальном времени",
          "Триггерная активация камер для автоматического распознавания номеров",
          "Автоматическое определение нарушений для неавторизованных ТС",
          "Мгновенная доставка уведомлений нарушителям",
          "Валидация на бэкенде и структурированное хранение данных",
        ],
      },
      {
        title: "Высоконагруженное хранилище GPS-телеметрии",
        company: "DriveLens AI",
        desc: "Масштабируемый слой хранения time-series данных для непрерывной высокочастотной ингестии GPS и телеметрии.",
        arch: [
          { label: "Устройства\nТС", icon: "cpu", color: "#6366f1" },
          { label: "MQTT\nБрокер", icon: "zap", color: "#8b5cf6" },
          { label: "Сервис\nИнгестии", icon: "server", color: "#a855f7" },
          { label: "Партиционированный\nPostgreSQL", icon: "db", color: "#d946ef" },
          { label: "Авто\nОчистка", icon: "shield", color: "#ec4899" },
        ],
        bullets: [
          "Автоматическое создание месячных партиций для time-series GPS-данных",
          "Оптимизированные range-запросы и составные стратегии индексирования",
          "Автоматическое управление жизненным циклом партиций — ноль ручного обслуживания БД",
          "Интегрированный MQTT-пайплайн для стриминга телеметрии в реальном времени",
          "Стабильная производительность при непрерывной высокочастотной записи",
        ],
      },
    ],
    experiences: [
      {
        company: "DriveLens AI",
        role: "Software & Hardware Engineer",
        period: "Июнь 2025 – Наст. вр.",
        bullets: [
          "Спроектировал полную архитектуру распределённой системы обнаружения нарушений (edge → брокер → бэкенд → хранение → уведомления)",
          "Построил пайплайны обработки RTSP-видео с оптимизированным инференсом (Jetson / Raspberry Pi)",
          "Реализовал MQTT-ингестию с батчингом и авто-переподключением (потери данных ≈ 0%)",
          "Спроектировал партиционирование PostgreSQL по времени для GPS и телеметрии (запросы в 3–5 раз быстрее)",
          "Автоматизировал управление жизненным циклом партиций и очисткой данных",
          "Реализовал Kafka-based пайплайны детекции с автосозданием нарушений",
          "Построил геофенсинг-систему реального времени для мониторинга парковочных зон",
          "Разработал FastAPI-сервисы для обработки событий и уведомлений",
          "Реализовал генерацию снапшотов и масштабируемое хранилище медиа в Amazon S3",
          "Разработал Windows-приложение на Python для ингестии медиа с USB, загрузки в S3 и управления хранилищем",
          "Контейнеризировал и развернул продакшн-сервисы на Ubuntu Server с авторестартом через Supervisor",
          "Спроектировал и собрал бортовые аппаратные системы (питание, сетевая конфигурация)",
        ],
      },
      {
        company: "Freelance",
        role: "Software Engineer",
        period: "Сент. 2024 – Май 2025",
        bullets: [
          "Разработал и развернул 10+ Telegram-ботов на Aiogram с интеграциями сторонних API",
          "Проектировал масштабируемые FastAPI бэкенды с чистой архитектурой",
          "Обеспечил высокий параллелизм с помощью асинхронного программирования",
          "Реализовал JWT-аутентификацию и RBAC",
          "Снизил задержки API на 30–50% через оптимизацию SQL и индексирование",
          "Внедрил Redis-кэширование и Docker-деплойменты",
        ],
      },
      {
        company: "UZINFOCOM",
        role: "Backend Developer",
        period: "Март 2024 – Авг. 2024",
        bullets: [
          "Разрабатывал масштабируемые бэкенды на Django & DRF",
          "Внедрил Redis-кэширование, значительно снизив нагрузку на БД",
          "Оптимизировал сложные SQL-запросы для аналитических API",
          "Построил безопасную JWT-аутентификацию и RBAC",
          "Интегрировал Swagger-документацию для командной разработки",
          "Автоматизировал фоновые процессы через cron",
          "Реализовал пакетную обработку Excel (openpyxl) для массового импорта данных",
        ],
      },
      {
        company: "Next Level Group",
        role: "Backend Developer",
        period: "Апр. 2023 – Февр. 2024",
        bullets: [
          "Повысил производительность бэкенда через оптимизацию SQL и кэширование",
          "Внедрил модульное и интеграционное тестирование, снизив количество дефектов в продакшне",
          "Разработал Telegram-ботов для автоматизации внутренних и клиентских рабочих процессов",
          "Реализовал JWT-аутентификацию и API-документацию",
          "Участвовал в архитектурном проектировании и оценке задач",
        ],
      },
      {
        company: "DY",
        role: "Backend Developer",
        period: "Апр. 2022 – Март 2023",
        bullets: [
          "Интегрировал микросервисы через Kafka и RabbitMQ для асинхронной коммуникации",
          "Реализовал event-driven обработку данных между распределёнными сервисами",
          "Разрабатывал бэкенд-функционал на Python и Go",
          "Внёс вклад в масштабируемость распределённой системы и оптимизацию межсервисного взаимодействия",
        ],
      },
    ],
    stack: {
      "Бэкенд": ["Python", "FastAPI", "Django", "DRF", "Pydantic", "SQLAlchemy"],
      "Данные и очереди": ["PostgreSQL", "Redis", "MongoDB", "Kafka", "RabbitMQ", "MQTT"],
      "Компьютерное зрение": ["OpenCV", "Ultralytics", "RTSP", "FFmpeg", "Jetson", "Raspberry Pi", "Arduino"],
      "Инфраструктура & DevOps": ["Docker", "Docker Compose", "Ubuntu Server", "Linux", "Supervisor", "Amazon S3", "Netplan", "NetworkManager"],
    },
  },
};

/* ============================================================
   ARCH DIAGRAM
============================================================ */
function ArchDiagram({ nodes }: { nodes: { label: string; icon: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2 my-6">
      {nodes.map((n: { label: string; icon: string; color: string }, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="rounded-xl px-3 py-2 text-xs font-mono font-semibold text-white text-center whitespace-pre-line leading-tight"
            style={{ background: n.color + "22", border: `1px solid ${n.color}55`, color: n.color }}
          >
            {n.label}
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight size={14} className="text-zinc-600 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */
function ProjectCard({ project }: { project: any }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      layout
      className="border border-zinc-800 rounded-2xl bg-zinc-900/50 backdrop-blur overflow-hidden"
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start p-6 text-left gap-4"
      >
        <div>
          <div className="text-xs font-mono text-indigo-400 mb-1">{project.company}</div>
          <h3 className="text-lg font-semibold text-white">{project.title}</h3>
          <p className="text-sm text-zinc-500 mt-1">{project.desc}</p>
        </div>
        <ChevronDown
          size={18}
          className={`text-zinc-500 flex-shrink-0 mt-1 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 border-t border-zinc-800 pt-4">
              <ArchDiagram nodes={project.arch} />
              <ul className="space-y-2 mt-4">
                {project.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <CheckCircle2 size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ============================================================
   EXPERIENCE CARD
============================================================ */
function ExperienceCard({ exp }: { exp: any }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative pl-8">
      {/* Timeline dot */}
      <div className="absolute left-0 top-2 w-3 h-3 rounded-full bg-indigo-500 border-2 border-black" />
      <div className="border border-zinc-800 rounded-2xl bg-zinc-900/50 overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-5 text-left"
        >
          <div>
            <div className="text-xs font-mono text-indigo-400">{exp.period}</div>
            <h3 className="text-base font-semibold text-white mt-0.5">{exp.company}</h3>
            <p className="text-sm text-zinc-500">{exp.role}</p>
          </div>
          <ChevronDown
            size={16}
            className={`text-zinc-500 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <ul className="px-5 pb-5 border-t border-zinc-800 pt-4 space-y-2">
                {exp.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-400">
                    <ChevronRight size={14} className="text-indigo-400 flex-shrink-0 mt-0.5" />
                    {b}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ============================================================
   STACK BADGE
============================================================ */
function StackBadge({ name }: { name: string }) {
  return (
    <span className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-indigo-500 hover:text-indigo-300 transition-colors cursor-default">
      {name}
    </span>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */
function SectionHeader({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-2xl font-bold text-white">{children}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-indigo-500/40 to-transparent" />
    </div>
  );
}

/* ============================================================
   MAIN COMPONENT
============================================================ */
export default function Resume() {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const t = T[lang];
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const stackCategories = t.stack || T.en.stack;
  const projects = t.projects || T.en.projects;
  const experiences = t.experiences || T.en.experiences;

  return (
    <div className="relative min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden font-sans">
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
      />

      {/* Subtle grid background */}
      <div
        className="fixed inset-0 -z-10 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-600/10 blur-[120px] -z-10 rounded-full" />

      {/* Lang toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setLang(lang === "en" ? "ru" : "en")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 text-sm font-mono font-semibold text-zinc-300 hover:border-indigo-500 hover:text-indigo-300 transition-all"
        >
          <Globe size={14} />
          {t.toggle}
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-20 space-y-20">

        {/* ── HERO ── */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block text-xs font-mono text-indigo-400 border border-indigo-500/30 bg-indigo-500/10 rounded-full px-3 py-1 mb-6">
            {t.role}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-none mb-6">
            Temurbek<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
              Rakhimkuliev
            </span>
          </h1>
          <p className="text-zinc-400 text-base max-w-2xl leading-relaxed mb-8">
            {t.tagline}
          </p>
          <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
            <a href="tel:+998946257395" className="flex items-center gap-2 hover:text-white transition-colors">
              <Phone size={14} className="text-indigo-400" /> +998-94-625-7395
            </a>
            <a href="mailto:timurxboy@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors">
              <Mail size={14} className="text-indigo-400" /> timurxboy@gmail.com
            </a>
            <span className="flex items-center gap-2">
              <Github size={14} className="text-indigo-400" /> @timurxboy
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={14} className="text-indigo-400" /> Tashkent, Uzbekistan
            </span>
          </div>
        </motion.section>

        {/* ── METRICS ── */}
        <section>
          <SectionHeader>{t.metrics}</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(t.metricsData || T.en.metricsData).map((m: { value: string; label: string; sub: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border border-zinc-800 rounded-2xl p-5 bg-zinc-900/50"
              >
                <div className="text-3xl font-extrabold text-indigo-400 font-mono">{m.value}</div>
                <p className="text-sm text-white font-medium mt-2">{m.label}</p>
                <p className="text-xs text-zinc-500 mt-1">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── TECHNICAL STACK ── */}
        <section>
          <SectionHeader>{t.skills}</SectionHeader>
          <div className="space-y-6">
            {Object.entries(stackCategories).map(([cat, items]: [string, string[]]) => (
              <div key={cat}>
                <div className="text-xs font-mono text-zinc-500 uppercase tracking-widest mb-3">{cat}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s: string) => (
                    <StackBadge key={s} name={s} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJECTS ── */}
        <section>
          <SectionHeader>{t.projectsLabel}</SectionHeader>
          <div className="space-y-4">
            {projects.map((p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <ProjectCard project={p} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── EXPERIENCE ── */}
        <section>
          <SectionHeader>{t.experience}</SectionHeader>
          {/* Career timeline line */}
          <div className="relative">
            <div className="absolute left-[5px] top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500/40 to-transparent" />
            <div className="space-y-5">
              {experiences.map((exp: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <ExperienceCard exp={exp} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs text-zinc-700 pt-10 pb-4 font-mono">
          © {new Date().getFullYear()} Temurbek Rakhimkuliev · timurxboy@gmail.com
        </footer>
      </main>
    </div>
  );
}