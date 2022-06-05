import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import fetch from 'node-fetch';
import jwt from 'jsonwebtoken';
import 'dotenv/config';

import { RequestBody, ResponseBody } from "./types";

const API_KEY: string = process.env.API_KEY ?? '';
const JWT_TOKEN_KEY: string = process.env.JWT_TOKEN_KEY ?? '';

interface LoginRequest {
    email: string,
    password: string
}

interface LoginResponse {
    success: boolean,
    sessionToken?: string
}

export const login = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseBody<LoginResponse> = {
        message: '',
        data: {
            success: false
        }
    }
    try {
        const body: RequestBody<LoginRequest> = req.body;
        const userData = await fetch('http://query:8002/query/getUser', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                apiKey: API_KEY,
                data: {
                    email: body.data.email
                }
            })
        });
        const user: any = await userData.json();
        if (user.data.exists) {
            const correctPass: boolean = await bcrypt.compare(body.data.password, user.data.password);
            if (correctPass) {
                const token = jwt.sign({
                    userID: user.data.userID,
                    email: body.data.email,
                    password: body.data.password
                }, JWT_TOKEN_KEY);
                response.message = 'Login success';
                response.data.success = true;
                response.data.sessionToken = token;
            } else {
                response.message = 'Invalid login';
                response.data.success = false;
            }
        } else {
            response.message = 'Invalid login';
            response.data.success = false;
        }
    } catch (error) {
        res.status(500);
        console.error(error);
        response.message = 'Internal server error';
        response.data.success = false;
    } finally {
        res.send(response);
    }

}