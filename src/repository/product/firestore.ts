import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from 'firebase/firestore';
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
   * firestoreより商品情報を削除
   * @param id 削除したい商品id
   */
  async delete(id: string): Promise<void> {
    try {
      const referenceData = doc(db, this.collection, id);
      await deleteDoc(referenceData);
    } catch (error) {
      throw Error('failed to delete product.');
    }
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
   * 更新順に並び変えた商品一覧を取得
   * @returns 更新順商品一覧の配列
   */
  async fetchAll() {
    try {
      // 参照データはproductsコレクションの全てのデータ
      const referenceData = collection(db, this.collection);
      // 更新順でクエリ設定
      const querySetting = query(referenceData, orderBy('updated_at', 'desc'));
      // データ取得
      const snapshots = await getDocs(querySetting);

      const productList: ProductForDatabase[] = [];
      snapshots.forEach((snapshot) => {
        const product = snapshot.data() as ProductForDatabase;
        productList.push(product);
      });
      return productList;
    } catch (error) {
      throw new Error(`cann't product data `);
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
