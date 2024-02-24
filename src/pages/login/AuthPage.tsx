// AuthPage.tsx
import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState<boolean>(true);

  const switchView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div>
      {isLoginView ? (
        <Login onSwitch={switchView} />
      ) : (
        <Register onSwitch={switchView} />
      )}
    </div>
  );
};

export default AuthPage;
