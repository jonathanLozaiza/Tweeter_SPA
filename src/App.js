import React, { useState } from "react";
import SignInSignUp from "./page/SignInSignUP";

function App() {
  const [user, setUser] = useState("patata");

  return <div>{user ? <SignInSignUp /> : <h1>No estas Logueado</h1>}</div>;
}

export default App;
