call ng build --prod --output-path docs --base-href "niccolgur"
call powershell cp docs/index.html docs/404.html
call powershell cp -r data docs/data
call git add .
call git commit -m "pages"
call git push