import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import { CheckCircle, Lock, Circle, ArrowRight, ChevronLeft, Map } from 'lucide-react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useUser } from '@/lib/useUser';
import { getBrowserClient } from '@/lib/supabase';
import { cn } from '@/lib/utils';

interface Lesson {
  id: string;
  lesson_index: number;
  title: string;
  description: string;
  status: 'locked' | 'active' | 'completed';
}

interface Chat {
  id: string;
  title: string;
  current_lesson_index: number;
  total_lessons: number;
  status: string;
}

export default function RoadmapPage({ chatId }: { chatId: string }) {
  const router = useRouter();
  const { user, loading: userLoading } = useUser();

  const [chat, setChat]       = useState<Chat | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userLoading && !user) router.replace('/auth');
  }, [user, userLoading, router]);

  useEffect(() => {
    if (!user || !chatId) return;
    const supabase = getBrowserClient();

    Promise.all([
      supabase.from('chats').select('*').eq('id', chatId).eq('user_id', user.id).single(),
      supabase.from('lessons').select('*').eq('chat_id', chatId).order('lesson_index'),
    ]).then(([{ data: chatData }, { data: lessonsData }]) => {
      if (!chatData) { router.replace('/dashboard'); return; }
      setChat(chatData as Chat);
      setLessons((lessonsData ?? []) as Lesson[]);
      setLoading(false);
    });
  }, [user, chatId, router]);

  if (userLoading || loading) {
    return (
      <Layout>
        <div className="max-w-2xl mx-auto px-4 py-12 space-y-4">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--border)] animate-pulse flex-shrink-0" />
              <div className="flex-1 pt-1">
                <div className="h-4 w-3/4 rounded bg-[var(--border)] animate-pulse mb-2" />
                <div className="h-3 w-1/2 rounded bg-[var(--border)] animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  const completedCount = lessons.filter((l) => l.status === 'completed').length;
  const pct = chat ? Math.round((completedCount / chat.total_lessons) * 100) : 0;
  const allDone = chat ? completedCount >= chat.total_lessons : false;

  return (
    <Layout>
      <Head><title>{chat?.title ?? 'Roadmap'} — EduPath</title></Head>
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Back */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--color-brand)] transition-colors mb-6"
        >
          <ChevronLeft size={14} />
          Dashboard
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <Map size={20} className="text-[var(--color-brand)]" />
            <h1 className="text-xl font-bold text-[var(--text-primary)] leading-snug">{chat?.title}</h1>
          </div>
          <p className="text-sm text-[var(--text-secondary)] mb-4">
            {allDone ? 'Course complete!' : `Lesson ${Math.min(completedCount + 1, chat?.total_lessons ?? 5)} of ${chat?.total_lessons}`}
          </p>

          {/* Progress bar */}
          <div className="h-2.5 rounded-full bg-[var(--border)] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[var(--color-brand)]"
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-1.5">{pct}% complete</p>
        </motion.div>

        {/* Path */}
        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-5 top-6 bottom-6 w-0.5 bg-[var(--border)]" />

          <div className="space-y-1">
            {lessons.map((lesson, i) => {
              const isCompleted = lesson.status === 'completed';
              const isActive    = lesson.status === 'active';
              const isLocked    = lesson.status === 'locked';

              return (
                <motion.div
                  key={lesson.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="relative flex items-start gap-4"
                >
                  {/* Node */}
                  <div className={cn(
                    'relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 border-2 transition-all',
                    isCompleted ? 'bg-[var(--color-green)] border-[var(--color-green)]' :
                    isActive    ? 'bg-[var(--color-brand)] border-[var(--color-brand)] ring-4 ring-blue-200 dark:ring-blue-900/40' :
                                  'bg-[var(--bg-card)] border-[var(--border)]'
                  )}>
                    {isCompleted ? (
                      <CheckCircle size={18} className="text-white" />
                    ) : isActive ? (
                      <Circle size={18} className="text-white" />
                    ) : (
                      <Lock size={14} className="text-[var(--text-muted)]" />
                    )}
                  </div>

                  {/* Card */}
                  <div className={cn(
                    'flex-1 rounded-2xl p-4 mb-4 border transition-all',
                    isCompleted
                      ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/10'
                      : isActive
                      ? 'border-[var(--color-brand)] bg-blue-50 dark:bg-blue-900/10 shadow-sm'
                      : 'border-[var(--border)] bg-[var(--bg-card)] opacity-50'
                  )}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className={cn(
                          'text-xs font-semibold uppercase tracking-wide mb-0.5',
                          isCompleted ? 'text-[var(--color-green)]' :
                          isActive    ? 'text-[var(--color-brand)]' :
                                        'text-[var(--text-muted)]'
                        )}>
                          Lesson {lesson.lesson_index + 1}
                          {isCompleted && ' · Done'}
                          {isActive    && ' · In progress'}
                          {isLocked    && ' · Locked'}
                        </p>
                        <p className="font-semibold text-[var(--text-primary)] text-sm leading-snug">{lesson.title}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5 leading-relaxed">{lesson.description}</p>
                      </div>
                      {(isCompleted || isActive) && (
                        <Link
                          href={`/chat/${chatId}`}
                          className={cn(
                            'flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-colors',
                            isCompleted
                              ? 'bg-green-100 dark:bg-green-900/30 text-[var(--color-green)] hover:bg-green-200'
                              : 'bg-[var(--color-brand)] text-white hover:opacity-90'
                          )}
                        >
                          <ArrowRight size={14} />
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-4">
          {allDone ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-2xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <CheckCircle size={30} className="text-[var(--color-green)]" />
              </div>
              <p className="font-bold text-[var(--text-primary)] mb-1">All lessons complete!</p>
              <p className="text-sm text-[var(--text-secondary)] mb-4">You earned +{lessons.length * 50} XP on this course.</p>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--color-brand)] text-white text-sm font-semibold"
              >
                Back to Dashboard <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <Link
              href={`/chat/${chatId}`}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-[var(--color-brand)] text-white font-semibold text-sm hover:bg-[var(--color-brand-hover)] transition-colors"
            >
              Continue Learning
              <ArrowRight size={16} />
            </Link>
          )}
        </div>
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
