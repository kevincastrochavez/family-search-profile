#!/bin/bash

if [ "$NODE_ENV" == "production" ]; then
  echo "-----> Building .npmrc and .netrc"

  echo "//familysearch.jfrog.io/artifactory/api/npm/fs-npm-prod-virtual/:_authToken=${NPM_TOKEN}" > .npmrc
  echo "@fs:registry=https://familysearch.jfrog.io/artifactory/api/npm/fs-npm-prod-virtual/" >> .npmrc
  echo -e "machine github.com\n  login $GITHUB_AUTH_TOKEN" > ~/.netrc
fi
