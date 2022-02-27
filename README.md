# Planning Poker(Work in Progress)
スクラムのプランニングポーカーを行うアプリ

## 技術スタック
* React
  * MUI
* Firebase
  * Hosting
  * Firestore Database
  * Realtime Database

## アーキテクチャ
React-Create-Appを利用したSPA。  
バックエンドプログラムは実装せず、Firebaseのサービスを利用する。  
※Cloud Functionsも利用しない構成。  

データはFirestoreで管理する。  
ユーザのプレゼンス管理のために、Realtime Databaseを利用している（disconnectionを検知するため）。  

## ローカル環境作成
### 環境変数の設定
`.env.local`を作成し、以下の環境変数を設定する。  
"XXXXX"の部分は、Firebaseの設定画面から値を確認し設定すること。  
```bash
REACT_APP_API_KEY=XXXXX
REACT_APP_AUTH_DOMAIN=XXXXX
REACT_APP_PROJECT_ID=XXXXX
REACT_APP_STORAGE_BUCKET=XXXXX
REACT_APP_MESSAGING_SENDER_ID=XXXXX
REACT_APP_APP_ID=XXXXX
REACT_APP_DATABASE_URL=XXXXX
```

### コマンド
```bash
# node moduleインストール
npm ci

# 画面起動
npm start
```



## ビルド＆デプロイ
GitHub Actionsを利用してCI/CDを実施。  
Secretsに`.env`で設定した環境変数を設定すること。  
上記のSecretsは、GitHub Actionsの定義ファイルで利用している。  
※環境変数の増減が発生した場合は、GitHub Actionsのworkflowsファイルを修正すること。

