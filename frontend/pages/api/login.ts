import type { NextApiRequest, NextApiResponse } from 'next';

import { LoginRequest, LoginResponse } from './types/login';
import request from './util/request';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<LoginResponse>
) {
	const loginRequest: LoginRequest = JSON.parse(req.body);
	const loginResponse: LoginResponse = await request(
		'POST',
		'http://auth:8001/auth/login',
		loginRequest
	);
	res.status(200).json(loginResponse);
}
