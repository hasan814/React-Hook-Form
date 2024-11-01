import { defaultValues, Schema } from "../types/schema";
import { useEffect } from "react";

import {
  useFormContext,
  SubmitHandler,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import {
  ListItemButton,
  ListSubheader,
  ListItemText,
  Typography,
  Container,
  ListItem,
  Button,
  Stack,
  List,
} from "@mui/material";

import {
  useLanguages,
  useGenders,
  useSkills,
  useStates,
  useUsers,
  useUser,
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
import { useCreateUser } from "../services/mutations";

const Users = () => {
  // ========== Query ============
  const languagesQuery = useLanguages();
  const gendersQuery = useGenders();
  const statesQuery = useStates();
  const skillsQuery = useSkills();
  const usersQuery = useUsers();

  // ========== Context ============
  const { watch, control, unregister, reset, setValue, handleSubmit } =
    useFormContext<Schema>();
  const id = useWatch({ control, name: "id" });
  const variant = useWatch({ control, name: "variant" });
  const userQuery = useUser(id);

  // ========== Effect ============
  useEffect(() => {
    const sub = watch((value) => {
      console.log(value);
    });
    return () => sub.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (userQuery.data) {
      reset(userQuery.data);
    }
  }, [reset, userQuery.data]);

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

  // ========== Reset Function ============
  const resetHandler = () => {
    reset(defaultValues);
  };

  // ========== User Function ============
  const userClickHandler = (id: string) => {
    setValue("id", id);
  };

  // ========== Submit Function ============
  const createUserMutation = useCreateUser();

  const onSubmit: SubmitHandler<Schema> = (data) => {
    if (variant === "create") {
      createUserMutation.mutate(data);
    } else {
      // Edit
    }
  };

  // ========== Rendering ============
  return (
    <Container maxWidth="sm" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack sx={{ flexDirection: "row", gap: 2 }}>
        <List subheader={<ListSubheader>Users</ListSubheader>}>
          {usersQuery.data?.map((user) => (
            <ListItem disablePadding key={user.id}>
              <ListItemButton
                onClick={() => userClickHandler(user.id)}
                selected={id === user.id}
              >
                <ListItemText primary={user.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
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
      </Stack>
      <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Button type="submit">New User</Button>
        <Button onClick={resetHandler}>Reset</Button>
      </Stack>
    </Container>
  );
};

export default Users;
