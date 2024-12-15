import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselData {
    containerStyle?: String,
    mainSectionStyle?: String,
    carouselBtnStyle?: String,
    images: any[],
    autoSlide?: boolean,
    autoSlideInterval?: any
}

const Carousel = ({ containerStyle, mainSectionStyle, images, carouselBtnStyle, autoSlide = true, autoSlideInterval = 3000 }: CarouselData) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, images.length]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={`${containerStyle} relative overflow-visible w-full mx-auto`}>
            <div className={`${mainSectionStyle} relative h-64`}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-transform transform ${index === currentIndex ? 'translate-x-0' : 'translate-x-full'
                            }`}
                    >
                        <img src={image} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                    </div>
                ))}
            </div>
            <button
                className={`${carouselBtnStyle} absolute top-1/2 -left-20 transform -translate-y-1/2 bg-BackDrop_l_md hover:bg-BackDrop_l_xl rounded-full text-white p-2 w-10 h-10 flex justify-center items-center`}
                onClick={prevSlide}
            >
                <IoIosArrowBack />
            </button>
            <button
                className={`${carouselBtnStyle} absolute top-1/2 -right-20 transform -translate-y-1/2 bg-BackDrop_l_md hover:bg-BackDrop_l_xl rounded-full text-white p-2 w-10 h-10 flex justify-center items-center`}
                onClick={nextSlide}
            >
                <IoIosArrowForward />
            </button>
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center mb-4 gap-1">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${currentIndex === i ? "w-8 bg-Primary" : "w-4 bg-BackDrop_l_md hover:bg-BackDrop_l_xl"
                            }`}
                        onClick={() => setCurrentIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;










{/* <div className="absolute -bottom-24 left-0 right-0 flex justify-center items-center mb-4 gap-1">
        {images.map((_, i) => (
            <div
                key={i}
                className={`block cursor-pointer rounded-2xl transition-all content-[''] border-2 overflow-hidden ${currentIndex === i ? "w-[75px] h-[50px] border-Primary" : "w-[40px] h-[30px] border-BackDrop_l_md hover:border-BackDrop_l_xl"
                    }`}
                onClick={() => setCurrentIndex(i)}
            >
                <img src={_} alt='images' className='w-full h-full'/>
            </div>
        ))}
    </div> */}