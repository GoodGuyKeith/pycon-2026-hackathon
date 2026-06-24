import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import {
  Activity,
  ArrowRight,
  BadgeCheck,
  CalendarDays,
  Copy,
  FileUp,
  Gauge,
  Map as MapIcon,
  Network,
  PanelLeftClose,
  PanelLeftOpen,
  QrCode,
  RefreshCw,
  Save,
  Sparkles,
  Ticket,
  Upload,
  Users
} from "lucide-react";

const sampleEvent = {
  name: "PyConSG sample",
  source: "Built-in demo agenda"
};

const sampleSessions = [
  session("d1-open", "day1", "09:00", "09:15", "Event Hall 1-1 + 1-2", "plenary", "Day 1 Opening", "PyConSG team", ["community"], "plenary", "Arrive, settle in, and understand the conference rhythm."),
  session("d1-keynote-ai", "day1", "09:15", "10:00", "Event Hall 1-1 + 1-2", "plenary", "Keynote: So Kiasu, Still Kena Replaced by AI?", "Georgi Ker", ["ai", "career", "community"], "keynote", "A career and learning keynote about staying relevant in an AI-shaped world."),
  session("d1-keynote-fluency", "day1", "10:00", "10:45", "Event Hall 1-1 + 1-2", "plenary", "Keynote: Using Tools Without Being Used", "Anthony Tung", ["ai", "career", "community"], "keynote", "A four-stage model of AI fluency and collective sensemaking."),
  talk("d1-topic-modeling", "day1", "11:00", "11:30", "A", "You Don't Need an LLM to Understand Your Data", "Cyrus Mante", ["data", "ai"], "Topic modeling as a practical, interpretable way to understand text collections."),
  talk("d1-agents-azure", "day1", "11:00", "11:30", "B", "Merlions, Agents & Copilot", "Michelle Mei Ling Sandford", ["ai", "infra", "community"], "Trustworthy Python agents with local flavour, Copilot, and Azure patterns."),
  talk("d1-api-unstable-data", "day1", "11:30", "12:00", "A", "Designing Python APIs for Data You Don't Control", "Saurav Jain", ["data", "infra"], "Defensive Python interfaces for unstable web data sources."),
  talk("d1-tokenizers", "day1", "11:30", "12:00", "B", "Tokenization in Transformers v5", "Aritra Ray Gosthipaty", ["ai", "python-core"], "A clearer model of how modern tokenizers are built and customized."),
  breakSlot("d1-lunch", "day1", "12:00", "13:30", "Lunch / Hermes Agent workshop / AI Ready ASEAN", ["ai", "community"]),
  talk("d1-cpython", "day1", "13:30", "14:00", "A", "Inside CPython", "Allen Yesudasan", ["python-core"], "A tour of CPython compilation, bytecode, memory management, and the GIL."),
  talk("d1-birdnet", "day1", "13:30", "14:00", "B", "From Audio to Ecology", "Aryn Choong Yue Lin", ["data", "ai", "community"], "BirdNET and passive acoustic monitoring for Singapore ecology."),
  talk("d1-health-ai", "day1", "14:00", "14:30", "A", "Building Practical HealthTech AI Systems", "Melvin Ng", ["ai", "data", "infra"], "Lessons from applied AI systems with messy data and deployment tradeoffs."),
  talk("d1-terrible-code", "day1", "14:00", "14:30", "B", "How to Write Terrible Python Code", "Vivek Keshore", ["python-core", "career"], "Python anti-patterns, why they work until they don't, and cleaner refactors."),
  talk("d1-supply-chain", "day1", "14:30", "15:00", "A", "Surviving Python's AI Supply Chain Minefield", "Yuli Zhan", ["security", "ai", "infra"], "Modern supply chain attacks and practical defence patterns."),
  talk("d1-database", "day1", "14:30", "15:00", "B", "Modern Database Lifecycle", "Chuan Tze Bok", ["data", "infra"], "Database design, migration, AI-assisted querying, and BI workflow."),
  breakSlot("d1-tea", "day1", "15:00", "15:15", "Tea break", ["community"]),
  talk("d1-agent-skills", "day1", "15:15", "15:45", "A", "Beyond the System Prompt", "Jiawei Lin", ["ai", "infra"], "Agent Skills as modular bundles for scalable AI capabilities."),
  talk("d1-notifications", "day1", "15:15", "15:45", "B", "Building a Flexible Notification System", "GyeongSeon Park", ["infra", "backend"], "Schema-driven notifications with Python, PostgreSQL, and Airflow."),
  talk("d1-uv", "day1", "16:00", "16:30", "A", "Adopting uv and pyproject.toml for Mono-repo", "Mou Yuan Yap", ["infra", "python-core"], "Per-job isolation, lockfiles, and reproducibility in a large ML mono-repo."),
  talk("d1-forecasting", "day1", "16:00", "16:30", "B", "Democratizing Data Science at Grab", "Marc Schwalbach", ["data", "ai"], "Forecasting tools that let teams explore solutions faster."),
  session("d1-hack", "day1", "16:30", "17:30", "Hackathon area", "workshop", "Work on AI Agent / Hackathon", "Community", ["community", "ai"], "community", "Use the last block to meet collaborators, compare notes, or ship."),
  talk("d2-marketplace", "day2", "09:30", "10:00", "A", "Marketplace Simulations at Scale", "Yongjian Tek", ["data", "infra"], "Counterfactual policy testing with Python orchestration and Scala simulation."),
  talk("d2-prompt-coding", "day2", "09:30", "10:00", "B", "AI Prompt Engineering with Coding", "SIMCC", ["ai", "career"], "Using AI coding with technical judgement, review habits, and validation."),
  talk("d2-skill-md", "day2", "10:00", "10:30", "A", "SKILL.md is the SOP Your AI Agent Never Had", "Yeo Wee Kiang", ["ai", "infra"], "Reusable AI behaviour with SKILL.md and Python workflows."),
  talk("d2-cloud", "day2", "10:00", "10:30", "B", "Pulumi and pyInfra", "Piti Champeethong", ["infra", "python-core"], "Python-first cloud orchestration across provisioning and configuration."),
  talk("d2-ai-trust", "day2", "10:30", "11:00", "A", "This Talk Was Generated by AI. Please Don't Trust It.", "Dr Weihan Goh", ["ai", "security", "career"], "Verification as the future skill for AI-assisted creators."),
  talk("d2-hypothesis", "day2", "10:30", "11:00", "B", "Property-Based Testing with AI", "Ray Goh", ["python-core", "ai", "security"], "Using AI and Hypothesis to find real edge-case bugs."),
  talk("d2-video", "day2", "11:00", "11:30", "A", "Stop Training, Start Prompting", "Edwin Ng", ["ai", "data"], "Dynamic video surveillance with promptable vision systems."),
  breakSlot("d2-lunch", "day2", "12:00", "13:30", "Lunch / hallway track", ["community"]),
  workshop("d3-agent", "day3", "09:30", "12:00", "Workshop: Build with AI Agents", "AI Agent workshop", ["ai", "infra"]),
  workshop("d3-asean", "day3", "09:30", "12:00", "AI Ready ASEAN Certification Sprint", "AI literacy and certification", ["ai", "career", "community"]),
  workshop("d3-hack", "day3", "13:00", "16:30", "Hackathon Finish Line", "Polish demo, pitch, README, and final submission", ["community", "career", "ai"])
];

const tabs = [
  { id: "plan", label: "Plan", icon: CalendarDays },
  { id: "buddy", label: "Buddy", icon: Users },
  { id: "rewards", label: "Rewards", icon: Ticket },
  { id: "venue", label: "Venue", icon: MapIcon }
];

const interestOptions = [
  ["ai", "AI and agents"],
  ["data", "Data and ML"],
  ["python-core", "Python internals"],
  ["security", "Security"],
  ["infra", "Infra and backend"],
  ["career", "Career and learning"],
  ["community", "Community"]
];

const presets = {
  beginner: { day: "day1", interests: ["career", "community", "python-core"], energy: 2, social: "low", track: "mix", breaks: true },
  ai: { day: "day1", interests: ["ai", "infra", "data"], energy: 4, social: "balanced", track: "mix", breaks: true },
  backend: { day: "day1", interests: ["infra", "python-core", "security"], energy: 4, social: "balanced", track: "any", breaks: true },
  social: { day: "day2", interests: ["community", "career", "ai"], energy: 5, social: "high", track: "mix", breaks: false }
};

const initialPrefs = {
  day: "day1",
  interests: ["ai", "data"],
  energy: 3,
  social: "balanced",
  track: "mix",
  breaks: true
};

