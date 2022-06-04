const currentDateTime = (): String => {
    const date: Date = new Date();
    const dateStr: String = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    return dateStr;
}

export const log = (ip: string, method: string, path: string): void => {
    console.log(`[${currentDateTime()}] AUTH : ${method} - ${path} : ${ip}`);
}

export const error = (message: string): void => {
    throw new Error(message)
}