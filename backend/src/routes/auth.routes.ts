import express, {Router} from 'express';
import {
  forgotPassword,
  login,
  logout,
  myProfile,
  register,
} from '../controllers/auth.controllers.js';
import {isAuthenticatedUser} from '../middlewares/auth.js';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', isAuthenticatedUser, myProfile);
router.get('/forgot-password', forgotPassword);

export default router;
