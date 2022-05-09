import React, { memo } from 'react';

type Props = {
  /** エラータイトル */
  title: string;
  /** エラー説明テキスト */
  text: string;
};

/**
 * エラー表示するコンポーネント
 * @param props title:エラータイトル, text: エラー説明
 * @returns コンポーネント
 */
function ErrorMessageComponent(props: Props) {
  const { title, text } = props;
  return (
    <div className="py-7 px-3 mx-auto w-full md:w-[1024px]">
      <h1 className="text-[1.8rem]">⚠{title}</h1>
      <p className="text-[1rem]">{text}</p>
    </div>
  );
}

export default memo(ErrorMessageComponent);
