import React from 'react'
import Lottie from 'react-lottie';

function LoadLottie({ loadStop: stop, loadHeight: height, loadWidth: width, loadTop: top, src: SRC }) {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: SRC,
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

export default LoadLottie
