import {CircleArrowRight} from 'lucide-react'
// import heroImg from '../../assets/hero.png'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center">
        <h1 className="font-semibold text-4xl lg:text-6xl text-yellow-100 font-mono lg:text-left text-center">
          Discover Your Next Great Read
        </h1>
        <p className="font-mono text-xl mt-4 text-zinc-300 text-center lg:text-left">
          Uncover captitaive stories, enriching Knowledge, and endless
          Inspiration in our curated collection of books
        </p>
        <div>
          <Link to="/all-books" className="flex text-yellow-100 gap-4 items-center justify-between font-semibold text-2xl border border-y-amber-100 rounded-full px-10 text-center mt-8 py-2 pr-2 pl-6 hover:bg-zinc-800">
            Discover books <CircleArrowRight className='size-8 opacity-50 text-yellow-100 '/>
          </Link> 
        </div>
      </div>
      <div className='lg:w-3/6 w-full h-auto lg:h-full flex items-center justify-center'>
        <img src='./hero.png' alt="hero"/>
      </div>
    </div>
  );
};

export default Hero;
