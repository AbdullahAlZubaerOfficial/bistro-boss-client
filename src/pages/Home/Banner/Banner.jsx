import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import img1 from "../../../assets/home/01.jpg"
import img2 from "../../../assets/home/02.jpg"
import img3 from "../../../assets/home/03.png"
import img4 from "../../../assets/home/04.jpg"
import img5 from "../../../assets/home/05.png"
import img6 from "../../../assets/home/06.png"


const Banner = () => {
    return (
        
          <div className='mt-8'>
               <Carousel>
                <div>
                    <img className='rounded-lg' src={img1} />
                </div>
                <div>
                    <img className='rounded-lg' src={img2} />
                </div>
                <div>
                    <img className='rounded-lg' src={img3} />
                </div>
                <div>
                    <img className='rounded-lg' src={img4} />
                </div>
                <div>
                    <img className='rounded-lg' src={img5} />
                </div>
                <div>
                    <img className='rounded-lg' src={img6} />
                </div>
            </Carousel>
          </div>
        
    );
};

export default Banner;