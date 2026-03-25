import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { auth } from '../components/firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { BsFillShieldLockFill, BsTelephoneFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import OtpInput from 'otp-input-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f4f4f4;
`;

const Card = styled.div`
  background-color: #fff;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.5rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 1rem;

  &:hover {
    background-color: #2980b9;
  }
`;

const OtpVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [otp, setOtp] = useState('');
    const [final, setFinal] = useState(null);
    const [method, setMethod] = useState('email'); // Default to email verification
    const [showOtpInput, setShowOtpInput] = useState(false); // State to show/hide OTP input
    const [loading, setLoading] = useState(false);
    const [ph, setPh] = useState('');

    const user = JSON.parse(localStorage.getItem('user'));
    const role = user?.role || 'user';
    const userId = user?._id;

    useEffect(() => {},[])

    useEffect(() => { 
        const queryParams = new URLSearchParams(location.search);
        const methodParam = queryParams.get('method');
        if (methodParam) {
            setMethod(methodParam);
        }
    }, [location]);

    const onCaptchVerify = () => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                size: 'invisible',
                callback: (response) => {
                    // reCAPTCHA solved, allow signInWithPhoneNumber.
                    console.log('recaptcha resolved..')
                },
                'expired-callback': () => {
                    console.error('reCAPTCHA expired, please try again.');
                },
            });
        }
    };

    const handleVerifyOtp = async () => {
        try {
            setLoading(true);

            if (method === 'email') {
                await axios.post('http://localhost:3000/api/users/email/verifyOtp', {
                    role: role,
                    id: userId,
                    otp
                });
                toast.success('OTP verified successfully');
                localStorage.setItem('user', JSON.stringify({ ...user, emailVerified: true }));
            } else {
                if (!otp || !final) {
                    toast.error('Invalid OTP. Please enter the correct OTP.');
                    return;
                }

                try {
                    const res = await final.confirm(otp);
                    console.log('Phone verification response:', res);

                    await axios.post('http://localhost:3000/api/users/phone/verifyOtp', {
                        role: role,
                        id: userId,
                        otp
                    });
                    toast.success('Phone number verified successfully');
                    localStorage.setItem('user', JSON.stringify({ ...user, numberVerified : true }));
                } catch (error) {
                    console.error('Phone OTP verification error:', error);
                    if (error.code === 'auth/invalid-verification-code') {
                        toast.error('Invalid OTP. Please try again.');
                    } else if (error.code === 'auth/session-expired') {
                        toast.error('OTP expired. Request a new one.');
                    } else {
                        toast.error('Phone verification failed. Please try again.');
                    }
                    return;
                }
            }
            
            navigate(`/profile/${userId}`);
        } catch (error) {
            console.error('OTP verification error:', error);

            if (error.response && error.response.data) {
                toast.error(error.response.data.message || 'Failed to verify OTP');
            } else {
                toast.error('Something went wrong. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    const sendMobileOtp = () => {
        let num = '+' + ph;
        if (!ph || ph.length < 10) {
            toast.error('Invalid phone number');
            return;
        }
    
        setLoading(true);
    
        // Clear any existing reCAPTCHA and reinitialize
        if (window.recaptchaVerifier) {
            window.recaptchaVerifier.clear();
        }
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        signInWithPhoneNumber(auth, num, appVerifier)
            .then((confirmationResult) => {
                setFinal(confirmationResult); // Store new session result
                setLoading(false);
                setShowOtpInput(true);
                toast.success('OTP sent successfully!');
            })
            .catch((error) => {
                console.error('OTP send error:', error);
                setLoading(false);
                toast.error('Failed to send OTP. Check Firebase settings.');
            });
    };
    

    return (
        <Container>
            <Card>
                <Title>Verify OTP</Title>
                <div id="recaptcha-container"></div>
                {method === 'mobile' && !showOtpInput && (
                    <>
                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                            <BsTelephoneFill size={30} />
                        </div>
                        <label
                            htmlFor=""
                            className="font-bold text-xl text-center"
                        >
                            Verify your phone number
                        </label>
                        <PhoneInput country={'in'} value={ph} onChange={setPh} />
                        <Button onClick={sendMobileOtp}>
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>Send code via SMS</span>
                        </Button>
                    </>
                )}
                {showOtpInput && (
                    <>
                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                            <BsFillShieldLockFill size={30} />
                        </div>
                        <label
                            htmlFor="otp"
                            className="font-bold text-xl text-center"
                        >
                            Enter your OTP
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="opt-container "
                        ></OtpInput>
                        <Button onClick={handleVerifyOtp}>
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </Button>
                    </>
                )}
                {method === 'email' && (
                    <>
                        <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                            <BsFillShieldLockFill size={30} />
                        </div>
                        <label
                            htmlFor="otp"
                            className="font-bold text-xl text-center"
                        >
                            Enter your OTP
                        </label>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            autoFocus
                            className="opt-container "
                        ></OtpInput>
                        <Button onClick={handleVerifyOtp}>
                            {loading && (
                                <CgSpinner size={20} className="mt-1 animate-spin" />
                            )}
                            <span>Verify OTP</span>
                        </Button>
                    </>
                )}
            </Card>
        </Container>
    );
};

export default OtpVerification;