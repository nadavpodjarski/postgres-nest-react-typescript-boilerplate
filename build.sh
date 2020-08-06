#!/bin/bash


# SERVER BUILD 
cd server
rm -rf build node_modules
npm install
tsc -p tsconfig.release.json

# CLIENT BUILD
cd ../client
rm -rf build node_modules
npm install
npm run build