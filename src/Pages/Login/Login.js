import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../assets/images/login/login.svg'

const Login = () => {

    const handleLogin = (event) => {
        event.preventDefault()
    }

    return (
        <div className="hero w-full my-24">
            <div className="hero-content gap-24 flex-col lg:flex-row grid md:grid-cols-2">
                <div className="text-center lg:text-left">
                    <img src={img} alt="" className='w-3/4' />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <h1 className="text-5xl font-bold text-center">Login</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="/" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input type="submit" value="Login" className="btn btn-primary" />
                        </div>
                    <p className='text-center mt-3'>New To Genius Car ? <Link className='text-orange-600 font-bold' to='/signup'>Sign Up</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;