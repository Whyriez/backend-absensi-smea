import createHandler from './users/create.js';
import deleteHandler from './users/delete.js';
import resetPasswordHandler from './users/resetPassword.js';

export default async function handler(req, res) {
  switch (req.method) {
    case 'POST':
      return createHandler(req, res);
    case 'DELETE':
      return deleteHandler(req, res);
    case 'PUT':
      return resetPasswordHandler(req, res);
    default:
      res.setHeader('Allow', ['POST', 'DELETE', 'PUT']);
      return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
