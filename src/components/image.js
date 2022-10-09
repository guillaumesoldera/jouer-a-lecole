import React, { useState } from "react"
import noImage from './no-image.svg';

export const ImageWithFallback = ({ fallback = noImage, src, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [imgSrc, setImgSrc] = useState(src)
    const onError = () => setImgSrc(fallback)
    return (
        <>
            <img
                src={imgSrc ? imgSrc : fallback}
                onError={onError}
                {...props}
                onLoad={() => setIsLoaded(true)}
                className={isLoaded ? className : 'hide'}
            />
            <img
                src={noImage}
                {...props}
                className={isLoaded ? 'hide' : className}
            />
        </>
    )

}
