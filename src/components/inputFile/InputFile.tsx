import { type ChangeEvent, type ReactElement, useRef } from 'react';

type InputFileProps = {
    callback?: (file: File) => void;
    onError?: (message: string) => void;
    children: ReactElement;

    accept?: string;
    maxSizeBytes?: number;
    allowedTypes?: string[];
    disabled?: boolean;
};

export const InputFile = ({
    callback,
    children,
    accept = 'image/png,image/jpeg',
    disabled = false,
}: InputFileProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const selectFileHandler = () => {
        if (disabled) {
            return;
        }
        inputRef.current?.click();
    };

    const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        e.target.value = '';

        if (!file) {
            return;
        }

        callback?.(file);
    };

    return (
        <div onClick={selectFileHandler} role="button" tabIndex={0}>
            {children}
            <input
                style={{ display: 'none' }}
                ref={inputRef}
                type="file"
                accept={accept}
                onChange={uploadHandler}
                disabled={disabled}
            />
        </div>
    );
};
