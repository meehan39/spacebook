export interface LoginRequest {
    email: string,
    password: string
}

export interface LoginResponse {
    success: boolean,
    sessionToken?: string
}