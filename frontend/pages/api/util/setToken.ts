import { setCookie } from 'nookies';
import { error } from './log';

const setToken = (token?: string) => {
	if (token) {
		console.log(token);
		setCookie(null, 'token', token);
	} else {
		error('[FRONTEND] - setToken - Session token is null');
	}
};

export default setToken;
