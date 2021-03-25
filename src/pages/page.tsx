import React from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import { PageLayout } from "../AppBar";
import User, { LoginStatus } from "../model/user";
import SignIn from "./signin";
const Pages: React.FC = () => {
  let user = User.useContainer();
  const logged: boolean = user.status === LoginStatus.logged;
  return (
    <BrowserRouter>
      <Switch>
        <Redirect exact={true} from="/" to={logged ? "/admin" : "/login"} />
        <Route
          exact
          path="/login"
          render={() => (!logged ? <SignIn /> : <Redirect to="/admin" />)}
        />
        <Route
          render={() =>
            logged ? (
              <Switch>
                <Route path="/admin" component={PageLayout} />
              </Switch>
            ) : (
              <Redirect to={"/login"} />
            )
          }
        />
      </Switch>
    </BrowserRouter>
  );
};

export default Pages;
