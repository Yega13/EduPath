import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { getBrowserClient } from '@/lib/supabase';
import '@/styles/globals.css';

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const supabase = getBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_OUT') {
        router.push('/auth');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <Head>
        <title>EduPath — Learn, Grow, Win</title>
        <meta name="description" content="AI-powered personal tutor for Armenian students. Build a custom learning path and discover real local scholarships, competitions, and internships." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="EduPath — Learn, Grow, Win" />
        <meta property="og:description" content="AI personal tutor + Armenian opportunities in one place." />
        <meta name="theme-color" content="#2578e8" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(App);
