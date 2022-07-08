interface PostRequest {
	email: string;
	password: string;
	repeatPassword: string;
}

interface PostResponse {
	message: string;
	success: boolean;
}

export { PostRequest, PostResponse };
