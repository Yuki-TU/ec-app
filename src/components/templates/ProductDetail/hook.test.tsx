import HTMLReactParser from 'html-react-parser';
import noImage from '../../../assets/images/no_image.png';

import { addBrTagToLineBreaks, recreateImages } from './hook';

describe('addBrTagToLineBreaksは\nや\rをhtmlの改行タグbrタグにかえ、JSXに変える', () => {
  test('\nはbrタグに変えてJSXを返す', () => {
    const text = '\n';
    const jsxText = addBrTagToLineBreaks(text);
    expect(jsxText).toEqual(HTMLReactParser(text.replace(/\r?\n/g, '<br />')));
  });
});

describe('recreateImagesメソッドは画像がない場合NoImageの画像を返却し、あれば画像リストをそのまま返却', () => {
  test('画像リストがなければ、noImageの画像を返す', () => {
    /* eslint @typescript-eslint/no-explicit-any: 0 */
    const image: any = [];
    expect(recreateImages(image)).toEqual([{ id: 'noimage', path: noImage }]);
  });
  test('画像リストがあれば、そのまま画像リストを返す', () => {
    const image = [{ id: '0', path: 'test.png' }];
    expect(recreateImages(image)).toEqual(image);
  });
});
