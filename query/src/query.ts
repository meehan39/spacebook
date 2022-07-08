import express, {
	Application,
	Request,
	Response,
	NextFunction,
	Router
} from 'express';

import { log } from './util/log';
import { getApiKey, getPort } from './util/env';
import { getUser, postUser } from './routes/user';

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

router.get('/user', getUser);
router.post('/user', postUser);

app.use('/query', router);
app.listen(PORT, () => {
	console.log('[QUERY] Server is running on port', PORT);
});
