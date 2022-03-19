import React, { useEffect, useState } from 'react';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { ProductList } from '../../uniqueParts/ProductList';
import { useStyles } from './style';

/**
 * 商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function FavoriteProductList() {
  const classes = useStyles();

  // お気に入り商品idリストを情報取得
  const selector = useSelector((state) => state);
  const favoriteProductIds = loadFavoriteProducts(selector);

  const [favoriteProducts, setFavoriteProducts] = useState<
    ProductForDatabase[]
  >([]);

  // コンポーネントを表示したら、商品データを取得する
  useEffect(() => {
    (async () => {
      const repository = new ProductFirebaseRepository();
      const products = await repository.findByIds(favoriteProductIds);
      setFavoriteProducts(products);
    })();
  }, []);

  return (
    <section className={classes.root}>
      <h1 className={classes.headerTitle}>お気に入り商品</h1>
      {favoriteProductIds.length ? (
        <ProductList list={favoriteProducts} />
      ) : (
        <p className={classes.noFavoriteText}>お気に入りした商品がありません</p>
      )}
    </section>
  );
}

export default FavoriteProductList;
