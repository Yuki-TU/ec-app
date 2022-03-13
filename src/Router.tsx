import React from 'react';
import { Route, Switch } from 'react-router';
import { PasswordReset } from './components/templates/PasswordReset';
import { SignUp } from './components/templates/SignUp';
import { SignIn } from './components/templates/SignIn';
import { Account } from './components/templates/Account';
import Auth from './Auth';
import { ProductEdit } from './components/templates/ProductEdit';
import { AllProductList } from './components/templates/AllProductList';
import { ProductDetail } from './components/templates/ProductDetail';
import { FavoriteProductList } from './components/templates/FavoriteProductList';

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
          <Route exact path="(/)?" component={AllProductList} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/account" component={Account} />
          <Route
            exact
            path="/favorite-products"
            component={FavoriteProductList}
          />
          <Route path="/product/edit(/:id)?" component={ProductEdit} />
        </>
      </Auth>
    </Switch>
  );
}

export default Router;
