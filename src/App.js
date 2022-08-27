import React, { useState, useEffect } from "react";
import SignInSignUp from "./page/SignInSignUP";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./utils/contexts";
import { isLoggedIn } from "./services/api/auth";
import Routing from "./routes/Routing";

function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false);

  useEffect(() => {
    setUser(isLoggedIn());
    setRefreshCheckLogin(false);
    setLoadUser(true);
  }, [refreshCheckLogin]);

  if (!loadUser) {
    return null;
  }

  return (
    <AuthContext.Provider value={user}>
      <div>
        {user ? (
          <Routing />
        ) : (
          <SignInSignUp setRefreshCheckLogin={setRefreshCheckLogin} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
        />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
