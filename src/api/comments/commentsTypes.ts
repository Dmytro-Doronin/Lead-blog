import type { likeStatusType } from '../../components/card/types.ts';
import type { SortDirection } from '../blogs/blogsTypes.ts';

export type CommentType = {
    id: string;
    content: string;
    commentatorInfo: {
        userId: string;
        userLogin: string;
        userImageUrl: string;
    };
    createdAt: string;
    likesInfo: {
        likesCount: number;
        dislikesCount: number;
        myStatus: likeStatusType;
    };
};
export type CommentsQueryParams = {
    sortBy?: string;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
};

export type CommentsFinalType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: CommentType[];
};
