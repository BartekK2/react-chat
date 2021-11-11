import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../firebaseThings/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {

  return (
    <Route
      {...rest}
      render={props => {{console.log(rest)}
        if(rest.info===undefined) return ;
        return rest.info ?   <Component {...props} />:<Redirect to={rest.redirectPath} />
      }}
    ></Route>
  )
}