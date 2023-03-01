import React, { useState } from "react"
import noImage from './no-image.svg';

export const ImageWithFallback = ({ fallback = noImage, src, className, ...props }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [imgSrc, setImgSrc] = useState(src)
    const onError = () => setImgSrc(fallback)
    const imgSrcPng = imgSrc ? imgSrc.split(".")[0] + '.png' : undefined
    return (
        <>
            {imgSrc && (
                <picture>
                    <source srcSet={imgSrc} type="image/webp" />
                    <source srcSet={imgSrcPng} type="image/png" /> 
                    <img
                        src={imgSrc}
                        onError={onError}
                        {...props}
                        onLoad={() => setIsLoaded(true)}
                        className={isLoaded ? className : 'hide'}
                        loading="lazy"
                    />
                </picture>
                )
            }
            {
                imgSrc === undefined && (
                    <img
                        src={fallback}
                        onError={onError}
                        {...props}
                        onLoad={() => setIsLoaded(true)}
                        className={isLoaded ? className : 'hide'}
                        loading="lazy"
                    />
                )
            }
              
            <img
                src={noImage}
                {...props}
                className={isLoaded ? 'hide' : className}
            />
        </>
    )

}
