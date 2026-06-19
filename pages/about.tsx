import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Sparkles, Globe, Zap, Trophy, BookOpen, Target,
  ArrowRight, Users, BrainCircuit, Route, CheckCircle2,
} from 'lucide-react';
import Layout from '@/components/Layout';

/* ── animation helpers ───────────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 0.5, delay },
});

/* ── data ────────────────────────────────────────────────────── */
const STATS = [
  { value: '5',    label: 'Lessons per path',         color: 'text-[var(--color-brand)]' },
  { value: '30+',  label: 'Armenian opportunities',   color: 'text-green-500' },
  { value: '+50',  label: 'XP per lesson',            color: 'text-[var(--color-gold)]' },
  { value: '3',    label: 'Languages supported',      color: 'text-violet-500' },
];

const PROBLEMS = [
  { emoji: '🔍', title: 'Opportunities are scattered', desc: 'Students spend hours searching through dead links and outdated posts just to find one scholarship they might qualify for.' },
  { emoji: '📚', title: 'Generic courses don\'t fit',   desc: 'Existing platforms aren\'t designed for Armenian students — wrong language, wrong context, wrong difficulty.' },
  { emoji: '😔', title: 'Staying motivated is hard',   desc: 'Without a community, streak tracking, or real rewards, most students give up before they reach their goals.' },
];

const STEPS = [
  { icon: Target,      n: '01', title: 'Tell May your goal',     desc: 'Type what you want to learn. No forms — just a conversation.' },
  { icon: BrainCircuit,n: '02', title: 'AI builds your plan',    desc: 'A focused 5-lesson course generated in seconds, tailored to your level.' },
  { icon: BookOpen,    n: '03', title: 'Learn lesson by lesson', desc: 'Each lesson is a guided chat. Ask questions, go at your own pace.' },
  { icon: Route,       n: '04', title: 'Track & earn rewards',   desc: 'Complete lessons, maintain your streak, climb the leaderboard.' },
];

const FEATURES = [
  { icon: Sparkles, color: 'bg-[var(--color-brand-soft)] text-[var(--color-brand)]',      title: 'AI Personal Teacher',         desc: 'May isn\'t a chatbot — it\'s a structured tutor that adapts to exactly what you need.' },
  { icon: Globe,    color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', title: 'Real Armenian Opportunities', desc: 'Scholarships, competitions, internships, and grants — verified and curated for you.' },
  { icon: Zap,      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-500',             title: 'XP & Streak System',          desc: 'Earn +50 XP per completed lesson. Build daily streaks. Stay motivated.' },
  { icon: Trophy,   color: 'bg-violet-100 dark:bg-violet-900/30 text-violet-500',          title: 'Leaderboard',                 desc: 'See where you rank among other students. Learning is more fun when it\'s competitive.' },
  { icon: BookOpen, color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-500',          title: 'Armenian, English & Russian', desc: 'Switch language at any time. The whole platform adapts instantly.' },
  { icon: Target,   color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-500',               title: '"Prepare Me"',                desc: 'Found a scholarship? Click Prepare Me — Himq builds a custom course to help you qualify.' },
];

/* ── animated stat counter ───────────────────────────────────── */
function StatCard({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} {...fadeUp(delay)} className="text-center">
      <motion.p
        className={`text-4xl sm:text-5xl font-extrabold mb-1 ${color}`}
        initial={{ scale: 0.7, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: delay + 0.1, type: 'spring', stiffness: 200 }}
      >
        {value}
      </motion.p>
      <p className="text-sm text-[var(--text-secondary)]">{label}</p>
    </motion.div>
  );
}

/* ── page ────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Himq — AI Tutor for Armenian Students</title>
        <meta name="description" content="Himq is an AI-powered personal tutor and opportunity discovery platform built for Armenian students." />
      </Head>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* glow orbs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-[var(--color-brand)]/10 blur-3xl" />
          <div className="absolute top-8 right-0 w-[24rem] h-[24rem] rounded-full bg-violet-400/10 blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 pt-20 pb-16 text-center">
          <motion.span
            {...fadeIn(0)}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[var(--color-brand-soft)] text-[var(--color-brand)] mb-6"
          >
            <Sparkles size={12} />
            Free during SSS 2026 Demo
          </motion.span>

          <motion.h1
            {...fadeUp(0.05)}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.07] mb-5"
          >
            Your AI study partner,<br />
            <span className="text-[var(--color-brand)]">built for Armenia.</span>
          </motion.h1>

          <motion.p {...fadeUp(0.12)} className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 leading-relaxed">
            Himq gives every student a personalized AI tutor and a curated list of real local opportunities — scholarships, competitions, internships — all in one place.
          </motion.p>

          <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-3 flex-wrap">
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-base hover:bg-[var(--color-brand-hover)] transition-colors shadow-[var(--shadow-md)]"
            >
              Get started — it&apos;s free <ArrowRight size={16} />
            </Link>
            <Link
              href="/opportunities"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-base hover:border-[var(--color-brand)] hover:text-[var(--color-brand)] transition-colors"
            >
              Browse opportunities
            </Link>
          </motion.div>
        </div>

        {/* stats strip */}
        <div className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="max-w-4xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((s, i) => <StatCard key={i} {...s} delay={i * 0.07} />)}
          </div>
        </div>
      </section>

      {/* ── Problem (dark band) ────────────────────────────────── */}
      <section className="bg-[var(--bg-deep)] py-20 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-16 left-1/2 -translate-x-1/2 w-[40rem] h-[20rem] rounded-full bg-[var(--color-brand)]/8 blur-3xl" />
        <div className="max-w-5xl mx-auto px-4 relative">
          <motion.div {...fadeUp()} className="text-center mb-12">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-3">The problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-on-deep)] mb-3">Armenian students deserve better.</h2>
            <p className="text-[var(--text-on-deep)]/60 max-w-xl mx-auto">We&apos;ve all been there.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-5">
            {PROBLEMS.map((p, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.08 + i * 0.1)}
                className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 backdrop-blur-sm hover:bg-white/[0.07] transition-colors"
              >
                <span className="text-4xl mb-4 block">{p.emoji}</span>
                <h3 className="font-bold text-[var(--text-on-deep)] mb-2">{p.title}</h3>
                <p className="text-sm text-[var(--text-on-deep)]/60 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 py-20">
        <motion.div {...fadeUp()} className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">Zero to learning in 60 seconds.</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Four steps from goal to achievement.</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={i}
              {...fadeUp(0.06 + i * 0.1)}
              className="relative rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:border-[var(--color-brand)]/40 transition-all group"
            >
              <span className="absolute top-5 right-5 text-5xl font-black text-[var(--text-primary)]/[0.04] leading-none select-none group-hover:text-[var(--color-brand)]/10 transition-colors">
                {s.n}
              </span>
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-brand)] text-white mb-5 shadow-[var(--shadow-sm)]">
                <s.icon size={22} />
              </div>
              <h3 className="font-bold text-[var(--text-primary)] mb-2">{s.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* connector dots between steps */}
        <motion.div {...fadeIn(0.5)} className="hidden lg:flex items-center justify-center gap-2 mt-6">
          {[0,1,2].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]/30" />
              <div className="w-16 h-px bg-[var(--border)]" />
            </div>
          ))}
          <div className="w-2 h-2 rounded-full bg-[var(--color-brand)]/30" />
        </motion.div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="bg-[var(--bg-subtle)] border-y border-[var(--border)] py-20">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div {...fadeUp()} className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[var(--color-brand)] mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-3">Everything you need to grow.</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Designed around how Armenian students actually study.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <motion.div
                key={i}
                {...fadeUp(0.05 + i * 0.07)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 shadow-[var(--shadow-sm)] cursor-default"
              >
                <div className={`flex items-center justify-center w-11 h-11 rounded-xl mb-4 ${f.color}`}>
                  <f.icon size={20} />
                </div>
                <h3 className="font-bold text-[var(--text-primary)] mb-1.5">{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <motion.div {...fadeUp()}>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-brand-soft)] text-[var(--color-brand)] mb-6">
            <Users size={30} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-primary)] mb-4">
            Built by students, for students.
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto mb-8 leading-relaxed">
            We are a team of 4 young builders from Armenia who got tired of watching talented peers miss opportunities because no one told them about it. Himq is our answer.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] shadow-[var(--shadow-sm)]">
              <Users size={14} className="text-[var(--color-brand)]" />
              4-person team · Yerevan, Armenia
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] shadow-[var(--shadow-sm)]">
              <CheckCircle2 size={14} className="text-green-500" />
              SSS 2026 Starter Track
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-secondary)] shadow-[var(--shadow-sm)]">
              <Sparkles size={14} className="text-[var(--color-gold)]" />
              Free during demo
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Final CTA (gradient band) ──────────────────────────── */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="rounded-3xl bg-gradient-to-br from-[var(--color-brand)] to-[var(--color-brand-hover)] p-12 sm:p-16 text-center text-white relative overflow-hidden"
        >
          <div className="pointer-events-none absolute -top-14 -right-14 w-56 h-56 bg-white/10 rounded-full" />
          <div className="pointer-events-none absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full" />
          <div className="relative z-10">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/20 mb-5">
              100% free during SSS 2026 Demo · No credit card
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-3">Ready to start?</h2>
            <p className="text-blue-100 text-base mb-8 max-w-sm mx-auto leading-relaxed">
              Set your first goal and Himq builds your plan in under a minute.
            </p>
            <Link
              href="/auth"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[var(--color-brand)] font-bold text-base hover:bg-blue-50 transition-colors shadow-lg"
            >
              Create your free account <ArrowRight size={17} />
            </Link>
          </div>
        </motion.div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
