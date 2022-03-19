import React from 'react';
import { useSelector } from '../../../reducks/store';
import { loadUserEmail, loadUserName } from '../../../reducks/users/selectors';
import { useStyles } from './style';

/**
 * Accountコンポーネント
 * @return アカウント画面のコンポーネント
 */
function Account() {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const email = loadUserEmail(selector);
  const userName = loadUserName(selector);

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>アカウント</h1>
      <h2 className={classes.item}>ユーザネーム</h2>
      <p className={classes.itemText}>{userName}</p>
      <h2 className={classes.item}>メールアドレス</h2>
      <p className={classes.itemText}>{email}</p>
    </div>
  );
}

export default Account;
