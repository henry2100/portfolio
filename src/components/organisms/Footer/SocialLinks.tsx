import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiLinkedin, FiYoutube } from 'react-icons/fi';
import { GiHeartburn } from "react-icons/gi";

const SocialLinks = (props) => {

    return (
        <div className={`${props.containerStyle} flex justify-center items-center`}>
            <div className={`${props.style} max-w-6xl desktop:border-t-2 desktop:border-Background pt-10 flex desktop:flex-row mobile:flex-col justify-between`}>
                {props.contact &&
                    <span className={`${props.contactStyle} group flex desktop:flex-row mobile:flex-col gap-5 mobile:border-b-none mobile:border-Background mobile:py-4 mobile:justify-evenly`}>
                        <NavLink 
                            to="https://www.gmail.com/henryadedugba@gmail.com"
                            className='flex gap-2 mobile:justify-center items-center ml-2 cursor-pointer text-sm font-normal leading-6 text-center transition ease-in duration-250 text-Background group-hover:text-Primary'
                        >
                            henryadedugba@gmail.com
                            <GiHeartburn className='w-5 h-5 text-Background group-hover:text-Primary transition ease-in duration-250'/>
                        </NavLink>
                    </span>
                }
                {props.policies &&
                    <span className={`${props.policyStyle} flex desktop:flex-row mobile:flex-col gap-5 mobile:border-b-2 mobile:border-Background mobile:py-4 mobile:justify-evenly`}>
                        <p className='cursor-default text-sm font-normal leading-6 text-center hover:transition-all text-Background'>
                            All rights reserved
                        </p>
                        <NavLink to="">
                            <p className="cursor-pointer text-sm font-normal leading-6 text-center transition ease-in duration-250 text-Background hover:text-Primary">Privacy Policy</p>
                        </NavLink>
                        <NavLink to="">
                            <p className="cursor-pointer text-sm font-normal leading-6 text-center transition ease-in duration-250 text-Background hover:text-Primary">Terms of Service</p>
                        </NavLink>
                        <NavLink to="">
                            <p className="cursor-pointer text-sm font-normal leading-6 text-center transition ease-in duration-250 text-Background hover:text-Primary">Cookies Settings</p>
                        </NavLink>
                    </span>
                }
                {props.social &&
                    <span className={`${props.iconWrapperStyle} flex gap-5 mobile:py-4 mobile:justify-evenly`}>
                        <NavLink to="">
                            <FiFacebook className={`${props.iconStyle} text-Background hover:text-Primary w-6 h-6 hover:scale-125 transition ease-in-out duration-250`} />
                        </NavLink>
                        <NavLink to="">
                            <FiInstagram className={`${props.iconStyle} text-Background hover:text-Primary w-6 h-6 hover:scale-125 transition ease-in-out duration-250`} />
                        </NavLink>
                        <NavLink to="">
                            <FiTwitter className={`${props.iconStyle} text-Background hover:text-Primary w-6 h-6 hover:scale-125 transition ease-in-out duration-250`} />
                        </NavLink>
                        <NavLink to="">
                            <FiLinkedin className={`${props.iconStyle} text-Background hover:text-Primary w-6 h-6 hover:scale-125 transition ease-in-out duration-250`} />
                        </NavLink>
                        <NavLink to="">
                            <FiYoutube className={`${props.iconStyle} text-Background hover:text-Primary w-6 h-6 hover:scale-125 transition ease-in-out duration-250`} />
                        </NavLink>
                    </span>
                }
            </div>
        </div>
    )
}

export default SocialLinks