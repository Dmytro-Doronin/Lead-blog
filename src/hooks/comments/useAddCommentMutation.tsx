import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addComment } from '../../api/comments/commentsApi.ts';
import { getErrorMessage } from '../../helpers/ErrorHelper.ts';
import { useNotification } from '../useNotification.tsx';
import { commentsKeys } from './comments.keys.ts';

type Vars = { id: string; content: string };
export const useAddCommentMutation = () => {
    const qc = useQueryClient();
    const { notify } = useNotification();

    return useMutation({
        mutationFn: ({ id, content }: Vars) => addComment(content, id),
        onSuccess: async (_data, vars) => {
            await qc.invalidateQueries({ queryKey: commentsKeys.byPost(vars.id) });
        },
        onError: (error) => {
            const msg = getErrorMessage(error);
            notify({
                variant: 'error',
                message: msg ?? 'Failed to add comment',
            });
        },
    });
};
