import React from 'react';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import type { ProductForDatabase } from '../../../../reducks/products/types';
import noImage from '../../../../assets/images/no_image.png';
import { useStyles } from './style';
/**
 * 商品情報一覧で利用するカードのコンポーネント
 * @param props DB保存の商品情報
 * @returns コンポーネント
 */
function ProductCard(props: ProductForDatabase) {
  const classes = useStyles();
  const { images, name, price } = props;

  // 3桁ごとにコンマをつけstring型にする
  // 例) 2000000 -> '2,000,000'
  const reshapePrime = price.toLocaleString();
  // 画像登録があれば、最初の画像をサムネイルにする
  const thumbnail = images.length > 0 ? images[0].path : noImage;

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
      </CardContent>
    </Card>
  );
}
export default ProductCard;
