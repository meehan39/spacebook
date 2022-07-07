import { Request, Response } from 'express';

import {
	RequestBody,
	ResponseBody,
	GetPostsRequest,
	GetPostsResponse
} from './types/global';

export const getPosts = (req: Request, res: Response): void => {
	const response: ResponseBody<GetPostsResponse> = {
		message: '',
		data: {
			posts: []
		}
	};
	res.send(response);
};
