import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkMode/DarkModeContext";

const Hero = () => {
  const { isDark } = useDarkMode();

  return (
    <div className="h-[75vh] flex flex-col md:flex-row items-center justify-center">
      <div className="w-full lg:w-3/6 mb-12 md:mb-0 flex flex-col items-center lg:items-start justify-center">
        <h1
          className={`font-serif text-4xl lg:text-7xl lg:text-left text-center
            ${isDark ? "text-white" : "text-slate-800"}`}
        >
          Discover Your Next Great Read
        </h1>
        <p
          className={`font-serif text-2xl mt-4 text-center lg:text-left
            ${isDark ? "text-gray-400" : "text-slate-500"}`}
        >
          Uncover captivating stories, enriching knowledge, and endless
          inspiration in our curated collection of books
        </p>
        <div>
          <Link
            to="/all-books"
            className={`flex items-center justify-between gap-4 font-semibold text-2xl border-2 rounded-full
              px-6 py-2 mt-8 transition-all duration-300 hover:bg-amber-400 hover:text-white hover:border-amber-50
              ${isDark
                ? "text-gray-200 border-gray-500"
                : "text-slate-700 border-slate-400"
              }`}
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