#!/bin/bash

rm -rf build node_modules
npm install
tsc -p tsconfig.release.json
cd src/client
rm -rf build node_modules
npm install
npm run build