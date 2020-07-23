import React, { useState } from 'react';
import { Link as RouteLink, withRouter } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux';
import { signupAction } from '../../actions/basicActions';
/**
 * @function  Verify username and password
 * @desc    Sends fetch requests to API to verify user
 */

const useStyles = makeStyles(theme => ({
  
  submit: {
    margin: theme.spacing(3, 0, 2),
    color: '#333',
    '&:hover': {
      backgroundColor: '#026670',
      color: '#eee'
    }
  },
  root: {
    '& .MuiInputBase-root': {
      height: '50px'
    },
    '& .MuiInputLabel-outlined': {
      top: '-2px',
      fontSize: '85%'
    },
    '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
      top: '0',
      left: '10px',
      color: '#777'
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#026670'
    }
  }
}));


const SignUp: React.FC = props => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [email, setEmail] = useState('');

  const [invalidEmailMsg, setInvalidEmailMsg] = useState('');
  const [invalidUsernameMsg, setInvalidUsernameMsg] = useState('');
  const [invalidPasswordMsg, setInvalidPasswordMsg] = useState('');
  const [invalidVerifyPasswordMsg, setInvalidVerifyPasswordMsg] = useState('');

  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidVerifyPassword, setInvalidVerifyPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch(e.target.name) {
      case 'email':
        setEmail(inputVal);
        break;
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
      case 'passwordVerify':
        setPasswordVerify(inputVal);
        break;
    }
  }

  

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    // Reset Error Validation
    setInvalidEmailMsg('');
    setInvalidUsernameMsg('');
    setInvalidPasswordMsg('');
    setInvalidVerifyPasswordMsg('');
    setInvalidEmail(false);
    setInvalidUsername(false);
    setInvalidPassword(false);
    setInvalidVerifyPassword(false);

    if (email === '') {
      setInvalidEmail(true);
      setInvalidEmailMsg('No Email Entered');
      return;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setInvalidEmail(true);
      setInvalidEmailMsg('Invalid Email Format');
      return;
    } else {
      setInvalidEmail(false);
    }

    if (username === '') {
      setInvalidUsername(true);
      setInvalidUsernameMsg('No Username Entered');
      return;
    } else if (!/^[\w\s-]{4,15}$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Must Be 4 - 15 Characters Long');
      return;
    } else if (!/^[\w-]+$/i.test(username)) {
      setInvalidUsername(true);
      setInvalidUsernameMsg('Cannot Contain Spaces or Special Characters');
      return;
    } else {
      setInvalidUsername(false);
    }

    if (password === '') {
      setInvalidPassword(true);
      setInvalidPasswordMsg('No Password Entered');
      return;
    } else if (password.length < 8) {
      setInvalidPassword(true);
      setInvalidPasswordMsg('Minimum 8 Characters');
      return;
    } 
    // else if (
    //   !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/i.test(
    //     password
    //   )
    // ) {
    //   setInvalidPassword(true);
    //   setInvalidPasswordMsg('Minimum 1 Letter, Number, and Special Character');
    //   return;
    // } 
    else if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidPassword(false);
    }

    if (password !== passwordVerify) {
      setInvalidPassword(true);
      setInvalidVerifyPassword(true);
      setInvalidPasswordMsg('Verification Failed');
      setInvalidVerifyPasswordMsg('Verification Failed');
      setPasswordVerify('');
      return;
    } else {
      setInvalidVerifyPassword(false);
    }

    if(!invalidUsername && !invalidPassword && !invalidEmail && !invalidVerifyPassword) {
      
      const body = JSON.stringify({
        username,
        email,
        password,
      });
      fetch(`/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      })
      .then(res => res.json())
      .then(data =>{
        if (data.message === 'username exists') {
          setInvalidUsername(true);
          setInvalidUsernameMsg('Username Taken');
        } else {
          const userId = data.newUser.id;
          dispatch(signupAction(username, email, password, userId));
        }
      })
      .catch(err => console.log('err in signup submit', err));
      
      // console.log("answer");
      // console.log(answer);
      // signupAction(username, email, password);
      // newUserIsCreated(username, email, password).then(userCreated => {
    //   if (userCreated === 'Success') {

    //     props.history.push('/');
    //   } else {
    //     switch (userCreated) {
    //       case 'Email Taken':
    //         setInvalidEmail(true);
    //         setInvalidEmailMsg('Email Taken');
    //         break;
    //       case 'Username Taken':
    //         setInvalidUsername(true);
    //         setInvalidUsernameMsg('Username Taken');
    //         break;
    //     }
    //   }
    }
  
  }

  return (
      <div className="signup-form">
          <p>Sign up for an account</p>
          <div>
              <form >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={handleChange}
                    helperText={invalidEmailMsg}
                    error={invalidEmail}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    value={username}
                    onChange={handleChange}
                    helperText={invalidUsernameMsg}
                    error={invalidUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={handleChange}
                    helperText={invalidPasswordMsg}
                    error={invalidPassword}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    className={classes.root}
                    variant="outlined"
                    required
                    fullWidth
                    name="passwordVerify"
                    label="Verify Password"
                    type="password"
                    id="passwordVerify"
                    autoComplete="verify-password"
                    value={passwordVerify}
                    onChange={handleChange}
                    helperText={invalidVerifyPasswordMsg}
                    error={invalidVerifyPassword}
                  />
                </Grid>
              </Grid>
              </form>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="default"
                className={classes.submit}
                onClick={e => handleSubmit(e)}
              >Sign Up</Button>
              <Grid container justify="center">
                <Grid item>
                  <RouteLink to={`/`} className="nav-link">
                    Already have an account? Log In
                  </RouteLink>
                </Grid>
              </Grid>
          </div>
      </div>
  );
};

export default withRouter(SignUp);