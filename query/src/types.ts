export interface RequestBody<T> {
    apiKey: string,
    data: T
}

export interface ResponseBody<T> {
    message: string,
    data: T
}

export interface CheckForUserResponse {
    exists?: boolean
}