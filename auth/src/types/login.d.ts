interface PostRequest {
	email: string;
	password: string;
}

interface PostResponse {
	message: string;
	success: boolean;
	sessionToken?: string;
}

export { PostRequest, PostResponse };
