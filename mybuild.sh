ng build --prod --output-path docs --base-href https://guglielmofelici.github.io/niccolgur/
cp docs/index.html docs/404.html
cp -r data docs/data
git add .
git commit -m "pages"
git push
