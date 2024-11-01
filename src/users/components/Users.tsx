import { Button, Stack, TextField, Typography } from "@mui/material";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";
import { Schema } from "../types/schema";
import {
  useGenders,
  useLanguages,
  useSkills,
  useStates,
} from "../services/queries";

import RHFToggleButtonGroup from "../../components/modules/RHFToggleButtonGroup";
import RHFDateRangePicker from "../../components/modules/RHFDateRangePicker";
import RHFDateTimePicker from "../../components/modules/RHFDateTimePicker";
import RHFAutocomplete from "../../components/modules/RHFAutocomplete";
import RHFRadioGroup from "../../components/modules/RHFRadioGroup";
import RHFTextField from "../../components/modules/RHFTextField";
import RHFCheckbox from "../../components/modules/RHFCheckbox";
import RHFSlider from "../../components/modules/RHFSlider";
import RHFSwitch from "../../components/modules/RHFSwitch";

const Users = () => {
  // ========== Query ============
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const statesQuery = useStates();
  const skillsQuery = useSkills();

  // ========== Context ============
  const { watch, control, unregister } = useFormContext<Schema>();

  // ========== Effect ============
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  // ========== useFieldArray ============
  const isTeacher = useWatch({ control, name: "isTeacher" });
  const { append, fields, remove, replace } = useFieldArray({
    control,
    name: "students",
  });

  // ========== Replace ============
  useEffect(() => {
    if (!isTeacher) {
      replace([]);
      unregister("students");
    }
  }, [isTeacher, replace, unregister]);

  // ========== Rendering ============
  return (
    <Stack sx={{ gap: 2 }}>
      <RHFTextField<Schema> name="name" label="Name" />
      <RHFTextField<Schema> name="email" label="Email" />
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
      <RHFSwitch<Schema> name="isTeacher" label="Are you a teacher?" />
      {isTeacher && (
        <Button onClick={() => append({ name: "" })} type="button">
          Add new Student
        </Button>
      )}
      {fields.map((field, index) => (
        <>
          <RHFTextField
            name={`students.${index}.name`}
            label="Name"
            key={field.id}
          />
          <Button color="error" onClick={() => remove(index)} type="button">
            Remove
          </Button>
        </>
      ))}
    </Stack>
  );
};

export default Users;
