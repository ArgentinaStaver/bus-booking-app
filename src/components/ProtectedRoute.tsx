
import { useContext } from "react";
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../context/user/userContext";

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) => user ? <Component {...props} /> : <Redirect to='/login' />}
    />
  );
}

export default ProtectedRoute;
