import { doc, getDoc, setDoc } from 'firebase/firestore';
import { ProductForDatabase } from '../../reducks/products/types';
import { db } from '../../firebase';
import type { IProductRepository } from './interface';

/**
 * firebaseの商品データ操作するためのリポジトリ
 */
class ProductFirebaseRepository implements IProductRepository {
  private collection;

  constructor() {
    this.collection = 'products';
  }

  /**
   * firebasestoreからproductIdの商品データ取得
   * @param id 商品id
   * @returns 商品データ
   */
  async fetch(id: string) {
    try {
      const referenceData = doc(db, this.collection, id);
      const result = await getDoc(referenceData);
      // 取得データを型変換して返却
      return result.data() as ProductForDatabase;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('failed to fetch firestore');
    }
  }

  /**
   * firebasestoreに商品情報を保存
   * @param product 保存したい商品データ
   */
  async save(product: ProductForDatabase) {
    const key = product.id;

    try {
      // merge: trueで差分だけ保存ができる
      await setDoc(doc(db, this.collection, key), product, { merge: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default ProductFirebaseRepository;
