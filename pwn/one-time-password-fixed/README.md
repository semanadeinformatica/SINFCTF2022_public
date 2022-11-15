# One-Time Password - Fixed

## Description (problem statement)

It came to our ears that our software had a security issue, so we hired some researchers to fix it.

## Instructions

For this challenge, participants are given the description above and the files under the `publish` directory, as well as a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:one-time-password-fixed .
docker run --privileged -itp 1337:1337 sinf-ctf-2022:one-time-password-fixed
```

After that, to interact with the challenge, use software such as Netcat:
```shell
nc localhost 1337
```
