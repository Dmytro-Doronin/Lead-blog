export type SortDirection = 'asc' | 'desc';

export type BlogType = {
    id: string;
    name: string;
    description: string;
    websiteUrl: string;
    createdAt: string;
    userId: string;
    userName: string;
    isMembership: boolean;
    imageUrl: string;
};

export type BlogFinalType = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: BlogType[];
};

export type BlogsQueryParams = {
    searchNameTerm?: string;
    sortBy?: string;
    sortDirection?: SortDirection;
    pageNumber?: number;
    pageSize?: number;
};
