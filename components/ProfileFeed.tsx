"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import ProfilePosts, { Post } from "./ProfileFeedContainer"

const ProfileFeed: React.FC = () => {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);

    const handleSelectPost = (post: Post) => {
        setSelectedPost(post);
    }

    const handleDeselectPost = () => {
        setSelectedPost(null);
    }

    return (
        <div>
            {/* <Image
                src='/images/giraffe.jpg'
                alt='Profile Feed'
                className='rounded-md'
                width={270}
                height={0}
            /> */}
            <div className={`flex gap-5 flex-wrap mt-20 items-start mx-5 justify-center ${selectedPost ? 'pointer-events-none blur' : ''}`}>
                {ProfilePosts.map((post: Post) => (
                    <div key={post.id}>
                        <div
                            className={`bg-[#7a7a7a] w-[250px] h-[150px] rounded-md flex flex-col justify-center gap-5 cursor-pointer ${selectedPost?.id === post.id ? 'scale-110 z-10' : ''
                                }`}
                            onClick={() => handleSelectPost(post)}
                        >
                            <h1 className='text-black font-bold text-center'>{post.title}</h1>
                            <p className='text-black font-bold text-center'>{post.content}</p>
                        </div>
                        <div className='text-white flex gap-5 justify-end mb-12'>
                            <p>Likes</p>
                            <p>Comments</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* If a post is selected, show the overlay */}
            {selectedPost && (
                <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-20'>
                    <div className='relative bg-[#7a7a7a] w-[90vw] h-[90vh] max-w-screen-lg max-h-screen rounded-md'>
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <Image src='/images/cross.svg' alt='Profile Feed' className='rounded-full bg-black absolute bottom-[93%] left-[94%] cursor-pointer' onClick={handleDeselectPost} width={40} height={0} />
                            <div className='bg-[#7a7a7a] p-5 rounded-md w-full h-full flex items-center justify-center'>
                                <div className='flex flex-col items-center justify-center h-full w-full'>
                                    <h1 className='text-black font-bold text-center mb-4'>{selectedPost.title}</h1>
                                    <p className='text-black font-bold text-center mb-4'>{selectedPost.content}</p>
                                    {/* Display the content of the selected post here */}
                                    <div className='w-full h-full flex items-center justify-center'>
                                        {/* Adjust this div to center content */}
                                        <div className='w-full h-full flex items-center justify-center'>
                                            <p className='text-black'>{selectedPost.content}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProfileFeed
