import React from 'react'
import LoadingLottie from '../../Components/LoadingLottie'

function LuckyDraw() {
    const [stop, setStop] = React.useState(false)
    React.useEffect(() => {
        setTimeout(() => {
            setStop(true)
        }, 3000)
    }, [])
    function ShowData() {
        return (
            <>luack draw</>
        )
    }
    return (
        <>
        {!stop ? <LoadingLottie loadStop={stop} loadHeight={800} /> : <ShowData />}
        </>
    )
}

export default LuckyDraw
