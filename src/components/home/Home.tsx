import React from 'react';
import { Link as RouteLink, withRouter, useHistory, RouteComponentProps} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import cyan from '@material-ui/core/colors/cyan';
const color1 = cyan[400];
const color2 = cyan[900];
const color3 = cyan[100];


const Home: React.FC<RouteComponentProps> = (props) => {
    const handleLoading =(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        e.preventDefault();
        console.log("CLICKING EGTTING sTARTED");
        props.history.push('/loading');
    }
    return(
        <div className="home-buttons">

        <Grid container justify="flex-end" alignContent="center">
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: color1}}
                    >Deep Connection
                </Button>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: color2}}
                    >Difficult Topics
                </Button>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ background: color3}}
                    onClick={e => handleLoading(e)}
                    >Getting Started
                </Button>
            </Grid>
        </Grid>
        </div>
    )
}

export default withRouter(Home);