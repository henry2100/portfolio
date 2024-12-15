import React, { useEffect, useState } from 'react';
import AppModal from '../CustomModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import navData from 'components/molecules/navData';
import NavItem from 'components/atoms/NavItem';
import SocialLinks from '../Footer/SocialLinks';
import { connect } from 'react-redux';
// import { resetAppState } from '../../../redux_/app/app.action';
// import { setLoginStatus, resetAuthState } from '../../../redux_/auth/auth.action';
// import Alert from 'components/atoms/Alert';
// import { BASE_URL, postRequest } from 'services/http';
// import { handleLogout } from 'utils';

const NavModal = (props) => {
    const [dropdown, setDropdown] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selected, setSelected] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    const headers = {
        "Content-Type": "application/json"
    };

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
                style={`${item.style} text-DarkBg3`}
                active={ToSnakeCase(item.navItem) === selected}
                navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                onClick={(e) => handleNavItemClick(e, item)}
                action={item.action}
                toNewPage={item.newPage}
                floating={true}
                floatingStyle="!flex !justify-center !w-full"
                setModalState={props.setModalState}
            />
        )
    }

    console.log({
        navItems: navItems,
        onBoardingData: onBoardingData
    });

    return (
        <AppModal
            handleClose={() => props.setModalState(false)}
            modalStyle={`${props.darkMode ? 'bg-Primary_800' : 'bg-Background1'} border-2 border-NoColor hover:border-Primary min-h-[40vh] mobile:min-h-[30vh] overflow-y-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 max-w-[320px] min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-0 left-0 top-24 mobile:top-16 mobile:right-0 mobile:left-0 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_xl'
            contentStyle="h-fit min-h-[40vh] mobile:min-h-[30vh] p-5 flex flex-col justify-evenly gap-5"
            closeBtnStyle='text-Primary'
        >
            <nav className='min-w-1/4 w-full flex mobile:hidden flex-col items-center gap-5 border-Primary'>
                {navItems.map((item, i) => (
                    userStatus
                        ? item.newPage &&
                            navItemFunc(item, i)
                        : navItemFunc(item, i)
                ))}
            </nav>

            <nav className='min-w-1/4 w-full hidden mobile:flex flex-col items-center gap-5 border-Primary'>
                {navItems.map((item, i) => (
                    navItemFunc(item, i)
                ))}
            </nav>

            <div className='flex flex-col gap-5'>
                <div className='flex flex-col gap-3'>
                    {onBoardingData.map((item, i) => (
                        <span key={i} className={`${item.style} py-1 px-3 border-[.5px] justify-center items-center border-Primary text-white bg-Primary rounded-md transition ease-in-out duration-250 cursor-pointer`}
                            onClick={item.action || undefined}
                        >
                            {item.navItem}
                        </span>
                    ))}
                </div>

                <SocialLinks
                    style='!border-none !p-0'
                    iconWrapperStyle='!justify-evenly w-full'
                    iconStyle='!w-5 !h-5 !text-Primary'
                    social
                />
            </div>
        </AppModal>
    )
}

const mapStateToProps = (state: any) => ({
    login_state: state.auth.login_state
})

const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(NavModal);