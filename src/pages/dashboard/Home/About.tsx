import React from 'react';
import profileImg from '../../../assets/images/profile-5.jpg';

const About = () => {
    return (
        <div id='About Me' className='group w-full min-h-screen text-center flex justify-center items-center py-32'>
            <div className='max-w-6xl flex flex-col justify-center items-center gap-10'>
                <div className='flex justify-center items-center gap-5'>
                    <div className='w-2/5 h-[30vh] flex justify-center items-center border border-dashed'>
                        <span className='w-[250px] h-[250px] overflow-hidden transition ease-in-out duration-750'>
                            <img src={profileImg} alt='profileImg_placeholder' className='w-full h-full object-cover object-center rounded-md'/>
                        </span>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-4 w-full'>
                        <span className='flex flex-col justify-center items-center max-w-[600px] w-full uppercase'>
                            <p className='font-bold text-4xl mobile:text-xl text-white'>About Me</p>
                            <span className='border-b group-hover:border-white min-w-[150px] w-1/5 mt-1 transition ease-in-out duration-750'></span>
                        </span>

                        <p className='font-light text-xl mobile:text-base leading-8 text-Background5 w-full mobile:w-4/5 text-justify'>
                            I'm a frontend developer with a passion for building intuitive, responsive, and visually appealing user interfaces. With over three years of professional experience, I've become proficient in technologies like <b className='group-hover:text-white group-hover:font-bold font-semibold transition ease-in-out duration-750'>HTML, CSS, Tailwind CSS, JavaScript, React, and Next.js,</b> creating scalable and dynamic web applications. I'm committed to continuous learning and always eager to tackle new challenges to deliver high-quality solutions that enhance user experience and align with business goals.
                        </p>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center gap-10'>
                    <p className='font-light text-xl mobile:text-base leading-8 text-Background5 w-full mobile:w-4/5 text-justify'>
                        Excepteur id voluptate eu commodo exercitation. Cupidatat veniam eiusmod ut nulla in exercitation magna Lorem. Esse irure aliquip quis Lorem nulla cillum magna amet. Ad labore duis pariatur amet et laborum nulla exercitation commodo est.
                    </p>
                    <p className='font-light text-xl mobile:text-base leading-8 text-Background5 w-full mobile:w-4/5 text-justify'>
                        Eu proident elit duis non et est est irure aliquip occaecat fugiat duis tempor. Proident velit labore ea elit ad commodo sit reprehenderit veniam aliquip ex consectetur eiusmod. Aliqua cillum consequat exercitation adipisicing commodo excepteur laborum elit nostrud sint nostrud. Laboris duis id consequat officia ex incididunt. Labore cupidatat amet nulla minim. Commodo nulla ullamco consectetur duis eiusmod exercitation anim.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;