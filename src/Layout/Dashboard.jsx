import { FaAd, FaBook, FaCalendar, FaHome, FaList, FaSearch, FaShoppingCart, FaUsers, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";


const Dashboard = () => {
 
  const [isAdmin] = useAdmin();
    const [cart] = useCart();
    const {  user } = useContext(AuthContext);
      // 🔥 Convert ibb.co to direct image link
  const getDirectImageURL = (photoURL) => {
    if (!photoURL) return "";
    if (photoURL.includes("ibb.co")) {
      const path = photoURL.split("/").pop(); // get x8h38zm0
      return `https://i.ibb.co/${path}/image.png`; // modify as needed
    }
    return photoURL;
  };

    return (
        <div className="">
            {/* dashboard side bar */}
            <div className="navbar bg-base-100  rounded-lg  bg-gradient-to-r from-orange-400 to-red-600 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden ">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content  font-bold bg-base-100  rounded-box z-1 mt-3 text-white w-52 p-2 bg-gradient-to-r from-red-600 to-orange-400 shadow">

{
  isAdmin ? <>
    
    

<li>
                        <NavLink to="/dashboard/adminHome">
                     <FaHome></FaHome>
                           Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems">
                            <FaUtensils></FaUtensils>
                            Add Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                           <FaList></FaList>
                          Manage Items </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/bookings">
                            <FaBook></FaBook>
                            Manage Bookings</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaAd></FaAd>
                           My Payment History</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                    </li>
                    <div className="divider"></div>
                 

  </> : <>

  

<li>
                        <NavLink to="/dashboard/userHome">
                            <FaHome></FaHome>
                            User Home</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/reservation">
                            <FaCalendar></FaCalendar>
                            Reservation</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaAd></FaAd>
                            Payment History</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/bookings">
                            <FaList></FaList>
                            My Bookings</NavLink>
                    </li>
                   */}
              
  </>
}


<li className="">
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaCalendar></FaCalendar>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact">
                            <FaShoppingCart></FaShoppingCart>
                            Contact </NavLink>
                    </li>

                    

      </ul>
    
    </div>
    <Link to="/">    <a className="btn btn-ghost text-xl font-bold bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent mt-1 animate-pulse">@ZubaerQ</a>
    </Link>
    
    </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal bg-clip-text text-white  px-1 font-bold">
  
  
{
  isAdmin ? <>
    
    

<li>
                        <NavLink to="/dashboard/adminHome">
                     <FaHome></FaHome>
                           Admin Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/addItems">
                            <FaUtensils></FaUtensils>
                            Add Items</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/manageItems">
                           <FaList></FaList>
                          Manage Items </NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/bookings">
                            <FaBook></FaBook>
                            Manage Bookings</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/users">
                            <FaUsers></FaUsers>
                            All Users</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaAd></FaAd>
                           My Payment History</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                    </li>
                    <div className="divider"></div>
                 

  </> : <>

  


  <li>
                        <NavLink to="/dashboard/userHome">
                            <FaHome></FaHome>
                            User Home</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/reservation">
                            <FaCalendar></FaCalendar>
                            Reservation</NavLink>
                    </li> */}
                    <li>
                        <NavLink to="/dashboard/cart">
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/paymentHistory">
                            <FaAd></FaAd>
                            Payment History</NavLink>
                    </li>
                    {/* <li>
                        <NavLink to="/dashboard/bookings">
                            <FaList></FaList>
                            My Bookings</NavLink>
                    </li>
                   */}
                  
              
  </>
}


  
     <li className="">
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/order/salad">
                            <FaCalendar></FaCalendar>
                            Menu</NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard/contact">
                            <FaShoppingCart></FaShoppingCart>
                            Contact </NavLink>
                    </li>
                    
                    
                   
    </ul>
  </div>
  <div className="navbar-end">
  {user?.photoURL && (
  <img
    src={getDirectImageURL(user.photoURL)}
    alt="User"
    className="w-12  h-12  rounded-full border-2 border-orange-400"
  />
)}

  </div>
</div>
            {/* dashboard content */}

            <div className="p-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;