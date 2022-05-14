import React from 'react';

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
const ImagePreview = ({ alt, path, id, onClick }: ImagePreviewProps) => (
  <div className="before:block overflow-hidden before:p-4 m-2 w-[calc(50%_-_1rem)] text-center">
    <img
      alt={alt}
      className="object-cover object-center w-40 h-40"
      id={id}
      key={id}
      onClick={onClick}
      onKeyPress={onClick}
      role="presentation"
      src={path}
    />
  </div>
);

export default ImagePreview;
