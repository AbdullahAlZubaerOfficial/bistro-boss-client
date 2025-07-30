import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import logo from '../../../assets/logo.png';
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import { motion } from "framer-motion";

const NavBar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [cart] = useCart();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  const getDirectImageURL = (photoURL) => {
    if (!photoURL) return "";
    if (photoURL.includes("ibb.co")) {
      const path = photoURL.split("/").pop();
      return `https://i.ibb.co/${path}/image.png`;
    }
    return photoURL;
  };

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  // Nav items data
  const navItems = [
    { path: "/", name: "Home" },
    { path: "/menu", name: "Menu" },
    { path: "/order/salad", name: "Order" },
    { path: "/secret", name: "Secret" },
    { path: "/adminlogin", name: "Admin Login" },
    { path: "/dashboard/adminHome", name: "Dashboard" }
  ];

  // Nav options component
  const NavOptions = ({ isMobile = false }) => (
    <motion.ul 
      className={`menu ${isMobile ? 'menu-sm' : 'menu-horizontal'} px-1`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {navItems.map((item, index) => (
        <motion.li key={index} variants={itemVariants}>
          <Link to={item.path} className="font-bold hover:text-orange-500 transition-colors">
            {item.name}
          </Link>
        </motion.li>
      ))}
    </motion.ul>
  );

  // User profile component (for desktop)
  const UserProfile = () => (
    <div className="flex items-center gap-4">
      <Link to="/dashboard/cart" className="relative">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="btn btn-ghost btn-circle"
        >
          <FaShoppingCart className="text-xl" />
          {cart.length > 0 && (
            <span className="absolute -top-2 -right-2 badge badge-secondary badge-sm">
              {cart.length}
            </span>
          )}
        </motion.button>
      </Link>

      {user?.photoURL && (
        <motion.img
          whileHover={{ scale: 1.1 }}
          src={getDirectImageURL(user.photoURL)}
          alt="User"
          className="rounded-full border-2 border-orange-400 w-12 h-12"
        />
      )}

      {user?.displayName && (
        <span className="font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
          {user.displayName}
        </span>
      )}

      <motion.div whileHover={{ scale: 1.05 }}>
        {user ? (
          <button 
            onClick={handleLogOut} 
            className="btn btn-outline btn-sm md:btn-md"
          >
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm md:btn-md">
              Login
            </button>
          </Link>
        )}
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      className={`navbar fixed top-0 left-0 right-0 z-50 shadow-lg transition-colors duration-300 ${
        scrolled 
          ? 'bg-gradient-to-r from-orange-200 to-red-300' 
          : 'bg-gradient-to-r from-orange-100 to-red-200'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Mobile menu */}
        <div className="navbar-start">
          <div className="dropdown">
            <motion.div 
              tabIndex={0} 
              role="button" 
              className="btn btn-ghost lg:hidden bg-gradient-to-r from-pink-200 to-red-400"
              whileHover={{ scale: 1.05 }}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </motion.div>
            <ul 
              tabIndex={0} 
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <NavOptions isMobile />
              <div className="divider"></div>
              <div className="flex flex-col gap-4 p-2">
                <Link to="/dashboard/cart" className="relative">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-ghost btn-circle"
                  >
                    <FaShoppingCart className="text-xl" />
                    {cart.length > 0 && (
                      <span className="absolute -top-2 -right-2 badge badge-secondary badge-sm">
                        {cart.length}
                      </span>
                    )}
                  </motion.button>
                  <span className="ml-2">Cart</span>
                </Link>
                
                {user ? (
                  <>
                    {user?.photoURL && (
                      <div className="flex items-center gap-2">
                        <motion.img
                          whileHover={{ scale: 1.1 }}
                          src={getDirectImageURL(user.photoURL)}
                          alt="User"
                          className="rounded-full border-2 border-orange-400 w-10 h-10"
                        />
                        <span className="font-bold bg-gradient-to-r from-orange-400 to-red-600 bg-clip-text text-transparent">
                          {user.displayName}
                        </span>
                      </div>
                    )}
                    <button 
                      onClick={handleLogOut} 
                      className="btn btn-outline btn-sm w-full"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/login">
                    <button className="btn btn-primary btn-sm w-full">
                      Login
                    </button>
                  </Link>
                )}
              </div>
            </ul>
          </div>
          
          {/* Logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <img className="h-10" src={logo} alt="Logo" />
              <span className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-400 bg-clip-text text-transparent">
                @ZubaerQ
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <NavOptions />
        </div>

        {/* Desktop user section */}
        <div className="navbar-end hidden lg:flex">
          <UserProfile />
        </div>
      </div>
    </motion.div>
  );
};

export default NavBar;