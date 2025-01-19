import React from 'react';
import AppModal from '../organisms/CustomModal';
import Button from './Button';

interface DocumentViewerProps {
    fileUrl: string; // URL or local path to the document
    fileName: string; // Name of the file for download
    closeModal: any
}

const DocumentViewer: React.FC<DocumentViewerProps> = ({ fileUrl, fileName, closeModal }) => {
    const handleDownload = () => {
        // Create a temporary link to trigger download
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = fileName;
        link.click();
    };

    return (
        <AppModal
            modalStyle={`bg-DarkBg10 w-full max-w-4xl mobile:w-[90%] h-fit max-h-[80vh] mobile:min-h-[30vh] overflow-y-scroll z-30 right-0 left-0 top-24 mobile:top-16 mobile:right-0 mobile:left-0 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_xl'
            contentStyle="h-fit min-h-[40vh] mobile:min-h-[30vh] p-5 flex flex-col justify-evenly gap-5"
            closeBtnStyle='text-Primary hidden'
        >
            <div className="document-viewer">
                <div className="relative w-full aspect-[16/12] mobile:aspect-[16/24]">
                    <iframe
                        src={fileUrl}
                        className="absolute top-0 left-0 right-0 mx-auto w-full h-full"
                        allowFullScreen
                    />
                </div>

                <div className='flex justify-end mobile:justify-between items-center gap-10 mt-5'>
                    <Button
                        btnType='submit'
                        btnText='Close'
                        btnStyle='flex w-fit mobile:w-full px-6 py-2 text-base text-Primary hover:text-Background rounded-full border border-Primary hover:!border-Primary_Accents_xl hover:bg-Primary_Accents_xl hover:border-Primary_Accents_xl transition ease-in-out duration-500'
                        handleClick={() => closeModal(false)}
                    />

                    <Button
                        btnType='submit'
                        btnText='Download'
                        btnStyle='flex w-fit mobile:w-full px-6 py-2 text-base hover:text-Background rounded-full bg-Primary text-Background rounded shadow hover:bg-Primary_Accents_3xl transition ease-in-out duration-500'
                        handleClick={handleDownload}
                    />
                </div>
            </div>
        </AppModal>
    );
};

export default DocumentViewer;