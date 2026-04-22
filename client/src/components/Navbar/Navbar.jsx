import { Link } from "react-router-dom";
import { TiThMenu } from "react-icons/ti";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const links = [
    {
      title: "Home",
      link: "/",
    },
    {
      title: "About Us",
      link: "/about-us",
    },
    {
      title: "All Books",
      link: "/all-books",
    },
    {
      title: "Cart",
      link: "/cart",
    },
    {
      title: "Profile",
      link: "/profile",
    },
    {
      title: "Admin",
      link: "/profile",
    },
  ];

  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // scrolling down
      } else {
        setShowNavbar(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  if (isLoggedIn === false) {
    links.splice(3, 3);
  }
  if (isLoggedIn === true && role === "admin") {
    links.splice(4, 1);
  }
  if (isLoggedIn === true && role === "user") {
    links.splice(5, 1);
  }
  const [mobileNav, setMobileNav] = useState("hidden");

  return (
    <>
      <nav className={`z-50 bg-gray-800 fixed top-0 left-0 w-full text-gray-300 px-8 py-3 flex items-center justify-between rounded-lg border-b border-gray-700 ${showNavbar ? "translate-y-0" : "-translate-y-full"} transition-transform duration-300 `}>
        <Link to="/" className="flex items-center">
          <img className="h-10 me-4" src="/favicon.svg" alt="logo" />
          <h1 className="font-mono text-2xl">Bookify</h1>
        </Link>
        <div className="nav-links-bookStore block md:flex items-center gap-4">
          <div className="hidden md:flex gap-4">
            {links.map((item, i) => (
              <div className="flex items-center align-middle">
                {item.title === "Profile" || item.title === "Admin" ? (
                  <Link
                    to={item.link}
                    className="border border-gray-700 px-4 py-1 rounded hover:bg-white hover:text-purple-600 hover:font-sans transition-all duration-300"
                    key={i}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link
                    to={item.link}
                    className="text-lg font-sans hover:text-purple-400 hover:scale-110 transition-all duration-400"
                    key={i}
                  >
                    {item.title}{" "}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {isLoggedIn === false && (
            <div className="hidden md:flex items-center gap-4 font-sans">
              <Link
                to="/login"
                className="border border-gray-700 text-gray-300 px-4 py-1.5 rounded-lg 
               hover:bg-gray-700 hover:text-white 
               transition-all duration-300"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="bg-purple-500 text-white px-4 py-1.5 rounded 
               hover:bg-purple-600 
               transition-all duration-300 shadow-md hover:shadow-purple-500/20"
              >
                Sign up
              </Link>
            </div>
          )}
          <button
            onClick={() => {
              mobileNav === "hidden"
                ? setMobileNav("block")
                : setMobileNav("hidden");
            }}
            className="block md:hidden text-white hover:rotate-90 transition-all duration-800"
          >
            <TiThMenu />
          </button>
        </div>
      </nav>
      <div
        className={`${mobileNav} bg-zinc-600 opacity-75 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center`}
      >
        {links.map((item, i) => (
          <Link
            to={item.link}
            className="text-white text-3xl mb-8 hover:text-blue-500 transition-all duration-400"
            key={i}
            onClick={() =>
              setMobileNav((prev) => (prev === "hidden" ? "" : "hidden"))
            }
          >
            {item.title}{" "}
          </Link>
        ))}
        {isLoggedIn === false && (
          <>
            <Link
              to="/login"
              className="border text-white text-2xl font-semibold border-white-500 mb-8 px-4 py-1 rounded hover:bg-white hover:text-black transition-all duration-300"
              onClick={() =>
                setMobileNav((prev) => (prev === "hidden" ? "" : "hidden"))
              }
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="text-amber-50 bg-blue-500 border text-2xl font-semibold border-white mb-8 px-4 py-2 rounded hover:bg-white hover:text-black transition-all duration-300"
              onClick={() =>
                setMobileNav((prev) => (prev === "hidden" ? "" : "hidden"))
              }
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
