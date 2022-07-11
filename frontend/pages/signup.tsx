import { NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import TextInput from '../components/TextInput';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { SignupRequest, SignupResponse } from './api/types/signup';

const Signup: NextPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const submit = async () => {
		const signupRequest: SignupRequest = {
			email: email,
			password: password,
			repeatPassword: repeatPassword
		};
		const data = await fetch('/api/signup', {
			method: 'POST',
			body: JSON.stringify(signupRequest)
		});
		const signupResponse: SignupResponse = await data.json();
		if (signupResponse.success) {
			router.push('/login');
		} else {
			console.error(signupResponse.message);
		}
	};

	return (
		<div className='flex flex-col justify-start items-center gap-4 pt-16 px-4'>
			<AuthForm name='Signup' submit={submit}>
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
				<TextInput
					type='password'
					value={repeatPassword}
					setValue={setRepeatPassword}
					placeholder='Repeat Password'
				/>
			</AuthForm>
		</div>
	);
};

export default Signup;
