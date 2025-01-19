import React, { useCallback, useRef, useState } from 'react';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import FormTextArea from 'components/atoms/FormTextArea';
import SocialLinks from 'components/organisms/Footer/SocialLinks';
import { CiEdit } from 'react-icons/ci';
import contactStockImg from '../../../assets/images/stock_img_3.jpg';
import { inputAlpha, inputEmail, inputNum, validteEmail } from 'utils';
import { BASE_URL, postRequest } from 'services/http';
import Alert from 'components/atoms/Alert';

const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [country, setCountry] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [reqMssg, setReqMssg] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const formComplete = firstname && lastname && country && mobile && email && reqMssg;
    const disableBtn = !formComplete || loading;

    const headers = {
        "Content-Type": "application/json"
    };

    const resetForm = () => {
        setFirstname('');
        setLastname('');
        setCountry('');
        setMobile('');
        setEmail('');
        setReqMssg('');
    };

    const handleSaveMessage = useCallback(async (reqBody: any) => {
        setLoading(true);
        const res = await postRequest(`${BASE_URL}contact_requests/save_req`, headers, reqBody);

        if (res?.status === 200) {
            setLoading(false);
            Alert('success', res?.data.message);
            resetForm();
        } else {
            setLoading(false);
        }
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();

        const reqData = {
            firstname: firstname,
            lastname: lastname,
            country: country,
            mobile: mobile,
            email: email,
            message: reqMssg
        }

        if (formComplete) {
            if (validteEmail.test(email)) {
                return handleSaveMessage(reqData);;
            } else {
                return setEmailErr('Please enter a valid email');
            }
        } else {
            return Alert('error', 'Please fill all fields')
        }
    }

    return (
        <div className='max-w-6xl w-full mobile:!p-5 tablet:p-8'>
            <div className='flex mobile:flex-col gap-8 justify-between mobile:justify-start'>


                <div className='flex flex-col'>
                    <span className='flex flex-col p-5 mobile:p-0 font-bold text-5xl mobile:text-2xl text-Secondary tablet:text-Primary uppercase group-hover:text-Primary'>
                        Contact Me
                    </span>
                    <p className='text-sm mobile:text-xs text-GrayCustom'>
                        You can react out using the form below or through my Social media platforms
                    </p>
                </div>

                <SocialLinks
                    containerStyle="bg-DarkBg3"
                    style='!border-none !py-4 mobile:!py-2 mobile:!px-5 !flex !justify-between w-full'
                    iconStyle='!w-4 !h-4'
                    social
                />
            </div>

            <div className={`bg-NoColor flex mobile:flex-col w-full h-fit desktop:min-h-[40vh] max-h-[60vh] mobile:max-h-fit mt-5 gap-5 mobile:gap-8 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)]`}>
                <div className='w-1/2 mobile:!w-full tablet:w-1/3 h-auto max-h-[60vh] mobile:max-h-[15vh] rounded-2xl mobile:rounded-md overflow-hidden'>
                    <img src={contactStockImg} alt="contactUsImg" className='w-full h-full object-center object-cover object-full opacity-70' />
                </div>
                <form onSubmit={handleSubmit} className='w-1/2 mobile:!w-full tablet:w-2/3 h-auto flex flex-col gap-5'>
                    <div className='flex gap-3'>
                        <FormInput
                            type='text'
                            name='firstname'
                            placeholder='Enter firstname'
                            label="Firstname"
                            labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                            inputStyle='w-full !bg-Primary_Accents_sm !rounded-lg'
                            inputStyle2='w-full !p-3 !border-none text-white'
                            style='w-full'
                            value={firstname}
                            onChange={e => inputAlpha.test(e.target.value) && setFirstname(e.target.value)}
                        />

                        <FormInput
                            type='text'
                            name='lastname'
                            placeholder='Enter lastname'
                            label="Lastname"
                            labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                            inputStyle='w-full !bg-Primary_Accents_sm !rounded-lg'
                            inputStyle2='w-full !p-3 !border-none text-white'
                            style='w-full'
                            value={lastname}
                            onChange={e => inputAlpha.test(e.target.value) && setLastname(e.target.value)}
                        />
                    </div>

                    <div className='flex gap-3'>
                        <FormInput
                            type='text'
                            name='country'
                            placeholder='Country'
                            label="Country"
                            labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                            inputStyle='w-full !bg-Primary_Accents_sm !rounded-lg'
                            inputStyle2='w-full !p-3 !border-none text-white'
                            style='w-1/4 mobile:w-2/5'
                            value={country}
                            onChange={e => inputAlpha.test(e.target.value) && setCountry(e.target.value)}
                        />

                        <FormInput
                            type='text'
                            name='mobile'
                            placeholder='xx xxxx xxxx'
                            label="Phone Number"
                            labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                            inputStyle='w-full !bg-Primary_Accents_sm !rounded-lg'
                            inputStyle2='w-full !p-3 !border-none text-white'
                            style='w-3/4 mobile:w-3/5'
                            value={mobile}
                            onChange={e => inputNum.test(e.target.value) && e.target.value.length <= 11 && setMobile(e.target.value)}
                            required
                        />
                    </div>

                    <FormInput
                        type='email'
                        name='email'
                        placeholder='Email Address'
                        label="Email"
                        labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                        inputStyle='w-full !bg-Primary_Accents_sm !rounded-lg'
                        inputStyle2='w-full !p-3 !border-none text-white'
                        value={email}
                        validationErr={emailErr}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <FormTextArea
                        name="reqMssg"
                        placeholder="Write us a message"
                        label="Message"
                        labelStyle="font-normal text-sm leading-6 text-Primary_Accents_xl"
                        inputStyle="w-full !bg-Primary_Accents_sm !rounded-lg"
                        inputStyle2="w-full !p-3 !border-none text-white"
                        layoutStyle="h-full"
                        inputContainerStyle="h-full"
                        rows={4}
                        icon={<CiEdit className="absolute right-5 top-4 text-white" />}
                        value={reqMssg}
                        onChange={e => setReqMssg(e.target.value)}
                        required
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
    )
}

export default Contact