import {Router} from 'express';

import authRouter from './auth.routes.js';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

router.use('/auth', authRouter);

export default router;
