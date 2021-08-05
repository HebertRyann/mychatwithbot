import React, { useEffect } from 'react';
import {
  RouteProps as ReactRouterProps,
  Route as ReactRoute,
  Redirect,
} from 'react-router';
import { useUser } from '../Hooks/User';

interface RouteProps extends ReactRouterProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RouteProps> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const { userData, updateUser } = useUser();
  useEffect(() => {
    if (userData.user) {
      updateUser(userData.user);
    }
  }, [updateUser, userData.user]);
  return (
    <ReactRoute
      {...rest}
      render={() => {
        return isPrivate === !!userData.user ? (
          <Component />
        ) : (
          <Redirect to={{ pathname: isPrivate ? '/' : '/dashboard' }} />
        );
      }}
    />
  );
};

export default Route;
