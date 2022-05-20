import React, { useEffect, useState } from 'react'
import FadeIn from 'react-fade-in/lib/FadeIn'
import { MyCrypt } from '../../Components/MyCrypt'

function TopBar({ width }) {
    const [topData, setTopData] = useState({ data: [] })

    const loadTopMenu = () => {
        let data = MyCrypt("de", localStorage.getItem("ONE_USER_ROLE"))
        setTopData({ ...topData, data: data })
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