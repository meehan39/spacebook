import type { NextApiRequest, NextApiResponse } from 'next';

import { AuthRequest, AuthResponse } from './types/authenticate';
import request from './util/request';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<AuthResponse>
) {
	const authRequest: AuthRequest = JSON.parse(req.body);
	const authResponse: AuthResponse = await request(
		'POST',
		'http://auth:8001/auth/authenticate',
		authRequest
	);
	res.status(200).json(authResponse);
}
