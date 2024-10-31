import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Option } from "../../types/option";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
  label: string;
};

const RHFRadioGroup = <T extends FieldValues>({
  name,
  options,
  label,
}: RHFProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <FormControl {...field} error={!!error}>
          <FormLabel>{label}</FormLabel>
          <RadioGroup>
            {options?.map((option) => (
              <FormControlLabel
                key={option.id}
                value={option.id}
                label={option.label}
                control={<Radio checked={field.value === option.id} />}
              />
            ))}
          </RadioGroup>
        </FormControl>
      )}
    ></Controller>
  );
};

export default RHFRadioGroup;
