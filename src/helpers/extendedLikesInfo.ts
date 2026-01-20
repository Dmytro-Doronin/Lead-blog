import type { ExtendedLikesInfoType } from '../components/card/types.ts';
import type { LikeStatus } from './nextStatus.ts';

export const applyLikeOptimistic = (
    info: ExtendedLikesInfoType,
    next: LikeStatus,
): ExtendedLikesInfoType => {
    const prev = info.myStatus;

    let likes = info.likesCount;
    let dislikes = info.dislikesCount;

    if (prev === 'Like') {
        likes -= 1;
    }
    if (prev === 'Dislike') {
        dislikes -= 1;
    }

    if (next === 'Like') {
        likes += 1;
    }
    if (next === 'Dislike') {
        dislikes += 1;
    }

    return {
        ...info,
        myStatus: next,
        likesCount: likes,
        dislikesCount: dislikes,
    };
};
