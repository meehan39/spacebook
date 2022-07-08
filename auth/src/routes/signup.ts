import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import request from '../util/request';
import { getSaltRounds } from '../util/env';
import {
	GetUserRequest,
	GetUserResponse,
	PostUserRequest,
	PostUserResponse
} from '../types/global';
import { PostRequest, PostResponse } from '../types/signup';

const SALT_ROUNDS: number = getSaltRounds();

const validEmail = (email: string): boolean => {
	return !!email.match(
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	);
};

const validPassword = (password: string): boolean => {
	return !!password.match(
		/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
	);
};

const signup = async (req: Request, res: Response): Promise<void> => {
	const response: PostResponse = {
		message: '',
		success: false
	};
	try {
		const body: PostRequest = req.body;
		if (validEmail(body.email)) {
			if (validPassword(body.password)) {
				const getUserRequest: GetUserRequest = {
					type: 'email',
					key: body.email
				};
				if (body.password === body.repeatPassword) {
					const getUserResponse: GetUserResponse = await request(
						'GET',
						'http://query:8002/query/user',
						getUserRequest
					);

					if (!getUserResponse.userID) {
						const salt = await bcrypt.genSalt(SALT_ROUNDS);
						const hash = await bcrypt.hash(body.password, salt);
						const postUserRequest: PostUserRequest = {
							email: body.email,
							password: hash
						};
						const postUserResponse: PostUserResponse =
							await request(
								'POST',
								'http://query:8002/query/user',
								postUserRequest
							);

						if (postUserResponse.success) {
							const checkGetUserResponse: GetUserResponse =
								await request(
									'GET',
									'http://query:8002/query/user',
									getUserRequest
								);
							if (!!checkGetUserResponse.userID) {
								response.message = 'Success';
								response.success = true;
							} else {
								res.status(500);
								response.message = 'Internal server error';
								response.success = false;
							}
						}
					} else {
						response.message = 'Email already exists';
						response.success = false;
					}
				} else {
					response.message = "Passwords don't match";
					response.success = false;
				}
			} else {
				response.message = 'Invalid password';
				response.success = false;
			}
		} else {
			response.message = 'Invalid email';
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

export default signup;
