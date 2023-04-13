import React, {useState} from 'react';
import logoLight from '../../assets/img/logo-light-gray.svg';

import './index.css';
import {readFromStorage} from "../../util/general-utils";
import SendLoginOtp from "./send-login-otp";
import OtpConfirmation from "./otp-confirmation";


function Login() {

    const [phoneNumber, setPhoneNumber] = useState<string>(() => {
        let storageTime = readFromStorage('timeSendCode');
        let phoneNumber = readFromStorage('phoneNumber');
        return !!(phoneNumber && storageTime && (new Date().getTime() - storageTime < 120000)) ?
            (readFromStorage('phoneNumber') ? readFromStorage('phoneNumber') : '') : ''

    });
    const [otpSent, setOtpSent] = useState(() => {
        let storageTime = readFromStorage('timeSendCode');
        let phoneNumber = readFromStorage('phoneNumber');
        return !!(phoneNumber && storageTime && (new Date().getTime() - storageTime < 120000));

    });

    return (
        <>
            <div style={{background: "red", width: '600px'}}>
                {
                    (!otpSent)
                        ? (
                            <>
                                <div style={{height: '170px'}}>
                                    <img src={logoLight} alt={'wayLogo'}
                                         style={{
                                             display: 'block',
                                             width: '140px',
                                             height: '100px',
                                         }}
                                    />
                                </div>
                                <SendLoginOtp/>
                            </>
                        )
                        :
                        <OtpConfirmation/>
                }
            </div>
        </>
    );
}

export default Login;
