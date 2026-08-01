import { create } from "zustand";

type LikeState = {
    liked: boolean;
    likeCount: number;
};

type LikesStore = {
    likes: Record<string, LikeState>;
    initLike: (spotId: string, liked: boolean, likeCount: number) => void;
    toggleLike: (spotId: string, liked: boolean, likeCount: number) => void;
};

export const useLikesStore = create<LikesStore>((set) => ({
    likes: {},
    initLike: (spotId, liked, likeCount) =>
        set((state) => ({
            likes: {
                ...state.likes,
                [spotId]: state.likes[spotId] ?? { liked, likeCount },
            },
        })),
    toggleLike: (spotId, liked, likeCount) =>
        set((state) => ({
            likes: { ...state.likes, [spotId]: { liked, likeCount } },
        })),
}));