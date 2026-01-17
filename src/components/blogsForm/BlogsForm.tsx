import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import type { MutationBlogType } from '../../api/blogs/blogsTypes.ts';
import type { BlogsFormValues } from './BlogsFormTypes.ts';

import { Loader } from '../loader/Loader.tsx';
import { ControlledImageUpload } from '../ui/controlled/ControlledImageUpload/ControlledImageUpload.tsx';
import { ControlledTextField } from '../ui/controlled/ControlledTextField.tsx';
import styles from './blogsForm.module.scss';
import { blogsSchema } from './blogsForm.validation.ts';

type BlogsFormType = {
    isLoading: boolean;
    onSubmit: (data: MutationBlogType) => void;
};

export const BlogsForm = ({ isLoading, onSubmit }: BlogsFormType) => {
    const {
        control,
        handleSubmit,
        reset,
        // formState: { errors },
    } = useForm<BlogsFormValues>({
        resolver: zodResolver(blogsSchema),
        defaultValues: {
            name: '',
            description: '',
            websiteUrl: '',
            file: null,
        },
    });

    const onSubmitForm = (data: BlogsFormValues) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('websiteUrl', data.websiteUrl);
        if (data.file) {
            formData.append('image', data.file);
        }
        onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmitForm)}>
            <div className={styles.inputWrapper}>
                <ControlledTextField placeholder="Name" control={control} name="name" />
                <ControlledTextField
                    placeholder="Description"
                    control={control}
                    name="description"
                />
                <ControlledTextField
                    placeholder="Web site URL"
                    control={control}
                    name="websiteUrl"
                />
                {/*<Controller*/}
                {/*    name="file"*/}
                {/*    control={control}*/}
                {/*    render={({ field }) => (*/}
                {/*        <>*/}
                {/*            <InputFile callback={(file) => field.onChange(file)}>*/}
                {/*                <Button type="button" variant="secondary">*/}
                {/*                    Upload image*/}
                {/*                </Button>*/}
                {/*            </InputFile>*/}

                {/*            {errors.file?.message && (*/}
                {/*                <div className="error">{errors.file.message}</div>*/}
                {/*            )}*/}
                {/*        </>*/}
                {/*    )}*/}
                {/*/>*/}
                <ControlledImageUpload control={control} name="file" label="Upload image" />
                {isLoading && <Loader />}
            </div>
        </form>
    );
};
