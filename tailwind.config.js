module.exports = {
  content: [
    // class属性を含む全てのファイルを指定する必要がある(jsx,htmlなど)
    './public/**/*.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
    // フォントの設定
    // font-originでアクセス`
    fontFamily: {
      origin: [
        'Helvetica Neue',
        'Arial',
        'Hiragino Kaku Gothic ProN',
        'Hiragi',
        'Meiryo',
        'sans-serif',
      ],
    },
  },
  plugins: [],
  important: true, // materil-uiと競合するため、この指定をする
};
