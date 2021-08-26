import ReactDOM from "react-dom";
import SignInPageRoutes from "./routes";
import User from "./model/UserModel";
import React from "react";
const App: React.FC = () => {
  return (
    <User.Provider>
      <SignInPageRoutes />
    </User.Provider>
  );
};
ReactDOM.render(<App />, document.querySelector("#root"));
