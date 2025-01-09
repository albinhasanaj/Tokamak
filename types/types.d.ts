declare interface ImageProps {
    imgUrl: string;
    height: number;
    width: number;
}

export interface Post {
    id: number;
    title: string;
    image: string;
    width?: number;
    height?: number;
}

declare interface FeedProps {
    images: Post[];
    selectedPost: Post | null;
    scaleImage: boolean;
    onSelectPost: (post: Post) => void;
    onDeselectPost: () => void;
    onToggleScaleImage: () => void;
    imageLink: string;
}