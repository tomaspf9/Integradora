import { Router } from 'express';
import { generateToken } from '../utils.js';

const router = Router();

router.post('/login', (req, res) => {
	const { email, role } = req.body;
	const user = { email, role };

	const token = generateToken(user);

	return res
		.cookie('authToken', token, { maxAge: 60 * 60 * 100, httpOnly: true })
		.json({ message: 'Loged in' });
});

export default router;