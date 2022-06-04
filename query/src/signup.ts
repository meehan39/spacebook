import { Request, Response } from "express";
import sql from 'mssql'
import 'dotenv/config';
import { readWriteConfig } from './dbConfig';
import { RequestBody, ResponseBody } from "./types";

interface SignupRequest {
    email: string,
    password: string
}

interface SignupResponse {
    success: boolean
}

export const signup = async (req: Request, res: Response): Promise<void> => {
    const responseBody: ResponseBody<SignupResponse> = {
        message: '',
        data: {
            success: false
        }
    }
    try {
        const requestBody: RequestBody<SignupRequest> = req.body;
        const pool = await sql.connect(readWriteConfig);
        await pool.request()
            .input('email', sql.NVarChar, requestBody.data.email)
            .input('password', sql.NVarChar, requestBody.data.password)
            .query(`
            INSERT INTO Users (email, password)
            VALUES (@email, @password);
            `);
        pool.close();
        responseBody.message = 'Success';
        responseBody.data.success = true;
//         const newUser: sql.IResult<any> = await pool.request()
//             .input('email', sql.NVarChar, requestBody.data.email)
//             .query(`
//             SELECT email, password FROM Users
//             WHERE email = @email;
//             `);
//         if (newUser.recordset[0] !== undefined) {
//             responseBody.message = 'Signup success';
//             responseBody.data.success = true;
//             responseBody.data.email = newUser.recordset[0].email;
//             responseBody.data.password = newUser.recordset[0].password;
//         } else {
//             res.status(500);
//             responseBody.message = 'Signup error';
//         }
    } catch(error) {
        res.status(500);
        responseBody.message = 'Internal server error';
        responseBody.data.success = false;
        console.error(error)
    } finally {
        res.send(responseBody);
    }
}