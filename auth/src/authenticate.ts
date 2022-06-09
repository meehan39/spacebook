import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { RequestBody, ResponseBody, AuthRequest, AuthResponse } from "./types/global";

const API_KEY: string = process.env.API_KEY ?? '';
const JWT_TOKEN_KEY: string = process.env.JWT_TOKEN_KEY ?? '';

export const authenticate = (req: Request, res: Response): void => {
    const response: ResponseBody<AuthResponse> = {
        message: '',
        data: {
            success: false
        }
    }
    try {
        const body: RequestBody<AuthRequest> = req.body;
        try {
            const user: any = jwt.verify(body.data.token, JWT_TOKEN_KEY);
            response.message = 'Successfully authenticated';
            response.data.success = true;
            response.data.userID = user.userID;
            response.data.email = user.email;
        } catch (tokenExpired) {
            response.message = 'Token expired';
            response.data.success = false;
        }
    } catch(error) {
        console.error(error);
        response.message = 'Invalid request';
        response.data.success = false;
    } finally {
        res.send(response);
    }
}