import React from 'react'
import Hero from '../components/Home/Hero'
import RecentBooks from '../components/Home/RecentBooks'
import { useDarkMode } from "../components/DarkMode/DarkModeContext";

const Home = () => {
  const { isDark } = useDarkMode();
  return (
    <div className={`${isDark ? "text-gray-50 bg-gray-900" :"bg-amber-100 text-slate-900"} px-8 py-10`}>
        <Hero/>
        <RecentBooks/>
    </div>
  )
}

export default Home