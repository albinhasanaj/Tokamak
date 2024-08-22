import React from 'react'
import Image from 'next/image'

const Explore = () => {

    const Feeds = Array.from({ length: 50 }).map((_, index) => {
        const width = 300
        const height = Math.floor(Math.random() * 100) + 200
        return {
            image: `https://picsum.photos/${width}/${height}?random=${index}`,
            width,
            height
        };
    });

    return (
        <main className='w-full flex justify-center'>
            <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
                {Feeds.map((feed, index) => (
                    <div key={index} className="mb-4 break-inside-avoid">
                        <Image
                            src={feed.image}
                            width={feed.width}
                            height={feed.height}
                            className="rounded-lg"
                            alt="random image"
                        />
                    </div>
                ))}
            </div>
        </main>
    )
}

export default Explore
