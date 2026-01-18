import { BlogsForm } from '../../components/blogsForm/BlogsForm.tsx';
import { useAddBlogMutation } from '../../hooks/blogsHooks/useAddBlogMutation.tsx';

export const CreateBlogPage = () => {
    const { mutateAsync, isPending } = useAddBlogMutation();

    const noAddBlog = async (data: FormData) => {
        await mutateAsync(data);
    };
    return <BlogsForm isLoading={isPending} onSubmit={noAddBlog} />;
};
