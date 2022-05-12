import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './style';

/** ボタンコンポーネントの型定義 */
type PrimaryButtonProps = {
  /** 有効フラグ */
  disabled?: boolean;
  /** ボタンに表記するラベル */
  label: string;
  /** ボタンタイプ(buttn | submit | reset) */
  type: 'button' | 'submit';
  /** ボタンを押された時のコールバック関数 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ボタンの汎用コンポーネント
 * @param props 各種設定
 * @return コンポーネント
 */
function PrimaryButton(props: PrimaryButtonProps) {
  const { label, onClick, type, disabled } = props;
  const classes = useStyles();

  return (
    <Button
      className={classes.button}
      variant="contained"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

/** 引数のデフォルト値の設定 */
PrimaryButton.defaultProps = {
  onClick: () => {},
  disabled: false,
};

export default React.memo(PrimaryButton);
