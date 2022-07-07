import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import 'dotenv/config';

import { RequestBody, ResponseBody } from './types/global';
import { Response, SignupRequest, SignupResponse } from './types/signup';

const API_KEY: string = process.env.API_KEY ?? '';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Response>
): Promise<void> {
	const body: RequestBody<SignupRequest> = {
		apiKey: API_KEY,
		data: req.body
	};
	const { data } = await axios.post<ResponseBody<SignupResponse>>(
		'http://auth:8001/auth/signup',
		body
	);

	const response: Response = {
		success: false
	};
	if (data.data.success) {
		response.success = true;
	} else {
		response.message = data.message;
	}

	res.status(200).json(response);
}
