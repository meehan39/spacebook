import 'dotenv/config';
import { error } from './log';

const getApiKey = (): string => {
	const apiKey: string = process.env.API_KEY ?? '';
	if (apiKey === '') {
		error('API_KEY environment variable not properly configured.');
	}
	return apiKey;
};

const getPort = (): number => {
	const port: string = process.env.PORT ?? '';
	if (port === '') {
		error('PORT environment variable not properly configured.');
	}
	return parseInt(port);
};

const getJwtKey = (): string => {
	const jwtKey: string = process.env.JWT_KEY ?? '';
	if (jwtKey === '') {
		error('JWT_KEY environment variable not properly configured.');
	}
	return jwtKey;
};

export { getApiKey, getPort, getJwtKey };
