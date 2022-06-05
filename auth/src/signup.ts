import { Request, Response } from "express";
import fetch from 'node-fetch';
import bcrypt from 'bcrypt';
import 'dotenv/config';

import { RequestBody, ResponseBody } from "./types";

const API_KEY: string = process.env.API_KEY ?? '';
const SALT_ROUNDS: number = parseInt(process.env.SALT_ROUNDS ?? '');

interface SignupRequest {
    email: string,
    password: string,
    repeatPassword: string
}

interface SignupResponse {
    success: boolean,
    email?: string,
    password?: string
}

const validEmail = (email: string): boolean => {
    return !!email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

const validPassword = (password: string): boolean => {
    return !!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
}

export const signup = async (req: Request, res: Response): Promise<void> => {
    const response: ResponseBody<SignupResponse> = {
        message: '',
        data: {
            success: false
        }
    }
    try {
        const body: RequestBody<SignupRequest> = req.body;
        if (validEmail(body.data.email)) {
            if (validPassword(body.data.password)) {
                if (body.data.password === body.data.repeatPassword) {
                    const salt = await bcrypt.genSalt(SALT_ROUNDS);
                    const hash = await bcrypt.hash(body.data.password, salt);
                    const checkResponseData = await fetch('http://query:8002/query/checkForUser', {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            apiKey: API_KEY,
                            data: {
                                email: body.data.email
                            }
                        })
                    });
                    const checkResponse: any = await checkResponseData.json();

                    if (!checkResponse.data.exists) {
                        const insertResponseData = await fetch('http://query:8002/query/signup', {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                apiKey: API_KEY,
                                data: {
                                    email: body.data.email,
                                    password: hash
                                }
                            })
                        });
                        const insertResponse: any = await insertResponseData.json();
                        if (insertResponse.data.success) {

                            const doubleCheckResponseData = await fetch('http://query:8002/query/checkForUser', {
                                method: 'POST',
                                headers: {'Content-Type': 'application/json'},
                                body: JSON.stringify({
                                    apiKey: API_KEY,
                                    data: {
                                        email: body.data.email
                                    }
                                })
                            });
                            const doubleCheckResponse: any = await doubleCheckResponseData.json();
                            if (!!doubleCheckResponse.data.exists) {
                                response.message = 'Success',
                                response.data = {
                                    success: true
                                }
                            } else {
                                res.status(500);
                                response.message = '[Double Check] Internal server error',
                                response.data = {
                                    success: false
                                }
                            }
                        }
                    } else {
                        response.message = 'Email already exists',
                        response.data = {
                            success: false
                        }
                    }
                } else {
                    response.message = "Passwords don't match";
                    response.data.success = false;
                }
            } else {
                response.message = 'Invalid password';
                response.data.success = false;
            }
        } else {
            response.message = 'Invalid email';
            response.data.success = false;
        }

    } catch(error) {
        res.status(500);
        console.error(error);
        response.message = 'Internal server error';
        response.data.success = false;
    } finally {
        res.send(response);
    }
}