import { NextApiResponse, NextPage } from 'next';
import AuthForm from '../components/AuthForm';
import TextInput from '../components/TextInput';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';

import { Response } from './api/types/signup';

const Signup: NextPage = () => {
	const router = useRouter();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');

	const submit = async () => {
		const { data } = await axios.post<Response>('/api/signup', {
			email: email,
			password: password,
			repeatPassword: repeatPassword
		});
		if (data.success) {
			router.push('/login');
		} else {
			console.error(data.message);
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
