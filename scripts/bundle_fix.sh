#!/usr/bin/env sh

hack_newline=':a;N;$!ba;'
search='s#^"use strict";'
replace='#\0\n\nif (exports == null) var exports = {};#g'

minified_file='dist/http-script.js'

sed -i "${hack_newline}${search}${replace}" \
  "$minified_file"
