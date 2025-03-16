
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) {
    return res.status(500).json({ message: 'Gagal menghapus user', error: error.message });
  }

  return res.status(200).json({ message: 'User berhasil dihapus' });
}
