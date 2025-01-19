import React from 'react';
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
// import { HashLink } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';
import { ToSnakeCase } from './CaseManager';
import { connect } from 'react-redux';

interface Props {
    sectID?: any;
    available?: boolean;
    active?: boolean;
    itemStyle?: string;
    navLink: string;
    navItem?: string;
    icon_1?: string;
    icon_2?: string;
    style?: string;
    floating?: boolean;
    floatingStyle?: string;
    toNewPage?: boolean;
    sectionInView?: string;
    onClick: ((e?: any) => void);
    action: ((e?: any) => void) | null;
    setModalState?: (e?: any) => void | null;
}

const NavItem: React.FC<Props> = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (!props.available) {
            Alert('info', "Sorry, this feature is not available yet.");
            return;
        }
        if (props.action) {
            props.action();
        } else {
            navigate(props.navLink);
        }

        props.setModalState && props.setModalState(false);
    };

    console.log("sectionInView:", props.sectID);

    const navItemContent = (
        <div onClick={handleClick} data-name={ToSnakeCase(props.navItem)} className={props.style}>
            <div
                data-name={ToSnakeCase(props.navItem)}
                className={`group relative overflow-hidden flex justify-center items-center py-1 min-w-[100px] w-fit gap-3 cursor-pointer transition ease-in-out duration-500 
                    ${props.active || props.sectionInView ? 'text-Primary' : 'text-white'} ${!props.active && '!text-Secondary'} hover:text-Primary`}
            >
                {props.icon_1 && props.icon_2 && (
                    <span className="flex-shrink-0 pointer-events-none">
                        <img src={props.active ? props.icon_1 : props.icon_2} alt="nav_icons" className="w-4 h-4" />
                    </span>
                )}
                <span className="pointer-events-none whitespace-nowrap !font-normal">
                    {props.navItem}
                </span>
                <div className={`group-hover:block ${props.active ? 'block' : 'hidden'} w-1/2 border-[5px] border-Primary animate-slide_right absolute bottom-0 rounded-md transition ease-in-out duration-500`}></div>
            </div>
        </div>
    );

    const scrollNavItemContent = (
        <ScrollLink
            to={props.sectID}
            spy={true}
            smooth={true}
            offset={0}
            duration={1500}
            className={`${props.style} ${props.active && props.navItem === 'My Resume' && 'bg-Primary'} cursor-pointer flex flex-col group hover overflow-hidden`}
        >
            <div
                data-name={ToSnakeCase(props.navItem)}
                onClick={() => {
                    props.setModalState && props.setModalState(false);
                }}
                className={`group relative overflow-hidden flex justify-center items-center py-1 min-w-[100px] w-fit gap-3 cursor-pointer transition ease-in-out duration-500 
                    ${props.active ? 'text-Primary' : 'text-white'} ${!props.active && '!text-white'} hover:text-Primary ${props.active && props.navItem === 'My Resume' && 'text-white'}`}
            >
                {props.icon_1 && props.icon_2 && (
                    <span className="flex-shrink-0 pointer-events-none">
                        <img src={props.active ? props.icon_1 : props.icon_2} alt="nav_icons" className="w-4 h-4" />
                    </span>
                )}
                <span className="pointer-events-none whitespace-nowrap !font-normal">
                    {props.navItem}
                </span>

                {props.navItem !== 'My Resume' && <div className={`group-hover:block ${props.active ? 'block' : 'hidden'} w-1/2 border-2 border-Primary animate-slide_right absolute bottom-0 rounded-md transition ease-in-out duration-500`}></div>}
            </div>
        </ScrollLink>
    );

    const content = props.toNewPage
        ? navItemContent
        : scrollNavItemContent

    return content;
};

const mapStateToProps = (state: any) => ({
    darkMode: state.app.darkMode,
    sectionInView: state.app.sectionInView
})

export default connect(mapStateToProps, null)(NavItem);