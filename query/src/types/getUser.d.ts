export interface GetUserRequest {
	email: string;
}

export interface GetUserResponse {
	exists: boolean;
	userID?: number;
	email?: string;
	password?: string;
}
