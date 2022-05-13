import React, { useCallback, useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import { useStyles } from './style';
import { deleteImage, uploadImage } from './hook';
import { ImagePreview } from '../../../uiParts/ImagePreview';
import { Dialog } from '../../../uniqueParts/Dialog';

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
const ImageAddArea = React.memo((props: ImageAddAreaProps) => {
  const classes = useStyles();
  const { setImages, images } = props;
  const [openUploadFailureDialog, setOpenUploadFailureDialog] = useState(false);
  const [openDeleteFailureDialog, setOpenDeleteFailureDialog] = useState(false);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [deletedImageId, setDletedImageId] = useState('');

  // 画像アップロード処理
  const hadleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      await uploadImage(event, images, setImages);
    } catch (error) {
      setOpenUploadFailureDialog(true);
    }
  };
  // 画像の削除処理
  const handdleDeleteImage = async (imageId: string) => {
    try {
      await deleteImage(imageId, images, setImages);
    } catch (error) {
      setOpenDeleteFailureDialog(true);
    }
  };

  return (
    <div className={classes.root}>
      <Dialog
        isOpen={openUploadFailureDialog}
        setIsOpen={setOpenUploadFailureDialog}
        title="⚠エラー"
        text="画像のアップロードに失敗しました。もう一度やり直してください。"
      />
      <Dialog
        isOpen={openDeleteFailureDialog}
        setIsOpen={setOpenDeleteFailureDialog}
        title="⚠エラー"
        text="画像の削除に失敗しました。もう一度やり直してください。"
      />
      <div className={classes.images}>
        {images.length > 0 &&
          images.map((image) => (
            <>
              <Dialog
                isOpen={openConfirmDialog}
                setIsOpen={setOpenConfirmDialog}
                title="確認"
                text="本当にこの画像を削除しますか？"
                onClick={() => handdleDeleteImage(deletedImageId)}
              />
              <ImagePreview
                alt="プレビュー画像"
                id={image.id}
                key={image.id}
                path={image.path}
                onClick={() => {
                  setDletedImageId(image.id);
                  setOpenConfirmDialog(true);
                }}
              />
            </>
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
              (event) => hadleUploadImage(event),
              [setImages]
            )}
          />
        </label>
      </IconButton>
    </div>
  );
});

export default ImageAddArea;
