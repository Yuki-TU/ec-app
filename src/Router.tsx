import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp } from './components/templates/SignUp';
import { SignIn } from './components/templates/SignIn';

/**
 * メインボディのルーティングを実施、
 * URIに応じてコンポーネントを切り替えてる
 * @return URIに応じたコンポーネント
 */
function Router() {
  return (
    <Switch>
      <Route exact path="(/)?" component={SignIn} />
      <Route exact path="/signup" component={SignUp} />
    </Switch>
  );
}

export default Router;
