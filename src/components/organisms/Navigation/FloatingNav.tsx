import React, { useEffect, useRef, useState } from 'react';
import logoImg from '../../../assets/images/church_logo_b.png';
import logoImg2 from '../../../assets/images/church_logo_2.png';
import { useLocation, useNavigate } from 'react-router-dom';
import navData from 'components/molecules/navData';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import NavItem from 'components/atoms/NavItem';
import { FaCaretDown, FaUser } from 'react-icons/fa6';
import placehoderImg from '../../../assets/images/profile-1.jpg';
import { connect } from 'react-redux';
// import { setLoginStatus } from '../../../redux/auth/auth.action';
import NavModal from './NavModal';

type Props = {
    sectID?: string;
    style?: string;
    logoImg?: string;
    login_state?: boolean;
}

const FloatingNav = (props: Props) => {
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

    const profileImg = placehoderImg
        ? <img src={placehoderImg} alt='placehoderImg' className={`${userStatus ? 'flex' : 'hidden'} w-10 h-10 object-center object-cover object-fit border-2 border-GrayCustom group-hover:border-Primary text-GrayCustom group-hover:text-Primary rounded-full p-[2px] transition ease-in-out`} />
        : <FaUser className={`${userStatus ? 'flex' : 'hidden'} w-10 h-10 border-2 border-GrayCustom group-hover:border-Primary text-GrayCustom group-hover:text-Primary rounded-full p-[2px] transition ease-in-out`} />

    const navItemFunc = (item, index) => {
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
                floating={true}
                toNewPage={item.newPage}
            />
        )
    }
    return (
        <div className={`${props.style} flex justify-between fixed z-[25] top-5 left-0 right-0 mx-auto rounded-lg py-1 !px-5 shadow-[rgba(0,_0,_0,_0.4)_0px_30px_90px] animate-fade_in transition ease-in-out max-w-7xl w-full`}>
            <div className='min-w-1/4 w-fit nav_title_text text-xl text-white relative flex justify-center items-center gap-4'>
                <img src={logoImg} alt='brand_logo' className='w-20 h-20' />
            </div>
            <div className='min-w-1/4 w-fit flex gap-5'>
                <nav className='flex items-center gap-3'>
                    {navItems.map((item, i) => (
                        userStatus
                        ? item.navItem !== 'Profile' &&
                            navItemFunc(item, i)
                        : navItemFunc(item, i)
                    ))}

                    <span className='py-1 px-3 border-[.5px] flex justify-center items-center border-white text-white hover:bg-white hover:text-Primary rounded-md transition ease-in-out-out cursor-pointer'>
                        Give
                    </span>
                </nav>
                <div className={`group flex items-center gap-2 cursor-pointer`}
                    onClick={() => setDropdown(true)}
                >
                    {profileImg}
                </div>
            </div>
            {dropdown && <NavModal setModalState={setDropdown} {...onBoardingData} />}
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    login_state: state.auth.login_state
})

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(FloatingNav);