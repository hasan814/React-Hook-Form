import { Controller, FieldValues, Path, useFormContext } from "react-hook-form";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

type RHFProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
};

const RHFDateTimePicker = <T extends FieldValues>({
  name,
  label,
}: RHFProps<T>) => {
  const { control } = useFormContext<T>();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker label={label} {...field} />
        </LocalizationProvider>
      )}
    />
  );
};

export default RHFDateTimePicker;