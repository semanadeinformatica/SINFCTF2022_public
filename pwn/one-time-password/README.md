# One-Time Password

## Description (problem statement)

Traditional authentication is old and unsafe. We've engineered a super secure token generator to be able to use our premium services.

## Instructions

For this challenge, participants are given the description above and the files under the `publish` directory, as well as a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:one-time-password .
docker run --privileged -itp 1337:1337 sinf-ctf-2022:one-time-password
```

After that, to interact with the challenge, use software such as Netcat:
```shell
nc localhost 1337
```
