import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Option } from "../../types/option";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  options?: Option[];
};

const RHFToggleButtonGroup = <T extends FieldValues>({
  name,
  options,
}: RHFProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value, ...restField } }) => (
        <ToggleButtonGroup
          onChange={(_, newValue) => {
            if (newValue.length) {
              onChange(newValue);
            }
          }}
          value={value.length ? value : [options?.[0].id]}
          {...restField}
        >
          {options?.map((option) => (
            <ToggleButton value={option.id} key={option.id}>
              {option.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      )}
    ></Controller>
  );
};

export default RHFToggleButtonGroup;
