#!/bin/sh

DIRECTORY="/static"

if [ -d "$DIRECTORY" ]; then
  rm -rf $DIRECTORY
fi

mkdir -p static  && cp -r /container/. /static  && sleep infinity