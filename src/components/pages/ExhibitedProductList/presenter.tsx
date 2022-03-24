import React, { useEffect, useState } from 'react';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { loadExhibitedProducts } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { Dialog } from '../../uniqueParts/Dialog';
import { ProductList } from '../../uniqueParts/ProductList';
import { useStyles } from './style';

/**
 * 出品商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function ExhibitedProductList() {
  const classes = useStyles();

  // 出品商品idリストを情報取得
  const selector = useSelector((state) => state);
  const exhibitedProductIds = loadExhibitedProducts(selector);

  const [openFailureDialog, setOpenFailureDialog] = useState(false);
  const [exhibitedProducts, setExhibitedProducts] = useState<
    ProductForDatabase[]
  >([]);

  // コンポーネントを表示したら、商品データを取得する
  useEffect(() => {
    // 非同期処理を中断するためのクラス
    const abortCtrl = new AbortController();
    try {
      (async () => {
        const repository = new ProductFirebaseRepository();
        const products = await repository.findByIds(exhibitedProductIds);
        setExhibitedProducts(products);
      })();
    } catch (error) {
      setOpenFailureDialog(true);
    }
    return () => {
      // 非同期処理を完了する前に、コンポーネントがアンマウントされたら非同期処理を中断する
      abortCtrl.abort();
    };
  }, []);

  // TODO
  // 消した時にリアルタイムで更新するためにreduxで値を管理
  return (
    <section className={classes.root}>
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="不具合が発生しました。通信状況を確認しリロードし直してください。"
      />
      <h1 className={classes.headerTitle}>出品商品</h1>
      {exhibitedProducts.length ? (
        <ProductList list={exhibitedProducts} />
      ) : (
        <p className={classes.noFavoriteText}>出品した商品がありません</p>
      )}
    </section>
  );
}

export default ExhibitedProductList;
