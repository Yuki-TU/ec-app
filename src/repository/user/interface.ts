import type { UserForDatabase } from '../../reducks/users/types';

/** ユーザ情報のデータストア操作インターフェース */
export interface IUserRepository {
  fetchUser(id: string): Promise<UserForDatabase>;
  saveUser(user: UserForDatabase): void;
  addFavoriteProduct(userId: string, product: string): Promise<string[]>;
  removeFavoriteProduct(userId: string, product: string): Promise<string[]>;
}
