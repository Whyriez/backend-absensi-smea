// src/pages/api/users/updateEmail.js
import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // JANGAN expose ini ke frontend
);

export default async function updateEmailHandler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, newEmail } = req.body;

  if (!userId || !newEmail) {
    return res.status(400).json({ message: 'User ID dan email baru diperlukan' });
  }

  const { data, error } = await supabase.auth.admin.updateUserById(userId, {
    email: newEmail,
  });

  if (error) {
    return res.status(500).json({ message: 'Gagal mengubah email', error: error.message });
  }

  return res.status(200).json({ message: 'Email berhasil diubah', data });
}
