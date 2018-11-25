#!/usr/bin/env node
'use strict';

var fs = require('fs');
var Eckles = require('eckles');
var ecdsacsr = require('ecdsa-csr');

var infile = process.argv[2];
var format = process.argv[3];
var domains = process.argv[3];
var key;

function errout(err) {
  console.error(err);
  process.exit(1);
}

if (!infile) {
  infile = 'jwk';
}

if (-1 !== [ 'jwk', 'pem', 'json', 'der', 'sec1', 'pkcs8', 'spki', 'ssh' ].indexOf(infile)) {
  return Eckles.generate({
    format: infile
  , namedCurve: format === 'P-384' ? 'P-384' : 'P-256'
  , encoding: format === 'der' ? 'der' : 'pem'
  }).then(function (key) {
    if ('der' === infile || 'der' === format) {
      key.private = key.private.toString('binary');
      key.public = key.public.toString('binary');
    }
    if ('jwk' === infile) {
      key.private = JSON.stringify(key.private, null, 2);
      key.public = JSON.stringify(key.public, null, 2);
    }
    console.info(key.private);
    // so that the pub key can be directed separately
    console.error(key.public);
    process.exit(0);
  }).catch(errout);
}

if ('csr' === infile) {
  key = fs.readFileSync(format, 'ascii');
} else {
  key = fs.readFileSync(infile, 'ascii');
}

try {
  key = JSON.parse(key);
} catch(e) {
  // ignore
}


if ('csr' === infile) {
  return ecdsacsr({
    // don't remember which it was... whatever
    pem: key
  , key: key
  , jwk: key
  , domains: domains.split(/,/)
  }).then(function (csr) {
    console.info(csr);
  }).catch(errout);
}

console.log(typeof key, key);
if ('string' === typeof key) {
  var pub = (-1 !== [ 'public', 'spki', 'pkix' ].indexOf(format));
  return Eckles.import({ pem: key, public: (pub || format) }).then(function (jwk) {
    console.info(JSON.stringify(jwk, null, 2));
  }).catch(errout);
} else {
  var pub = (-1 !== [ 'public', 'spki', 'pkix', 'ssh' ].indexOf(format));
  if ('public' === format) { format = 'spki'; }
  return Eckles.export({ jwk: key, format: format, public: pub }).then(function (pem) {
    console.info(pem);
  }).catch(errout);
}
