import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const Home: React.FC = () => {
    return(
        <div>

        <Grid container justify="flex-end">
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="default"
                    >Deep Connection
                </Button>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="default"
                    >Difficult Topics
                </Button>
            </Grid>
            <Grid item>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="default"
                    >Getting Started
                </Button>
            </Grid>
        </Grid>
        </div>
    )
}

export default Home;