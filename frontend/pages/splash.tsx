import type { NextPage } from 'next';
import SplashButton from '../components/SplashButton';

const Splash: NextPage = () => (
	<div className='flex flex-col justify-start items-center gap-4 pt-[15%]'>
		<SplashButton text='Login' href='/login' />
		<SplashButton text='Signup' href='/signup' />
	</div>
);

export default Splash;
