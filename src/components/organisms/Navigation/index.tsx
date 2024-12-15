import React, { useEffect, useRef, useState } from 'react';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { ToSnakeCase } from 'components/atoms/CaseManager';
import NavItem from 'components/atoms/NavItem';
import { useLocation, useNavigate } from 'react-router-dom';
import navData from 'components/molecules/navData';
import { FaCaretDown, FaUser } from "react-icons/fa6";
import logoImg from '../../../assets/svg/logo/Group 11.svg';
import logoImg2 from '../../../assets/svg/logo/Group 12.svg';
import NavModal from './NavModal';
// import { setLoginStatus } from '../../../redux/auth/auth.action';
import { connect } from 'react-redux';

type Props = {
    sectID?: string;
    style?: string;
    logoImg?: string;
    login_state?: boolean;
}

const TopNav: React.FC<Props> = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const userStatus = props.login_state;

    const currentPath = location.pathname.split('/')[2];

    const { navItems, onBoardingData } = navData();

    const matchedNavItem = navItems.find(item => ToSnakeCase(item.navItem) === currentPath);

    useEffect(() => {
        if (matchedNavItem) {
            const matched = ToSnakeCase(matchedNavItem.navItem);
            setSelected(matched);
        } else {
            setSelected('home');
        }
    }, [currentPath]);

    const handleNavItemClick = (e, item) => {
        if (!item.available) {
            return;
        }
        setSelected(e.target.dataset.name);
    };

    const placehoderImg = '';

    const profileImg = placehoderImg
        ? <img src={placehoderImg} alt='placehoderImg' className={`${userStatus ? 'flex' : 'hidden'} w-10 h-10 object-center object-cover object-fit border-2 border-white group-hover:border-Primary text-white group-hover:text-Primary rounded-full p-[2px] transition ease-in-out`} />
        : <FaUser className={`${userStatus ? 'flex' : 'hidden'} w-10 h-10 border border-white group-hover:border-Primary text-white group-hover:text-Primary rounded-full p-[2px] transition ease-in-out`} />


    const navItemFunc = (item: { newPage: any; navItem: any; navType?: string; action: any; style: any; icon1: any; icon2: any; available: any; }, index: React.Key | null | undefined) => {
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
                active={ToSnakeCase(item.navItem) === selected}
                navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                onClick={(e) => handleNavItemClick(e, item)}
                action={item.action}
                toNewPage={item.newPage}
            />
        )
    }

    return (
        <>
            <div className={`${props.style} px-40 w-full flex justify-center items-center gap-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                <div className='w-full max-w-6xl flex justify-between items-center gap-10'>
                    <div className='min-w-1/4 w-fit nav_title_text text-xl text-white relative flex justify-center items-center gap-1'>
                        {/* <img src={logoImg} alt='logo' className='w-10 h-10 animate-spin'/> */}
                        <img src={logoImg2} alt='logo' className='w-10 h-10 group-hover:animate-pulse' />
                        <span className='nav_title_text text-white hover:text-Primary cursor-pointer'>
                            H@A
                        </span>
                    </div>
                    <div className='min-w-1/2 w-fit flex items-center gap-8'>
                        <nav className='w-fit flex items-center gap-[2px]'>
                            {navItems.map((item, i) => (
                                userStatus
                                    ? item.navItem !== 'Profile' &&
                                    navItemFunc(item, i)
                                    : navItemFunc(item, i)
                            ))}

                            <ScrollLink
                                to={'footer'}
                                spy={true}
                                smooth={true}
                                offset={0}
                                duration={1500}
                                className='py-1 px-3 border-[.5px] flex justify-center items-center border-Primary text-Primary hover:bg-Primary hover:text-white rounded-md transition ease-in-out duration-250 cursor-pointer'
                            >
                                My Resume
                            </ScrollLink>
                        </nav>
                        <div className={`group flex items-center gap-2 cursor-pointer`}
                            onClick={() => setDropdown(true)}
                        >
                            {profileImg}
                        </div>
                    </div>
                </div>
            </div>
            {dropdown && <NavModal setModalState={setDropdown} {...onBoardingData} />}
        </>
    )
}

const mapStateToProps = (state: any) => ({
    login_state: state.auth.login_state
})

const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);