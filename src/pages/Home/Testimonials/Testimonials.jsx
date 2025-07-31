import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import Rating from "react-rating";
import { FaStar, FaRegStar } from "react-icons/fa"; // for star icons

const Testimonials = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    fetch("https://y-one-kohl.vercel.app/reviews")
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, []);

  return (
    <section className="pt-2 pb-12">
      <SectionTitle
        subHeading="---What Our Clients Say---"
        heading="TESTIMONIALS"
      />

      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {review.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="text-center px-10">
              <p className="mb-4"> {review.details} </p>
              <h3 className="font-bold text-lg mb-2"> {review.name} </h3>

              {/* React Rating Component */}
              <Rating
                initialRating={review.rating}
                emptySymbol={<FaRegStar className="text-yellow-400 text-xl" />}
                fullSymbol={<FaStar className="text-yellow-500 text-xl" />}
                readonly
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
