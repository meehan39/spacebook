import { Request, Response } from 'express';
import sql from 'mssql';
import 'dotenv/config';

import { readWriteConfig } from './dbConfig';
import { RequestBody, ResponseBody } from './types/global';
import { SignupRequest, SignupResponse } from './types/signup';

export const signup = async (req: Request, res: Response): Promise<void> => {
	const responseBody: ResponseBody<SignupResponse> = {
		message: '',
		data: {
			success: false
		}
	};
	try {
		const requestBody: RequestBody<SignupRequest> = req.body;
		const pool = await sql.connect(readWriteConfig);
		await pool
			.request()
			.input('email', sql.NVarChar, requestBody.data.email)
			.input('password', sql.NVarChar, requestBody.data.password).query(`
            INSERT INTO Users (email, password)
            VALUES (@email, @password);
            `);
		pool.close();
		responseBody.message = 'Success';
		responseBody.data.success = true;
	} catch (error) {
		res.status(500);
		responseBody.message = 'Internal server error';
		responseBody.data.success = false;
		console.error(error);
	} finally {
		res.send(responseBody);
	}
};
