import React from 'react'
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import Footer from '../Footer';

const Suggestions = () => {
    const [reccomend, setReccomend] = React.useState([]);

    React.useEffect(() => {
        setReccomend(
            [...Array(5)].map((profile) => ({
                userId: faker.datatype.uuid(),
                username: faker.internet.userName(),
                avatar: faker.image.avatar(),
            }))
        );
    }, []);

    return (
        <div>
            <div className="flex justify-between mb-5">
                <p className='text-gray-500'>Suggestions for yoy</p>
                <button className='font-medium text-sm'>See All</button>
            </div>
            {
                reccomend.map(profile => (
                    <div key={profile.userId} className="flex justify-between mt-2">
                        <div className="flex items-center">
                            <Image src={profile.avatar} className='rounded-full mr-2' width={35} height={35} alt='profile' />
                            <div>
                                <p className='font-medium text-sm cursor-pointer'>{profile.username}</p>
                                <p className='font-light text-sm text-gray-500'>Suggested for you</p>
                            </div>
                        </div>
                        <button className='font-medium text-sm'>Follow</button>
                    </div>
                ))
            }
            <Footer />
        </div>
    )
}

export default Suggestions