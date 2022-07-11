import type { NextApiRequest, NextApiResponse } from 'next';

import { SignupRequest, SignupResponse } from './types/signup';
import request from './util/request';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<SignupResponse>
): Promise<void> {
	const signupRequest: SignupRequest = JSON.parse(req.body);
	const signupResponse: SignupResponse = await request(
		'POST',
		'http://auth:8001/auth/signup',
		signupRequest
	);
	res.status(200).json(signupResponse);
}
