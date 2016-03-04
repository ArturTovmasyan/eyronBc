#!/bin/bash
app/console doctrine:schema:update --force --env=test
app/console doctrine:fixtures:load --env=test
