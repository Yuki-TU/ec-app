import React, { useCallback } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useStyles } from './style';
import { deleteImage, uploadImage } from './hook';
import { ImagePreview } from '../../../uiParts/ImagePreview';

/** 引数の型定義 */
type ImageAddAreaProps = {
  images: { id: string; path: string }[];
  setImages: React.Dispatch<
    React.SetStateAction<{ id: string; path: string }[]>
  >;
};

/**
 * 画像を追加し、プレビューw表示するンポーネント
 * @param props images: 画像ステート, setImages: 画像セットステート
 * @returns コンポーネント
 */
function ImageAddArea(props: ImageAddAreaProps) {
  const classes = useStyles();
  const { setImages, images } = props;

  return (
    <div className={classes.root}>
      <div className={classes.images}>
        {images.length > 0 &&
          images.map((image) => (
            <ImagePreview
              alt="プレビュー画像"
              id={image.id}
              key={image.id}
              path={image.path}
              onClick={() => {
                if (window.confirm('この画像を削除しますか？')) {
                  deleteImage(image.id, images, setImages);
                }
              }}
            />
          ))}
      </div>
      <IconButton>
        <label htmlFor="add-image">
          <span className={classes.label}>商品画像を登録する</span>
          <AddPhotoAlternateIcon />
          <input
            accept="image/*"
            className={classes.inputfile}
            type="file"
            id="add-image"
            onChange={useCallback(
              (event) => uploadImage(event, images, setImages),
              [setImages]
            )}
          />
        </label>
      </IconButton>
    </div>
  );
}

export default ImageAddArea;
