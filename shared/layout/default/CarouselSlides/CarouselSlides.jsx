import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import CarouselSlideApi from '../../../../apis/CarouselSlideApi'

const CarouselSlides = () => {
    const router = useRouter()
    const [showIn, setShowIn] = useState('')
    const [slides, setSlides] = useState([])

    useEffect(()=>{
        CarouselSlideApi.getCarouselSlidesAsync({showIn}).then((response)=>{
            setSlides(response.data);
        })
        return ()=>setSlides([]);
    },[showIn])
    
    useEffect(()=>{
        const paths = router.pathname.split('/')
        if (paths.length > 1) {
            if(paths[1] === ""){
                setShowIn('home')
            }else{
                setShowIn(paths[1])
            }
        }
    },[router])

    return (
        <>
            {slides.length>0&&(
                <div>CarouselSlides</div>
            )}
        </>
    )
}

export default CarouselSlides