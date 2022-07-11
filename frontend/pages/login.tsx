import type { NextPage } from 'next';
import { useState } from 'react';
import { useRouter } from 'next/router';

import AuthForm from '../components/AuthForm';
import TextInput from '../components/TextInput';

import setToken from './api/util/setToken';
import { LoginRequest, LoginResponse } from './api/types/login';

const Login: NextPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const submit = async () => {
		const loginRequest: LoginRequest = {
			email: email,
			password: password
		};
		const data: Response = await fetch('/api/login', {
			method: 'POST',
			body: JSON.stringify(loginRequest)
		});
		const loginResponse: LoginResponse = await data.json();
		if (loginResponse.success) {
			setToken(loginResponse.sessionToken);
			router.push('/');
		} else {
			console.error('Login failed.');
		}
	};

	return (
		<div className='flex flex-col justify-start items-center gap-4 pt-16 px-4'>
			<AuthForm name='Login' submit={submit}>
				<TextInput
					type='email'
					value={email}
					setValue={setEmail}
					placeholder='Email'
				/>
				<TextInput
					type='password'
					value={password}
					setValue={setPassword}
					placeholder='Password'
				/>
			</AuthForm>
		</div>
	);
};

export default Login;
