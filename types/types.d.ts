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