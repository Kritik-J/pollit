import express, {Router} from 'express';
import {isAuthenticatedUser} from '../middlewares/auth.js';
import {
  votePoll,
  createPoll,
  deletePoll,
  getPoll,
  getPolls,
  pollResult,
  updatePoll,
} from '../controllers/poll.controllers.js';

const router: Router = express.Router();

router
  .route('/')
  .get(isAuthenticatedUser, getPolls)
  .post(isAuthenticatedUser, createPoll);

router
  .route('/:id')
  .get(isAuthenticatedUser, getPoll)
  .put(isAuthenticatedUser, updatePoll)
  .delete(isAuthenticatedUser, deletePoll);

router.get('/:id/result', isAuthenticatedUser, pollResult);

router.post('/:id/vote', isAuthenticatedUser, votePoll);

export default router;
