#!/bin/sh

if [ "$1" != "" ]; then
  if [ -e "./packages/$1/package.json" ]; then
    ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/es
    BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/lib
  else
    echo "Package $1 was not found"
  fi
else
  for f in packages/*; do
    package=`basename $f`

    if [ -d "$f" ] && [ -e "$f/package.json" ]; then
      ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/es
      BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/lib
    fi
  done
fi
