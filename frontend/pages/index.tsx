import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Navbar from '../components/navbar/Navbar'

const Home: NextPage = () => {
  return (
    <div className='flex h-full flex-row box-border'>
      <Navbar page='home'></Navbar>
      <div className='w-full h-full overflow-scroll'></div>
    </div>
  )
}

export default Home
