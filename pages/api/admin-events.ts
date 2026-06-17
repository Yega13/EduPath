import type { NextApiRequest, NextApiResponse } from 'next';
import { getAdminClient } from '@/lib/supabase';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'edupath2026';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const password = req.headers['x-admin-password'];
  if (password !== ADMIN_PASSWORD) return res.status(401).json({ error: 'Unauthorized' });

  const admin = getAdminClient();

  if (req.method === 'GET') {
    const { data, error } = await admin
      .from('events')
      .select('*')
      .eq('is_approved', false)
      .order('created_at', { ascending: false });
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ events: data });
  }

  if (req.method === 'PATCH') {
    const { id, approve } = req.body as { id?: string; approve?: boolean };
    if (!id || typeof approve !== 'boolean') {
      return res.status(400).json({ error: 'id and approve are required' });
    }
    const { error } = await admin
      .from('events')
      .update({ is_approved: approve })
      .eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  if (req.method === 'DELETE') {
    const { id } = req.body as { id?: string };
    if (!id) return res.status(400).json({ error: 'id required' });
    const { error } = await admin.from('events').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ ok: true });
  }

  return res.status(405).end();
}
