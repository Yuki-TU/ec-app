import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveProduct } from '../../../reducks/products/operations';
import { PrimaryButton } from '../../uiParts/PrimaryButton';
import { SelectBox } from '../../uiParts/SelectBox';
import { TextInput } from '../../uiParts/TextInput';
import { useStyles } from './style';
import { ImageAddArea } from './ImageAddArea';
import { validateProductAddForm } from './hook';
import { Repository, IRepository } from '../../../repository';
import type { ProductsForDatabase } from '../../../reducks/products/types';

/**
 * 商品編集をする画面の古音ポーネンと
 * @returns コンポーネント
 */
function ProductEdit() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // 商品情報に必要なステートの定義
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDiscription] = useState('');
  const [category, setCategory] = useState('');
  const [gender, setGender] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [images, setImages] = useState<{ id: string; path: string }[]>([]);

  // 商品変種ページの場合、URLより商品idを取得する
  const productId = window.location.pathname.split('/product/edit/')[1];

  // プルダウン選択に必要なデータ定義
  const categories = [
    { id: 'game', name: 'ゲーム' },
    { id: 'shoes', name: 'シューズ' },
    { id: 'clothes', name: '洋服' },
    { id: 'pc', name: 'パソコン' },
    { id: 'book', name: '書籍' },
    { id: 'interior', name: 'インテリア' },
    { id: 'cosme', name: 'コスメ' },
    { id: 'vehicle', name: '乗り物' },
    { id: 'hobby', name: 'ホビー' },
  ];
  const genders = [
    { id: 'male', name: 'メンズ' },
    { id: 'female', name: 'レディース' },
    { id: 'unisex', name: 'ユニセックス' },
  ];

  const inputProductName = useCallback(
    (e) => {
      setProductName(e.target.value);
    },
    [setProductName]
  );
  const inputProductDescription = useCallback(
    (e) => {
      setProductDiscription(e.target.value);
    },
    [setProductDiscription]
  );
  const inputProductPrice = useCallback(
    (e) => {
      setProductPrice(e.target.value);
    },
    [setProductPrice]
  );
  const inputCategory = useCallback(
    (e) => {
      setCategory(e.target.value);
    },
    [setCategory]
  );
  const inputGender = useCallback(
    (e) => {
      setGender(e.target.value);
    },
    [setGender]
  );
  useEffect(() => {
    const setProductStateForPage = async () => {
      const repository: IRepository = new Repository();
      // 商品編集ページのの場合、商品情報を取得
      const response =
        await repository.fetchDataFromDatabase<ProductsForDatabase>(
          'products',
          productId
        );
      // 取得した値をセット
      setProductName(response.name);
      setProductDiscription(response.description);
      setCategory(response.category);
      setGender(response.gender);
      setProductPrice(response.price);
      setImages(response.images);
    };
    setProductStateForPage();
  }, [productId]);

  return (
    <div className={classes.root}>
      <h2 className={classes.title}>商品の登録</h2>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          dispatch(
            saveProduct(
              productId,
              productName,
              productDescription,
              category,
              gender,
              images,
              productPrice
            )
          );
        }}
      >
        <ImageAddArea images={images} setImages={setImages} />
        <TextInput
          fullWidth
          label="商品名"
          multiline={false}
          rows={1}
          required
          value={productName}
          type="text"
          onChange={inputProductName}
        />
        <TextInput
          fullWidth
          label="商品説明"
          multiline
          rows={5}
          required
          value={productDescription}
          type="text"
          onChange={inputProductDescription}
        />
        <SelectBox
          label="カテゴリ"
          required
          items={categories}
          onChange={inputCategory}
          selectedItem={category}
        />
        <SelectBox
          label="性別"
          required
          items={genders}
          selectedItem={gender}
          onChange={inputGender}
        />
        <TextInput
          fullWidth
          label="値段(円)"
          multiline={false}
          rows={1}
          required
          value={productPrice}
          type="number"
          onChange={inputProductPrice}
        />
        <div className={classes.registerButton}>
          <PrimaryButton label="保存" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default ProductEdit;
