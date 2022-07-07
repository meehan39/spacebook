import { Request, Response } from 'express';
import sql from 'mssql';
import 'dotenv/config';

import { readConfig } from './dbConfig';
import { RequestBody, ResponseBody } from './types/global';
import { GetUserRequest, GetUserResponse } from './types/getUser';

export const getUser = async (req: Request, res: Response): Promise<void> => {
	const responseBody: ResponseBody<GetUserResponse> = {
		message: '',
		data: {
			exists: false
		}
	};
	try {
		const requestBody: RequestBody<GetUserRequest> = req.body;
		const pool = await sql.connect(readConfig);
		const user: sql.IResult<any> = await pool
			.request()
			.input('email', sql.NVarChar, requestBody.data.email).query(`
            SELECT user_id, email, password FROM Users
            WHERE email = @email;
            `);
		pool.close();
		if (user.recordset[0]) {
			responseBody.message = 'Email exists';
			responseBody.data.exists = true;
			responseBody.data.userID = user.recordset[0].user_id;
			responseBody.data.email = user.recordset[0].email;
			responseBody.data.password = user.recordset[0].password;
		} else {
			responseBody.message = 'Email does not exist';
			responseBody.data.exists = false;
		}
	} catch (error) {
		res.status(500);
		responseBody.message = 'Internal server error';
	} finally {
		res.send(responseBody);
	}
};
