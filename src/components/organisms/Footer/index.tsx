import React, { useState } from 'react';
import SocialLinks from './SocialLinks';
import Button from 'components/atoms/Button';
import DocumentViewer from 'components/atoms/DisplayCV';
import myResumeDoc from '../../../assets/pdf/henry_adedugba_cv.pdf';
import { useSiteData } from '../../../context/SiteDataContext';
import { getProxiedPdfUrl } from '../../../services/siteData';

const Footer = () => {
    const [previewCV, setPreviewCV] = useState(false);
    const { siteData } = useSiteData();
    const rawCvUrl = siteData?.cv?.url || myResumeDoc;
    const cvUrl = rawCvUrl.includes('cloudinary.com')
        ? getProxiedPdfUrl(rawCvUrl)
        : rawCvUrl;
    const fileName = siteData?.cv?.fileName || "henry_adedugba_resume.pdf";

    const handleDownload = () => {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = cvUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <footer className='w-full min-h-screen flex justify-center items-center' style={{ background: "var(--site-bg-alt)", color: "var(--site-text)" }}>
            <div className='w-full max-w-6xl mobile:min-h-screen flex flex-col mobile:justify-between gap-8 mobile:!p-5 mobile:!px-4 tablet:p-8 mobile:!pt-20'>
                <div className='desktop:py-24 mobile:py-8 w-full flex flex-col desktop:gap-32 gap-8'>
                    <div id='footer' className='group flex flex-col justify-center items-center gap-16 mobile:gap-10 w-full min-h-[70vh] mobile:min-h-fit'>
                        <h3 className='text-4xl mobile:text-2xl font-bold leading-8 transition ease-in-out duration-500 text-center' style={{ color: "var(--site-text-secondary)" }}>
                            Checkout My Resume!
                        </h3>
                        <div className='flex justify-center items-center gap-20 mobile:gap-5 w-4/5 mobile:w-full p-2 rounded-full' style={{ background: "var(--site-bg-nav)" }}>
                            <Button
                                btnType='submit'
                                btnText='Preview'
                                btnStyle='flex w-full mobile:w-full p-8 mobile:p-3 text-2xl mobile:text-lg text-Primary hover:text-Background rounded-full border border-Primary hover:!border-Primary_Accents_xl hover:bg-Primary_Accents_xl hover:border-Primary_Accents_xl transition ease-in-out duration-500'
                                handleClick={() => setPreviewCV(true)}
                            />
                            <Button
                                btnType='submit'
                                btnText='Download'
                                btnStyle='flex w-full mobile:w-full p-8 mobile:p-3 text-2xl mobile:text-lg hover:text-Background rounded-full bg-Primary text-Background rounded shadow hover:bg-Primary_Accents_3xl transition ease-in-out duration-500'
                                handleClick={handleDownload}
                            />
                        </div>
                    </div>

                    {previewCV && <DocumentViewer
                        fileUrl={cvUrl}
                        fileName={fileName}
                        closeModal={setPreviewCV}
                    />}
                </div>

                <SocialLinks
                    containerStyle="border-t"
                    wrapperStyle='!border-none !py-4 mobile:!py-2 mobile:!px-0 !flex mobile:!flex-col-reverse !justify-between w-full'
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