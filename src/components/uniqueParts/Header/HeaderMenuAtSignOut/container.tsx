import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import HeaderMenuAtSignOutPresenter from './presenter';

/**
 * アカウントログアウト時のヘッダーメニュー
 * @returns コンポーネント
 */
const HeaderMenuAtSignOut = React.memo(() => {
  const dispatch = useDispatch();
  const onClickSignIn = React.useCallback(() => dispatch(push('/signin')), []);
  const onClickSignOut = React.useCallback(() => dispatch(push('/signup')), []);

  return (
    <HeaderMenuAtSignOutPresenter
      onClickSignOut={onClickSignOut}
      onClickSignIn={onClickSignIn}
    />
  );
});
export default HeaderMenuAtSignOut;
