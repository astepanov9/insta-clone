import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"

const Profile = () => {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-between py-5">
      <div className="flex items-center">
        {
          session &&
          <>
            <Image src={session?.user?.image} className='rounded-full mr-3' width={56} height={56} alt='profile' />
            <p className='font-medium text-sm cursor-pointer'>{session?.user?.name}</p>
          </>
        }
      </div>
      <button className='text-[#3AACF7] font-medium text-sm whitespace-nowrap' onClick={() => { session ? signOut() : signIn() }}>{session ? 'Sign Out' : 'Sign In'}</button>
    </div>
  )
}

export default Profile