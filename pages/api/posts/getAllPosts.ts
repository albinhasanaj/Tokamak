import type { NextApiRequest, NextApiResponse } from 'next'
import Posts from '@/models/postSchema'
import { connectToDB } from '@/lib/connectToDB'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "GET") {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    try {
        await connectToDB()

        const myPosts = await Posts.find()
        if (!myPosts) {
            return res.status(404).json({ error: 'No posts found' })
        }

        console.log(myPosts)
        return res.status(200).json({ posts: myPosts })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
};