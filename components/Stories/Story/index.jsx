import React from 'react';
import Image from 'next/image';

const Story = ({ username, avatar }) => {
  return (
    <div>
      <Image src={avatar} className='rounded-full p-[1.5px] border-[2px] border-[#d62976] cursor-pointer' alt="profile" width={56} height={56} />
      <p className='w-[60px] text-xs text-center truncate'>{username}</p>
    </div>
  );
};

export default Story;
