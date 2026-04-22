import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDarkMode } from "../DarkMode/DarkModeContext";
import { Sun, Moon } from "lucide-react";

const Navbar = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/about-us" },
    { title: "Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile" },
    { title: "Admin", link: "/profile" },
  ];

  // const [showNavbar, setShowNavbar] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileNav, setMobileNav] = useState("hidden");
  const { isDark, setIsDark } = useDarkMode();

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > lastScrollY) {
  //       setShowNavbar(false);
  //     } else {
  //       setShowNavbar(true);
  //     }
  //     setLastScrollY(window.scrollY);
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  if (isLoggedIn === false) links.splice(3, 3);
  if (isLoggedIn === true && role === "admin") links.splice(3, 2);
  if (isLoggedIn === true && role === "user") links.splice(5, 1);

  return (
    <>
      <nav
        className={`z-50 top-0 left-0 w-full px-8 py-3 flex items-center justify-between rounded-lg transition-transform duration-300
          ${
            isDark
              ? "bg-gray-900 border-gray-800 text-gray-300"
              : "text-slate-700 bg-none"
          }`}
      >
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="/favicon.svg" alt="logo" />
          <h1
            className={`font-semibold text-2xl ${isDark ? "text-white" : "text-slate-800"}`}
          >
            Bookify
          </h1>
        </Link>

        <div className="nav-links-bookStore block md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {links.map((item, i) => (
              <div key={i} className="flex items-center">
                {item.title === "Profile" || item.title === "Admin" ? (
                  <Link
                    to={item.link}
                    className={`font-semibold border px-4 py-1 rounded transition-all duration-300
                      ${
                        isDark
                          ? "border-gray-700 text-gray-300 hover:bg-white hover:text-slate-600"
                          : "border-slate-800 text-slate-700 hover:bg-slate-800 hover:text-white"
                      }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className={`text-lg font-sans hover:scale-110 transition-all duration-300
                      ${
                        isDark
                          ? "text-gray-300 hover:text-purple-400"
                          : "text-slate-600 hover:text-red-600"
                      }`}
                  >
                    {item.title}
                  </Link>
                )}
              </div>
            ))}

            {/* Desktop Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-all duration-300
                ${
                  isDark
                    ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                    : "bg-slate-200 hover:bg-slate-300 text-slate-700"
                }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

         
          {isLoggedIn === false && (
            <div className="hidden md:flex items-center gap-4 font-sans">
              <Link
                to="/login"
                className={`border px-4 py-1.5 rounded-lg transition-all duration-300
                  ${
                    isDark
                      ? "border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                      : "border-slate-400 text-slate-700 hover:bg-slate-700 hover:text-white"
                  }`}
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-purple-500 text-white px-4 py-1.5 rounded hover:bg-purple-600 transition-all duration-300 shadow-md hover:shadow-purple-500/20"
              >
                Sign up
              </Link>
            </div>
          )}

          {/* Mobile Hamburger */}
          <button
            onClick={() =>
              setMobileNav((prev) => (prev === "hidden" ? "block" : "hidden"))
            }
            className={`block md:hidden hover:rotate-90 transition-all duration-300
              ${isDark ? "text-white" : "text-slate-700"}`}
          >
            <TiThMenu />
          </button>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <div
        className={`${mobileNav} ${
          isDark ? "bg-gray-900" : "bg-slate-200"
        } opacity-95 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {/* Mobile Dark Mode Toggle */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-lg transition-all duration-300 mb-8
            ${
              isDark
                ? "bg-gray-700 hover:bg-gray-600 text-yellow-400"
                : "bg-slate-300 hover:bg-slate-400 text-slate-700"
            }`}
        >
          {isDark ? <Sun size={22} /> : <Moon size={22} />}
        </button>

        {links.map((item, i) => (
          <Link
            to={item.link}
            className={`text-3xl mb-8 transition-all duration-300 hover:text-purple-500
              ${isDark ? "text-white" : "text-slate-800"}`}
            key={i}
            onClick={() => setMobileNav("hidden")}
          >
            {item.title}
          </Link>
        ))}

        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              className={`border text-2xl font-semibold mb-8 px-4 py-1 rounded transition-all duration-300
                ${
                  isDark
                    ? "border-white text-white hover:bg-white hover:text-black"
                    : "border-slate-700 text-slate-800 hover:bg-slate-800 hover:text-white"
                }`}
              onClick={() => setMobileNav("hidden")}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-white bg-purple-500 border border-purple-400 text-2xl font-semibold mb-8 px-4 py-2 rounded hover:bg-purple-600 transition-all duration-300"
              onClick={() => setMobileNav("hidden")}
            >
              Sign up
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
