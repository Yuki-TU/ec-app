import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { storage } from '../../../../firebase';

/**
 * a-z, A-Z, 0-9の間でランダムな文字列を生成する
 * @returns 16桁のランダム文字列
 */
export function generate16RamdomString() {
  const S = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const N = 16;
  return Array.from(crypto.getRandomValues(new Uint32Array(N)))
    .map((n) => S[n % S.length])
    .join('');
}

/**
 * 画像をアップロードし、ステータスの値を更新する
 * @param event イベント
 * @param images 画像ステータス
 * @param setImages 画像ステータスを変更するメソッド
 */
export async function uploadImage(
  event: React.ChangeEvent<HTMLInputElement>,
  images: { id: string; path: string }[],
  setImages: React.Dispatch<
    React.SetStateAction<{ id: string; path: string }[]>
  >
) {
  const imageFiles = event.target.files as unknown as BlobPart[];

  // firebaseStoreに保存するためにblobに変更
  const imageConvertedToBlob = new Blob(imageFiles, { type: 'image/jpeg' });

  // 画像保存名は16桁ランダム文字列
  const imageName = `${generate16RamdomString()}.jpeg`;

  // 保存先の指定
  const uploadRef = ref(storage, `images/products/${imageName}`);

  try {
    // 写真のアップロード
    const { metadata } = await uploadBytes(uploadRef, imageConvertedToBlob);
    // ダウンロードURLの取得
    const downloadUrl = await getDownloadURL(uploadRef);
    // 画像ステートの更新
    const newImage = { id: metadata.fullPath, path: downloadUrl };
    setImages((prevState) => [...prevState, newImage]);
  } catch (error) {
    throw new Error('画像のアップロードに失敗しました。');
  }
}

/**
 * 選択画像をfirebaseストアより削除し、がずステータスを更新
 * @param id 消したい画像のid
 * @param images 画像ステータス
 * @param setImages 画像ステータスを更新するメソッド
 */
export async function deleteImage(
  id: string,
  images: { id: string; path: string }[],
  setImages: React.Dispatch<
    React.SetStateAction<{ id: string; path: string }[]>
  >
) {
  try {
    // firestrageより画像を削除
    await deleteObject(ref(storage, id));
    // 削除画像以外を新たな配列に格納しステート更新
    // firestrageの画像削除が成功してから、ユーザ画面表示の画像を削除する必要がある
    const newImages = images.filter((image) => image.id !== id);
    setImages(newImages);
  } catch (error) {
    throw new Error('画像削除に失敗しました');
  }
}
