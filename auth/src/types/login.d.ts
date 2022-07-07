export interface LoginRequest {
	email: string;
	password: string;
}

export interface LoginResponse {
	success: boolean;
	sessionToken?: string;
}

export interface GetUserResponse {
	exists: boolean;
	userID?: number;
	email?: string;
	password?: string;
}
