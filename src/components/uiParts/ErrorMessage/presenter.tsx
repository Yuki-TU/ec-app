import React from 'react';

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
const ErrorMessageComponent = React.memo(({ title, text }: Props) => (
  <div className="py-7 px-3 mx-auto w-full md:w-[1024px]">
    <h1 className="text-[1.8rem]">⚠{title}</h1>
    <p className="text-[1rem]">{text}</p>
  </div>
));

export default ErrorMessageComponent;
