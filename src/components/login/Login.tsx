import React, { useState, useEffect } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { loginAction, getCookieAction } from '../../actions/basicActions';

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
 // show / reroute to sign-up form
 // show username/password text fields, 
const LogIn: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPassMsg, setInvalidPassMsg] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

  // set state based on cookie values
  // only trigger on initial mount
  useEffect(() => {
    const cookieUser = Cookies.get('kunligiUser');
    const cookieId = Cookies.get('kunligiId');
    if (cookieUser !== undefined && cookieId !== undefined) {
        dispatch(getCookieAction(cookieUser, cookieId));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputVal = e.target.value;
    switch (e.target.name) {
      case 'username':
        setUsername(inputVal);
        break;
      case 'password':
        setPassword(inputVal);
        break;
    }
  };

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInvalidUser(false);
    setInvalidUserMsg('');
    setInvalidPass(false);
    setInvalidPassMsg('');
    //dispatch(loginAction(username, password));
    //props.history.push('/home');

    const body = JSON.stringify({
        username,
        password
    });

    fetch(`/login`,{
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
    }).then(res => {
        return res.json();
    }).then(data => {
        if (data.message !== 'username exists') {
            if (data.message === 'username not found') {
                setInvalidUser(true);
                setInvalidUserMsg(data.message);
            }
            if (data.message === 'invalid password') {
                setInvalidPass(true);      
                setInvalidPassMsg(data.message);
            }
        } else {
            const id = data.currentUser.id;
            dispatch(loginAction(username, id));
        } 
    }).catch(err => {
        console.log('login submit error!');
    })
    // sessionIsCreated(username, password).then(loginStatus => {
    //   if (loginStatus === 'Success') {
    //     props.history.push('/');
    //   } else {
    //     switch (loginStatus) {
    //       case 'No Username Input':
    //         setInvalidUser(true);
    //         setInvalidUserMsg(loginStatus);
    //         break;
    //       case 'No Password Input':
    //         setInvalidPass(true);
    //         setInvalidPassMsg(loginStatus);
    //         break;
    //       case 'Invalid Username':
    //         setInvalidUser(true);
    //         setInvalidUserMsg(loginStatus);
    //         break;
    //       case 'Incorrect Password':
    //         setInvalidPass(true);
    //         setInvalidPassMsg(loginStatus);
    //         break;
    //     }
    //   }
    // });
  };



  return (
    <div className="login-form"> 
        <p>Please log-in to your account</p>
        <div>
        <TextField
          className={classes.root}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={handleChange}
          helperText={invalidUserMsg}
          error={invalidUser}
        />
        <TextField
          className={classes.root}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={handleChange}
          helperText={invalidPassMsg}
          error={invalidPass}
        />
          
        <Button
        type="submit"
        fullWidth
        variant="contained"
        color="default"
        className={classes.submit}
        onClick={e => handleLogin(e)}
        >Log in
        </Button><br></br>
        
        <Grid container justify="center">
            <Grid item>
                <RouteLink to={`/signup`} className="nav-link">
                  Don&apos;t have an account? Sign Up
                </RouteLink>
            </Grid>
        </Grid>
        </div>
    </div>
  );
}

export default LogIn;