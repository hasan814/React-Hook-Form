import { useState } from "react";

const Users = () => {
  // ========== State ============
  const [input, setInput] = useState("");

  // ========== Rendering ============
  return (
    <input
      value={input}
      onChange={(event) => setInput(event.target.value)}
      name="userName"
      disabled
      required
    />
  );
};

export default Users;
