import { Request, Response } from 'express';
import sql from 'mssql';
import 'dotenv/config';

import { readConfig, readWriteConfig } from '../util/dbConfig';
import {
	GetRequest,
	GetResponse,
	PostRequest,
	PostResponse
} from '../types/user';

export const getUser = async (req: Request, res: Response): Promise<void> => {
	const responseBody: GetResponse = {
		message: ''
	};
	try {
		const requestBody: GetRequest = {
			type: req.query.type?.toString() ?? '',
			key: req.query.key?.toString() ?? ''
		};
		const pool: sql.ConnectionPool = await sql.connect(readConfig);
		if (requestBody.type === 'user_id' || requestBody.type === 'email') {
			const query = `
				SELECT user_id, email, password FROM Users
				WHERE ${requestBody.type} = @key;
			`;
			console.log(requestBody.key);
			const user: sql.IResult<any> = await pool
				.request()
				.input('key', sql.NVarChar, requestBody.key)
				.query(query);
			pool.close();
			console.log(user.recordset);
			if (user.recordset[0]) {
				responseBody.message = 'User exists';
				responseBody.userID = user.recordset[0].user_id;
				responseBody.email = user.recordset[0].email;
				responseBody.password = user.recordset[0].password;
			} else {
				responseBody.message = 'Email does not exist';
			}
		} else {
			res.status(400);
			responseBody.message = 'Bad request';
		}
	} catch (error) {
		res.status(500);
		responseBody.message = 'Internal server error';
	} finally {
		res.send(responseBody);
	}
};

export const postUser = async (req: Request, res: Response): Promise<void> => {
	const responseBody: PostResponse = {
		message: '',
		success: false
	};
	try {
		const requestBody: PostRequest = req.body;
		const pool = await sql.connect(readWriteConfig);
		await pool
			.request()
			.input('email', sql.NVarChar, requestBody.email)
			.input('password', sql.NVarChar, requestBody.password).query(`
				INSERT INTO Users (email, password)
				VALUES (@email, @password);
            `);
		pool.close();
		responseBody.message = 'Success';
		responseBody.success = true;
	} catch (error) {
		res.status(500);
		responseBody.message = 'Internal server error';
		responseBody.success = false;
		console.error(error);
	} finally {
		res.send(responseBody);
	}
};
