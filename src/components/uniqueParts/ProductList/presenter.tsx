import React from 'react';
import { ProductCard } from './ProductCard';
import { useStyles } from './style';
import { Products } from '../../../reducks/products/types';

/**
 * 商品リストを表示するコンポーネント
 * @param props list: 表示したい商品リスト
 * @returns コンポーネント
 */
function ProductList(props: Products) {
  const { list } = props;
  const classes = useStyles();

  return (
    <div className={classes.grid}>
      {list.map((product) => (
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
          owner={product.owner}
        />
      ))}
    </div>
  );
}

export default ProductList;
