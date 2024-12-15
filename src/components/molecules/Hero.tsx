import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import TopNav from 'components/organisms/Navigation';
import bgImg from '../../assets/images/stock_images/stock_image_2.jpg';
import { FaCaretRight } from 'react-icons/fa6';
import SocialLinks from 'components/organisms/Footer/SocialLinks';
import MobileNav from 'components/organisms/Navigation/MobileNav';

const Hero = () => {

    return (
        <div className='relative min-h-screen'>
            <SocialLinks
                containerStyle="bg-DarkBg3 !px-40"
                style='!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex !justify-between w-full'
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
            <div className='flex flex-col justify-center items-center gap-10 relative z-[18] pt-12 desktop:px-32 px-20 mobile:px-5'>
                <div id="end"></div>
                <div className='w-full max-w-6xl flex mobile:flex-col justify-between items-center mobile:gap-12 mobile:py-8'>
                    <div className='w-2/5 mobile:w-full h-[70vh] mobile:h-[30vh]'>
                        <img src={bgImg} alt='bg-img' className='w-full h-full object-cover object-center object-fit' />
                    </div>

                    <div className='w-3/5 mobile:w-full flex flex-col justify-center items-end gap-8 mobile:gap-12'>
                        <span className='mobile:w-full flex flex-col items-end justify-start mobile:items-center mobile:justify-center mobile:gap-1'>
                            <p className='font-[800] text-4xl mobile:text-xl text-Primary'>Henry Ebose Adedugba</p>
                            <p className='font-normal text-base mobile:text-base text-Secondary'>Frontend Developer | UI Enthusiast</p>
                            <span className='border-b border-Primary min-w-[200px] w-1/5 mt-1'></span>
                        </span>

                        <span className='mobile:max-w-full max-w-[500px] w-full flex flex-col justify-center items-end mobile:items-center mobile:justify-center gap-3  mobile:gap-8'>
                            <p className='font-light text-xl mobile:text-base text-DarkBg3 w-full text-right mobile:text-center'>
                                I'm a frontend developer with a passion for building intuitive, responsive, and visually appealing user interfaces. With over three years...
                            </p>
                            <ScrollLink
                                to={'About Me'}
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={1500}
                                className={`cursor-pointer flex justify-center items-center group border bg-Primary text-white border-Primary hover:bg-NoColor hover:text-Primary overflow-hidden px-4 py-1 rounded-md transition ease-in-out duration-250`}
                            >
                                More <FaCaretRight className='w-4 h-4 text-white group-hover:text-Primary group-hover:animate-left_right_slider transition ease-in-out duration-250' />
                            </ScrollLink>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero;