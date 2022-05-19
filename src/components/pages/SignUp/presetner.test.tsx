import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import SignUpPresenter from './presenter';

describe('サインアップ画面はサインアプをするための画面', () => {
  test('ヘッダー部分は「アカウント登録」と表示される', () => {
    render(
      <SignUpPresenter
        onClickSignIn={jest.fn()}
        inputUserName={jest.fn()}
        inputEmail={jest.fn()}
        inputPassword={jest.fn()}
        inputConfirmPassword={jest.fn()}
        userName=""
        password=""
        email=""
        confirmPassword=""
        onSubmit={undefined}
        openSignUpFailureDialog={false}
        setOpenSignUpFailureDialog={jest.fn()}
        openFailureDialog={false}
        setOpenFailureDialog={jest.fn()}
      />
    );
    expect(screen.getByText(/アカウント登録/i)).toBeInTheDocument();
  });
  test('入力欄はユーザ名、メールアドレス、パスワード、パスワードの確認がある', () => {
    render(
      <SignUpPresenter
        onClickSignIn={jest.fn()}
        inputUserName={jest.fn()}
        inputEmail={jest.fn()}
        inputPassword={jest.fn()}
        inputConfirmPassword={jest.fn()}
        userName=""
        email=""
        password=""
        confirmPassword=""
        onSubmit={undefined}
        openSignUpFailureDialog={false}
        setOpenSignUpFailureDialog={jest.fn()}
        openFailureDialog={false}
        setOpenFailureDialog={jest.fn()}
      />
    );
    expect(screen.getByText(/ユーザ名/i)).toBeInTheDocument();
    expect(screen.getByText(/メールアドレス/i)).toBeInTheDocument();
    expect(
      screen.getByText(/パスワード（半角英数字6文字以上）/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/パスワードの再確認/i)).toBeInTheDocument();
  });
});
