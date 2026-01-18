import { type ChangeEvent, useEffect, useRef, useState } from 'react';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

import { Button } from '../../button/Button';
import styles from './ControlledImageUpload.module.scss';

type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
    accept?: string;
};

export const ControlledImageUpload = <T extends FieldValues>({
    name,
    control,
    label,
    accept = 'image/png,image/jpeg',
}: Props<T>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    useEffect(() => {
        if (!value && preview) {
            URL.revokeObjectURL(preview);
            setPreview(null);
        }
    }, [value, preview]);

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] ?? null;
        e.target.value = '';

        if (preview) {
            URL.revokeObjectURL(preview);
        }

        onChange(file);

        if (file) {
            setPreview(URL.createObjectURL(file));
        } else {
            setPreview(null);
        }
    };

    const triggerFileDialog = () => inputRef.current?.click();

    const hasPreview = !!preview;

    return (
        <div className={styles.uploadWrapper}>
            <Button variant="secondary" type="button" onClick={triggerFileDialog}>
                {hasPreview ? 'Change Image' : label}
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={handleSelectFile}
                className={styles.input}
            />

            {hasPreview && (
                <div className={styles.imageWrapper}>
                    <img src={preview} alt="preview" className={styles.image} />
                </div>
            )}

            {error?.message && <p className="error">{error.message}</p>}
        </div>
    );
};
