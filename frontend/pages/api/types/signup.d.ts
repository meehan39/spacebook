interface SignupRequest {
	email: string;
	password: string;
	repeatPassword: string;
}

interface SignupResponse {
	message: string;
	success: boolean;
}

export { SignupRequest, SignupResponse };
