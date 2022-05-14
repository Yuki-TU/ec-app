import { AppBar, Toolbar } from '@material-ui/core';
import React from 'react';
import logo from '../../../assets/images/logo.png';
import { HeaderMenuAtSignIn } from './HeaderMenuAtSignIn';
import { HeaderMenuAtSignOut } from './HeaderMenuAtSignOut';

type Props = {
  /** サインインフラグ */
  isSignedIn: boolean;
  /** ロゴを押した時時の関数 */
  onClickLogo: React.ReactEventHandler<HTMLDivElement>;
};
/**
 * ヘッダーDOMコンポーネント
 *
 * @returns ヘッダーコンポーネント
 */
const HeaderPresenter = ({ isSignedIn, onClickLogo }: Props) => (
  <AppBar position="fixed" className="text-[#444] bg-white">
    <Toolbar className="p-0 my-0 mx-auto w-full max-w-5xl">
      <img
        alt="logo"
        src={logo}
        onClick={onClickLogo}
        className="w-[66.8px] h-[66.8px]"
        onKeyPress={onClickLogo}
        role="presentation"
      />
      {isSignedIn && (
        <div className="my-0 mr-0 ml-auto">
          <HeaderMenuAtSignIn />
        </div>
      )}
      {!isSignedIn && (
        <div className="my-0 mr-0 ml-auto">
          <HeaderMenuAtSignOut />
        </div>
      )}
    </Toolbar>
  </AppBar>
);

export default HeaderPresenter;
