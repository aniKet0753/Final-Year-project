"use client";

import { useState } from "react";
import Link from "next/link";
import { Fraunces, Manrope } from "next/font/google";
import {
  Leaf, Menu, X, Sparkles, Pill, Fingerprint, Activity, Video, Users,
  MessageCircle, BookOpen, FileText, ShieldCheck, Stethoscope, Check,
  Wind, Flame, Droplets, ArrowUpRight,
} from "lucide-react";

const display = Fraunces({ subsets: ["latin"], variable: "--font-display", axes: ["opsz"] });
const body = Manrope({ subsets: ["latin"], variable: "--font-body" });

/* ---------- sample data for the live hero demo ---------- */
const DOSHA = {
  Vata: { icon: Wind, bar: "bg-[#7B8BE0]", text: "text-[#5765C4]" },
  Pitta: { icon: Flame, bar: "bg-[#E9A825]", text: "text-[#B87A08]" },
  Kapha: { icon: Droplets, bar: "bg-[#0E9F8E]", text: "text-[#0B7F72]" },
};
type Dosha = keyof typeof DOSHA;

const SYMPTOMS: Array<{ id: string; label: string; dosha: Dosha; herb: string; why: string }> = [
  { id: "acidity", label: "Acidity after meals", dosha: "Pitta", herb: "Amalaki", why: "cooling and gentle on digestion" },
  { id: "skin", label: "Skin irritation", dosha: "Pitta", herb: "Neem", why: "traditionally used to purify" },
  { id: "restless", label: "Restless mind", dosha: "Vata", herb: "Ashwagandha", why: "grounding and calming" },
  { id: "bloating", label: "Bloating", dosha: "Vata", herb: "Triphala", why: "supports regular digestion" },
  { id: "congestion", label: "Heavy congestion", dosha: "Kapha", herb: "Tulsi", why: "warming, clears the chest" },
  { id: "sluggish", label: "Sluggish mornings", dosha: "Kapha", herb: "Ginger", why: "stimulates circulation" },
];
function HeroDemo() {
  const [sel, setSel] = useState(["acidity", "skin"]);
  const picked = SYMPTOMS.filter((s) => sel.includes(s.id));
  const counts: Record<Dosha, number> = { Vata: 0, Pitta: 0, Kapha: 0 };
  picked.forEach((s) => counts[s.dosha]++);
  const total = picked.length || 1;
  const lead = (Object.entries(counts) as [Dosha, number][]).sort((a, b) => b[1] - a[1])[0]!;
  const toggle = (id: string) => setSel((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));

  return (
    <div className="rounded-[28px] bg-white p-6 shadow-[0_30px_80px_-30px_rgba(11,59,50,0.45)] ring-1 ring-[#0B3B32]/10 sm:p-8">
      <div className="flex items-center justify-between">
        <h3 className="font-[family-name:var(--font-display)] text-xl text-[#0B3B32]">Try it: what are you feeling?</h3>
        <span className="rounded-full bg-[#F1F7F4] px-3 py-1 text-xs font-medium text-[#3F5F57]">Sample preview</span>
      </div>
      <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Select symptoms">
        {SYMPTOMS.map((s) => {
          const on = sel.includes(s.id);
          return (
            <button key={s.id} onClick={() => toggle(s.id)} aria-pressed={on}
              className={`rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E8F86] ${
                on ? "bg-[#0B3B32] text-white" : "bg-[#F1F7F4] text-[#2B4A42] hover:bg-[#E2F0EA]"}`}>
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl bg-[#F6FAF8] p-5">
        {picked.length === 0 ? (
          <p className="py-6 text-center text-sm text-[#5C7770]">Pick a symptom to see how the analysis reads it.</p>
        ) : (
          <>
            <p className="text-sm text-[#5C7770]">Your pattern leans toward</p>
            <p className={`font-[family-name:var(--font-display)] text-3xl ${DOSHA[lead[0]].text}`}>{lead[0]} imbalance</p>
            <div className="mt-4 space-y-2.5">
              {(Object.entries(counts) as [Dosha, number][]).map(([name, n]) => {
                const Icon = DOSHA[name].icon;
                return (
                  <div key={name} className="flex items-center gap-3 text-sm">
                    <Icon className={`h-4 w-4 ${DOSHA[name].text}`} aria-hidden />
                    <span className="w-12 font-medium text-[#2B4A42]">{name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white">
                      <div className={`h-full rounded-full transition-all duration-500 ${DOSHA[name].bar}`} style={{ width: `${(n / total) * 100}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <ul className="mt-5 divide-y divide-[#0B3B32]/10 border-t border-[#0B3B32]/10">
              {picked.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-4 py-2.5 text-sm">
                  <span className="font-semibold text-[#0B3B32]">{s.herb}</span>
                  <span className="text-right text-[#5C7770]">{s.why}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <p className="mt-4 text-xs text-[#6B847D]">Illustration only. Real results use your full symptom history and severity.</p>
    </div>
  );
}

/* ---------- page ---------- */
const NAV = [["Features", "#features"], ["How it works", "#how"], ["Safety", "#safety"]];

export default function Landing() {
  const [open, setOpen] = useState(false);
  const btn = "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0E8F86]";

  return (
    <div className={`${display.variable} ${body.variable} min-h-screen bg-white font-[family-name:var(--font-body)] text-[#10231F] antialiased`}>
      <style>{`
        @keyframes rise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:none}}
        .rise{animation:rise .8s cubic-bezier(.2,.7,.2,1) both}
        @media (prefers-reduced-motion:reduce){.rise{animation:none}}
        html{scroll-behavior:smooth}
      `}</style>

      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-[#0B3B32]/10 bg-white/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#0E9F6E] to-[#0E8F86] text-white"><Leaf className="h-5 w-5" /></span>
            <span className="font-[family-name:var(--font-display)] text-xl font-semibold text-[#0B3B32]">AyurTech Pro</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(([l, h]) => <a key={l} href={h} className="text-sm font-medium text-[#3F5F57] hover:text-[#0B3B32]">{l}</a>)}
            <Link href="/signup" className="rounded-full bg-[#0B3B32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0E4A3F]">sign Up</Link>
            <Link href="/signin" className="rounded-full bg-[#0B3B32] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0E4A3F]">sign In</Link>


          </nav>
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
        {open && (
          <div className="border-t border-[#0B3B32]/10 bg-white px-5 py-4 md:hidden">
            {NAV.map(([l, h]) => <a key={l} href={h} onClick={() => setOpen(false)} className="block py-2.5 font-medium">{l}</a>)}
            <Link href="/dashboard" className={`${btn} mt-2 w-full bg-[#0B3B32] text-white`}>Open dashboard</Link>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E6F5EE] via-[#F3FAF7] to-white">
        <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#0E8F86]/15 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -left-32 top-64 h-[360px] w-[360px] rounded-full bg-[#E9A825]/15 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-24 pt-16 lg:grid-cols-[1.05fr_1fr] lg:pt-24">
          <div className="rise">
            <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#0B6B5F] ring-1 ring-[#0B3B32]/10">
              <Sparkles className="h-4 w-4 text-[#E9A825]" /> AI meets 5,000 years of Ayurveda
            </p>
            <h1 className="mt-6 font-[family-name:var(--font-display)] text-5xl font-medium leading-[1.05] tracking-tight text-[#0B3B32] sm:text-6xl lg:text-[4.4rem]">
              Understand your body the Ayurvedic way.
            </h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#3F5F57]">
              Describe how you feel. AyurTech Pro reads your symptoms through your dosha, suggests herbs and lifestyle changes, and connects you to real practitioners when you need one.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/dashboard" className={`${btn} bg-gradient-to-r from-[#0E9F6E] to-[#0E8F86] text-white shadow-lg shadow-[#0E8F86]/30 hover:brightness-110`}>
                Start symptom analysis <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link href="/dashboard" className={`${btn} bg-white text-[#0B3B32] ring-1 ring-[#0B3B32]/15 hover:bg-[#F1F7F4]`}>Take the Prakriti test</Link>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-[#5C7770]">
              <ShieldCheck className="h-4 w-4 text-[#0E8F86]" /> Free to try. Educational guidance, not a diagnosis.
            </p>
          </div>
          <div className="rise" style={{ animationDelay: ".15s" }}><HeroDemo /></div>
        </div>
      </section>

      {/* Herb strip */}
      <section aria-label="Herbs in our database" className="border-y border-[#0B3B32]/10 bg-[#0B3B32]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-6 font-[family-name:var(--font-display)] text-lg italic text-[#BFE3D6]">
          {["Ashwagandha", "Tulsi", "Triphala", "Brahmi", "Amalaki", "Neem", "Guduchi", "Turmeric"].map((h) => <span key={h}>{h}</span>)}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
        <div className="max-w-2xl">
          <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium leading-tight text-[#0B3B32] sm:text-5xl">One place for diagnosis, remedies and follow-up care.</h2>
          <p className="mt-4 text-lg text-[#3F5F57]">Everything in the dashboard you already know, organised around how Ayurveda actually works.</p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-6">
          {/* AI diagnosis: the hero feature */}
          <article className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0B3B32] to-[#0B5A52] p-8 text-white lg:col-span-4 lg:p-10">
            <div aria-hidden className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#E9A825]/20 blur-3xl" />
            <Sparkles className="h-7 w-7 text-[#E9A825]" />
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-3xl">AI symptom analysis</h3>
            <p className="mt-3 max-w-md text-[#CFE9DF]">Choose symptoms, set severity, and get a dosha-aware reading with matched medicines, diet and daily routine.</p>
            <ul className="mt-6 grid gap-2.5 text-[15px] text-[#E4F4EE] sm:grid-cols-2">
              {["Severity-aware suggestions", "Dosha-based reasoning", "Herb and formulation matches", "Clear when to see a doctor"].map((t) => (
                <li key={t} className="flex items-center gap-2"><Check className="h-4 w-4 text-[#E9A825]" />{t}</li>
              ))}
            </ul>
          </article>

          {/* Prakriti */}
          <article className="rounded-[20px] bg-[#FFF7E3] p-8 ring-1 ring-[#E9A825]/30 lg:col-span-2">
            <Fingerprint className="h-7 w-7 text-[#B87A08]" />
            <h3 className="mt-5 font-[family-name:var(--font-display)] text-2xl text-[#0B3B32]">Prakriti test</h3>
            <p className="mt-2 text-[#5A4A1F]">Find your natural constitution once, and every recommendation is tuned to it.</p>
            <div className="mt-6 flex gap-2">
              {Object.entries(DOSHA).map(([n, d]) => (
                <span key={n} className={`inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold ${d.text}`}><d.icon className="h-4 w-4" />{n}</span>
              ))}
            </div>
          </article>

          {[
            { i: Pill, t: "Medicine database", d: "Look up herbs and formulations with uses, dosage guidance and cautions.", c: "bg-[#E6F5EE]" },
            { i: Activity, t: "Health tracker", d: "Log sleep, digestion and energy and watch your balance shift over weeks.", c: "bg-[#EAF0FB]" },
            { i: Video, t: "Telemedicine", d: "Book a video consult with a qualified Ayurvedic practitioner.", c: "bg-[#FDECE4]" },
          ].map(({ i: I, t, d, c }) => (
            <article key={t} className={`rounded-[20px] p-7 lg:col-span-2 ${c}`}>
              <I className="h-6 w-6 text-[#0B3B32]" />
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl text-[#0B3B32]">{t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-[#3F5F57]">{d}</p>
            </article>
          ))}
        </div>

        <div className="mt-5 grid gap-x-8 gap-y-4 rounded-[20px] border border-[#0B3B32]/10 px-8 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[[MessageCircle, "AI consult", "Ask follow-up questions in plain language"], [Users, "Community", "Share routines with others on the same path"], [BookOpen, "Lifestyle", "Seasonal diet and daily habits"], [FileText, "Reports", "Export your history for your practitioner"]].map(([I, t, d]) => (
            <div key={String(t)} className="flex gap-3"><I className="mt-0.5 h-5 w-5 shrink-0 text-[#0E8F86]" /><p className="text-sm text-[#3F5F57]"><b className="text-[#0B3B32]">{t}.</b> {d}</p></div>
          ))}
        </div>
      </section>

      {/* How it works (a real sequence, so numbered) */}
      <section id="how" className="scroll-mt-20 bg-[#F3FAF7] py-24">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="max-w-xl font-[family-name:var(--font-display)] text-4xl font-medium leading-tight text-[#0B3B32] sm:text-5xl">From "something feels off" to a plan in three steps.</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-3">
            {[
              ["Tell us what you feel", "Search and select your symptoms and rate how strong they are."],
              ["Get your dosha reading", "AyurTech Pro maps your symptoms and constitution to Vata, Pitta and Kapha."],
              ["Follow a gentle plan", "Review herbs, diet and routine. Book a practitioner if you want a second opinion."],
            ].map(([t, d], n) => (
              <li key={t} className="relative border-t-2 border-[#0E8F86] pt-6">
                <span className="font-[family-name:var(--font-display)] text-5xl text-[#0E8F86]/40">{n + 1}</span>
                <h3 className="mt-2 text-xl font-bold text-[#0B3B32]">{t}</h3>
                <p className="mt-2 leading-relaxed text-[#3F5F57]">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Safety */}
      <section id="safety" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-24">
        <div className="grid items-center gap-10 rounded-[32px] bg-[#0B3B32] p-8 text-white sm:p-14 lg:grid-cols-2">
          <div>
            <Stethoscope className="h-8 w-8 text-[#E9A825]" />
            <h2 className="mt-5 font-[family-name:var(--font-display)] text-4xl leading-tight">Built to support your care, not replace it.</h2>
          </div>
          <ul className="space-y-4 text-[#CFE9DF]">
            {[
              "Every recommendation is educational and explains its reasoning.",
              "Severe symptoms are flagged with a prompt to seek medical care.",
              "Practitioner consults are one click away from any result.",
            ].map((t) => <li key={t} className="flex gap-3"><ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#E9A825]" />{t}</li>)}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-5 pb-24 text-center">
        <h2 className="font-[family-name:var(--font-display)] text-4xl font-medium text-[#0B3B32] sm:text-5xl">Ready to see your balance?</h2>
        <p className="mt-4 text-lg text-[#3F5F57]">Your first analysis takes under two minutes.</p>
        <Link href="/dashboard" className={`${btn} mt-8 bg-gradient-to-r from-[#0E9F6E] to-[#0E8F86] text-white shadow-lg shadow-[#0E8F86]/30 hover:brightness-110`}>
          Start symptom analysis <ArrowUpRight className="h-4 w-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#0B3B32]/10 bg-[#F6FAF8]">
        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="flex items-center gap-2 font-[family-name:var(--font-display)] text-lg font-semibold text-[#0B3B32]"><Leaf className="h-5 w-5 text-[#0E8F86]" />AyurTech Pro</span>
            <div className="flex gap-6 text-sm text-[#3F5F57]">{NAV.map(([l, h]) => <a key={l} href={h} className="hover:text-[#0B3B32]">{l}</a>)}</div>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-[#6B847D]">
            Medical disclaimer: AyurTech Pro provides educational information only and does not replace professional medical advice. Always consult a qualified Ayurvedic practitioner or healthcare provider before starting any treatment.
          </p>
          <p className="mt-3 text-xs text-[#6B847D]">© {new Date().getFullYear()} AyurTech Pro</p>
        </div>
      </footer>
    </div>
  );
}