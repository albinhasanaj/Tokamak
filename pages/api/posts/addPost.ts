import type { NextApiRequest, NextApiResponse } from 'next'
import { getAuth } from '@clerk/nextjs/server'
import Posts from '@/models/postSchema'
import { connectToDB } from '@/lib/connectToDB'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: 'Method Not Allowed' })
    }

    const { userId } = getAuth(req)

    if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' })
    }

    try {
        await connectToDB()

        const { description, imageLink } = req.body

        const post = new Posts({
            userId,
            image: imageLink,
            caption: description
        })

        const savedPost = await post.save()
        if (!savedPost) {
            return res.status(500).json({ error: 'Failed to add post' })
        }

        return res.status(200).json({ message: 'Post added successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}