import { ProductsForDatabase } from '../../reducks/products/types';

/** 商品情報のデータストア操作インターフェース */
export interface IProductRepository {
  fetch(id: string): Promise<ProductsForDatabase>;
  save(user: ProductsForDatabase): void;
}
