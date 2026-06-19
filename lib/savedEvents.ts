/* Client-side "save for later" for opportunities.
   Stored in localStorage so it works without a backend table — the saved
   list is shown on the profile page. Per-browser, which is fine for an MVP. */

export interface SavedEvent {
  id: string;
  title: string;
  event_type: string;
  organizer: string;
  deadline: string | null;
  link: string | null;
  is_online: boolean;
  location: string | null;
}

const KEY = 'ep_saved_events';

export function getSavedEvents(): SavedEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedEvent[]) : [];
  } catch {
    return [];
  }
}

export function isEventSaved(id: string): boolean {
  return getSavedEvents().some((e) => e.id === id);
}

function write(list: SavedEvent[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(list));
  // Let other mounted components (e.g. profile) know it changed.
  window.dispatchEvent(new Event('ep-saved-events-changed'));
}

export function removeSavedEvent(id: string) {
  write(getSavedEvents().filter((e) => e.id !== id));
}

// Returns the new saved state (true = now saved, false = now removed).
export function toggleSavedEvent(event: SavedEvent): boolean {
  const list = getSavedEvents();
  if (list.some((e) => e.id === event.id)) {
    write(list.filter((e) => e.id !== event.id));
    return false;
  }
  write([event, ...list]);
  return true;
}
