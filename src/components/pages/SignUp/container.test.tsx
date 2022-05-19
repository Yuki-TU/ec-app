import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import * as History from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { SignUp } from '.';
import createStore from '../../../reducks/store';

// モック
jest.mock('../../../firebase', () => {});

afterEach(() => {
  cleanup();
});

describe('サインアップ画面は、サインアップをする際に利用する', () => {
  test('初期値はfalseと表示される', () => {
    const history = History.createBrowserHistory();
    const store = createStore(history);

    render(
      <Provider store={store}>
        <SignUp />
      </Provider>
    );
    expect(screen.getByText(/アカウント登録/i)).toBeInTheDocument();
  });
});
// TODO: ユーザ操作系は@testing-library/user-event@14 にしてから行う
// 今v 14.にすると他のテストでエラーになるため先に14対応する
