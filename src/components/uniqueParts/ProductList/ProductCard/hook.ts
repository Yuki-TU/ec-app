import type { ProductForDatabase } from '../../../../reducks/products/types';
import noImage from '../../../../assets/images/no_image.png';

/**
 * サムネイル画像を取得する
 * @param images 画像リスト
 * @returns サムネイル画像
 */
export function getThumbnail(images: ProductForDatabase['images']) {
  return images.length > 0 ? images[0].path : noImage;
}
