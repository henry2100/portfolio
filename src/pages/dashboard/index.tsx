import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from 'components/organisms/Navigation';
import Footer from 'components/organisms/Footer';
import Hero from 'components/molecules/Hero';
import { HideBetween } from 'react-hide-on-scroll';
import MobileNav from 'components/organisms/Navigation/MobileNav';
import { FaCaretUp, FaCaretDown } from "react-icons/fa";
import useNavData from 'components/molecules/navData';

const Dashboard = () => {
    const { navItems } = useNavData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [endOfPage, setEndOfPage] = useState(false);

    const sectionList = navItems.map(item => item.navItem);

    const handleScroll = (action?: string) => {
        let nextIndex: React.SetStateAction<number>;

        if (action === 'prev') {
            nextIndex = currentIndex === 0 ? sectionList.length - 1 : currentIndex - 1;
        } else {
            nextIndex = (currentIndex + 1) % sectionList.length;
        }

        const nextSectionId = sectionList[nextIndex];
        const nextSectionElement = document.getElementById(nextSectionId);

        if (nextSectionElement) {
            nextSectionElement.scrollIntoView({ behavior: 'smooth' });
            setCurrentIndex(nextIndex);
        }

        // Check if it's the end of the page
        setEndOfPage(nextIndex === sectionList.length - 1);
    };

    const nextSectionName = sectionList[(currentIndex + 1) % sectionList.length] || 'Home';
    const prevSectionName = sectionList[currentIndex === 0 ? sectionList.length - 1 : currentIndex - 1];

    return (
        <div
            className="min-h-screen w-full relative z-[22] flex flex-col justify-between"
            id="Home"
        >
            <div id="top"></div>
            <div className="relative w-full h-full">
                {/* Navigation */}
                <HideBetween div startDivID="top" endDivID="end">
                    <TopNav style={'backdrop-blur-md !bg-BackDrop_d_sm hover:!bg-BackDrop_d_xl tablet:hidden fixed z-[25] top-5 left-0 right-0 mx-auto rounded-full py-5 !px-8 bg-white animate-fade_in transition ease-in-out duration-500 max-w-6xl w-full'} />
                    <MobileNav style={'tablet:!flex fixed z-[25] top-0 w-full bg-DarkBg10 py-5'} />
                </HideBetween>

                {/* Hero Section */}
                <Hero />

                {/* Main Content */}
                <main className="w-full h-fit flex flex-col">
                    <Outlet />
                </main>

                {/* Floating Button for Next Section */}
                <div
                    onClick={() => handleScroll()}
                    className={`${endOfPage && '!animate-bounce'} backdrop-blur !cursor-pointer group fixed z-20 bottom-16 mobile:bottom-5 right-5 border border-Primary mobile:border-none bg-NoColor mobile:bg-Primary_Accents_md hover:bg-Primary rounded-full w-10 h-10 flex justify-center items-center`}
                >
                    {endOfPage ? (
                        <FaCaretUp className="w-3/5 h-3/5 text-Primary mobile:text-white group-hover:text-white group-hover:animate-pulse" />
                    ) : (
                        < FaCaretDown className="w-3/5 h-3/5 text-Primary mobile:text-white group-hover:text-white group-hover:animate-pulse" />
                    )}

                    <span className={`absolute right-12 px-4 py-1 rounded-full hidden group-hover:block animate-slide_left2 bg-Primary text-white font-normal text-sm whitespace-nowrap transition ease-in-out !duration-250`}>
                        {nextSectionName}
                    </span>
                </div>

                {/* Floating Button for Previous Section */}
                <div
                    onClick={() => handleScroll('prev')}
                    className={`${endOfPage ? 'hidden' : 'block'} backdrop-blur mobile:hidden !cursor-pointer group fixed z-20 bottom-[120px] right-5 border border-Primary bg-NoColor hover:bg-Primary rounded-full w-10 h-10 flex justify-center items-center`}
                >
                    < FaCaretUp className="w-3/5 h-3/5 text-Primary group-hover:text-white group-hover:animate-pulse" />

                    <span className={`absolute right-12 px-4 py-1 rounded-full hidden group-hover:block animate-slide_left2 bg-Primary text-white font-normal text-sm whitespace-nowrap transition ease-in-out !duration-250`}>
                        {prevSectionName}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;