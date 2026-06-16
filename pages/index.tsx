import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';

export default function Home() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 mb-6">
            Beta — Free during SSS Demo
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-[var(--text-primary)] mb-6 leading-tight">
            {t('home.hero_title')}
          </h1>
          <p className="text-lg md:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            {t('home.hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth"
              className="px-8 py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-base hover:bg-[var(--color-brand-hover)] transition-colors shadow-md"
            >
              {t('home.cta_start')}
            </Link>
            <Link
              href="/opportunities"
              className="px-8 py-3.5 rounded-xl border border-[var(--border-strong)] text-[var(--text-primary)] font-semibold text-base hover:bg-[var(--border)] transition-colors"
            >
              {t('home.cta_explore')}
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: '🤖', title: 'AI Teacher', desc: 'Your personal AI builds a custom learning path and teaches you lesson by lesson.' },
            { icon: '🏆', title: 'Earn XP', desc: 'Attend real events and competitions to earn XP and climb the leaderboard.' },
            { icon: '🎯', title: 'Opportunities', desc: 'Discover scholarships, competitions, internships, and more in Armenia.' },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (i + 1) }}
              className="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border)] shadow-[var(--shadow-sm)]"
            >
              <div className="text-3xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
              <p className="text-sm text-[var(--text-secondary)]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
