import { Grid } from "@mui/material";
import React from "react";
import Banner from "../banner/Banner";
import Category from "./Category";
import Posts from "./posts/Posts";
function BlogHome() {
  return (
    <>
      <Banner />
      <Grid container>
        <Grid item ls={2} xs={12} sm={2}>
          <Category />
        </Grid>

        <Grid container itesm ls={10} xs={12} sm={10}>
          <Posts />
        </Grid>
      </Grid>
    </>
  );
}

export default BlogHome;
