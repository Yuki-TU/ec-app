import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { purchasedProduct } from '../../../reducks/products/operations';
import { loadProducts } from '../../../reducks/products/selectors';
import { ProductForDatabase } from '../../../reducks/products/types';
import { useSelector } from '../../../reducks/store';
import {
  addFavoriteProduct,
  removeFavoriteProduct,
} from '../../../reducks/users/operations';
import {
  loadFavoriteProducts,
  loadUserId,
} from '../../../reducks/users/selectors';
import { ProductFirebaseRepository } from '../../../repository/product';
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

  const [product, setProduct] = useState<ProductForDatabase>();
  // ダイアログを管理するステート
  const [FailureDialog, setOpenFailureDialog] = useState(false);
  // お気に商品かどうかを保持するステート
  const [isFavorite, setIsFavorite] = useState(false);

  const [isOpenPuchaseDialog, setIsOpenPurchaseDialog] = useState(false);

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
  // お気に入りの場合は、無理潰されたハード、お気に入りではない場合枠組みのハード
  const favoriteIcon = isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />;

  const isSold = product?.purchaser !== '';

  // 売り切れていない、かつ、商品オーナーとログインユーザが同じなら編集可能
  const userId = loadUserId(selector);
  const canEditProduct = userId === product?.owner && !isSold;

  // 編集できない、売り切れちないければ購入可能
  const canPurchaseProduct = !canEditProduct && !isSold;

  // 商品ストアが変更されるたびに商品情報取得
  // 購入されたらすぐに、売り切れ表示をレンダリングするため
  const products = loadProducts(selector);
  useEffect(() => {
    // 即時実行
    (async () => {
      try {
        // 商品の情報を取得
        const productRepository = new ProductFirebaseRepository();
        const productData = await productRepository.fetch(productId);
        setProduct(productData);
      } catch (error) {
        setOpenFailureDialog(true);
      }
    })();
    // お気に入り商品なのかを判定している
    const favoriteProductIds = loadFavoriteProducts(selector);
    const existFavorite = favoriteProductIds.includes(productId);
    setIsFavorite(existFavorite);
  }, [products]);

  return (
    <section className={classes.root}>
      <Dialog
        isOpen={FailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
      <Dialog
        isOpen={isOpenPuchaseDialog}
        setIsOpen={setIsOpenPurchaseDialog}
        title="購入確認"
        text={`${product?.name}を本当に購入しますか？`}
        onClick={() => {
          if (product) dispatch(purchasedProduct(userId, product.id));
        }}
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
            {canEditProduct && (
              <div className={classes.editButton}>
                <PrimaryButton
                  label="商品の編集"
                  onClick={() => dispatch(push(`/edit-product/${product.id}`))}
                  type="button"
                />
              </div>
            )}
            {canPurchaseProduct && (
              <div className={classes.editButton}>
                <PrimaryButton
                  label="購入する"
                  onClick={() => setIsOpenPurchaseDialog(true)}
                  type="button"
                />
              </div>
            )}
            {isSold && (
              <div className={classes.editButton}>
                <PrimaryButton label="売り切れました" type="button" disabled />
              </div>
            )}
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
