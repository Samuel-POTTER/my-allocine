import express, { Request, Response, NextFunction } from 'express';
import API_CNF from './config/config';
import profile from './router/profile';
import auth from './router/auth';
import { hasAuth } from './middleware/has_auth';
import { authorization } from './controller/authorization.controller';
import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import morgan from 'morgan';
import { tokenDate, tokenMethod, tokenStatus, tokenTime } from './utils/morgan';
import movie from './router/movie';

// Our Express APP config
const app = express();

morgan.token('date', tokenDate);
morgan.token('time', tokenTime);
morgan.token('my-method', tokenMethod);
morgan.token('my-status', tokenStatus);
app.use(
    morgan(
        '[🔥JM X APPINESS🔥] - 🗓  :date  ⏰ :time \t| :my-status |    :my-method :url \t\t\t💾 :res[content-length] octets   -   ⏱  :response-time ms'
    )
);

app.set('port', API_CNF.API.getInstance().Port || 3000);
app.set('env', API_CNF.API.getInstance().Mode);

//-- CORS
app.use((req: Request, res: Response, next: NextFunction) => {
    res.header(
        'Access-Control-Allow-Origin',
        API_CNF.API.getInstance().Cors
    );
    res.header(
        'Access-Control-Allow-Methods',
        'GET, PUT, POST, DELETE, OPTIONS, PATCH'
    );
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger options
const options = {
    definition: {
        swagger: "2.0",
        schemes: ["http","https"],
        info: {
            title: "API", /* your title */
            description: "", /* your description */
            contact: {
                name: ""/* the app name */,
                url: ""/* your portfolio */,
                email: ""/* your email */
            },
            license: {
                name: "MIT",
                url: "", /* your MIT LINK */
            },
            version: "3.0"
        },
        servers: [
            {
                url: `https://8091.jm-hosting.com`
            }
        ],
    },
    apis: [`${__dirname}/**/*.ts`],
}

const specs = swaggerJSDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))

app.options('/*', (req, res) => {
    res.send('');
});

// API Endpoints
/**
 * @swagger
 * /authorization:
 *   get:
 *     description: Get authorization
 *     responses:
 *       200:
 *         description: Get Token authorization
 */
app.get('/authorization', authorization);
app.use('/auth', hasAuth, auth);
app.use('/profile', hasAuth, profile);
app.use('/movie', movie)

export default app;