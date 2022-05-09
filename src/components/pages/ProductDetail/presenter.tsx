import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { push } from 'connected-react-router';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
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
import { LoadingIcon } from '../../uiParts/LoadingIcon';
import { IconButton } from '../../uiParts/IconButton';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { ErrorMessage } from '../../uiParts/ErrorMessage';
import { Dialog } from '../../uniqueParts/Dialog';
import { addBrTagToLineBreaks, recreateImages } from './hook';
import { ImageSwiper } from './ImageSwiper';

/**
 * 商品詳細ページのコンポーネント
 * @returns 商品詳細ページのコンポーネント
 */
function ProductDetail() {
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();

  // URLより商品id取得
  const path = selector.router.location.pathname;
  const productId = path.split('/product/')[1];

  const [product, setProduct] = useState<ProductForDatabase>();

  const { error, isLoading } = useQuery('fetchProducts', async () => {
    const productRepository = new ProductFirebaseRepository();
    const productData = await productRepository.fetch(productId);
    setProduct(productData);
  });

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
    // お気に入り商品なのかを判定している
    const favoriteProductIds = loadFavoriteProducts(selector);
    const existFavorite = favoriteProductIds.includes(productId);
    setIsFavorite(existFavorite);
  }, [products]);

  if (error) {
    return (
      <ErrorMessage
        title="エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
    );
  }

  if (isLoading) {
    return <LoadingIcon />;
  }

  return (
    <section className="relative my-0 mx-auto w-full max-w-[575px] text-center sm:max-w-[1024px]">
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
        <div className="flex flex-row flex-wrap gap-x-10">
          <div className="flex-[6] mx-auto mb-[2rem] w-full h-auto sm:my-0 sm:w-[400px] ">
            <ImageSwiper
              images={recreateImages(product.images)}
              alt="商品画像"
            />
          </div>
          <div className="flex-[4] px-[1rem] mx-auto mb-[16px] w-full h-auto text-left sm:my-0 sm:w-[400px]">
            <h1 className="mx-0 mt-[1rem] mb-[0.6rem] text-[1.4rem]">
              {product.name}
            </h1>
            <p className="m-0 text-[1.4rem] text-[#42993A]">
              ¥{product.price.toLocaleString()}
              <span className="inline-block m-0 text-[0.8rem]">(税込)</span>
            </p>
            <IconButton
              label="お気に入り"
              onClick={handleFavoriteProduct}
              icon={favoriteIcon}
            />
            {canEditProduct && (
              <div className="my-0 mx-auto">
                <PrimaryButton
                  label="商品の編集"
                  onClick={() => dispatch(push(`/edit-product/${product.id}`))}
                  type="button"
                />
              </div>
            )}
            {canPurchaseProduct && (
              <div className="my-0 mx-auto">
                <PrimaryButton
                  label="購入する"
                  onClick={() => setIsOpenPurchaseDialog(true)}
                  type="button"
                />
              </div>
            )}
            {isSold && (
              <div className="my-0 mx-auto">
                <PrimaryButton label="売り切れました" type="button" disabled />
              </div>
            )}
            <h1 className="text-[1rem]">商品説明</h1>
            <p className="m-0 text-sm">
              {addBrTagToLineBreaks(product.description)}
            </p>
            <h1 className="text-base">商品情報</h1>
            <h2 className="inline-block mr-4 text-sm">カテゴリ</h2>
            <p className="inline-block text-sm">
              {product.gender}/{product.category}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

export default ProductDetail;
