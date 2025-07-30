import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="pt-12 bg-gradient-to-b">
     

      <motion.footer 
        className="footer footer-center px-10 py-6 bg-gray-800 text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <aside>
          <p className="text-center">
            Copyright © {currentYear} - All rights reserved by 
            <span className="text-orange-400 font-semibold"> AbdullahALZubaerOfficial</span>
          </p>
          <p className="mt-2 text-sm text-gray-400">
            Made with ❤️ in Bangladesh
          </p>
        </aside>
      </motion.footer>
    </div>
  );
};

export default Footer;