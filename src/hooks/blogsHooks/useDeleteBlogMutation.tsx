import type { BlogFinalType } from '../../api/blogs/blogsTypes';

import { deleteBlog } from '../../api/blogs/blogsApi';
import { useDeleteInfiniteItemMutation } from '../useDeleteInfiniteItemMutation.tsx';
import { blogsKeys } from './blogs.keys';

export const useDeleteBlogMutation = () =>
    useDeleteInfiniteItemMutation<BlogFinalType>({
        mutationFn: deleteBlog,
        keys: { all: blogsKeys.all, byId: blogsKeys.byId, listRoot: ['blogs', 'list'] },
        successMessage: 'Blog deleted successfully.',
        errorMessageFallback: 'Failed to delete blog',
    });
