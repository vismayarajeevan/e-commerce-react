import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, UserPlus, User, Mail, Lock, ShoppingBag } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { registerAPI } from '../services/allAPI';
import { showToast } from '../reusableComponents/Toast';



function Auth() {
  const [isSignup, setIsSignup] = useState(false); 
  
  const {login} = useContext(AuthContext)
  const navigate = useNavigate();

   // state for login
   const [loginFields, setLoginFields] = useState({
    email: "",
    password: "",
  });

  console.log(loginFields);
  
  
  const [signupFields, setSignupFields] = useState({
    userName: "",
    email: "",
    password: "",

  });
  console.log(signupFields);
  

    // stae for error messages
    const [errors, setErrors] = useState({
      userName: "",
      email: "",
      password: "",
    });

  // validate username
  const validateUserName = (userName) => {
    const usernameRegex = /^[A-Za-z]+$/;
    return usernameRegex.test(userName.trim());
  };

  // validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // function for overall validation and give error message
  const handleValidation = () => {
    let valid = true;
    let newErrors = {};

    if (isSignup) {
      if (!validateUserName(signupFields.userName)) {
        valid = false;
        newErrors.userName = "Username must contain only alphabets.";
      } else if (signupFields.userName.trim().length < 3) {
        valid = false;
        newErrors.userName = "Username must be at least 3 characters long.";
      }

      if (!signupFields.password ) {
        valid = false;
        newErrors.password =
          "Password is required.";
      } 
    }

    // for email
    const email = isSignup ? signupFields.email : loginFields.email;
    if (!validateEmail(email)) {
      valid = false;
      newErrors.email = "Invalid email format.";
    }

   

    // check all fields are filled in login page
    if (!email || (!loginFields.password && !isSignup)) {
      valid = false;
      newErrors.password = "All fields are required.";
    }

    // Update the errors state
    setErrors(newErrors);
    return valid;
  };

    // register
    const handleRegister = async (e) => {
      e.preventDefault();
      
      if (handleValidation()) {
        try {
          const result = await registerAPI(signupFields);
          console.log("register",result);
          
          
          if (result.status === 200) {
            
              showToast(`${result.data.message}`, "success");

              navigate('/Otp', { 
                state: { 
                  email: signupFields.email 
                } 
              });
            }
           else {
            showToast(`${result.response.data.message}`, "error");
          }
        } catch (error) {
          console.error("Registration error:", error);

          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Something went wrong!";
  
          showToast(errorMessage, "error");
        }
      }
    };

  const handleLogin = () => {
    login(); // Set user as logged in
    navigate('/'); // Redirect to home
  };

    // function for submit form
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (isSignup) {
        handleRegister(e);
      } else {
        handleLogin(e);
      }
    };

  const handleToggle = () => setIsSignup(!isSignup);

  

  return (
    <div className="min-h-screen flex">
      {/* Image Section */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
          alt="Shopping"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-indigo-900/90">
          <div className="flex flex-col justify-center h-full px-12 text-white">
            <h2 className="text-4xl font-bold mb-6">{isSignup ? 'Join Our Store' : 'Welcome Back'}</h2>
            <p className="text-xl">{isSignup ? 'Create an account and start shopping today.' : 'Sign in to your account'}</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex items-center justify-center p-5 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="px-8 py-12">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                <ShoppingBag className="w-8 h-8 text-blue-800" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">{isSignup ? 'Create an Account' : 'Welcome Back'}</h2>
              <p className="text-gray-600 mt-2">{isSignup ? 'Sign up to get started' : 'Please sign in to your account'}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username Field (Only for Signup) */}
              {isSignup && (
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="username"
                      type="text"
                      required={isSignup}
                      value={signupFields.userName}
                      onChange={(e) => setSignupFields({ ...signupFields, userName: e.target.value })}
                      className="appearance-none block w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your username"
                    />
                    <User className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <input
                    id="email"
                    type="email"
                    required
                    value={isSignup ? signupFields.email : loginFields.email}
                    onChange={(e) => 
                      isSignup
                      ? setSignupFields({ ...signupFields, email: e.target.value })
                      : setLoginFields({ ...loginFields, email: e.target.value })                    }
                    className="appearance-none block w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                  <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    type="password"
                    required
                    value={isSignup ? signupFields.password : loginFields.password}
                    onChange={(e) => 
                      isSignup
                      ? setSignupFields({
                          ...signupFields,
                          password: e.target.value,
                        })
                      : setLoginFields({ ...loginFields, password: e.target.value })                    }
                    className="appearance-none block w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                  <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex justify-center items-center px-4 py-3 bg-gradient-to-r from-blue-800 to-indigo-900 text-white font-medium rounded-lg hover:from-blue-900 hover:to-indigo-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              onClick={handleSubmit}
              
              >
                {isSignup ? <UserPlus className="w-5 h-5 mr-2" /> : <LogIn className="w-5 h-5 mr-2" />}
                {isSignup ? 'Sign Up' : 'Sign In'}
              </button>
            </form>

            {/* Toggle Between Login & Signup */}
            <p className="mt-6 text-center text-sm text-gray-600">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                className="font-medium text-blue-800 hover:text-blue-700"
                onClick={handleToggle}
              >
                {isSignup ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;


