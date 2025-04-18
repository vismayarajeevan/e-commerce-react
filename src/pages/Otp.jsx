


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Mail, Key } from 'lucide-react';
import OtpInput from 'react-otp-input';
import { verifyOtpAPI } from '../services/allAPI';
import { showToast } from '../reusableComponents/Toast';

function Otp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Get email from navigation state
  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      // If no email in state, redirect back
      navigate('/auth');
    }
  }, [location, navigate]);

  // Countdown timer for resend OTP
  useEffect(() => {
    let timer;
    if (countdown > 0 && !canResend) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [countdown, canResend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      showToast('Please enter a 6-digit OTP', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOtpAPI({ email, otp });
      if (response.status === 200) {
        showToast(`${result.data.message}`, "success");
        // Store token and user data (adjust according to your auth flow)
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.userId,
          isAdmin: response.data.isAdmin
        }));
        navigate('/auth'); 
      } else {
        showToast(response.data.message || 'Invalid OTP', 'error');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      showToast(error.response?.data?.message || 'Failed to verify OTP', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    try {
      // Call your resend OTP API here
      // Example: await resendOtpAPI({ email });
      showToast('OTP resent successfully!', 'success');
      setCountdown(30);
      setCanResend(false);
      setOtp('');
    } catch (error) {
      console.error('Resend OTP error:', error);
      showToast('Failed to resend OTP', 'error');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Verification"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90">
          <div className="flex flex-col justify-center h-full px-12 text-white">
            <h2 className="text-4xl font-bold mb-6">Verify Your Email</h2>
            <p className="text-xl">Enter the OTP sent to your email to continue.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <Mail className="w-8 h-8 text-blue-800" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">OTP Verification</h2>
              <p className="text-gray-600 mt-2">
                Enter the OTP sent to <span className="font-medium">{email}</span>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* OTP Field */}
              <div className="flex justify-center">
              <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderInput={(props) => <input {...props} />}

            inputStyle={{
              width: "2.5rem",
              height: "3rem",
              margin: "0 0.5rem",
              fontSize: "1.5rem",
              borderRadius: "5px",
              border: "1px solid #ccc",
              textAlign: "center",
            }}
      renderSeparator={<span>-</span>}
          />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className={`w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-medium rounded-lg hover:from-blue-900 hover:to-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300 ${
                  isLoading || otp.length !== 6 ? 'opacity-75 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Verifying...
                  </>
                ) : (
                  'Verify OTP'
                )}
              </button>
            </form>

            {/* Resend OTP */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Didn't receive OTP?{' '}
              {canResend ? (
                <button
                  onClick={handleResendOtp}
                  className="font-medium text-blue-800 hover:text-blue-700"
                >
                  Resend OTP
                </button>
              ) : (
                <span className="text-gray-500">
                  Resend OTP in {countdown} seconds
                </span>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;