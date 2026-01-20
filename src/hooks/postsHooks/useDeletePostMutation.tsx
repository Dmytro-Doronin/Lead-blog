import type { BlogFinalType } from '../../api/blogs/blogsTypes.ts';

import { deleteBlog } from '../../api/blogs/blogsApi.ts';
import { useDeleteInfiniteItemMutation } from '../useDeleteInfiniteItemMutation.tsx';
import { postsKeys } from './posts.keys.ts';

export const useDeletePostMutation = () =>
    useDeleteInfiniteItemMutation<BlogFinalType>({
        mutationFn: deleteBlog,
        keys: { all: postsKeys.all, byId: postsKeys.byId, listRoot: ['posts', 'postsList'] },
        successMessage: 'Post deleted successfully.',
        errorMessageFallback: 'Failed to delete post',
    });
