
import React, { useContext, useEffect, useRef, useState } from 'react';
import imgLogin from '../../../src/assets/others/authentication2.png';
import backgroundImg from '../../../src/assets/others/authentication.png';
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
// import app from '../../firebase/firebase.config';
import emailjs from 'emailjs-com';
import { app } from '../../firebase/firebase.config';


const auth = getAuth(app); // Firebase auth instance

const AdminDefaultLogin = () => {
  const captchaRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const { signIn } = useContext(AuthContext);

  const location = useLocation();
  const from = location.state?.form?.pathname || "/dashboard/adminHome";


  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
        navigate(from, { replace: true });

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successfully ✅",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/dashboard/adminHome")
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Login Failed 😢",
          text: error.message,
        });
      });
  };

  const handleForgotPassword = async () => {
    const email = prompt("Please enter your email to reset password:");
  
    if (!email) return;
  
    // Step 1: Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
    // Step 2: Send OTP to email using EmailJS
    try {
      await emailjs.send(
        'your_service_id',
        'your_template_id',
        {
          to_email: email,
          otp: otp,
        },
        'your_public_key'
      );
  
      const userEnteredOtp = prompt("Enter the 6-digit OTP sent to your email:");
  
      if (userEnteredOtp === otp) {
        // Step 3: Send Firebase reset email
        sendPasswordResetEmail(auth, email)
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Password Reset Email Sent ✉️",
              text: "Check your email inbox or spam folder.",
            });
          })
          .catch((error) => {
            console.error(error);
            Swal.fire({
              icon: "error",
              title: "Failed to Send Email ❌",
              text: error.message,
            });
          });
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP ❌",
          text: "Please try again.",
        });
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      Swal.fire({
        icon: "error",
        title: "Error sending OTP ❌",
        text: error.message,
      });
    }
  };
  

  return (
    <section>
      <Helmet>
        <title>@ZubaerQ | Login</title>
      </Helmet>

      <div
        className="hero bg-base-200 min-h-screen"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="hero-content flex flex-col md:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold"> Admin Login now!</h1>
            <img className="py-6 w-[648px]" src={imgLogin} alt="Login" />
          </div>
          <div className="card  bg-base-100 w-full max-w-sm shadow-2xl">
            <form onSubmit={handleLogin} className="card-body ">
              <fieldset className="fieldset">
                <label className="fieldset-label">Email</label>
                <input
                  type="email"
                  defaultValue="Testedddd@gmail.com"
                  name="email"
                  className="input"
                  placeholder="Email"
                  required
                />
                <label className="fieldset-label">Password</label>
                <input
                  type="password"
                  defaultValue="Ll!123jk7654"
                  name="password"
                  className="input"
                  placeholder="Password"
                  required
                />
               
                <div>
                 
                </div>
                <input
                 
                  type="submit"
                  className="btn btn-neutral btn-outline mt-4 bg-slate-400 text-pink-700 border-b-4 border-yellow-600"
                  value="Login"
                />
              </fieldset>
            </form>
            {/* <small>
              New Here? <Link to="/signup"><span className='underline pl-1  text-blue-900 font-bold text-1xl'>SignUp</span></Link>
            </small> */}
            {/* <SocialLogin></SocialLogin> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDefaultLogin;
