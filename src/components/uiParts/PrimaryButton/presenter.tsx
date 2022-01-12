import React from 'react';
import Button from '@material-ui/core/Button';
import { useStyles } from './style';

/** ボタンコンポーネントの型定義 */
type PrimaryButtonProps = {
  /** ボタンに表記するラベル */
  label: string;
  /** ボタンを押された時のコールバック関数 */
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

/**
 * ボタンの汎用コンポーネント
 * @param props 各種設定
 * @return コンポーネント
 */
function PrimaryButton(props: PrimaryButtonProps) {
  const { label, onClick } = props;
  const classes = useStyles();

  return (
    <Button className={classes.button} variant="contained" onClick={onClick}>
      {label}
    </Button>
  );
}

export default PrimaryButton;
