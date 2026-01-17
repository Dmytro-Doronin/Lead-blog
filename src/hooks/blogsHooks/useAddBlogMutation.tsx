import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { addBlog } from '../../api/blogs/blogsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { blogsKeys } from './blogs.keys.ts';

export const useAddBlogMutation = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: addBlog,
        onSuccess: async () => {
            await qc.resetQueries({ queryKey: blogsKeys.all });
            navigate('/blogs', { replace: true });
        },
        onError: (error) => {
            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to add blog',
            });
        },
    });
};
