import { Spot, Like } from "@/lib/generated/prisma/client"

export type SpotWithAuthor = Spot & {
    author: {
        id: string;
        name: string;
    };
    likes: Like[];
    likedByUser?: boolean;
}

// export interface Spot {
//     id: string;
//     name: string;
//     description: string;
//     location: string;
//     latitude: number;
//     longitude: number;
//     imageUrl: string;
//     author: {
//         name: string;
//         avatar: string;
//     };
//     category: string;
//     createdAt: string;
//     likes: number;
// }
