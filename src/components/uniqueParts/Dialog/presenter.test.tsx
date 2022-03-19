import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Dialog } from '.';

describe('Dialogコンポーネントはダイアログを表示するコンポーネント', () => {
  describe('onClick関数を指定すると、「はい」と「いいえ」ボタンが両方表示されるが、指定しないと「はい」のみが表示される', () => {
    test('onClickを指定している時、はいが表示される', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
          onClick={() => {}}
        />
      );
      expect(screen.getByText('はい')).toBeInTheDocument();
    });
    test('onClickを指定している時、いいえが表示される', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
          onClick={() => {}}
        />
      );
      expect(screen.getByText('いいえ')).toBeInTheDocument();
    });
    test('onClickを指定していない時、いいえは表示されない', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
        />
      );
      expect(screen.queryByText('いいえ')).not.toBeInTheDocument();
    });
    test('onClickを指定していない時、はいが表示される', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
        />
      );
      expect(screen.getByText('はい')).toBeInTheDocument();
    });
  });
  describe('onClickを指定し、ダイアログの「はい」を押した時、onClickに指定したコールバックが呼ばれる', () => {
    test('はいを押した時、onClickに指定したコールバックが1度だけ呼ばれる', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      const onClickMock = jest.fn();

      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
          onClick={onClickMock}
        />
      );

      userEvent.keyboard('{Enter}');
      expect(onClickMock).toHaveBeenCalledTimes(1);
    });
    test('いいえを押した時、onClickに指定したコールバックは呼ばれない', () => {
      const setIsOpenMock = jest.fn();
      const isOpenMock = true;
      const onClickMock = jest.fn();

      render(
        <Dialog
          isOpen={isOpenMock}
          setIsOpen={setIsOpenMock}
          title="test"
          text="test"
          onClick={onClickMock}
        />
      );
      // shift押しながら、Tabキー押す
      userEvent.tab({ shift: true });
      // エンター
      userEvent.keyboard('{Enter}');
      expect(onClickMock).toHaveBeenCalledTimes(0);
    });
  });
});
