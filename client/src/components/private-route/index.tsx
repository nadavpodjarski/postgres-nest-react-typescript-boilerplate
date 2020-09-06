import React, { FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';

interface IPrivateRoute {
  isLoggedIn: boolean;
}
const PrivateRoute: FC<IPrivateRoute & RouteProps> = ({
  isLoggedIn,
  ...rest
}) => {
  return isLoggedIn ? <Route {...rest} /> : <Redirect to="/login" />;
};

export default PrivateRoute;
