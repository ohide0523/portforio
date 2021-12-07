import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
im
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 700,
    },
  })
);




const card = () => {
    const classes = useStyles()
  return (
    
      <Grid container justify="center" spacing={2}>
       <GridList>

       </GridList>
      </Grid>
  
  );
};

export default card;
