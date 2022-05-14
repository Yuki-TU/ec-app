import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Menu } from '.';

describe('Menuコンポーネントは、メニューを表示する', () => {
  test('openMenuがtrueの時は、メニューを表示する', () => {
    const mockMenuItems = [{ onClick: jest.fn(), label: 'アカウント' }];
    const mockCloseMenu = jest.fn();
    const mockOpenMenu = true;
    const mockReference =
      jest.fn() as unknown as React.RefObject<HTMLButtonElement>;

    render(
      <Menu
        menuItems={mockMenuItems}
        reference={mockReference}
        isOpenMenu={mockOpenMenu}
        closeMenu={mockCloseMenu}
      />
    );
    expect(screen.getByText('アカウント')).toBeInTheDocument();
  });
  test('openMenuがtrueの時は、メニューを非表示する', () => {
    const mockMenuItems = [{ onClick: jest.fn(), label: 'アカウント' }];
    const mockCloseMenu = jest.fn();
    const mockOpenMenu = false;
    const mockReference =
      jest.fn() as unknown as React.RefObject<HTMLButtonElement>;

    render(
      <Menu
        menuItems={mockMenuItems}
        reference={mockReference}
        isOpenMenu={mockOpenMenu}
        closeMenu={mockCloseMenu}
      />
    );
    expect(screen.queryByText('アカウント')).not.toBeInTheDocument();
  });
  test.skip('メニュー表示中にタブを押したらメニューが消える消える', () => {});
});
