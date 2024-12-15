import React from 'react';
import emptyIcon from '../../assets/svg/empty.svg';
import arrowLeft_ from '../../assets/svg/arrows/angle-left.svg';
import arrowLeft from '../../assets/svg/arrows/arrow_wl.svg';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = (props) => {
    const navigate = useNavigate();
    return (
        <div className={`${props.style} absolute flex flex-col items-center py-10 justify-center w-full min-h-full border-b bg-white bg-opacity-75`}>
            <img
                src={emptyIcon}
                alt="emptyIcon"
                className='h-20 w-20'
            />
            <div className='p-3 flex justify-center items-center'>
                <span className='text-gray-500 text-sm font-semibold leading-5 flex flex-col gap-2 justify-center items-center'>
                    <b className='text-5xl'>404</b>    
                    <p className='text-base'>Page not Found</p>    
                </span>
            </div>
            <Button
                btnType={undefined}
                btnText="Return"
                btnStyle='bg-black text-white px-4 py-2 font-semibold rounded-md text-sm leading-5 flex-row-reverse'
                btnImg={arrowLeft}
                btnImgStyle='w-4 h-4'
                handleClick={() => navigate('')}
            />
        </div>
    )
}

export default NotFoundPage;