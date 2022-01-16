import React from 'react';
import { Route, Switch } from 'react-router';
import { SignUp } from './components/templates/SignUp';
import { SignIn } from './components/templates/SignIn';
import { Top } from './components/templates/Top';
import Auth from './Auth';
/**
 * メインボディのルーティングを実施、
 * URIに応じてコンポーネントを切り替えてる
 * @return URIに応じたコンポーネント
 */
function Router() {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
      <Auth>
        <Route exact path="(/)?" component={Top} />
      </Auth>
    </Switch>
  );
}

export default Router;
