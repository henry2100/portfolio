import React from 'react';
import AppModal from '../CustomModal';
import { ToSnakeCase } from 'components/atoms/CaseManager';
import navData from 'components/molecules/navData';
import NavItem from 'components/atoms/NavItem';
import SocialLinks from '../Footer/SocialLinks';
import { connect } from 'react-redux';

interface NavModalProps {
    setModalState: (state: boolean) => void;
    sectionInView?: string;
}

const NavModal: React.FC<NavModalProps> = (props) => {
    const { navItems } = navData();

    const navItemFunc = (item: { newPage: boolean; navItem: string; action: (() => void) | null; style: string; icon1: string; icon2: string; available: boolean }, index: number) => {
        return (
            <NavItem
                key={index}
                sectID={item.navItem}
                navItem={item.navItem}
                itemStyle="truncate"
                icon_1={item.icon1}
                icon_2={item.icon2}
                available={item.available}
                style={`${item.style}`}
                active={ToSnakeCase(item.navItem) === ToSnakeCase(props.sectionInView || '')}
                navLink={`/dashboard/${ToSnakeCase(item.navItem)}`}
                onClick={() => props.setModalState(false)}
                action={item.action}
                toNewPage={item.newPage}
                floating={true}
                floatingStyle="!flex !justify-center !w-full"
                setModalState={props.setModalState}
            />
        );
    };

    return (
        <AppModal
            handleClose={() => props.setModalState(false)}
            modalStyle={`bg-DarkBg10 border-2 border-NoColor hover:border-Primary min-h-[40vh] mobile:min-h-[30vh] overflow-y-scroll desktop:w-[25%] w-2/5 mobile:w-4/5 max-w-[320px] min-h-fit max-h-[600px] mobile:max-h-[80vh] h-fit z-30 right-0 left-0 top-24 mx-auto animate-slide_down2 mobile:animate-fade_in rounded-xl mobile:rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition ease-in-out duration-500`}
            backDropStyle='!bg-BackDrop_d_xl'
            contentStyle="h-fit min-h-[40vh] mobile:min-h-[30vh] p-5 flex flex-col justify-evenly gap-5 custom_container"
            closeBtnStyle='text-Primary'
        >
            <nav className='min-w-1/4 w-full flex mobile:hidden flex-col items-center gap-5 border-Primary'>
                {navItems.map((item, i) => navItemFunc(item, i))}
            </nav>

            <nav className='min-w-1/4 w-full hidden mobile:flex flex-col items-center gap-5 border-Primary'>
                {navItems.map((item, i) => navItemFunc(item, i))}
            </nav>

            <SocialLinks
                wrapperStyle='!border-none !p-0'
                iconWrapperStyle='!justify-evenly w-full'
                iconStyle='!w-5 !h-5 !text-Primary'
                social
            />
        </AppModal>
    );
};

const mapStateToProps = (state: { app: { sectionInView: string } }) => ({
    sectionInView: state.app.sectionInView
});

export default connect(mapStateToProps)(NavModal);