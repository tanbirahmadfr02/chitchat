/* eslint-disable no-unused-vars */
import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Home = () => {
  return (
    <>
      <section>
        <Grid container>
          <Grid item xs={2}>
            <Navbar/>
          </Grid>
          <Grid h3 xs={10}>
            <Outlet/>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Home;
