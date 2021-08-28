#!/bin/bash

VERSION=$(cat package.json | jq -r .version)

docker build . -t mastrogiovanni/codemotion-guestbook-backend:$VERSION

docker push mastrogiovanni/codemotion-guestbook-backend:$VERSION

