import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/connectToDB";
import Posts from "@/models/postSchema";
import { randomUUID } from "crypto";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId } = getAuth(req);
    const { postId } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    console.log('userId:', userId);

    if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    console.log('postId:', postId);

    try {
        await connectToDB();

        // Find the post by ID
        const post = await Posts.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Check if the user has already liked the post
        const liked = post.likes.find((like: any) => like.userId === userId);
        if (liked) {
            // Unlike the post
            post.likes = post.likes.filter((like: any) => like.userId !== userId);
            await post.save();
            return res.status(200).json({ message: 'Post unliked' });
        }

        // Like the post
        post.likes.push({ userId });
        await post.save();

        return res.status(200).json({ message: 'Post liked' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
