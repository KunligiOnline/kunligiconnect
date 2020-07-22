import React, { useState } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


/**
 * @function  Verify username and password
 * @desc    Sends fetch requests to API to verify user
 */
const useStyles = makeStyles(theme => ({
  
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
    root: {
        
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3EC1AC'
        }
    }
}));
 // show / reroute to sign-up form
 // show username/password text fields, 
const LogIn: React.FC = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [invalidUserMsg, setInvalidUserMsg] = useState('');
  const [invalidPassMsg, setInvalidPassMsg] = useState('');
  const [invalidUser, setInvalidUser] = useState(false);
  const [invalidPass, setInvalidPass] = useState(false);

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
    <div className="signup-form"> 
        <p>Please log-in to your account</p>
        <div>
        <TextField
          
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
        
        <Grid container justify="flex-end">
            <Grid item>
                <RouteLink to={`/signup`} className="nav-link">
                Don't have an account? Sign Up
                </RouteLink>
            </Grid>
        </Grid>
        </div>
    </div>
  );
}

export default LogIn;