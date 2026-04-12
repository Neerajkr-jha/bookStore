import React from 'react'
import Hero from '../components/Home/Hero'
import RecentBooks from '../components/Home/RecentBooks'

const Home = () => {
  return (
    <div className='text-white bg-zinc-900 px-8 py-10'>
        <Hero/>
        <RecentBooks/>
    </div>
  )
}

export default Home