# E2E TESTS RUN
1) Install protractor globally

`npm install  -g protractor`

2) Install all npm packages

`npm install`

3) Create virtual host for backend test environment, add it in /etc/hosts

`<VirtualHost *:80>
     ServerName behat.bucketlist.loc
     DocumentRoot /var/www/html/bucketlist/web/
     DirectoryIndex app_behat.php
     <Directory /var/www/html/bucketlist/web/> 
 	AllowOverride none
 	Require all granted
 	Options Indexes FollowSymLinks MultiViews 
 	<IfModule mod_rewrite.c>
 	     RewriteEngine On
 	     RewriteRule ^app_behat.php - [L]
 	     RewriteRule ^app.php - [L]
 	     RewriteCond %{REQUEST_FILENAME} !-f
 	     RewriteRule ^(.*)$ app_behat.php [QSA,L]
 	</IfModule>
     </Directory>
 </VirtualHost>`

4) Create virtual host for front test environment, add it in /etc/hosts

`<VirtualHost *:80>
    ServerName test.bucketlist.loc
    DocumentRoot /var/www/html/bucketlist/web/test
	<Directory /var/www/html/bucketlist/web/test> 
		DirectoryIndex index.html 
		Options Indexes FollowSymLinks MultiViews 
		AllowOverride All 
		Require all granted 
	</Directory>
</VirtualHost>`

5) Build project with test environment

`ng build --env=test --output-pat=../web/test`
	
6) Download and run selenium server 2.53.1 version

[selenium-server-standalone-2.53.1.jar](http://selenium-release.storage.googleapis.com/index.html?path=2.53/)

`java -jar selenium-server-standalone-2.53.1.jar`

7) Run e2e by sh file in root directory bin folder

`./bin/angular-e2e-test.sh`
