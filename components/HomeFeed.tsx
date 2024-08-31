"use client"
import Image from "next/image";
import React, { useEffect, useState } from "react";
import comments from "../constant/api/comments";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import toast from 'react-hot-toast';

export interface Post {
  id: number;
  title: string;
  image: string;
  width?: number;
  height?: number;
  post_number: number;
}

const HomeFeed = () => {
  const pathname = usePathname();
  const [images, setImages] = useState<Post[]>([]);
  const [scaleImage, setScaleImage] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    document.body.style.overflow = 'hidden'; // Disable body scroll
  };

  const handleDisableSelectPost = () => {
    setSelectedPost(undefined);
    document.body.style.overflow = ''; // Re-enable body scroll
  };

  const handleScaleImage = () => {
    setScaleImage(!scaleImage);
  };

  const handleDisableScaleImage = () => {
    setScaleImage(false);
  };

  const fetchProfilePosts = async () => {
    try {
      const data = await fetch('/api/posts/getAllPosts')
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }

          const data = res.json();
          return data;
        });

      const fetchedPosts = data.posts.map((item: any, index: number) => ({
        id: item._id,
        title: `Post ${index + 1}`,
        image: item.image,
        post_number: item.post_number,
      }));

      console.log(fetchedPosts);

      // sort low to high
      fetchedPosts.sort((a: Post, b: Post) => a.post_number - b.post_number);
      setImages(fetchedPosts); // Update state with the populated array
    } catch (error) {
      setLoading(true);
      console.error("There was an error fetching images!", error);
      toast.error("There was an error fetching images. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <div className={`flex flex-col gap-36 mt-20 justify-center px-5 ${selectedPost ? 'pointer-events-none blur-sm' : ''}`}>
        {images.map((post: Post) => (
          <div key={post.id} className="flex flex-col items-center gap-2">
            <Link
              href={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
              as={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
              title={post.title}
              onClick={() => handleSelectPost(post)}
            >
              <div
                className={`bg-gray-700 w-[600px] h-[600px] rounded-md relative cursor-pointer overflow-hidden transition-transform duration-300 ${selectedPost ? 'scale-110' : 'hover:scale-105'}`}
              >
                <Image
                  src={post.image}
                  width={100}
                  height={100}
                  className="object-cover w-full h-full absolute inset-0"
                  alt={`Image for post ${post.title}`}
                  unoptimized={true}
                />
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
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
          <div className="relative bg-gray-700 bg-opacity-50 h-[90vh] max-w-screen-lg max-h-screen rounded-lg overflow-hidden transition-transform duration-500">
            <Link href={pathname ?? ''} passHref>
              <button className="absolute top-4 left-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-100 transition-opacity z-10" aria-label="Close"
                onClick={() => {
                  handleDisableSelectPost();
                  handleDisableScaleImage();
                }}>
                <Image
                  src='/images/cross.svg' alt='Close' width={24} height={24}
                />
              </button>
            </Link>
            <div className="flex items-center justify-center h-full flex-col gap-10">
              <div className='flex justify-center w-full h-full'>
                <div className={`flex flex-col items-center gap-3 justify-center relative ${scaleImage ? 'z-50' : ''}`}>
                  <Image
                    src={selectedPost.image}
                    width={300}
                    height={300}
                    className={`object-contain select-none max-h-[85%] max-w-full w-[450px] cursor-pointer transition-all duration-[350ms] z-40 ${scaleImage ? 'transform scale-150 translate-x-[50%] translate-y-[0%] left-1/2 top-1/2' : 'hover:scale-[1.02]'}`}
                    alt={`Image for post ${selectedPost.title}`}
                    onClick={handleScaleImage}
                  />
                </div>
                <div className={`flex flex-col max-w-[400px] w-full justify-between h-full transition-opacity duration-300 ${scaleImage ? 'opacity-25 pointer-events-none' : 'opacity-100'}`}>
                  {/* Comment Section */}
                  <div className="overflow-auto scrollbar">
                    <div className='flex flex-col items-center justify-center h-auto rounded-t-md border-l-[2px] border-[#4B5766]'>
                      <div className='flex flex-col gap-3 p-2 scrollbar'>
                        {comments.map((comment, index) => (
                          <p key={index} className='text-sm break-all scrollbar'><span className='font-bold text-cyan-400 break-all'>{comment.user}: </span>{comment.text}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex relative'>
                    <input type="text" placeholder='Comment...' className='text-white w-full rounded-b-lg bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 pr-[80px] ' />
                    <button className='absolute h-[45px] right-[0] p-3 bottom-0 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'>Submit</button>
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

export default HomeFeed;
