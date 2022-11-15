# Mr. Biscuit Cake's Cake Shop

## Description (problem statement)

I've been trying to buy a cake for less than 3 weeks now...

I found this store, but it looks like they're undergoing an upgrade... That stings...

## Instructions

For this challenge, participants are given the description above and a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:mr-biscuit-cake-cake-shop .
docker run --privileged -itp 1337:1337 sinf-ctf-2022:mr-biscuit-cake-cake-shop
```

After that, to interact with the challenge, use software such as Netcat:
```shell
nc localhost 1337
```
