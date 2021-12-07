import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import ListSubheader from "@material-ui/core/ListSubheader";
import tileData from "./tileData";

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
    co
  return (
    <div>
      <Grid container justify="center" spacing={2}>
        <Grid item md={2} sm={3}>
          <Paper>
            <img
              src={"/シーズー１.jpeg"}
              style={{ height: "100%", width: "100%" }}
            />
          </Paper>
        </Grid>
        <Grid item md={2} sm={3}>
          <Paper>
            <img
              src={"/シーズー１.jpeg"}
              style={{ height: "100%", width: "100%" }}
            />
          </Paper>
        </Grid>
        <Grid item md={2} sm={3}>
          <Paper>
            {" "}
            <img
              src={"/シーズー１.jpeg"}
              style={{ height: "100%", width: "100%" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default card;
