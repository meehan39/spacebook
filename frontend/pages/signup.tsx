import type { NextPage } from "next";
import AuthForm from "../components/AuthForm";
import TextInput from "../components/TextInput";
import axios from 'axios';

const submit = () => {

}

const Signup: NextPage = () => (
    <div
        className='flex flex-col justify-start items-center gap-4 pt-16 px-4'
    >
        <AuthForm name='Signup' submit={submit}>
            <TextInput type='email' placeholder='Email' />
            <TextInput type='password' placeholder='Password' />
            <TextInput type='password' placeholder='Repeat Password' />
        </AuthForm>
    </div>
)

export default Signup