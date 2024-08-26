"use client";
import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';
import { MoonLoader } from 'react-spinners';
import toast from 'react-hot-toast';

// Correct interface definition based on Python script output
interface ImageProps {
    image: string;  // Matches the key from the Python script output
    width: number;
    height: number;
}

const Explore = () => {
    const [images, setImages] = useState<ImageProps[]>([]); // Updated initial state type
    const [loading, setLoading] = useState<boolean>(true);
    const [refresh, setRefresh] = useState<boolean>(false);
    const [sliderValue, setSliderValue] = useState<number>(1);

    const fetchData = async (path: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/${path}`); // Direct request to Python server
            if (res.ok) {
                const data = await res.json();

                console.log(data)
                setImages(data);
                setLoading(false);

            } else {
                throw new Error("Network response was not ok");
            }

        } catch (error) {
            setLoading(true);
            console.error("There was an error!", error);
            toast.error("There was an error fetching images. Please try again later.");
        }

    }

    useEffect(() => {
        fetchData('images/serveAll');
    }, []);


    const handleRefresh = () => {
        setLoading(true);
        fetchData(`images/${sliderValue}`);
    }

    return (
        <main className='w-full flex flex-col items-center'>
            {/* Refetch Button */}
            {/* add slider from 1-25 */}
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
                onClick={handleRefresh}
                className="px-6 py-3 mb-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
            >
                Refetch Images
            </button>

            {/* Images Grid */}
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {loading ? (
                    <div className="flex justify-center items-center h-screen w-full">
                        <MoonLoader color="#fff" loading={loading} size={100} />
                    </div>
                ) : (
                    <Fragment>
                        {images.length > 0 && (  // Check if images array has content
                            <Fragment>
                                {images.map((image, index) => (
                                    <div key={index} className="mb-4 break-inside-avoid">
                                        <Image
                                            src={image.image}  // Correct property name for src
                                            width={image.width}  // Correct property name for width
                                            height={image.height}  // Correct property name for height
                                            className="rounded-lg w-[300px] h-auto"
                                            alt={`Random image ${index}`} // Unique alt text for accessibility
                                        />
                                    </div>
                                ))}
                            </Fragment>
                        )}
                    </Fragment>
                )}
            </div>
        </main>
    )
}

export default Explore;
