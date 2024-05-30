#!/usr/bin/env bash

cd extensions/vscode
npm run esbuild

cd ../../binary
npm run build

cd ../gui
npm run build
