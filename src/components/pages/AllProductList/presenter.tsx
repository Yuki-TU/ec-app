import React from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../reducks/products/operations';
import { loadProducts } from '../../../reducks/products/selectors';
import { useSelector } from '../../../reducks/store';
import { ErrorMessage } from '../../uiParts/ErrorMessage';
import { LoadingIcon } from '../../uiParts/LoadingIcon';
import { ProductList } from '../../uniqueParts/ProductList';

/**
 * 商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function AllProductList() {
  // ストアより商品情報取得
  const selector = useSelector((state) => state);
  const products = loadProducts(selector);

  const dispatch = useDispatch();
  const { error, isFetching } = useQuery('fetchProducts', () =>
    dispatch(fetchProducts())
  );

  if (error)
    return (
      <ErrorMessage
        title="エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
    );
  if (isFetching) return <LoadingIcon />;

  return (
    <div className="relative mx-auto md:max-w-[1024px]">
      <ProductList list={products} />
    </div>
  );
}

export default AllProductList;
