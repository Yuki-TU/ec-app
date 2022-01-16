/** ユーザー情報の型 */
export type User = {
  customer_id: string;
  email: string;
  isSignedIn: boolean;
  role: string;
  payment_method_id: string;
  uid: string;
  username: string;
};
