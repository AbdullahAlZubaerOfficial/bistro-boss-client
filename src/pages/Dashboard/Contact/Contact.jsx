import React from 'react';
import { motion } from "framer-motion";
import myPhoto from '../../../assets/others/myPhoto.jpg'

const Contact = () => {
    return (
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
    );
};

export default Contact;