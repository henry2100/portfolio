import React from 'react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowLeft } from "react-icons/md";
import { MdFolderOff } from "react-icons/md";

const NotFoundPage = (props) => {
    const navigate = useNavigate();
    return (
        <div className={`${props.style} absolute flex flex-col items-center py-10 justify-center w-full min-h-full border-b bg-white bg-opacity-75`}>
            <div className='bg-Primary_Accents_xs w-[75px] h-[75px] flex justify-center items-center rounded-full'>
                <MdFolderOff className='w-1/2 h-auto text-Primary_Accents_3xl'/>
            </div>
            <div className='p-3 flex justify-center items-center'>
                <span className='text-Primary_Accents_3xl text-sm font-semibold leading-5 flex flex-col gap-2 justify-center items-center'>
                    <b className='text-5xl'>404</b>
                    <p className='text-base font-light'>Page not Found</p>
                </span>
            </div>
            <div className='group'>
                <Button
                    btnType={undefined}
                    btnText="Go back"
                    btnStyle='bg-Primary_Accents_3xl text-white p-1 pr-4 py-[2px] font-semibold rounded-full text-sm leading-5 flex-row-reverse justify-center !gap-1 border border-Primary_Accents_3xl group-hover:bg-NoColor group-hover:text-Primary_Accents_3xl'
                    btnIcon={<MdOutlineArrowLeft className='w-7 h-7 !p-0 text-white group-hover:text-Primary_Accents_3xl' />}
                    handleClick={() => navigate(-1)}
                />
            </div>
        </div>
    )
}

export default NotFoundPage;