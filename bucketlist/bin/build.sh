#!/bin/bash

./bin/make-desc.sh

ng build --prod --aot true

./bin/make-mobile.sh

ng build --prod --output-path=../web/mobile --aot true

./bin/clean.sh
