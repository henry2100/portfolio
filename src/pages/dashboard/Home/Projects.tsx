import React from 'react';
import Carousel from 'components/organisms/Carousel';
import { CarouselData } from '../../../mockData/carouselData';
import { projectsData } from '../../../mockData/projectsData';
import DirComp from 'components/atoms/DirComp/DirComp';

const Projects = () => {
    return (
        <div className='max-w-6xl w-full flex flex-col gap-5 mobile:!p-5 tablet:p-8'>
            <span className='text-left font-bold text-5xl mobile:text-2xl text-Secondary tablet:text-Primary group-hover:text-Primary uppercase'>
                Projects
            </span>

            <div className='w-full grid grid-cols-2 gap-10'>
                {projectsData?.map((item, i) => (
                    <>
                        {/* <DirComp
                            key={i}
                            {...item}
                            titleStyle='mobile:!text-lg'
                            overlayDescriptionLayout='hidden'
                        >
                            <Carousel
                                containerStyle='!h-[40vh] !min-h-[30vh] px-5 py-8 !p-0 !m-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] !shadow-[0_35px_60px_-15px_Primary_Accents_lg] !border-[.5px] rounded-lg cursor-pointer'
                                mainSectionStyle='!h-full rounded-lg overflow-hidden'
                                images={item.projectImgs}
                                leftBtn='!left-7'
                                rightBtn='!right-7'
                            />
                        </DirComp> */}

                        <Carousel
                            containerStyle='!h-[40vh] !min-h-[30vh] px-5 py-8 !p-0 !m-3 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] !shadow-[0_35px_60px_-15px_Primary_Accents_lg] !border-[0px] rounded-lg cursor-pointer'
                            mainSectionStyle='!h-full rounded-lg overflow-hidden'
                            images={item.projectImgs}
                            leftBtn='!left-7'
                            rightBtn='!right-7'
                            carouselBtnStyle='!hidden'
                        />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Projects;