import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

/** レポジトリのインターフェース */
export interface IRepository {
  fetchDataFromDatabase<T>(collection: string, key: string): Promise<T>;
}

export class Repository implements IRepository {
  /** DBのインスタンス */
  private db;

  constructor() {
    this.db = db;
  }

  /**
   * firebasestoreからのデータ取得
   * @param collection firebaseのコレクション名
   * @param key キーとする値
   * @returns 取得データ
   */
  async fetchDataFromDatabase<T>(collection: string, key: string) {
    try {
      const referenceData = doc(this.db, collection, key);
      const result = await getDoc(referenceData);
      // 取得データを型変換して返却
      return result.data() as T;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error('failed to fetch firestore');
    }
  }
}
