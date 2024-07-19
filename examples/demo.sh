#!/bin/bash

cd $( dirname -- "$0"; )
mkdir -p ./dist && ln -fs ../../dist/Leaflet.ImagePdf.umd.js  ./dist/Leaflet.ImagePdf.umd.js
python3 -m http.server
