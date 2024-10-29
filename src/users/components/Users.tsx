import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { Schema } from "../types/schema";
import RHFAutocomplete from "../../components/modules/RHFAutocomplete";

const Users = () => {
  // ========== Context ============
  const {
    register,
    formState: { errors },
  } = useFormContext<Schema>();

  // ========== Rendering ============
  return (
    <Stack sx={{ gap: 2 }}>
      <TextField
        label="Name"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField
        {...register("email")}
        label="Email"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema> name="state" />
    </Stack>
  );
};

export default Users;
