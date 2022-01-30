import React from 'react';
import { useDispatch } from 'react-redux';
import { loadUserEmail, loadUserName } from '../../../reducks/users/selectors';
import { useSelector } from '../../../reducks/store';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { signOut } from '../../../reducks/users/operations';
/**
 * Top画面のコンポーネント
 * @return トップ画面のコンポーネント
 */
function Top() {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const email = loadUserEmail(selector);
  const userName = loadUserName(selector);

  return (
    <>
      <h2>Top</h2>
      <div>userName: {userName}</div>
      <div>email: {email}</div>
      <PrimaryButton
        label="サインアウト"
        type="button"
        onClick={() => dispatch(signOut())}
      />
    </>
  );
}

export default Top;
