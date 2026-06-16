export interface Profile {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  goal: string | null;
  skill_level: 'beginner' | 'intermediate' | 'advanced' | null;
  time_per_day: number | null;
  preferred_language: 'am' | 'en';
  xp: number;
  streak_days: number;
  last_active_date: string | null;
  portfolio: Record<string, unknown>;
  user_type: 'student' | 'owner';
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

export interface LessonPlanItem {
  index: number;
  title: string;
  description: string;
}

export interface Chat {
  id: string;
  user_id: string;
  title: string | null;
  chat_type: 'learning' | 'prepare_me';
  event_id: string | null;
  plan: LessonPlanItem[] | null;
  current_lesson_index: number;
  total_lessons: number;
  status: 'active' | 'completed' | 'archived';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  chat_id: string;
  role: 'user' | 'assistant';
  content: string;
  lesson_index: number | null;
  created_at: string;
}

export interface Lesson {
  id: string;
  chat_id: string;
  lesson_index: number;
  title: string;
  description: string | null;
  status: 'locked' | 'active' | 'completed';
  start_message_id: string | null;
  completed_at: string | null;
  time_spent_seconds: number;
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string | null;
  event_type: 'competition' | 'scholarship' | 'course' | 'webinar' | 'internship' | 'grant' | 'fellowship' | 'meetup' | 'seminar' | 'summit';
  organizer: string | null;
  location: string | null;
  is_online: boolean;
  deadline: string | null;
  event_date: string | null;
  link: string | null;
  image_url: string | null;
  upvote_count: number;
  is_approved: boolean;
  created_at: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string | null;
  website: string | null;
  logo_url: string | null;
  is_verified: boolean;
  contact_email: string | null;
  created_at: string;
}

export interface PrepareMeProgress {
  id: string;
  user_id: string;
  event_id: string;
  chat_id: string | null;
  progress_percent: number;
  created_at: string;
  updated_at: string;
}

export interface XpTransaction {
  id: string;
  user_id: string;
  amount: number;
  reason: 'event_attendance' | 'streak_3day' | 'streak_weekly' | 'streak_monthly';
  event_id: string | null;
  created_at: string;
}

export interface LeaderboardEntry {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  xp: number;
  streak_days: number;
}

export type EventTypeBadgeColor = {
  [K in Event['event_type']]: string;
};

export const EVENT_BADGE_COLORS: EventTypeBadgeColor = {
  competition: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400',
  scholarship:  'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
  course:       'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
  webinar:      'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  internship:   'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
  grant:        'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  fellowship:   'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400',
  meetup:       'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-400',
  seminar:      'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400',
  summit:       'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400',
};
