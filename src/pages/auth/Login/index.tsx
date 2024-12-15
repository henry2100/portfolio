import Alert from 'components/atoms/Alert';
import Button from 'components/atoms/Button';
import FormInput from 'components/atoms/FormInput';
import PageTitle from 'components/atoms/PageTitle';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BASE_URL, postRequest } from 'services/http';
import { BiShow, BiHide } from "react-icons/bi";
import { connect } from 'react-redux';
import { setLoginStatus, storeUserAuthRes } from '../../../redux/auth/auth.action';
import Spinner from 'components/atoms/Spinner';

const Login = (props) => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    const iconStyle = `w-5 h-5 text-Secondary hover:text-Primary absolute right-5 cursor-pointer`;

    const headers = {
        "Content-Type": "application/json"
    };

    const formComplete = email !== '' && password !== '';
    const disableBtn = !formComplete || loading;

    const userVerification = async (reqData: any) => {
        setLoading(true);
        const res = await postRequest(`${BASE_URL}users/user/login`, headers, reqData);

        if (res?.status === 200) {
            setLoading(false);
            Alert('success', res?.data.message);
            props.storeUserAuthRes(res?.data);
            props.setLoginStatus(true);
            navigate('/dashboard/home');
        } else {
            setLoading(false);
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();

        if (formComplete) {
            userVerification({
                email: email,
                password: password
            });
        } else {
            Alert('error', 'Please, fill all fields');
        }
    }

    return (
        <div className='w-full h-full'>
            <PageTitle
                pageTitle='Login'
                pageTitleStyle='font-semibold !text-3xl tablet:!text-xl uppercase tracking-normal'
                subTitle='Welcome back, please enter your details'
                subTitleStyle='!text-[16px] leading-7 !text-Secondary'
                style='gap-1'
            />

            <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
                <FormInput
                    type='email'
                    name='email'
                    placeholder='Email'
                    label='Email'
                    labelStyle="font-normal text-sm leading-6 text-Secondary"
                    style="w-full"
                    inputStyle='w-full border !bg-white'
                    inputStyle2='w-full p-3'
                    indicatorStyle='hidden'
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <FormInput
                    type={showPassword ? 'text' : 'password'}
                    placeholder={showPassword ? 'Password' : 'xxxxx'}
                    label='Password'
                    labelStyle="font-normal text-sm leading-6 text-Secondary"
                    style="w-full"
                    inputStyle='w-full border !bg-white'
                    inputStyle2='w-full p-3'
                    indicatorStyle='hidden'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    icon={showPassword
                        ? <BiShow className={iconStyle} onClick={() => setShowPassword(prevState => !prevState)} />
                        : <BiHide className={iconStyle} onClick={() => setShowPassword(prevState => !prevState)} />
                    }
                />
                <span
                    className='text-sm mobile:xs font-semibold text-Primary hover:underline cursor-pointer ml-1'
                    onClick={() => navigate('/auth/forgot_password')}
                >
                    Forgot Password?
                </span>
                <Button
                    btnType='submit'
                    btnText={loading
                        ? <Spinner
                            text='Loading...'
                            textStyle='font-bold text-lg mobile:text-sm text-white'
                        />
                        : 'Login'}
                    btnStyle='bg-Primary hover:bg-Primary_Accents_md transition ease-in-out duration-500 text-white p-3 font-semibold rounded-md text-sm leading-5 flex-row-reverse'
                    disableBtn={disableBtn}
                    disableBtnStyle="bg-Primary_Accents_xs hover:Primary_Accents_xs cursor-not-allowed"
                    handleClick={() => { }}
                />
                <div className='flex flex-col gap-1 justify-center items-center'>
                    <p className={`${props.darkMode ? 'text-Primary_200' : 'text-SecondaryAccent6'} font-normal text-sm mobile:xs`}>No account yet?
                        <span
                            className='font-semibold text-Primary hover:underline cursor-pointer ml-1'
                            onClick={() => navigate('/auth/register')}
                        >
                            Sign up
                        </span>
                    </p>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    pms_client_user_auth_res: state.auth.pms_client_user_auth_res
})

const mapDispatchToProps = (dispatch: any) => ({
    storeUserAuthRes: (data: any[]) => dispatch(storeUserAuthRes(data)),
    setLoginStatus: (data: boolean) => dispatch(setLoginStatus(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);