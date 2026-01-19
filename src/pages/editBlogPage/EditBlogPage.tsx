import { useParams } from 'react-router-dom';

import { BlogsForm } from '../../components/blogsForm/BlogsForm.tsx';
import { Loader } from '../../components/loader/Loader.tsx';
import { useEditBlogMutation } from '../../hooks/blogsHooks/useEditBlogMutation.tsx';
import { useGetBlogQuery } from '../../hooks/blogsHooks/useGetBlogQuery.tsx';

export const EditBlogPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: blog, isLoading } = useGetBlogQuery(id);
    const { mutateAsync, isPending } = useEditBlogMutation();
    if (!id) {
        return <div>Wrong blog id</div>;
    }

    if (isLoading) {
        return <Loader />;
    }

    const onEditBlog = async (data: FormData) => {
        await mutateAsync({ id, formData: data });
    };

    return <BlogsForm isLoading={isPending} onSubmit={onEditBlog} blog={blog} title="Edit blog" />;
};
