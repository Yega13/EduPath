import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import Layout from '@/components/Layout';

export default function Dashboard() {
  const { t } = useTranslation('common');

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-8">{t('dashboard.title')}</h1>

        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: t('dashboard.xp_total'), value: '0 XP' },
            { label: t('dashboard.streak'), value: '0 🔥' },
            { label: t('dashboard.active_chats'), value: '0 / 10' },
          ].map((s) => (
            <div key={s.label} className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5">
              <p className="text-xs text-[var(--text-muted)] mb-1">{s.label}</p>
              <p className="text-2xl font-bold text-[var(--text-primary)]">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-6">
          <h2 className="font-semibold text-[var(--text-primary)] mb-4">{t('dashboard.active_chats')}</h2>
          <p className="text-sm text-[var(--text-muted)] mb-4">{t('dashboard.no_chats')}</p>
          <Link
            href="/chat"
            className="inline-block px-6 py-2.5 rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold hover:bg-[var(--color-brand-hover)] transition-colors"
          >
            {t('dashboard.start_learning')}
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
