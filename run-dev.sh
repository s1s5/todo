#!/bin/bash
# -*- mode: shell-script -*-

set -eu  # <= 0以外が返るものがあったら止まる, 未定義の変数を使おうとしたときに打ち止め

trap 'kill $(jobs -p)' INT

if [ `uname` = "Darwin" ]; then
    npm run start &
    npm run relay -- --watch &
    docker-compose build
    docker-compose up &
else
    echo "foo"
fi

wait $(jobs -p)
