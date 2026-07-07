export interface Spot {
    id: string;
    name: string;
    description: string;
    location: string;
    latitude: number;
    longitude: number;
    imageUrl: string;
    author: {
        name: string;
        avatar: string;
    };
    category: string;
    createdAt: string;
    likes: number;
}
