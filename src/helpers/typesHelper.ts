import type { BlogType } from '../api/blogs/blogsTypes.ts';
import type { PostType } from '../api/posts/postsTypes.ts';
import type { CardItem } from '../components/card/types.ts';

export const blogToCardItem = (blog: BlogType): CardItem => ({
    id: blog.id,
    title: blog.name,
    description: blog.description,
    createdAt: blog.createdAt,
    userId: blog.userId,
    userName: blog.userName,
    imageUrl: blog.imageUrl,
    extendedLikesInfo: {
        likesCount: null,
        dislikesCount: null,
        myStatus: null,
        newestLikes: null,
    },
});

export const postToCardItem = (post: PostType): CardItem => ({
    id: post.id,
    title: post.title,
    description: post.shortDescription,
    createdAt: post.createdAt,
    userId: post.userId,
    userName: post.userName,
    imageUrl: post.imageUrl,
    extendedLikesInfo: {
        likesCount: post.extendedLikesInfo.likesCount,
        dislikesCount: post.extendedLikesInfo.dislikesCount,
        myStatus: post.extendedLikesInfo.myStatus,
        newestLikes: post.extendedLikesInfo.newestLikes,
    },
});
