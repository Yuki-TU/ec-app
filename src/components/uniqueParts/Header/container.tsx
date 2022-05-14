import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from '../../../reducks/store';
import { loadSignedIn } from '../../../reducks/users/selectors';
import HeaderPresenter from './presenter';

/**
 * ヘッダーコンポーネント
 * @returns ヘッダーコンポーネント
 */
const HeaderContaner = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);

  const isSignedIn = loadSignedIn(selector);
  const onClickLogo = React.useCallback(() => dispatch(push('/')), []);

  return <HeaderPresenter isSignedIn={isSignedIn} onClickLogo={onClickLogo} />;
};

export default HeaderContaner;
