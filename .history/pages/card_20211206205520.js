import React from 'react'
import Grid from '@material-ui/core/Grid';


const card = () => {
    return (
        <div>
            <Grid container spacing={3} sty>
                  <Grid item md={3}>
                <div style={{background:"red"}}>こんにちは</div>
            </Grid>
            <Grid item md={3}>
                <div style={{background:"blue"}}>こんにちは</div>
            </Grid>
            <Grid item md={3}>
                <div style={{background:"yellow"}}>こんにちは</div>
            </Grid>
            </Grid>
          
        </div>
    )
}

export default card
