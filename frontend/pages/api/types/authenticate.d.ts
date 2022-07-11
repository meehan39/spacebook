interface AuthRequest {
	token: string;
}

interface AuthResponse {
	message: string;
	success: boolean;
	userID?: number;
	email?: string;
}

export { AuthRequest, AuthResponse };
