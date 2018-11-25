#!/bin/bash
set -e

echo ""
echo "Generate"
node bin/eckles.js jwk > privkey.1.jwk.json 2> pub.1.jwk.json
node bin/eckles.js sec1 > privkey.2.sec1.pem 2> pub.2.spki.pem
node bin/eckles.js pkcs8 > privkey.3.pkcs8.pem 2> pub.3.spki.pem
node bin/eckles.js ssh > id_rsa 2> id_rsa.pub
echo "PASS"

# JWK
echo ""
echo "Read JWK"
node bin/eckles.js privkey.1.jwk.json > /dev/null
node bin/eckles.js privkey.1.jwk.json public > /dev/null
node bin/eckles.js pub.1.jwk.json > /dev/null
echo "PASS"

# SEC1 + SPKI
echo ""
echo "Read SEC1"
node bin/eckles.js privkey.2.sec1.pem > /dev/null
node bin/eckles.js privkey.2.sec1.pem public > /dev/null
node bin/eckles.js pub.2.spki.pem > /dev/null
echo "PASS"

# PKCS8 (SPKI already tested)
echo ""
echo "Read PKCS8"
node bin/eckles.js privkey.3.pkcs8.pem > /dev/null
node bin/eckles.js privkey.3.pkcs8.pem public > /dev/null
echo "PASS"

# SSH (PKCS8 + PUB)
echo ""
echo "Read SSH"
node bin/eckles.js privkey.3.pkcs8.pem > /dev/null
node bin/eckles.js id_rsa > /dev/null
node bin/eckles.js id_rsa public > /dev/null
node bin/eckles.js id_rsa.pub > /dev/null
echo "PASS"

echo ""
echo ""
echo "Passed all tests"
