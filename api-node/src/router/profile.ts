import {
    getUserInfosController,
} from '../controller/profile.controller';
import { Router } from 'express';
import { hasJWT } from '../middleware/has_jwt';

const router = Router();
/**
 * @swagger
 * /profile/me:
 *   get:
 *     description: Get my profile
 *     parameters:
 *      - name: Authorization
 *        description: Token API
 *        type: string
 *        in: header
 *        required: true
 *      - name: jwttoken
 *        description: Token user
 *        type: string
 *        in: header
 *        required: true
 *     responses:
 *       200:
 *         description: Get my profile
 */
router.get('/me', hasJWT, getUserInfosController);

export default router;
