import React from 'react';
/**
 * ローディングアイコンのコンポーネント
 * @returns コンポーネント
 */
const LoadingIconComponent = React.memo(() => (
  <div className="flex justify-center my-20">
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
    <div className="mx-4 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
  </div>
));

export default LoadingIconComponent;
