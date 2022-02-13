import { getThumbnail } from './hook';
import noImage from '../../../../assets/images/no_image.png';

describe('商品カードに関するテスト', () => {
  describe('getThumbnail関数は、サムネイル画像を取得する', () => {
    test(`複数画像があれば、先頭の画像をサムネイル画像として返す`, () => {
      const mockImages = [
        { id: '1', path: 'https://sample.com/image1.png' },
        { id: '3', path: 'https://sample.com/image2.png' },
      ];
      expect(getThumbnail(mockImages)).toBe(mockImages[0].path);
    });

    test(`画像が一枚もなければ、no imageと書かれた画像をサムネイル画像として返す`, () => {
      /* eslint @typescript-eslint/no-explicit-any: 0 */
      const mockImages: any[] = [];
      expect(getThumbnail(mockImages)).toBe(noImage);
    });
  });
});
