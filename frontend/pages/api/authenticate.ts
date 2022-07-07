import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

import { RequestBody, ResponseBody } from './types/global';
import { AuthRequest, AuthResponse } from './types/authenticate';

const API_KEY: string = process.env.API_KEY ?? '';

export default async function handler(req: NextApiRequest, res: NextApiResponse<AuthResponse>) {
    const authRequest: RequestBody<AuthRequest> = {
      apiKey: API_KEY,
      data: JSON.parse(req.body)
    };
    const {data} = await axios.post<ResponseBody<AuthResponse>>('http://auth:8001/auth/authenticate', authRequest);
    res.status(200).json(data.data);
  }