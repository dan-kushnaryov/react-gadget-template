#!/bin/sh

# Transform jsx and lint the results

set -e

JSX_BIN=./node_modules/react-tools/bin/jsx
JSHINT_BIN=./node_modules/jshint/bin/jshint

LINT_DIR=./tmp/jshint_src
rm -rf $LINT_DIR
mkdir -p $LINT_DIR
cp -r js $LINT_DIR
$JSX_BIN js/ $LINT_DIR --extension jsx
$JSHINT_BIN $LINT_DIR
