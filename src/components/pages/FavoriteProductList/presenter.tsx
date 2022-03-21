import React, { useEffect, useState } from 'react';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { loadFavoriteProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { Dialog } from '../../uniqueParts/Dialog';
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

  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const [favoriteProducts, setFavoriteProducts] = useState<
    ProductForDatabase[]
  >([]);

  // コンポーネントを表示したら、商品データを取得する
  useEffect(() => {
    // 非同期処理を中断するためのクラス
    const abortCtrl = new AbortController();

    try {
      (async () => {
        const repository = new ProductFirebaseRepository();
        const products = await repository.findByIds(favoriteProductIds);
        setFavoriteProducts(products);
      })();
    } catch (error) {
      setOpenFailureDialog(true);
    }
    return () => {
      // 非同期処理を完了する前に、コンポーネントがアンマウントされたら非同期処理を中断する
      abortCtrl.abort();
    };
  }, []);

  return (
    <section className={classes.root}>
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="不具合が発生しました。通信状況を確認しリロードし直してください。"
      />
      <h1 className={classes.headerTitle}>お気に入り商品</h1>
      {favoriteProducts.length ? (
        <ProductList list={favoriteProducts} />
      ) : (
        <p className={classes.noFavoriteText}>お気に入りした商品がありません</p>
      )}
    </section>
  );
}

export default FavoriteProductList;
