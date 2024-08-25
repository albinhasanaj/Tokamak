"use client";
import React, { Fragment, useEffect, useState } from 'react';
import Image from 'next/image';

// Correct interface definition based on Python script output
interface ImageProps {
    image: string;  // Matches the key from the Python script output
    width: number;
    height: number;
}

const Explore = () => {
    const [images, setImages] = useState<ImageProps[]>([]); // Updated initial state type
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        // Fetch data from the API
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/api/images"); // Direct request to Python server
                if (res.ok) {
                    const data = await res.json(); // Assuming the API returns an array of images

                    console.log(data)
                    setImages(data); // Directly set images if API returns an array of objects
                    setLoading(false);
                } else {
                    throw new Error("Network response was not ok");
                }

            } catch (error) {
                setLoading(true);
                console.error("There was an error!", error);
            }
        };

        fetchData();
    }, []);


    return (
        <main className='w-full flex justify-center'>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {loading ? (
                    <p>Loading...</p>
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
                                            className="rounded-lg  w-[300px] h-auto"
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

export default Explore
