import React from 'react';
import { useStyles } from './style';

/** 引数の型定義 */
type ImagePreviewProps = {
  alt: string;
  path: string;
  id: string;
  onClick: React.ReactEventHandler<HTMLDivElement>;
};
/**
 * プレビュー用の画像を表示するコンポーネント
 * @param props alt: 大体文字, path: 画像のパス, id: 画像id, onClick: 画像をクリックされた時の処理
 * @returns コンポーネント
 */
function ImagePreview(props: ImagePreviewProps) {
  const { alt, path, id, onClick } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        alt={alt}
        className={classes.image}
        id={id}
        key={id}
        onClick={onClick}
        onKeyPress={onClick}
        role="presentation"
        src={path}
      />
    </div>
  );
}

export default ImagePreview;
