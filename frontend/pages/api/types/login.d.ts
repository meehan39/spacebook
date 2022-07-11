interface LoginRequest {
	email: string;
	password: string;
}

interface LoginResponse {
	message: string;
	success: boolean;
	sessionToken?: string;
}

export { LoginRequest, LoginResponse };
