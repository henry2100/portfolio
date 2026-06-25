import React, { useEffect, useState } from 'react';
import { Link as ScrollLink } from "react-scroll";
import { ToSnakeCase } from 'components/atoms/CaseManager';
import NavItem from 'components/atoms/NavItem';
import { useLocation } from 'react-router-dom';
import navData from 'components/molecules/navData';
import { HEAmainLogo } from '../../../assets/svg/logo/testLogo';
import { connect } from 'react-redux';

type Props = {
    sectID?: string;
    wrapperStyle?: string;
    logoImg?: string;
    sectionInView?: string;
}

const TopNav: React.FC<Props> = (props) => {
    const [onLogoHover, setOnLogoHover] = useState(false);
    const [selected, setSelected] = useState('');

    const location = useLocation();
    const currentPath = location.pathname.split('/')[2];

    const { navItems } = navData();

    const matchedNavItem = navItems.find(item => ToSnakeCase(item.navItem) === currentPath);

    useEffect(() => {
        if (matchedNavItem) {
            const matched = ToSnakeCase(matchedNavItem.navItem);
            setSelected(matched);
        } else {
            setSelected('home');
        }
    }, [currentPath, matchedNavItem]);

    const handleNavItemClick = (e: React.MouseEvent, item: { available: boolean }) => {
        if (!item.available) {
            return;
        }
        setSelected((e.target as HTMLElement).dataset.name || '');
    };

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
                onClick={(e) => handleNavItemClick(e, item)}
                action={item.action}
                toNewPage={item.newPage}
            />
        );
    };

    return (
            <div className={`${props.wrapperStyle} px-40 w-full flex justify-center items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
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
                        className='min-w-1/4 w-fit nav_title_text text-xl text-white relative flex justify-center items-center cursor-pointer'
                    >
                        <HEAmainLogo
                            primaryColor={onLogoHover ? '#6366f1' : '#fff'}
                            secondaryColor={'#fff'}
                            width={'100'}
                            height={'28'}
                        />
                    </ScrollLink>
                </div>

                <div className='min-w-1/2 w-fit flex items-center gap-8'>
                    <nav className='w-fit flex items-center gap-[2px]'>
                        {navItems.map((item, i) => navItemFunc(item, i))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state: { app: { sectionInView: string } }) => ({
    sectionInView: state.app.sectionInView
});

export default connect(mapStateToProps)(TopNav);
