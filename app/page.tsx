"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  Mail, Phone, MapPin, Github, ChevronDown, ChevronRight,
  ArrowRight, CheckCircle2, Globe, Sun, Moon,
} from "lucide-react";

/* ============================================================
   TRANSLATIONS
============================================================ */
const T = {
  en: {
    role: "Backend & Edge AI Engineer",
    tagline: "Designing and delivering real-time systems — from embedded edge devices and computer vision pipelines to scalable backend services and production infrastructure.",
    skills: "Technical Stack",
    experience: "Experience",
    projectsLabel: "Key Projects",
    metrics: "Impact Metrics",
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
          { label: "Edge Device\n(Jetson / RPi)", color: "#6366f1" },
          { label: "MQTT Broker\n(Batched)", color: "#8b5cf6" },
          { label: "Kafka\nPipeline", color: "#a855f7" },
          { label: "FastAPI\nBackend", color: "#d946ef" },
          { label: "PostgreSQL\n+ S3", color: "#ec4899" },
          { label: "Notification\nLayer", color: "#f43f5e" },
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
          { label: "GPS\nTelemetry", color: "#0ea5e9" },
          { label: "MQTT\nIngestion", color: "#06b6d4" },
          { label: "Geofence\nService", color: "#10b981" },
          { label: "Camera\nTrigger", color: "#84cc16" },
          { label: "Plate\nRecognition", color: "#f59e0b" },
          { label: "Notification\n+ Storage", color: "#ef4444" },
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
          { label: "Vehicle\nDevices", color: "#6366f1" },
          { label: "MQTT\nBroker", color: "#8b5cf6" },
          { label: "Ingestion\nService", color: "#a855f7" },
          { label: "Partitioned\nPostgreSQL", color: "#d946ef" },
          { label: "Auto\nCleanup", color: "#ec4899" },
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
    skills: "Технический стек",
    experience: "Опыт работы",
    projectsLabel: "Ключевые проекты",
    metrics: "Результаты в цифрах",
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
          { label: "Edge-устройство\n(Jetson / RPi)", color: "#6366f1" },
          { label: "MQTT Брокер\n(Батчинг)", color: "#8b5cf6" },
          { label: "Kafka\nПайплайн", color: "#a855f7" },
          { label: "FastAPI\nБэкенд", color: "#d946ef" },
          { label: "PostgreSQL\n+ S3", color: "#ec4899" },
          { label: "Уведомления", color: "#f43f5e" },
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
          { label: "GPS\nТелеметрия", color: "#0ea5e9" },
          { label: "MQTT\nИнгестия", color: "#06b6d4" },
          { label: "Геофенсинг\nСервис", color: "#10b981" },
          { label: "Активация\nКамеры", color: "#84cc16" },
          { label: "Распознавание\nНомеров", color: "#f59e0b" },
          { label: "Уведомления\n+ Хранение", color: "#ef4444" },
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
          { label: "Устройства\nТС", color: "#6366f1" },
          { label: "MQTT\nБрокер", color: "#8b5cf6" },
          { label: "Сервис\nИнгестии", color: "#a855f7" },
          { label: "Партиционированный\nPostgreSQL", color: "#d946ef" },
          { label: "Авто\nОчистка", color: "#ec4899" },
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
   THEME TOKENS
============================================================ */
type Theme = {
  pageBg: string; pageText: string;
  cardBg: string; cardBorder: string;
  subText: string; mutedText: string;
  badgeBg: string; badgeText: string; badgeBorder: string;
  dotBorder: string; timelineLine: string;
  navBg: string; navBorder: string; navText: string;
  divider: string;
  metricBg: string; metricBorder: string;
  metricValue: string; metricLabel: string; metricSub: string;
  glowColor: string; gridColor: string;
  accent: string; accentLight: string;
};

function getTheme(isDark: boolean): Theme {
  return isDark ? {
    pageBg: "#0a0a0f", pageText: "#f4f4f5",
    cardBg: "rgba(18,18,28,0.8)", cardBorder: "#27272a",
    subText: "#a1a1aa", mutedText: "#52525b",
    badgeBg: "#18182a", badgeText: "#c4c4d4", badgeBorder: "#3a3a5c",
    dotBorder: "#0a0a0f", timelineLine: "#6366f1",
    navBg: "rgba(14,14,20,0.95)", navBorder: "#27272a", navText: "#d4d4d8",
    divider: "rgba(99,102,241,0.35)",
    metricBg: "rgba(18,18,28,0.8)", metricBorder: "#27272a",
    metricValue: "#818cf8", metricLabel: "#f4f4f5", metricSub: "#71717a",
    glowColor: "rgba(99,102,241,0.07)", gridColor: "#6366f1",
    accent: "#6366f1", accentLight: "#818cf8",
  } : {
    pageBg: "#fafafa", pageText: "#111118",
    cardBg: "rgba(255,255,255,0.95)", cardBorder: "#e4e4f0",
    subText: "#52525b", mutedText: "#a1a1aa",
    badgeBg: "#ede9fe", badgeText: "#5b21b6", badgeBorder: "#c4b5fd",
    dotBorder: "#fafafa", timelineLine: "#a5b4fc",
    navBg: "rgba(255,255,255,0.95)", navBorder: "#e4e4f0", navText: "#3f3f46",
    divider: "rgba(124,58,237,0.2)",
    metricBg: "rgba(237,233,254,0.7)", metricBorder: "#ddd6fe",
    metricValue: "#7c3aed", metricLabel: "#111118", metricSub: "#7c6ea0",
    glowColor: "rgba(124,58,237,0.05)", gridColor: "#7c3aed",
    accent: "#7c3aed", accentLight: "#7c3aed",
  };
}

/* ============================================================
   ARCH DIAGRAM
============================================================ */
function ArchDiagram({ nodes, isDark }: { nodes: { label: string; color: string }[]; isDark: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2 my-5">
      {nodes.map((n: { label: string; color: string }, i: number) => (
        <div key={i} className="flex items-center gap-2">
          <div
            className="rounded-xl px-3 py-2 text-xs font-mono font-semibold text-center whitespace-pre-line leading-tight"
            style={{
              background: n.color + (isDark ? "18" : "16"),
              border: `1px solid ${n.color}${isDark ? "44" : "66"}`,
              color: n.color,
            }}
          >
            {n.label}
          </div>
          {i < nodes.length - 1 && (
            <ArrowRight size={13} style={{ color: isDark ? "#3f3f6e" : "#c4b5fd" }} className="flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */
function ProjectCard({ project, isDark, th }: { project: any; isDark: boolean; th: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, backdropFilter: "blur(12px)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-start p-6 text-left gap-4"
      >
        <div>
          <div className="text-xs font-mono mb-1" style={{ color: th.accentLight }}>{project.company}</div>
          <h3 className="text-base font-semibold" style={{ color: th.pageText }}>{project.title}</h3>
          <p className="text-sm mt-1" style={{ color: th.subText }}>{project.desc}</p>
        </div>
        <ChevronDown
          size={17}
          className="flex-shrink-0 mt-1 transition-transform duration-300"
          style={{ color: th.mutedText, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-4" style={{ borderTop: `1px solid ${th.cardBorder}` }}>
              <ArchDiagram nodes={project.arch} isDark={isDark} />
              <ul className="space-y-2 mt-2">
                {project.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: th.subText }}>
                    <CheckCircle2 size={13} className="flex-shrink-0 mt-0.5" style={{ color: th.accentLight }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ============================================================
   EXPERIENCE CARD
============================================================ */
function ExperienceCard({ exp, th }: { exp: any; th: Theme }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative pl-8">
      <div
        className="absolute left-0 top-[18px] w-3 h-3 rounded-full"
        style={{ background: th.accent, border: `2.5px solid ${th.dotBorder}`, boxShadow: `0 0 0 2px ${th.accent}44` }}
      />
      <div
        className="rounded-2xl overflow-hidden"
        style={{ background: th.cardBg, border: `1px solid ${th.cardBorder}`, backdropFilter: "blur(12px)" }}
      >
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex justify-between items-center p-5 text-left"
        >
          <div>
            <div className="text-xs font-mono" style={{ color: th.accentLight }}>{exp.period}</div>
            <h3 className="text-sm font-bold mt-0.5" style={{ color: th.pageText }}>{exp.company}</h3>
            <p className="text-sm" style={{ color: th.subText }}>{exp.role}</p>
          </div>
          <ChevronDown
            size={15}
            className="flex-shrink-0 transition-transform duration-300"
            style={{ color: th.mutedText, transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <ul
                className="px-5 pb-5 pt-4 space-y-2"
                style={{ borderTop: `1px solid ${th.cardBorder}` }}
              >
                {exp.bullets.map((b: string, i: number) => (
                  <li key={i} className="flex items-start gap-2 text-sm" style={{ color: th.subText }}>
                    <ChevronRight size={13} className="flex-shrink-0 mt-0.5" style={{ color: th.accentLight }} />
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
function StackBadge({ name, th }: { name: string; th: Theme }) {
  return (
    <span
      className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold cursor-default"
      style={{ background: th.badgeBg, color: th.badgeText, border: `1px solid ${th.badgeBorder}` }}
    >
      {name}
    </span>
  );
}

/* ============================================================
   SECTION HEADER
============================================================ */
function SectionHeader({ children, th }: { children: React.ReactNode; th: Theme }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <h2 className="text-xl font-bold whitespace-nowrap" style={{ color: th.pageText }}>{children}</h2>
      <div
        className="flex-1 h-px"
        style={{ background: `linear-gradient(to right, ${th.divider}, transparent)` }}
      />
    </div>
  );
}

/* ============================================================
   MAIN
============================================================ */
export default function Resume() {
  const [lang, setLang] = useState<"en" | "ru">("en");
  const [isDark, setIsDark] = useState(true);

  const t = T[lang];
  const th = getTheme(isDark);

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-sans transition-colors duration-500"
      style={{ background: th.pageBg, color: th.pageText }}
    >
      {/* Scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
      />

      {/* Grid */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(${th.gridColor}12 1px, transparent 1px), linear-gradient(90deg, ${th.gridColor}12 1px, transparent 1px)`,
          backgroundSize: "44px 44px",
        }}
      />

      {/* Glow */}
      <div
        className="fixed -z-10 rounded-full"
        style={{
          top: -60, left: "50%", transform: "translateX(-50%)",
          width: 700, height: 400,
          background: th.glowColor,
          filter: "blur(90px)",
        }}
      />

      {/* Controls */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsDark(!isDark)}
          className="flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200"
          style={{ background: th.navBg, border: `1px solid ${th.navBorder}`, color: th.navText }}
        >
          {isDark ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button
          onClick={() => setLang(lang === "en" ? "ru" : "en")}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-mono font-semibold transition-all duration-200"
          style={{ background: th.navBg, border: `1px solid ${th.navBorder}`, color: th.navText }}
        >
          <Globe size={14} />
          {t.toggle}
        </button>
      </div>

      <main className="max-w-4xl mx-auto px-5 py-20 space-y-20">

        {/* HERO */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div
            className="inline-block text-xs font-mono rounded-full px-3 py-1 mb-6"
            style={{ color: th.accentLight, border: `1px solid ${th.accent}44`, background: `${th.accent}10` }}
          >
            {t.role}
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none mb-6">
            <span style={{ color: th.pageText }}>Temurbek</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to right, #818cf8, #a78bfa)"
                  : "linear-gradient(to right, #6d28d9, #9333ea)"
              }}
            >
              Rakhimkuliev
            </span>
          </h1>
          <p className="text-base max-w-2xl leading-relaxed mb-8" style={{ color: th.subText }}>
            {t.tagline}
          </p>
          <div className="flex flex-wrap gap-5 text-sm" style={{ color: th.subText }}>
            <a href="tel:+998946257395" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Phone size={14} style={{ color: th.accentLight }} /> +998-94-625-7395
            </a>
            <a href="mailto:timurxboy@gmail.com" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Mail size={14} style={{ color: th.accentLight }} /> timurxboy@gmail.com
            </a>
            <a href="https://github.com/timurxboy" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
              <Github size={14} style={{ color: th.accentLight }} /> @timurxboy
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={14} style={{ color: th.accentLight }} /> Tashkent, Uzbekistan
            </span>
          </div>
        </motion.section>

        {/* METRICS */}
        <section>
          <SectionHeader th={th}>{t.metrics}</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {t.metricsData.map((m: { value: string; label: string; sub: string }, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl p-5"
                style={{ background: th.metricBg, border: `1px solid ${th.metricBorder}` }}
              >
                <div className="text-3xl font-extrabold font-mono" style={{ color: th.metricValue }}>
                  {m.value}
                </div>
                <p className="text-sm font-semibold mt-2 leading-snug" style={{ color: th.metricLabel }}>{m.label}</p>
                <p className="text-xs mt-1 leading-snug" style={{ color: th.metricSub }}>{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* STACK */}
        <section>
          <SectionHeader th={th}>{t.skills}</SectionHeader>
          <div className="space-y-6">
            {Object.entries(t.stack).map(([cat, items]: [string, string[]]) => (
              <div key={cat}>
                <div className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: th.mutedText }}>
                  {cat}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s: string) => <StackBadge key={s} name={s} th={th} />)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <SectionHeader th={th}>{t.projectsLabel}</SectionHeader>
          <div className="space-y-4">
            {t.projects.map((p: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <ProjectCard project={p} isDark={isDark} th={th} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <SectionHeader th={th}>{t.experience}</SectionHeader>
          <div className="relative">
            <div
              className="absolute left-[5px] top-0 bottom-0 w-px"
              style={{ background: `linear-gradient(to bottom, ${th.timelineLine}, transparent)` }}
            />
            <div className="space-y-5">
              {t.experiences.map((exp: any, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                >
                  <ExperienceCard exp={exp} th={th} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center text-xs pt-10 pb-4 font-mono" style={{ color: th.mutedText }}>
          © {new Date().getFullYear()} Temurbek Rakhimkuliev · timurxboy@gmail.com
        </footer>

      </main>
    </div>
  );
}