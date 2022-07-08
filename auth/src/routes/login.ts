import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import request from '../util/request';
import { getJwtKey } from '../util/env';
import { PostRequest, PostResponse } from '../types/login';
import { GetUserRequest, GetUserResponse } from '../types/global';

const JWT_KEY: string = getJwtKey();

const login = async (req: Request, res: Response): Promise<void> => {
	const response: PostResponse = {
		message: '',
		success: false
	};
	try {
		const body: PostRequest = req.body;
		const getUserRequest: GetUserRequest = {
			type: 'email',
			key: body.email
		};
		const getUserResponse: GetUserResponse = await request(
			'GET',
			'http://query:8002/query/user',
			getUserRequest
		);
		if (getUserResponse.userID) {
			const correctPass: boolean = await bcrypt.compare(
				body.password,
				getUserResponse.password!
			);
			if (correctPass) {
				const token = jwt.sign(
					{
						userID: getUserResponse.userID,
						email: body.email
					},
					JWT_KEY,
					{ expiresIn: '1d' }
				);
				response.message = 'Login success';
				response.success = true;
				response.sessionToken = token;
			} else {
				response.message = 'Invalid login';
				response.success = false;
			}
		} else {
			response.message = 'Invalid login';
			response.success = false;
		}
	} catch (error) {
		res.status(500);
		console.error(error);
		response.message = 'Internal server error';
		response.success = false;
	} finally {
		res.send(response);
	}
};

export default login;
