#!/usr/bin/env bash

# Run each command in parallel
(
  cd extensions/vscode
  tsc -p ./
) &

(
  cd extensions/vscode
  node scripts/prepackage.js
) &

(
  cd extensions/vscode
  npm run esbuild
) &

# (
#   cd gui
#   npm run dev
# ) &

wait