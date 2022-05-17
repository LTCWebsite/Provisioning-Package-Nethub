import React from "react";
import { Route, Redirect, useHistory } from "react-router-dom";
import cookie from 'js-cookie'
import auth from "./Auth";

export const ProtectRoute = ({
  component: Component,
  ...rest
}) => {
  const history = useHistory()
  try {
    if (typeof cookie.get("one_session") === "undefined") {
      history.push("/login")
      // console.log('out');
    } else {
      // console.log('in');
    }
  } catch (err) {
    console.log('Protected Route cookie err');
  }

  return (
    <Route
      {...rest}
      render={props => {
        if (auth.isAuthenticated()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};