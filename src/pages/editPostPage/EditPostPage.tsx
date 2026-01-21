import { useParams } from 'react-router-dom';

import { Loader } from '../../components/loader/Loader.tsx';
import { PostForm } from '../../components/postForm/PostForm.tsx';
import { useEditPostMutation } from '../../hooks/postsHooks/useEditPostMutation.tsx';
import { useGetPostQuery } from '../../hooks/postsHooks/useGetPostQuery.tsx';

export const EditPostPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: post, isLoading } = useGetPostQuery(id);
    const { mutateAsync, isPending } = useEditPostMutation();
    if (!id) {
        return <div>Wrong post id</div>;
    }

    if (isLoading || !post) {
        return <Loader />;
    }

    const onEditPost = async (data: FormData) => {
        await mutateAsync({ id, blogId: post.blogId, formData: data });
    };

    return <PostForm isLoading={isPending} onSubmit={onEditPost} post={post} title="Edit blog" />;
};
