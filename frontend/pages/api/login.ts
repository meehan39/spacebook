import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import 'dotenv/config';

import { RequestBody, ResponseBody } from './types/global';
import { LoginRequest, LoginResponse } from './types/login';

const API_KEY: string = process.env.API_KEY ?? '';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<LoginResponse>
) {
	const loginRequest: RequestBody<LoginRequest> = {
		apiKey: API_KEY,
		data: req.body
	};
	const { data } = await axios.post<ResponseBody<LoginResponse>>(
		'http://auth:8001/auth/login',
		loginRequest
	);
	res.status(200).json(data.data);
}
