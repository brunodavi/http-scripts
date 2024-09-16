#!/usr/bin/env sh

hack_newline=':a;N;$!ba;'
search='s#^"use strict";'
replace='#\0\n\nvar exports = Object;#g'

minified_file='dist/http-script.min.js'

sed -i "${hack_newline}${search}${replace}" \
  "$minified_file"
