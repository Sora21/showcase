#!/usr/bin/env bash

echo Building Application for Github

# Bump npm version
npm version patch --no-git-tag-version

# Build App
ng build --output-path docs --base-href /showcase/

# Fix generated folder structure
mv docs/browser/* docs/
rm -r docs/browser

# Create 404 page for Github
cp docs/index.html docs/404.html

# Fix assets reference (replace '/assets...' -> './assets...')
STYLES_FILE=$(find docs -name 'styles*css')
sed -i '' 's/\/assets/\.\/assets/g' $STYLES_FILE # Mac
#sed -i'' 's/\/assets/\.\/assets/g' $STYLES_FILE # Linux 
