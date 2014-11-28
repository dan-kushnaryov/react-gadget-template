#!/bin/sh

set -e

rm -rf .jshinttmp
cp -r js .jshinttmp
jsx js/ .jshinttmp/ --extension jsx
jshint .jshinttmp
