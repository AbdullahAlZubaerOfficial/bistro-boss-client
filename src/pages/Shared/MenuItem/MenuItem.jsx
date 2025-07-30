import { motion } from "framer-motion";

const MenuItem = ({ item }) => {
  const { name, image, price, recipe } = item;

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)"
      }}
    >
      {/* Image with elegant frame */}
      <motion.div 
        className="relative min-w-[140px] h-[140px] self-center sm:self-auto"
        whileHover={{ 
          rotate: 1,
          transition: { duration: 0.3 }
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-amber-200 rounded-2xl transform rotate-1 -z-10"></div>
        <img
          className="w-full h-full object-cover rounded-xl"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)',
            border: '2px solid rgba(251, 146, 60, 0.3)'
          }}
          src={image}
          alt={name}
          loading="lazy"
        />
        <motion.div 
          className="absolute -bottom-3 -right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-lg"
          whileHover={{ scale: 1.1 }}
        >
          ${price.toFixed(2)}
        </motion.div>
      </motion.div>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <motion.h3 
            className="text-2xl font-bold text-gray-800 capitalize tracking-tight"
            whileHover={{ color: "#f97316" }}
          >
            {name}
          </motion.h3>
          
          <div className="hidden sm:flex items-center flex-1 px-4">
            <div className="border-t border-dashed border-gray-300 flex-1"></div>
          </div>
          
          <p className="sm:hidden text-orange-500 font-bold text-xl">${price.toFixed(2)}</p>
        </div>
        
        <motion.p 
          className="text-gray-900 leading-relaxed mb-6 text-justify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {recipe}
        </motion.p>
        
        <div className="mt-auto flex justify-end">
          {/* <motion.button
            className="px-6 py-2.5 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 5px 15px rgba(249, 115, 22, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add to Order
          </motion.button> */}
        </div>
      </div>
    </motion.div>
  );
};

export default MenuItem;