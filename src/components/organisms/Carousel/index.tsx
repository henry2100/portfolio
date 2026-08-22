import { useState, useEffect } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselData {
    containerStyle?: string;
    mainSectionStyle?: string;
    carouselBtnStyle?: string;
    images: string[];
    autoSlide?: boolean;
    autoSlideInterval?: number;
    leftBtn?: string;
    rightBtn?: string;
}

const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
        scale: 0.95,
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1,
        scale: 1,
    },
    exit: (direction: number) => ({
        zIndex: 0,
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        scale: 0.95,
    }),
};

const Carousel = ({
    containerStyle,
    mainSectionStyle,
    images,
    carouselBtnStyle,
    autoSlide = true,
    autoSlideInterval = 3000,
    leftBtn,
    rightBtn
}: CarouselData) => {
    const [[currentIndex, direction], setSlide] = useState([0, 0]);

    useEffect(() => {
        if (autoSlide) {
            const slideInterval = setInterval(() => {
                setSlide(([prev]) => [(prev + 1) % images.length, 1]);
            }, autoSlideInterval);
            return () => clearInterval(slideInterval);
        }
    }, [autoSlide, autoSlideInterval, images.length]);

    const nextSlide = () => {
        setSlide(([prev]) => [(prev + 1) % images.length, 1]);
    };

    const prevSlide = () => {
        setSlide(([prev]) => [(prev - 1 + images.length) % images.length, -1]);
    };

    const goToSlide = (index: number) => {
        setSlide(([prev]) => [index, index > prev ? 1 : -1]);
    };

    return (
        <div className={`${containerStyle} relative overflow-visible w-full mx-auto !m-0`}>
            <div className={`${mainSectionStyle} relative overflow-hidden`}>
                <AnimatePresence initial={false} custom={direction}>
                    <motion.img
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.3 },
                            scale: { duration: 0.3 },
                        }}
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${carouselBtnStyle} ${leftBtn} absolute top-1/2 -left-20 mobile:left-2 tablet:left-5 transform -translate-y-1/2 bg-BackDrop_l_sm group-hover:bg-Primary_Accents_xl tablet:bg-Primary_Accents_md rounded-full text-white p-2 w-10 h-10 flex justify-center items-center transition-colors z-10`}
                onClick={prevSlide}
            >
                <IoIosArrowBack />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className={`${carouselBtnStyle} ${rightBtn} absolute top-1/2 -right-20 mobile:right-2 tablet:right-5 transform -translate-y-1/2 bg-BackDrop_l_sm group-hover:bg-Primary_Accents_xl tablet:bg-Primary_Accents_md rounded-full text-white p-2 w-10 h-10 flex justify-center items-center transition-colors z-10`}
                onClick={nextSlide}
            >
                <IoIosArrowForward />
            </motion.button>
            <div className="absolute bottom-[-2.5rem] mobile:bottom-[-2rem] left-0 right-0 flex justify-center mb-4 mobile:mb-2 gap-1 px-4">
                {images.map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            width: currentIndex === i ? 32 : 16,
                            backgroundColor: currentIndex === i ? "#6366f1" : "rgba(255,255,255,0.3)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="h-1 cursor-pointer rounded-2xl"
                        onClick={() => goToSlide(i)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;