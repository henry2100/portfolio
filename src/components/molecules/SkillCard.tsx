
import React, { useState } from 'react';

const SkillCard = ({ skillIcon, name, level, desc }) => {
    const [skillInfo, setSkillInfo] = useState(false);

    return (
        <div
            className='skill_card group relative z-10 transition ease-in-out duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center w-auto mobile:w-4/5 rounded-lg overflow-hidden bg-Background'
            onMouseEnter={() => setSkillInfo(true)}
            onMouseLeave={() => setSkillInfo(false)}
        >
            {/* Background Image */}
            <img
                src={skillIcon}
                alt={name}
                className='absolute rounded-lg w-full h-full object-cover object-center scale-110 transition ease-in-out duration-500 opacity-10'
            />

            {/* Icon Section */}
            <div className='relative z-10 left-0 w-3/5 h-full max-h-[250px] group-hover:flex-grow-0 group-hover:rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out duration-500'>
                <img
                    src={skillIcon}
                    alt={name}
                    className='group-hover:rounded-lg !w-full !h-full object-cover object-center scale-105 group-hover:scale-125 transition ease-in-out duration-500'
                />
            </div>

            {/* Details Section */}
            <div className={`relative z-10 group-hover:absolute group-hover:z-[12] group-hover:w-[70%] ${skillInfo ? 'custom_gradient' : 'bg-BackDrop_l_xs'} right-0 p-5 w-1/2 min-h-[250px] flex flex-col justify-between items-end gap-3 group-hover:rounded-lg transition ease-in-out duration-500`}>
                <span className='mobile:w-full flex flex-col items-end justify-start mobile:items-center mobile:justify-center mobile:gap-1'>
                    <h3 className='text-xl font-bold group-hover:text-2xl text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>{name}</h3>
                    <p className='font-normal text-sm text-gray-600 group-hover:text-white my-1 transition ease-in-out duration-500'>{level}</p>
                    <span className='border-b border-black group-hover:border-Primary min-w-[25px] group-hover:min-w-[50px] transition ease-in-out duration-500'></span>
                </span>

                {skillInfo ? (
                    <p className='text-sm font-normal text-gray-800 group-hover:text-white transition ease-in-out duration-500 max-w-[200px] text-right'>
                        {desc}
                    </p>
                ) : (
                    <p className='text-sm font-normal text-gray-500 group-hover:text-white transition ease-in-out duration-500'>
                        Hover to learn more...
                    </p>
                )}
            </div>
        </div>
    );
};

export default SkillCard;