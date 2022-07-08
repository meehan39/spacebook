interface GetUserRequest {
	type: string;
	key: string;
}

interface GetUserResponse {
	message: string;
	userID?: number;
	email?: string;
	password?: string;
}

interface PostUserRequest {
	email: string;
	password: string;
}

interface PostUserResponse {
	message: string;
	success: boolean;
}

export { GetUserRequest, GetUserResponse, PostUserRequest, PostUserResponse };
