import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Layout from '@/components/Layout';
import { useState } from 'react';

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pass }),
    });
    if (res.ok) setAuthed(true);
    else setErr('Wrong password');
  };

  if (!authed) {
    return (
      <Layout>
        <div className="max-w-sm mx-auto px-4 py-20">
          <h1 className="text-xl font-bold text-[var(--text-primary)] mb-6">Admin Login</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Admin password"
              className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
            />
            {err && <p className="text-red-500 text-sm">{err}</p>}
            <button type="submit" className="w-full py-3 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-sm">
              Enter
            </button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Admin Panel</h1>
        <p className="text-[var(--text-muted)] text-sm">Event moderation, org approval — coming soon</p>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'am', ['common'])),
  },
});
