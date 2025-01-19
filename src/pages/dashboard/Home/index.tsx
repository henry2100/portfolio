import React from 'react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Section from 'components/molecules/SectionTracker';
import Contact from './Contact';
import Services from './Services';
import Footer from 'components/organisms/Footer';

const Home = () => {
    return (
        <div className='bg-black'>
            <Section
                id={'About Me'}
                children={<About />}
                addedStyle='group w-full min-h-screen text-center flex justify-center items-center py-32 mobile:py-20'
            />

            <Section
                id={'Projects'}
                children={<Projects />}
                addedStyle='group w-full min-h-screen text-center flex flex-col gap-6 justify-start items-center py-32 mobile:py-20'
            />

            <Section
                id={'Skills'}
                children={<Skills />}
                addedStyle='group w-full min-h-screen text-center flex flex-col gap-6 justify-start items-center py-32 mobile:py-20'
            />

            <Section
                id={'Service'}
                children={<Services />}
                addedStyle='group w-full min-h-screen text-center flex flex-col gap-6 justify-start items-center py-32 mobile:py-20'
            />

            <Section
                id={'Contact'}
                children={<Contact />}
                addedStyle='group w-full h-fit min-h-screen flex justify-center items-center py-32 mobile:py-20'
            />

            <Section
                id={'My Resume'}
                children={<Footer />}
                addedStyle='group w-full h-fit min-h-screen flex justify-center items-center'
            />
        </div>
    )
}

export default Home;