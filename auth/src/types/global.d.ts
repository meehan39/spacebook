export interface RequestBody<T> {
    apiKey: string,
    data: T
}

export interface ResponseBody<T> {
    message: string,
    data: T
}

export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    success: boolean,
    sessionToken?: string
}

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

export interface AuthRequest {
    token: string
}

export interface AuthResponse {
    success: boolean,
    userID?: number,
    email?: string
}



export interface GetUserResponse {
    exists: boolean,
    userID?: number,
    email?: string,
    password?: string
}

export interface CheckForUserResponse {
    exists?: boolean
}

export interface SignupAPIResponse {
    success: boolean
}