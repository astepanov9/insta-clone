import React from 'react'
import Image from 'next/image'

const Photo = ({ photo }) => {
    return (
        <div className="my-4 mx-4 cursor-pointer">
            <Image src={photo} className="" width={250} height={400} alt="photo" />
        </div>
    )
}

export default Photo