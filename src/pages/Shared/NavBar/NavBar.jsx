import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from '../../../assets/logo.png';
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);

  const [cart] = useCart();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // 🔥 Convert ibb.co to direct image link
  const getDirectImageURL = (photoURL) => {
    if (!photoURL) return "";
    if (photoURL.includes("ibb.co")) {
      const path = photoURL.split("/").pop(); // get x8h38zm0
      return `https://i.ibb.co/${path}/image.png`; // modify as needed
    }
    return photoURL;
  };

  // Create a separate section for mobile user info
  const mobileUserInfo = (
    <li className="flex items-center gap-2">
      {user?.photoURL && (
        <img
          src={getDirectImageURL(user.photoURL)}
          alt="User"
          className="w-[70px] h-16 rounded-full border-2 border-orange-400"
        />
      )}
      <span className="font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
        {user?.displayName}
      </span>
      
      <li> <Link to="/dashboard/cart"> <button className="btn"> <FaShoppingCart></FaShoppingCart> 
      <div className="badge badge-secondary"> + {cart.length}</div>
      </button> </Link> </li>

    </li>
 
  );

  // Create a separate section for mobile logout/login button
  const mobileLoginButton = (
    <li>
      {user ? (
        <button onClick={handleLogOut} className="btn btn-outline">Logout</button>
      ) : (
        <Link to="/login">
          <button className="btn">Login</button>
        </Link>
      )}
    </li>

    

  );

  // Remove the user info and login/logout from navOptions for large devices
  const navOptions = (
    <>
      <Link to="/">
        <li className="font-bold"><a>Home</a></li>
      </Link>
      <Link to="/menu">
        <li className="font-bold"><a>Menu</a></li>
      </Link>
      <Link to="/order/salad">
        <li className="font-bold"><a>Order</a></li>
      </Link>
      <Link to="/secret">
        <li className="font-bold"><a>Secret</a></li>
      </Link>
    </>
  );

  return (
    <>
      <div className="navbar fixed top-0 left-0 right-0 z-[10] bg-gradient-to-r from-orange-100 to-red-200 shadow-sm text-white px-4 rounded-lg max-w-screen-xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost bg-gradient-to-r from-pink-200 to-red-400  animate-pulse lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rounded-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 text-black  rounded-box z-1 mt-3 w-52 p-2">
              {navOptions}
              {/* Mobile User Info */}
              {mobileUserInfo}
              {/* Mobile Login/Logout Button */}
              {mobileLoginButton}
            </ul>
          </div>
          <Link to="/">
            <div className="flex ml-6">
              <img className="h-10" src={logo} alt="" />
              <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent mt-1 animate-pulse">@ZubaerQ</a>
            </div>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-black">{navOptions}</ul>
        </div>
        {/* Navbar end content only for large devices */}
        <div className="navbar-end hidden lg:flex items-center gap-4">

           
      <li> <Link to="/dashboard/cart"> <button className="btn"> <FaShoppingCart></FaShoppingCart> 
      <div className="badge badge-secondary"> + {cart.length}</div>
      </button> </Link> </li>

        {user?.photoURL && (
  <img
    src={getDirectImageURL(user.photoURL)}
    alt="User"
    className="w-12  h-12  rounded-full border-2 border-orange-400"
  />
)}


          <span className="font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
            {user?.displayName}
          </span>
          {user ? (
            <button onClick={handleLogOut} className="btn btn-outline">Logout</button>
          ) : (
            <Link to="/login">
              <button className="btn">Login</button>
            </Link>
          )}
          
        </div>
      </div>
    </>
  );
};

export default NavBar;
