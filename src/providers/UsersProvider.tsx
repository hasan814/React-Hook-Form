import { FormProvider, useForm } from "react-hook-form";
import { schema, Schema } from "../users/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";

import Users from "../users/components/Users";

const UsersProvider = () => {
  // ========== State ============
  const methods = useForm<Schema>({
    mode: "all",
    resolver: zodResolver(schema),
  });
  return (
    <FormProvider {...methods}>
      <Users />
    </FormProvider>
  );
};

export default UsersProvider;
