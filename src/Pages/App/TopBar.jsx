import React, { useEffect, useState } from 'react'
import { UserID, UserToken } from '../../Components/AutoFC'
import { AxiosAPI } from '../../Components/Axios'
import FadeIn from 'react-fade-in/lib/FadeIn'

function TopBar({ width }) {
    const [topData, setTopData] = useState({ data: [] })

    let sendData = {
        staff_id: UserID(),
        token: UserToken()
    }
    const loadTopMenu = () => {
        AxiosAPI.post("get-user-detail", sendData).then(res => {
            if (res.status === 200) {
                setTopData({ ...topData, data: res.data })
                // console.log(res.data)
            }
        })
    }

    useEffect(() => {
        loadTopMenu()
    }, [])

    return (
        <>
            <div className='frame'>
                {topData.data.map((row, idx) => {
                    return (
                        <div className='list' key={idx} style={{ width: parseInt(row.Width) }}><FadeIn>{row.Name}</FadeIn></div>
                    )
                })}
            </div>
        </>
    )
}

export default TopBar