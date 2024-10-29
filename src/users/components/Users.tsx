import { useForm } from "react-hook-form";

const Users = () => {
  // ========== State ============
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>({ mode: "all" });

  // ========== Submit Function ============
  const onSubmit = () => {
    console.log("submit");
  };
  // ========== Rendering ============
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register("email", {
          required: { value: true, message: "The email is required" },
          maxLength: { value: 10, message: "Too many char" },
        })}
        placeholder="Email"
      />
      <p>{errors.email?.message}</p>
    </form>
  );
};

export default Users;
