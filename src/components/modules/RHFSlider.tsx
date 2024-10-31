import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { Slider, Typography } from "@mui/material";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFSlider = <T extends FieldValues>({ name, label }: RHFProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <>
          <Typography>{label}</Typography>
          <Slider {...field} valueLabelDisplay="auto" />
        </>
      )}
    />
  );
};

export default RHFSlider;
