import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SocialLinks from './SocialLinks';
import FormInput from 'components/atoms/FormInput';
import Button from 'components/atoms/Button';
import contactStockImg from '../../../assets/images/stock_img_3.jpg';
import { inputAlpha, inputEmail, inputNum } from 'utils';
import FormTextArea from 'components/atoms/FormTextArea';
import { CiEdit } from "react-icons/ci";

const Footer = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstname: '',
        lastname: '',
        countryCode: '',
        mobile: '',
        messageContent: '',
    });

    const [disableBtn, setDisableBtn] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Validation rules
        const validations = {
            firstname: inputAlpha.test(value),
            lastname: inputAlpha.test(value),
            countryCode: inputNum.test(value) && value.length <= 3,
            mobile: inputNum.test(value) && value.length <= 15,
            email: inputEmail.test(value),
            messageContent: inputAlpha.test(value),
        };

        if (validations[name]) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => { }

    return (
        <footer className='bg-DarkBg3 w-full min-h-screen flex justify-center items-center shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)]' id="Contact">
            <div className='w-full max-w-6xl flex flex-col gap-8'>
                <div className='desktop:py-24 mobile:py-8 w-full py-10 flex flex-col gap-8'>
                    <div className='group w-full min-h-screen pt-16'>
                        <div className='flex mobile:flex-col gap-8 justify-between mobile:justify-start'>
                            <div className='flex flex-col'>
                                <h3 className='text-2xl font-bold text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>
                                    Contact Me
                                </h3>
                                <p className='text-sm mobile:text-xs text-GrayCustom'>
                                   You can react out using the form below or through my Social media platforms - {'(To the right of here -/>)'}
                                </p>
                            </div>

                            <SocialLinks
                                containerStyle="bg-DarkBg3"
                                style='!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex !justify-between w-full'
                                iconStyle='!w-4 !h-4'
                                social
                            />
                        </div>

                        <div className={`bg-NoColor border-4 border-DarkBg8 flex mobile:flex-col w-full h-fit desktop:min-h-[40vh] rounded-lg overflow-hidden p-8 gap-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                            <div className='w-1/2 mobile:w-full h-auto max-h-[60vh] mobile:max-h-[30vh] overflow-hidden rounded-2xl'>
                                <img src={contactStockImg} alt="contactUsImg" className='w-full h-full object-center object-cover object-full' />
                            </div>
                            <form onSubmit={handleSubmit} className='w-1/2 mobile:w-full h-auto flex flex-col gap-5 mobile:p-5'>
                                <div className='flex mobile:flex-col gap-2'>
                                    <FormInput
                                        type='text'
                                        name='firstname'
                                        placeholder='Enter firstname'
                                        label="Firstname"
                                        labelStyle="font-normal text-sm leading-6 text-Black2"
                                        inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                        inputStyle2='w-full !p-3 !border-none text-white'
                                        style='w-full'
                                        value={formData.firstname}
                                        onChange={handleChange}
                                    />

                                    <FormInput
                                        type='text'
                                        name='lastname'
                                        placeholder='Enter lastname'
                                        label="Lastname"
                                        labelStyle="font-normal text-sm leading-6 text-Black2"
                                        inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                        inputStyle2='w-full !p-3 !border-none text-white'
                                        style='w-full'
                                        value={formData.lastname}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className='flex mobile:flex-col gap-2'>
                                    <FormInput
                                        type='text'
                                        name='country_code'
                                        placeholder='xxx'
                                        label="Country Code"
                                        labelStyle="font-normal text-sm leading-6 text-Black2"
                                        inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                        inputStyle2='w-full !p-3 !border-none text-white'
                                        style='w-1/4'
                                        value={formData.countryCode}
                                        onChange={handleChange}
                                    />

                                    <FormInput
                                        type='text'
                                        name='mobile'
                                        placeholder='xx xxxx xxxx'
                                        label="Phone Number"
                                        labelStyle="font-normal text-sm leading-6 text-Black2"
                                        inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                        inputStyle2='w-full !p-3 !border-none text-white'
                                        style='w-3/4'
                                        value={formData.mobile}
                                        onChange={handleChange}
                                    />
                                </div>

                                <FormInput
                                    type='email'
                                    name='email'
                                    placeholder='Email address'
                                    label="Email"
                                    labelStyle="font-normal text-sm leading-6 text-Black2"
                                    inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                    inputStyle2='w-full !p-3 !border-none text-white'
                                    value={formData.email}
                                    onChange={handleChange}
                                />

                                <FormTextArea
                                    name='massage_content'
                                    placeholder='Write us a message'
                                    label="Message/Prayer Request"
                                    labelStyle="font-normal text-sm leading-6 text-Black2"
                                    inputStyle='w-full !bg-DarkBg8 !rounded-lg'
                                    inputStyle2='w-full !p-3 !border-none text-white'
                                    layoutStyle='h-full'
                                    inputContainerStyle='h-full'
                                    rows={3}
                                    icon={<CiEdit className='absolute right-5 top-4 text-white' />}
                                    value={formData.messageContent}
                                    onChange={handleChange}
                                />

                                <Button
                                    btnType='submit'
                                    btnText='Send message'
                                    btnStyle={`px-5 py-2 w-full font-bold text-lg mobile:text-sm bg-NoColor border border-Primary hover:bg-Primary text-Primary hover:text-white rounded-md ${!disableBtn && 'hover:bg-Primary_Accents_3xl border-Primary_Accents_3xl'}`}
                                    disableBtn={disableBtn}
                                    disableBtnStyle={`${disableBtn && 'cursor-not-allowed bg-PrimaryDisabled'}`}
                                    handleClick={() => { }}
                                />
                            </form>
                        </div>
                    </div>

                    <div id='footer' className='flex justify-between items-center gap-5 w-full'>
                        <div className='group flex flex-col justify-start items-start gap-5 w-1/2 mobile:w-full'>
                            <h3 className='text-2xl font-bold text-Secondary group-hover:text-Primary leading-8 transition ease-in-out duration-500'>
                                Subscribe to Our News Letter
                            </h3>
                            <div className='flex mobile:flex-col items-center gap-1 w-full !bg-DarkBg8 mobile:!bg-NoColor rounded-lg p-2'>
                                <FormInput
                                    type='email'
                                    name='email'
                                    placeholder='Enter Email'
                                    style="w-full"
                                    inputStyle='w-full !bg-NoColor mobile:!bg-DarkBg8 !rounded-none !rounded-l-lg mobile:!rounded-lg'
                                    inputStyle2='w-full !p-3 !border-none text-white'
                                    focus='focus:ring-2 focus:ring-Primary'
                                    value={formData.email}
                                    onChange={handleChange}
                                    indicatorStyle='hidden'
                                />
                                <Button
                                    btnType='submit'
                                    btnText='Subscribe'
                                    btnStyle='flex w-fit mobile:w-full px-4 py-3 text-Primary hover:text-white rounded-lg border border-Primary bg-DarkBg8 mobile:bg-Primary hover:bg-Primary hover:border-Primary transition ease-in-out duration-500'
                                    handleClick={() => { }}
                                />
                            </div>
                        </div>
                        <div className='border p-5 subscription'></div>
                    </div>

                    <div className='useful_links_columns grid grid-cols-4 gap-5 '>
                        <div className='border p-5 brand_logo'></div>
                        <div className='border p-5 subscription'></div>
                        <div className='border p-5 brand_logo'></div>
                        <div className='border p-5 subscription'></div>
                    </div>
                </div>

                <SocialLinks
                    containerStyle="bg-DarkBg3 border-t"
                    style='!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex !justify-between w-full'
                    iconStyle='!w-4 !h-4'
                    contact
                    social
                    policies
                />
            </div>
        </footer>
    )
}

export default Footer; 