import {Router} from 'express';

import authRouter from './auth.routes.js';
import pollRouter from './poll.routes.js';

const router: Router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the API');
});

router.use('/auth', authRouter);
router.use('/polls', pollRouter);

export default router;
