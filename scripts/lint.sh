#!/bin/sh

set -e

LINT_DIR=$(mktemp -d /tmp/jshint.XXXXXX)
rm -rf $LINT_DIR
cp -r js $LINT_DIR
jsx js/ $LINT_DIR/ --extension jsx
jshint $LINT_DIR
rm -rf ./tmp
