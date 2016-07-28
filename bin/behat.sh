#!/bin/bash
rm -rf app/cache/*
app/console doctrine:database:create --env=behat
app/console doctrine:schema:update --force --env=behat
app/console doctrine:fixtures:load --env=behat

#for MYSQL 5.6 version
#app/console doctrine:database:drop --force --env=behat
#app/console doctrine:database:create --env=behat
#app/console doctrine:schema:update --force --env=behat
#app/console doctrine:fixtures:load --env=behat --append