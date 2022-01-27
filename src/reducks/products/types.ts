import { Timestamp } from 'firebase/firestore';

/** データベースに保存する商品情報の型 */
export type ProductsForDatabase = {
  /** 商品面 */
  name: string;
  /** 商品説明 */
  description: string;
  /** カテゴリ */
  category: string;
  /** 性別 */
  gender: string;
  /** 値段 */
  price: string;
  /** 商品id */
  id: string;
  /** 商品画像 */
  images: { id: string; path: string }[];
  /** 更新日 */
  update_at: Timestamp;
};
