import { User } from '../users/types';

/**
 * ユーザー情報の初期化
 */
export const initialUserState: User = {
  customer_id: '',
  email: '',
  isSignedIn: false,
  payment_method_id: '',
  role: 'customer',
  uid: '',
  username: '',
};
