import { IconButton, Menu, MenuItem } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { MoreVert } from '@material-ui/icons';
import { push } from 'connected-react-router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteProduct } from '../../../../reducks/products/operations';
import type { ProductForDatabase } from '../../../../reducks/products/types';
import { useSelector } from '../../../../reducks/store';
import { loadUserId } from '../../../../reducks/users/selectors';
import { Dialog } from '../../Dialog';
import { getThumbnail } from './hook';
import { useStyles } from './style';

/**
 * 商品情報一覧で利用するカードのコンポーネント
 * @param props DB保存の商品情報
 * @returns コンポーネント
 */
const ProductCard = React.memo((props: ProductForDatabase) => {
  const classes = useStyles();
  const selector = useSelector((state) => state);
  const dispatch = useDispatch();
  const { images, name, price, id, owner, purchaser } = props;
  const userId = loadUserId(selector);

  // メニュー表示フラグ
  const [isOpeningMenu, setIsOpenMenu] = useState(false);
  // メニューを表示する位置設定
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // ダイアログを管理するステート
  const [openFailureDialog, setOpenFailureDialog] = useState(false);

  const handleClickMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setAnchorEl(event.currentTarget);
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsOpenMenu(false);
  };

  // 3桁ごとにコンマをつけstring型にする
  // 例) 2000000 -> '2,000,000'
  const reshapePrime = price.toLocaleString();
  // 画像登録があれば、最初の画像をサムネイルにする
  const thumbnail = getThumbnail(images);

  const isSold = purchaser !== '';
  // 商品オーナーとログインユーザが同じ、かつ売り切れでないなら編集ボタンを表示
  const canEditProduct = owner === userId && !isSold;

  return (
    <Card className={classes.root}>
      <Dialog
        isOpen={openFailureDialog}
        setIsOpen={setOpenFailureDialog}
        title="⚠エラー"
        text="情報取得に失敗しました。リロードしなおしてください。"
      />
      {isSold ? (
        <div className={classes.imageBox}>
          <div className={classes.solidOut}>
            <div className={classes.solidOutText}>sold</div>
          </div>
          <CardMedia
            image={thumbnail}
            className={classes.media}
            onClick={() => dispatch(push(`/product/${id}`))}
          />
        </div>
      ) : (
        <CardMedia
          image={thumbnail}
          className={classes.media}
          onClick={() => dispatch(push(`/product/${id}`))}
        />
      )}
      <CardContent className={classes.content}>
        <div>
          <Typography component="p" className={classes.productName}>
            {name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ¥{reshapePrime}
          </Typography>
        </div>
        {canEditProduct && (
          <>
            <IconButton
              className={classes.icon}
              onClick={(e) => handleClickMenu(e)}
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl} // 表示位置の設定
              keepMounted
              open={isOpeningMenu}
              onClose={handleCloseMenu}
            >
              <MenuItem
                onClick={() => {
                  dispatch(push(`/edit-product/${id}`));
                  handleCloseMenu();
                }}
              >
                編集する
              </MenuItem>
              <MenuItem
                onClick={async () => {
                  try {
                    // HACK: awaitが必要ないと言われるが、ないとエラーダイアログ出せないので追加
                    await dispatch(deleteProduct(id));
                  } catch (error) {
                    setOpenFailureDialog(true);
                  }
                  handleCloseMenu();
                }}
              >
                削除する
              </MenuItem>
            </Menu>
          </>
        )}
      </CardContent>
    </Card>
  );
});
export default ProductCard;
