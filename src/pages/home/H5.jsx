import React from 'react'
import { useSiteContent } from '../../context/SiteContentContext'

function H5() {
    const { content } = useSiteContent();
    const data = content?.home_hero || { titlePart1: 'said', titlePart2: 'piece', titlePart3: 'architects' };

    return (
        <div className="w-full bg-white">
            <div className='h-[28vh] sm:h-[50vh] md:h-[80vh] lg:h-[100vh] flex justify-center items-center text-neutral-900 px-4 py-4 sm:py-8'>
                <div className='text-center w-fit mx-auto -mt-5 md:-mt-55'>
                    <div className="logo font-bold text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-neutral-800 leading-tight" style={{ fontFamily: "century-gothic" }}>
                        <span style={{ color: "#555555" }} className="font-light">{data.titlePart1}</span><span>{data.titlePart2}</span> <span className="font-light">{data.titlePart3}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default H5