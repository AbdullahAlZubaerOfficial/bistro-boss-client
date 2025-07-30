import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import img1 from "../../../assets/home/01.jpg";
import img2 from "../../../assets/home/02.jpg";
import img3 from "../../../assets/home/03.png";
import img4 from "../../../assets/home/04.jpg";
import img5 from "../../../assets/home/05.png";
import img6 from "../../../assets/home/06.png";

const Banner = () => {
    const images = [
        // { src: img1, alt: "Image 1" },
        { src: img2, alt: "Image 2" },
        { src: img3, alt: "Image 3" },
        { src: img4, alt: "Image 4" },
        { src: img5, alt: "Image 5" },
        { src: img6, alt: "Image 6" }
    ];

    return (
        <div className='mt-16'>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                interval={3000}
                showThumbs={false}
                showStatus={false}
                stopOnHover={false}
                dynamicHeight={false}
                emulateTouch={true}
                swipeable={true}
                transitionTime={500}
                className="rounded-xl overflow-hidden shadow-xl"
            >
                {images.map((image, index) => (
                    <div key={index} className="h-full">
                        <img 
                            src={image.src} 
                            alt={image.alt}
                            className="w-full h-full object-cover rounded-lg"
                            loading={index < 2 ? "eager" : "lazy"} // Load first 2 images immediately
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default React.memo(Banner);