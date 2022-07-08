interface GetRequest {
	token: string;
}

interface GetResponse {
	message: string;
	success: boolean;
	userID?: number;
	email?: string;
}

export { GetRequest, GetResponse };
