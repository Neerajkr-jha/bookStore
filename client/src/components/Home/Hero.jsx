import { CircleArrowRight } from "lucide-react";
// import heroImg from '../../assets/hero.png'
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center">
        <h1 className="font-serif text-4xl lg:text-7xl text-white lg:text-left text-center">
          Discover Your Next Great Read
        </h1>
        <p className="font-serif text-2xl mt-4 text-gray-400 text-center lg:text-left">
          Uncover captitaive stories, enriching Knowledge, and endless
          Inspiration in our curated collection of books
        </p>
        <div>
          <Link
            to="/all-books"
            className="flex items-center justify-between gap-4 
               text-gray-200 font-semibold text-2xl 
               border-2 border-gray-500 rounded-full 
               px-6 py-2 mt-8 
               hover:bg-purple-600 hover:text-white 
               transition-all duration-300 group"
          >
            Discover books
          </Link>
        </div>
      </div>
      <div className="lg:w-3/6 w-full h-auto lg:h-full flex items-center justify-center">
        <img src="./hero.png" alt="hero" />
      </div>
    </div>
  );
};

export default Hero;
