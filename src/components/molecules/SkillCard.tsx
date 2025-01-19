import React, { useState } from 'react';

interface skillCardProps {
    images?: string
    title?: string
    proficiency?: string
    description?: string
}

const SkillCard: React.FC<skillCardProps> = ({ images, title, proficiency, description }) => {
    const [skillInfo, setSkillInfo] = useState(false);

    return (
        <div
            className='skill_card group relative z-10 transition ease-in-out duration-500 shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center w-auto mobile:w-4/5 rounded-lg overflow-hidden bg-Background'
            onMouseEnter={() => setSkillInfo(true)}
            onMouseLeave={() => setSkillInfo(false)}
        >
            {/* Background Image */}
            <img
                src={images}
                alt={title}
                className='absolute rounded-lg w-full h-full object-cover object-center scale-110 transition ease-in-out duration-500 opacity-10'
            />

            {/* Icon Section */}
            <div className='relative z-10 left-0 w-3/5 h-full max-h-[250px] group-hover:flex-grow-0 group-hover:rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out duration-500'>
                <img
                    src={images}
                    alt={title}
                    className='group-hover:rounded-lg !w-full !h-full object-cover object-center scale-105 group-hover:scale-125 transition ease-in-out duration-500'
                />
            </div>

            {/* Details Section */}
            <div className={`relative z-10 group-hover:absolute group-hover:z-[12] group-hover:w-[70%] ${skillInfo ? 'custom_gradient' : 'bg-BackDrop_l_xs'} right-0 p-5 w-1/2 min-h-[250px] flex flex-col justify-between items-end gap-3 group-hover:rounded-lg transition ease-in-out duration-500`}>
                <span className='mobile:w-full flex flex-col items-end justify-start mobile:items-center mobile:justify-center mobile:gap-1'>
                    <h3 className='text-xl font-bold group-hover:text-2xl text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>{title}</h3>
                    <p className='font-normal text-sm text-gray-600 group-hover:text-white my-1 transition ease-in-out duration-500'>{proficiency}</p>
                    <span className='border-b border-black group-hover:border-Primary min-w-[25px] group-hover:min-w-[50px] transition ease-in-out duration-500'></span>
                </span>

                {skillInfo ? (
                    <p className='text-sm font-normal text-gray-800 group-hover:text-white transition ease-in-out duration-500 max-w-[200px] text-right'>
                        {description}
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


export const SkillCard_dark = ({ images, title, proficiency, description }: skillCardProps) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className='group bg-DarkBg2 p-2 h-[200px] flex-shrink-0 rounded-lg group relative z-10 transition ease-in-out duration-500 overflow-hidden cursor-pointer'>
            <div className='relative z-10 left-0 right-0 mx-auto w-4/5 h-full max-h-[250px] group-hover:flex-grow-0 group-hover:rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out duration-500 bg-NoColor'>
                <img
                    src={images}
                    alt={title}
                    className='group-hover:rounded-lg !w-full !h-full object-contain object-center scale-105 group-hover:scale-125 transition ease-in-out duration-500'
                />
            </div>

            <img
                src={images}
                alt={title}
                className='absolute rounded-lg w-full h-full object-cover object-center scale-125 transition ease-in-out duration-500 opacity-40'
            />

            <div className='hidden absolute z-[11] top-0 left-0 group-hover:flex group-hover:bg-BackDrop_d_xl w-full h-full p-5 rounded-lg transition ease-in-out duration-500  animate-slide_up'>
                <span className='w-full h-full flex flex-col items-start justify-between mobile:items-center mobile:justify-center mobile:gap-1 animate-slide_right2'>
                    <h3 className='text-xl font-bold group-hover:text-2xl text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>{title}</h3>
                    <div className='flex flex-col gap-1'>
                        <p className='font-normal text-sm text-gray-600 group-hover:text-white my-1 transition ease-in-out duration-500'>{proficiency}</p>
                        <span className='border-b border-black group-hover:border-Primary min-w-[25px] group-hover:min-w-[50px] transition ease-in-out duration-500'></span>
                    </div>
                </span>

                <span className='w-full text-sm font-normal text-gray-800 group-hover:text-white transition ease-in-out duration-500 max-w-[200px] text-right animate-fade_in'>
                    {description}
                </span>
            </div>
        </div>
    )
}








// <div className='group border-[.5px] hover:border-Primary p-2 h-[200px] flex-shrink-0 rounded-lg group relative z-10 transition ease-in-out duration-500 overflow-hidden'>
//     <div className='relative z-10 left-0 right-0 mx-auto w-4/5 h-full max-h-[250px] group-hover:flex-grow-0 group-hover:rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out duration-500 bg-NoColor'>
//         <img
//             src={images}
//             alt={title}
//             className='group-hover:rounded-lg !w-full !h-full object-contain object-center scale-105 group-hover:scale-125 transition ease-in-out duration-500'
//         />
//     </div>

//     <img
//         src={images}
//         alt={title}
//         className='absolute rounded-lg w-full h-full object-cover object-center scale-110 transition ease-in-out duration-500 opacity-40'
//     />

//     <div className='hidden absolute z-[11] top-0 left-0 border-[.75px] group-hover:border-Primary group-hover:flex group-hover:bg-Primary_Accents_xs w-full h-full p-5 rounded-lg transition ease-in-out duration-500'>

//     </div>
// </div>


// <div className='group bg-DarkBg8 p-2 h-[200px] flex-shrink-0 rounded-lg group relative z-10 transition ease-in-out duration-500 overflow-hidden'>
//     <div className='relative z-10 left-0 right-0 mx-auto w-4/5 h-full max-h-[250px] group-hover:flex-grow-0 group-hover:rounded-lg overflow-hidden flex justify-center items-center transition ease-in-out duration-500 bg-NoColor'>
//         <img
//             src={images}
//             alt={title}
//             className='group-hover:rounded-lg !w-full !h-full object-contain object-center scale-105 group-hover:scale-125 transition ease-in-out duration-500'
//         />
//     </div>

//     <img
//         src={images}
//         alt={title}
//         className='absolute rounded-lg w-full h-full object-cover object-center scale-125 transition ease-in-out duration-500 opacity-40'
//     />

//     <div className='hidden absolute z-[11] top-0 left-0 border-[.75px] group-hover:border-Primary group-hover:flex group-hover:bg-BackDrop_d_md w-full h-full p-5 rounded-lg transition ease-in-out duration-500'>

//     </div>
// </div>