import React, { memo } from 'react';
/**
 * ローディングアイコンのコンポーネント
 * @returns コンポーネント
 */
function LoadingIconComponent() {
  return (
    <div className="flex justify-center my-20">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
      <div className="mx-4 w-2 h-2 bg-blue-600 rounded-full animate-ping" />
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-ping" />
    </div>
  );
}

export default memo(LoadingIconComponent);
