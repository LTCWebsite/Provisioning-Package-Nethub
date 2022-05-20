import { Checkbox, FormControlLabel, FormGroup, Grid } from '@mui/material'
import React from 'react'
import { MyCrypt } from '../../../Components/MyCrypt'

function UserEdit() {
    const [top, setTop] = React.useState({ data: [] })

    React.useEffect(() => {
        setTop({ ...top, data: MyCrypt("de", localStorage.getItem("ONE_USER_ROLE")) })
        console.log(MyCrypt("de", localStorage.getItem("ONE_USER_ROLE")))
    }, [])

    return (
        <div>
            <Grid container>
                {top.data?.map((row, idx) => {
                    return (
                        <Grid item lg={4} xs={6} key={idx}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox defaultChecked color='error' />} label={""} />
                            </FormGroup>
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    )
}

export default UserEdit