#!/bin/sh

set -e

rm -rf .jshinttmp
cp -r src .jshinttmp
jsx src/ .jshinttmp/ --extension jsx
jshint .jshinttmp
