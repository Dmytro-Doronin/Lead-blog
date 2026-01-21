import { useParams } from 'react-router-dom';

import { PostForm } from '../../components/postForm/PostForm.tsx';
import { useAddPostForBlogMutation } from '../../hooks/blogsHooks/useAddPostForBlogMutation.tsx';

export const CreatePostPage = () => {
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <div>Wrong blog id</div>;
    }

    const { mutateAsync, isPending } = useAddPostForBlogMutation(id);

    const onAddPostForBlog = async (data: FormData) => {
        await mutateAsync(data);
    };
    return <PostForm isLoading={isPending} onSubmit={onAddPostForBlog} />;
};
