import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { PostType } from '../../api/posts/postsTypes.ts';
import type { PostsFormValues } from './postsFormTypes.ts';

import styles from '../blogsForm/blogsForm.module.scss';
import { Loader } from '../loader/Loader.tsx';
import { Button } from '../ui/button/Button.tsx';
import { ControlledImageUpload } from '../ui/controlled/ControlledImageUpload/ControlledImageUpload.tsx';
import { ControlledTextArea } from '../ui/controlled/ControlledTextArea.tsx';
import { ControlledTextField } from '../ui/controlled/ControlledTextField.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import { postsSchema } from './postsForm.validation.ts';

type PostFormType = {
    isLoading: boolean;
    onSubmit: (data: FormData) => Promise<void>;
    post?: PostType | null;
    title?: string;
};

export const PostForm = ({ isLoading, onSubmit, post, title = 'Add post' }: PostFormType) => {
    const { control, handleSubmit, reset } = useForm<PostsFormValues>({
        resolver: zodResolver(postsSchema),
        defaultValues: {
            title: '',
            shortDescription: '',
            content: '',
            file: null,
        },
    });

    const onSubmitForm = async (data: PostsFormValues) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('shortDescription', data.shortDescription);
        formData.append('content', data.content);
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
        if (!post) {
            return;
        }

        reset({
            title: post.title ?? '',
            shortDescription: post.shortDescription ?? '',
            content: post.content ?? '',
            file: null,
        });
    }, [post, reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
            <div className={styles.inputWrapper}>
                <Typography variant="h2">{title}</Typography>
                <ControlledTextField placeholder="Title" control={control} name="title" />
                <ControlledTextField
                    placeholder="Shord description"
                    control={control}
                    name="shortDescription"
                />
                <ControlledTextArea placeholder="Content" control={control} name="content" />
                <ControlledImageUpload control={control} name="file" label="Upload image" />
                {isLoading && <Loader />}
            </div>
            <Button type="submit">{title}</Button>
        </form>
    );
};
