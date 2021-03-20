import React, { useState } from "react";
import { BrowserRouter, Redirect, Switch, Route } from "react-router-dom";
import { PageLayout } from "./AppBar";
import User, { LoginStatus } from "./model/user";
import SignIn from './signin';
const fakeAuth = {
  logged: false,
  authenticate(cb: any) {
    this.logged = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb: any) {
    this.logged = false;
    setTimeout(cb, 100);
  },
};
const Pages: React.FC = () => {
  let user = User.useContainer();
  const [logged, Setlogged] = useState(false);

  return (
    <BrowserRouter>
      <Switch>
        <Redirect
          exact={true}
          from="/"
          to={user.status == LoginStatus.logging ? "/admin" : "/login"}
        />
        <Route
          exact
          path="/login"
          render={() =>
            !fakeAuth.logged ? <SignIn /> : <Redirect to="/admin" />
          }
        />
        <Route
          render={() =>
            fakeAuth.logged ? (
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
