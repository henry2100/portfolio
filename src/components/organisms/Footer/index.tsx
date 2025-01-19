import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import contactStockImg from '../../../assets/images/stock_img_3.jpg';
import { inputAlpha, inputEmail, inputNum } from 'utils';
import FormTextArea from 'components/atoms/FormTextArea';
import { CiEdit } from "react-icons/ci";
import DocumentViewer from 'components/atoms/DisplayCV';
import myResumeDoc from '../../../assets/pdf/henry_adedugba_cv.pdf';

const fileName = "henry_adedugba_resume.pdf";

const Footer = () => {
    const [previewCV, setPreviewCV] = useState(false);

    const handleDownload = () => {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = myResumeDoc;
        link.download = fileName;
        link.click();
    };

    return (
        <footer className='bg-DarkBg3 w-full min-h-screen flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]'>
            <div className='w-full max-w-6xl mobile:min-h-screen flex flex-col mobile:justify-between gap-8 mobile:!p-5 tablet:p-8 mobile:!pt-20'>
                <div className='desktop:py-24 mobile:py-8 w-full flex flex-col desktop:gap-32 gap-8'>
                    <div id='footer' className='group flex flex-col justify-center items-center gap-16 w-full min-h-[70vh] mobile:min-h-fit'>
                        <h3 className='text-4xl font-bold text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>
                            Checkout My Resume!
                        </h3>
                        <div className='flex justify-center items-center gap-20 mobile:gap-10 w-4/5 mobile:w-full bg-DarkBg10 p-2 rounded-full'>
                            <Button
                                btnType='submit'
                                btnText='Preview'
                                btnStyle='flex w-full mobile:w-full p-8 mobile:p-4 text-2xl mobile:text-xl text-Primary hover:text-Background rounded-full border border-Primary hover:!border-Primary_Accents_xl hover:bg-Primary_Accents_xl hover:border-Primary_Accents_xl transition ease-in-out duration-500'
                                handleClick={() => setPreviewCV(true)}
                            />
                            <Button
                                btnType='submit'
                                btnText='Download'
                                btnStyle='flex w-full mobile:w-full p-8 mobile:p-4 text-2xl mobile:text-xl hover:text-Background rounded-full bg-Primary text-Background rounded shadow hover:bg-Primary_Accents_3xl transition ease-in-out duration-500'
                                handleClick={handleDownload}
                            />
                        </div>
                    </div>

                    {previewCV && <DocumentViewer
                        fileUrl={myResumeDoc}
                        fileName={fileName}
                        closeModal={setPreviewCV}
                    />}
                </div>

                <SocialLinks
                    containerStyle="bg-DarkBg3 border-t"
                    style='!border-none !py-4 mobile:!py-2 mobile:!px-0 !flex mobile:!flex-col-reverse !justify-between w-full'
                    iconStyle='!w-4 !h-4'
                    policyStyle='mobile:!grid mobile:!grid-cols-2 mobile:!py-16'
                    contact
                    social
                    policies
                />
            </div>
        </footer>
    )
}

export default Footer; 