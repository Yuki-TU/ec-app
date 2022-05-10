import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Menu } from '.';

// HACK: テストでは、anyを許可
/* eslint @typescript-eslint/no-explicit-any: 0 */

describe('Menuコンポーネントは、メニューを表示する', () => {
  test('openMenuがtrueの時は、メニューを表示する', () => {
    const mockMenuItems = [{ onClick: jest.fn(), label: 'アカウント' }];
    const mockSetOpenMenu = jest.fn() as any;
    const mockOpenMenu = true;
    const mockReference =
      jest.fn() as unknown as React.RefObject<HTMLButtonElement>;

    render(
      <Menu
        menuItems={mockMenuItems}
        reference={mockReference}
        openMenu={mockOpenMenu}
        setOpenMenu={mockSetOpenMenu}
      />
    );
    expect(screen.getByText('アカウント')).toBeInTheDocument();
  });
  test('openMenuがtrueの時は、メニューを非表示する', () => {
    const mockMenuItems = [{ onClick: jest.fn(), label: 'アカウント' }];
    const mockSetOpenMenu = jest.fn() as any;
    const mockOpenMenu = false;
    const mockReference =
      jest.fn() as unknown as React.RefObject<HTMLButtonElement>;

    render(
      <Menu
        menuItems={mockMenuItems}
        reference={mockReference}
        openMenu={mockOpenMenu}
        setOpenMenu={mockSetOpenMenu}
      />
    );
    expect(screen.queryByText('アカウント')).not.toBeInTheDocument();
  });
  test.skip('メニュー表示中にタブを押したらメニューが消える消える', () => {});
});
