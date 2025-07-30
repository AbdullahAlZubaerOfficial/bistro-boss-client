import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { motion } from 'framer-motion';

import img1 from '../../../assets/home/slide1.jpg';
import img2 from '../../../assets/home/slide2.jpg';
import img3 from '../../../assets/home/slide3.jpg';
import img4 from '../../../assets/home/slide4.jpg';
import img5 from '../../../assets/home/slide5.jpg';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';

const Category = () => {
    const categories = [
        { img: img1, title: "Salads", description: "Fresh & Healthy" },
        { img: img2, title: "Pizzas", description: "Italian Specialties" },
        { img: img3, title: "Soups", description: "Warm Comfort" },
        { img: img4, title: "Desserts", description: "Sweet Temptations" },
        { img: img5, title: "Drinks", description: "Refreshing Choices" }
    ];

    return (
        <section className='py-6 bg-gradient-to-b '>
            <div className='container mx-auto px-4'>
                <SectionTitle 
                    subHeading={"From 11.00am to 10.00pm"} 
                    heading={"Order Online"} 
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            }
                        }}
                        modules={[Pagination, Autoplay, EffectCoverflow]}
                        className="mySwiper pb-12"
                    >
                        {categories.map((category, index) => (
                            <SwiperSlide key={index} className="max-w-xs">
                                <div className="relative group overflow-hidden rounded-2xl shadow-xl">
                                    <img 
                                        src={category.img} 
                                        alt={category.title} 
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                                        <h3 className="text-2xl font-bold text-white mb-1">{category.title}</h3>
                                        <p className="text-orange-300 font-medium">{category.description}</p>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-full text-sm font-semibold self-start hover:bg-orange-600 transition-colors"
                                        >
                                            Order Now
                                        </motion.button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default Category;