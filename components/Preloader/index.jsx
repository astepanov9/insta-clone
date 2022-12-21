import React from 'react';
import Image from 'next/image';

import insta from '../../assets/insta.png';
import fromMeta from '../../assets/from-meta.png';

const Preloader = () => {
    return (
        <div className="fixed left-0 top-0 w-full bg-[#fafafa] z-50 h-[100vh] flex flex-col justify-center items-center">
            <div className="flex-auto flex flex-col justify-center">
                <div className="">
                    <Image src={insta} />
                </div>
            </div>
            <div className="mb-4">
                <Image src={fromMeta} />
            </div>
        </div>
    )
}

export default Preloader