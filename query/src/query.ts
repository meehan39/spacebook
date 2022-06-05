import express, { Application, Request, Response, NextFunction, Router } from 'express';
import 'dotenv/config';
import { RequestBody, ResponseBody } from './types'
import { log } from './log';
import { signup } from './signup';
import { login } from './login';
import { checkForUser } from './checkForUser';
import { getUser } from './getUser';

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
router.post('/checkForUser', checkForUser);
router.post('/getUser', getUser);

app.use('/query', router)
app.listen(PORT, () => {
  console.log("[QUERY] Server is running on port", PORT);
});