import React, { useState } from 'react';
import logoImg from '../../../assets/images/church_logo_2.png';
import { FiMenu, FiX } from "react-icons/fi";
import NavModal from './NavModal';

type Props = {
    style?: string;
    logoImg?: string;
    floating?: boolean;
}

const MobileNav = (props: Props) => {
    const [modatState, setModalState] = useState(false);

    return (
        <>
            <div className={`${props.style} !px-20 mobile:!px-5 w-full hidden justify-between items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                <div className='min-w-1/4 w-fit nav_title_text text-xl text-white relative flex justify-center items-center gap-4'>
                    <span className='nav_title_text text-Primary cursor-pointer'>H@A</span>
                </div>
                <div className='min-w-1/4 w-fit nav_title_text text-xl text-white relative flex justify-center items-center gap-4'
                    onClick={() => setModalState(true)}
                >
                    {modatState
                        ? <FiX className='text-Primary w-8 h-8 transition ease-in-out duration-250' />

                        : <FiMenu className='text-Primary w-8 h-8 transition ease-in-out duration-250' />
                    }
                </div>
            </div>
            {modatState && <NavModal setModalState={setModalState} />}
        </>
    )
}

export default MobileNav;