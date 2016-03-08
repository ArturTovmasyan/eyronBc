#!/bin/bash
rm -rf app/cache/*
app/console doctrine:schema:update --force --env=test
app/console doctrine:fixtures:load --env=test
