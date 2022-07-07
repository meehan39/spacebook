export interface AuthRequest {
    token: string
}

export interface AuthResponse {
    success: boolean,
    userID?: number,
    email?: string
}