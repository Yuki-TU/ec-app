import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../../reducks/users/operations';
import { loadUserId } from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
import { UserFirebaseRepository } from '../../../repository/user';
import { IconButton } from '../../uiParts/IconButton';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { Dialog } from '../../uniqueParts/Dialog';
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
  const dispatch = useDispatch();

  // URLより商品id取得
  const path = selector.router.location.pathname;
  const productId = path.split('/product/')[1];

  const userId = loadUserId(selector);
  const [product, setProduct] = useState<ProductForDatabase | null>(null);
  // ダイアログを管理するステート
  const [FailureDialog, setOpenFailureDialog] = useState(false);
  // お気に商品かどうかを保持するステート
  const [isFavorite, setIsFavorite] = useState(false);

  // HACK: stateを利用しているためuseCallbackは使えない
  // お気に入り処理
  const handleFavoriteProduct = () => {
    if (isFavorite) {
      // お気に入りだった場合は、お気に入り解除
      dispatch(removeFavoriteProduct(productId));
      setIsFavorite((prevState) => !prevState);
      return;
    }
    // お気に入りではなかった場合は、お気に入り登録
    dispatch(addFavoriteProduct(productId));
    setIsFavorite((prevState) => !prevState);
  };

  const favoriteIcon = isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  // 商品詳細ページ訪問時に一度だけ実行
  useEffect(() => {
    // 即時実行
    (async () => {
      try {
        // 商品の情報を取得
        const productRepository = new ProductFirebaseRepository();
        const productData = await productRepository.fetch(productId);
        setProduct(productData);

        // お気に入り商品なのかを判定している
        const userRepository = new UserFirebaseRepository();
        const user = await userRepository.fetchUser(userId);
        const existFavorite = user.favorite_products.includes(productId);
        setIsFavorite(existFavorite);
      } catch (error) {
        setOpenFailureDialog(true);
      }
    })();
  }, []);

  return (
    <section className={classes.root}>
      <Dialog
        isOpen={FailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
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
              <span className={classes.tax}>(税込)</span>
            </p>
            <IconButton
              label="お気に入り"
              onClick={handleFavoriteProduct}
              icon={favoriteIcon}
            />
            <div className={classes.editButton}>
              <PrimaryButton
                label="商品の編集"
                onClick={() => {
                  dispatch(push(`/edit-product/${product.id}`));
                }}
                type="button"
              />
            </div>
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
