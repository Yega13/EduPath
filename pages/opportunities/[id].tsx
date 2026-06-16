import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';

interface Props { id: string; }

export default function OpportunityDetail({ id }: Props) {
  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-10">
        <p className="text-[var(--text-muted)] text-sm">Opportunity {id} — coming soon</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => ({
  props: {
    id: params?.id ?? '',
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
