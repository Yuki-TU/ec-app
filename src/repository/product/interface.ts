import { ProductForDatabase } from '../../reducks/products/types';

/** 商品情報のデータストア操作インターフェース */
export interface IProductRepository {
  delete(id: string): Promise<void>;
  fetch(id: string): Promise<ProductForDatabase>;
  save(user: ProductForDatabase): void;
}
