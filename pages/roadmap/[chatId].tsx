import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';

interface Props { chatId: string; }

export default function Roadmap({ chatId }: Props) {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-[var(--text-muted)] text-sm">Roadmap for chat {chatId} — coming soon</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => ({
  props: {
    chatId: params?.chatId ?? '',
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
