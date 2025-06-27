import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImg from '../../../src/assets/others/authentication.png';
import imgLogin from '../../../src/assets/others/authentication2.png';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import SocialLogin from '../../components/SocialLogin/SocialLogin';

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;
        console.log("User created:", loggedUser);

        updateUserProfile(data.name, data.photoUrl)
          .then(() => {
            console.log('User profile info updated');

            // create user entry in the database
            const userInfo = {
              name: data.name,
              email: data.email
            }
            axiosPublic.post('/users',userInfo)
            .then(res => {
              if(res.data.insertedId){
                console.log("User added to the database");

                
            reset();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Sign Up Successfully",
              showConfirmButton: false,
              timer: 1500
            });
            navigate('/');


              }
            })

          })
          .catch(error => {
            console.error("Profile update failed:", error);
          });
      })
      .catch(error => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <section>
      <Helmet>
        <title>@ZubaerQ | SignUp</title>
      </Helmet>

      <div
        className="hero bg-base-200 min-h-screen"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="hero-content flex flex-col md:flex-row">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Sign Up now!</h1>
            <img className="py-6 w-[648px]" src={imgLogin} alt="" />
          </div>
          <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <fieldset className="fieldset">
                <label className="fieldset-label">Name</label>
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="input"
                  placeholder="Full Name"
                />
                {errors.name && <span className='text-red-600'>This Name field is required</span>}

                <label className="fieldset-label">Photo URL</label>
                <input
                  {...register("photoUrl", { required: true })}
                  type="text"
                  className="input"
                  placeholder="Drop Here Photo URL"
                />
                {errors.photoUrl && <span className='text-red-600'>This Photo URL field is required</span>}

                <label className="fieldset-label">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="input"
                  placeholder="Email"
                />

                <label className="fieldset-label">Password</label>
                <input
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$%&*])(?=.*[0-9])(?=.*[a-z])/
                  })}
                  type="password"
                  className="input"
                  placeholder="Password"
                />
                {errors.password?.type === 'required' && <p className='text-red-600'>Password is required</p>}
                {errors.password?.type === 'minLength' && <p className='text-red-600'>Password must be at least 6 characters</p>}
                {errors.password?.type === 'maxLength' && <p className='text-red-600'>Password must be less than 20 characters</p>}
                {errors.password?.type === 'pattern' && <p className='text-red-600'>Password must contain uppercase, lowercase, number and special character</p>}

                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <input
                  type="submit"
                  className="btn btn-neutral btn-outline mt-4 bg-slate-400 text-pink-700 border-b-4 border-yellow-600"
                  value="Sign Up"
                />
              </fieldset>
            </form>
            <small>
              Already have an Account? 
              <Link to="/login">
                <span className='underline pl-1 text-blue-900 font-bold text-1xl'>Login</span>
              </Link>
            </small>
            <SocialLogin></SocialLogin>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
