import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { loadExhibitedProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { LoadingIcon } from '../../uiParts/LoadingIcon';
import { ErrorMessage } from '../../uiParts/ErrorMessage';
import { ProductList } from '../../uniqueParts/ProductList';

/**
 * 出品商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function ExhibitedProductList() {
  // 出品商品idリストを情報取得
  const selector = useSelector((state) => state);
  const exhibitedProductIds = loadExhibitedProducts(selector);

  const [exhibitedProducts, setExhibitedProducts] = useState<
    ProductForDatabase[]
  >([]);

  const { error, isFetching } = useQuery('setExhibitedProducts', async () => {
    const repository = new ProductFirebaseRepository();
    const products = await repository.findByIds(exhibitedProductIds);
    setExhibitedProducts(products);
  });

  if (error) {
    return (
      <ErrorMessage
        title="エラー"
        text="不具合が発生しました。通信状況を確認しリロードし直してください。"
      />
    );
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  // TODO: 消した時にリアルタイムで更新するためにreduxで値を管理
  return (
    <section className="relative my-0 mx-auto w-full max-w-[575px] text-center md:max-w-[1024px]">
      <h1 className="my-[1rem] mx-auto text-[1.563rem] text-center text-[#4dd0e1]">
        出品商品
      </h1>
      {exhibitedProducts.length ? (
        <ProductList list={exhibitedProducts} />
      ) : (
        <p className="mx-auto mt-[5rem] mb-[1rem] font-[1.3rem]">
          出品した商品がありません
        </p>
      )}
    </section>
  );
}

export default ExhibitedProductList;
