import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [isAdmin] = useAdmin();
  const [cart] = useCart();
  const { user } = useContext(AuthContext);

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

  // Admin menu items
  const adminMenuItems = [
    { path: "/dashboard/adminHome", icon: <FaHome />, label: "Admin Home" },
    { path: "/dashboard/addItems", icon: <FaUtensils />, label: "Add Items" },
    { path: "/dashboard/manageItems", icon: <FaList />, label: "Manage Items" },
    { path: "/dashboard/users", icon: <FaUsers />, label: "All Users" },
    { path: "/dashboard/paymentHistory", icon: <FaAd />, label: "Payment History" },
    { path: "/dashboard/cart", icon: <FaShoppingCart />, label: `My Cart (${cart.length})` }
  ];

  // User menu items
  const userMenuItems = [
    { path: "/dashboard/userHome", icon: <FaHome />, label: "User Home" },
    { path: "/dashboard/cart", icon: <FaShoppingCart />, label: `My Cart (${cart.length})` },
    { path: "/dashboard/paymentHistory", icon: <FaAd />, label: "Payment History" }
  ];

  // Common menu items
  const commonMenuItems = [
    { path: "/", icon: <FaHome />, label: "Home" },
    { path: "/order/salad", icon: <FaCalendar />, label: "Menu" },
    { path: "/dashboard/contact", icon: <FaShoppingCart />, label: "Contact" }
  ];

  const MenuItem = ({ to, icon, label }) => (
    <motion.li variants={itemVariants}>
      <NavLink 
        to={to} 
        className={({ isActive }) => 
          `flex items-center gap-2 px-4 py-3 rounded-lg transition-colors ${
            isActive ? 'bg-orange-500 text-white' : 'hover:bg-orange-100 hover:text-orange-600'
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        {label}
      </NavLink>
    </motion.li>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Navbar */}
      <motion.div 
        className="navbar bg-gradient-to-r from-orange-500 to-red-600 shadow-lg sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <motion.div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden text-white"
              whileHover={{ scale: 1.05 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.div>
            <motion.ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-64"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isAdmin 
                ? adminMenuItems.map((item, index) => (
                    <MenuItem key={index} to={item.path} icon={item.icon} label={item.label} />
                  ))
                : userMenuItems.map((item, index) => (
                    <MenuItem key={index} to={item.path} icon={item.icon} label={item.label} />
                  ))
              }
              <div className="divider my-1"></div>
              {commonMenuItems.map((item, index) => (
                <MenuItem key={index} to={item.path} icon={item.icon} label={item.label} />
              ))}
            </motion.ul>
          </div>

          {/* Brand logo */}
          <Link to="/">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
                @ZubaerQ
              </span>
            </motion.div>
          </Link>
        </div>

        {/* Desktop menu */}
        <div className="navbar-center hidden lg:flex">
          <motion.ul 
            className="menu menu-horizontal px-1 text-white"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {isAdmin 
              ? adminMenuItems.map((item, index) => (
                  <MenuItem key={index} to={item.path} icon={item.icon} label={item.label} />
                ))
              : userMenuItems.map((item, index) => (
                  <MenuItem key={index} to={item.path} icon={item.icon} label={item.label} />
                ))
            }
          </motion.ul>
        </div>

        {/* User profile */}
        <div className="navbar-end">
          {user?.photoURL && (
            <motion.div whileHover={{ scale: 1.1 }}>
              <img
                src={getDirectImageURL(user.photoURL)}
                alt="User"
                className="w-10 h-10 rounded-full border-2 border-white shadow-md"
              />
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Dashboard content */}
      <div className="p-6 max-w-7xl mx-auto">
        <Outlet />
      </div>

      {/* Desktop common menu (fixed at bottom) */}
      <motion.div 
        className="fixed bottom-12  right-44 transform -translate-x-1/2 hidden lg:block"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="bg-pink-100 shadow-xl rounded-full px-6 py-3 flex gap-6">
          {commonMenuItems.map((item, index) => (
            <NavLink 
              key={index}
              to={item.path} 
              className={({ isActive }) => 
                `flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;