export type LikeStatus = 'Like' | 'Dislike' | 'None';

export const nextStatus = (current: LikeStatus, action: 'Like' | 'Dislike'): LikeStatus => {
    if (action === 'Like') {
        return current === 'Like' ? 'None' : 'Like';
    }
    return current === 'Dislike' ? 'None' : 'Dislike';
};
