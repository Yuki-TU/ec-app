import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../firebase';
import { ProductForDatabase } from '../../reducks/products/types';
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
   * 商品idより商品リストの検索
   * @param ids 検索したい商品のidリスト
   * @returns 検索結果の商品情報リスト
   */
  async findByIds(ids: string[]) {
    const productsRef = collection(db, this.collection);
    const queryKey = query(productsRef, where('id', 'in', ids));
    const products: ProductForDatabase[] = [];

    try {
      const querySnapshot = await getDocs(queryKey);
      querySnapshot.forEach((product) => {
        products.push(product.data() as ProductForDatabase);
      });
      return products;
    } catch (error) {
      throw new Error('検索失敗');
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

  /**
   * 購入された商品DBに購入者IDを登録
   * @param purchaserId 購入者ID
   * @param purchasedProductId 購入された商品ID
   * @returns 更新されたすべてのデータ
   */
  async purchasedProduct(purchaserId: string, purchasedProductId: string) {
    try {
      await setDoc(
        doc(db, this.collection, purchasedProductId),
        { purchaser: purchaserId },
        { merge: true }
      );
      return await this.fetchAll();
    } catch (error) {
      throw new Error('商品コレクションに対する購入者登録失敗');
    }
  }
}

export default ProductFirebaseRepository;
