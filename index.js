import express from 'express';
import createHandler from './users/create.js';
import deleteHandler from './users/delete.js';
import updateEmail from './users/updateEmail.js';
import getEmailHandler from './users/getEmail.js';
import resetPasswordHandler from './users/resetPassword.js';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing JSON request
app.use(express.json());

app.post('/api/users', createHandler);

app.delete('/api/deleteSiswa', deleteHandler);

app.put('/api/resetPassword', resetPasswordHandler);

app.put('/api/updateEmail', updateEmail);

app.get('/api/getEmail', getEmailHandler);

app.use((req, res) => {
  res.status(405).json({ message: 'Method Not Allowed' });
});

// Menjalankan server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});