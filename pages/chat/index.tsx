import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Layout from '@/components/Layout';
import { MessageSquarePlus } from 'lucide-react';

export default function ChatIndex() {
  const { t } = useTranslation('common');

  return (
    <Layout hideFooter>
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <div className="text-center">
          <MessageSquarePlus size={48} className="text-[var(--text-muted)] mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Start Learning</h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-xs mx-auto">
            EduPath AI will ask you a few questions and build a personal learning plan.
          </p>
          <button className="px-6 py-2.5 rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold hover:bg-[var(--color-brand-hover)] transition-colors">
            {t('chat.new_chat')}
          </button>
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
