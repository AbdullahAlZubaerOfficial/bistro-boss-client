import React from 'react';
import { Parallax } from 'react-parallax';
import { Link } from 'react-router-dom';

const Cover = ({ img, title }) => {
  return (
    <Parallax
      blur={{ min: -15, max: 15 }}
      bgImage={img}
      className="h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-xl"
      bgImageAlt="cover image"
      strength={-200}
    >
      <div className="hero min-h-[400px] md:min-h-[500px] lg:min-h-[600px]">
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-neutral-content text-center px-4">
          <div className="max-w-md">
            <h1 className="mb-6 text-3xl md:text-5xl font-bold">{title}</h1>
            <Link to="/order/salad">
              <button className="btn btn-neutral text-white border-b-gray-100 btn-outline">
                Order Your Food 🍽️
              </button>
            </Link>
          </div>
        </div>
      </div>
    </Parallax>
  );
};

export default Cover;
