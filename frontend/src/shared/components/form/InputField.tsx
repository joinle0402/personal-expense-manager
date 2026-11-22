import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

export type InputFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'defaultValue'> & {
    name: Path<T>;
    control: Control<T>;
};

export default function InputField<T extends FieldValues>({ name, control, helperText, ...props }: InputFieldProps<T>) {
    const { field, fieldState } = useController({ name, control });
    return <TextField size={props.size || 'small'} {...props} {...field} inputRef={field.ref} error={!!fieldState.error} helperText={fieldState.error?.message ?? helperText} />;
}
