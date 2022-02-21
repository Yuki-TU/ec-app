import React, { useEffect, useState } from 'react';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import { ProductFirebaseRepository } from '../../../repository/product';
import { addBrTagToLineBreaks, recreateImages } from './hook';
import { ImageSwiper } from './ImageSwiper';
import { useStyles } from './style';

/**
 * 商品詳細ページのコンポーネント
 * @returns 商品詳細ページのコンポーネント
 */
function ProductDetail() {
  const classes = useStyles();
  const selector = useSelector((state) => state);

  // URLより商品id取得
  const path = selector.router.location.pathname;
  const productId = path.split('/product/')[1];

  const [product, setProduct] = useState<ProductForDatabase | null>(null);

  // 商品詳細ページ訪問時に一度だけ実行
  useEffect(() => {
    // 即時実行
    (async () => {
      try {
        // 商品の情報を取得
        const productRepository = new ProductFirebaseRepository();
        const productData = await productRepository.fetch(productId);
        setProduct(productData);
      } catch (error) {
        window.alert('情報取得に失敗しました。リロードしなおしてください。');
      }
    })();
  }, []);

  return (
    <section className={classes.root}>
      {product && (
        <div className={classes.imageAndDetailGrid}>
          <div className={classes.imageSliderBox}>
            <ImageSwiper
              images={recreateImages(product.images)}
              alt="商品画像"
            />
          </div>
          <div className={classes.productDetailDescription}>
            <h1 className={classes.productName}>{product.name}</h1>
            <p className={classes.productPrice}>
              ¥{product.price.toLocaleString()}
              <p className={classes.tax}>(税込)</p>
            </p>
            <h1>商品説明</h1>
            <p className={classes.productDescription}>
              {addBrTagToLineBreaks(product.description)}
            </p>
            <h1>商品情報</h1>
            <h2 className={classes.productInformationHeader}>カテゴリ</h2>
            <p className={classes.productInformation}>
              {product.gender}/{product.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