export default function App() {
  const rootRef = useRef(null);
  const heroRef = useRef(null);
  const progressRef = useRef(null);
  const [eventInfo, setEventInfo] = useState(sampleEvent);
  const [sessions, setSessions] = useState(sampleSessions);
  const [prefs, setPrefs] = useState(initialPrefs);
  const [activeTab, setActiveTab] = useState("plan");
  const [showFullPlan, setShowFullPlan] = useState(false);
  const [isResearchDeskHidden, setIsResearchDeskHidden] = useState(false);
  const [eventUrl, setEventUrl] = useState("");
  const [scheduleText, setScheduleText] = useState("");
  const [importStatus, setImportStatus] = useState("PyConSG sample is loaded. Paste another agenda to turn this into a planner for any event.");
  const [manual, setManual] = useState({ time: "", venue: "", title: "", speaker: "", tags: "" });
  const [sessionCode, setSessionCode] = useState("");
  const [sessionHint, setSessionHint] = useState("Codes work only for sessions in your current plan.");
  const [connectionCode, setConnectionCode] = useState("");
  const [connectionHint, setConnectionHint] = useState("A connection counts when you enter a different user's code.");
  const [toast, setToast] = useState("");
  const [buddyCode, setBuddyCode] = useState(() => localStorage.getItem("conferenceBuddyCode") || makeBuddyCode());
  const [checkedIn, setCheckedIn] = useState(() => safeSet("conferenceBuddyCheckedIn"));
  const [connections, setConnections] = useState(() => safeArray("conferenceBuddyConnections"));
  const [savedPlans, setSavedPlans] = useState(() => safeArray("conferenceBuddyPlans"));
  const [claimedRewards, setClaimedRewards] = useState(() => cleanClaimedRewards(safeObject("conferenceBuddyClaimedRewards")));

  const planData = useMemo(() => buildPlan(sessions, prefs), [sessions, prefs]);
  const { plan, alternatives } = planData;
  const talkItems = plan.filter(isCheckInEligible);
  const breakItems = plan.filter((item) => item.type === "break" || item.type === "microbreak");
  const fit = Math.round(plan.reduce((sum, item) => sum + (item.score || 0), 0) / Math.max(1, plan.length));
  const checkedCount = talkItems.filter((item) => checkedIn.has(item.id)).length;
  const xp = questXp(sessions, checkedIn, connections);
  const progress = Math.min(100, Math.round((xp / 180) * 100));

  useEffect(() => {
    localStorage.setItem("conferenceBuddyCode", buddyCode);
  }, [buddyCode]);

  useEffect(() => {
    localStorage.setItem("conferenceBuddyCheckedIn", JSON.stringify([...checkedIn]));
  }, [checkedIn]);

  useEffect(() => {
    localStorage.setItem("conferenceBuddyConnections", JSON.stringify(connections));
  }, [connections]);

  useEffect(() => {
    localStorage.setItem("conferenceBuddyPlans", JSON.stringify(savedPlans));
  }, [savedPlans]);

  useEffect(() => {
    localStorage.setItem("conferenceBuddyClaimedRewards", JSON.stringify(claimedRewards));
  }, [claimedRewards]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const context = gsap.context(() => {
      const moveX = gsap.quickTo(hero, "--signal-x", { duration: 0.45, ease: "power3.out" });
      const moveY = gsap.quickTo(hero, "--signal-y", { duration: 0.45, ease: "power3.out" });
      const rotate = gsap.quickTo(hero, "--signal-tilt", { duration: 0.65, ease: "power3.out" });

      function handlePointerMove(event) {
        const bounds = hero.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        moveX(x);
        moveY(y);
        rotate(((x / Math.max(1, bounds.width)) - 0.5) * 8);
      }

      function handlePointerLeave() {
        moveX(hero.offsetWidth * 0.66);
        moveY(hero.offsetHeight * 0.38);
        rotate(0);
      }

      handlePointerLeave();
      hero.addEventListener("pointermove", handlePointerMove);
      hero.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        hero.removeEventListener("pointermove", handlePointerMove);
        hero.removeEventListener("pointerleave", handlePointerLeave);
      };
    }, rootRef);

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!progressRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      progressRef.current.style.width = `${progress}%`;
      return undefined;
    }
    gsap.to(progressRef.current, {
      width: `${progress}%`,
      duration: 0.55,
      ease: "power2.out",
      overwrite: "auto"
    });
    return undefined;
  }, [progress]);

  function updatePrefs(partial) {
    setPrefs((current) => ({ ...current, ...partial }));
  }

  function toggleInterest(value) {
    setPrefs((current) => {
      const has = current.interests.includes(value);
      return {
        ...current,
        interests: has ? current.interests.filter((item) => item !== value) : [...current.interests, value]
      };
    });
  }

  function applyPreset(id) {
    updatePrefs(presets[id]);
    showToast(`${idLabel(id)} preset loaded.`);
  }

  function surpriseMe() {
    const ids = Object.keys(presets);
    applyPreset(ids[Math.floor(Math.random() * ids.length)]);
  }

  async function importEventAgenda() {
    const parsed = parseScheduleText(scheduleText.trim());
    if (parsed.length) {
      loadImportedSessions(parsed, { name: eventNameFromUrl(eventUrl) || "Imported event", source: eventUrl || "Pasted agenda text" });
      setImportStatus(`${parsed.length} agenda blocks imported from pasted text.`);
      showToast("Event agenda imported.");
      return;
    }

    if (!eventUrl.trim()) {
      setImportStatus("Paste agenda text, upload CSV/.ics, add a session manually, or enter an event website URL.");
      showToast("Add an event source first.");
      return;
    }

    setImportStatus("Reading event page...");
    try {
      const response = await fetch("/api/import-event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: eventUrl.trim() })
      });
      const data = await response.json();
      if (!response.ok || data.error) throw new Error(data.error || "Website import failed.");
      const imported = normalizeImportedSessions(data.sessions || []);
      if (imported.length) {
        loadImportedSessions(imported, data.event || { name: eventNameFromUrl(eventUrl), source: eventUrl });
        setImportStatus(`${imported.length} sessions imported from website. Review before saving.`);
        showToast("Website imported.");
        return;
      }
      setScheduleText(data.rawText || "");
      setEventInfo(data.event || { name: eventNameFromUrl(eventUrl) || "Saved event URL", source: eventUrl });
      setImportStatus("Website text was extracted into the paste box, but no time ranges were detected. Clean it up or use quick add.");
      showToast("Review extracted text.");
    } catch (error) {
      setEventInfo({ name: eventNameFromUrl(eventUrl) || "Saved event URL", source: eventUrl });
      setImportStatus(`${error.message} Paste the schedule text or upload CSV/.ics as a reliable fallback.`);
      showToast("Website import needs fallback.");
    }
  }

  async function importScheduleFile(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const name = file.name.toLowerCase();
    if (file.type.startsWith("image/") || name.endsWith(".pdf")) {
      setImportStatus("PDF/image upload is captured, but OCR needs the next API upgrade. Use paste, CSV, .ics, or manual add for now.");
      showToast("OCR support is next.");
      event.target.value = "";
      return;
    }
    const text = await file.text();
    let imported = [];
    if (name.endsWith(".csv")) imported = parseCsvSchedule(text);
    else if (name.endsWith(".ics")) imported = parseIcsSchedule(text);
    else imported = parseScheduleText(text);
    if (!imported.length) {
      setImportStatus("No schedule rows found in that file. Try CSV columns like start,end,venue,title,speaker,track.");
      showToast("No sessions found.");
      event.target.value = "";
      return;
    }
    setScheduleText(imported.map(sessionToPasteLine).join("\n"));
    loadImportedSessions(imported, { name: file.name.replace(/\.[^.]+$/, "") || "Uploaded event", source: file.name });
    setImportStatus(`${imported.length} sessions imported from ${file.name}.`);
    showToast("Schedule file imported.");
    event.target.value = "";
  }

  function loadImportedSessions(imported, event) {
    setSessions(imported);
    setEventInfo({ name: event?.name || "Imported event", source: event?.source || "Imported schedule" });
    setPrefs((current) => ({ ...current, day: "day1" }));
    setShowFullPlan(false);
    setCheckedIn((current) => new Set([...current].filter((id) => imported.some((item) => item.id === id))));
  }

  function addManualSession() {
    const line = [manual.time, manual.venue || "Event space", manual.title, manual.speaker || "Event team", manual.tags].join(" | ");
    const parsed = parseScheduleLine(line, sessions.length);
    if (!parsed || !manual.title.trim()) {
      setImportStatus("Add a time range and title first, for example 09:00-09:45 and Opening keynote.");
      showToast("Manual session needs time and title.");
      return;
    }
    const nextSessions = eventInfo.name === sampleEvent.name ? [{ ...parsed, id: `manual-${Date.now()}` }] : [...sessions, { ...parsed, id: `manual-${Date.now()}` }];
    setSessions(nextSessions);
    if (eventInfo.name === sampleEvent.name) setEventInfo({ name: "Manual event", source: "Manual quick add" });
    setScheduleText(nextSessions.map(sessionToPasteLine).join("\n"));
    setManual({ time: "", venue: "", title: "", speaker: "", tags: "" });
    setImportStatus(`${nextSessions.length} manual session${nextSessions.length === 1 ? "" : "s"} in this event.`);
    showToast("Session added.");
  }

  function loadSampleEvent() {
    setSessions(sampleSessions);
    setEventInfo(sampleEvent);
    setEventUrl("");
    setScheduleText("");
    updatePrefs({ day: "day1" });
    setImportStatus("PyConSG sample is loaded. Paste another agenda to turn this into a planner for any event.");
    showToast("Sample event loaded.");
  }

  function verifySessionCode(event) {
    event.preventDefault();
    const code = normalizeCode(sessionCode);
    const match = plan.find((item) => isCheckInEligible(item) && normalizeCode(sessionCodeFor(item, eventInfo)) === code);
    if (!code) {
      setSessionHint("Enter the code from the room QR.");
      return;
    }
    if (!match) {
      setSessionHint("That code is not in your current plan.");
      return;
    }
    if (checkedIn.has(match.id)) {
      setSessionHint("Attendance already verified for this session.");
      return;
    }
    setCheckedIn(new Set([...checkedIn, match.id]));
    setSessionCode("");
    setSessionHint(`${match.title} verified. +${sessionPoints(match)} XP.`);
    showToast("Session verified.");
  }

  function addConnection(event) {
    event.preventDefault();
    const code = normalizeBuddyCode(connectionCode);
    if (!code) {
      setConnectionHint("Enter a buddy code first.");
      return;
    }
    if (code === buddyCode) {
      setConnectionHint("That is your own code. Ask another attendee for theirs.");
      return;
    }
    if (connections.some((connection) => connection.code === code)) {
      setConnectionHint("This code has already been counted.");
      return;
    }
    setConnections([{ code, createdAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }, ...connections].slice(0, 20));
    setConnectionCode("");
    setConnectionHint("Connection counted. +15 XP.");
    showToast("Connection counted.");
  }

  function copyPlan() {
    const text = [
      `Event Buddy: ${eventInfo.name || "Event"} / ${dayLabel(prefs.day)}`,
      `Interests: ${prefs.interests.join(", ") || "General"}`,
      "",
      ...plan.map((item) => `${item.time}-${item.end} | ${item.title} | ${item.venue}`)
    ].join("\n");
    copyText(text, "Plan copied.");
  }

  function savePlan() {
    const saved = {
      id: Date.now(),
      title: `${eventInfo.name || "Event"}: ${dayLabel(prefs.day)}`,
      createdAt: new Date().toLocaleString(),
      sessions: plan.map((item) => ({ time: item.time, title: item.title, venue: item.venue }))
    };
    setSavedPlans([saved, ...savedPlans].slice(0, 5));
    showToast("Plan saved in this browser.");
  }

  function claimReward(reward) {
    if (!reward.eligible) {
      showToast("More verified signals needed before this reward unlocks.");
      return;
    }
    const existing = claimedRewards[reward.id];
    if (existing?.code) {
      copyText(existing.code, "Claim request copied.");
      return;
    }
    const claim = {
      code: rewardClaimRequestId(reward, eventInfo, buddyCode),
      claimedAt: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    };
    setClaimedRewards((current) => ({ ...current, [reward.id]: claim }));
    showToast(`${reward.title} request created.`);
  }

  function copyText(value, message) {
    navigator.clipboard?.writeText(value)
      .then(() => showToast(message))
      .catch(() => showToast("Copy failed."));
  }

  function showToast(message) {
    setToast(message);
  }

  const topTags = countTags(plan).slice(0, 3).map(([tag]) => tag);
  const visiblePlan = showFullPlan ? plan : plan.slice(0, 4);
  const movements = movementSegments(plan);
  const hardMoves = movements.filter((move) => move.from !== move.to && move.risk !== "buffered");
  const sourceLabel = `${eventInfo.name} / ${summarizeInterests(prefs.interests)} / ${socialLabel(prefs.social)}`;
  const nextSession = plan.find((item) => isCheckInEligible(item) && !checkedIn.has(item.id)) || plan.find(isCheckInEligible);
  const nextMove = nextSession ? `${nextSession.time} ${nextSession.title}` : "Import or add sessions to build the next move.";
  const rewardCue = checkedCount >= 1 ? "AI credit claims are opening in Rewards." : "Verify one room code to unlock starter AI credits.";

  return (
    <main ref={rootRef} className="market-bg min-h-screen text-stone-950">
      <div className="mx-auto flex w-[min(1720px,calc(100vw-24px))] flex-col gap-4 px-0 py-4 sm:w-[min(1720px,calc(100vw-40px))] sm:py-6">
        <header className="grid gap-4 xl:grid-cols-[minmax(0,1.45fr)_minmax(380px,0.55fr)]">
          <section ref={heroRef} className="mm-hero relative min-h-[520px] overflow-hidden rounded-[36px] border border-stone-900/15 text-zinc-950">
            <div className="hero-signal-field" aria-hidden="true" />
            <div className="absolute left-0 top-0 z-10 flex w-full items-center justify-between border-b border-zinc-950/10 px-4 py-3 text-[0.68rem] font-black uppercase tracking-[0.18em] text-zinc-700 sm:px-6">
              <span>Event Buddy / Human agenda lab</span>
              <span>PyConSG 2026 Hackathon</span>
            </div>
            <PeopleDoodle />
            <div className="relative z-20 flex min-h-[520px] flex-col justify-end gap-8 p-5 pt-20 sm:p-8 sm:pt-24 lg:p-10">
              <div>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.28em] text-[#1f2423]">001 // understand the room</p>
                <h1 className="max-w-5xl text-[clamp(4.2rem,14vw,12.5rem)] font-black uppercase leading-[0.76] tracking-normal drop-shadow-[0_2px_0_rgba(255,252,239,0.65)]">
                  Event Buddy
                </h1>
              </div>
              <div>
                <p className="max-w-2xl text-lg font-semibold leading-snug text-zinc-700 sm:text-xl">
                  Less schedule panic. More human signal.
                </p>
              </div>
            </div>
          </section>

          <aside className="glass-panel people-card flex min-h-[480px] flex-col justify-between p-5 sm:p-6">
            <div className="relative z-10">
              <div className="mb-6 flex items-center justify-between text-xs font-black uppercase tracking-[0.18em] text-[#1c75bc]">
                <span>Today&apos;s working plan</span>
                <span>{eventInfo.name.toUpperCase().slice(0, 18)}</span>
              </div>
              <div className="rounded-none border border-stone-900/10 bg-[#88d459]/20 p-4">
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-stone-700">Reward readiness</span>
                  <Gauge className="h-5 w-5 text-[#2199ee]" />
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-[#dceacb]">
                  <div ref={progressRef} className="h-full bg-[#1f2423]" style={{ width: `${progress}%` }} />
                </div>
                <p className="mt-3 text-sm font-bold leading-5 text-stone-700">{rewardCue}</p>
              </div>
              <div className="mt-4 border border-stone-900/10 bg-[#fffcef]/90 p-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-[#2199ee]">Next useful action</span>
                <p className="mt-2 text-lg font-black leading-snug text-stone-950">{nextMove}</p>
                <p className="mt-2 text-sm font-semibold leading-5 text-stone-600">Use the Plan tab for the room code, then Rewards to claim credits after verification.</p>
              </div>
            </div>
            <div className="relative z-10 grid gap-3">
              <Metric icon={Activity} label="Room codes verified" value={`${checkedCount}/${talkItems.length}`} />
              <Metric icon={Network} label="Buddy exchanges" value={connections.length} />
              <Metric icon={Sparkles} label="Pacing mode" value={socialLabel(prefs.social)} />
            </div>
          </aside>
        </header>

        <Ticker />

        <MethodStrip />

        <nav className="sticky top-0 z-40 grid grid-cols-4 gap-2 border border-stone-900/15 bg-[#fffcef]/95 p-2 shadow-[0_16px_40px_rgba(31,36,35,0.12)] backdrop-blur">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`flex min-h-12 items-center justify-center gap-2 px-3 text-sm font-black uppercase transition ${activeTab === id ? "tab-active" : "tab-idle hover:bg-[#88d459]/35"}`}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </nav>

        <section className={`grid gap-4 transition-[grid-template-columns] duration-300 ${isResearchDeskHidden ? "" : "xl:grid-cols-[420px_minmax(0,1fr)]"}`}>
          <ControlPanel
            eventUrl={eventUrl}
            setEventUrl={setEventUrl}
            scheduleText={scheduleText}
            setScheduleText={setScheduleText}
            importStatus={importStatus}
            manual={manual}
            setManual={setManual}
            prefs={prefs}
            updatePrefs={updatePrefs}
            toggleInterest={toggleInterest}
            importEventAgenda={importEventAgenda}
            importScheduleFile={importScheduleFile}
            addManualSession={addManualSession}
            loadSampleEvent={loadSampleEvent}
            applyPreset={applyPreset}
            surpriseMe={surpriseMe}
            sourceLabel={sourceLabel}
            isHidden={isResearchDeskHidden}
            onToggleHidden={() => setIsResearchDeskHidden((value) => !value)}
          />

          <section className="min-w-0">
            {activeTab === "plan" && (
              <PlanPanel
                eventInfo={eventInfo}
                prefs={prefs}
                plan={plan}
                visiblePlan={visiblePlan}
                showFullPlan={showFullPlan}
                setShowFullPlan={setShowFullPlan}
                talkItems={talkItems}
                breakItems={breakItems}
                alternatives={alternatives}
                fit={fit}
                topTags={topTags}
                checkedIn={checkedIn}
                sessionCode={sessionCode}
                setSessionCode={setSessionCode}
                sessionHint={sessionHint}
                verifySessionCode={verifySessionCode}
                copyPlan={copyPlan}
                savePlan={savePlan}
                savedPlans={savedPlans}
              />
            )}

            {activeTab === "buddy" && (
              <BuddyPanel
                plan={plan}
                prefs={prefs}
                buddyCode={buddyCode}
                copyText={copyText}
                connectionCode={connectionCode}
                setConnectionCode={setConnectionCode}
                connectionHint={connectionHint}
                addConnection={addConnection}
              />
            )}

            {activeTab === "rewards" && (
              <RewardsPanel
                xp={xp}
                checkedCount={checkedCount}
                connections={connections}
                prefs={prefs}
                plan={plan}
                checkedIn={checkedIn}
                claimedRewards={claimedRewards}
                claimReward={claimReward}
                copyText={copyText}
              />
            )}

            {activeTab === "venue" && (
              <VenuePanel plan={plan} movements={movements} hardMoves={hardMoves} prefs={prefs} />
            )}
          </section>
        </section>
      </div>

      <div className={`fixed bottom-5 left-1/2 z-50 -translate-x-1/2 border border-stone-900/15 bg-[#1f2423] px-5 py-3 text-sm font-bold text-[#fffcef] shadow-2xl transition ${toast ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`} role="status" aria-live="polite">
        {toast}
      </div>
    </main>
  );
}

