import React from 'react';
import Image from 'next/image';

import down from '../../assets/down.png';

const Subscriber = ({ username, avatar }) => {
    return (
        <div className="flex justify-between items-center cursor-pointer px-6 py-2 mb-2 hover:bg-gray-100">
            <div className="flex items-center">
                <Image src={avatar} className='rounded-full mr-3' width={56} height={56} alt='profile' />
                <div className="">
                    <p className="font-medium text-sm">Subscription request</p>
                    <p className="font-light text-sm text-gray-500">{username}</p>
                </div>
            </div>
            <div className="flex items-center">
                <span className="w-[8px] h-[8px] mr-2 bg-blue-500 rounded-full"></span>
                <Image src={down} className="-rotate-90" width={20} height={20} alt="down" />
            </div>
        </div>
    )
}

export default Subscriber