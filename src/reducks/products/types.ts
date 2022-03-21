import { Timestamp } from 'firebase/firestore';

/** データベースに保存する商品情報の型 */
export type ProductForDatabase = {
  /** 商品面 */
  name: string;
  /** 商品説明 */
  description: string;
  /** カテゴリ */
  category: string;
  /** 性別 */
  gender: string;
  /** 値段 */
  price: number;
  /** 商品id */
  id: string;
  /** 商品画像 */
  images: { id: string; path: string }[];
  /** 更新日 */
  updated_at: Timestamp;
  /** プロダクト出品者のユーザid */
  owner: string;
};

/** reduxで扱う商品情報一覧の型 */
export type Products = {
  /** 商品情報一覧 */
  list: ProductForDatabase[];
};
