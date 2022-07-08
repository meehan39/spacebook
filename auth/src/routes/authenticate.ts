import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { getJwtKey } from '../util/env';
import { GetRequest, GetResponse } from '../types/authenticate';

const JWT_TOKEN_KEY: string = getJwtKey();

const authenticate = (req: Request, res: Response): void => {
	const response: GetResponse = {
		message: '',
		success: false
	};
	try {
		const body: GetRequest = req.body;
		try {
			const user: any = jwt.verify(body.token, JWT_TOKEN_KEY);
			response.message = 'Successfully authenticated';
			response.success = true;
			response.userID = user.userID;
			response.email = user.email;
		} catch (tokenExpired) {
			response.message = 'Token expired';
			response.success = false;
		}
	} catch (error) {
		console.error(error);
		response.message = 'Invalid request';
		response.success = false;
	} finally {
		res.send(response);
	}
};

export default authenticate;
