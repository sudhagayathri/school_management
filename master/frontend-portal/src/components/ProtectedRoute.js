import React from "react";
import { Route, Redirect } from "react-router-dom";
import axios from 'axios';
import Auth from "./auth";

//const isLoggedin = await Auth.isAuthenticated()
export const ProtectedRoute = (
{
  component: Component,
  ...rest
},
) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (Auth.isAuthenticated()) {
          return <Component {...props} />;
        } else{
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
    	  return false
      }}
    />
  );
};
