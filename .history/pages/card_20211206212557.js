import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";

const card = () => {
    return (
        <div >
            <Grid container  justify="center" spacing={3}>
                  <Grid item md={4}>
                <Paper style={{background:"red",he}}>
                  <img src={"/シーズー１.jpeg"} style={{height:"100%",width:"100%"}}/>
                    </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper style={{background:"blue"}}>こんにちは</Paper>
            </Grid>
            <Grid item md={4}>
                <Paper style={{background:"yellow"}}>こんにちは</Paper>
            </Grid>
            </Grid>
          
        </div>
    )
}

export default card
