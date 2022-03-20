import React from 'react';
import { Route, Switch } from 'react-router';
import { PasswordReset } from './components/pages/PasswordReset';
import { SignUp } from './components/pages/SignUp';
import { SignIn } from './components/pages/SignIn';
import { Account } from './components/pages/Account';
import Auth from './Auth';
import { ProductEdit } from './components/pages/ProductEdit';
import { AllProductList } from './components/pages/AllProductList';
import { ProductDetail } from './components/pages/ProductDetail';
import { FavoriteProductList } from './components/pages/FavoriteProductList';

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
          <Route path="/edit-product(/:id)?" component={ProductEdit} />
        </>
      </Auth>
    </Switch>
  );
}

export default Router;
