import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Chat from '../Pages/Chat';
import SignIn from '../Pages/SignIn';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/chat" component={Chat} />
    </Switch>
  );
};

export default Routes;