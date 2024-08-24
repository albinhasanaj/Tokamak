import Image from 'next/image'
import React from 'react'

const ProfileFeed = () => {
    return (
        <div>
            <Image
                src='/images/giraffe.jpg'
                alt='Profile Feed'
                className='rounded-md'
                width={270}
                height={0}
            />
            <div className='flex text-white gap-4 justify-end'>
                <h1>likes</h1>
                <h1>comments</h1>
            </div>
        </div>
    )
}

export default ProfileFeed