function ControlPanel(props) {
  const {
    eventUrl,
    setEventUrl,
    scheduleText,
    setScheduleText,
    importStatus,
    manual,
    setManual,
    prefs,
    updatePrefs,
    toggleInterest,
    importEventAgenda,
    importScheduleFile,
    addManualSession,
    loadSampleEvent,
    applyPreset,
    surpriseMe,
    sourceLabel,
    isHidden,
    onToggleHidden
  } = props;
  const ToggleIcon = isHidden ? PanelLeftOpen : PanelLeftClose;

  return (
    <aside className="glass-panel h-fit p-4 transition-all duration-300 sm:p-5">
      <div className={`${isHidden ? "mb-0 border-b-0 pb-0" : "mb-4 border-b pb-4"} flex items-start justify-between gap-4 border-stone-900/15`}>
        <div className="min-w-0">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">002 // bring the agenda</p>
          <h2 className={`${isHidden ? "text-xl" : "text-2xl"} mt-1 font-black text-stone-950`}>Research desk</h2>
          {!isHidden && <p className="mt-2 text-sm font-semibold text-stone-600">{sourceLabel}</p>}
        </div>
        <button
          type="button"
          onClick={onToggleHidden}
          className="ghost-button flex shrink-0 items-center gap-2 px-3 text-xs font-black uppercase tracking-[0.08em]"
          aria-expanded={!isHidden}
          aria-controls="research-desk-controls"
        >
          <ToggleIcon className="h-4 w-4" />
          <span>{isHidden ? "Show" : "Hide"}</span>
        </button>
      </div>

      {isHidden ? (
        <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center" id="research-desk-controls">
          <p className="text-sm font-semibold text-stone-600">Agenda inputs and preference controls are tucked away, so the active tab can use the full width.</p>
          <button className="neo-button px-5 text-sm font-black" type="button" onClick={onToggleHidden}>
            Show controls
          </button>
        </div>
      ) : (
        <div id="research-desk-controls">

      <div className="grid gap-3">
        <input className="input-shell min-h-11 px-3" value={eventUrl} onChange={(event) => setEventUrl(event.target.value)} placeholder="https://event.example/agenda" aria-label="Event website URL" />
        <div className="grid grid-cols-2 gap-2">
          <button className="neo-button px-4 text-sm font-black" type="button" onClick={importEventAgenda}>
            Import
          </button>
          <button className="ghost-button px-4 text-sm font-black" type="button" onClick={loadSampleEvent}>
            Sample
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2 text-center text-[0.68rem] font-black uppercase tracking-[0.12em] text-stone-700">
          {["Paste", "URL", "CSV", "Calendar", "Manual", "OCR next"].map((item) => (
            <span key={item} className="border border-stone-900/10 bg-[#88d459]/20 px-2 py-2">{item}</span>
          ))}
        </div>
        <textarea className="input-shell min-h-28 resize-y p-3 text-sm" value={scheduleText} onChange={(event) => setScheduleText(event.target.value)} placeholder={"09:00-09:45 | Main Hall | Opening keynote | Speaker | AI, career\n10:00-10:45 | Room A | Hands-on workshop | Trainer | workshop"} aria-label="Paste event schedule" />
        <label className="flex min-h-14 cursor-pointer flex-col justify-center gap-1 border border-dashed border-stone-900/20 bg-[#88d459]/20 px-3 py-3 text-sm font-bold text-stone-800 transition hover:bg-[#88d459]/30 sm:flex-row sm:items-center sm:justify-between">
          <span className="flex items-center gap-2 text-base font-black text-stone-950"><FileUp className="h-4 w-4 text-[#2199ee]" /> Upload schedule</span>
          <span className="text-xs font-black uppercase tracking-[0.12em] text-stone-600">CSV / ICS / TXT</span>
          <input className="sr-only" type="file" accept=".csv,.ics,.txt,.pdf,image/*" onChange={importScheduleFile} aria-label="Upload schedule file" />
        </label>
        <p className="border-l-2 border-[#88d459] bg-[#fffcef]/90 px-3 py-2 text-sm font-semibold text-stone-700">{importStatus}</p>
      </div>

      <div className="mt-5 grid gap-3 border-t border-stone-900/15 pt-5">
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Quick interview card</p>
        <input className="input-shell min-h-10 px-3" value={manual.time} onChange={(event) => setManual({ ...manual, time: event.target.value })} placeholder="09:00-09:45" aria-label="Session time" />
        <input className="input-shell min-h-10 px-3" value={manual.venue} onChange={(event) => setManual({ ...manual, venue: event.target.value })} placeholder="Room A" aria-label="Session venue" />
        <input className="input-shell min-h-10 px-3" value={manual.title} onChange={(event) => setManual({ ...manual, title: event.target.value })} placeholder="Session title" aria-label="Session title" />
        <div className="grid grid-cols-2 gap-2">
          <input className="input-shell min-h-10 px-3" value={manual.speaker} onChange={(event) => setManual({ ...manual, speaker: event.target.value })} placeholder="Speaker" aria-label="Session speaker" />
          <input className="input-shell min-h-10 px-3" value={manual.tags} onChange={(event) => setManual({ ...manual, tags: event.target.value })} placeholder="AI, security" aria-label="Session tags" />
        </div>
        <button className="ghost-button px-4 text-sm font-black" type="button" onClick={addManualSession}>Add session</button>
      </div>

      <div className="mt-5 grid gap-4 border-t border-stone-900/15 pt-5">
        <Segment label="Active day" value={prefs.day} options={[["day1", "Day 1"], ["day2", "Day 2"], ["day3", "Day 3"]]} onChange={(day) => updatePrefs({ day })} />
        <fieldset className="grid grid-cols-2 gap-2">
          <legend className="mb-2 text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Goals and interests</legend>
          {interestOptions.map(([value, label]) => (
            <label key={value} className={`flex min-h-10 items-center gap-2 rounded-full border px-3 text-xs font-black ${prefs.interests.includes(value) ? "border-[#1f2423] bg-[#88d459] text-stone-950" : "border-stone-900/15 bg-[#fffcef]/90 text-stone-700"}`}>
              <input className="sr-only" type="checkbox" checked={prefs.interests.includes(value)} onChange={() => toggleInterest(value)} />
              <span>{label}</span>
            </label>
          ))}
        </fieldset>
        <label className="grid gap-2">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Energy level {prefs.energy} / 5</span>
          <input type="range" min="1" max="5" step="1" value={prefs.energy} onChange={(event) => updatePrefs({ energy: Number(event.target.value) })} />
        </label>
        <Segment label="Social mode" value={prefs.social} options={[["low", "Quiet"], ["balanced", "Balanced"], ["high", "Social"]]} onChange={(social) => updatePrefs({ social })} />
        <Segment label="Venue drift" value={prefs.track} options={[["any", "Open"], ["a", "Venue A"], ["b", "Venue B"], ["mix", "Mix"]]} onChange={(track) => updatePrefs({ track })} />
        <label className="flex items-center gap-3 border border-stone-900/15 bg-[#fffcef]/90 px-3 py-3 text-sm font-bold text-stone-800">
          <input type="checkbox" checked={prefs.breaks} onChange={(event) => updatePrefs({ breaks: event.target.checked })} />
          Protect coffee and decompression breaks
        </label>
        <div className="grid grid-cols-2 gap-2">
          <button className="neo-button px-4 text-sm font-black" type="button" onClick={() => updatePrefs({ ...prefs })}>Generate plan</button>
          <button className="ghost-button px-4 text-sm font-black" type="button" onClick={surpriseMe}>Shuffle</button>
        </div>
        <div className="grid gap-2">
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Audience templates</p>
          {Object.keys(presets).map((id, index) => (
            <button key={id} className="ghost-button flex items-center justify-between px-3 text-left text-sm font-black" type="button" onClick={() => applyPreset(id)}>
              <span>{String(index + 1).padStart(2, "0")} / {idLabel(id)}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ))}
        </div>
      </div>
        </div>
      )}
    </aside>
  );
}

