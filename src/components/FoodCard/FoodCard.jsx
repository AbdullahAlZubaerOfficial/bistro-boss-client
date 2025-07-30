import { motion } from "framer-motion";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import useAxiosSecure from "../../hooks/useAxios";

const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();

    const handleAddToCart = () => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            };
            
            axiosSecure.post('/carts', cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500,
                            background: "#1f2937",
                            color: "#fff",
                            iconColor: "#f97316"
                        });
                        refetch();
                    }
                })
                .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: err.message,
                    });
                });
        } else {
            Swal.fire({
                title: "Login Required",
                text: "Please login to add items to your cart",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#f97316",
                cancelButtonColor: "#6b7280",
                confirmButtonText: "Go to Login",
                background: "#1f2937",
                color: "#fff",
                iconColor: "#f97316"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } });
                }
            });
        }
    };

    return (
        <motion.div 
            className="card w-full bg-base-100 shadow-xl overflow-hidden rounded-2xl hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <figure className="relative h-60 overflow-hidden">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                    loading="lazy"
                />
                <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-3 py-1 rounded-full shadow-lg">
                    ${price}
                </div>
            </figure>
            
            <div className="card-body p-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="flex flex-col items-center text-center">
                    <h2 className="card-title text-2xl font-bold text-gray-800 mb-2">{name}</h2>
                    <p className="text-gray-600 mb-6 line-clamp-3">{recipe}</p>
                    
                    <motion.button
                        onClick={handleAddToCart}
                        className="btn w-full max-w-xs bg-gradient-to-r from-orange-500 to-red-500 text-white border-none hover:from-orange-600 hover:to-red-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        Add to Cart
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default FoodCard;