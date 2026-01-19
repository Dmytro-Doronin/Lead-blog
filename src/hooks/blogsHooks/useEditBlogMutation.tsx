import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { editBlog } from '../../api/blogs/blogsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { blogsKeys } from './blogs.keys.ts';

export const useEditBlogMutation = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: editBlog,
        onSuccess: async (updatedBlog, variables) => {
            qc.setQueryData(blogsKeys.byId(variables.id), updatedBlog);
            await qc.invalidateQueries({
                queryKey: blogsKeys.all,
                refetchType: 'all',
            });
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
