import React from 'react'
import SideBar from './SideBar'
import Body from './Body'
import { useWindowHeight, useWindowWidth } from '@react-hook/window-size'
import TopBar from './TopBar'
import LoadingLottie from '../../Components/LoadingLottie'

function Defualt() {
    const height = useWindowHeight()
    const width = useWindowWidth
    const [loading, setLoading] = React.useState(false)
    setTimeout(() => {
        setLoading(true)
    }, 1500)
    return (
        <>
            {!loading ? <LoadingLottie loadStop={loading} loadHeight={400} loadWidth={300} loadTop={"20vh"} /> : <>
                {/* <TopBar width={width} /> */}
                <div className='body' style={{ width: '100%', paddingTop: 3 }}>
                    <div style={{ display: 'flex' }}>
                        <SideBar height={height} />
                        <Body height={height} />
                    </div>
                </div>
            </>}
        </>
    )
}

export default Defualt