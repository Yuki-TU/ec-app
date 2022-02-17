import React from 'react';
import { Route, Switch } from 'react-router';
import { PasswordReset } from './components/templates/PasswordReset';
import { SignUp } from './components/templates/SignUp';
import { SignIn } from './components/templates/SignIn';
import { Top } from './components/templates/Top';
import Auth from './Auth';
import { ProductEdit } from './components/templates/ProductEdit';
import { ProductList } from './components/templates/ProductList';
import { ProductDetail } from './components/templates/ProductDetail';

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
      <Route exact path="/signin/reset" component={PasswordReset} />
      <Auth>
        <>
          <Route exact path="(/)?" component={ProductList} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/signout" component={Top} />
          <Route path="/product/edit(/:id)?" component={ProductEdit} />
        </>
      </Auth>
    </Switch>
  );
}

export default Router;
