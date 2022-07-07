export interface CheckForUserRequest {
	email: string;
}

export interface CheckForUserResponse {
	exists?: boolean;
}
