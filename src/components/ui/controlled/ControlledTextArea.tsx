import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

import { TextArea, type TextAreaFieldProps } from '../textArea/TextArea.tsx';

export type ControlledTextAreaProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<TextAreaFieldProps, 'onChange' | 'value'>;

export const ControlledTextArea = <T extends FieldValues>({
    name,
    control,
    ...restProps
}: ControlledTextAreaProps<T>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <TextArea
            {...{
                name,
                onValueChange: onChange,
                values: value,
                errorMessage: error?.message,
                ...restProps,
            }}
        />
    );
};
