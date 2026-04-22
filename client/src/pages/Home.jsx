import React from 'react'
import Hero from '../components/Home/Hero'
import RecentBooks from '../components/Home/RecentBooks'

const Home = () => {
  return (
    <div className='text-gray-50 bg-gray-900 px-8 py-10'>
        <Hero/>
        <RecentBooks/>
    </div>
  )
}

export default Home