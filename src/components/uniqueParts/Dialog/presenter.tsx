import {
  Button,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core';
import React from 'react';

/** 引数 */
type DialogProps = {
  /** ダイアログオープンフラグ */
  isOpen: boolean;
  /** ダイアログをセットする関数 */
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  /** タイトル */
  title: string;
  /** テキスト */
  text: string;
  // HACK: デフォルト値をして良いsているが、エラーが出るため、一時的にオフ
  /* eslint react/require-default-props: 0 */
  /** はいを押した時のコールバック関数 */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};
/**
 * ダイヤログコンポーネント
 * @param props isOpen, setIsOpen, title, text, onClick: はいを押した時のコールバック
 * @returns ダイヤログコンポーネント
 */
function Dialog(props: DialogProps) {
  const { isOpen, setIsOpen, title, text } = props;

  // ダイアログを閉じる
  const handleClose = () => {
    setIsOpen(false);
  };

  // onClickの指定がなければ、デフォルト値をhandleCloseメソッドを指定
  const { onClick = handleClose } = props;

  // onClickが引数に指定されているかを判断するフラグ
  const existOnClickArg = onClick !== handleClose;

  return (
    <MuiDialog open={isOpen} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {existOnClickArg && <Button onClick={handleClose}>いいえ</Button>}
        <Button
          onClick={(event) => {
            onClick(event);
            handleClose();
          }}
          autoFocus
        >
          はい
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default Dialog;
