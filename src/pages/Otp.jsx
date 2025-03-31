import React, { useState } from 'react';
import { Mail, Key } from 'lucide-react';
import OtpInput from 'react-otp-input';

function Otp() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('OTP verification attempt with:', { email, otp });
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
              <p className="text-gray-600 mt-2">Enter the OTP sent to your email.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* OTP Field */}
              <div>

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
                className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-medium rounded-lg hover:from-blue-900 hover:to-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              >
                Verify OTP
              </button>
            </form>

            {/* Resend OTP */}
            <p className="mt-6 text-center text-sm text-gray-600">
              Didn't receive OTP?{' '}
              <button className="font-medium text-blue-800 hover:text-blue-700">
                Resend OTP
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Otp;