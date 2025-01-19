import React, { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

interface CarouselData {
    containerStyle?: String,
    mainSectionStyle?: String,
    carouselBtnStyle?: String,
    images: any[],
    autoSlide?: boolean,
    autoSlideInterval?: any,
    leftBtn?: string,
    rightBtn?: string
}

const Carousel = ({ containerStyle, mainSectionStyle, images, carouselBtnStyle, autoSlide = true, autoSlideInterval = 3000, leftBtn, rightBtn }: CarouselData) => {
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
                className={`${carouselBtnStyle} ${leftBtn} absolute top-1/2 -left-20 tablet:left-5 transform -translate-y-1/2 bg-BackDrop_l_sm group-hover:bg-Primary_Accents_xl tablet:bg-Primary_Accents_md rounded-full text-white p-2 w-10 h-10 flex justify-center items-center`}
                onClick={prevSlide}
            >
                <IoIosArrowBack />
            </button>
            <button
                className={`${carouselBtnStyle} ${rightBtn} absolute top-1/2 -right-20 tablet:right-5 transform -translate-y-1/2 bg-BackDrop_l_sm group-hover:bg-Primary_Accents_xl tablet:bg-Primary_Accents_md rounded-full text-white p-2 w-10 h-10 flex justify-center items-center`}
                onClick={nextSlide}
            >
                <IoIosArrowForward />
            </button>
            <div className="absolute -bottom-10 left-0 right-0 flex justify-center mb-4 gap-1">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${currentIndex === i ? "w-8 bg-Primary" : "w-4 bg-BackDrop_l_sm group-hover:bg-Primary_Accents_xl tablet:bg-Primary_Accents_md"
                            }`}
                        onClick={() => setCurrentIndex(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;