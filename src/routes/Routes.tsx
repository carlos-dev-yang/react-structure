import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { UserPage } from '@features/user';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path={'/'} component={UserPage} />
        <Route exact path={'user'} component={UserPage} />
      </Switch>
    </Router>
  );
}
