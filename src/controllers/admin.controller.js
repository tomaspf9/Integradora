import { Router } from 'express';
import authorization from '../middlewares/auth.middlewares.js';
import passportCall from '../utils/passportCall.utils.js';

const router = Router();

router.get('/private', passportCall("jwt"), authorization('admin'), (req, res) => {
	res.json({ message: 'Welcome admin' });
});

export default router;