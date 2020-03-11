mkvirtualenv --no-site-packages -p /usr/bin/python3 todo
pip install django
django-admin startproject todo
pip install django-environ django-debug-toolbar django-debug-toolbar-template-timings gunicorn psycopg2-binary pytz requests
pip freeze | sort > requirements.txt 

pip install graphene graphene-django graphene-subscriptions django-filter channels-redis

npm init


npm install --save-dev @babel/core @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators @babel/preset-env @babel/preset-react @babel/preset-typescript webpack webpack-cli webpack-dev-server babel-loader
npm install --save-dev fork-ts-checker-webpack-plugin  typescript
npm install --save-dev @types/react @types/react-dom
npm install --save core-js regenerator-runtime
npm install --save react react-dom
npm install --save-dev html-webpack-plugin
npm install --save @hot-loader/react-dom react-hot-loader

add tsconfig.json  webpack.config.babel.js

npm install --save-dev @types/jest jest ts-jest
npm install --save-dev react-test-renderer @types/react-test-renderer

npm install --save-dev @types/react-relay @types/ws @types/relay-compiler @types/relay-config @types/relay-runtime babel-plugin-relay relay-compiler relay-compiler-language-typescript relay-modern-typescript-transformer @types/create-subscription @types/graphql
npm install --save create-subscription react-relay subscriptions-transport-ws


npm install --save react-router-dom
npm install --save-dev @types/react-router-dom

npm install --save hoist-non-react-statics
npm install --save-dev @types/hoist-non-react-statics

npm install --save-dev relay-test-utils @types/relay-test-utils


npm uninstall ts-jest
