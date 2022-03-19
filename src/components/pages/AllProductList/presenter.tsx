import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../reducks/products/operations';
import { loadProducts } from '../../../reducks/products/selectors';
import { useSelector } from '../../../reducks/store';
import { ProductList } from '../../uniqueParts/ProductList';
import { useStyles } from './style';

/**
 * 商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function AllProductList() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // ストアより商品情報取得
  const selector = useSelector((state) => state);
  const products = loadProducts(selector);

  // コンポーネントを表示したら、商品データを取得する
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className={classes.root}>
      <ProductList list={products} />
    </div>
  );
}

export default AllProductList;
