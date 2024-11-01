import { Toaster } from "react-hot-toast";

import UsersProvider from "./providers/UsersProvider";

const App = () => {
  return (
    <>
      <Toaster />
      <UsersProvider />
    </>
  );
};

export default App;
