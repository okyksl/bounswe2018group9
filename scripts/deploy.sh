#!/bin/bash
set -e

HOST="root@46.101.223.116"
# GIT_REVISION=$(git rev-parse --short HEAD)

# TODO: avoid  node_modules
# rm -r backend/node_modules
scp -r backend $HOST:~
ssh $HOST:~ && screen -XS "actopus:prod" quit; screen -dmS "actopus:prod" bash -c "cd ~/backend && npm install && sudo npm start"
