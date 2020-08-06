#!/bin/bash


echo '
#################################

installing Express dependecies

#################################
'
cd server
touch .env
npm install
echo '
########################################################################

installing Nodemon - Type your password to procceed the installation 

########################################################################
'
sudo npm install -g nodemon
cd ../client
touch .env
echo '
##############################

installing ReactJS dependencies

##############################
'
npm install
