import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer/Footer";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import AllBooks from "./pages/AllBooks";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import ViewBook from "./components/ViewBook/ViewBook";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./app/authSlice";
import Favourites from "./components/Profile/Favourites";
import UserOrderHistory from "./components/Profile/UserOrderHistory";
import Settings from "./components/Profile/Settings";
import AllOrders from "./components/Profile/AllOrders";
import AddBook from "./components/Profile/AddBook";
import UpdateBook from "./components/Profile/UpdateBook";
import AboutUs from "./pages/AboutUs";
import { useDarkMode } from "./components/DarkMode/DarkModeContext";

const App = () => {
  const { isDark } = useDarkMode();
  //when we refesh webpage useeffect render data
  const role = useSelector((state) => state.auth.role);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("role")
    ) {
      dispatch(authActions.login());
      dispatch(authActions.changeRole(localStorage.getItem("role")));
    }
  }, []);

  return (
    <div
      className={`${isDark ? "bg-gray-900 text-gray-50" : "bg-amber-50 text-gray-700"}`}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />}>
          {role === "user" ? (
            <Route index element={<Favourites />} />
          ) : (
            <Route index element={<AllOrders />} />
          )}
          {role === "admin" && (
            <Route path="/profile/add-book" element={<AddBook />} />
          )}
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/view-book/:id" element={<ViewBook />} />
        <Route path="/update-book/:id" element={<UpdateBook />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
