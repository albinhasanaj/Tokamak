// components/Feed.tsx

import React, { Fragment } from 'react';
import Image from 'next/image';
import { Post } from '../types/types.d'; // Adjust path if necessary
import Link from 'next/link';

interface FeedProps {
    images: Post[];
    selectedPost: Post | null;
    scaleImage: boolean;
    onSelectPost: (post: Post) => void;
    onDeselectPost: () => void;
    onToggleScaleImage: () => void;
}

const Feed: React.FC<FeedProps> = ({ images, selectedPost, scaleImage, onSelectPost, onDeselectPost, onToggleScaleImage }) => {
    return (
        <main className='w-full flex flex-col items-center'>
            {/* Images Grid */}
            <div className="flex flex-wrap justify-center gap-4">
                {images.length > 0 && (
                    <Fragment>
                        {images.map((post) => (
                            <div key={post.id} className="mb-4 break-inside-avoid">
                                <Link
                                    href={`/explore?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
                                    as={`/explore?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
                                    title={post.title}
                                >
                                    <div
                                        className={`bg-gray-700 w-64 h-64 rounded-md relative cursor-pointer overflow-hidden transition-transform duration-300 ${selectedPost?.id === post.id ? 'scale-110' : 'hover:scale-105'}`}
                                        onClick={() => onSelectPost(post)}
                                    >
                                        <Image
                                            src={post.image}
                                            width={post.width}
                                            height={post.height}
                                            className="object-cover w-full h-full absolute inset-0"
                                            alt={`Image for post ${post.title}`}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                            <h1 className="text-xl font-bold text-white text-center">{post.title}</h1>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </Fragment>
                )}
            </div>

            {selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
                    <div className="relative bg-gray-700 w-[90vw] h-[90vh] max-w-screen-lg max-h-screen rounded-lg overflow-hidden transition-transform duration-500">
                        <button
                            className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                            aria-label="Close"
                            onClick={onDeselectPost}
                        >
                            <Image src='/images/cross.svg' alt='Close' width={24} height={24} />
                        </button>
                        <div className="flex items-center justify-center h-full p-5 flex-col gap-10">
                            <div className='flex flex-col justify-center gap-5 items-center w-full h-full'>
                                <h1 className={`text-3xl font-bold absolute top-[5%] transition-opacity duration-300 text-white ${scaleImage ? 'opacity-0' : 'opacity-100'}`}>
                                    {selectedPost.title}
                                </h1>
                                <div className={`flex flex-col items-center justify-center relative ${scaleImage ? 'z-50' : ''}`}>
                                    <Image
                                        src={selectedPost.image}
                                        width={selectedPost.width}
                                        height={selectedPost.height}
                                        className={`object-contain select-none w-full cursor-pointer transition-all duration-[350ms] z-40 ${scaleImage ? 'transform scale-[1.50] translate-x-[0%] translate-y-[0%] left-1/2 top-1/2' : 'hover:scale-[1.02]'}`}
                                        alt={`Image for post ${selectedPost.title}`}
                                        onClick={onToggleScaleImage}
                                    />
                                </div>
                                <div className={`flex flex-col max-w-[400px] w-full justify-center  transition-opacity duration-300 ${scaleImage ? 'opacity-25 pointer-events-none' : 'opacity-100'}`}>
                                    <div className='flex flex-col items-center gap-4'>
                                        <textarea placeholder='Add description...' name="comment" id="comment" cols={20} rows={6} className='text-white w-full bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 rounded-md resize-none'></textarea>
                                        <button className='bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'>Post</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Feed;
