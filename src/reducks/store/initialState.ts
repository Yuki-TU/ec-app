import { Products } from '../products/types';
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
  favoriteProducts: [],
  exhibitedProducts: [],
};

/** 商品情報の初期化 */
export const initialProductState: Products = {
  list: [],
};
