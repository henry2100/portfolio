import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import TopNav from 'components/organisms/Navigation';
import bgImg from '../../assets/images/stock_images/stock_image_2.jpg';
import bgImg2 from '../../assets/images/stock_img_2.jpg';
import { FaCaretRight } from 'react-icons/fa6';
import SocialLinks from 'components/organisms/Footer/SocialLinks';
import MobileNav from 'components/organisms/Navigation/MobileNav';

const Hero = () => {

    return (
        <div className='relative min-h-screen'>
            <SocialLinks
                containerStyle="bg-DarkBg3 !px-40"
                style='!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex mobile:!flex-row !justify-between mobile:!justify-center w-full'
                iconStyle='!w-4 !h-4'
                social
                contact
                contactStyle='mobile:!hidden'
            // policies
            />
            <TopNav
                style='tablet:!hidden absolute z-20 bg-DarkBg10 py-5 !shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'
            />
            <MobileNav
                style='tablet:!flex absolute z-20 bg-DarkBg10 py-5 px-20 !shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]'
            />
            <div className='flex flex-col justify-center items-center gap-10 w-full h-fit min-h-screen relative z-[18] pt-12 desktop:px-32 px-20 mobile:px-5'>
                <div id="end"></div>

                <div className='absolute w-full h-screen bottom-0'>
                    <img src={bgImg2} alt='bg-img' className='w-full h-full object-cover object-right object-fit' />
                </div>

                <div className='relative mobile:-top-32 w-full max-w-6xl flex justify-start items-center mobile:gap-12'>
                    <div className='w-fit mobile:w-full flex flex-col justify-start items-start gap-8 mobile:gap-12'>
                        <span className='mobile:w-full max-w-6xl w-full flex flex-col items-start justify-start mobile:items-center mobile:justify-center mobile:gap-1'>
                            <p className='font-[800] text-6xl mobile:text-3xl text-Primary'>Henry Ebose Adedugba</p>
                            <p className='font-normal text-base mobile:text-base text-Secondary'>Frontend Developer | UI Enthusiast</p>
                            <span className='border-b border-Primary min-w-[200px] w-1/5 mt-1'></span>
                        </span>

                        <span className='mobile:max-w-full max-w-[500px] w-full flex flex-col justify-center items-left mobile:items-center mobile:justify-center gap-6 mobile:gap-8 p-4 rounded-md backdrop-blur-md bg-Primary_Accents_2xs hover:bg-Primary_Accents_xs'>
                            <p className='font-light text-2xl mobile:text-lg text-Background w-full text-left mobile:text-center'>
                                <b className='text-Primary font-semibold'>Henry Ebose Adedugba</b> is a skilled Frontend Developer with over three years of experience building responsive, user-centric web applications using React, TypeScript, and Next.js. Passionate about intuitive design and scalability, he has contributed to fintech innovations at Centric Gateway, delivering impactful solutions that enhance user experience and streamline business operations.
                            </p>

                            <div className='group flex'>
                                <ScrollLink
                                    to={'About Me'}
                                    spy={true}
                                    smooth={true}
                                    offset={0}
                                    duration={1500}
                                    className={`cursor-pointer flex justify-center items-center group border bg-Primary text-white border-Primary hover:bg-NoColor hover:text-Primary overflow-hidden px-4 py-1 rounded-full transition ease-in-out duration-500`}
                                >
                                    More About Henry <FaCaretRight className='w-4 h-4 text-white group-hover:text-Primary group-hover:animate-left_right_slider transition ease-in-out duration-500' />
                                </ScrollLink>
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;