import express, { Application, Request, Response, NextFunction, Router } from 'express';
import { log } from './log'
import { signup } from './signup';
import { login } from './login';
import { authenticate } from './authenticate';
import 'dotenv/config';

import { RequestBody, ResponseBody } from './types';

const PORT: string = process.env.PORT ?? '';
const API_KEY: string = process.env.API_KEY ?? '';

const app: Application = express();
const router: Router = Router();

app.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
  log(req.ip, req.method, req.path);
  const requestBody: RequestBody<any> = req.body;
  if (requestBody.apiKey === API_KEY) {
    next();
  } else {
    res.status(400);
    const responseBody: ResponseBody<null> = {
      message: 'Unauthorized request',
      data: null
    }
    res.send(responseBody);
  }
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/authenticate', authenticate);

app.use('/auth', router)
app.listen(PORT, () => {
  console.log("[AUTH] Server is running on port", PORT);
});