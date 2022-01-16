import React from 'react';
import { loadUserEmail, loadUserName } from '../../../reducks/users/selectors';
import { useSelector } from '../../../reducks/store';
/**
 * Top画面のコンポーネント
 * @return トップ画面のコンポーネント
 */
function Top() {
  const selector = useSelector((state) => state);
  const email = loadUserEmail(selector);
  const userName = loadUserName(selector);

  return (
    <>
      <h2>Top</h2>
      <div>userName: {userName}</div>
      <div>email: {email}</div>
    </>
  );
}

export default Top;
