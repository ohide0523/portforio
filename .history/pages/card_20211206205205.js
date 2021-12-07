import React from 'react'
import Grid from '@material-ui/core/Grid';


const card = () => {
    return (
        <div style={{width:"90%",margin:""}}>
            <Grid item md={3}>
                <div style={{background:"red"}}>こんにちは</div>
            </Grid>
        </div>
    )
}

export default card
