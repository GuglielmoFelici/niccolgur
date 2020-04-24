node_modules/.bin/ng build --prod --output-path docs --base-href /niccolgur/
cp docs/index.html docs/404.html
cp -r data docs/data
git add .
git commit -m "pages"
git push
