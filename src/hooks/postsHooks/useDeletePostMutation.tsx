import type { PostFinalType } from '../../api/posts/postsTypes.ts';

import { deletePost } from '../../api/posts/postsApi.ts';
import { useDeleteInfiniteItemMutation } from '../useDeleteInfiniteItemMutation.tsx';
import { postsKeys } from './posts.keys.ts';

export const useDeletePostMutation = () =>
    useDeleteInfiniteItemMutation<PostFinalType>({
        mutationFn: deletePost,
        keys: { all: postsKeys.all, byId: postsKeys.byId, listRoot: ['posts', 'postsList'] },
        successMessage: 'Post deleted successfully.',
        errorMessageFallback: 'Failed to delete post',
    });
