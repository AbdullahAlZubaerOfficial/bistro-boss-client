import React from 'react';
import { motion } from 'framer-motion';
import myPhoto from '../../../assets/others/myPhoto.jpg'


// Image import
import admin1 from '../../../assets/others/admin1.png';
import admin2 from '../../../assets/others/admin2.png';
import admin3 from '../../../assets/others/admin3.png';
import admin4 from '../../../assets/others/admin4.png';

const images = [admin1, admin2, admin3, admin4];

const Secret = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-4">
      
      {/* Title without animation so it always stays */}
      <h1 className="text-4xl md:text-6xl font-bold mb-10 mt-16 text-center">
        Welcome admin home facilities. ✨
      </h1>

      {/* Animated image grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {images.map((src, i) => (
          <motion.div
            key={i}
            className="rounded-2xl overflow-hidden shadow-lg transform hover:rotate-3 hover:scale-105 transition-transform duration-500"
            whileHover={{ rotateY: 15, scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 100 }}
          >
            <img
              src={src}
              alt={`Website Screenshot ${i + 1}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Description and contact link */}
      <motion.p
        className="mt-10 text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {/* Can add short animated message here if needed */}
      </motion.p>

      <div className="text-center mt-4 mb-8">
        <p>Explore the stunning design and features of our site 🔥💻</p>
        <br />
        If you want to access the admin panel then:
        <br />
        <a
          href="https://www.linkedin.com/in/abdullah-al-zubaer-309065292/"
          className="inline-block bg-blue-500 text-white px-6 py-2 mt-4 rounded-full shadow hover:bg-blue-600 transition-all"
        >
          Contact Me 📧
        </a>
      </div>
         <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 p-6 md:p-12 flex items-center justify-center">
              <motion.div
                className="max-w-4xl w-full bg-white shadow-2xl rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center gap-10"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                {/* Profile Image */}
                <motion.img
                  src={myPhoto}
                  alt="Profile"
                  className="w-40 h-40 rounded-full object-cover shadow-lg"
                  whileHover={{ scale: 1.05 }}
                />
        
                {/* Text Content */}
                <div className="text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">Abdullah Al Zubaer</h2>
                  <p className="text-gray-600 text-lg mb-4">
                    MERN Stack Developer | Digital Marketer | Mentor 💻🚀
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    I'm a passionate web developer with over 1 year of experience in building dynamic and responsive websites. I specialize in React.js, Tailwind CSS, Firebase, MongoDB and more. I love transforming ideas into real-world solutions and helping others grow along the way 🤝.
                  </p>
                  <div className="mt-4">
                    <a
                      href="https://www.linkedin.com/in/abdullah-al-zubaer-309065292/"
                      className="inline-block bg-blue-500 text-white px-6 py-2 rounded-full shadow hover:bg-blue-600 transition-all"
                    >
                      Contact Me 📧
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
    </div>
  );
};

export default Secret;
