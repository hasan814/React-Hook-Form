import { Stack, TextField, Typography } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { useEffect } from "react";
import { Schema } from "../types/schema";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";

import RHFToggleButtonGroup from "../../components/modules/RHFToggleButtonGroup";
import RHFDateTimePicker from "../../components/modules/RHFDateTimePicker";
import RHFDateRangePicker from "../../components/modules/RHFDateRangePicker";
import RHFAutocomplete from "../../components/modules/RHFAutocomplete";
import RHFRadioGroup from "../../components/modules/RHFRadioGroup";
import RHFCheckbox from "../../components/modules/RHFCheckbox";
import RHFSlider from "../../components/modules/RHFSlider";

const Users = () => {
  // ========== Query ============
  const statesQuery = useStates();
  const skillsQuery = useSkills();
  const gendersQuery = useGenders();
  const languagesQuery = useLanguages();

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
      <RHFToggleButtonGroup<Schema>
        name="languagesSpoken"
        options={languagesQuery.data}
      />
      <RHFRadioGroup<Schema>
        name="gender"
        label="Gender"
        options={gendersQuery.data}
      />
      <RHFCheckbox<Schema>
        options={skillsQuery.data}
        label="Skills"
        name="skills"
      />
      <RHFDateTimePicker<Schema>
        name="registerationDateAndTime"
        label="Registration Date & Time"
      />
      <Typography>Former Employment Period:</Typography>
      <RHFDateRangePicker<Schema>
        name="formerEmploymentPeriod"
        label="formerEmploymentPeriod"
      />
      <RHFSlider<Schema> name="salaryRange" label="Salary Range" />
    </Stack>
  );
};

export default Users;
