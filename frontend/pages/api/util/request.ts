import axios from 'axios';
import { getApiKey } from '../util/env';
import { error } from './log';

const API_KEY = getApiKey();

const request = async (
	method: string,
	url: string,
	params: any
): Promise<any> => {
	if (method === 'GET') {
		const { data } = await axios.get(url, {
			headers: {
				'api-key': API_KEY
			},
			params: params
		});
		return data;
	} else if (method === 'POST') {
		const { data } = await axios.post(url, params, {
			headers: {
				'api-key': API_KEY
			}
		});
		return data;
	}
	error('[Auth] Malformed call to request method');
};

export default request;
