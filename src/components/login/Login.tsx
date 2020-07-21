import React from 'react';
import Username from './Username';
import Password from './Password';
import Navbar from '../navigation/Navbar';

/**
 * @function  Verify username and password
 * @desc    Sends fetch requests to API to verify user
 */
const Login: React.FC = () => {

return (
    <div>
        <Navbar/>
        <p>Finding you a deep connection...</p>
        <div>
            <Username/>
            <Password/>
            <button onClick={() => {console.log('sign up button click')}}> Sign Up </button>
            <button onClick={() => {console.log('Login button click')}}> Log In </button>
        </div>
    </div>
);


};

export default Login;