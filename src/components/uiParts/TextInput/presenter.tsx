import React from 'react';
import TextField from '@material-ui/core/TextField';
import { useStyles } from './style';

/** TextInputの引数の型定義 */
type TextInputProps = {
  /** フルサイズ指定(true: フルサイズ, false: フルサイズではない) */
  fullWidth: boolean;
  /** テキスト入力欄のラベル */
  label: string;
  /** 最小入力文字数(default: 0) */
  minLength?: number;
  /** 複数業表示(true: 有効, false: 無効) */
  multiline: boolean;
  /** 必須入力かどうか */
  required: boolean;
  /** 複数業表示数場合の行数 */
  rows: string | number;
  /** 入力値(初期表示などに利用) */
  value: string;
  /** 入力タイプ(password, email, text) */
  type: string;
  /** 値を入力した時に実行されるコールバック関数 */
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
};

/**
 * テキスト入力の汎用コンポーネント
 * @param props - 各種設定値
 * @return コンポーネント
 */
function TextInput(props: TextInputProps) {
  const classes = useStyles();
  const {
    fullWidth,
    label,
    minLength,
    multiline,
    required,
    rows,
    value,
    type,
    onChange,
  } = props;
  const textStyle = fullWidth ? classes.full : classes.half;

  return (
    <TextField
      className={textStyle}
      fullWidth={fullWidth}
      label={label}
      margin="dense"
      multiline={multiline}
      required={required}
      rows={rows}
      value={value}
      type={type}
      onChange={onChange}
      inputProps={{ minLength }}
    />
  );
}

/** 引数のデフォルト値の設定 */
TextInput.defaultProps = {
  minLength: 0,
};

export default TextInput;
