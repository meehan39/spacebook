import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import axios from "axios";
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { RequestBody, ResponseBody, LoginRequest, LoginResponse, GetUserResponse } from "./types/global";

const API_KEY: string = process.env.API_KEY ?? '';
const JWT_TOKEN_KEY: string = process.env.JWT_TOKEN_KEY ?? '';

export const login = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseBody<LoginResponse> = {
        message: '',
        data: {
            success: false
        }
    }
    try {
        const body: RequestBody<LoginRequest> = req.body;
        const {data} = await axios.post<ResponseBody<GetUserResponse>>
        ('http://query:8002/query/getUser',
            {
                apiKey: API_KEY,
                data: {
                    email: body.data.email
                }
            })
        if (data.data.exists) {
            const correctPass: boolean = await bcrypt.compare(body.data.password, data.data.password!);
            if (correctPass) {
                const token = jwt.sign(
                    {
                        userID: data.data.userID,
                        email: body.data.email
                    },
                    JWT_TOKEN_KEY,
                    {expiresIn: '1d'}
                );
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