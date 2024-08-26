export interface Post {
    id: number;
    title: string;
    image: string;
}
const ProfilePosts: Post[] = [];

const AmountOfPosts = 34;

for (let i = 1; i <= AmountOfPosts; i++) {
    ProfilePosts.push({
        id: i,
        title: `Post ${i}`,
        image: `https://picsum.photos/200/300?random=${i}`,
    });
}


export default ProfilePosts;

