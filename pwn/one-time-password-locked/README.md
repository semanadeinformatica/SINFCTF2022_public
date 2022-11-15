# One-Time Password - Locked

## Description (problem statement)

Pissed about the security flaws, the researchers decided to disable the service for now...

## Instructions

For this challenge, participants are given the description above and the files under the `publish` directory, as well as a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:one-time-password-locked .
docker run --privileged -itp 1337:1337 sinf-ctf-2022:one-time-password-locked
```

After that, to interact with the challenge, use software such as Netcat:
```shell
nc localhost 1337
```
