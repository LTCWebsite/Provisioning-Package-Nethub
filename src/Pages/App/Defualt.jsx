import React from 'react'
import SideBar from './SideBar'
import Body from './Body'
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size'
import TopBar from './TopBar'

function Defualt() {
    const height = useWindowHeight()
    const width = useWindowWidth
    return (
        <>
            <TopBar width={width} />
            <div className='body' style={{ width: '100%', paddingTop: 3 }}>
                <div style={{ display: 'flex' }}>
                    <SideBar height={height} />
                    <Body height={height} />
                </div>
            </div>
        </>
    )
}

export default Defualt