#!/bin/bash

# Setup and start BrowserStack Tunnel for your TravisCI build
#
# This script was adopted from Santiago Suarez OrdoÃ±ez's Sauce Connect 
# setup script: https://gist.github.com/santiycr/5139565/
#
# This script requires your .travis.yml to include the following private 
# env variable:
# 
# * BROWSERSTACK_ACCESS_KEY
#
# You can find the access key for your account at 
# http://www.browserstack.com/local-testing
#
# Curl and run this script as part of your .travis.yml before_script section:
#
#     before_script:
#       - curl https://gist.github.com/mjumbewu/6040423/raw/browserstack_tunnel_setup.sh | bash

BROWSERSTACK_TUNNEL_URL="http://www.browserstack.com/BrowserStackTunnel.jar"
BROWSERSTACK_TUNNEL_DIR="/tmp/browserstack-$RANDOM"

# Download and extract the program
mkdir -p $BROWSERSTACK_TUNNEL_DIR
cd $BROWSERSTACK_TUNNEL_DIR
curl $BROWSERSTACK_TUNNEL_URL > BrowserStackTunnel.jar

# Start it
java -jar BrowserStackTunnel.jar \
  $BROWSERSTACK_KEY \
  localhost,3000,0 &

# Wait a few seconds for it to be ready
sleep 5
