export interface SignupRequest {
    email: string,
    password: string,
    repeatPassword: string
}

export interface SignupResponse {
    success: boolean,
    email?: string,
    password?: string
}

export interface Response {
    success: boolean,
    message?: string
}
