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
});

export const postToCardItem = (post: PostType): CardItem => ({
    id: post.id,
    title: post.title,
    description: post.shortDescription,
    createdAt: post.createdAt,
    userId: post.userId,
    userName: post.userName,
    imageUrl: post.imageUrl,
});
