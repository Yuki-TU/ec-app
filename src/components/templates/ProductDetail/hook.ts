import HTMLReactParser from 'html-react-parser';
import noImage from '../../../assets/images/no_image.png';
import type { ProductForDatabase } from '../../../reducks/products/types';

/**
 * DBに画像がない場合NoImageの画像を返却し、あれば画像リストをそのまま返却
 * @param images データベースに保存されている画像(空の場合あり)
 * @returns 画像リスト
 */
export function recreateImages(images: ProductForDatabase['images']) {
  if (!images.length) {
    return [{ id: 'noimage', path: noImage }];
  }
  return images;
}

/**
 * '\n'や'\r'の改行文字をhtmlの改行タグ<br>に変えJSXを返す
 * @param text 文字列
 * @returns 改行タグを付け加えた文字列
 */
export function addBrTagToLineBreaks(text: string) {
  if (text === '') {
    return text;
  }
  return HTMLReactParser(text.replace(/\r?\n/g, '<br />'));
}
