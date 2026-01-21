import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import type { CommentType } from '../../api/comments/commentsTypes.ts';
import type { CommentsFormValues } from './CommentsFormTypes.ts';

import { Loader } from '../loader/Loader.tsx';
import { Button } from '../ui/button/Button.tsx';
import { ControlledTextArea } from '../ui/controlled/ControlledTextArea.tsx';
import { Typography } from '../ui/typography/Typography.tsx';
import styles from './commentForm.module.scss';
import { commentSchema } from './commentsForm.validation.ts';

type BlogsFormType = {
    isLoading: boolean;
    onSubmit: (data: string) => Promise<void>;
    comment?: CommentType | null;
    title?: string;
};

export const CommentsForm = ({
    isLoading,
    onSubmit,
    comment,
    title = 'Add comment',
}: BlogsFormType) => {
    const { control, handleSubmit, reset } = useForm<CommentsFormValues>({
        resolver: zodResolver(commentSchema),
        defaultValues: {
            content: '',
        },
    });

    const onSubmitForm = async (data: CommentsFormValues) => {
        try {
            await onSubmit(data.content);
            reset();
        } catch {
            /* empty */
        }
    };

    useEffect(() => {
        if (!comment) {
            return;
        }

        reset({
            content: comment?.content ?? '',
        });
    }, [comment, reset]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmitForm)}>
            <div className={styles.inputWrapper}>
                <Typography variant="h2">{title}</Typography>
                <ControlledTextArea placeholder="Comment..." control={control} name="content" />
                {isLoading && <Loader />}
            </div>
            <Button type="submit">{title}</Button>
        </form>
    );
};
