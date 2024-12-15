import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopNav from 'components/organisms/Navigation';
import Footer from 'components/organisms/Footer';
import Hero from 'components/molecules/Hero';
import { HideBetween } from 'react-hide-on-scroll';
import MobileNav from 'components/organisms/Navigation/MobileNav';
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
import useNavData from 'components/molecules/navData';

const Dashboard = () => {
    const { navItems } = useNavData();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [endOfPage, setEndOfPage] = useState(false);

    const sectionList = navItems.map(item => item.navItem);

    const handleScroll = (action?: string) => {
        let nextIndex;

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
                    <TopNav style={'backdrop-blur-md !bg-BackDrop_d_sm hover:!bg-BackDrop_d_xl tablet:hidden fixed z-[25] top-5 left-0 right-0 mx-auto rounded-full py-5 !px-8 bg-white animate-fade_in transition ease-in duration-250 max-w-6xl w-full'} />
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
                    className={`${endOfPage && '!animate-bounce'} !cursor-pointer group fixed z-20 bottom-16 right-32 border border-Primary bg-NoColor hover:bg-Primary rounded-full w-10 h-10 flex justify-center items-center`}
                >
                    {endOfPage ? (
                        <AiOutlineArrowUp className="w-3/5 h-3/5 text-Primary group-hover:text-white group-hover:animate-pulse" />
                    ) : (
                        <AiOutlineArrowDown className="w-3/5 h-3/5 text-Primary group-hover:text-white group-hover:animate-pulse" />
                    )}

                    <span className={`absolute left-12 px-4 py-1 rounded-full hidden group-hover:block animate-slide_right4 bg-Primary text-white font-normal text-sm whitespace-nowrap transition ease-in-out !duration-250`}>
                        {nextSectionName}
                    </span>
                </div>

                {/* Floating Button for Previous Section */}
                <div
                    onClick={() => handleScroll('prev')}
                    className={`${endOfPage ? 'hidden' : 'block'} !cursor-pointer group fixed z-20 bottom-[120px] right-32 border border-Primary bg-NoColor hover:bg-Primary rounded-full w-10 h-10 flex justify-center items-center`}
                >
                    <AiOutlineArrowUp className="w-3/5 h-3/5 text-Primary group-hover:text-white group-hover:animate-pulse" />

                    <span className={`absolute left-12 px-4 py-1 rounded-full hidden group-hover:block animate-slide_right4 bg-Primary text-white font-normal text-sm whitespace-nowrap transition ease-in-out !duration-250`}>
                        {prevSectionName}
                    </span>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
