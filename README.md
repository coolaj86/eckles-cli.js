[Eckles CLI](https://git.coolaj86.com/coolaj86/eckles-cli.js)
=========

Sponsored by [Root](https://therootcompany.com).
Built with [Eckles.js](https://git.coolaj86.com/coolaj86/eckles.js).

ECDSA (elliptic curve) tools.

Designed for testing and debugging.

## Install

```bash
npm install -g eckles
```

Table of Contents
=================

* [x] Generate EC Keys
* [x] PEM to JWK
* [x] JWK to PEM
* [x] SSH "pub" format
* [x] Generate CSR (via [ECDSA-CSR.js](https://git.coolaj86.com/coolaj86/ecdsa-csr.js))
* [ ] RSA
  * **Need RSA tools?** Check out [Rasha.js](https://git.coolaj86.com/coolaj86/rasha.js)

## Generate EC (ECDSA/ECDH) Keypair

```
eckles [format] [curve|encoding]
```

#### Generate ECDSA JWK

```
eckles [jwk] [P-256|P-384]
```

```bash
# Default P-256 (prime256v1, secp256r1)
eckles jwk

# Use P-384 (secp384r1)
eckles jwk P-384
```

#### Generate ECDSA PEM

```
eckles [sec1|pkcs8|ssh] [P-256|P-384]
```

```bash
eckles sec1

eckles pkcs8 P-256

eckles ssh P-384
```

#### Generate ECDSA DER

```
eckles [sec1|pkcs8] [der]
```

```bash
eckles sec1 der > privkey.ec.sec1.der 2> pub.ec.spki.der

eckles pkcs8 der > privkey.ec.pkcs8.der 2> pub.ec.spki.der
```

## Convert ECDSA PEM to JWK

```
eckles [pemfile] [public]
```

```bash
eckles privkey.pem > privkey.jwk.json

eckles pub.pem > pub.jwk.json

eckles privkey.pem public > pub.jwk.json
```

```bash
eckles id_rsa > privkey.jwk.json

eckles id_rsa public > pub.jwk.json

eckles id_rsa.pub > pub.jwk.json
```

## Convert ECDSA JWK to PEM

```
eckles [jwk-keyfile] [format]
```

```bash
eckles privkey.jwk.json sec1 > privkey.pem

eckles privkey.jwk.json pkcs8 > privkey.pem

eckles privkey.jwk.json spki > pub.pem

eckles privkey.jwk.json ssh > id_rsa.pub
```

```bash
eckles pub.jwk.json spki > id_rsa.pub

eckles pub.jwk.json ssh > id_rsa.pub
```

## Convert ECDSA PEM to SSH

This is a two-step process, at the moment.

Only public keys are necessary, but private keys may be used.

```bash
eckles privkey.pem > privkey.jwk.json

eckles privkey.jwk.json pkcs8 > id_rsa

eckles privkey.jwk.json ssh > id_rsa.pub
```

```bash
eckles pub.pem > pub.jwk.json

eckles pub.jwk.json ssh > id_rsa.pub
```

#### Convert ECDSA SSH to PEM

This is a two-step process, at the moment.

Only public keys are necessary, but private keys may be used.

```bash
eckles id_rsa > privkey.jwk.json

eckles privkey.jwk.json sec1 > privkey.pem

eckles privkey.jwk.json pkcs8 > privkey.pem
```

```bash
eckles id_rsa.pub > pub.jwk.json

eckles privkey.jwk.json spki > pub.pem
```

## Generate CSR

```
eckles csr [keyfile] [domains]
```

```bash
eckels csr privkey.pem example.com,www.example.com > csr.pem
```

```bash
eckels csr privkey.jwk.json example.com,www.example.com > csr.pem
```


Legal
-----

[Eckles CLI](https://git.coolaj86.com/coolaj86/eckles-cli.js) |
MPL-2.0 |
[Terms of Use](https://therootcompany.com/legal/#terms) |
[Privacy Policy](https://therootcompany.com/legal/#privacy)
