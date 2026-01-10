import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

import { TextField, type TextFieldProps } from '../textField/TextField.tsx';

export type ControlledTextFieldProps<T extends FieldValues> = UseControllerProps<T> &
    Omit<TextFieldProps, 'onChange' | 'value'>;

export const ControlledTextField = <T extends FieldValues>({
    name,
    control,
    ...restProps
}: ControlledTextFieldProps<T>) => {
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({ name, control });

    return (
        <TextField
            name={name}
            value={value ?? ''}
            onValueChange={onChange}
            errorMessage={error?.message}
            {...restProps}
        />
    );
};
