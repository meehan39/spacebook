interface GetRequest {
	type: string;
	key: string;
}

interface GetResponse {
	message: string;
	userID?: number;
	email?: string;
	password?: string;
}

interface PostRequest {
	email: string;
	password: string;
}

interface PostResponse {
	message: string;
	success: boolean;
}

export { GetRequest, GetResponse, PostRequest, PostResponse };
