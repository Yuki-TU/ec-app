import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { push } from 'connected-react-router';

import type { ProductForDatabase } from '../../../../reducks/products/types';
import { useStyles } from './style';
import { deleteProduct } from '../../../../reducks/products/operations';
import { getThumbnail } from './hook';

/**
 * 商品情報一覧で利用するカードのコンポーネント
 * @param props DB保存の商品情報
 * @returns コンポーネント
 */
function ProductCard(props: ProductForDatabase) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { images, name, price, id } = props;

  /** メニュー表示フラグ */
  const [isOpeningMenu, setIsOpenMenu] = useState(false);
  /** メニューを表示する位置設定 */
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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

  return (
    <Card className={classes.root}>
      <CardMedia image={thumbnail} className={classes.media} />
      <CardContent className={classes.content}>
        <div>
          <Typography component="p" className={classes.productName}>
            {name}
          </Typography>
          <Typography component="p" className={classes.price}>
            ¥{reshapePrime}
          </Typography>
        </div>
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
              dispatch(push(`/product/edit/${id}`));
              handleCloseMenu();
            }}
          >
            編集する
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(deleteProduct(id));
              handleCloseMenu();
            }}
          >
            削除する
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
}
export default ProductCard;
