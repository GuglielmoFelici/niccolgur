call ng build --prod --output-path docs --base-href "niccolgur"
call cp docs/index.html docs/404.html
call git add .
call git commit -m "pages"
call git push