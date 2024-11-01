import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { FormControlLabel, Switch } from "@mui/material";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFSwitch = <T extends FieldValues>({ name, label }: RHFProps<T>) => {
  const { control } = useFormContext<T>();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormControlLabel
          control={<Switch {...field} checked={field.value} />}
          label={label}
        />
      )}
    />
  );
};

export default RHFSwitch;
