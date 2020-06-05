#!/bin/bash
node_modules/.bin/ng build --prod --output-path docs # --base-href /niccolgur/
cp docs/index.html docs/404.html
git add .
git commit -m "pages"
git push
