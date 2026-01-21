import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { BlogType } from '../../api/blogs/blogsTypes.ts';
import type { BlogsFormValues } from './BlogsFormTypes.ts';

import { Loader } from '../loader/Loader.tsx';
import { Button } from '../ui/button/Button.tsx';
import { ControlledImageUpload } from '../ui/controlled/ControlledImageUpload/ControlledImageUpload.tsx';
import { ControlledTextArea } from '../ui/controlled/ControlledTextArea.tsx';
import { ControlledTextField } from '../ui/controlled/ControlledTextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './blogsForm.module.scss';
import { blogsSchema } from './blogsForm.validation.ts';

type BlogsFormType = {
    isLoading: boolean;
    onSubmit: (data: FormData) => Promise<void>;
    blog?: BlogType | null;
    title?: string;
};

export const BlogsForm = ({ isLoading, onSubmit, blog, title = 'Add blog' }: BlogsFormType) => {
    const { control, handleSubmit, reset } = useForm<BlogsFormValues>({
        resolver: zodResolver(blogsSchema),
        defaultValues: {
            name: '',
            description: '',
            websiteUrl: '',
            file: null,
        },
    });

    const onSubmitForm = async (data: BlogsFormValues) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('websiteUrl', data.websiteUrl);
        if (data.file) {
            formData.append('image', data.file);
        }
        try {
            await onSubmit(formData);
            reset();
        } catch {
            /* empty */
        }
    };

    useEffect(() => {
        if (!blog) {
            return;
        }

        reset({
            name: blog.name ?? '',
            description: blog.description ?? '',
            websiteUrl: blog.websiteUrl ?? '',
            file: null,
        });
    }, [blog, reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
            <div className={styles.inputWrapper}>
                <Typography variant="h2">{title}</Typography>
                <ControlledTextField placeholder="Name" control={control} name="name" />
                <ControlledTextArea
                    placeholder="Description"
                    control={control}
                    name="description"
                />
                <ControlledTextField
                    placeholder="Web site URL"
                    control={control}
                    name="websiteUrl"
                />
                <ControlledImageUpload control={control} name="file" label="Upload image" />
                {isLoading && <Loader />}
            </div>
            <Button type="submit">{title}</Button>
        </form>
    );
};
