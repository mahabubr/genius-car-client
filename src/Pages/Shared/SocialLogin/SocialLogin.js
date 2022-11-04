import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../Contexts/AuthProvider/AuthProvider';

const SocialLogin = () => {

    const { googleSignIn } = useContext(AuthContext)

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    const handleGoogleSingIn = () => {
        googleSignIn()
            .then(result => {
                const user = result.user
                console.log(user);

                const currentUser = {
                    email: user.email
                }

                // Get JWT Token
                fetch('https://genius-car-server-nu.vercel.app/jwt', {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('token', data.token)
                        Navigate(from, { replace: true })
                    })
                    .catch(e => console.log(e.message))

            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <p className='text-center'>
                <button onClick={handleGoogleSingIn} className='btn btn-primary'>Google</button>
            </p>
        </div>
    );
};

export default SocialLogin;