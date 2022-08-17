# graphical-mapping-by-pop-trend

都道府県別の人口推移を表示するやつです。

## 依存 API

- 都道府県一覧および総人口情報は RESAS (地域経済分析システム) API のデータを使用しています。
  - https://opendata.resas-portal.go.jp/
  - 事前に API キーを取得しておく必要があります

## setup

- `.env.example` を '.env' にリネームし、中の`{enter-your-api-key}`を取得した API キーに置き換えてください。
  その後

```
npm install
npm run dev
```

でサーバーが起動します
