import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { addPostForBlog } from '../../api/blogs/blogsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { postsKeys } from '../postsHooks/posts.keys.ts';
import { useNotification } from '../useNotification.tsx';

export const useAddPostForBlogMutation = (blogId: string) => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: (formData: FormData) => addPostForBlog({ blogId, formData }),
        onSuccess: async () => {
            await qc.resetQueries({ queryKey: postsKeys.all });
            navigate(`/blogs/${blogId}/posts`, { replace: true });
        },
        onError: (error) => {
            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to add post',
            });
        },
    });
};
