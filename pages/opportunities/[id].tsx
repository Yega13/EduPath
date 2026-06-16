import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Calendar, Globe, ExternalLink, ChevronLeft, Sparkles, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { supabase, getBrowserClient } from '@/lib/supabase';
import { useUser } from '@/lib/useUser';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  event_type: string;
  organizer: string;
  location: string | null;
  is_online: boolean;
  deadline: string | null;
  link: string | null;
}

const TYPE_COLORS: Record<string, string> = {
  competition: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  scholarship: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  internship:  'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
  grant:       'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
  course:      'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300',
  fellowship:  'bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300',
};

function daysLeft(deadline: string | null): number | null {
  if (!deadline) return null;
  return Math.ceil((new Date(deadline).getTime() - Date.now()) / 86400000);
}

export default function OpportunityDetail({ event }: { event: Event | null }) {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { user, loading: userLoading } = useUser();
  const [preparing, setPreparing] = useState(false);

  if (!event) {
    return (
      <Layout>
        <div className="max-w-3xl mx-auto px-4 py-16 text-center">
          <p className="text-[var(--text-muted)] mb-4">Opportunity not found.</p>
          <Link href="/opportunities" className="text-[var(--color-brand)] hover:underline text-sm">
            ← Back to opportunities
          </Link>
        </div>
      </Layout>
    );
  }

  const days = daysLeft(event.deadline);

  const handlePrepareMe = async () => {
    if (!user) {
      router.push(`/auth?next=/opportunities/${event.id}`);
      return;
    }

    setPreparing(true);
    try {
      const supabaseClient = getBrowserClient();
      const { data: { session } } = await supabaseClient.auth.getSession();

      const res = await fetch('/api/create-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.access_token ?? ''}`,
        },
        body: JSON.stringify({
          goal: `Prepare me for: ${event.title}. Help me understand what skills are required, how to apply, and what to prepare.`,
          skillLevel: 'beginner',
        }),
      });

      if (!res.ok) throw new Error('Failed to create chat');
      const { chatId } = await res.json();
      router.push(`/chat/${chatId}`);
    } catch {
      setPreparing(false);
    }
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/opportunities"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          {t('opportunities.title')}
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          {/* Type + deadline badges */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className={cn(
              'text-[11px] font-semibold px-2.5 py-1 rounded-full capitalize',
              TYPE_COLORS[event.event_type] ?? 'bg-gray-100 text-gray-700'
            )}>
              {event.event_type}
            </span>
            {days !== null && (
              <span className={cn(
                'text-xs font-medium flex items-center gap-1',
                days <= 0 ? 'text-[var(--text-muted)]' :
                days <= 7 ? 'text-red-500' :
                days <= 30 ? 'text-orange-500' :
                'text-[var(--text-muted)]'
              )}>
                <Calendar size={11} />
                {days > 0 ? `${days} ${t('opportunities.days_left')}` : 'Deadline passed'}
              </span>
            )}
          </div>

          <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-1">{event.title}</h1>
          <p className="text-sm text-[var(--text-secondary)] mb-6">{event.organizer}</p>

          {/* Description */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-primary)] mb-2">About</h2>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* Meta info */}
          <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-5 mb-6 grid grid-cols-2 gap-4">
            {event.deadline && (
              <div>
                <p className="text-xs text-[var(--text-muted)] mb-0.5">{t('opportunities.deadline')}</p>
                <p className="text-sm font-medium text-[var(--text-primary)]">
                  {new Date(event.deadline).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-0.5">Location</p>
              <p className="text-sm font-medium text-[var(--text-primary)] flex items-center gap-1">
                {event.is_online ? (
                  <>
                    <Globe size={13} />
                    {t('opportunities.online')}
                  </>
                ) : (
                  event.location ?? '—'
                )}
              </p>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handlePrepareMe}
              disabled={preparing || userLoading}
              className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-sm hover:bg-[var(--color-brand-hover)] transition-colors disabled:opacity-60"
            >
              {preparing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Building your prep plan...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  {t('opportunities.prepare_me')} with AI
                  <ArrowRight size={14} />
                </>
              )}
            </button>
            {event.link && (
              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl border border-[var(--border)] text-[var(--text-primary)] font-semibold text-sm hover:border-[var(--color-brand)] transition-colors"
              >
                {t('opportunities.apply')}
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          {!user && !userLoading && (
            <p className="text-center text-xs text-[var(--text-muted)] mt-3">
              You need to{' '}
              <Link href="/auth" className="text-[var(--color-brand)] hover:underline">
                sign in
              </Link>{' '}
              to use AI preparation.
            </p>
          )}
        </motion.div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
  const id = params?.id as string;

  const { data: event } = await supabase
    .from('events')
    .select('id, title, description, event_type, organizer, location, is_online, deadline, link')
    .eq('id', id)
    .eq('is_approved', true)
    .single();

  return {
    props: {
      event: event ?? null,
      ...(await serverSideTranslations(locale ?? 'am', ['common'])),
    },
  };
};
