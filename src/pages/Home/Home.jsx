/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

const Home = () => {
  let data = useSelector((state) => state?.user?.value);
  console.log(data);
  let navigate = useNavigate();

  useEffect(() => {
    if (!data?.email) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <section>
        <Grid container>
          <Grid item xs={2}>
            <Navbar />
          </Grid>
          <Grid h3 xs={10}>
            <Outlet />
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default Home;
