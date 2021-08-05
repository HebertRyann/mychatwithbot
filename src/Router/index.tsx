import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import Chat from '../Pages/Chat';
import { Dashboard } from '../Pages/Dashboard';
import SignIn from '../Pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/chat" component={Chat} isPrivate />
    </Switch>
  );
};

export default Routes;
