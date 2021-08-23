import ReactDOM from "react-dom";
import SignInPageRoutes from "./routes";
import User from "./model/user";
import React, { useEffect } from "react";
const App: React.FC = () => {
  return (
    <User.Provider>
      <SignInPageRoutes />
    </User.Provider>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
