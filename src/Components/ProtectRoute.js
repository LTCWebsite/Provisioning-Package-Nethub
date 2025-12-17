import React from "react";
import { Route, Redirect } from "react-router-dom";
import cookie from 'js-cookie'
import auth from "./Auth";

export const ProtectRoute = ({
  component: Component,
  ...rest
}) => {
  try {
    if (typeof cookie.get("ONE_TOKEN") === "undefined") {
      // history.push("/login")
      // console.log('out');
      window.location.href = "/login"
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
        }
        else {
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