import React from 'react';
import Username from './Username';
import Password from './Password';


/**
 * @function  Verify username and password
 * @desc    Sends fetch requests to API to verify user
 */

 // show / reroute to sign-up form
 // show username/password text fields, 
const Login: React.FC = () => {
  return (
    <div>
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