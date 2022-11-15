# To-Do Prototype

## Description (problem statement)

Why is everybody doing to-do apps? *sigh*

Looks like even Tiramisu Corp. jumped on the trend, oh well...

## Instructions

For this challenge, participants are given the description above and a server that can be executed by running the following commands:

```shell
docker build -t sinf-ctf-2022:to-do-prototype .
docker run --env-file .env-itp 8087:8087 sinf-ctf-2022:to-do-prototype
```

After that, to interact with the challenge, you can go to http://localhost:8087 on a web browser.
