import { Request, Response } from "express";
import sql from 'mssql'
import 'dotenv/config';
import { readConfig } from './dbConfig';
import { RequestBody, ResponseBody } from "./types";

interface CheckForUserRequest {
    email: string
}

interface CheckForUserResponse {
    exists?: boolean
}

export const checkForUser = async (req: Request, res: Response): Promise<void> => {
    const requestBody: RequestBody<CheckForUserRequest> = req.body;
    const responseBody: ResponseBody<CheckForUserResponse> = {
        message: '',
        data: { }
    }
    try {
        const pool = await sql.connect(readConfig);
        const check: sql.IResult<any> = await pool.request()
            .input('email', sql.NVarChar, requestBody.data.email)
            .query(`
            SELECT email FROM Users
            WHERE email = @email;
            `);
        pool.close();

        if (check.recordset[0]) {
            responseBody.message = 'Email already exists';
            responseBody.data.exists = true;
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
}