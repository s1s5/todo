#!/bin/bash
# -*- mode: shell-script -*-

set -eu  # <= 0以外が返るものがあったら止まる, 未定義の変数を使おうとしたときに打ち止め

export USER_ID=`id -u`
export GROUP_ID=`id -g`

# npm install
if [ `uname` = "Darwin" ]; then
    trap 'kill $(jobs -p)' INT

    npm run start &
    npm run relay -- --watch &
    docker-compose build
    docker-compose up &

    wait $(jobs -p)
else
    docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.override-linux.yml build
    docker-compose -f docker-compose.yml -f docker-compose.override.yml -f docker-compose.override-linux.yml up
fi

