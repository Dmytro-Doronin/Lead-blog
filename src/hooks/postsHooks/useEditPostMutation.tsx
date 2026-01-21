import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { editPost } from '../../api/posts/postsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { postsKeys } from './posts.keys.ts';
type Vars = { id: string; blogId: string; formData: FormData };
export const useEditPostMutation = () => {
    const qc = useQueryClient();
    const navigate = useNavigate();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: ({ id, blogId, formData }: Vars) => {
            const fd = new FormData();
            formData.forEach((v, k) => fd.append(k, v));
            fd.set('blogId', blogId);
            return editPost({ id, formData: fd });
        },
        onSuccess: async (updatedPost, variables) => {
            qc.setQueryData(postsKeys.byId(variables.id), updatedPost);
            await qc.invalidateQueries({
                queryKey: postsKeys.all,
                refetchType: 'all',
            });
            navigate('/posts', { replace: true });
        },
        onError: (error) => {
            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to edit post',
            });
        },
    });
};
