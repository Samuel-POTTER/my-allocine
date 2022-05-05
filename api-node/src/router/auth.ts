import { Router } from 'express';
import {
    refreshTokenController,
    signinController,
    signupController
} from '../controller/auth.controller';

const router = Router();
/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     description: Get refresh token
 *     parameters:
 *      - name: Authorization
 *        description: Token API
 *        type: string
 *        in: header
 *        required: true
 *      - name: body
 *        description: refresh token
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *              - refresh_token
 *          properties:
 *              refresh_token:
 *                  type: string
 *     responses:
 *       200:
 *         description: data access_token, refresh_token
 */
router.post('/refresh', refreshTokenController);
/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Get token user
 *     parameters:
 *      - name: Authorization
 *        description: Token API
 *        type: string
 *        in: header
 *        required: true
 *      - name: body
 *        description: signin value
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *              - email
 *              - password
 *          properties:
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: data access_token, refresh_token
 */
router.post('/signin', signinController);
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Create a new user
 *     parameters:
 *      - name: Authorization
 *        description: Token API
 *        type: string
 *        in: header
 *        required: true
 *      - name: body
 *        description: Signup value
 *        in: body
 *        required: true
 *        schema:
 *          type: object
 *          required:
 *              - firstname
 *              - lastname
 *              - email
 *              - password
 *          properties:
 *              firstname:
 *                  type: string
 *              lastname:
 *                  type: string
 *              email:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       200:
 *         description: message ok
 */
router.post('/signup', signupController);

export default router;
