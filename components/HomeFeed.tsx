"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export interface Post {
  id: number;
  title: string;
  image: string;
  width?: number;
  height?: number;
  post_number: number;
  likes?: number;
  caption?: string;
  comments: Comment[]; // Include comments in the post type
}

export interface Comment {
  id: number;
  user: string;
  comment: string;
}

const HomeFeed = () => {
  const pathname = usePathname();
  const [images, setImages] = useState<Post[]>([]);
  const [scaleImage, setScaleImage] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [likes, setLikes] = useState(new Map<number, number>());
  const [newComment, setNewComment] = useState('');

  const handleSelectPost = (post: Post) => {
    setSelectedPost(post);
    console.log('Selected post comments:', post.comments);
    document.body.style.overflow = 'hidden'; // Disable body scroll
    window.history.pushState(null, '', `${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`);
  };

  const handleDisableSelectPost = () => {
    setSelectedPost(undefined);
    document.body.style.overflow = ''; // Re-enable body scroll
    window.history.replaceState(null, '', pathname); // Remove query params
  };

  const handleScaleImage = () => {
    setScaleImage(!scaleImage);
  };

  const handleDisableScaleImage = () => {
    setScaleImage(false);
  };

  const fetchProfilePosts = async () => {
    try {
      const response = await fetch('/api/posts/getAllPosts');
      if (!response.ok) throw new Error("Network response was not ok");

      const data = await response.json();
      const fetchedPosts = data.posts.map((item: any, index: number) => {
        console.log(`Post ${index + 1} comments:`, item.comments); // Log comments for each post
        setLikes((prevLikes) => {
          const newLikes = new Map(prevLikes);
          newLikes.set(item._id, item.likes);
          return newLikes;
        });

        return {
          id: item._id,
          title: `Post ${index + 1}`,
          image: item.image,
          post_number: item.post_number,
          likes: item.likes,
          caption: item.caption,
          comments: item.comments // Ensure comments is an array
        };
      });

      fetchedPosts.sort((a: Post, b: Post) => a.post_number - b.post_number);
      setImages(fetchedPosts);
    } catch (error) {
      setLoading(true);
      console.error("There was an error fetching images!", error);
      toast.error("There was an error fetching images. Please try again later.");
    }
  };


  const handleLike = async (postId: number) => {
    // Optimistic UI update
    try {
      const response = await fetch('/api/posts/likePost', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to like post.');
      }

      const data = await response.json();

      if (data && data.message) {
        if (data.message === 'Post liked') {
          setLikes((prevLikes) => {
            const newLikes = new Map(prevLikes);
            newLikes.set(postId, (newLikes.get(postId) ?? 0) + 1);
            return newLikes;
          });
        } else if (data.message === 'Post unliked') {
          setLikes((prevLikes) => {
            const newLikes = new Map(prevLikes);
            newLikes.set(postId, (newLikes.get(postId) ?? 1) - 1);
            return newLikes;
          });
        }

        toast.success(data.message);
      } else {
        throw new Error('No message in response');
      }
    } catch (error) {
      // Rollback the optimistic update if server fails
      setLikes((prevLikes) => {
        const newLikes = new Map(prevLikes);
        newLikes.set(postId, (newLikes.get(postId) ?? 1) - 1);
        return newLikes;
      });

      console.error('Error liking post:', error);
      toast.error('Failed to like post.');
    }
  };

  const handleComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch('/api/posts/addComment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId: selectedPost?.id,
          text: newComment
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      // Clear the input field and update comments
      setNewComment('');
      await fetchProfilePosts(); // Refresh posts to include new comments
      toast.success('Comment added successfully');
    } catch (error) {
      console.error("There was an error adding comment!", error);
      toast.error("There was an error adding comment. Please try again later.");
    }
  };

  useEffect(() => {
    fetchProfilePosts();
  }, []);

  return (
    <div className="relative min-h-screen text-white">
      <div className={`flex flex-col-reverse gap-16 sm:gap-24 lg:gap-36 mt-20 justify-center px-5 ${selectedPost ? 'pointer-events-none blur-sm' : ''}`}>
        {images.map((post: Post) => (
          <div key={post.id} className="flex flex-col items-center gap-2">
            <Link
              href={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
              as={`${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`}
              title={post.title}
              onClick={() => handleSelectPost(post)}
            >
              <div
                className={`bg-gray-700 w-[280px] h-[280px] sm:w-[420px] sm:h-[420px] lg:w-[600px] lg:h-[600px] rounded-md relative cursor-pointer overflow-hidden transition-transform duration-300 ${selectedPost ? 'scale-110' : 'hover:scale-105'}`}
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
            <p className="text-[#A4A4A4] text-sm">{post.caption}</p>
            <div className="flex gap-5 text-sm">
              <p onClick={(e) => handleLike(post.id)}>
                {likes.get(post.id)} Likes
              </p>
              <p>Comments ({post.comments.length})</p>
            </div>
          </div>
        ))}
      </div>
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-20">
          <div className={`relative bg-gray-700 bg-opacity-50 h-[90vh] w-[500px] lg:w-[850px] max-h-screen rounded-lg overflow-hidden transition-transform duration-500 ${scaleImage ? '' : ''}`}>
            <Link href={pathname ?? ''} passHref>
              <button className="absolute top-4 left-4 bg-black bg-opacity-70 text-white rounded-full p-2 hover:bg-opacity-100 transition-opacity z-[99]" aria-label="Close"
                onClick={() => {
                  handleDisableSelectPost();
                  handleDisableScaleImage();
                }}>
                <Image
                  src='/images/cross.svg' alt='Close' width={24} height={24}
                />
              </button>
            </Link>
            <div className={`flex items-center justify-center h-full flex-col ${scaleImage ? '' : ''}`}>
              <div className='flex justify-center w-full h-full'>
                <div className={`flex flex-col items-center gap-3 justify-center relative ${scaleImage ? 'z-50' : ''}`}>
                  <Image
                    src={selectedPost.image}
                    width={300}
                    height={300}
                    className={`object-contain select-none max-h-[85%] max-w-full w-[500px] cursor-pointer transition-all duration-[350ms] z-[100] ${scaleImage ? 'transform scale-150 translate-x-[35%] translate-y-[0%] left-1/2 top-1/2' : 'hover:scale-[1.02]'}`}
                    alt={`Image for post ${selectedPost.title}`}
                    onClick={handleScaleImage}
                  />
                  <div className="flex flex-col text-white w-full px-4">
                    <div className='flex justify-between items-center text-[16px] w-full mb-2'>
                      <p className="text-[#A4A4A4] font-semibold">@Username</p>
                      <p className="cursor-pointer hover:underline" onClick={(e) => handleLike(selectedPost.id)}>
                        {likes.get(selectedPost.id)} Likes
                      </p>
                    </div>
                    <div className="text-[15px] text-gray-200 leading-6">
                      <p className="break-all max-w-[80%]">
                        {selectedPost.caption}
                      </p>
                    </div>
                  </div>
                </div>
                <div className={`flex flex-col max-w-[350px] w-full justify-between h-full ${scaleImage ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
                  {/* Comment Section */}
                  <div className="overflow-auto scrollbar">
                    <div className='flex flex-col  justify-center h-auto border-l-[2px] border-[#4B5766]'>
                      <div className='flex flex-col gap-3 p-2 scrollbar'>
                        {selectedPost.comments.map((comment) => (
                          <p key={comment.id} className='text-sm break-all scrollbar'>
                            <span className='font-bold text-cyan-400 break-all'>@UsernameGamerBoy: </span>
                            {comment.comment}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className='flex relative'>
                    <input
                      type="text"
                      placeholder='Comment...'
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className='text-white w-full rounded-b-lg bg-[#38424d] border-[2px] border-[#4B5766] focus:border-[rgba(255,255,255,1)] outline-none font-istok p-2 pr-[80px]'
                    />
                    <button
                      onClick={handleComment}
                      className='absolute h-[45px] right-[0] p-3 bottom-0 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold shadow-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-300'
                    >
                      Submit
                    </button>
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
