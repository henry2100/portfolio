import React from 'react';
import Carousel from 'components/organisms/Carousel';
import { CarouselData } from '../../../mockData/carouselData';

const Projects = () => {
    return (
        <div id='Projects' className='w-full h-fit min-h-screen flex justify-center items-center'>
            <div className='max-w-6xl w-full flex flex-col gap-5'>
                <span className='font-bold text-5xl mobile:text-2xl text-Primary uppercase'>
                    Projects
                </span>

                <Carousel
                    containerStyle='!h-[70vh] !min-h-[60vh]'
                    mainSectionStyle='!h-full rounded-lg overflow-hidden'
                    images={CarouselData}
                />
            </div>
        </div>
    )
}

export default Projects;