import React, { useState } from 'react';
import { Link as ScrollLink } from "react-scroll";
import { ToSnakeCase } from 'components/atoms/CaseManager';
import NavItem from 'components/atoms/NavItem';
import navData from 'components/molecules/navData';
import { HEAmainLogo } from '../../../assets/svg/logo/testLogo';
import { connect } from 'react-redux';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'context/ThemeContext';

type Props = {
    sectID?: string;
    wrapperStyle?: string;
    logoImg?: string;
    sectionInView?: string;
}

const TopNav: React.FC<Props> = (props) => {
    const [onLogoHover, setOnLogoHover] = useState(false);
    const { theme, toggleTheme } = useTheme();

    const { navItems } = navData();

    const navItemFunc = (item: { newPage: boolean; navItem: string; navType?: string; action: (() => void) | null; style: string; icon1: string; icon2: string; available: boolean; }, index: number) => {
        return (
            <NavItem
                key={index}
                sectID={item.navItem}
                navItem={item.navItem}
                itemStyle="truncate"
                icon_1={item.icon1}
                icon_2={item.icon2}
                available={item.available}
                style={item.style}
                active={ToSnakeCase(item.navItem) === ToSnakeCase(props.sectionInView || '')}
                navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                onClick={() => {}}
                action={item.action}
                toNewPage={item.newPage}
            />
        );
    };

    const logoColor = onLogoHover ? '#6366f1' : (theme === 'dark' ? '#fff' : '#1a1a1a');
    const logoSecondary = theme === 'dark' ? '#fff' : '#1a1a1a';

    return (
            <div className={`${props.wrapperStyle} px-6 tablet:px-8 desktop:px-40 w-full flex justify-center items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`} style={{ background: theme === 'dark' ? undefined : 'rgba(255,255,255,0.85)' }}>
            <div className='w-full max-w-6xl flex justify-between items-center gap-10'>
                <div
                    onMouseEnter={() => setOnLogoHover(true)}
                    onMouseLeave={() => setOnLogoHover(false)}
                >
                    <ScrollLink
                        to={'Home'}
                        spy={true}
                        smooth={true}
                        offset={0}
                        duration={1500}
                        className='min-w-1/4 w-fit nav_title_text text-xl relative flex justify-center items-center cursor-pointer'
                        style={{ color: theme === 'dark' ? '#fff' : '#1a1a1a' }}
                    >
                        <HEAmainLogo
                            primaryColor={logoColor}
                            secondaryColor={logoSecondary}
                            width={'100'}
                            height={'28'}
                        />
                    </ScrollLink>
                </div>

                <div className='min-w-0 flex-1 flex items-center justify-end gap-5'>
                    <nav className='max-w-full w-fit flex items-center gap-[2px] overflow-x-auto'>
                        {navItems.map((item, i) => navItemFunc(item, i))}
                    </nav>
                    <button
                        onClick={toggleTheme}
                        className='flex items-center justify-center w-9 h-9 rounded-full transition-colors duration-200'
                        style={{
                            color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.5)',
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {theme === 'dark' ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
                    </button>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: { app: { sectionInView: string } }) => ({
    sectionInView: state.app.sectionInView
});

export default connect(mapStateToProps)(TopNav);
