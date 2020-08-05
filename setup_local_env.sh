#!/bin/bash

touch .env
echo '
##################

installing Express

##################
'
npm install
echo '
##################

installing Nodemon

##################
'
sudo npm install -g nodemon
cd src/client
echo '
##############################

installing ReactJS dependencies

##############################
'
npm install
