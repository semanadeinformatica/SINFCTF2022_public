#!/bin/bash

mongod > /dev/null &
~/.deno/bin/deno run --allow-net --allow-env --allow-read src/main.ts &

wait -n
exit $?