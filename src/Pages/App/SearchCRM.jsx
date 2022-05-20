import { Search } from '@mui/icons-material'
import { Button, Grid } from '@mui/material'
import React from 'react'

function SearchCRM() {
    return (
        <Grid container className='search'>
            <Grid item xs={4} lg={8}></Grid>
            <Grid item xs={5} lg={2}>
                <input
                    type={"search"}
                    maxLength="20"
                    className='v-input input-1'
                    placeholder='205xxxxxxx'
                />
            </Grid>
            <Grid item xs={2} lg={1}>
                <Button
                    variant='contained'
                    className='btn-primary'
                    style={{ marginLeft: 5, marginTop: 5 }}
                >
                    <Search />
                </Button>
            </Grid>
        </Grid>
    )
}

export default SearchCRM