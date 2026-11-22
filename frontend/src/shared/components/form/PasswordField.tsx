import { useState } from 'react';
import { IconButton, InputAdornment, TextField, type TextFieldProps } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useController, type Control, type FieldValues, type Path } from 'react-hook-form';

export type PasswordFieldProps<T extends FieldValues> = Omit<TextFieldProps, 'name' | 'defaultValue' | 'type'> & {
    name: Path<T>;
    control: Control<T>;
};

export default function PasswordField<T extends FieldValues>({ name, control, ...props }: PasswordFieldProps<T>) {
    const [visibility, setVisibility] = useState(false);
    const { field, fieldState } = useController({ name, control });

    const togglePasswordVisibility = () => setVisibility(visibility => !visibility);

    return (
        <TextField
            size={props.size || 'small'}
            {...props}
            {...field}
            inputRef={field.ref}
            type={visibility ? 'text' : 'password'}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            slotProps={{
                ...props.slotProps,
                input: {
                    ...props.slotProps?.input,
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                onClick={togglePasswordVisibility}
                                color={!!fieldState.error ? 'error' : 'default'}
                                edge="end"
                                aria-label={visibility ? 'Hide password' : 'Show password'}
                                onMouseDown={event => event.preventDefault()}
                            >
                                {visibility ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
