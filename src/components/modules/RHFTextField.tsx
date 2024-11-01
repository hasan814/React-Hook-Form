import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
} & Pick<TextFieldProps, "label">;

const RHFTextField = <T extends FieldValues>({
  name,
  ...props
}: RHFProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          {...props}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default RHFTextField;
