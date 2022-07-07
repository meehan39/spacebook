import express, {
	Application,
	Request,
	Response,
	NextFunction,
	Router
} from 'express';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { RequestBody, ResponseBody } from './types/global';
import { log } from './log';
import { getPosts } from './getPosts';

const PORT: string = process.env.PORT ?? '';
const API_KEY: string = process.env.API_KEY ?? '';

const app: Application = express();
const router: Router = Router();

app.use(express.json());
app.use(cookieParser());

router.use((req: Request, res: Response, next: NextFunction) => {
	log(req.ip, req.method, req.path);
	if (req.cookies.apiKey === API_KEY) {
		next();
	} else {
		res.status(400);
		const responseBody: ResponseBody<null> = {
			message: 'Unauthorized request',
			data: null
		};
		res.send(responseBody);
	}
});

router.get('/getPosts', getPosts);

app.use('/posts', router);
app.listen(PORT, () => {
	console.log('[POSTS] Server is running on port', PORT);
});
