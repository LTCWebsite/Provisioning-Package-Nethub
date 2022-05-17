import React from 'react'
import Lottie from 'react-lottie';
import Loading from '../Loading/loading-rings.json'

function LoadingLottie({ loadStop: stop, loadHeight: height, loadWidth: width, loadTop: top }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: Loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }
    return (
        <>
            <Lottie options={defaultOptions} height={height} width={width} isStopped={stop} style={{ marginTop: top }} />
        </>
    )
}

export default LoadingLottie
