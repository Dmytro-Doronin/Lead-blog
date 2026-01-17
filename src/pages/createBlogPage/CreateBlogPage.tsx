import { BlogsForm } from '../../components/blogsForm/BlogsForm.tsx';
import { useAddBlogMutation } from '../../hooks/blogsHooks/useAddBlogMutation.tsx';

export const CreateBlogPage = () => {
    const { mutate, isPending } = useAddBlogMutation();

    const noAddBlog = async (data: FormData) => {
        mutate(data);
    };
    return <BlogsForm isLoading={isPending} onSubmit={noAddBlog} />;
};
