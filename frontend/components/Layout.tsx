import Head from 'next/head'
import Header from "./Header";

interface props {
    children: JSX.Element
}

export default ({children}: props) => (
    <>
        <main className='font-body h-screen overflow-hidden'>
            <Header />
            {children}
        </main>
    </>
)