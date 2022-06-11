import type { NextPage } from "next";
import AuthForm from "../components/AuthForm";
import TextInput from "../components/TextInput";

const Login: NextPage = () => (
    <div
        className='flex flex-col justify-start items-center gap-4 pt-16 px-4'
    >
        <AuthForm name='Login'>
            <TextInput type='email' placeholder='Email' />
            <TextInput type='password' placeholder='Password' />
        </AuthForm>
    </div>
)

export default Login