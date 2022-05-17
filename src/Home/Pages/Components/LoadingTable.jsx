import { Grid, Skeleton } from '@mui/material';
import React from 'react';

function LoadingTable() {
    return <>
        <Grid container>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>

            <Grid item xs={12}>
                <Skeleton animation="wave" height={100} width={"100%"} />
            </Grid>

            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>


        </Grid>
    </>;
}

export default LoadingTable;
