import { useAddCommentMutation } from '../../../hooks/comments/useAddCommentMutation.tsx';
import { useCommentsQuery } from '../../../hooks/comments/useCommentsQuery.tsx';
import { CommentsForm } from '../../commentForm/CommentForm.tsx';
import { Button } from '../../ui/button/Button.tsx';
import { CommentList } from '../commentsList/CommentsList.tsx';
import styles from './commentSection.module.scss';
type Props = {
    postId: string;
    isAuth: boolean;
    currentUserId?: string;
};

export const CommentsSection = ({ postId, isAuth, currentUserId }: Props) => {
    const { mutateAsync, isPending } = useAddCommentMutation();
    const {
        data: comments,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
    } = useCommentsQuery({
        pageSize: 6,
        sortBy: 'createdAt',
        sortDirection: 'desc',
        id: postId,
    });
    const commentItems = comments?.pages.flatMap((p) => p.items) ?? [];

    const onSubmitForm = async (data: string) => {
        console.log(data);
        await mutateAsync({ id: postId, content: data });
    };

    return (
        <section className={styles.commentSection}>
            {isAuth && <CommentsForm isLoading={isPending} onSubmit={onSubmitForm} />}

            <CommentList
                items={commentItems ?? []}
                isAuth={isAuth}
                currentUserId={currentUserId}
                postId={postId}
            />

            {hasNextPage && (
                <Button
                    onClick={() => fetchNextPage()}
                    disabled={!hasNextPage || isFetchingNextPage}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load more'}
                </Button>
            )}
        </section>
    );
};
