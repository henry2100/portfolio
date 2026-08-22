import { useState } from 'react';
import { FiMenu, FiX } from "react-icons/fi";
import { Sun, Moon } from "lucide-react";
import NavModal from './NavModal';
import { useTheme } from 'context/ThemeContext';

type Props = {
    wrapperStyle?: string;
    logoImg?: string;
    floating?: boolean;
}

const MobileNav = (props: Props) => {
    const [modatState, setModalState] = useState(false);
    const { theme, toggleTheme } = useTheme();

    return (
        <>
            <div className={`${props.wrapperStyle} !px-5 w-full hidden justify-between items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`} style={{ background: theme === 'dark' ? undefined : '#ffffff' }}>
                <div className='min-w-1/4 w-fit nav_title_text text-xl relative flex justify-center items-center gap-4'>
                    <span className='nav_title_text text-Primary cursor-pointer'>H@A</span>
                </div>
                <div className='flex items-center gap-3'>
                    <button
                        onClick={toggleTheme}
                        className='flex items-center justify-center w-8 h-8 rounded-full'
                        style={{
                            color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <div
                        onClick={() => setModalState(true)}
                    >
                        {modatState
                            ? <FiX className='text-Primary w-8 h-8 transition ease-in-out duration-250' />

                            : <FiMenu className='text-Primary w-8 h-8 transition ease-in-out duration-250' />
                        }
                    </div>
                </div>
            </div>
            {modatState && <NavModal setModalState={setModalState} />}
        </>
    )
}

export default MobileNav;
