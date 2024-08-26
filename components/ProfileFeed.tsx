"use client";
import Image from 'next/image';
import React, { Fragment, useEffect, useState } from 'react';
import ProfilePosts, { Post } from "./ProfileFeedContainer";
import { useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface ImageProps {
    image: string; // Matches the key from the Python script output
    width: number;
    height: number;
}

const ProfileFeed: React.FC = () => {
    const [images, setImages] = useState<ImageProps[]>([]); // Updated initial state type
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const [scaleImage, setScaleImage] = React.useState(false);

    // Parse post ID and title from the query parameters
    const selectedPostId = searchParams.get('post');
    const selectedPostTitle = searchParams.get('post_title')?.replace(/_/g, ' ');

    const selectedPost = ProfilePosts.find(
        (post: Post) => post.id === Number(selectedPostId) && post.title === selectedPostTitle
    ) || null;

    const handleScaleImage = () => {
        setScaleImage(!scaleImage);
    };

    const fetchData = async (path: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/${path}`); // Direct request to Python server
            if (res.ok) {
                const data = await res.json();
                const arrData = data.map((item: any, index: number) => {
                    return {
                        id: index + 1,
                        title: "Post " + (index + 1),
                        image: item.image,
                        width: item.width,
                        height: item.height,
                    };
                });
                setLoading(false);
                setImages(arrData);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            setLoading(true);
            console.error("There was an error!", error);
            toast.error("There was an error fetching images. Please try again later.");
        }
    };

    useEffect(() => {
        fetchData('images/serveAll');

    }, []);

    return (
        <div className="relative min-h-screen text-white">
            <div className={`flex flex-wrap gap-5 mt-20 justify-center px-5 ${selectedPost ? 'pointer-events-none blur-sm' : ''}`}>
                {images.map((post: Post) => (
                    <div key={post.id} className="flex flex-col items-center gap-2">
                        <Link
                            href={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
                            as={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
                            title={post.title}
                        >
                            <div
                                className={`bg-gray-700 w-64 h-64 rounded-md relative cursor-pointer overflow-hidden transition-transform duration-300 ${selectedPost?.id === post.id ? 'scale-110' : 'hover:scale-105'}`}
                            >
                                {images.length > 0 && images[post.id - 1] && (  // Adjust this to map the correct image to the post
                                    <Image
                                        src={images[post.id - 1].image}  // Display the corresponding image for the post
                                        width={images[post.id - 1].width}
                                        height={images[post.id - 1].height}
                                        className="object-cover w-full h-full absolute inset-0"
                                        alt={`Image for post ${post.title}`}
                                    />
                                )}
                                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                    <h1 className="text-xl font-bold text-center">{post.title}</h1>
                                </div>
                            </div>
                        </Link>
                        <div className="flex gap-5 text-sm">
                            <p>Likes</p>
                            <p>Comments</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Overlay for the selected post */}
            {selectedPost && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
                    <div className={`relative bg-gray-700 w-[90vw] h-[90vh] max-w-screen-lg max-h-screen rounded-lg overflow-hidden transition-transform duration-500`}>
                        <Link href={pathname} passHref>
                            <button
                                className="absolute top-4 right-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-100 transition-opacity"
                                aria-label="Close"
                            >
                                <Image src='/images/cross.svg' alt='Close' width={24} height={24} />
                            </button>
                        </Link>
                        <div className="flex items-center justify-center h-full p-5 flex-col gap-10">
                            <div className='flex justify-center w-full h-full gap-10'>
                                <div className={`flex flex-col items-center gap-3 justify-center relative ${scaleImage ? 'z-50' : ''}`}>
                                    <h1 className={`text-3xl font-bold absolute top-[1%] transition-opacity duration-300 ${scaleImage ? 'opacity-0' : 'opacity-100'}`}>
                                        {selectedPost.title}
                                    </h1>
                                    {images.length > 0 && images[selectedPost.id - 1] && (  // Only show the image corresponding to the selected post
                                        <Image
                                            src={images[selectedPost.id - 1].image}  // Show the image for the selected post
                                            width={images[selectedPost.id - 1].width}
                                            height={images[selectedPost.id - 1].height}
                                            className={`object-contain select-none max-h-[85%] max-w-full w-[450px] cursor-pointer transition-all duration-[350ms] z-40 ${scaleImage ? 'transform scale-125 translate-x-[50%] translate-y-[0%] left-1/2 top-1/2' : 'hover:scale-[1.02]'}`}
                                            alt={`Image for post ${selectedPost.title}`}
                                            onClick={handleScaleImage}
                                        />
                                    )}
                                </div>
                                <div className={`flex flex-col max-w-[400px] w-full justify-center gap-20 h-full transition-opacity duration-300 ${scaleImage ? 'opacity-25 pointer-events-none' : 'opacity-100'}`}>
                                    {/* Comment Section */}
                                    <div>
                                        <div className='flex flex-col overflow-y-auto h-[500px] rounded-t-md border-[2px] border-b-0 border-[#4B5766] justify-between bg-[#2e363f]'>
                                            <div className='flex flex-col gap-3 bg-[#2e363f] p-4'>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User1:</span> This is a comment on the post.</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User2:</span> Another comment here!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User2:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni culpa possimus ipsa eligendi vero fuga architecto quos, commodi officia velit ipsum, perferendis id impedit exercitationem sint excepturi distinctio maxime! Suscipit!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User1:</span> This is a comment on the post.</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User2:</span> Another comment here!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User2:</span> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Magni culpa possimus ipsa eligendi vero fuga architecto quos, commodi officia velit ipsum, perferendis id impedit exercitationem sint excepturi distinctio maxime! Suscipit!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User1:</span> This song is SOOO GOOOD WTF!!???!?!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User1:</span> This song is SOOO GOOOD WTF!!???!?!</p>
                                                <p className='text-sm'><span className='font-bold text-cyan-400'>User1:</span> This song is SOOO GOOOD WTF!!???!?!</p>
                                            </div>
                                        </div>
                                        <div className='flex relative'>
                                            <input type="text" placeholder='Comment...' className='text-white w-full rounded-b-lg bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 pr-[80px]' />
                                            <button className='absolute h-[45px] right-[0] p-3 bottom-0 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'>Submit</button>
                                        </div>
                                    </div>

                                    <div className='flex flex-col items-center gap-4'>
                                        <textarea placeholder='Update description...' name="comment" id="comment" cols={20} rows={6} className='text-white w-full bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 rounded-md resize-none'></textarea>
                                        <button className='bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-5 py-2 rounded-md shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'>Save Changes</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileFeed;
