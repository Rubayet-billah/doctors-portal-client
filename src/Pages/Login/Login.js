import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider';
import useToken from '../../hooks/useToken/useToken';

const Login = () => {
    const { loginUser } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loginUserEmail, setLoginUserEmail] = useState('');
    const [token] = useToken(loginUserEmail)

    const location = useLocation();
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate()

    if (token) {
        navigate(from, { replace: true })
    }

    const handleLogin = (data) => {
        loginUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                setLoginUserEmail(data.email)
            })
            .catch(err => console.error(err))

        // console.log(errors)
    }

    return (
        <section className='md:h-[700px] flex justify-center items-center'>
            <form onSubmit={handleSubmit(handleLogin)} className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl text-center">Login</h2>
                    <label htmlFor="">Email</label>
                    <input type="email" {...register('email', { required: 'Email is required' })} placeholder="Email" className="input input-bordered w-full mb-2" />
                    {errors?.email && <p className='text-red-500'>{errors.email.message}</p>}
                    <label htmlFor="">Password</label>
                    <input type="password" {...register('password', { required: 'Password is required' })} placeholder="Password" className="input input-bordered w-full mb-2" />
                    {errors?.password && <p className='text-red-500'>{errors.password.message}</p>}
                    <div className="card-actions justify-end">
                        <input type="submit" value='Login' className="btn btn-accent w-full" />
                    </div>
                    <div className="divider">OR</div>
                    <button className='btn btn-outline'>Google Sign In</button>
                </div>
            </form>
        </section>
    );
};

export default Login;