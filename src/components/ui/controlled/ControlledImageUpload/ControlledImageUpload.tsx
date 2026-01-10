import { ChangeEvent, useRef, useState } from 'react';
import { useController, Control, FieldValues, Path } from 'react-hook-form';

import { Button } from '../../button/Button.tsx';
import styles from './ControlledImageUpload.module.scss';
type Props<T extends FieldValues> = {
    name: Path<T>;
    control: Control<T>;
    label: string;
};

export const ControlledImageUpload = <T extends FieldValues>({
    name,
    control,
    label,
}: Props<T>) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const {
        field: { onChange },
        fieldState: { error },
    } = useController({ name, control });

    const handleSelectFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange([file]);
            setPreview(URL.createObjectURL(file));
        }
    };

    const triggerFileDialog = () => {
        inputRef.current?.click();
    };

    return (
        <div className={styles.uploadWrapper}>
            <Button variant="secondary" type="button" onClick={triggerFileDialog}>
                {preview ? 'Change Image' : label}
            </Button>

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleSelectFile}
                className={styles.input}
            />

            {preview && (
                <div className={styles.imageWrapper}>
                    <img src={preview} alt="preview" style={{ maxWidth: '200px' }} />
                </div>
            )}

            {error && <p className={styles.error}>{error.message}</p>}
        </div>
    );
};
