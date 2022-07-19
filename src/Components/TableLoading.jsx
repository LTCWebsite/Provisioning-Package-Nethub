import { Grid, Skeleton } from '@mui/material';
import React from 'react';

export const LoadingTable = ({ md }) => {
    return <>
        <Grid container item style={{ padding: 30 }}>
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

            <Grid item xs={1}>
                <Skeleton animation="wave" height={50} width={"70%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={2}>
                <Skeleton animation="wave" height={50} width={"85%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>

            <Grid item xs={1}>
                <Skeleton animation="wave" height={50} width={"70%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={2}>
                <Skeleton animation="wave" height={50} width={"85%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>

            <Grid item xs={1}>
                <Skeleton animation="wave" height={50} width={"70%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={2}>
                <Skeleton animation="wave" height={50} width={"85%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>

            <Grid item xs={1}>
                <Skeleton animation="wave" height={50} width={"70%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"90%"} />
            </Grid>
            <Grid item xs={2}>
                <Skeleton animation="wave" height={50} width={"85%"} />
            </Grid>
            <Grid item xs={3}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>

            {md && <>
                <Grid item xs={1}>
                    <Skeleton animation="wave" height={50} width={"70%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"90%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"90%"} />
                </Grid>
                <Grid item xs={2}>
                    <Skeleton animation="wave" height={50} width={"85%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"100%"} />
                </Grid>

                <Grid item xs={1}>
                    <Skeleton animation="wave" height={50} width={"70%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"90%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"90%"} />
                </Grid>
                <Grid item xs={2}>
                    <Skeleton animation="wave" height={50} width={"85%"} />
                </Grid>
                <Grid item xs={3}>
                    <Skeleton animation="wave" height={50} width={"100%"} />
                </Grid>

            </>}

        </Grid>
    </>;
}

export const LoadingCheckSerial = () => {
    return <>
        <Grid container style={{ padding: 10 }}>


            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={50} width={"100%"} />
            </Grid>
            <Grid item xs={4}></Grid>


            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"50%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"60%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"80%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"70%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"40%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"40%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"50%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"70%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"60%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"50%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"30%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"30%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"50%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"30%"} />
            </Grid>

            <Grid item xs={5}>
                <Skeleton animation="wave" height={30} width={"30%"} />
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={30} width={"70%"} />
            </Grid>

        </Grid>
    </>;
}

export const LoadingVAS = () => {
    const loop = [
        { one: '70%', two: '40%', three: '40%' },
        { one: '40%', two: '40%', three: '80%' },
        { one: '80%', two: '40%', three: '30%' },
        { one: '50%', two: '40%', three: '70%' },
        { one: '80%', two: '40%', three: '30%' },
        { one: '30%', two: '40%', three: '80%' },
        { one: '80%', two: '40%', three: '50%' },
    ]
    return <>
        <Grid container style={{ padding: 0 }}>


            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={40} width={"100%"} />
            </Grid>
            <Grid item xs={4}></Grid>
            {loop.map(row => {
                return (
                    <Grid container item xs={12}>
                        <Grid item xs={5}>
                            <Skeleton animation="wave" height={36} width={row.one} />
                        </Grid>
                        <Grid item xs={3}>
                            <Skeleton animation="wave" height={36} width={row.two} />
                        </Grid>
                        <Grid item xs={4}>
                            <Skeleton animation="wave" height={36} width={row.three} />
                        </Grid>
                    </Grid>
                )
            })}
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
                <Skeleton animation="wave" height={40} width={"100%"} />
            </Grid>
            <Grid item xs={4}></Grid>
        </Grid>
    </>;
}

export const LoadingFadoaw = () => {
    const loop = [
        { one: '20%', two: '40%' },
        { one: '40%', two: '40%' },
        { one: '60%', two: '40%' },
    ]
    return <>
        <Grid container style={{ padding: 0 }}>


            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={40} width={"100%"} />
            </Grid>
            <Grid item xs={3}></Grid>
            {loop.map(row => {
                return (
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Skeleton animation="wave" height={36} width={row.one} />
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton animation="wave" height={36} width={row.two} />
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    </>;
}

export const LoadingBSS = () => {
    const loop = [
        { one: '20%', two: '70%' },
        { one: '40%', two: '80%' },
        { one: '20%', two: '40%' },
        { one: '70%', two: '20%' },
        { one: '60%', two: '60%' },
        { one: '80%', two: '80%' },
        { one: '50%', two: '70%' },
        { one: '30%', two: '90%' },
        { one: '90%', two: '20%' },
        { one: '30%', two: '40%' },
    ]
    return <>
        <Grid container style={{ padding: 0 }}>


            <Grid item xs={3}></Grid>
            <Grid item xs={6}>
                <Skeleton animation="wave" height={40} width={"100%"} />
            </Grid>
            <Grid item xs={3}></Grid>
            {loop.map(row => {
                return (
                    <Grid container item xs={12}>
                        <Grid item xs={6}>
                            <Skeleton animation="wave" height={36} width={row.one} />
                        </Grid>
                        <Grid item xs={6}>
                            <Skeleton animation="wave" height={36} width={row.two} />
                        </Grid>
                    </Grid>
                )
            })}
        </Grid>
    </>;
}
