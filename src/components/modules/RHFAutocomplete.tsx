import { Controller, useFormContext } from "react-hook-form";
import { Autocomplete } from "@mui/material";

type RHFProps = { name: string };

const RHFAutocomplete = ({ name }: RHFProps) => {
  // =========== Context =============
  const { control } = useFormContext();

  // =========== Rendering =============
  return (
    <Controller
      control={control}
      name={name}
      render={(params) => <Autocomplete />}
    />
  );
};

export default RHFAutocomplete;
