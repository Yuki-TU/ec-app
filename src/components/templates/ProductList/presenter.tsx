import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '../../../reducks/products/operations';
import { loadProducts } from '../../../reducks/products/selectors';
import { useSelector } from '../../../reducks/store';
import { ProductCard } from './ProductCard';
import { useStyles } from './style';

/**
 * 商品リストを表示するコンポーネント
 * @returns コンポーネント
 */
function ProductList() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // ストアより商品情報取得
  const selector = useSelector((state) => state);
  const products = loadProducts(selector);

  // コンポーネントw表示したら、商品データを取得する
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <section className={classes.root}>
      <div className={classes.grid}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            category={product.category}
            description={product.description}
            name={product.name}
            gender={product.gender}
            price={product.price}
            id={product.id}
            images={product.images}
            updated_at={product.updated_at}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;
