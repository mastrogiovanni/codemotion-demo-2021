#!/bin/bash

VERSION=$(cat package.json | jq -r .version)

docker build . -t mastrogiovanni/codemotion-guestbook-frontend:$VERSION

docker push mastrogiovanni/codemotion-guestbook-frontend:$VERSION

