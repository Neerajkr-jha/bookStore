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

const App = () => {
  //when we refesh webpage useeffect render data
  const role = useSelector((state) => state.auth);
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
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />}>
          <Route index element={<Favourites />} />
          <Route path="/profile/orderHistory" element={<UserOrderHistory />} />
          <Route path="/profile/settings" element={<Settings />} />
        </Route>
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/view-book/:id" element={<ViewBook />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
