#!/usr/bin/env bash

set -e

trash --force dist
mkdir -p dist
mkdir -p .tmp

git clone -b gh-pages https://github.com/jussi-kalliokoski/trine.git dist/website
npm run create-website
mkdir -p dist/website/images
cp -r tools/DocumentationBuilder/app/images/* dist/website/images

babel -d dist/main src
cp README.md dist/main
npm run generate-packages
