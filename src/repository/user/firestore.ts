import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';
import type { UserForDatabase } from '../../reducks/users/types';
import { IUserRepository } from './interface';

/**
 * firebaseのfirestoreにデータ操作するためのリポジトリ
 */
class UserFirebaseRepository implements IUserRepository {
  private collection;

  constructor() {
    this.collection = 'users';
  }

  /**
   * 商品購入リスト更新
   * @param userId ユーザID
   * @param productId 商品ID
   * @returns 更新された購入商品リスト
   */
  async purchaseProduct(userId: string, productId: string) {
    try {
      await setDoc(
        doc(db, this.collection, userId),
        { purchasedProducts: arrayUnion(productId) },
        { merge: true }
      );
      const user = await this.fetchUser(userId);
      return user.purchasedProducts;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('ユーザーコレクションに対して購入商品登録失敗');
    }
  }

  /**
   * 指定ユーザに対して出品商品を追加
   * @param userId ユーザ
   * @param product 出品登録した商品id
   * @returns 更新された出品商品リスト
   */
  async addExhibitedProduct(userId: string, product: string) {
    try {
      await setDoc(
        doc(db, this.collection, userId),
        { exhibited_products: arrayUnion(product) },
        { merge: true }
      );
      // 更新された商品リストを取得し、返却
      const user = await this.fetchUser(userId);
      return user.exhibited_products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('ユーザーに対して出品商品の追加失敗');
    }
  }

  /**
   * 指定ユーザに対して出品商品を削除
   * @param userId ユーザid
   * @param product 出品削除した商品id
   * @returns 更新された出品商品リスト
   */
  async removeExhibitedProduct(userId: string, product: string) {
    try {
      await setDoc(
        doc(db, this.collection, userId),
        { exhibited_products: arrayRemove(product) },
        { merge: true }
      );
      const user = await this.fetchUser(userId);
      return user.exhibited_products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('ユーザに対して出品商品登録解除失敗');
    }
  }

  /**
   * 指定ユーザに対してお気に入りの商品を追加
   * @param userId ユーザ
   * @param product お気に入り登録したい商品id
   * @returns 更新されたお気に入り商品リスト
   */
  async addFavoriteProduct(userId: string, product: string) {
    try {
      await setDoc(
        doc(db, this.collection, userId),
        { favorite_products: arrayUnion(product) },
        { merge: true }
      );
      // 更新された商品リストを取得し、返却
      const user = await this.fetchUser(userId);
      return user.favorite_products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('お気に入り登録失敗');
    }
  }

  /**
   * 指定ユーザに対してお気に入り商品を削除
   * @param userId ユーザid
   * @param product お気に入り解除したい商品id
   * @returns 更新されたお気に入り商品リスト
   */
  async removeFavoriteProduct(userId: string, product: string) {
    try {
      await setDoc(
        doc(db, this.collection, userId),
        { favorite_products: arrayRemove(product) },
        { merge: true }
      );
      const user = await this.fetchUser(userId);
      return user.favorite_products;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('お気に入り解除失敗');
    }
  }

  /**
   * firebasestoreからuseridのユーザデータ取得
   * @param id ユーザid
   * @returns ユーザデータ
   */
  async fetchUser(id: string) {
    try {
      const referenceData = doc(db, this.collection, id);
      const result = await getDoc(referenceData);
      // 取得データを型変換して返却
      return result.data() as UserForDatabase;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('failed to fetch firestore');
    }
  }

  /**
   * firebasestoreにユーザデータを保存
   * @param user 保存したいユーザデータ
   */
  async saveUser(user: UserForDatabase) {
    const key = user.uid;

    try {
      // データベースのusersコレクションに、ユーザ登録でランダムに作成されたユーザidをキーに各ユーザ情報を登録
      await setDoc(doc(db, this.collection, key), user, { merge: true });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
}

export default UserFirebaseRepository;
