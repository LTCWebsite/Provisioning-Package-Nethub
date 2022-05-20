import { ArrowForwardIos } from '@mui/icons-material'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Cookies from "js-cookie";
import { MyCrypt } from "./MyCrypt";

export const USER = () => {
    let data = MyCrypt("de", localStorage.getItem("ONE_DETAIL"))
    return data
}
export const UserID = () => {
    let data = MyCrypt("de", localStorage.getItem("ONE_DETAIL"))
    return data.empIDNo
}

export const UserToken = () => {
    return Cookies.get("ONE_TOKEN")
}

export const BarTitle = ({ page }) => {
    const history = useHistory()
    const GoBack = () => {
        history.push("/app")
    }
    return <div className='underline'><u className='h1'><p onClick={GoBack}>Home</p> &nbsp;<ArrowForwardIos />&nbsp; {page}</u></div>
}