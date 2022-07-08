import express, {
	Application,
	Request,
	Response,
	NextFunction,
	Router
} from 'express';
import 'dotenv/config';

import { log } from './util/log';
import { getApiKey, getPort } from './util/env';
import signup from './routes/signup';
import login from './routes/login';
import authenticate from './routes/authenticate';

const PORT: number = getPort();
const API_KEY: string = getApiKey();

const app: Application = express();
const router: Router = Router();

app.use(express.json());

router.use((req: Request, res: Response, next: NextFunction) => {
	log(req.ip, req.method, req.path);
	if (req.get('api-key') === API_KEY) {
		next();
	} else {
		res.status(401);
		res.send({});
	}
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/authenticate', authenticate);

app.use('/auth', router);
app.listen(PORT, () => {
	console.log('[AUTH] Server is running on port', PORT);
});
