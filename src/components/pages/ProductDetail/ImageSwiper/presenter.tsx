import React, { useState } from 'react';
import { FreeMode, Navigation, Thumbs } from 'swiper';
// swiperのスタイル
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ThumbsOptions } from 'swiper/types';
import type { ProductForDatabase } from '../../../../reducks/products/types';
import { useStyles } from './style';

/** 型 */
type ImageSwiperProps = {
  /** 画像リスト */
  images: ProductForDatabase['images'];
  /** 写真が表示できなかった時の大体文字 */
  alt: string;
};
/**
 * サムネイルギャラリー付き画像スワイパーコンポーネント
 * @param props images: 表示したい画像リスト
 * @returns 画像スワイパーコンポーネント
 */
function ImageSwiper(props: ImageSwiperProps) {
  const classes = useStyles();
  const { images, alt } = props;

  // サムネイルギャラリーに利用するステート
  const [thumbsSwiper, setThumbsSwiper] = useState<
    ThumbsOptions['swiper'] | null
  >(null);

  return (
    <>
      <Swiper
        className={classes.mainGallery}
        modules={[FreeMode, Navigation, Thumbs]}
        navigation
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper }}
      >
        {images.map((image) => (
          <SwiperSlide className={classes.mainGallerySlide} key={image.id}>
            <img
              className={classes.mainGalleryImage}
              src={image.path}
              alt={alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        className={classes.thumbnailGallery}
        freeMode
        modules={[FreeMode, Navigation, Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        watchSlidesProgress
      >
        {images.map((image) => (
          <SwiperSlide className={classes.thumbnailGallerySlide} key={image.id}>
            <img
              className={classes.thumbnailGalleryImage}
              src={image.path}
              alt={alt}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default React.memo(ImageSwiper);
