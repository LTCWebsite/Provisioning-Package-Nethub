import React from 'react'
import Lottie from 'react-lottie';
import Loading from '../../Loading/20779-skeleton-loading-card.json'

function LoadingLottie({loadStop : stop, loadHeight: height}) {
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
            <Lottie options={defaultOptions} height={height} width={"100%"} isStopped={stop} />
        </>
    )
}

export default LoadingLottie
