import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { LoadingIcon } from '../../uiParts/LoadingIcon';
import { ErrorMessage } from '../../uiParts/ErrorMessage';
import { ProductList } from '../../uniqueParts/ProductList';

/**
 * 商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function FavoriteProductList() {
  // お気に入り商品idリストを情報取得
  const selector = useSelector((state) => state);
  const favoriteProductIds = loadFavoriteProducts(selector);

  const [favoriteProducts, setFavoriteProducts] = useState<
    ProductForDatabase[]
  >([]);

  const { error, isFetching } = useQuery('favoriteProducts', async () => {
    const repository = new ProductFirebaseRepository();
    const products = await repository.findByIds(favoriteProductIds);
    setFavoriteProducts(products);
  });

  if (error) {
    return (
      <ErrorMessage
        title="エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
    );
  }

  if (isFetching) {
    return <LoadingIcon />;
  }

  return (
    <section className="relative my-0 mx-auto w-full max-w-[575px] text-center sm:max-w-5xl ">
      <h1 className="my-4 mx-auto text-[1.563rem] text-center text-[#4dd0e1]">
        お気に入り商品
      </h1>
      {favoriteProducts.length ? (
        <ProductList list={favoriteProducts} />
      ) : (
        <p className="mx-auto mt-20 mb-4 text-[1.3rem]">
          お気に入りした商品がありません
        </p>
      )}
    </section>
  );
}

export default FavoriteProductList;
