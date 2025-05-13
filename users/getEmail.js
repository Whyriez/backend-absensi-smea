import dotenv from 'dotenv';
dotenv.config();
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // Hanya digunakan di backend!
);

const getEmailHandler = async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const userId = req.query.userId;

  if (!userId) {
    return res.status(400).json({ message: 'User ID diperlukan' });
  }

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    return res.status(500).json({ message: 'Gagal mengambil email', error: error.message });
  }

  return res.status(200).json({
    message: 'Email berhasil diambil',
    email: data.user?.email || null,
  });
};

export default getEmailHandler;