function PlanPanel(props) {
  const {
    eventInfo,
    prefs,
    plan,
    visiblePlan,
    showFullPlan,
    setShowFullPlan,
    talkItems,
    breakItems,
    alternatives,
    fit,
    topTags,
    checkedIn,
    sessionCode,
    setSessionCode,
    sessionHint,
    verifySessionCode,
    copyPlan,
    savePlan,
    savedPlans
  } = props;

  return (
    <div className="grid gap-4">
      <PanelHeader eyebrow="003 // fieldwork plan" title={`${eventInfo.name}: ${dayLabel(prefs.day)}`} actions={[
        ["Full day", () => setShowFullPlan(!showFullPlan), CalendarDays],
        ["Copy plan", copyPlan, Copy],
        ["Save", savePlan, Save]
      ]} />
      <div className="glass-panel overflow-hidden p-0">
        <div className="grid grid-cols-2 sm:grid-cols-4">
          {[
            ["sessions", talkItems.length],
            ["breaks", breakItems.length],
            ["people prompts", networkingPromptCount(prefs.social)],
            ["conflicts", alternatives.filter((item) => item.other).length]
          ].map(([label, value]) => (
            <div key={label} className="min-h-16 border-b border-r border-stone-900/10 px-4 py-3 last:border-r-0 sm:border-b-0">
              <strong className="block text-2xl font-black leading-none text-stone-950">{value}</strong>
              <span className="mt-1 block text-[0.65rem] font-black uppercase tracking-[0.14em] text-stone-600">{label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="glass-panel p-4">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Saved plan snapshots</p>
            <h3 className="mt-1 text-xl font-black text-stone-950">Plans saved on this browser</h3>
          </div>
          <span className="text-sm font-black uppercase tracking-[0.14em] text-stone-500">{savedPlans.length}/5 kept</span>
        </div>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          {savedPlans.length ? savedPlans.slice(0, 2).map((saved) => (
            <article key={saved.id} className="border border-stone-900/15 bg-[#fffcef]/90 p-3">
              <strong className="block text-stone-950">{saved.title}</strong>
              <span className="text-sm font-semibold text-stone-600">{saved.sessions.length} blocks - {saved.createdAt}</span>
            </article>
          )) : <p className="text-sm font-semibold text-stone-600">Use Save above to keep a local snapshot of this plan.</p>}
        </div>
        {savedPlans.length > 2 && <p className="mt-2 text-xs font-bold text-stone-500">+{savedPlans.length - 2} older snapshots kept locally.</p>}
      </div>
      <form onSubmit={verifySessionCode} className="glass-panel grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)]">
        <div>
          <div className="flex items-center gap-2 text-sm font-black text-stone-950"><QrCode className="h-5 w-5 text-[#2199ee]" /> Session QR / room code</div>
          <p className="mt-1 text-sm font-semibold text-stone-600">Scan the room QR or enter the short code shown at the venue to verify attendance.</p>
          <p className="mt-2 text-sm font-bold text-[#1c75bc]">{sessionHint}</p>
        </div>
        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
          <input className="input-shell min-h-11 px-3 uppercase" value={sessionCode} onChange={(event) => setSessionCode(event.target.value)} placeholder="e.g. PYD10915HA" />
          <button className="neo-button px-4 text-sm font-black" type="submit">Verify</button>
        </div>
      </form>
      <div className="glass-panel grid gap-4 p-4 lg:grid-cols-[0.7fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">What we learned</p>
          <h3 className="mt-1 text-3xl font-black text-stone-950">{fit}% preference fit</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
            The buddy treated your interests like research signals, then balanced them against energy, room movement, social appetite, and protected pauses.
          </p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <Signal label="dominant themes" value={topTags.join(", ") || "mixed"} />
          <Signal label="networking style" value={socialLabel(prefs.social)} />
          <Signal label="break protection" value={prefs.breaks ? "on" : "off"} />
        </div>
      </div>
      <div className="relative grid gap-3 pl-4">
        <span className="timeline-line absolute bottom-0 left-0 top-0 w-px" />
        {visiblePlan.map((item) => (
          <TimelineItem key={item.id} item={item} eventInfo={eventInfo} checked={checkedIn.has(item.id)} prefs={prefs} />
        ))}
        {!showFullPlan && plan.length > visiblePlan.length && (
          <button type="button" onClick={() => setShowFullPlan(true)} className="ghost-button flex min-h-14 items-center justify-between px-4 text-left font-black">
            <span>{plan.length - visiblePlan.length} more blocks hidden</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}

function TimelineItem({ item, eventInfo, checked, prefs }) {
  return (
    <article className="glass-panel grid gap-3 p-4 md:grid-cols-[92px_minmax(0,1fr)]">
      <div className="text-[#1f2423]">
        <strong className="block text-2xl font-black leading-none">{item.time}</strong>
        <span className="text-sm font-bold text-stone-600">{item.end}</span>
      </div>
      <div className="min-w-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <span className="inline-flex border border-stone-900/15 bg-[#88d459]/25 px-2 py-1 text-[0.68rem] font-black uppercase tracking-[0.16em] text-[#1f2423]">{labelType(item.type)}</span>
            <h3 className="mt-2 text-xl font-black leading-tight text-stone-950">{item.title}</h3>
          </div>
          <span className="border border-[#fffcef]/35 bg-[#1f2423] px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#fffcef] shadow-[0_6px_18px_rgba(31,36,35,0.16)]">{item.venue}</span>
        </div>
        <p className="mt-3 text-sm font-semibold leading-6 text-stone-600">{item.description}</p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-stone-700">
          <span>{item.speaker}</span>
          <span>{item.reason || explainChoice(item, prefs.interests)}</span>
          {isCheckInEligible(item) && <span>Room code {sessionCodeFor(item, eventInfo)}</span>}
          {checked && <span className="text-[#14865a]"><BadgeCheck className="mr-1 inline h-4 w-4" />Verified attendance</span>}
        </div>
      </div>
    </article>
  );
}

function BuddyPanel({ plan, prefs, buddyCode, copyText, connectionCode, setConnectionCode, connectionHint, addConnection }) {
  const firstTalk = plan.find((item) => ["talk", "keynote", "workshop"].includes(item.type));
  const openerSets = {
    low: ["I'm trying to choose one idea to learn after this talk. What stood out to you?", "Is this your first time at this event too, or are you a regular?", "I'm doing low-pressure networking today. Mind if I ask what session you are looking forward to?"],
    balanced: ["What brought you to this talk?", "Are you using Python more for work, learning, or side projects?", "What is one session you think people should not miss?"],
    high: ["I'm collecting one practical takeaway from everyone I meet. What's yours so far?", "What are you building or hoping to build after this event?", "Who else should I talk to if I'm interested in this topic?"]
  };

  return (
    <div className="grid gap-4">
      <PanelHeader eyebrow="004 // people map" title={prefs.social === "low" ? "Gentle mode is on" : prefs.social === "high" ? "Hallway track mode" : "Balanced buddy mode"} />
      <div className="grid gap-4 lg:grid-cols-[0.55fr_0.45fr]">
        <div className="glass-panel p-5">
          <span className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">Your buddy code</span>
          <div className="mt-3 flex items-center justify-between gap-4">
            <strong className="text-5xl font-black text-stone-950">{buddyCode}</strong>
            <button className="ghost-button px-4 text-sm font-black" type="button" onClick={() => copyText(buddyCode, "Buddy code copied.")}>Copy</button>
          </div>
        </div>
        <form onSubmit={addConnection} className="glass-panel grid gap-3 p-5">
          <label className="text-sm font-black text-stone-950">Enter another attendee code</label>
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
            <input className="input-shell min-h-11 px-3 uppercase" value={connectionCode} onChange={(event) => setConnectionCode(event.target.value)} placeholder="e.g. KAI42" />
            <button className="neo-button px-4 text-sm font-black" type="submit">Connect</button>
          </div>
          <p className="text-sm font-bold text-[#1c75bc]">{connectionHint}</p>
        </form>
      </div>
      <div className="glass-panel p-5">
        <h3 className="text-lg font-black text-stone-950">Next best move</h3>
        <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
          {firstTalk ? `Before ${firstTalk.title}, write one question you genuinely want answered. That gives you an easy hallway opener later.` : "Start with a coffee and pick one person to thank or ask for advice."}
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ListPanel title="Conversation openers" items={openerSets[prefs.social]} />
        <ListPanel title="Escape lines" items={["I'm going to grab water before the next session, but it was nice meeting you.", "I promised myself I'd write down notes while they are fresh. See you around.", "I'm going to circulate a bit. Hope your next talk is good."]} />
      </div>
    </div>
  );
}

function RewardsPanel({ xp, checkedCount, connections, prefs, plan, checkedIn, claimedRewards, claimReward, copyText }) {
  const [rewardGuideTab, setRewardGuideTab] = useState("unlock");
  const rewards = buildRewards({ checkedCount, connections, prefs, plan, checkedIn });
  const aiCreditsUnlocked = rewards.filter((reward) => reward.eligible).reduce((sum, reward) => sum + (reward.credits || 0), 0);
  const claimableCount = rewards.filter((reward) => reward.eligible && !claimedRewards[reward.id]).length;
  const claimedCount = rewards.filter((reward) => claimedRewards[reward.id]).length;
  const evidenceSignals = checkedCount + connections.length;
  const unlockSteps = [
    ["Room code", "Verify sessions from the Plan tab after attending.", checkedCount],
    ["Buddy code", "Exchange codes with real attendees in the Buddy tab.", connections.length],
    ["Mixed proof", "Bigger rewards need both learning and networking signals.", Math.min(checkedCount, connections.length)]
  ];

  return (
    <div className="grid gap-4">
      <PanelHeader eyebrow="005 // reward wallet" title="AI credits and claim tickets" />
      <div className="glass-panel overflow-hidden">
        <div className="grid gap-4 bg-[#1f2423] p-5 text-[#fffcef] lg:grid-cols-[0.62fr_0.38fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#88d459]">Participation becomes learning fuel</p>
            <h3 className="mt-3 text-4xl font-black">{aiCreditsUnlocked.toLocaleString()} AI credits unlocked</h3>
            <p className="mt-3 max-w-2xl text-sm font-semibold leading-6 text-[#fffcef]/75">
              Event Buddy keeps XP as the soft progress spine, then converts verified attendance and buddy-code exchanges into tangible credits, passes, and sponsor reward tickets.
            </p>
          </div>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            <Signal label="Claimable" value={claimableCount} />
            <Signal label="Claimed" value={claimedCount} />
            <Signal label="XP spine" value={xp} />
          </div>
        </div>
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <Summary label="AI credits" value={aiCreditsUnlocked.toLocaleString()} />
        <Summary label="Evidence signals" value={evidenceSignals} />
        <Summary label="Reward tickets" value={`${claimedCount}/${rewards.length}`} />
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="glass-panel p-5">
          <h3 className="text-lg font-black text-stone-950">Claimable rewards</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">
            This demo creates claim requests only, not real credit vouchers. Real AI-credit codes must be minted server-side by the organizer or sponsor after validating room-code and buddy-code evidence.
          </p>
          <div className="mt-4 grid gap-3">
            {rewards.map((reward) => {
              const claim = claimedRewards[reward.id];
              return (
                <article key={reward.id} className={`border p-4 ${reward.eligible ? "border-[#1f2423] bg-[#fffcef]" : "border-stone-900/15 bg-[#fffcef]/70"}`}>
                  <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                    <div>
                      <span className={`inline-flex border px-3 py-1 text-[0.68rem] font-black uppercase tracking-[0.14em] ${reward.eligible ? "border-[#88d459] bg-[#88d459]/35 text-stone-950" : "border-stone-900/15 text-stone-500"}`}>
                        {reward.eligible ? claim ? "Claimed" : "Ready" : "Locked"}
                      </span>
                      <h4 className="mt-3 text-xl font-black text-stone-950">{reward.title}</h4>
                      <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">{reward.description}</p>
                    </div>
                    <strong className="shrink-0 text-right text-2xl font-black text-stone-950">{reward.value}</strong>
                  </div>
                  <div className="mt-4 grid gap-2 border-t border-stone-900/10 pt-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.16em] text-[#2199ee]">{reward.requirement}</p>
                      <p className="mt-1 text-sm font-bold text-stone-700">{reward.progress}</p>
                      {claim?.code && (
                        <div className="mt-3 grid gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-stretch">
                          <code className="block min-h-11 border border-stone-900/15 bg-[#1f2423] px-3 py-2 text-sm font-black tracking-[0.12em] text-[#fffcef]">{claim.code}</code>
                          <button className="ghost-button px-4 text-sm font-black" type="button" onClick={() => copyText(claim.code, "Claim request copied.")}>Copy request</button>
                        </div>
                      )}
                    </div>
                    {!claim?.code && (
                      <button className={reward.eligible ? "neo-button px-4 text-sm font-black" : "ghost-button px-4 text-sm font-black opacity-60"} type="button" onClick={() => claimReward(reward)}>
                        {reward.eligible ? "Create request" : "Keep earning"}
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
        <div className="glass-panel h-fit p-5">
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2199ee]">Reward guide</p>
              <h3 className="mt-1 text-lg font-black text-stone-950">
                {rewardGuideTab === "unlock" ? "How rewards unlock" : rewardGuideTab === "claim" ? "How you get the reward" : "Recent connections"}
              </h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[
                ["unlock", "Unlock"],
                ["claim", "Claim"],
                ["connections", "People"]
              ].map(([value, label]) => (
                <button
                  key={value}
                  className={`min-h-10 border px-2 text-xs font-black uppercase tracking-[0.08em] ${rewardGuideTab === value ? "border-[#1f2423] bg-[#88d459] text-stone-950" : "border-stone-900/15 bg-[#fffcef] text-stone-700"}`}
                  type="button"
                  onClick={() => setRewardGuideTab(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {rewardGuideTab === "unlock" && (
            <div className="mt-4 grid gap-2">
              {unlockSteps.map(([label, copy, count]) => (
                <div key={label} className="border border-stone-900/15 bg-[#fffcef]/90 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <strong className="text-stone-950">{label}</strong>
                    <span className="text-sm font-black text-[#2199ee]">{count}</span>
                  </div>
                  <p className="mt-1 text-sm font-semibold leading-5 text-stone-600">{copy}</p>
                </div>
              ))}
            </div>
          )}

          {rewardGuideTab === "claim" && (
            <div className="mt-4 grid gap-3 text-sm font-semibold leading-6 text-stone-700">
              <p><strong className="text-stone-950">1. Prove you joined in:</strong> check in to sessions and exchange buddy codes.</p>
              <p><strong className="text-stone-950">2. Create a claim:</strong> Event Buddy gives you a request ID, not a real voucher code.</p>
              <p><strong className="text-stone-950">3. Collect later:</strong> the organizer or sponsor checks your request and sends the real AI-credit voucher.</p>
            </div>
          )}

          {rewardGuideTab === "connections" && (
            <div className="mt-4 grid gap-2">
              {connections.length ? connections.map((connection) => (
                <article key={`${connection.code}-${connection.createdAt}`} className="border border-stone-900/15 bg-[#fffcef]/90 p-3">
                  <strong className="block text-stone-950">{connection.code}</strong>
                  <span className="text-sm font-semibold text-stone-600">Connected {connection.createdAt}</span>
                </article>
              )) : <p className="text-sm font-semibold text-stone-600">No buddy-code connections yet.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function VenuePanel({ plan, movements, hardMoves, prefs }) {
  const counts = plan.reduce((acc, item) => {
    const key = planVenueKey(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});
  const baseKey = Object.entries(counts).filter(([key]) => key !== "break").sort((a, b) => b[1] - a[1])[0]?.[0] || "break";
  const movementLoad = hardMoves.length >= 3 ? "High" : hardMoves.length >= 1 ? "Moderate" : "Low";
  const items = ["Water bottle", "Charger", "One question per talk"];
  if (prefs.energy <= 2) items.push("Permission to skip one session");
  if (prefs.social !== "low") items.push("LinkedIn QR ready");
  if (prefs.interests.includes("ai")) items.push("AI tool notes to compare");
  if (hardMoves.length) items.push("Leave two minutes before applause");

  return (
    <div className="grid gap-4">
      <PanelHeader eyebrow="006 // room rhythm" title="Transfer plan" />
      <div className="grid gap-3 md:grid-cols-3">
        <Summary label="movement load" value={movementLoad} />
        <Summary label="tight transfers" value={hardMoves.length} />
        <Summary label="home base" value={venueLabel(baseKey)} />
      </div>
      <div className="glass-panel overflow-hidden p-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {plan.map((item) => (
            <span key={`${item.id}-${item.time}`} className="grid min-w-24 place-items-center border border-stone-900/10 bg-[#88d459]/20 px-3 py-3 text-center">
              <strong className="text-sm text-stone-950">{item.time}</strong>
              <small className="font-black uppercase tracking-[0.12em] text-[#1c75bc]">{shortVenueLabel(planVenueKey(item))}</small>
            </span>
          ))}
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-[0.58fr_0.42fr]">
        <div className="glass-panel p-5">
          <h3 className="text-lg font-black text-stone-950">Next transfer watch</h3>
          <div className="mt-4 grid gap-3">
            {movements.length ? movements.slice(0, 3).map((move) => (
              <article key={`${move.time}-${move.from}-${move.to}`} className="border border-stone-900/15 bg-[#fffcef]/90 p-4">
                <strong className="block text-stone-950">{move.time}</strong>
                <span className="text-sm font-black uppercase tracking-[0.12em] text-[#1c75bc]">{venueLabel(move.from)} to {venueLabel(move.to)}</span>
                <p className="mt-2 text-sm font-semibold text-stone-600">{move.note}</p>
              </article>
            )) : <p className="text-sm font-semibold text-stone-600">No venue transfers in this plan.</p>}
          </div>
        </div>
        <div className="glass-panel p-5">
          <h3 className="text-lg font-black text-stone-950">Field notes</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-stone-600">{movementAdvice(hardMoves.length, prefs.energy)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {items.map((item) => (
              <span key={item} className="border border-stone-900/10 bg-[#88d459]/20 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#1f2423]">{item}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PanelHeader({ eyebrow, title, actions = [] }) {
  return (
    <div className="glass-panel flex flex-col justify-between gap-4 p-5 md:flex-row md:items-center">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">{eyebrow}</p>
        <h2 className="mt-1 text-3xl font-black text-stone-950">{title}</h2>
      </div>
      {actions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {actions.map(([label, onClick, Icon]) => (
            <button key={label} className="ghost-button flex items-center gap-2 px-3 text-sm font-black" type="button" onClick={onClick}>
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Segment({ label, value, options, onChange }) {
  return (
    <div>
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.22em] text-[#2199ee]">{label}</span>
      <div className="grid grid-cols-3 gap-2">
        {options.map(([id, text]) => (
          <button key={id} className={`min-h-10 px-2 text-xs font-black ${value === id ? "tab-active" : "ghost-button"}`} type="button" onClick={() => onChange(id)}>
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

function Ticker() {
  const items = ["AI fluency", "CPython internals", "Topic modeling", "Supply chain security", "Hallway track", "Workshops", "Property-based testing", "Data storytelling"];
  return (
    <div className="overflow-hidden rounded-full border border-stone-900/15 bg-[#fffcef]/90 py-3">
      <div className="ticker-track flex w-max gap-8 whitespace-nowrap px-4 text-xs font-black uppercase tracking-[0.22em] text-[#1f2423]">
        {[...items, ...items, ...items].map((item, index) => <span key={`${item}-${index}`}>{item}</span>)}
      </div>
    </div>
  );
}

function MethodStrip() {
  const methods = [
    ["Listen", "Import the messy agenda without forcing it into a brittle calendar."],
    ["Sense", "Read goals, energy, social appetite, conflicts, and room movement together."],
    ["Nudge", "Suggest one useful next move instead of flooding the attendee with choices."],
    ["Remember", "Turn check-ins and buddy codes into a lightweight trail of participation."]
  ];
  const steps = ["Import agenda", "Tune preferences", "Verify + connect"];
  return (
    <section className="method-strip grid gap-3 md:grid-cols-4">
      <div className="method-guide border border-stone-900/15 bg-[#fffcef]/90 p-4 text-stone-950 shadow-[0_18px_45px_rgba(31,36,35,0.08)] md:col-span-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#2199ee]">How to use Event Buddy</p>
          <p className="mt-2 text-sm font-bold leading-6 text-stone-700">Bring any event schedule, let the app rank a realistic day, then use room codes and buddy codes to leave a lightweight participation trail.</p>
        </div>
        <div className="method-steps mt-3 grid gap-2 sm:grid-cols-3">
          {steps.map((step, index) => (
            <span key={step} className="border border-stone-900/10 bg-[#88d459]/20 px-3 py-2 text-xs font-black uppercase tracking-[0.12em] text-stone-800">
              {index + 1}. {step}
            </span>
          ))}
        </div>
      </div>
      {methods.map(([title, copy], index) => (
        <article key={title} className={`method-card ${["mm-yellow", "mm-blue", "mm-coral", "mm-hero"][index]} min-h-40 rounded-[30px] border border-stone-900/15 p-5 text-stone-950 shadow-[0_18px_45px_rgba(31,36,35,0.10)]`}>
          <span className="text-xs font-black uppercase tracking-[0.2em]">0{index + 1}</span>
          <h3 className="mt-5 text-2xl font-black">{title}</h3>
          <p className="method-copy mt-2 text-sm font-bold leading-6">{copy}</p>
        </article>
      ))}
    </section>
  );
}

function PeopleDoodle() {
  return (
    <div className="pointer-events-none absolute right-2 top-16 z-0 hidden h-[390px] w-[430px] opacity-45 lg:block" aria-hidden="true">
      <div className="absolute right-8 top-6 h-56 w-56 rounded-full border-[3px] border-stone-950/30" />
      <div className="absolute right-28 top-20 h-24 w-24 rounded-full bg-[#fffcef] shadow-[inset_0_0_0_3px_rgba(31,36,35,0.9)]">
        <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-stone-950/80" />
        <span className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2199ee]" />
        <span className="absolute right-5 top-5 h-3 w-3 rounded-full bg-[#ff6c5c]" />
        <span className="absolute bottom-5 left-6 h-3 w-8 rounded-full bg-[#88d459]" />
      </div>
      <div className="absolute right-10 top-52 h-20 w-32 rounded-[28px] bg-[#2199ee] shadow-[inset_0_0_0_3px_rgba(31,36,35,0.9)]" />
      <div className="absolute right-52 top-48 h-20 w-20 rounded-full bg-[#f9df2f] shadow-[inset_0_0_0_3px_rgba(31,36,35,0.9)]">
        <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[4px] border-stone-950/80" />
        <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stone-950" />
        <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-[#ff6c5c]" />
      </div>
      <div className="absolute right-64 top-24 h-16 w-28 rounded-[24px] bg-[#ff6c5c] shadow-[inset_0_0_0_3px_rgba(31,36,35,0.9)]" />
      <div className="absolute bottom-4 right-20 h-28 w-60 rounded-[32px] border-[3px] border-stone-950/70 bg-[#fffcef] p-4">
        <div className="h-3 w-28 rounded-full bg-stone-950/80" />
        <div className="mt-3 grid gap-2">
          <span className="h-2 rounded-full bg-stone-950/20" />
          <span className="h-2 w-4/5 rounded-full bg-stone-950/20" />
        </div>
        <div className="mt-4 grid grid-cols-4 gap-2">
          <span className="h-3 rounded-full bg-[#88d459]" />
          <span className="h-3 rounded-full bg-[#2199ee]" />
          <span className="h-3 rounded-full bg-[#ff6c5c]" />
          <span className="h-3 rounded-full bg-[#f9df2f]" />
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="flex min-h-16 items-center justify-between border border-stone-900/15 bg-[#fffcef]/90 px-4">
      <span className="flex items-center gap-2 text-sm font-bold text-stone-700"><Icon className="h-4 w-4 text-[#2199ee]" /> {label}</span>
      <strong className="text-xl font-black text-stone-950">{value}</strong>
    </div>
  );
}

function Summary({ label, value }) {
  return (
    <div className="glass-panel p-4">
      <span className="block text-3xl font-black text-stone-950">{value}</span>
      <small className="text-xs font-black uppercase tracking-[0.16em] text-stone-600">{label}</small>
    </div>
  );
}

function Signal({ label, value }) {
  return (
    <div className="border border-stone-900/15 bg-[#fffcef]/90 p-4">
      <strong className="block text-lg font-black text-stone-950">{value}</strong>
      <span className="text-xs font-black uppercase tracking-[0.16em] text-stone-600">{label}</span>
    </div>
  );
}

function ListPanel({ title, items }) {
  return (
    <div className="glass-panel p-5">
      <h3 className="text-lg font-black text-stone-950">{title}</h3>
      <ul className="mt-3 grid gap-2">
        {items.map((item) => (
          <li key={item} className="border border-stone-900/15 bg-[#fffcef]/90 p-3 text-sm font-semibold leading-6 text-stone-700">{item}</li>
        ))}
      </ul>
    </div>
  );
}

function session(id, day, time, end, venue, venueKey, title, speaker, tags, type, description) {
  return { id, day, time, end, venue, venueKey, title, speaker, tags, type, description };
}

function talk(id, day, time, end, venue, title, speaker, tags, description) {
  return session(id, day, time, end, `Venue ${venue}`, venue.toLowerCase(), title, speaker, tags, "talk", description);
}

function workshop(id, day, time, end, title, description, tags) {
  return session(id, day, time, end, "Workshop room", "workshop", title, "PyConSG", tags, "workshop", description);
}

function breakSlot(id, day, time, end, title, tags) {
  return session(id, day, time, end, "Common area", "break", title, "You", tags, "break", "Recharge, eat, hydrate, and let your brain index the previous talks.");
}

function buildPlan(sessions, prefs) {
  const daySessions = sessions.filter((item) => item.day === prefs.day);
  const groups = groupByTime(daySessions);
  const plan = [];
  const alternatives = [];
  groups.forEach(([time, items]) => {
    const breakItem = items.find((item) => item.type === "break");
    if (breakItem) {
      if (prefs.breaks || prefs.energy <= 2) plan.push({ ...breakItem, score: 100, reason: "Protected recovery block" });
      return;
    }
    const ranked = items.map((item) => ({ ...item, score: scoreSession(item, prefs, plan) })).sort((a, b) => b.score - a.score);
    const chosen = ranked[0];
    if (!chosen) return;
    if (shouldSkipForEnergy(chosen, plan, prefs.energy)) {
      plan.push(makeMicroBreak(time, chosen.end, prefs.day));
      alternatives.push({ time, skipped: chosen, reason: "Energy guardrail inserted a decompression block" });
      return;
    }
    plan.push({ ...chosen, reason: explainChoice(chosen, prefs.interests) });
    if (ranked.length > 1) alternatives.push({ time, chosen, other: ranked[1], reason: `Conflict resolved: ${chosen.title} edged out ${ranked[1].title}` });
  });
  return { plan, alternatives };
}

function groupByTime(items) {
  const map = new Map();
  items.forEach((item) => {
    if (!map.has(item.time)) map.set(item.time, []);
    map.get(item.time).push(item);
  });
  return [...map.entries()].sort(([a], [b]) => a.localeCompare(b));
}

function scoreSession(item, prefs, plan) {
  let score = item.type === "keynote" ? 70 : 45;
  score += item.tags.filter((tag) => prefs.interests.includes(tag)).length * 18;
  if (item.type === "community" && prefs.social === "high") score += 18;
  if (item.type === "workshop" && prefs.energy >= 3) score += 10;
  if (prefs.track === item.venueKey) score += 9;
  if (prefs.track === "mix") score += item.venueKey === lastVenueKey(plan) ? -8 : 8;
  if (prefs.energy <= 2 && item.tags.includes("python-core")) score -= 4;
  return Math.max(0, score);
}

function shouldSkipForEnergy(item, plan, energy) {
  const streak = plan.slice(-3).filter((planItem) => planItem.type === "talk" || planItem.type === "keynote").length;
  return energy <= 2 && streak >= 3 && item.type === "talk";
}

function makeMicroBreak(time, end, day) {
  return session(`break-${time}`, day, time, end, "Quiet corner", "break", "Decompression break", "You", ["community"], "microbreak", "Step out, hydrate, write one note, and return with a working brain.");
}

function lastVenueKey(plan) {
  return [...plan].reverse().find((item) => item.venueKey !== "break")?.venueKey;
}

function explainChoice(item, interests) {
  const matches = item.tags.filter((tag) => interests.includes(tag));
  if (matches.length) return `Matches ${matches.join(", ")}.`;
  if (item.type === "keynote") return "Conference-wide context worth anchoring on.";
  return "Best available fit for this time block.";
}

function parseScheduleText(text) {
  if (!text) return [];
  return text.split(/\n+/).map((line) => line.trim()).filter(Boolean).map(parseScheduleLine).filter(Boolean);
}

function normalizeImportedSessions(imported) {
  return imported.map((item, index) => ({
    id: item.id || `api-${index}-${String(item.time || "0000").replace(":", "")}`,
    day: item.day || "day1",
    time: normalizeTime(item.time || "09:00"),
    end: normalizeTime(item.end || item.finish || "09:30"),
    venue: item.venue || "Event space",
    venueKey: item.venueKey || inferVenueKey(item.venue || "", index),
    title: item.title || "Untitled event block",
    speaker: item.speaker || "Event team",
    tags: Array.isArray(item.tags) && item.tags.length ? item.tags : inferTags(`${item.title || ""} ${item.description || ""}`),
    type: item.type || inferType(item.title || "", item.venue || "", item.description || ""),
    description: item.description || importedDescription(item.type || "talk", item.tags || ["community"])
  }));
}

function parseScheduleLine(line, index = 0) {
  const timeMatch = line.match(/(\d{1,2}[:.]\d{2})\s*(?:-|–|—|to)\s*(\d{1,2}[:.]\d{2})/i);
  if (!timeMatch) return null;
  const time = normalizeTime(timeMatch[1]);
  const end = normalizeTime(timeMatch[2]);
  const withoutTime = line.replace(timeMatch[0], "").replace(/^[\s|,;:-]+/, "").trim();
  const parts = withoutTime.split("|").map((part) => part.trim()).filter(Boolean);
  const venue = parts.length > 1 ? parts[0] : inferVenue(withoutTime);
  const title = parts.length > 1 ? parts[1] : withoutTime.replace(venue, "").replace(/^[\s|,;:-]+/, "").trim();
  const speaker = parts[2] || "Event team";
  const tags = inferTags(`${line} ${parts.slice(3).join(" ")}`);
  const type = inferType(title, venue, line);
  return session(`imported-${index}-${time.replace(":", "")}`, "day1", time, end, venue, inferVenueKey(venue, index), title || "Untitled event block", speaker, tags, type, parts[3] || importedDescription(type, tags));
}

function parseCsvSchedule(text) {
  const rows = text.split(/\r?\n/).map(parseCsvRow).filter((row) => row.some(Boolean));
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.trim().toLowerCase());
  return rows.slice(1).map((row, index) => sessionFromCsvRow(headers, row, index)).filter(Boolean);
}

function parseCsvRow(line) {
  const cells = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    const next = line[index + 1];
    if (char === '"' && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(cell.trim());
      cell = "";
    } else {
      cell += char;
    }
  }
  cells.push(cell.trim());
  return cells;
}

function sessionFromCsvRow(headers, row, index) {
  const get = (...names) => {
    const found = names.map((name) => headers.indexOf(name)).find((position) => position >= 0);
    return found >= 0 ? row[found] || "" : "";
  };
  const start = get("start", "time", "starts at", "start time");
  const end = get("end", "finish", "ends at", "end time") || addMinutes(start, 45);
  const title = get("title", "session", "name", "summary");
  if (!start || !title) return null;
  const venue = get("venue", "room", "location", "stage") || "Event space";
  const tags = inferTags(`${get("track", "tags", "category")} ${title}`);
  const type = inferType(title, venue, get("type", "format", "track"));
  return session(`csv-${index}-${normalizeTime(start).replace(":", "")}`, dayFromLabel(get("day", "date")), normalizeTime(start), normalizeTime(end), venue, inferVenueKey(venue, index), title, get("speaker", "speakers", "presenter", "host") || "Event team", tags, type, get("description", "abstract") || importedDescription(type, tags));
}

function parseIcsSchedule(text) {
  const events = text.split("BEGIN:VEVENT").slice(1).map((block) => block.split("END:VEVENT")[0]);
  const days = new Map();
  return events.map((block, index) => {
    const startRaw = icsValue(block, "DTSTART");
    const endRaw = icsValue(block, "DTEND") || "";
    const title = cleanIcsText(icsValue(block, "SUMMARY"));
    if (!startRaw || !title) return null;
    const dateKey = startRaw.slice(0, 8);
    if (!days.has(dateKey)) days.set(dateKey, `day${days.size + 1}`);
    const venue = cleanIcsText(icsValue(block, "LOCATION")) || "Event space";
    const description = cleanIcsText(icsValue(block, "DESCRIPTION")) || importedDescription(inferType(title, venue, ""), inferTags(title));
    const tags = inferTags(`${title} ${description}`);
    const type = inferType(title, venue, description);
    return session(`ics-${index}-${timeFromIcs(startRaw).replace(":", "")}`, days.get(dateKey), timeFromIcs(startRaw), endRaw ? timeFromIcs(endRaw) : addMinutes(timeFromIcs(startRaw), 45), venue, inferVenueKey(venue, index), title, "Calendar event", tags, type, description);
  }).filter(Boolean);
}

function icsValue(block, key) {
  const line = block.replace(/\r?\n[ \t]/g, "").split(/\r?\n/).find((item) => item.startsWith(`${key}:`) || item.startsWith(`${key};`));
  return line ? line.slice(line.indexOf(":") + 1).trim() : "";
}

function cleanIcsText(value) {
  return value.replace(/\\n/g, " ").replace(/\\,/g, ",").replace(/\\;/g, ";").trim();
}

function timeFromIcs(value) {
  const match = value.match(/T?(\d{2})(\d{2})/);
  return match ? `${match[1]}:${match[2]}` : "09:00";
}

function normalizeTime(value) {
  const [hour, minute = "00"] = String(value || "09:00").replace(".", ":").split(":");
  return `${hour.padStart(2, "0")}:${minute.slice(0, 2).padEnd(2, "0")}`;
}

function inferVenue(text) {
  return text.match(/\b(?:main hall|hall|room|venue|stage|workshop|lab|auditorium)\s*[A-Z0-9-]*/i)?.[0] || "Event space";
}

function inferVenueKey(venue, index) {
  const value = venue.toLowerCase();
  if (value.includes("main") || value.includes("hall")) return "plenary";
  if (value.includes("workshop") || value.includes("lab")) return "workshop";
  if (value.includes("break") || value.includes("lunch")) return "break";
  if (/\ba\b/.test(value) || value.includes("room a") || value.includes("venue a")) return "a";
  if (/\bb\b/.test(value) || value.includes("room b") || value.includes("venue b")) return "b";
  return index % 2 === 0 ? "a" : "b";
}

function inferTags(text) {
  const value = text.toLowerCase();
  const tags = [];
  if (/(ai|agent|llm|machine learning|ml|copilot)/.test(value)) tags.push("ai");
  if (/(data|analytics|model|forecast|database)/.test(value)) tags.push("data");
  if (/(python|cpython|package|testing|type)/.test(value)) tags.push("python-core");
  if (/(security|trust|risk|supply chain|privacy)/.test(value)) tags.push("security");
  if (/(infra|cloud|backend|api|deploy|platform)/.test(value)) tags.push("infra");
  if (/(career|learn|skill|student|mentor)/.test(value)) tags.push("career");
  if (/(community|network|hallway|meetup|social)/.test(value)) tags.push("community");
  return tags.length ? [...new Set(tags)] : ["community"];
}

function inferType(title, venue, text) {
  const value = `${title} ${venue} ${text}`.toLowerCase();
  if (/(break|lunch|coffee|tea)/.test(value)) return "break";
  if (/workshop|lab|hands-on|sprint/.test(value)) return "workshop";
  if (/keynote|opening|closing/.test(value)) return "keynote";
  if (/network|community|meetup|hackathon/.test(value)) return "community";
  return "talk";
}

function importedDescription(type, tags) {
  if (type === "break") return "A natural reset window for food, notes, messages, and venue movement.";
  if (type === "workshop") return "A hands-on block worth checking into if it matches your goals.";
  if (type === "community") return "A social or collaboration block that can earn connection progress.";
  return `Recommended because it matches ${tags.join(", ")} goals.`;
}

function eventNameFromUrl(url) {
  if (!url) return "";
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    return host.split(".")[0].replace(/[-_]+/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
  } catch {
    return "";
  }
}

function addMinutes(time, minutes) {
  const [hour, minute] = normalizeTime(time || "09:00").split(":").map(Number);
  const total = hour * 60 + minute + minutes;
  return `${String(Math.floor(total / 60) % 24).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
}

function dayFromLabel(value) {
  const match = String(value || "").match(/(\d+)/);
  return match ? `day${Math.min(3, Math.max(1, Number(match[1])))}` : "day1";
}

function sessionToPasteLine(item) {
  return `${item.time}-${item.end} | ${item.venue} | ${item.title} | ${item.speaker} | ${item.tags.join(", ")}`;
}

function isCheckInEligible(item) {
  return ["talk", "keynote", "workshop", "community"].includes(item.type);
}

function sessionPoints(item) {
  if (item.type === "workshop") return 25;
  if (item.type === "community") return 15;
  return 10;
}

function sessionCodeFor(item, eventInfo) {
  const time = item.time.replace(":", "");
  const day = item.day.replace("day", "D");
  const venue = shortVenueLabel(planVenueKey(item)).replace(/[^A-Z0-9]/gi, "").toUpperCase().slice(0, 2) || "PY";
  const prefix = eventInfo.name?.toLowerCase().includes("pycon") ? "PY" : "EV";
  return `${prefix}${day}${time}${venue}`;
}

function questXp(sessions, checkedIn, connections) {
  return sessions.filter((item) => checkedIn.has(item.id)).reduce((sum, item) => sum + sessionPoints(item), 0) + connections.length * 15;
}

function buildRewards({ checkedCount, connections, prefs, plan, checkedIn }) {
  const connectionCount = connections.length;
  const checkedWorkshop = plan.some((item) => item.type === "workshop" && checkedIn.has(item.id));
  const checkedCommunity = plan.some((item) => item.type === "community" && checkedIn.has(item.id));
  const hasProtectedBreak = plan.some((item) => item.type === "break" || item.type === "microbreak");
  const socialTarget = prefs.social === "high" ? 3 : prefs.social === "balanced" ? 2 : 1;
  return [
    {
      id: "ai-starter",
      title: "AI Starter Credits",
      value: "250",
      credits: 250,
      requirement: "Verify one session",
      progress: `${Math.min(checkedCount, 1)}/1 session verified`,
      eligible: checkedCount >= 1,
      description: "A small AI playground voucher for attendees who prove they followed a learning path."
    },
    {
      id: "ai-collab",
      title: "Collaborative AI Boost",
      value: "500",
      credits: 500,
      requirement: "Verify two sessions and one buddy connection",
      progress: `${Math.min(checkedCount, 2)}/2 sessions, ${Math.min(connectionCount, 1)}/1 connection`,
      eligible: checkedCount >= 2 && connectionCount >= 1,
      description: "Higher credits for people who combine session attendance with real hallway exchange."
    },
    {
      id: "speaker-lab",
      title: "Speaker Lab Pass",
      value: "PASS",
      credits: 0,
      requirement: "Verify a workshop or community session",
      progress: checkedWorkshop || checkedCommunity ? "1/1 eligible session verified" : "0/1 eligible session verified",
      eligible: checkedWorkshop || checkedCommunity,
      description: "Priority access to a small-group speaker clinic, lab table, or post-talk office-hours queue."
    },
    {
      id: "sponsor-sandbox",
      title: "Sponsor Sandbox Token",
      value: "750",
      credits: 750,
      requirement: `Verify three sessions and ${socialTarget} buddy connection${socialTarget === 1 ? "" : "s"}`,
      progress: `${Math.min(checkedCount, 3)}/3 sessions, ${Math.min(connectionCount, socialTarget)}/${socialTarget} connections`,
      eligible: checkedCount >= 3 && connectionCount >= socialTarget,
      description: "A booth-redeemable API, cloud, or notebook sandbox credit sponsored by event partners."
    },
    {
      id: "recharge-voucher",
      title: "Recharge Voucher",
      value: "COFFEE",
      credits: 0,
      requirement: "Verify one session and keep a protected reset break",
      progress: `${Math.min(checkedCount, 1)}/1 session, ${hasProtectedBreak ? "break protected" : "no reset break"}`,
      eligible: checkedCount >= 1 && hasProtectedBreak,
      description: "A low-cost organizer perk that rewards healthy pacing instead of nonstop session chasing."
    }
  ];
}

function rewardClaimRequestId(reward, eventInfo, buddyCode) {
  const typePart = reward.credits ? "AICR" : reward.value === "PASS" ? "LAB" : "PERK";
  const eventPart = (eventInfo.name || "EVENT").replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4) || "EVNT";
  const rewardPart = reward.id.replace(/[^a-z0-9]/gi, "").toUpperCase().slice(0, 4) || "RWRD";
  const hash = hashString(`${reward.id}-${eventPart}-${buddyCode}`).toString(36).toUpperCase().slice(0, 4).padStart(4, "0");
  return `REQ-${eventPart}-${typePart}-${rewardPart}-${hash}`;
}

function hashString(value) {
  return [...String(value)].reduce((hash, char) => ((hash << 5) - hash + char.charCodeAt(0)) >>> 0, 2166136261);
}

function movementSegments(plan) {
  const segments = [];
  for (let index = 1; index < plan.length; index += 1) {
    const previous = plan[index - 1];
    const current = plan[index];
    const from = planVenueKey(previous);
    const to = planVenueKey(current);
    if (from === to && current.type !== "break") continue;
    const risk = from === "break" || to === "break" ? "buffered" : from === to ? "steady" : "tight";
    segments.push({ from, to, risk, time: `${previous.end}-${current.time}`, note: transferNote(previous, current, risk) });
  }
  return segments;
}

function transferNote(previous, current, risk) {
  if (risk === "steady") return `Stay near ${venueLabel(current.venueKey)} and use the gap for notes.`;
  if (risk === "buffered") return "This is a natural reset window: water, messages, restroom, then move.";
  return `Move right after the previous block; next stop is ${venueLabel(current.venueKey)}.`;
}

function movementAdvice(moveCount, energy) {
  if (moveCount >= 3) return energy <= 2 ? "Several tight moves: keep one skip option and sit near aisle edges." : "Worth keeping: sit near aisles and pre-pack before sessions end.";
  if (moveCount >= 1) return "A few useful transfers: use them as hallway-track moments.";
  return "Low movement day: save energy for questions and follow-ups.";
}

function planVenueKey(item) {
  return item.venueKey || (item.venue?.includes("Event Hall") ? "plenary" : "other");
}

function countTags(plan) {
  const counts = {};
  plan.forEach((item) => item.tags.forEach((tag) => {
    counts[tag] = (counts[tag] || 0) + 1;
  }));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function networkingPromptCount(social) {
  return social === "low" ? 1 : social === "balanced" ? 2 : 4;
}

function normalizeCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);
}

function normalizeBuddyCode(value) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8);
}

function makeBuddyCode() {
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const prefix = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
  return `${prefix}${Math.floor(10 + Math.random() * 90)}`;
}

function safeArray(key) {
  try {
    return JSON.parse(localStorage.getItem(key) || "[]");
  } catch {
    return [];
  }
}

function safeSet(key) {
  return new Set(safeArray(key));
}

function safeObject(key) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "{}");
    return value && typeof value === "object" && !Array.isArray(value) ? value : {};
  } catch {
    return {};
  }
}

function cleanClaimedRewards(value) {
  return Object.fromEntries(Object.entries(value).filter(([, claim]) => {
    const code = claim?.code || "";
    return code.startsWith("REQ-") && !/^REQ-AI-\d/i.test(code);
  }));
}

function labelType(type) {
  return { keynote: "Keynote", talk: "Talk", break: "Break", microbreak: "Break", workshop: "Workshop", community: "Community", plenary: "Plenary" }[type] || type;
}

function venueLabel(key) {
  return { a: "Venue A", b: "Venue B", break: "Breaks", workshop: "Workshops", plenary: "Main hall" }[key] || "Other";
}

function shortVenueLabel(key) {
  return { a: "A", b: "B", break: "Break", workshop: "Workshop", plenary: "Hall" }[key] || "Other";
}

function dayLabel(day) {
  return { day1: "Day 1", day2: "Day 2", day3: "Day 3" }[day] || "Day 1";
}

function socialLabel(social) {
  return { low: "Quiet", balanced: "Balanced", high: "Social" }[social] || "Balanced";
}

function summarizeInterests(interests) {
  if (!interests.length) return "Open agenda";
  const labels = { ai: "AI", data: "Data", "python-core": "Python", security: "Security", infra: "Infra", career: "Career", community: "Community" };
  const picked = interests.slice(0, 2).map((item) => labels[item] || item);
  return interests.length > 2 ? `${picked.join(" + ")} +${interests.length - 2}` : picked.join(" + ");
}

function idLabel(id) {
  return {
    beginner: "First event",
    ai: "AI builder",
    backend: "Backend engineer",
    social: "Hallway track"
  }[id] || id;
}
