import React from 'react'
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function NavLoad({ height, use }) {
    return (
        <Backdrop
            style={{ height: height, position: 'absolute', width: '100%' }}
            sx={{ color: '#5A5C69', zIndex: 1000 }}
            open={use}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

export default NavLoad
