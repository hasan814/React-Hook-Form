import { Stack, TextField } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { useStates } from "../services/queries";
import { Schema } from "../types/schema";

import RHFAutocomplete from "../../components/modules/RHFAutocomplete";

const Users = () => {
  // ========== Query ============
  const statesQuery = useStates();

  // ========== Context ============
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<Schema>();

  // ========== Effect ============
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

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
        options={statesQuery.data}
      />
    </Stack>
  );
};

export default Users;
