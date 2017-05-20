#!/bin/sh

if [ "$1" != "" ]; then
  if [ -e "./packages/$1/package.json" ]; then
    ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/es --ignore __tests__
    BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js ./packages/$1/src --out-dir ./packages/$1/lib --ignore __tests__
  else
    echo "Package $1 was not found"
  fi
else
  for f in packages/*; do
    package=`basename $f`

    if [ -d "$f" ] && [ -e "$f/package.json" ]; then
      ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/es --ignore __tests__
      BABEL_ENV=commonjs ./node_modules/babel-cli/bin/babel.js $f/src --out-dir $f/lib --ignore __tests__
    fi
  done
fi
