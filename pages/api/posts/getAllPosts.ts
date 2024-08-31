import type { NextApiRequest, NextApiResponse } from 'next'
import Posts from '@/models/postSchema'
import { connectToDB } from '@/lib/connectToDB'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        await connectToDB();

        const myPosts = await Posts.find().lean(); // Use .lean() to get plain JS objects

        if (!myPosts) {
            return res.status(404).json({ error: 'No posts found' });
        }

        // Transform posts to replace likes array with the count
        const transformedPosts = myPosts.map(post => ({
            ...post, // Spread the original post
            likes: Array.isArray(post.likes) ? post.likes.length : 0, // Replace likes with its count
            comments: Array.isArray(post.comments) ? post.comments.length : 0, // Also handle comments similarly if needed
        }));

        console.log(transformedPosts);

        return res.status(200).json({ posts: transformedPosts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
