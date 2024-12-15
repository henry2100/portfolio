import React from 'react';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';

const Home = () => {
    const images = [];

    return (
        <div className='bg-black'>
            <About />
            <Projects />
            <Skills />
            <div id='Services' className='border-2 w-full h-fit min-h-screen'></div>
            <div id='Bio' className='border-2 w-full h-fit min-h-screen'></div>
        </div>
    )
}

export default Home;