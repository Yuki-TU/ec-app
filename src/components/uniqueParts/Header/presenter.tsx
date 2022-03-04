import { AppBar, Toolbar } from '@material-ui/core';
import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import logo from '../../../assets/images/logo.png';
import { useSelector } from '../../../reducks/store';
import { loadSignedIn } from '../../../reducks/users/selectors';
import { HeaderMenuAtSignIn } from './HeaderMenuAtSignIn';
import { HeaderMenuAtSignOut } from './HeaderMenuAtSignOut';
import { useStyles } from './style';
/**
 * ヘッダーコンポーネント
 * @returns ヘッダーコンポーネント
 */
function Header() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const isSignedIn = loadSignedIn(selector);

  return (
    <AppBar position="fixed" className={classes.menuBar}>
      <Toolbar className={classes.toolbar}>
        <img
          alt="logo"
          src={logo}
          onClick={() => dispatch(push('/'))}
          className={classes.siteLogo}
          onKeyPress={() => dispatch(push('/'))}
          role="presentation"
        />
        {isSignedIn && (
          <div className={classes.menus}>
            <HeaderMenuAtSignIn />
          </div>
        )}
        {!isSignedIn && (
          <div className={classes.menus}>
            <HeaderMenuAtSignOut />
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default Header;
