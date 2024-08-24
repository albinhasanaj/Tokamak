export interface Post {
    id: number;
    title: string;
    content: string;
}
const ProfilePosts: Post[] = [];

const AmountOfPosts = 50;

for (let i = 1; i <= AmountOfPosts; i++) {
    ProfilePosts.push({
        id: i,
        title: `Post ${i}`,
        content: `This is the content for post ${i}`
    });
}

export default ProfilePosts;

