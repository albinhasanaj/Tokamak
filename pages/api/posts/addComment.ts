// api/posts/addComment.ts
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "@clerk/nextjs/server";
import { connectToDB } from "@/lib/connectToDB";
import Posts from "@/models/postSchema";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { userId } = getAuth(req);
    const { postId, text } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!postId || !text) {
        return res.status(400).json({ error: 'Post ID and comment text are required' });
    }

    try {
        await connectToDB();

        // Find the post by ID
        const post = await Posts.findOne({ _id: postId });
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        // Add the comment
        post.comments.push({ userId, comment: text });
        await post.save();

        return res.status(200).json({ message: 'Comment added successfully' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
