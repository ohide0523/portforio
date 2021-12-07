import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";

const card = () => {
    return (
        <div >
            <Grid container  justify="center" spacing={2}>
                  <Grid item md={2} sm={3}>
                <Paper >
                  <img src={"/シーズー１.jpeg"} style={{height:"100%",width:"100%"}}/>
                    </Paper>
            </Grid>
            <Grid item md={2} sm={3}>
                <Paper >
                <img src={"/シーズー１.jpeg"} style={{height:"100%",width:"100%"}}/></Paper>
            </Grid>
            <Grid item md={2} sm={3}>
                <Paper >  <img src={"/シーズー１.jpeg"} style={{height:"100%",width:"100%"}}/></Paper>
            </Grid>
            </Grid>
          
        </div>
    )
}

export default card
