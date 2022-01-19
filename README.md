# ec-app-ystore

ec-app-ystore は EC サイトの ystore です。
商品を登録、閲覧、商品のアップロードをすることができます。

環境構築は[Create React APP](https://create-react-app.dev/)を利用。
言語は、TypeScript(\*.ts）で記述。
ライブラリは[React.js](https://ja.reactjs.org/) を利用。
デザインは[material-ui](https://mui.com/getting-started/usage/)を利用。
状態管理は[redux](https://redux.js.org/) 及び [reduxtoolkit](https://redux-toolkit.js.org/)を利用。
ルーティングは[react-router](https://reactrouter.com/)を利用。
アプリケーションサービス [fireabase](https://firebase.google.com/?hl=ja) を利用。

# 開発手順

- 必要なツール
  - `node: 14.x`
  - `npm: 6.x`
- 環境構築

  1. `.env.example`に必要な値を代入し、`.env`にリネームする。
  2. 以下のコマンドを事項

  ```sh
  $ git clone https://github.com/Yuki-TU/ec-app.git
  $ cd ./ec-app
  # 必要なパッケージインストール
  $ npm install ci
  # ローカルサーバーの起動
  $ npm start
  ```

  ローカルサーバーが起動したら[http://localhost:3000/](http://localhot:3000/)にアクセス

- ビルド

  ```sh
  $ npm run build
  ```

  直下に`./build`ディレクトリが作成されます

- format
  [prettier](https://prettier.io/)を導入しています。

  ```sh
  $ npm run format
  ```

- lint
  [eslint](https://github.com/eslint/eslint)を導入しています。
  ルールのベースは [airbnb](https://github.com/airbnb/javascript)とする。

  ```sh
  $ npm run lint
  ```

- 自動テスト
  [jest](https://jestjs.io/ja/) 及び [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) を利用します。

  ```sh
  $ npm test
  ```

# デプロイ方法

- 自動デプロイについて
  - github action による CD を導入しているため、main ブランチにマージされると自動的にデプロイされる
- 手動でのデプロイ方法

  1. `.env`ファイルに必要な値を設定
  2. 以下のコマンドを実行

  ```sh
  $ firebase deploy --only hosting
  ```

  3. [https://ec-app-ystore.web.app/](https://ec-app-ystore.web.app/)にデプロイされていることを確認

# デモページ

- 公式ページ
  [https://ec-app-ystore.web.app/](https://ec-app-ystore.web.app/)
- ステージング
  - PR を作成するたびに作成されます
  - 各 PR ページよりアクセス

# 互換性

- デスクトップ用 Chrome 97+
- iphone safari ios 14+
