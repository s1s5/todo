``` shell
# virtualenvの生成
mkvirtualenv --no-site-packages -p /usr/bin/python3 todo
pip install django
django-admin startproject todo

# とりあえず必須そうなもののインストール
pip install django-environ django-debug-toolbar django-debug-toolbar-template-timings gunicorn psycopg2-binary pytz requests
pip freeze | sort > requirements.txt 

# graphqlを使う
pip install graphene graphene-django graphene-subscriptions django-filter channels-redis
```

``` shell
# npmのパッケージマネージャを使うためにディレクトリを初期化
npm init

# babel, webpackのインストール
npm install --save-dev @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/preset-env @babel/preset-react @babel/preset-typescript webpack webpack-cli webpack-dev-server babel-loader

# webpackのリリース設定用のパッケージのインストール
npm install --save-dev webpack-merge terser-webpack-plugin

# typescriptを使うためのインストール
npm install --save-dev fork-ts-checker-webpack-plugin  typescript

# typescript上でreactをインストール
npm install --save-dev @types/react @types/react-dom

# よくわからんけどよく使うらしいのでインストール
npm install --save core-js regenerator-runtime

# reactをインストール
npm install --save react react-dom

# webpack-dev-serverで使うのでhtml-webpack-pluginをインストール
npm install --save-dev html-webpack-plugin

# webpack-dev-serverでreactのstate保持したまま更新するためにインストール
npm install --save @hot-loader/react-dom react-hot-loader

# tsconfig.json, webpack.config.babel.js, babel.config.jsの追加・修正(webpack.config.babel.jsはwebpack.config.jsでいいかも)

# jestをインストール
npm install --save-dev @types/jest jest # ts-jestは入れない、jestでbabel-plugin-relayが使えなくなる

# reactをテストするためのツール類をインストール
npm install --save-dev react-test-renderer @types/react-test-renderer

# graphqlを使うためのライブラリ群をインストール
npm install --save-dev @types/react-relay @types/ws @types/relay-compiler @types/relay-config @types/relay-runtime babel-plugin-relay relay-compiler relay-compiler-language-typescript relay-modern-typescript-transformer @types/create-subscription @types/graphql
npm install --save create-subscription react-relay subscriptions-transport-ws
npm install --save-dev relay-test-utils @types/relay-test-utils

# react便利ツールのインストール
npm install --save react-router-dom
npm install --save-dev @types/react-router-dom

npm install --save hoist-non-react-statics
npm install --save-dev @types/hoist-non-react-statics

```



``` shell
# material-uiを使ってみる
npm install --save @material-ui/core @material-ui/icons @material-ui/pickers

# この辺はどれが必須なんだ・・？？, date-fns@2は使えない
npm install --save @material-ui/pickers @date-io/date-fns@1.3.13 date-fns
npm install --save material-ui-dropzone @material-ui/lab



# dev-index.htmlの追加
#     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
#     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
#     <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width"/>
# あたりを追記して、HtmlWebpackPluginのtemplateに指定しておく
```

``` shell
# Djangoとwebpackの連携
npm install --save-dev webpack-bundle-tracker
pip install django-webpack-loader
```

``` shell
# profiling
npm install --save-dev clean-webpack-plugin
npm install --save-dev stats-webpack-plugin
npm install --save-dev webpack-bundle-analyzer
# add webpack.profile.js
npm run build:profile -- --stats
npm run analyze
```


asyncio.run(channel_layer.flush())
