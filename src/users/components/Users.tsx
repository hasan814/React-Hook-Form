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
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <RHFAutocomplete<Schema>
        name="states"
        label="States"
        options={[{ id: "i", label: "Tehran" }]}
      />
    </Stack>
  );
};

export default Users;
