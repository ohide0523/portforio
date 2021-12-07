import React from 'react'
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";

const card = () => {
    return (
        <div >
            <Grid container  justify="center" spacing={2}>
                  <Grid item md={4}>
                <Paper style={{background:"red"}}>こんにちは</Paper>
            </Grid>
            <Grid item md={4}>
                <div style={{background:"blue"}}>こんにちは</div>
            </Grid>
            <Grid item md={4}>
                <div style={{background:"yellow"}}>こんにちは</div>
            </Grid>
            </Grid>
          
        </div>
    )
}

export default card
