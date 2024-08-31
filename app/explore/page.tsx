"use client";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSearchParams, usePathname } from 'next/navigation';
import Feed from '@/components/Feed';
import { MoonLoader } from 'react-spinners';

export interface Post {
    id: number;
    title: string;
    image: string;
    width?: number;
    height?: number;
}

const Explore: React.FC = () => {
    const [images, setImages] = useState<Post[]>([]); // State to hold fetched posts
    const [loading, setLoading] = useState<boolean>(true);
    const [sliderValue, setSliderValue] = useState<number>(1);
    const [selectedPost, setSelectedPost] = useState<Post | null>(null);
    const [scaleImage, setScaleImage] = useState(false);
    const [link, setLink] = useState('');

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const fetchData = async (path: string) => {
        try {
            setLoading(true);
            const res = await fetch(`http://localhost:5000/api/${path}`);
            if (res.ok) {
                const data = await res.json();
                const fetchedPosts = data.map((item: any, index: number) => ({
                    id: index + 1,
                    title: `Post ${index + 1}`,
                    image: item.image,
                    width: item.width,
                    height: item.height,
                })).reverse();
                setImages(fetchedPosts); // Remove .reverse() if you don't need the reversed order
                setLoading(false);
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            setLoading(false);
            console.error("There was an error fetching images!", error);
            toast.error("There was an error fetching images. Please try again later.");
        }
    };

    useEffect(() => {
        fetchData('images/serveAll');
    }, []);

    useEffect(() => {
        const id = searchParams?.get('post');
        const title = searchParams?.get('post_title')?.replace(/_/g, ' ');
        if (id && title) {
            const post = images.find((image: Post) => image.id === Number(id) && image.title === title);
            setSelectedPost(post || null);
            setScaleImage(false);
        }
    }, [searchParams, images]);

    const handleRefresh = () => {
        fetchData(`images/${sliderValue}`);
    };

    const handleSelectPost = (post: Post) => {
        setSelectedPost(post);
        setLink(post.image)
        window.history.pushState(null, '', `${pathname}?post=${post.id}&post_title=${encodeURIComponent(post.title.replace(/ /g, '_'))}`);
    };

    const handleDeselectPost = () => {
        setScaleImage(false);
        setSelectedPost(null); // Clear selected post
        window.history.replaceState(null, '', pathname); // Remove query params
    };

    const handleToggleScaleImage = () => {
        setScaleImage(!scaleImage);
    };

    return (
        <main className='w-full flex flex-col items-center'>
            <div className='flex gap-4 text-white w-full justify-center mt-6'>
                <input
                    type="range"
                    min="1"
                    max="25"
                    value={sliderValue}
                    className="w-1/4"
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                />
                <span>{sliderValue}</span>
            </div>
            <button
                {...(loading ? { disabled: true } : {})}
                onClick={handleRefresh}
                className="w-[150px] h-[50px] mb-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300 flex items-center justify-center"
            >
                {loading ? <MoonLoader color="#ffffff" size={24} /> : "Refetch Images"}
            </button>
            <Feed
                images={images}
                selectedPost={selectedPost}
                scaleImage={scaleImage}
                onSelectPost={handleSelectPost}
                onDeselectPost={handleDeselectPost}
                onToggleScaleImage={handleToggleScaleImage}
                imageLink={link}
            />
        </main>
    );
};

export default Explore;
