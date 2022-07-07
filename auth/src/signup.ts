import { Request, Response } from 'express';
import axios from 'axios';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import { RequestBody, ResponseBody } from './types/global';
import {
	SignupRequest,
	SignupResponse,
	SignupAPIResponse,
	CheckForUserResponse
} from './types/signup';

const API_KEY: string = process.env.API_KEY ?? '';
const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS ?? '');

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

export const signup = async (req: Request, res: Response): Promise<void> => {
	const response: ResponseBody<SignupResponse> = {
		message: '',
		data: {
			success: false
		}
	};
	try {
		const body: RequestBody<SignupRequest> = req.body;
		if (body.apiKey === API_KEY) {
			if (validEmail(body.data.email)) {
				if (validPassword(body.data.password)) {
					if (body.data.password === body.data.repeatPassword) {
						let { data } = await axios.post<
							ResponseBody<CheckForUserResponse>
						>('http://query:8002/query/checkForUser', {
							apiKey: API_KEY,
							data: {
								email: body.data.email
							}
						});
						const checkResponse = data;

						if (!checkResponse.data.exists) {
							const salt = await bcrypt.genSalt(SALT_ROUNDS);
							const hash = await bcrypt.hash(
								body.data.password,
								salt
							);
							let { data } = await axios.post<
								ResponseBody<SignupAPIResponse>
							>('http://query:8002/query/signup', {
								apiKey: API_KEY,
								data: {
									email: body.data.email,
									password: hash
								}
							});
							const insertResponse = data;

							if (insertResponse.data.success) {
								let { data } = await axios.post<
									ResponseBody<CheckForUserResponse>
								>('http://query:8002/query/checkForUser', {
									apiKey: API_KEY,
									data: {
										email: body.data.email
									}
								});
								const doubleCheckResponse = data;
								if (!!doubleCheckResponse.data.exists) {
									(response.message = 'Success'),
										(response.data = {
											success: true
										});
								} else {
									res.status(500);
									(response.message =
										'Internal server error'),
										(response.data = {
											success: false
										});
								}
							}
						} else {
							(response.message = 'Email already exists'),
								(response.data = {
									success: false
								});
						}
					} else {
						response.message = "Passwords don't match";
						response.data.success = false;
					}
				} else {
					response.message = 'Invalid password';
					response.data.success = false;
				}
			} else {
				response.message = 'Invalid email';
				response.data.success = false;
			}
		} else {
			res.status(401);
			response.message = 'Unauthorized request';
			response.data.success = false;
		}
	} catch (error) {
		res.status(500);
		console.error(error);
		response.message = 'Internal server error';
		response.data.success = false;
	} finally {
		res.send(response);
	}
};
