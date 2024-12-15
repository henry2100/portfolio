import React from 'react';
import bgDefaultIMG from '../../assets/images/img-13.avif';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    return (
        <div className='flex w-full h-screen min-h-screen bg-Background2'>
            <div className='w-1/2 mobile:hidden'>
                <img src={bgDefaultIMG} alt="bg_img" className='w-full h-full object-cover object-center object-fit' />
            </div>
            <div className='w-1/2 mobile:w-full flex justify-center items-center mobile:relative'>
                <div className='max-w-sm w-full mobile:w-4/5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Auth;