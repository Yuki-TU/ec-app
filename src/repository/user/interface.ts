import { UserForDatabase } from '../../reducks/users/types';

/** ユーザ情報のデータストア操作インターフェース */
export interface IUserRepository {
  fetchUser(id: string): Promise<UserForDatabase>;
  saveUser(user: UserForDatabase): void;
}
